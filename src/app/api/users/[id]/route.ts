import { NextResponse } from "next/server";
import client from "@/libs/server/client";

export async function GET(req: Request, { params: { id } }: any) {
  const user = await client.user.findUnique({
    where: {
      id: +id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      createdAt: true,
      is_active: true,
    },
  });
  if (!user) {
    return NextResponse.json(
      { ok: false, error: "User not found" },
      { status: 404 }
    );
  }
  if (!user.is_active) {
    return NextResponse.json(
      { ok: false, error: "User account is deactivated" },
      { status: 403 }
    );
  }

  return NextResponse.json({ ok: true, result: user });
}

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieves user information by user ID.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Successfully retrieved user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 result:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2023-07-01T00:00:00.000Z
 *                     is_active:
 *                       type: boolean
 *                       example: true
 *       403:
 *         description: User account is deactivated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: User account is deactivated
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: User not found
 */
