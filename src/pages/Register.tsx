import { useAppContext } from "@/contexts/AppContext";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";

export type RegisterFormData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ type: "SUCCESS", message: "ثبت نام انجام شد" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ type: "ERROR", message: error.message });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="flex justify-center">
      <form className="flex flex-col gap-5 md:px-10 w-2/3" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">ایجاد حساب کاربری</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <label className="text-gray-700 text-sm font-bold flex-1">
            نام
            <input
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("firstname", { required: "این فیلد اجباری است" })}
            ></input>
            {errors.firstname && (
              <span className="text-red-500">{errors.firstname.message}</span>
            )}
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            نام خانوادگی
            <input
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("lastname", { required: "این فیلد اجباری است" })}
            ></input>
            {errors.lastname && (
              <span className="text-red-500">{errors.lastname.message}</span>
            )}
          </label>
        </div>
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
          رمز عبور
          <input
            type="password"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("password", {
              required: "این فیلد اجباری است",
              minLength: {
                value: 6,
                message: "پسورد حداقل باید 6 کاراکتر باشد",
              },
            })}
          ></input>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          تکرار رمز عبور
          <input
            type="password"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("confirmPassword", {
              validate: (val) => {
                if (!val) {
                  return "این فیلد اجباری است";
                } else if (watch("password") !== val) {
                  return "پسورد همخوانی ندارد";
                }
              },
            })}
          ></input>
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
        <span>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl rounded"
          >
            ثبت نام
          </button>
        </span>
      </form>
    </div>
  );
};

export default Register;
