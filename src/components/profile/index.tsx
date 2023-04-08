import { FC, useEffect } from 'react';
import { User } from '../../models/user';
import { Post } from '../../models/post';
import Header from '../profile/header';
import Photos from '../profile/photos';

interface UserProfileProps {
  user: User;
  posts: Post[];
}

const UserProfile: FC<UserProfileProps> = ({ user, posts }) => {
  useEffect(() => {
    document.title = user.fullName ? user.fullName : 'Instagram';
  }, [user]);

  return (
    <>
      <Header
        photosCount={posts ? posts.length : 0}
        profile={user}
        followers={user.folowers}
      />
      <Photos photos={posts} />
    </>
  );
};
export default UserProfile;
