import { useAppContext } from "@/contexts/AppContext";
import ManageProductForm from "@/forms/ManageProductForm/ManageProductForm";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";

const AddProduct = () => {
  const { showToast } = useAppContext();
  const { mutate, isLoading } = useMutation(apiClient.addProduct, {
    onSuccess: () => {
      showToast({ message: "محصول اضافه شد", type: "SUCCESS" });
    },
    onError: () => {
      showToast({
        message: "مشکلی در اضافه کردن محصول به وجود آمده است",
        type: "ERROR",
      });
    },
  });

  const handleSave = (productFormData: FormData) => {
    for (const [key, value] of productFormData.entries()) {
      console.log(`${key}: ${value}`);
    }
    mutate(productFormData);
  };

  return <ManageProductForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddProduct;
