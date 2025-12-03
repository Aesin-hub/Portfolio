// search and filter skills slice for Redux store //

import { createSlice } from '@reduxjs/toolkit';
import skillsData from '../../data/skills.json';

const initialState = {
  categories: skillsData.skillCategories,
  activeCategory: 'all', // 'all', 'frontend', 'backend', 'tools'
  filteredSkills: [],
};

// Fonction helper pour obtenir toutes les skills
const getAllSkills = (categories) => {
  return categories.flatMap(category => category.skills);
};

const skillsSlice = createSlice({
  name: 'skills',
  initialState: {
    ...initialState,
    filteredSkills: getAllSkills(skillsData.skillCategories),
  },
  reducers: {
    setSkillCategory: (state, action) => {
      state.activeCategory = action.payload;
      
      if (action.payload === 'all') {
        state.filteredSkills = getAllSkills(state.categories);
      } else {
        const category = state.categories.find(cat => cat.id === action.payload);
        state.filteredSkills = category ? category.skills : [];
      }
    },
  },
});

export const { setSkillCategory } = skillsSlice.actions;
export default skillsSlice.reducer;