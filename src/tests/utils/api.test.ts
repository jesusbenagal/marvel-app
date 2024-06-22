import { describe, it, expect } from "vitest";

import { createAxios } from "@/utils/api";

describe("createAxios", () => {
  it("should create an Axios instance with the correct baseURL", () => {
    const baseURL = "https://api.example.com";
    const instance = createAxios(baseURL);

    expect(instance.defaults.baseURL).toBe(baseURL);
  });

  it("should create a new Axios instance each time it is called", () => {
    const baseURL1 = "https://api.example1.com";
    const baseURL2 = "https://api.example2.com";

    const instance1 = createAxios(baseURL1);
    const instance2 = createAxios(baseURL2);

    expect(instance1.defaults.baseURL).toBe(baseURL1);
    expect(instance2.defaults.baseURL).toBe(baseURL2);
    expect(instance1).not.toBe(instance2);
  });
});
