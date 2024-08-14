// In src/app/api/[...nextauth]/route.ts
import { handlers } from "@/auth";
import { NextRequest } from "next/server";

const reqWithTrustedOrigin = (req: NextRequest): NextRequest => {
  console.log(req.url);
  const urlObj = new URL(req.url).origin;

  const proto = req.headers.get("x-forwarded-proto");
  const host = req.headers.get("x-forwarded-host");
  if (!proto || !host) {
    console.warn("Missing x-forwarded-proto or x-forwarded-host headers.");
    return req;
  }
  const envOrigin = `${proto}://${host}`;
  console.log("origin", urlObj);
  console.log("envorigin", envOrigin);
  const { href, origin } = req.nextUrl;
  return new NextRequest(href.replace(origin, envOrigin), req);
};

export const GET = (req: NextRequest) => {
  return handlers.GET(reqWithTrustedOrigin(req));
};

export const POST = (req: NextRequest) => {
  return handlers.POST(reqWithTrustedOrigin(req));
};
