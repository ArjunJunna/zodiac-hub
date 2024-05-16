import { Votes } from "./types";

export const countVotes = (votes: Votes[]) => {
  return votes.reduce((acc, vote) => {
    if (vote.type === 'UP') {
      acc++;
    } else if (vote.type === 'DOWN') {
      acc--;
    }
    return acc;
  }, 0);
};
