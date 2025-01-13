import { useAppContext } from "@/contexts/AppContext";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../../api-client";

export type AddReviewForm = {
  productId: number;
  rate: number;
  comment?: string;
};

type Props = {
  productId: number;
};

const AddReview = ({ productId }: Props) => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AddReviewForm>();

  const mutation = useMutation(apiClient.addReview, {
    onSuccess: async () => {
      showToast({
        type: "SUCCESS",
        message: "با موفقیت وارد شدید",
      });
      navigate(0);
    },
    onError: (error: Error) => {
      showToast({
        type: "ERROR",
        message: error.message,
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    data.productId = productId;
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <label className="text-gray-700 text-sm font-bold">
        امتیاز
        <br />
        <input
          type="number"
          className="border rounded py-1 px-2 font-normal w-[100px]"
          {...register("rate", {
            required: "این فیلد اجباری است",
            min: { value: 0, message: "امتیاز بین عدد 0 و عدد 5 می باشد" },
            max: { value: 5, message: "امتیاز بین عدد 0 و عدد 5 می باشد" },
          })}
        ></input>
        <br />
        {errors.rate && (
          <span className="text-red-500">{errors.rate.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        متن دیدگاه
        <textarea
          rows={5}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("comment", { required: "این فیلد اجباری است" })}
        ></textarea>
        {errors.comment && (
          <span className="text-red-500">{errors.comment.message}</span>
        )}
      </label>
      <span className="flex flex-col">
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl rounded w-fit px-5"
        >
          ثبت
        </button>
      </span>
    </form>
  );
};

export default AddReview;
