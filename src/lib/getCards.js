import axios from "axios";

export const getCards = async () => {
  const { data } = await axios.get("/cards");
  return data;
};
