import { NextResponse } from "next/server";
import { dummyProducts } from "@/test-mocks/data";

export async function GET(request: Request) {
  return NextResponse.json({
    products: dummyProducts,
    total: 12,
    skip: 0,
    limit: 30,
  });
}
