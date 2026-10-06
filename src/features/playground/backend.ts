import { getMockBackend } from "@/services/mock-backend";

/**
 * Lazy accessors for the browser-only mock backend. UI code receives these
 * functions instead of calling the singleton during render, so nothing is
 * created on the server. Swapping the backend later only touches this file.
 */
export const getBackend = getMockBackend;
export const getUsersService = () => getMockBackend().services.users;
export const getTicketsService = () => getMockBackend().services.tickets;
