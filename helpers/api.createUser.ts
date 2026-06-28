import { APIRequestContext, expect } from "@playwright/test";
import { UserResponseSchema } from "../schemas/api.user.schema";
import type { User } from "./userFactory";

const apiBase = process.env.API_BASE_URL;

if (!apiBase) {
  throw new Error("API_BASE_URL must be set in environment to run API tests");
}

export async function registerUser(request: APIRequestContext, user: User) {
  const res = await request.post(`${apiBase}/users`, { data: { user } });
  expect(res.ok()).toBeTruthy();
  const body: unknown = await res.json();
  const { user: registeredUser } = UserResponseSchema.parse(body);
  return registeredUser; // contains username, email, token
}
