import { useFormContext } from "react-hook-form";
import { ProductFormData } from "./ManageProductForm";
import { useQuery } from "react-query";
import * as apiClient from "../../api-client";

export type Category = {
  id: number;
  name: string;
};

const CategoriesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormData>();

  const { data: categories } = useQuery("fetchCategories", () =>
    apiClient.fetchAllCategories()
  );

  if (!categories) return "loading...";

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">دسته بندی محصول</h2>
      <div className="grid grid-cols-5 gap-3">
        {(categories as Category[]).map((category) => {
          return (
            <label
              className="text-sm flex gap-1 text-gray-700"
              key={category.id}
            >
              <input
                type="checkbox"
                value={category.id}
                {...register("categories", {
                  validate: (categories) => {
                    if (categories && categories.length > 0) {
                      return true;
                    } else {
                      return "حداقل یک دسته بندی نیاز است";
                    }
                  },
                })}
              />
              {category.name}
            </label>
          );
        })}
      </div>
      {errors.categories && (
        <span className="text-red-500 text-sm font-bold">
          {errors.categories.message}
        </span>
      )}
    </div>
  );
};

export default CategoriesSection;
