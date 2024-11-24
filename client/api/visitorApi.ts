import { visitorRegistrationType } from "@/helpers/validation";
import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

interface UploadSelfieType {
  id: string;
  selfie: string;
}

if (!BASE_URL) {
  throw new Error("BACKEND_URL is not defined");
}

export const registerVisitor = async (data: visitorRegistrationType) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/visitors`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error registering visitor:", error);
    throw error;
  }
};

export const uploadSelfie = async (data: UploadSelfieType) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/fileupload/selfie`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading selfie:", error);
    throw error;
  }
};

export const uploadDocument = async (formData: FormData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/fileUpload/document`,
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading document in api:", error);
    throw error;
  }
};
