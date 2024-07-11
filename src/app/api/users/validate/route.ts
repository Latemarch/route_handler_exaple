import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/libs/server/session";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return NextResponse.json({ ok: true, result: session });
}

/**
 * @swagger
 * /api/users/validate:
 *   get:
 *     summary: Retrieves the current session data
 *     description: Returns the session data for the current user.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Successfully retrieved session data
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
 *                     userId:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     isMember:
 *                       type: boolean
 *                       example: true
 *                     isAdmin:
 *                       type: boolean
 *                       example: true
 *                     isSuperAdmin:
 *                       type: boolean
 *                       example: true
 */
