const BASE_URL = 'http://localhost:5000/api';

interface RequestOptions extends RequestInit {
    token?: string | null;
}

const getHeaders = (token?: string | null) => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    const storedToken = token || localStorage.getItem('token');
    if (storedToken) {
        headers['Authorization'] = `Bearer ${storedToken}`;
    }

    return headers;
};

const handleResponse = async (response: Response) => {
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
        // Here we could handle global errors like 401 Unauthorized (Logout user)
        if (response.status === 401) {
            console.warn('Acceso no autorizado - token posiblemente expirado');
            window.dispatchEvent(new Event('auth:logout'));
        }
        const error = (data && data.message) || response.statusText;
        throw new Error(error);
    }

    return data;
};

export const api = {
    get: async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            method: 'GET',
            headers: getHeaders(options.token),
        });
        return handleResponse(response);
    },

    post: async <T>(endpoint: string, body: any, options: RequestOptions = {}): Promise<T> => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            method: 'POST',
            headers: getHeaders(options.token),
            body: JSON.stringify(body),
        });
        return handleResponse(response);
    },

    put: async <T>(endpoint: string, body: any, options: RequestOptions = {}): Promise<T> => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            method: 'PUT',
            headers: getHeaders(options.token),
            body: JSON.stringify(body),
        });
        return handleResponse(response);
    },

    delete: async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            method: 'DELETE',
            headers: getHeaders(options.token),
        });
        return handleResponse(response);
    }
};
