// search and filter projects slice for Redux store //

import { createSlice } from '@reduxjs/toolkit';
import projectsData from '../../data/projects.json';

const initialState = {
  allProjects: projectsData.projects,
  filteredProjects: projectsData.projects,
  activeFilter: 'all', // 'all', 'html', 'css', 'javascript', 'react', 'optimization'
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.activeFilter = action.payload;
      
      if (action.payload === 'all') {
        state.filteredProjects = state.allProjects;
      } else {
        state.filteredProjects = state.allProjects.filter(project =>
          project.category.includes(action.payload)
        );
      }
    },
  },
});

export const { setFilter } = projectsSlice.actions;
export default projectsSlice.reducer;