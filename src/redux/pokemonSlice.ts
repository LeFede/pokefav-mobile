import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
  pokemons: [],
};

const api = 'https://pokeapi.co/api/v2/pokemon?limit=20';

export const fetchPokemons = createAsyncThunk('pokemon/fetch', async () => {
  const res = await fetch(api);
  const data = await res.json();

  return data.results;
});

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    addPokemons: (state, action) => {
      state.pokemons = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPokemons.fulfilled, (state, action) => {
      state.pokemons = action.payload;
    });
  },
});

export default pokemonSlice.reducer;
export const {addPokemons} = pokemonSlice.actions;
