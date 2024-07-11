import { Dispatch, SetStateAction } from "react";
import BaseInput from "@/components/input/BaseInput";

interface LoginFormProps {
  id: string;
  password: string;
  setId: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
}

export default function LoginForm({
  id,
  password,
  setId,
  setPassword,
}: LoginFormProps) {
  return (
    <div>
      <BaseInput
        type="text"
        maxLength={13}
        placeholder="휴대폰 번호 입력"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <BaseInput
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
}
