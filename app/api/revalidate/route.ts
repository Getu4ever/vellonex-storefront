import { revalidate } from "lib/shopify";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  // 1. Get the secret from the URL (?secret=...)
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');

  // 2. Validate the secret against your Vercel Environment Variable
  if (secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    return NextResponse.json(
      { message: "Invalid secret" }, 
      { status: 401 }
    );
  }

  // 3. If valid, proceed with the existing Shopify revalidation logic
  return revalidate(req);
}