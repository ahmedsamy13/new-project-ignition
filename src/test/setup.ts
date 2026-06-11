import "@testing-library/jest-dom";
import { server } from "./mocks/server";
import { cleanup } from "@testing-library/react";
import { beforeAll, afterEach, afterAll } from "vitest";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());
