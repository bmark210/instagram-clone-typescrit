import { FC, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import * as ROUTES from '../constans/routes';
import { fetchUserByUsername, getPostsOfUser } from '../utils/firebase';
import { useParams } from 'react-router-dom';
import UserProfile from '../components/profile';
import { User } from '../models/user';
import { Post } from '../models/post';

const Profile: FC = () => {
  const { username } = useParams<{ username: string | undefined }>();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function checkUserExists() {
      if (username) {
        const user = await fetchUserByUsername(username);
        if (user?.userId) {
          setUser(user);
          const posts = await getPostsOfUser(user.userId);
          if (posts !== null) {
            setPosts(posts);
          }
        }
      } else {
        return <Navigate to={ROUTES.NOTFOUND} />;
      }
    }
    checkUserExists();
  }, [username]);

  return user?.username ? (
    <div className="mx-auto max-w-screen-lg">
      <UserProfile user={user} posts={posts} />
    </div>
  ) : null;
};
export default Profile;
