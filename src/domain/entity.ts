export interface EntityMeta {
  id: string;
  createdAt: string;
  updatedAt: string;
}

/** A persisted record: the validated input plus identity and timestamps. */
export type Stored<TInput> = TInput & EntityMeta;
