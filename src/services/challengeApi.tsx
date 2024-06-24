import api from "./api";

const route = "challenges";

export const getChallengeById = async (id: string) => {
  const response = await api.get(`${route}/${id}`);
  return response;
};
