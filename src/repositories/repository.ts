import type { Stored } from "@/domain/entity";
import type { ListQuery, Page } from "@/domain/pagination";

/**
 * Data-access contract. The mock implementation lives in `./mock`; a future
 * `ApiRepository` only has to map these five methods to REST calls
 * (`GET /x`, `GET /x/:id`, `POST /x`, `PATCH /x/:id`, `DELETE /x/:id`).
 * Implementations reject with `ApiError`.
 */
export interface Repository<TInput, TFilters, TSortKey extends string> {
  list(query: ListQuery<TFilters, TSortKey>): Promise<Page<Stored<TInput>>>;
  get(id: string): Promise<Stored<TInput>>;
  create(input: TInput): Promise<Stored<TInput>>;
  update(id: string, patch: Partial<TInput>): Promise<Stored<TInput>>;
  remove(id: string): Promise<void>;
}
