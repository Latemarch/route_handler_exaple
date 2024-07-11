// 예시

import { useQuery } from "react-query";
import { getReservations } from "@/services/reservation";

/**
 * 모든 예약리스트 불러오기
 * @returns {useQuery}
 */
export const useGetReservation = () => {
  return useQuery(["getReservations"], getReservations);
};
