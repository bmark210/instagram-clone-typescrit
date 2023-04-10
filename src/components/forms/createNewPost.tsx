import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { ChangeEvent, FC, useState } from 'react';
import { firestore } from '../../utils/firebase';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { useRef } from 'react';
import { User } from '../../types/user';

interface CreateNewPostProps {
  user: User | null;
}

const CreateNewPost: FC<CreateNewPostProps> = ({ user }) => {
  const inputRef = useRef(null);
  const [caption, setCaption] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const createNewPost = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const usersCollectionRef = collection(firestore, 'posts');

    setIsUploading(true);
    if (photo && user) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `photosForPosts/${user.username}/${Date.now()}`
      );

      await uploadBytes(storageRef, photo);
      const downloadUrl = await getDownloadURL(storageRef);

      const newPost = {
        avatarUrl: downloadUrl,
        caption: caption,
        dateCreated: Date.now(),
        userId: user.userId,
        likes: [],
      };

      await addDoc(usersCollectionRef, newPost);

      const q = query(
        usersCollectionRef,
        where('dateCreated', '==', newPost.dateCreated)
      );
      const querySnapshot = await getDocs(q);
      const postId = querySnapshot.docs[0].id;
      const userRef = doc(firestore, `posts/${postId}`);
      await setDoc(userRef, { postId }, { merge: true });

      setPhoto(null);
      setCaption('');
      setIsUploading(false);
    }
  };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files?.length) {
      setPhoto(event.target.files[0]);
    }
  };

  if (isUploading) return <h3>Uploading...</h3>;
  return (
    <div className="flex-row items-center my-6 justify-between text-center">
      <div className="flex">
        <input
          ref={inputRef}
          id="photo-input"
          type="file"
          className="hidden"
          onChange={handlePhotoChange}
        />
        <label
          role="button"
          className="bg-blue-primary
      text-white border border-gray-primary w-full my-2 h-full rounded font-bold p-1"
          htmlFor="photo-input"
        >
          Upload photo for post
        </label>
      </div>
      {photo && (
        <input
          aria-label="Enter some caption"
          id="caption-input"
          type="text"
          placeholder="Caption for post"
          className="text-sm text-gray-base w-full py-4 px-4 h-2 border border-gray-primary rounded mb-2"
          onChange={({ target }) => setCaption(target.value)}
          value={caption}
          maxLength={70}
        />
      )}
      {(photo || isUploading) && (
        <button
          onClick={createNewPost}
          type="submit"
          className={`bg-blue-primary
              } text-white w-full my-2 rounded font-bold py-1
            ${!photo && 'opacity-50'}`}
        >
          Create new post
        </button>
      )}
    </div>
  );
};

export default CreateNewPost;
