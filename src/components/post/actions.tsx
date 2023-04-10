import { FC, useState } from 'react';
import { firestore } from '../../utils/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import useUserStore from '../../store/userStore';
import { useEffect } from 'react';
import Comments from '../ui/icons/CommentsIcon';
import Heart from '../ui/icons/HeartIcon';

interface ActionsProps {
  postId: string;
  likesArray: string[];
  likesLength: number;
}

const Actions: FC<ActionsProps> = ({ postId, likesArray }) => {
  const currentUser = useUserStore((state) => state.user);

  const [toggleLiked, setToggleLiked] = useState(false);
  const [likesLength, setLikesLength] = useState(likesArray.length);

  useEffect(() => {
    const chechIfPostIsLiked = async () => {
      if (currentUser) {
        const docRef = doc(firestore, 'posts', postId);
        const postSnapshot = await getDoc(docRef);
        const postData = postSnapshot?.data();
        if (postData) {
          const hasLiked = postData.likes.includes(currentUser.userId);
          if (hasLiked) {
            setToggleLiked(true);
          }
        }
      }
    };
    chechIfPostIsLiked();
  }, [postId]);

  async function handleToggleLiked() {
    setToggleLiked((toggleLiked) => !toggleLiked);

    const docRef = doc(firestore, 'posts', postId);
    const postSnapshot = await getDoc(docRef);
    const postData = postSnapshot?.data();
    if (postData && currentUser) {
      const updatedLikes = toggleLiked
        ? postData.likes.filter((x: string) => x !== currentUser.userId)
        : [...postData.likes, currentUser.userId];

      await updateDoc(docRef, { likes: updatedLikes });

      setLikesLength(toggleLiked ? likesLength - 1 : likesLength + 1);
    }
  }

  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex">
          <Heart
            handleToggleLiked={handleToggleLiked}
            toggleLiked={toggleLiked}
            fill="none"
            stroke="currentColor"
            classes="toggleLiked ? 'fill-red text-red-primary' : 'text-black-light'"
          />
          <Comments
            fill="none"
            stroke="currentColor"
            classes="text-black-light"
          />
        </div>
      </div>
      <div className="p-4 py-0">
        <p className="font-bold">
          {likesLength === 1 ? `${likesLength} like` : `${likesLength} likes`}
        </p>
      </div>
    </>
  );
};
export default Actions;
