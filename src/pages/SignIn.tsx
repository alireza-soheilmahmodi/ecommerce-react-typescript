import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import * as apiClient from "../api-client";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const location = useLocation();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({
        type: "SUCCESS",
        message: "با موفقیت وارد شدید",
      });

      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({
        type: "ERROR",
        message: error.message,
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="flex justify-center">
      <form className="flex flex-col gap-5 w-1/2 mt-10" onSubmit={onSubmit}>
        <h2 className="text-3xl fond-bold">فرم ورود</h2>
        <label className="text-gray-700 text-sm font-bold flex-1">
          ایمیل
          <input
            type="email"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("email", { required: "این فیلد اجباری است" })}
          ></input>
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Passsword
          <input
            type="password"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("password", {
              required: "این فیلد اجباری است",
              minLength: {
                value: 6,
                message: "پسورد باید بیشتر از 6 کاراکتر باشد",
              },
            })}
          ></input>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </label>
        <span className="flex flex-col">
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl rounded w-fit"
          >
            ورود
          </button>
          <span className="text-sm mt-3">
            ثبت نام نکرده اید؟{" "}
            <Link className="underline" to="/register">
              حساب کاربری بسازید
            </Link>
          </span>
        </span>
      </form>
    </div>
  );
};

export default SignIn;
