import { FC } from 'react';
import { User } from '../../types/user';
import SuggestedProfile from './suggestedProfile';

interface AllSuggestionsProps {
  profiles: User[];
}

const AllSuggestions: FC<AllSuggestionsProps> = ({ profiles }) => {
  return (
    <div className="mt-4 grid gap-5">
      {profiles.map((profile) => (
        <SuggestedProfile
          key={profile.userId}
          avatarUrl={profile.avatarUrl}
          username={profile.username}
          userId={profile.userId}
        />
      ))}
    </div>
  );
};
export default AllSuggestions;
