// 예시

import { useQuery } from "react-query";
import { getUsers } from "@/services/user";

/**
 * 모든 유저리스트 불러오기
 * @returns {useQuery} IQueryUserList
 */
export const useGetUser = () => {
  return useQuery(["users"], getUsers);
};
