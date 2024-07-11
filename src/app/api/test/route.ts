/**
 * @swagger
 * /api/test:
 *   get:
 *     description: Returns all test entries
 *     responses:
 *       200:
 *         description: A list of test entries
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 url:
 *                   type: string
 *                   example: "http://localhost:3000/api/test"
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Test Entry"
 *   post:
 *     description: Creates a new test entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 example: "http://example.com"
 *               ip:
 *                 type: string
 *                 example: "127.0.0.1"
 *               path:
 *                 type: string
 *                 example: "/example/path"
 *               user:
 *                 type: string
 *                 example: "user123"
 *               content:
 *                 type: object
 *                 example: { "key": "value" }
 *     responses:
 *       200:
 *         description: Confirmation of entry creation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "missing param(s)"
 */

import { NextResponse, NextRequest } from "next/server";
import client from "@/libs/server/client";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const result = await client.test.findMany();

  return NextResponse.json({ ok: true, result });
}

export async function POST(req: NextRequest) {
  // const requestData = await req.json();

  // if (!requestData)
  // return NextResponse.json({ ok: false, msg: "missing param(s)" });

  // const { url, ip, path, user, content } = requestData;
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
