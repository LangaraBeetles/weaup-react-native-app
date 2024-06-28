import api from "@src/services/api";
import { ChallengeInputType } from "@src/interfaces/challenge.types";

const route = "challenges";

export const getChallengeById = async (id: string) => {
  const response = await api.get(`${route}/${id}`);
  return response;
};

export const createChallenge = async (challenge: ChallengeInputType) => {
  const response = await api.post(`${route}`, challenge);
  return response.data;
};

export const getChallenges = async () => {
  const response = await api.get(`${route}`);
  return response.data;
};
