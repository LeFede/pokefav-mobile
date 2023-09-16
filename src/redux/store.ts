import {configureStore} from '@reduxjs/toolkit';
import pokemonSlice from './pokemonSlice';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    pokemon: pokemonSlice,
    user: userSlice,
  },
});
