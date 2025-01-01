import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import CategoriesSection from "./CategoriesSection";

export type ProductFormData = {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryIds: string[];
};

type Props = {
  onSave: (productFormData: FormData) => void;
  isLoading: boolean;
};

const ManageProductForm = ({ onSave, isLoading }: Props) => {
  const formMethods = useForm<ProductFormData>();
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((formDataJson: ProductFormData) => {
    const formData = new FormData();

    formData.append("name", formDataJson.name);
    formData.append("description", formDataJson.description);
    formData.append("price", formDataJson.price.toString());
    formData.append("stock", formDataJson.stock.toString());

    formDataJson.categoryIds.forEach((catId, index) => {
      formData.append(`categoryIds[${index}]`, catId);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <CategoriesSection />
        <span className="flex">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white font-bold hover:bg-blue-500 text-xl p-2 disabled:bg-gray-500"
          >
            {isLoading ? "ذخیره..." : "ذخیره"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageProductForm;
