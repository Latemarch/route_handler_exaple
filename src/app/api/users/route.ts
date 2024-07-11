/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieves a list of users
 *     description: Returns a list of all registered users.
 *     responses:
 *       200:
 *         description: A list of users
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
 *                   example: "http://localhost:3000/api/users"
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       username:
 *                         type: string
 *                         example: johndoe
 *                       email:
 *                         type: string
 *                         example: johndoe@example.com
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       is_member:
 *                         type: boolean
 *                         example: true
 *                       is_admin:
 *                         type: boolean
 *                         example: false
 *                       is_superamin:
 *                         type: boolean
 *                         example: false
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2023-07-01T00:00:00.000Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2023-07-01T00:00:00.000Z
 *                       last_login:
 *                         type: string
 *                         format: date-time
 *                         example: 2023-07-01T12:00:00.000Z
 *                       is_active:
 *                         type: boolean
 *                         example: true
 */
import { NextResponse, NextRequest } from "next/server";
import client from "@/libs/server/client";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const result = await client.user.findMany();

  return NextResponse.json({ ok: true, url, result });
}
