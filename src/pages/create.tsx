import { FC, useState } from 'react';
import CreateNewPost from '../components/forms/createNewPost';
import Modal from '../components/forms/modal';
import useUserStore from '../store/userStore';

const Create: FC = () => {
  const user = useUserStore(state => state.user)
  const [isOpen, setIsOpen] = useState(false);
  const handleShowModal = () => {
    return isOpen ? setIsOpen(false) : setIsOpen(true);
  };
  return (
    <>
      <div className="container flex mt-2 mx-auto max-w-screen-md justify-center items-center">
        <div className="flex w-4/8">
          <div className="flex items-center justify-between bg-white p-10 border border-gray-primary mb-4 rounded">
            <Modal
              onClick={handleShowModal}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              title="Creating new post"
            >
              <CreateNewPost user={user} />
            </Modal>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <p
              role="button"
              onClick={handleShowModal}
              className="text-blue-primary font-medium mx-5"
            >
              Create new post
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
