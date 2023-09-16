import {createSlice} from '@reduxjs/toolkit';
import {User} from 'firebase/auth';

interface Initial {
  user: User | null;
}

const initialState: Initial = {
  user: null,
};

// const api = 'https://pokeapi.co/api/v2/pokemon?limit=20';

// export const fetchPokemons = createAsyncThunk('pokemon/fetch', async () => {
//   const res = await fetch(api);
//   const data = await res.json();

//   return data.results;
// });

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    // builder.addCase(fetchPokemons.fulfilled, (state, action) => {
    // state.pokemons = action.payload;
    // });
  },
});

export default userSlice.reducer;
export const {setUser} = userSlice.actions;
