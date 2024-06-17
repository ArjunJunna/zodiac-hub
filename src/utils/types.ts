import { Dispatch, SetStateAction } from 'react';

// eslint-disable-next-line no-unused-vars
enum VoteType {
  // eslint-disable-next-line no-unused-vars
  UP = 'UP',
  // eslint-disable-next-line no-unused-vars
  DOWN = 'DOWN',
}

export type PostType = {
  id: string;
  title: string;
  content: string;
  image: string;
  createdAt: Date;
  author: {
    image: string;
    username: string;
  };
  forum: {
    id: string;
    image: string;
    _count: {
      posts: number;
      creator: number;
      subscribers: number;
    };
    name: string;
    description: string;
  };
  comments: CommentType[];
  votes: {
    type: VoteType;
  }[];
};

export type Votes = {
  type: VoteType;
};

export type ForumType = {
  id: string;
  name: string;
  description: string;
  image: string;
  subscribersCount: number;
  posts: PostsFromForumsType[];
};

export type PostsFromForumsType = {
  id: string;
  title: string;
  content: string;
  image: string;
  createdAt: Date;
  comments: {
    text: string;
    author: {
      username: string;
      image: string;
    };
    createdAt: string;
  }[];
  votes: {
    type: VoteType;
  }[];
  author: {
    image: string;
    username: string;
  };
};

export type AuthFormProp = {
  setShowAuthModal: Dispatch<SetStateAction<boolean>>;
  setShowSignIn: Dispatch<SetStateAction<boolean>>;
};

export type CreatedForumType = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  image: string | null;
  creatorId: string;
};

export type ForumCountType = {
  _count: {
    posts: number;
    subscribers: number;
  };
};

export type ExtendedCreatedForumType = CreatedForumType & ForumCountType;

export type SubscriptionType = {
  userId: string;
  forumId: string;
};
export type UserVoteType = {
  userId: string;
  postId: string;
  type: 'UP' | 'DOWN';
};
export type UserCommentType = {
  id: string;
  text: string;
  createdAt: string;
  authorId: string;
  postId: string;
  replyToId: string | null;
  commentId: string | null;
};

export type UserType = {
  id: string;
  username: string;
  email: string;
  image: string | null;
  createdForums: CreatedForumType[];
  subscriptions: SubscriptionType[];
  votes: UserVoteType[];
  post: [];
  comment: UserCommentType[];
  commentVote: [];
};

export type CommentType = {
  id: string;
  text: string;
  createdAt: string;
  authorId: string;
  postId: string;
  replyToId: string | null;
  commentId: string | null;
  author: {
    id: string;
    username: string;
    email: string;
    image: null;
  };
  votes: UserVoteType[];
  replies: CommentType[];
};
