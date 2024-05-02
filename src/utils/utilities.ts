import { Votes } from "./types";

export const countVotes = (votes: Votes[]) => {
  return votes.reduce((acc, vote) => {
    acc[vote.type] = (acc[vote.type] || 0) + 1;
    return acc;
  }, {} as { [key in Votes["type"]]: number });
};
