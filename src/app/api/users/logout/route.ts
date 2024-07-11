import { SessionData, sessionOptions } from "@/libs/server/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  const result = session.destroy();
  return NextResponse.json({ ok: true });
}

/**
 * @swagger
 * /api/users/logout:
 *   get:
 *     summary: Logs out the current user
 *     description: Destroys the current session and logs out the user.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 */
