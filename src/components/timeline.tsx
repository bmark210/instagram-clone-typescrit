import { FC, useEffect, useState } from 'react';
import PostItem from './post';
import usePosts from '../hooks/usePosts';
import { User } from '../types/user';
import { Post } from '../types/post';

const Timeline: FC<{ user: User }> = ({ user }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [limitOfPosts, setLimitOfPosts] = useState<number>(3);
  const uploadPosts = () => {
    setLimitOfPosts(limitOfPosts + 3);
  };
  const newPosts = usePosts(user, limitOfPosts);

  useEffect(() => {
    if (newPosts) {
      setPosts(newPosts);
    }
  }, [user, newPosts]);

  return (
    <div className="container col-span-2">
      {user.following === undefined ? (
        <p>loading...</p>
      ) : user.following.length === 0 ? (
        <p className="flex justify-center font-bold">
          Follow other people to see posts
        </p>
      ) : posts?.length ? (
        posts.map((post) => <PostItem key={post.postId} post={post} />)
      ) : (
        <p className="flex justify-center font-bold">
          Your friends doesn't created posts yet.
        </p>
      )}
      <div className="w-full my-10 flex items-center justify-center">
        {posts.length >= 3 && (
          <button
            title="пока это работает только в том случае если постов больше чем в ленте"
            className="text-blue-primary
               w-full rounded h-8 p-2 font-bold"
            onClick={uploadPosts}
          >
            Upload more posts
          </button>
        )}
      </div>
    </div>
  );
};

export default Timeline;
