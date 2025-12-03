// Dark mode theme slice for Redux store //

import { createSlice } from '@reduxjs/toolkit';

// Initialiser le theme dès le départ
const initialMode = 'dark';
document.documentElement.setAttribute('data-theme', initialMode);

const initialState = {
  mode: initialMode,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', state.mode);
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      document.documentElement.setAttribute('data-theme', state.mode);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;