import { useAppContext } from "@/contexts/AppContext";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../../api-client";

type SliderFormData = {
  imageFile: FileList;
  alt: string;
  link: string;
};

const AddSlider = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SliderFormData>();

  const { mutate, isLoading } = useMutation(apiClient.addSlider, {
    onSuccess: () => {
      showToast({ message: "اسلاید ذخیره شد", type: "SUCCESS" });
      navigate("/admin/slider");
    },
    onError: () => {
      showToast({ message: "مشکلی در ذخیره اسلاید وجود دارد", type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((FormDataJson: SliderFormData) => {
    const formData = new FormData();
    formData.append("alt", FormDataJson.alt);
    formData.append("link", FormDataJson.link);
    formData.append("imageFile", FormDataJson.imageFile[0]);

    mutate(formData);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl fond-bold">اسلایدر جدید</h2>
      <label className="flex flex-col text-gray-700 text-sm font-bold flex-1">
        alt
        <input
          type="text"
          className="border rounded w-1/2 py-1 px-2 font-normal"
          {...register("alt", { required: "این فیلد اجباری است" })}
        ></input>
        {errors.alt && (
          <span className="text-red-500">{errors.alt.message}</span>
        )}
      </label>
      <label className="flex flex-col text-gray-700 text-sm font-bold flex-1">
        link
        <input
          type="text"
          dir="ltr"
          className="border rounded w-[200px] py-1 px-2 font-normal"
          {...register("link", {
            validate: (link) => {
              if (!link.startsWith("/")) {
                return "لینک باید داخلی باید و با / شروع شود";
              }
              return true;
            },
          })}
        ></input>
        {errors.link && (
          <span className="text-red-500">{errors.link.message}</span>
        )}
      </label>

      <h2 className="text-2xl font-bold mb-3">عکس اسلاید</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFile", { required: "این فیلد اجباری است" })}
        />
      </div>
      {errors.imageFile && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFile.message}
        </span>
      )}

      <span className="flex flex-col">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl rounded w-fit"
        >
          {isLoading ? "اضافه کردن اسلاید..." : "اضافه کردن اسلاید"}
        </button>
      </span>
    </form>
  );
};

export default AddSlider;
