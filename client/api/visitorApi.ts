import { visitorRegistrationType } from "@/helpers/validation";
import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

if (!BASE_URL) {
  throw new Error("BACKEND_URL is not defined");
}

export const registerVisitor = async (data: visitorRegistrationType) => {
  console.log(`{BASE_URL}/api/visitors`, `${BASE_URL}/api/visitors`);
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
