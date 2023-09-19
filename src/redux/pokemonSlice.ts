import {Pokemon} from '@/components';
import {FIREBASE_DB} from '@/config/firebase';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore/lite';

const initialState: IPokemonState = {
  pokemons: [],
  favs: [],
};

interface IPokemonState {
  pokemons: Pokemon[];
  favs: number[];
}

const api = 'https://pokeapi.co/api/v2/pokemon?limit=20';

export const setFav = createAsyncThunk(
  'pokemon/setFav',
  async ({userId, itemId}: {userId: string; itemId: number}) => {
    const docRef = doc(FIREBASE_DB, `favs/${userId}`);
    const query = await getDoc(docRef);

    if (query.exists()) {
      const previous = query.data();
      if (previous.favs.find(fav => fav.id === itemId.id)) {
        const newFavs = previous.favs.filter(fav => fav.id !== itemId.id);
        await setDoc(docRef, {favs: newFavs});
        console.log('aca');
        return newFavs.map(fav => fav.id);
      } else {
        await setDoc(docRef, {favs: [...previous.favs, itemId]});
        return itemId.id;
      }
    } else {
      await setDoc(docRef, {favs: [itemId]});
      return itemId.id;
    }
  },
);

export const fetchFavs = createAsyncThunk(
  'pokemon/fetchFavs',
  async (userId: string) => {
    console.log('fetching favs!');
    // query(collection(db, "cities"), where("capital", "==", true));

    // let favsRef = query(collection(FIREBASE_DB, 'favs'), where());
    let favsRef = collection(FIREBASE_DB, 'favs');
    const snapshot = await getDocs(favsRef);
    const favsList = snapshot.docs.map(doc => ({data: doc.data(), id: doc.id}));
    const {
      data: {favs},
    } = favsList.find(doc => doc.id === userId);
    return favs;
  },
);

export const fetchPokemons = createAsyncThunk('pokemon/fetch', async () => {
  let res;

  res = await fetch(api);
  res = await res.json();

  res = res.results.map((e: any) => fetch(e.url));
  res = await Promise.all(res);
  res = await Promise.all(res.map(e => e.json()));

  return res.map(e => ({
    weight: e.weight,
    height: e.height,
    name: e.name,
    id: e.id,
    fav: false,
  }));
});

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    addPokemons: (state, action) => {
      state.pokemons = action.payload;
    },
    resetFav: state => {
      state.favs = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPokemons.fulfilled, (state, action) => {
      state.pokemons = action.payload;
    });
    builder.addCase(fetchFavs.fulfilled, (state, action) => {
      const favIds = action.payload.map(fav => fav.id);
      state.favs = favIds;
      // console.log(state.favs);
    });
    builder.addCase(setFav.fulfilled, (state, action) => {
      console.log('inside set fav');

      if (typeof action.payload === 'number') {
        state.favs = [...state.favs, action.payload];
        return;
      }

      state.favs = action.payload;
    });
  },
});

export default pokemonSlice.reducer;
export const {addPokemons, resetFav} = pokemonSlice.actions;
