import { NextResponse } from "next/server";

function backendBaseUrl() {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  return raw.replace(/\/+$/, "");
}

export async function GET(req: Request) {
  const base = backendBaseUrl();
  if (!base) {
    return NextResponse.json(
      { success: false, message: "Missing BACKEND_BASE_URL / API_BASE_URL" },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(req.url);
  const target = `${base}/product/list?${searchParams.toString()}`;

  const res = await fetch(target, {
    method: "GET",
    cache: "no-store",
    headers: {
      accept: "application/json",
      cookie: req.headers.get("cookie") ?? "",
      authorization: req.headers.get("authorization") ?? "",
    },
  });

  const contentType = res.headers.get("content-type") ?? "application/json";
  const body = await res.text();

  return new NextResponse(body, {
    status: res.status,
    headers: { "content-type": contentType },
  });
}
