// API Requests

import axios from "axios";

export const getReservations = async () => {
  try {
    const { data } = await axios.get(`/api/test`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
