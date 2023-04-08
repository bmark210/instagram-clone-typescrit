import { FC, useEffect, useState } from 'react';
import { getSuggestedProfiles } from '../../utils/firebase';
import SuggestedProfile from './suggestedProfile';
import ContentLoader from 'react-content-loader';
import { User } from '../../models/user';
import Modal from '../forms/modal';
import AllSuggestions from './allSuggestions';

const Suggestions: FC<{ user: User }> = ({ user }) => {
  const [profiles, setProfiles] = useState<User[]>([]);
  const userId = user ? user.userId : null;
  const following = user ? user.following : [];
  const [isOpen, setIsOpen] = useState(false);

  const handleShowModal = () => {
    return isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  useEffect(() => {
    async function fetchProfiles() {
      if (userId) {
        const response = await getSuggestedProfiles(userId, following);
        setProfiles(response);
      }
    }
    fetchProfiles();
  }, [userId, following]);

  if (isOpen) {
    return (
      <Modal
        onClick={handleShowModal}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        title="All suggestions"
      >
        <AllSuggestions profiles={profiles} />
      </Modal>
    );
  }

  return !userId ? (
    <svg viewBox="0 0 298 287" className="rounded-lg">
      <ContentLoader
        width={298}
        height={287}
        className="mb-5"
        viewBox="0 0 298 287"
        backgroundColor="#f0f0f0"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="0" ry="0" width="298" height="287" />
      </ContentLoader>
    </svg>
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="flex text-sm items-center justify-between">
        <p className="font-bold text-gray-base">Suggestions for you</p>
        {profiles.length > 5 && (
          <p
            role="button"
            onClick={handleShowModal}
            className="text-gray-medium font-medium p-1"
          >
            Show all
          </p>
        )}
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.slice(0, 5).map((profile: User) => (
          <SuggestedProfile
            key={profile.userId}
            avatarUrl={profile.avatarUrl}
            username={profile.username}
            userId={profile.userId}
          />
        ))}
      </div>
    </div>
  ) : null;
};

export default Suggestions;
