import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';



  export interface searchState {
    search: string;
    type: string;
  }
  
  const initialState: searchState = {
    search: '',
    type: 'movie',
  };
  

  export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
      changeSearch: (state, action: PayloadAction<string>) => {
        state.search = action.payload;
      },
      changeType: (state, action: PayloadAction<string>) => {
        state.type = action.payload;
      },

    },  
    extraReducers: (builder) => {},

  });
  

  export const { changeSearch, changeType } = searchSlice.actions;

  export const selectSearch = (state: RootState) => state.search.search;

  export const selectType = (state: RootState) => state.search.type;

  export default searchSlice.reducer;

