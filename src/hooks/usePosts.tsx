import { useEffect, useState } from 'react';
import { Post } from '../models/post';
import { User } from '../models/user';
import { getPostsByFollowing } from '../utils/firebase';

const usePosts = (user: User, limitOfPosts: number): Post[] | null => {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (user.following.length > 0) {
        const userPosts = await getPostsByFollowing(
          user.following,
          limitOfPosts
        );
        userPosts.sort((a, b) => b.dateCreated - a.dateCreated);
        setPosts(userPosts as Post[]);
      }
    };
    fetchPosts();
  }, [user, limitOfPosts, user.following]);

  return posts;
};

export default usePosts;
