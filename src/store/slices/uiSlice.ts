
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  sidebarOpen: boolean;
  currentModal: string | null;
}

const initialState: UiState = {
  sidebarOpen: true,
  currentModal: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setCurrentModal: (state, action: PayloadAction<string | null>) => {
      state.currentModal = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, setCurrentModal } = uiSlice.actions;

export default uiSlice.reducer;
