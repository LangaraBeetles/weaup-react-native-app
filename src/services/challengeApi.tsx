import api from "@src/services/api";
import { ChallengeType } from "@src/interfaces/challenge.types";

const route = "challenges";

export const getChallengeById = async (id: string) => {
  const response = await api.get(`${route}/${id}`);
  return response;
};

export const createChallenge = async (challenge: ChallengeType) => {
  const response = await api.post(`${route}`, challenge);
  return response;
};
