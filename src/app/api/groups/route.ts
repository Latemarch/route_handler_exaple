import { NextResponse } from "next/server";
import client from "@/libs/server/client";

export async function GET(req: Request) {
  // const url = new URL(req.url);

  const result = await client.group.findMany();

  return NextResponse.json({ ok: true, result });
}

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Get all groups
 *     description: Retrieves a list of all groups.
 *     tags:
 *       - Group
 *     responses:
 *       200:
 *         description: A list of groups.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       groupCode:
 *                         type: string
 *                         example: "ABCD"
 *                       groupName:
 *                         type: string
 *                         example: "Example Group"
 *                       companyId:
 *                         type: integer
 *                         example: 1
 */
