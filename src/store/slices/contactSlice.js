// contact slice for Redux store //

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 1, // 1 à 4
  formData: {
    name: '',
    email: '',
    subject: '',
    message: '',
  },
  validationErrors: {},
  isSubmitting: false,
  submitSuccess: false,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.currentStep < 4) {
        state.currentStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    goToStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },
    submitForm: (state) => {
      state.isSubmitting = true;
    },
    submitSuccess: (state) => {
      state.isSubmitting = false;
      state.submitSuccess = true;
      state.currentStep = 4;
    },
    submitError: (state) => {
      state.isSubmitting = false;
    },
    resetForm: (state) => {
      state.currentStep = 1;
      state.formData = {
        name: '',
        email: '',
        subject: '',
        message: '',
      };
        state.validationErrors = {};
        state.isSubmitting = false;
        state.submitSuccess = false;
    },
  },
});

export const {
  nextStep,
  prevStep,
  goToStep,
  updateFormData,
  setValidationErrors,
  submitForm,
  submitSuccess,
  submitError,
  resetForm,
} = contactSlice.actions;

export default contactSlice.reducer;