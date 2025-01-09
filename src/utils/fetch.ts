interface FetchOptions<TBody> {
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH';
  body?: TBody;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
}

const fetchUtil = {
  async request<TResponse, TBody = undefined>(url: string, options: FetchOptions<TBody>): Promise<TResponse | void> {
    const { method, body, headers, params } = options;

    // Append query parameters to URL
    if (params) {
      const queryString = new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {} as Record<string, string>),
      ).toString();
      url += `?${queryString}`;
    }

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    // Only parse response if method is GET
    if (method === 'GET') {
      return response.json() as Promise<TResponse>;
    }
  },

  async get<TResponse>(url: string, params?: Record<string, string | number | boolean>): Promise<TResponse> {
    return fetchUtil.request<TResponse>(url, { method: 'GET', params }) as Promise<TResponse>;
  },

  async post<TBody>(url: string, body: TBody, headers?: Record<string, string>): Promise<void> {
    await fetchUtil.request<void, TBody>(url, { method: 'POST', body, headers });
  },

  async delete(url: string, headers?: Record<string, string>): Promise<void> {
    await fetchUtil.request<void>(url, { method: 'DELETE', headers });
  },

  async patch<TBody>(url: string, body: TBody, headers?: Record<string, string>): Promise<void> {
    await fetchUtil.request<void, TBody>(url, { method: 'PATCH', body, headers });
  },
};

export default fetchUtil;
