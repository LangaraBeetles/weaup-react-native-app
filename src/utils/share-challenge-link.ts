const getShareChallengeLink = (challengeId: string, inviterId: string) => {
  return `weaup://challenges/join-challenge?id=${challengeId}&user=${inviterId}`;
};

export default getShareChallengeLink;
