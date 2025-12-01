import { configureStore } from '@reduxjs/toolkit'
import projectsReducer from './slices/projectsSlice'
import modalReducer from './slices/modalSlice'
import themeReducer from './slices/themeSlice'
import contactReducer from './slices/contactSlice'

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    modal: modalReducer,
    theme: themeReducer,
    contact: contactReducer,
  },
})