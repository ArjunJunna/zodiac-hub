import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ArrowBigDown, ArrowBigUp, MessageSquare } from 'lucide-react';
import { PostType, PostVote } from '@/utils/types';
import { useSession } from 'next-auth/react';
import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '@/lib/Constants';

type PostFooterProps = {
  postId: string;
  voteCount: number;
  commentsCount: number;
  post: PostType;
  setShowAuthModal: Dispatch<SetStateAction<boolean>>;
};

const PostFooter = ({
  commentsCount,
  post,
  setShowAuthModal,
}: PostFooterProps) => {
  const { data: session } = useSession();
  const getVotesByType = (type: string) =>
    post.votes.filter((item) => item.type === type).map((item) => item.userId);

  const hasUserVoted = (type: string) =>
    getVotesByType(type).includes(session?.user.id as string);

  const [liked, setLiked] = useState(() => hasUserVoted('UP'));
  const [disliked, setDisliked] = useState(() => hasUserVoted('DOWN'));
  const [likes, setLikes] = useState(() => getVotesByType('UP'));
  const [dislikes, setDislikes] = useState(() => getVotesByType('DOWN'));

  useEffect(() => {
    if (session) {
      const getUserVoteStatus = (type: string) =>
        post.votes.some(
          (item) => item.type === type && item.userId === session.user.id
        );

      const getVotesByType = (type: string) =>
        post.votes
          .filter((item) => item.type === type)
          .map((item) => item.userId);

      setLiked(getUserVoteStatus('UP'));
      setLikes(getVotesByType('UP'));
      setDisliked(getUserVoteStatus('DOWN'));
      setDislikes(getVotesByType('DOWN'));
    }
  }, [post.votes, session]);

  const voteHandler = async (voteDirection: string) => {
    if (!session) {
      setShowAuthModal(true);
      return;
    }
    const postId = post.id;
    const notLikedByUser = likes?.filter(
      (userId) => userId !== session.user.id
    );
    const like = [...(likes ?? []), session.user.id];
    const newLike = liked ? notLikedByUser : like;

    setLiked(!liked);
    setLikes(newLike);
    const notDislikedByUser = dislikes?.filter(
      (userId) => userId !== session.user.id
    );
    const dislike = [...(likes ?? []), session.user.id];
    const newDislike = liked ? notDislikedByUser : dislike;

    setDisliked(!disliked);
    setDislikes(newDislike);

    try {
      if (voteDirection === 'UP') {
        const response: AxiosResponse<PostVote[]> = await axios.post<
          PostVote[]
        >(
          `${BASE_URL}/posts/${postId}/upvote`,
          { userId: session?.user.id, type: voteDirection },
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          }
        );
        if (response.status !== 200) {
          setLikes(() => {
            const votes = response.data
              .filter((item) => item.type === 'UP')
              .map((item) => item.userId);
            return votes;
          });
          setLiked(() => {
            const votes = response.data
              .filter((item) => item.type === 'UP')
              .map((item) => item.userId);
            return votes.includes(session.user.id);
          });
          setDisliked(() => {
            const votes = response.data
              .filter((item) => item.type === 'DOWN')
              .map((item) => item.userId);
            return votes.includes(session.user.id);
          });
        }
      } else {
        const response: AxiosResponse<PostVote[]> = await axios.delete<
          PostVote[]
        >(`${BASE_URL}/posts/${postId}/downvote`, {
          data: { userId: session?.user.id, type: voteDirection },
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        });
        setLiked(false);
        if (response.status === 200) {
          setLikes(() => {
            const votes = response.data
              .filter((item) => item.type === 'UP')
              .map((item) => item.userId);
            return votes;
          });
        }
      }
    } catch (error) {
      console.error('Failed to handle post vote:', error);
    }
  };

  return (
    <div className="flex justify-between pt-1 ">
      <div className="flex gap-x-2 items-center justify-center">
        <button
          onClick={() => voteHandler('UP')}
          className="flex items-center gap-1 rounded-lg text-gray-600 hover:text-black"
        >
          <ArrowBigUp />
        </button>

        {likes && likes.length > 0 && (
          <p className="text-xs self-center">{likes.length}</p>
        )}

        <button
          onClick={() => voteHandler('DOWN')}
          className="flex items-center gap-1 rounded-lg text-gray-600 hover:text-black"
        >
          <ArrowBigDown />
        </button>

        <button className="flex gap-x-1 hover:text-blue-400">
          <MessageSquare />
        </button>
        <p className="text-xs self-center">{commentsCount}</p>
      </div>
    </div>
  );
};

export default PostFooter;
