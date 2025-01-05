import { useAppContext } from "@/contexts/AppContext";
import ManageProductForm from "@/forms/ManageProductForm/ManageProductForm";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(apiClient.addProduct, {
    onSuccess: () => {
      showToast({ message: "محصول اضافه شد", type: "SUCCESS" });
      navigate("/admin/products");
    },
    onError: () => {
      showToast({
        message: "مشکلی در اضافه کردن محصول به وجود آمده است",
        type: "ERROR",
      });
    },
  });

  const handleSave = (productFormData: FormData) => {
    mutate(productFormData);
  };

  return <ManageProductForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddProduct;
