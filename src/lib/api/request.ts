// api.ts

const BASE_URL = 'https://api.example.com'; // Замените на ваш базовый URL

interface RequestOptions<T> {
    method: string;
    headers?: HeadersInit;
    body?: T;
}

async function request<TResponse, TBody = undefined>(
    endpoint: string,
    options?: RequestOptions<TBody>
): Promise<TResponse> {
    const url = `${BASE_URL}${endpoint}`;

    const response = await fetch(url,  {
        method: options?.method || 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        body: options?.body ? JSON.stringify(options.body) : undefined,
    } as RequestInit);

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP Error ${response.status}: ${errorBody}`);
    }

    return await response.json() as Promise<TResponse>;
}

export async function get<TResponse>(endpoint: string): Promise<TResponse> {
    return request<TResponse>(endpoint);
}

export async function post<TResponse, TBody>(
    endpoint: string,
    body: TBody
): Promise<TResponse> {
    return request<TResponse, TBody>(endpoint, {
        method: 'POST',
        body,
    });
}

export async function put<TResponse, TBody>(
    endpoint: string,
    body: TBody
): Promise<TResponse> {
    return request<TResponse, TBody>(endpoint, {
        method: 'PUT',
        body,
    });
}

export async function del<TResponse>(endpoint: string): Promise<TResponse> {
    return request<TResponse>(endpoint, {
        method: 'DELETE',
    });
}
