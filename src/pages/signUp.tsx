import React, { useState, useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constans/routes';
import { doesUsernameExists } from '../db/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { auth, firestore } from '../utils/firebase';
import InstagramLoading from '../components/ui/InstagramLoading';
import useUserStore from '../store/userStore';

const SignUp: FC = () => {
  const navigate = useNavigate();
  const { login } = useUserStore();
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | string>('');

  const isInvalid = password == '' || emailAddress == '';

  const handleSignUp = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const userNameExists = await doesUsernameExists(userName);
    console.log(userNameExists);

    if (auth.currentUser) {
      try {
        setLoading(true);
        await createUserWithEmailAndPassword(auth, emailAddress, password);

        const newUser = {
          avatarUrl: null,
          username: userName.toLowerCase(),
          fullName,
          email: emailAddress.toLowerCase(),
          following: [],
          folowers: [],
          dateCreated: Date.now(),
        };

        const usersCollectionRef = collection(firestore, 'users');

        await addDoc(usersCollectionRef, newUser);

        const q = query(usersCollectionRef, where('email', '==', emailAddress));
        const querySnapshot = await getDocs(q);

        const userId = querySnapshot.docs[0].id;
        const userRef = doc(firestore, `users/${querySnapshot.docs[0].id}`);
        await setDoc(userRef, { userId }, { merge: true });
        login({ ...newUser, userId: userId });
        navigate(ROUTES.DASHBOARD, { replace: true });
      } catch (error: any) {
        setFullName('');
        setUserName('');
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setError('That username is already taken, please try another.');
    }
  };

  useEffect(() => {
    document.title = 'SignUp - Instagram';
  }, []);
  if (loading) return <InstagramLoading />;
  return (
    <div className="container flex mx-auto max-w-screen-md items-center justify-center h-screen">
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-10 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Instagram"
              className="mt-2 w-8/12 mb-4"
            />
          </h1>
          <h2 className="text-center w-50 text-gray-medium font-medium mb-4">
            Sign up to see photos and videos of your friends.
          </h2>

          {error && (
            <p className="mb-4 text-xs text-red-primary">{error.toString()}</p>
          )}

          <form onSubmit={handleSignUp} method="POST">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-4 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUserName(target.value)}
              value={userName}
            />
            <input
              aria-label="Enter your fullName"
              type="text"
              placeholder="Full Name"
              className="text-sm text-gray-base w-full mr-3 py-4 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-4 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-4 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-primary
              } text-white w-full rounded h-8 font-bold
            ${isInvalid && 'opacity-50'}`}
            >
              Sign up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Already have an account?{` `}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-primary">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
