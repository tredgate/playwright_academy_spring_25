// api/tegb
// user_api.ts

import { APIRequestContext, APIResponse, expect } from "@playwright/test";

export class UserApi {
  private readonly request: APIRequestContext;
  private readonly apiUrl = "http://localhost:3000";

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async loginUser(username: string, password: string): Promise<APIResponse> {
    const response = await this.request.post(`${this.apiUrl}/auth/login`, {
      data: {
        username,
        password,
      },
    });
    return response;
  }

  // ? Máme zde 2 přihlašovací metody, protože loginUser můžeme někdy chtít použít pro negativní testy (neexistující uživatel). Kdybychom dali testy do loginUser na úspěch, tyto testy bychom nemohli dělat.
  async successLogin(username: string, password: string): Promise<APIResponse> {
    const response = await this.loginUser(username, password);
    expect(response.status()).toBe(201);
    return response;
  }

  async registerUser(
    username: string,
    password: string,
    email: string
  ): Promise<APIResponse> {
    const response = await this.request.post(`${this.apiUrl}/user/register`, {
      data: {
        username,
        password,
        email,
      },
    });
    return response;
  }
}
