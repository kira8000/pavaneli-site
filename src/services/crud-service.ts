import type { z } from "zod";
import type { Stored } from "@/domain/entity";
import { normalizeListQuery, type ListQueryInput, type Page } from "@/domain/pagination";
import { parseInput } from "@/domain/validation";
import type { Repository } from "@/repositories/repository";

/**
 * What the UI talks to. Writes take `unknown` on purpose: form values are
 * untrusted until the schema has parsed them.
 */
export interface CrudService<TInput, TFilters, TSortKey extends string> {
  list(query?: ListQueryInput<TFilters, TSortKey>): Promise<Page<Stored<TInput>>>;
  get(id: string): Promise<Stored<TInput>>;
  create(data: unknown): Promise<Stored<TInput>>;
  update(id: string, data: unknown): Promise<Stored<TInput>>;
  remove(id: string): Promise<void>;
}

interface CrudServiceOptions<TInput, TFilters, TSortKey extends string> {
  repository: Repository<TInput, TFilters, TSortKey>;
  inputSchema: z.ZodType<TInput>;
  patchSchema: z.ZodType<Partial<TInput>>;
  emptyFilters: TFilters;
}

/**
 * Orchestration shared by every domain: sanitize queries, validate writes,
 * then delegate to the repository. Domain-specific rules would be added by
 * wrapping this service, not by growing it.
 */
export function createCrudService<TInput, TFilters, TSortKey extends string>({
  repository,
  inputSchema,
  patchSchema,
  emptyFilters,
}: CrudServiceOptions<TInput, TFilters, TSortKey>): CrudService<
  TInput,
  TFilters,
  TSortKey
> {
  // `async` so validation failures reject instead of throwing synchronously.
  return {
    list: async (query) => repository.list(normalizeListQuery(query, emptyFilters)),
    get: async (id) => repository.get(id),
    create: async (data) => repository.create(parseInput(inputSchema, data)),
    update: async (id, data) => repository.update(id, parseInput(patchSchema, data)),
    remove: async (id) => repository.remove(id),
  };
}
