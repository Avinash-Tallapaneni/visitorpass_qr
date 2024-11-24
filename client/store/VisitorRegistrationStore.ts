import { create } from "zustand";

import { visitorRegistrationType } from "@/helpers/validation";

export const useVisitorRegistrationStore = create<{
  formData: visitorRegistrationType;
  setFormData: (formData: visitorRegistrationType) => void;
  visitorId: string;
  setVisitorId: (visitorId: string) => void;
}>((set) => ({
  formData: {
    name: "",
    email: "",
    phoneNumber: "",
    visitingPersonName: "",
  },
  setFormData: (newFormData) => set({ formData: newFormData }),

  visitorId: "1PeQjLNuN3zqY40l5hDuv",
  setVisitorId: (newVisitorId) => set({ visitorId: newVisitorId }),
}));
