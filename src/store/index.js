import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import projectsReducer from './slices/projectsSlice';
import skillsReducer from './slices/skillsSlice';
import modalReducer from './slices/modalSlice';
import contactReducer from './slices/contactSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    projects: projectsReducer,
    skills: skillsReducer,
    modal: modalReducer,
    contact: contactReducer,
  },
});