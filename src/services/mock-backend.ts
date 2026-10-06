import {
  createMockNetwork,
  type MockNetwork,
  type MockNetworkSettings,
} from "@/repositories/mock/network";
import { createMockProjectRepository } from "@/repositories/mock/projects";
import { createMockTicketRepository } from "@/repositories/mock/tickets";
import { createMockUserRepository } from "@/repositories/mock/users";
import { createServices, type Services } from "./services";

export interface MockBackend {
  services: Services;
  /** Latency and failure switches, so the UI can demo loading and error states. */
  network: MockNetwork;
  /** Restores every collection to its seed data. */
  reset(): void;
}

/**
 * Composition root. Swapping to a real API means building `Repositories` from
 * `fetch`-based implementations here and dropping `network` and `reset`.
 */
export function createMockBackend(
  networkSettings?: Partial<MockNetworkSettings>,
): MockBackend {
  const network = createMockNetwork(networkSettings);
  const users = createMockUserRepository(network);
  const tickets = createMockTicketRepository(network);
  const projects = createMockProjectRepository(network);

  return {
    services: createServices({ users, tickets, projects }),
    network,
    reset() {
      users.reset();
      tickets.reset();
      projects.reset();
    },
  };
}

let browserBackend: MockBackend | undefined;

/**
 * One backend per browser tab, so edits survive client-side navigation.
 * Call it from client code only: a module singleton on the server would be
 * shared between requests.
 */
export function getMockBackend(): MockBackend {
  browserBackend ??= createMockBackend();
  return browserBackend;
}
