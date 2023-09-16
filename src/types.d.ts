import {store} from './redux';

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
