import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("مشکل در ارسال درخواست");
  }
};

export const addProduct = async (productFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/products`, {
    method: "POST",
    credentials: "include",
    body: productFormData,
  });

  if (!response.ok) {
    throw new Error("مشکلی در اضافه کردن محصول وجود دارد");
  }

  return response.json();
};
