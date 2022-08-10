import {
  characterdetailAPI,
  charactersearchAPI,
} from "../services/CharacterService";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import searchSlice from "./SearchReducer";
import userSlice from "./UserReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    search: searchSlice,
    user: userSlice,
    [characterdetailAPI.reducerPath]: characterdetailAPI.reducer,
    [charactersearchAPI.reducerPath]: charactersearchAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(characterdetailAPI.middleware)
      .concat(charactersearchAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
