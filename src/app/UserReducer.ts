import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';



  export interface userState {
    guest_session_id: string;
  }
  
  const initialState: userState = {
    guest_session_id: '',
  };
  

  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      change: (state, action: PayloadAction<string>) => {
        state.guest_session_id = action.payload;
      },
    },  
    extraReducers: (builder) => {},

  });
  

  export const { change } = userSlice.actions;

  export const getUserSessionId = (state: RootState) => state.user.guest_session_id;


  export default userSlice.reducer;

