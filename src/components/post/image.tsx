import { FC } from 'react';

interface ImageProps {
  photoUrl: string;
  caption?: string;
}

const Image: FC<ImageProps> = ({ photoUrl, caption }) => {
  return <img className="w-full" src={photoUrl} alt={caption} />;
};

export default Image;
