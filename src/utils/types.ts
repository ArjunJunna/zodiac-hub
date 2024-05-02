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
    image: string;
    _count: {
      posts: number;
      creator: number;
      subscribers: number;
    };
    name: string;
    description: string;
  };
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
};

enum VoteType {
  UP = "UP",
  DOWN = "DOWN",
}

export type Votes={
  type:VoteType
}