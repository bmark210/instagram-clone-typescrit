import { FC } from 'react';
import { Post } from '../../types/post';
import ContentLoader from 'react-content-loader';
import CommentsIcon from '../ui/icons/CommentsIcon';
import HeartIcon from '../ui/icons/HeartIcon';

interface PhotosProps {
  photos: Post[];
}

const Photos: FC<PhotosProps> = ({ photos }) => {
  return (
    <div className="border-t border-gray-primary my-13 pt-4 max-w-screen-lg mx-auto">
      <div className="grid grid-cols-3 gap-1 mt-4 mb-12">
        {!photos
          ? new Array(12).fill(0).map((_, i) => (
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
            ))
          : photos.length > 0
          ? photos.map((photo) => (
              <div key={photo.postId} className="relative group">
                <img
                  className="max-h-[309px] flex min-w-full min-h-full"
                  src={photo.avatarUrl}
                  alt={photo.caption}
                />

                <div className="absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden">
                  <p className="flex items-center text-white font-bold">
                    <HeartIcon
                      fill="currentColor"
                      stroke="none"
                      classes="text-white"
                    />
                    {photo.likes.length}
                  </p>

                  <p className="flex items-center text-white font-bold">
                    <CommentsIcon
                      fill="currentColor"
                      stroke="none"
                      classes="text-white mr-4 "
                    />
                    {photo.comments?.length}
                  </p>
                </div>
              </div>
            ))
          : null}
      </div>

      {!photos ||
        (photos.length === 0 && (
          <p className="text-center text-2xl">No Posts Yet</p>
        ))}
    </div>
  );
};
export default Photos;
