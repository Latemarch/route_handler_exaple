"use client";

import { useState } from "react";
import { useGetReservation } from "@/hooks/queries/useReservation";
import LoginForm from "./LoginForm";
import BaseButton from "@/components/button/BaseButton";

export default function LoginFormContainer() {
  const { data } = useGetReservation();
  console.log(data);

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {};

  return (
    <>
      <LoginForm
        id={id}
        password={password}
        setId={setId}
        setPassword={setPassword}
      />
      <BaseButton title="로그인" size="lg" onClick={handleClick} />
    </>
  );
}
