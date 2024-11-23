import { create } from "zustand";

import { visitorRegistrationType } from "@/helpers/validation";

export const useVisitorRegistrationStore = create<{
  formData: visitorRegistrationType;
  setFormData: (formData: visitorRegistrationType) => void;
}>((set) => ({
  formData: {
    name: "",
    email: "",
    phoneNumber: "",
    visitingPersonName: "",
  },
  setFormData: (newFormData) => set({ formData: newFormData }),
}));
