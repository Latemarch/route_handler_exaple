import client from "@/libs/server/client";

// 랜덤 문자열 생성 함수 (대문자만 포함)
export function generateRandomString(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// 유니크 그룹코드 생성 함수
export async function generateUniqueGroupCode(): Promise<string> {
  let isUnique = false;
  let groupCode = "";

  while (!isUnique) {
    groupCode = generateRandomString(4);
    const existingGroup = await client.group.findUnique({
      where: { groupCode },
    });
    if (!existingGroup) {
      isUnique = true;
    }
  }

  return groupCode;
}
