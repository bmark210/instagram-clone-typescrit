import { FC, RefObject, useState } from 'react';
import { updateCommentsByPostId } from '../../utils/firebase';
import useUserStore from '../../store/userStore';

interface Comment {
  comment: string;
  username: string;
}

interface AddCommentProps {
  docId: string;
  comments?: Comment[];
  setComments?: React.Dispatch<React.SetStateAction<Comment[]>>;
  commentInput: RefObject<HTMLInputElement>;
}

const AddComment: FC<AddCommentProps> = ({
  docId,
  comments,
  setComments,
  commentInput,
}) => {
  const user = useUserStore((state) => state.user);

  const [commentText, setCommentText] = useState<string>('');

  const handleSubmitComment = async (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (user && comments && setComments) {
      setComments([
        ...comments,
        { username: user.username, comment: commentText },
      ]);
      setCommentText('');
      const username = user.username;
      await updateCommentsByPostId(docId, username, commentText);
    }
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
          commentText.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault()
        }
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={commentText}
          onChange={({ target }) => setCommentText(target.value)}
          ref={commentInput}
          maxLength={70}
        />
        <button
          className={`text-sm font-bold text-blue-primary ${
            !commentText && 'opacity-25'
          }`}
          type="button"
          disabled={commentText.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
};
export default AddComment;
