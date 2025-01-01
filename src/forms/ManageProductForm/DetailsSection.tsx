import { useFormContext } from "react-hook-form";
import { ProductFormData } from "./ManageProductForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormData>();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">اضافه کردن محصول</h1>
      <label className="text-gray-700 text-sm font-bold flex-1">
        نام محصول
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("name", { required: "این فیلد اجباری است" })}
        ></input>
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1">
        توضیحات
        <textarea
          rows={10}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("description", { required: "این فیلد اجباری است" })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        قیمت محصول
        <input
          type="number"
          min={1}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("price", {
            required: "این فیلد اجباری است",
          })}
        ></input>
        {errors.price && (
          <span className="text-red-500">{errors.price.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        تعداد موجودی
        <input
          type="number"
          min={0}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("stock", {
            required: "این فیلد اجباری است",
          })}
        ></input>
        {errors.stock && (
          <span className="text-red-500">{errors.stock.message}</span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
