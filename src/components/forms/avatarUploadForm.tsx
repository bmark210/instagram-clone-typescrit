import { ChangeEvent, FC, useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../utils/firebase';
import useUserStore from '../../store/userStore';
import { useRef } from 'react';

const AvatarUploadForm: FC = () => {
  const { user, updateAvatar } = useUserStore();
  const inputRef = useRef(null);

  const [avatar, setAvatar] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files?.length) {
      setAvatar(event.target.files[0]);
    }
  };
  const handleUploadAvatar = async () => {
    try {
      setIsUploading(true);
      const storage = getStorage();
      if (avatar && user) {
        const storageRef = ref(storage, `avatars/${avatar.name}`);
        await uploadBytes(storageRef, avatar);

        const downloadUrl = await getDownloadURL(storageRef);
        const userRef = doc(firestore, `users/${user.userId}`);
        await setDoc(userRef, { avatarUrl: downloadUrl }, { merge: true });

        updateAvatar(downloadUrl);
      }
      setIsUploading(false);
      setAvatar(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center my-6 justify-center">
      <div>
        <label
          htmlFor="avatar-input"
          role="button"
          className="text-blue-primary
               w-full rounded h-8 p-2 font-bold"
        >
          download photo
        </label>
        <input
          type="file"
          id="avatar-input"
          ref={inputRef}
          onChange={handleAvatarChange}
          style={{ display: 'none' }}
        />
      </div>
      {(avatar || isUploading) && (
        <button onClick={handleUploadAvatar}>
          {isUploading ? (
            'Uploading...'
          ) : (
            <button className="bg-blue-primary text-white font-bold py-2 px-2 my-2 rounded">
              Upload Avatar
            </button>
          )}
        </button>
      )}
    </div>
  );
};

export default AvatarUploadForm;
