import api from "@src/services/api";
import {
  ChallengeInputType,
  ChallengeStatusEnum,
} from "@src/interfaces/challenge.types";

const route = "challenges";

export const getChallengeById = async (id: string) => {
  const response = await api.get(`${route}/${id}`);
  return response.data;
};

export const createChallenge = async (challenge: ChallengeInputType) => {
  const response = await api.post(`${route}`, challenge);
  return response.data;
};

export const getOngoingChallenges = async (
  filterUser: boolean,
  sortDesc: number,
) => {
  const response = await api.get(
    `${route}/?showOngoing=true&sortDesc=${sortDesc}&filterUser=${filterUser}`,
  );
  return response.data;
};

export const getPastChallenges = async (
  filterStatus: ChallengeStatusEnum | undefined,
  sortDesc: number,
) => {
  const status = filterStatus ? `&filterStatus=${filterStatus}` : ``;
  const response = await api.get(route, {
    params: {
      filterUser: true,
      showOngoing: false,
      sortDesc,
      filterStatus: status,
    },
  });
  return response.data;
};
