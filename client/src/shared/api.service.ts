export class ApiService {
  private static async request<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
    const res = await fetch(input, init);
    return await res.json();
  }

  public static post<T = any>(url: string, body: any | null, options?: any): Promise<T> {
    return ApiService.request(url, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options
    })
  }
}