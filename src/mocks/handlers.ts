import { rest } from "msw";

import type { AuthUser, LoginCredentialsDTO } from "@/features/auth";
import type { User } from "@/features/users";

export const mockTokenKey = "mock_auth_token";
export const mockToken = "djghmxasdfhfkcvncxvlxcv";
export const mockUser: User = {
  login: "cheremuhinikita",
  password: "password",
  fullName: "Nikita Cheremuhin",
  email: "nch@addcode.ru",
  role: "admin",
  phone: "9109156099",
  organization: "addcode",
};

export const handlers = [
  rest.get<User>("/auth/me", async (req, res, ctx) => {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    const tokenFromStorage = sessionStorage.getItem(mockTokenKey);
    if (token !== tokenFromStorage)
      return res(
        ctx.status(401),
        ctx.json({
          message: "unauthorized",
        })
      );

    return res(ctx.delay(2000), ctx.json<User>(mockUser));
  }),
  rest.post<LoginCredentialsDTO>("/auth/login", async (req, res, ctx) => {
    const { login, password } = req.body;

    if (login !== mockUser.login || password !== mockUser.password)
      return res(
        ctx.status(401),
        ctx.json({
          message: "wrong credentials",
        })
      );

    sessionStorage.setItem(mockTokenKey, mockToken);

    return res(
      ctx.delay(2000),
      ctx.json<AuthUser>({
        token: mockToken,
        user: mockUser,
      })
    );
  }),
  rest.post("/auth/logout", async (_, res, ctx) => {
    sessionStorage.removeItem(mockTokenKey);

    return res(ctx.delay(2000));
  }),
];
