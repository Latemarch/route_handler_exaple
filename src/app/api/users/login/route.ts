/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     description: Logs in a user by checking the provided email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@test
 *               password:
 *                 type: string
 *                 example: test
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 user:
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
 *                     is_member:
 *                       type: boolean
 *                       example: true
 *                     is_admin:
 *                       type: boolean
 *                       example: false
 *                     is_superamin:
 *                       type: boolean
 *                       example: false
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2023-07-01T00:00:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2023-07-01T00:00:00.000Z
 *                     last_login:
 *                       type: string
 *                       format: date-time
 *                       example: 2023-07-01T12:00:00.000Z
 *                     is_active:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Missing email or password
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
 *                   example: missing email or password
 *       401:
 *         description: Invalid password
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
 *                   example: Invalid password
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
import { NextRequest, NextResponse } from "next/server";
import client from "@/libs/server/client";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  console.log(email, password);

  if (!email || !password) {
    return NextResponse.json(
      { ok: false, error: "missing email or password" },
      { status: 400 }
    );
  }

  const user = await client.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json(
      { ok: false, error: "User not found" },
      { status: 404 }
    );
  }
  if (user.password !== password) {
    return NextResponse.json(
      { ok: false, error: "Invalid password" },
      { status: 401 }
    );
  }

  return NextResponse.json({ ok: true, user });
}
