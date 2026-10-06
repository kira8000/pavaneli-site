import { ApiError } from "@/domain/api-error";

export const DEFAULT_LATENCY_MS = 350;

export interface MockNetworkSettings {
  /** Simulated round-trip time. */
  latencyMs: number;
  /** When true, every request fails with `ApiError("unavailable")`. */
  failing: boolean;
}

/**
 * Makes the in-memory data behave like a remote API: requests are async,
 * take time, and can be forced to fail so the UI can show loading/error states.
 */
export interface MockNetwork {
  readonly settings: MockNetworkSettings;
  /** Runs `operation` "on the server" after the simulated latency. */
  run<T>(operation: () => T): Promise<T>;
}

export function createMockNetwork(initial?: Partial<MockNetworkSettings>): MockNetwork {
  const settings: MockNetworkSettings = {
    latencyMs: DEFAULT_LATENCY_MS,
    failing: false,
    ...initial,
  };

  return {
    settings,
    async run<T>(operation: () => T): Promise<T> {
      if (settings.latencyMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, settings.latencyMs));
      }
      if (settings.failing) throw new ApiError("unavailable");
      return operation();
    },
  };
}
