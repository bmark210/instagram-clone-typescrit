import { FC, RefObject } from 'react';
import { formatDistance } from 'date-fns';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AddComment from './AddComment';

interface Comment {
  comment: string;
  username: string;
}

interface CommentsProps {
  docId: string;
  allComments?: Comment[];
  posted: number;
  commentInput: RefObject<HTMLInputElement>;
}

const Comments: FC<CommentsProps> = ({
  docId,
  allComments,
  posted,
  commentInput,
}) => {
  const [comments, setComments] = useState<Comment[]>(allComments || []);
  const [commentsSlice, setCommentsSlice] = useState(3);
  const showNextComments = (): void => {
    setCommentsSlice(commentsSlice + 3);
  };

  if (comments === null) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.slice(0, commentsSlice).map((item) => (
          <p key={`${item.comment}-${item.username}`} className="mb-1">
            <Link to={`/p/${item.username}`}>
              <span className="mr-1 font-bold">{item.username}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        {comments.length >= 3 && commentsSlice < comments.length && (
          <button
            className="text-sm text-gray-base mb-1 cursor-pointer focus:outline-none"
            type="button"
            onClick={showNextComments}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                showNextComments();
              }
            }}
          >
            View more comments
          </button>
        )}
        <p className="text-gray-base uppercase text-xs m-2">
          {formatDistance(posted, new Date())} ago
        </p>
        <AddComment
          docId={docId}
          comments={comments}
          setComments={setComments}
          commentInput={commentInput}
        />
      </div>
    </>
  );
};

export default Comments;
