"use server";

interface FetchServerDataOptions extends RequestInit {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
}

export async function fetchApi<TData = unknown>(
  endpoint: string,
  options: FetchServerDataOptions = {},
  tags: string[] = []
): Promise<ResShape<TData>> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_API_BASE_URL is missing");

  const URL = `${baseUrl.replace(/\/+$/, "")}/${endpoint.replace(/^\/+/, "")}`;

  const apiOptions: FetchServerDataOptions = {
    cache: "force-cache",
    next: {
      revalidate: 1,
      tags: tags,
    },
    ...options,
  };

  try {
    const res = await fetch(URL, apiOptions);

    const data: TData = await res.json();

    return data as ResShape<TData>;
  } catch (error) {
    console.error("fetchApi error:", error);
    throw error;
  }
}
export interface ResShape<TData = unknown> {
  message: string;
  status: number;
  success: boolean;
  timestamp: string;
  data: TData;
  error_code: string;
}
