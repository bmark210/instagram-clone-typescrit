import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { firestore } from '../utils/firebase';
import { User } from '../types/user';
import { Post } from '../types/post';

export async function fetchUserByEmail(
  emailAddress: string
): Promise<User | null> {
  const collectionRef = collection(firestore, 'users');
  const q = query(collectionRef, where('email', '==', emailAddress));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    console.log('No matching documents.');
    return null;
  } else {
    const user = querySnapshot.docs[0].data();
    return user as User;
  }
}

export async function getPostsByFollowing(
  following: string[],
  limitOfPosts: number
) {
  const collectionRef = collection(firestore, 'posts');
  const q = query(
    collectionRef,
    where('userId', 'in', following),
    limit(limitOfPosts)
  );
  const querySnapshot = await getDocs(q);
  const userFollowedPosts = querySnapshot.docs.map((post) => ({
    ...post.data(),
  }));

  return userFollowedPosts as Post[];
}

export async function fetchUserById(userId: string) {
  const collectionRef = collection(firestore, 'users');
  const q = query(collectionRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    console.log('No matching documents.');
    return null;
  } else {
    const user = querySnapshot.docs[0].data();
    return user as User;
  }
}

export async function getSuggestedProfiles(
  userId: string,
  following: string[]
) {
  let q = query(collection(firestore, 'users'));

  if (following.length > 0) {
    q = query(q, where('userId', 'not-in', [...following, userId]));
  } else {
    q = query(q, where('userId', '!=', userId));
  }
  const querySnapshot = await getDocs(q);
  const profiles = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
  return profiles as User[];
}

export async function fetchUserByUsername(username: string) {
  const collectionRef = collection(firestore, 'users');
  const q = query(collectionRef, where('username', '==', username));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    console.log('No matching documents.');
    return null;
  } else {
    const user = querySnapshot.docs[0].data();
    const fetchedUser = { ...user };
    return fetchedUser as User;
  }
}

export async function getPostsOfUser(userId: string) {
  const collectionRef = collection(firestore, 'posts');
  const q = query(collectionRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const usersPosts = querySnapshot.docs.map((post) => ({
    ...post.data(),
  }));
  return usersPosts as Post[];
}

export async function updateCommentsByPostId(
  docId: string,
  username: string,
  comment: string
) {
  const userDocRef = doc(firestore, `posts/${docId}`);
  await updateDoc(userDocRef, {
    comments: arrayUnion({ username, comment }),
  });

  return { displayName: username, comment };
}

export async function doesUsernameExists(username: string) {
  try {
    const q = query(
      collection(firestore, 'users'),
      where('username', '==', username.toLowerCase())
    );
    const querySnapshot = await getDocs(q);
    // return querySnapshot.size > 0;

    return querySnapshot.docs.map((user) => user.data().length > 0);
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function isUserFollowingProfile(
  userId: string,
  profileId: string
) {
  try {
    const q = query(
      collection(firestore, 'users'),
      where('userId', '==', userId),
      where('following', 'array-contains', profileId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function toggleFollow(userId: string, profileId: string) {
  await updateFollowingsByUser(userId, profileId);
  await updateFollowersByUser(userId, profileId);
}

export async function updateFollowingsByUser(
  userId: string,
  profileId: string
) {
  const userDocRef = doc(firestore, `users/${userId}`);
  await updateDoc(userDocRef, {
    following: arrayUnion(profileId),
  });

  return profileId;
}

export async function updateFollowersByUser(userId: string, profileId: string) {
  const userDocRef = doc(firestore, `users/${profileId}`);
  await updateDoc(userDocRef, {
    folowers: arrayUnion(userId),
  });
  return userId;
}

export async function toggleUnfollow(userId: string, profileId: string) {
  await deleteFollowingIdFromCurUser(userId, profileId);
  await deleteFolowerIdFromProfile(userId, profileId);
}
export async function deleteFollowingIdFromCurUser(
  userId: string,
  profileId: string
) {
  const userDocRef = doc(firestore, `users/${userId}`);
  await updateDoc(userDocRef, {
    following: arrayRemove(profileId),
  });
}
export async function deleteFolowerIdFromProfile(
  userId: string,
  profileId: string
) {
  const userDocRef = doc(firestore, `users/${profileId}`);
  await updateDoc(userDocRef, {
    folowers: arrayRemove(userId),
  });
}
