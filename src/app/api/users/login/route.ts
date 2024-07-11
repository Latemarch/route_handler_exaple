import { NextRequest, NextResponse } from "next/server";
import client from "@/libs/server/client";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "@/libs/server/session";

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

  //sesion 처리
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  session.username = user.username;
  session.userId = user.id;
  session.isMember = user.is_member;
  session.isAdmin = user.is_admin;
  session.isSuperAdmin = user.is_superamin;
  await session.save();

  const { name, username, id } = user;
  return NextResponse.json({ ok: true, result: { id, name, username } });
}

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     description: Logs in a user by checking the provided email and password.
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
 *                 result:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     username:
 *                       type: string
 *                       example: johndoe
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
