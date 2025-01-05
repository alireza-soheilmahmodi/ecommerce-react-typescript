import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import CategoriesSection from "./CategoriesSection";
import ImageSection from "./ImageSection";
import { useEffect } from "react";

export type ProductFormData = {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categories: string[];
  imageFiles: FileList;
  imageUrl: string[];
};

type Props = {
  onSave: (productFormData: FormData) => void;
  product?: ProductFormData;
  isLoading: boolean;
};

const ManageProductForm = ({ product, onSave, isLoading }: Props) => {
  const formMethods = useForm<ProductFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(product);
  }, [product, reset]);

  const onSubmit = handleSubmit((formDataJson: ProductFormData) => {
    const formData = new FormData();

    if (product && product.id) {
      formData.append("productId", product.id);
    }

    formData.append("name", formDataJson.name);
    formData.append("description", formDataJson.description);
    formData.append("price", formDataJson.price.toString());
    formData.append("stock", formDataJson.stock.toString());

    formDataJson.categories.forEach((catId, index) => {
      formData.append(`categoryIds[${index}]`, String(catId));
    });

    if (formDataJson.imageUrl) {
      formDataJson.imageUrl.forEach((url, index) => {
        formData.append(`imageUrl[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <CategoriesSection />
        <ImageSection />
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
