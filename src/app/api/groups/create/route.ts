import { NextRequest, NextResponse } from "next/server";
import client from "@/libs/server/client";

export async function POST(req: NextRequest) {
  const { email, name, username, password }: { [key: string]: string } =
    await req.json();

  if (!email || !password || !username || !name) {
    return NextResponse.json(
      { ok: false, error: "missing email, username, name or password" },
      { status: 400 }
    );
  }

  // 이메일 중복 검사
  const emailExists = await client.user.findUnique({
    where: { email },
  });

  if (emailExists) {
    return NextResponse.json(
      { ok: false, error: "Email already in use" },
      { status: 409 }
    );
  }

  // 사용자명 중복 검사
  const usernameExists = await client.user.findUnique({
    where: { username },
  });

  if (usernameExists) {
    return NextResponse.json(
      { ok: false, error: "Username already in use" },
      { status: 409 }
    );
  }

  // 사용자 생성
  const user = await client.user.create({
    data: {
      email,
      name,
      username,
      password,
      is_member: false,
      is_admin: false,
      is_superamin: false,
      is_active: true,
    },
  });

  return NextResponse.json({ ok: true, result: user });
}
/**
 * @swagger
 * /api/groups/create:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user by creating an account with the provided email, username, name, and password. Checks for existing email and username.
 *     tags:
 *       - Group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - username
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@test.com
 *               password:
 *                 type: string
 *                 example: testpassword
 *               username:
 *                 type: string
 *                 example: testuser
 *               name:
 *                 type: string
 *                 example: Test User
 *     responses:
 *       200:
 *         description: Successfully registered
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
 *                     email:
 *                       type: string
 *                       example: test@test.com
 *                     username:
 *                       type: string
 *                       example: testuser
 *                     name:
 *                       type: string
 *                       example: Test User
 *       400:
 *         description: Missing required fields
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
 *                   example: missing email, username, name or password
 *       409:
 *         description: Conflict, email or username already in use
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
 *                   examples:
 *                     email: "Email already in use"
 *                     username: "Username already in use"
 */
