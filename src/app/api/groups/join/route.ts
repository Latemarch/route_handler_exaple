import { NextRequest, NextResponse } from "next/server";
import client from "@/libs/server/client";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "@/libs/server/session";

export async function POST(req: NextRequest) {
  const { groupCode }: { groupCode: string } = await req.json();
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session) {
    return NextResponse.json(
      { ok: false, error: "Session not found" },
      { status: 404 }
    );
  }

  if (!groupCode) {
    return NextResponse.json(
      { ok: false, error: "Group code is missing" },
      { status: 400 }
    );
  }

  // 그룹 코드로 그룹 찾기
  const group = await client.group.findUnique({
    where: { groupCode },
  });

  if (!group) {
    return NextResponse.json(
      { ok: false, error: "Group not found" },
      { status: 404 }
    );
  }

  // 유저가 이미 그룹에 포함되어 있는지 확인
  const userGroup = await client.userGroups.findUnique({
    where: {
      userId_groupId: {
        userId: session.userId,
        groupId: group.id,
      },
    },
  });

  if (userGroup) {
    return NextResponse.json(
      { ok: false, error: "User is already a member of the group" },
      { status: 409 }
    );
  }

  // 유저를 그룹에 추가
  const newUserGroup = await client.userGroups.create({
    data: {
      userId: session.userId,
      groupId: group.id,
      assignedBy: session.userId.toString(), // 예시로 세션 유저 ID를 할당한 사람으로 설정
    },
  });

  return NextResponse.json({ ok: true, result: newUserGroup });
}
