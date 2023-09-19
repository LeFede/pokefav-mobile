import {FIREBASE_AUTH} from '@/config/firebase';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {User, signOut} from 'firebase/auth';

interface Initial {
  user: User | null;
}

const initialState: Initial = {
  user: null,
};

export const logOutUser = createAsyncThunk('user/logout', async () => {
  await signOut(FIREBASE_AUTH);
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state, action) => {
      state.user = null;
    },
  },
  extraReducers: builder => {
    // builder.addCase(fetchPokemons.fulfilled, (state, action) => {
    // state.pokemons = action.payload;
    // });
    builder.addCase(logOutUser.fulfilled, (state, action) => {
      state.user = null;
    });
  },
});

export default userSlice.reducer;
export const {setUser} = userSlice.actions;
