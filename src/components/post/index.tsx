import { FC, useEffect, useState, useRef } from 'react';
import Header from './header';
import Image from './image';
import { fetchUserById } from '../../db/firebase';
import { Post } from '../../types/post';
import { User } from '../../types/user';
import ContentLoader from 'react-content-loader';
import Comments from './comments';
import Actions from './actions';
import Footer from './Footer';

interface PostProp {
  post: Post;
}

const PostItem: FC<PostProp> = ({ post }) => {
  const commentInput = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const avatarUrl = user ? user.avatarUrl : null;
  useEffect(() => {
    async function fetchUser() {
      const user = await fetchUserById(post.userId);
      setUser(user);
    }
    fetchUser();
  }, [post?.userId]);
  if (!user) {
    return (
      <svg viewBox="0 0 675 506" className="rounded-lg">
        <ContentLoader
          width={675}
          height={506}
          className="mb-5"
          viewBox="0 0 675 506"
          backgroundColor="#f0f0f0"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="0" ry="0" width="675" height="506" />
        </ContentLoader>
      </svg>
    );
  }
  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
      <Header username={user.username} avatarUrl={avatarUrl} />
      <div className="flex items-center justify-center">
        <Image photoUrl={post.imageUrl} caption={post.text} />
      </div>
      <Actions
        likesArray={post.likes}
        likesLength={post.likes.length}
        postId={post.postId}
      />
      <Footer caption={post.caption} username={user.username} />
      <Comments
        docId={post.postId}
        allComments={post.comments}
        posted={post.dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
};

export default PostItem;
