import { NextRequest, NextResponse } from "next/server";
import client from "@/libs/server/client";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/libs/server/session";
import { cookies } from "next/headers";
import { generateUniqueGroupCode } from "./funtions";

export async function POST(req: NextRequest) {
  const { groupName }: { [key: string]: string } = await req.json();
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isAdmin) {
    return NextResponse.json(
      { ok: false, error: "Permission denied" },
      { status: 403 }
    );
  }

  if (!groupName) {
    return NextResponse.json(
      { ok: false, error: "missing group name" },
      { status: 400 }
    );
  }

  // 그룹 이름 중복 검사
  const groupExists = await client.group.findUnique({
    where: { groupName },
  });

  if (groupExists) {
    return NextResponse.json(
      { ok: false, error: "Group name is already in use" },
      { status: 409 }
    );
  }

  const groupCode = await generateUniqueGroupCode();

  // 그룹 생성
  const group = await client.group.create({
    data: {
      groupCode,
      groupName,
      companyId: session.companyId!,
    },
  });

  return NextResponse.json({ ok: true, result: group });
}

/**
 * @swagger
 * /api/groups/create:
 *   post:
 *     summary: Create a new group
 *     description: Creates a new group with a unique group code and assigns it to the company of the admin user.
 *     tags:
 *       - Group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupName:
 *                 type: string
 *                 example: "Example Group"
 *     responses:
 *       200:
 *         description: Successfully created the group.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 result:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     groupCode:
 *                       type: string
 *                       example: "ABCD"
 *                     groupName:
 *                       type: string
 *                       example: "Example Group"
 *                     companyId:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Missing group name.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 error:
 *                   type: string
 *                   example: "missing group name"
 *       403:
 *         description: Permission denied.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 error:
 *                   type: string
 *                   example: "Permission denied"
 *       409:
 *         description: Group name is already in use.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 error:
 *                   type: string
 *                   example: "Group name is already in use"
 */
