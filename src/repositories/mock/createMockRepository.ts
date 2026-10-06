import { ApiError } from "@/domain/api-error";
import type { Stored } from "@/domain/entity";
import type { ListQuery, Page } from "@/domain/pagination";
import { normalizeText } from "@/lib/text";
import type { Repository } from "../repository";
import type { MockNetwork } from "./network";

type Comparator<T> = (a: T, b: T) => number;

export interface MockCollectionConfig<TInput, TFilters, TSortKey extends string> {
  idPrefix: string;
  seed: () => Stored<TInput>[];
  /** Text the free-text search runs against. */
  searchText: (item: Stored<TInput>) => string;
  matches: (item: Stored<TInput>, filters: TFilters) => boolean;
  /** One comparator per sort key; the record type forces every key to be handled. */
  sorters: Record<TSortKey, Comparator<Stored<TInput>>>;
  defaultSort: TSortKey;
  /** Field that must stay unique, like a database unique index. */
  uniqueField?: keyof TInput & string;
}

export interface MockRepository<
  TInput,
  TFilters,
  TSortKey extends string,
> extends Repository<TInput, TFilters, TSortKey> {
  /** Restores the seed data. Mock-only; not part of the `Repository` contract. */
  reset(): void;
}

export function formatId(prefix: string, sequence: number): string {
  return `${prefix}_${String(sequence).padStart(3, "0")}`;
}

/**
 * In-memory collection behind the `Repository` contract. One implementation
 * serves every domain; each domain only supplies its own `MockCollectionConfig`.
 */
export function createMockRepository<TInput, TFilters, TSortKey extends string>(
  config: MockCollectionConfig<TInput, TFilters, TSortKey>,
  network: MockNetwork,
  now: () => string = () => new Date().toISOString(),
): MockRepository<TInput, TFilters, TSortKey> {
  type Item = Stored<TInput>;

  let items: Item[] = [];
  let lastSequence = 0;

  function reset(): void {
    items = config.seed().map((item) => ({ ...item }));
    lastSequence = items.length;
  }
  reset();

  function findIndex(id: string): number {
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) throw new ApiError("not_found");
    return index;
  }

  function assertUnique(candidate: Partial<TInput>, ignoreId?: string): void {
    const field = config.uniqueField;
    if (!field || !(field in candidate)) return;

    const wanted = String(candidate[field]);
    const taken = items.some(
      (item) => item.id !== ignoreId && String(item[field]) === wanted,
    );
    if (taken) throw new ApiError("conflict", { [field]: "duplicate" });
  }

  function list(query: ListQuery<TFilters, TSortKey>): Promise<Page<Item>> {
    return network.run(() => {
      const search = normalizeText(query.search);
      const sorter = config.sorters[query.sortBy ?? config.defaultSort];
      const direction = query.sortDirection === "desc" ? -1 : 1;

      const matching = items
        .filter(
          (item) =>
            config.matches(item, query.filters) &&
            (search === "" || normalizeText(config.searchText(item)).includes(search)),
        )
        .sort((a, b) => direction * sorter(a, b) || a.id.localeCompare(b.id));

      const pageCount = Math.max(1, Math.ceil(matching.length / query.pageSize));
      const page = Math.min(query.page, pageCount);
      const start = (page - 1) * query.pageSize;

      return {
        items: matching.slice(start, start + query.pageSize).map((item) => ({ ...item })),
        total: matching.length,
        page,
        pageSize: query.pageSize,
        pageCount,
      };
    });
  }

  return {
    reset,
    list,

    get: (id) => network.run(() => ({ ...items[findIndex(id)] })),

    create: (input) =>
      network.run(() => {
        assertUnique(input);
        lastSequence += 1;
        const timestamp = now();
        const created: Item = {
          ...input,
          id: formatId(config.idPrefix, lastSequence),
          createdAt: timestamp,
          updatedAt: timestamp,
        };
        items.push(created);
        return { ...created };
      }),

    update: (id, patch) =>
      network.run(() => {
        const index = findIndex(id);
        assertUnique(patch, id);
        const updated: Item = { ...items[index], ...patch, updatedAt: now() };
        items[index] = updated;
        return { ...updated };
      }),

    remove: (id) =>
      network.run(() => {
        items.splice(findIndex(id), 1);
      }),
  };
}
