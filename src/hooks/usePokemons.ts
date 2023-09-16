import {fetchPokemons} from '@/redux';
import {AppDispatch} from '@/types';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

export const usePokemons = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);
};
