import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isMenuOpen: boolean;
  isSearchOpen: boolean;
  searchQuery: string;
}

const initialState: UiState = {
  isMenuOpen: false,
  isSearchOpen: false,
  searchQuery: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    closeSearch: (state) => {
      state.isSearchOpen = false;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  toggleMenu,
  closeMenu,
  toggleSearch,
  closeSearch,
  setSearchQuery,
} = uiSlice.actions;

export default uiSlice.reducer;