import { FC } from 'react';
import { Post } from '../../models/post';
import ContentLoader from 'react-content-loader';

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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-8 mr-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {photo.likes.length}
                  </p>

                  <p className="flex items-center text-white font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-8 mr-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    </svg>
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
