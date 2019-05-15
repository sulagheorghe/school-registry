const access_token = localStorage.getItem('access_token')

export class ApiService {
  private static async request<T>(input: RequestInfo, init: RequestInit = {}): Promise<T> {
    const res = await fetch(input, {
      ...init,
      headers: {
        ...init.headers,
        ...(access_token && { 'Authorization': `Bearer ${access_token}` })
      }
    });
    return await res.json();
  }

  public static post<T = any>(url: string, body: any | null, options: RequestInit = {}): Promise<T> {
    return ApiService.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      }
    })
  }

  public static get<T = any>(url: string, options: RequestInit = {}): Promise<T> {
    return ApiService.request<T>(url, {
      method: 'GET',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      }
    })
  }
}