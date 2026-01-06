import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import auth from './firebase.config';

const googleProvider = new GoogleAuthProvider();

export const googleLogin = () => signInWithPopup(auth, googleProvider);
