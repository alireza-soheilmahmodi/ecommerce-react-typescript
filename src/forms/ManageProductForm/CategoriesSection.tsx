import { useFormContext } from "react-hook-form";
import { ProductFormData } from "./ManageProductForm";

const categories = [
  { id: 1, name: "مردانه" },
  { id: 2, name: "زنانه" },
  { id: 3, name: "بجگانه" },
];

const CategoriesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">دسته بندی محصول</h2>
      <div className="grid grid-cols-5 gap-3">
        {categories.map((category, index) => (
          <label className="text-sm flex gap-1 text-gray-700" key={index}>
            <input
              type="checkbox"
              value={category.id}
              {...register("categoryIds", {
                validate: (categoryIds) => {
                  if (categoryIds && categoryIds.length > 0) {
                    return true;
                  } else {
                    return "حداقل یک دسته بندی نیاز است";
                  }
                },
              })}
            />
            {category.name}
          </label>
        ))}
      </div>
      {errors.categoryIds && (
        <span className="text-red-500 text-sm font-bold">
          {errors.categoryIds.message}
        </span>
      )}
    </div>
  );
};

export default CategoriesSection;
