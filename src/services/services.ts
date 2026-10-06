import {
  projectInputSchema,
  projectPatchSchema,
  type ProjectFilters,
  type ProjectInput,
  type ProjectSortKey,
} from "@/domain/project";
import {
  ticketInputSchema,
  ticketPatchSchema,
  type TicketFilters,
  type TicketInput,
  type TicketSortKey,
} from "@/domain/ticket";
import {
  userInputSchema,
  userPatchSchema,
  type UserFilters,
  type UserInput,
  type UserSortKey,
} from "@/domain/user";
import type { Repository } from "@/repositories/repository";
import { createCrudService, type CrudService } from "./crud-service";

export type UserService = CrudService<UserInput, UserFilters, UserSortKey>;
export type TicketService = CrudService<TicketInput, TicketFilters, TicketSortKey>;
export type ProjectService = CrudService<ProjectInput, ProjectFilters, ProjectSortKey>;

export interface Repositories {
  users: Repository<UserInput, UserFilters, UserSortKey>;
  tickets: Repository<TicketInput, TicketFilters, TicketSortKey>;
  projects: Repository<ProjectInput, ProjectFilters, ProjectSortKey>;
}

export interface Services {
  users: UserService;
  tickets: TicketService;
  projects: ProjectService;
}

/** Wires services to any set of repositories (mock today, API later). */
export function createServices(repositories: Repositories): Services {
  return {
    users: createCrudService({
      repository: repositories.users,
      inputSchema: userInputSchema,
      patchSchema: userPatchSchema,
      emptyFilters: {},
    }),
    tickets: createCrudService({
      repository: repositories.tickets,
      inputSchema: ticketInputSchema,
      patchSchema: ticketPatchSchema,
      emptyFilters: {},
    }),
    projects: createCrudService({
      repository: repositories.projects,
      inputSchema: projectInputSchema,
      patchSchema: projectPatchSchema,
      emptyFilters: {},
    }),
  };
}
