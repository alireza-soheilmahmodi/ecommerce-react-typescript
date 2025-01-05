import { Category } from "./forms/ManageProductForm/CategoriesSection";
import { RegisterFormData } from "./pages/Register";
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

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
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

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/api/products`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("مشکلی در دریافت محصولات پیش آمده است");
  }

  return response.json();
};

export const deleteProduct = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("مشکلی در حذف محصول وجود دارد");
  }

  return response.json();
};

export const fetchProductById = async (productId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("مشکلی در دریافت محصول وجود دارد");
  }

  const product = await response.json();
  product.categories = product.categories.map((cat: Category) =>
    String(cat.id)
  );
  product.imageUrl = product.imageUrl.split(",");
  return product;
};

export const fetchAllCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/api/products/categories`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("مشکلی در دریافت محصول وجود دارد");
  }

  return response.json();
};

export const updateProductById = async (productFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/products/${productFormData.get("productId")}`,
    {
      method: "PUT",
      body: productFormData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("مشکلی در ویرایش محصول وجود دارد");
  }

  return response.json();
};

export const addCategory = async (category: string) => {
  const response = await fetch(`${API_BASE_URL}/api/products/addCategory`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ name: category }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("مشکلی در اضافه کردن دسته بندی وجود دارد");
  }

  return response.json();
};
