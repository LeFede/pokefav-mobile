import {FIREBASE_AUTH} from '@/config/firebase';
import {setUser} from '@/redux';
import {AppDispatch} from '@/types';
import {onAuthStateChanged} from 'firebase/auth';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const listen = onAuthStateChanged(FIREBASE_AUTH, user => {
      if (user) {
        dispatch(setUser({email: user.email, uid: user.uid}));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => {
      listen();
    };
  }, []);
};
