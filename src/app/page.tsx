import PostSection from '@/components/server-components/PostSection';
import { postComment } from '@/actions/actions';

const Homepage = () => {
  return (
    <>
      <div className=" w-full p-2 h-fit max-md:mx-3 border-l border-r">
        <PostSection postComment={postComment} />
      </div>
    </>
  );
};

export default Homepage;
