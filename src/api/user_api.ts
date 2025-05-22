import { APIRequestContext, APIResponse } from "@playwright/test";

export class UserApi {
  private readonly request: APIRequestContext;
  private readonly apiUrl = "http://localhost:3000";

  constructor(request: APIRequestContext) {
    this.request = request;
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

  async loginUser(username: string, password: string): Promise<APIResponse> {
    const response = await this.request.post(`${this.apiUrl}/auth/login`, {
      data: {
        username,
        password,
      },
    });
    return response;
  }
}
