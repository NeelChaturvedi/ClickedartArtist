import { create } from 'zustand';

const initialFormData = {
  // Step 1
  email: '',
  password: '',
  username: '',

  // Step 2
  firstName: '',
  lastName: '',
  bio: '',
  dob: '',
  connectedAccounts: [
    {
      accountName: '',
      accountLink: '',
    },
  ],

  // Step 3
  mobile: '',
  shippingAddress: {
    address: '',
    city: '',
    state: '',
    country: 'India',
    landmark: '',
    pincode: '',
    area: '',
  },
};

export const useRegistrationStore = create((set) => ({
  formData: initialFormData,
  currentStep: 1,

  // Update top-level fields
  setField: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),

  // Update nested fields (like shippingAddress)
  setNestedField: (section, field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [section]: {
          ...state.formData[section],
          [field]: value,
        },
      },
    })),

  // Update connectedAccounts by index
  setConnectedAccount: (index, field, value) =>
    set((state) => {
      const updatedAccounts = [...state.formData.connectedAccounts];
      updatedAccounts[index] = {
        ...updatedAccounts[index],
        [field]: value,
      };
      return {
        formData: {
          ...state.formData,
          connectedAccounts: updatedAccounts,
        },
      };
    }),

  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  reset: () => set({ formData: initialFormData, currentStep: 1 }),
}));
