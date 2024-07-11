import { NextRequest, NextResponse } from "next/server";
import client from "@/libs/server/client";

export async function POST(req: NextRequest) {
  const { email, name, username, password }: { [key: string]: string } =
    await req.json();
  console.log(email, password);

  if (!email || !password) {
    return NextResponse.json(
      { ok: false, error: "missing email or password" },
      { status: 400 }
    );
  }

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
  console.log(user);

  return NextResponse.json({ ok: true, result: user });
}

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user by creating an account with the provided email, password, username, and name.
 *     tags:
 *       - User
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
 *                 user:
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
 *                   example: missing email, password, username or name
 *       500:
 *         description: Internal server error
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
 *                   example: Error message
 */
