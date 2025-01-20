import { Category } from "./forms/ManageProductForm/CategoriesSection";
import { AddReviewForm } from "./forms/ReviewForm/AddReview";
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

export const fetchProductByIdAdmin = async (productId: string) => {
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

export const fetchProductById = async (productId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("مشکلی در دریافت محصول وجود دارد");
  }

  return response.json();
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

export const deleteCategory = async (categoryId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/products/categories/${categoryId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("مشکلی در حذف کردن دسته بندی وجود دارد");
  }

  return response.json();
};

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users/users`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("مشکلی در دریافت کاربران وجود دارد");
  }

  return response.json();
};

export const addReview = async (formData: AddReviewForm) => {
  const response = await fetch(`${API_BASE_URL}/api/products/addReview`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (
    !response.ok &&
    responseBody.message === "You have already reviewed this product."
  ) {
    throw new Error("شما قبلا نظر خود را ثبت کرده اید");
  }

  if (!response.ok) {
    throw new Error("مشکلی در ثبت نظر پیش آمده است");
  }

  return response;
};

export const addSlider = async (sliderFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/products/addSlider`, {
    method: "POST",
    credentials: "include",
    body: sliderFormData,
  });

  if (!response.ok) {
    throw new Error("مشکلی در اضافه کردن اسلایدر وجود دارد");
  }

  return response.json();
};

export const fetchSlides = async () => {
  const response = await fetch(`${API_BASE_URL}/api/products/slides`);

  if (!response.ok) {
    throw new Error("خطا");
  }

  return response.json();
};

export const deleteSlider = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/api/products/slider/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("مشکلی در حذف اسلاید وجود دارد");
  }

  return response.json();
};

export type SearchParams = {
  category: string;
  lowPrice: string;
  highPrice: string;
  searchQuery?: string;
  page: number;
};

export const searchProducts = async (searchParams: SearchParams) => {
  const queryParams = new URLSearchParams();

  queryParams.append("category", searchParams.category || "");
  queryParams.append("lowPrice", searchParams.lowPrice || "");
  queryParams.append("highPrice", searchParams.highPrice || "");
  queryParams.append("searchQuery", searchParams.searchQuery || "");
  queryParams.append("page", searchParams.page.toString() || "");

  const response = await fetch(
    `${API_BASE_URL}/api/products/search?${queryParams}`
  );

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

type ProductOrder = {
  productId: number;
  quantity: number;
};

export const placeOrder = async (products: ProductOrder[]) => {
  const response = await fetch(`${API_BASE_URL}/api/orders`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ products }),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const fetchOrders = async () => {
  const response = await fetch(`${API_BASE_URL}/api/orders`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("مشکلی در دریافت سفارشات وجود دارد");
  }

  return response.json();
};

export const fetchOrderDetails = async (orderId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("مشکلی در دریافت سفارش وجود دارد");
  }

  return response.json();
};

export const changeOrderStatus = async (id: number) => {
  const response = await fetch(
    `${API_BASE_URL}/api/orders/changeStatus/${id}`,
    {
      method: "PUT",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("مشکلی در تغییر وضعیت سفارش وجود دارد");
  }

  return response.json();
};

export const fetchReviews = async () => {
  const response = await fetch(`${API_BASE_URL}/api/reviews`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("مشکلی در دریافت نظرات وجود دارد");
  }

  return response.json();
};

export const deleteReview = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/api/reviews/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("مشکلی در حذف نظر وجود دارد");
  }

  return response.json();
};
