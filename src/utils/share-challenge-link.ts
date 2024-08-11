const getShareChallengeLink = (challengeId: string, inviterId: string) => {
  return `alignmend://challenges/join-challenge?id=${challengeId}&user=${inviterId}`;
};

export default getShareChallengeLink;
