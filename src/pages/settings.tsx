import { FC, SyntheticEvent, useState } from 'react';
import Modal from '../components/forms/modal';
import useUserStore from '../store/userStore';
import AvatarUploadForm from '../components/forms/avatarUploadForm';

const Settings: FC = () => {
  const user = useUserStore((state) => state.user);
  const avatarUrl = user ? user.avatarUrl : null;
  const username = user ? user.username : null;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleShowModal = (): void => {
    return isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  function handleImageError(e: SyntheticEvent<HTMLImageElement, Event>) {
    const target = e.target as HTMLImageElement;
    const DEFAULT_IMAGE_PATH = '/images/default.png';
    target.src = DEFAULT_IMAGE_PATH;
  }
  return (
    <>
      <div className="container flex mt-2 mx-auto max-w-screen-md justify-center items-center">
        <div className="flex w-4/8">
          <div className="flex items-center justify-between bg-white p-10 border border-gray-primary mb-4 rounded">
            <Modal
              onClick={handleShowModal}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              title="Choose new avatar"
            >
              <AvatarUploadForm />
            </Modal>
            <img
              className="rounded-full object-cover h-12 w-12 mx-5"
              src={
                avatarUrl !== null
                  ? `${avatarUrl}`
                  : `/images/default.png`
              }
              alt={`${user?.username} profile`}
              onError={handleImageError}
            />
            <div className="">
              <h3 className="mx-5">{username}</h3>
              <p
                role="button"
                onClick={handleShowModal}
                className="text-blue-primary font-medium mx-5"
              >
                Change profile photo
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
