
import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/types';

interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    avatar: '/placeholder.svg',
    position: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'San Francisco',
    phone: '+1 (555) 123-4567',
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserProfile: (state, action) => {
      if (state.currentUser) {
        state.currentUser = {
          ...state.currentUser,
          ...action.payload,
        };
      }
    },
  },
});

export const { updateUserProfile } = userSlice.actions;

export default userSlice.reducer;
