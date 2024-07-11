import { NextResponse, NextRequest } from "next/server";
import client from "@/libs/server/client";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const result = await client.test.findMany();

  return NextResponse.json({ ok: true, url, result });
}

export async function POST(req: NextRequest) {
  const requestData = await req.json();

  if (!requestData)
    return NextResponse.json({ ok: false, msg: "missing param(s)" });

  const { url, ip, path, user, content } = requestData;
  // const asp = await client.asp.create({
  //   data: {
  //     url: url.slice(0, 20),
  //     ip,
  //     path: path.slice(0, 20),
  //     user,
  //     content: JSON.stringify(content),
  //   },
  // });

  // console.log(requestData);

  // if (!asp) return NextResponse.json({ ok: false });

  return NextResponse.json({ ok: true });
}
