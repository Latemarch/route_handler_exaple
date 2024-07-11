import Button from "@/components/button/BaseButton";
import Link from "next/link";

export default function Navigation() {
  return (
    <header>
      <nav>
        {/* 로고 */}
        <Link href={`/dashboard`}>logo</Link>

        {/* 메뉴리스트 */}
        <ul>
          <li>
            <Link href={`/reservation`}>예약</Link>
          </li>
          <li>
            <Link href={`/record`}>녹음</Link>
          </li>
          <li>
            <Link href={`/note`}>노트</Link>
          </li>
        </ul>

        {/* 피드백 제안 버튼 및 로그아웃 */}
        <div>
          <Button title="피드백 제안" bgColor="secondary" />
          {/* <Logout /> */}
        </div>
      </nav>
    </header>
  );
}
