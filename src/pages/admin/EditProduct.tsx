import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as apiClient from "../../api-client";
import ManageProductForm from "@/forms/ManageProductForm/ManageProductForm";
import { useAppContext } from "@/contexts/AppContext";

const EditProduct = () => {
  const { productId } = useParams();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const { data: product, isLoading: isLoadingProduct } = useQuery(
    ["fetchProductById", productId || ""],
    () => apiClient.fetchProductByIdAdmin(productId || ""),
    { enabled: !!productId }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateProductById, {
    onSuccess: () => {
      showToast({ message: "محصول ویرایش شد", type: "SUCCESS" });
      navigate("/admin/products");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleSave = (productFormData: FormData) => {
    mutate(productFormData);
  };

  if (isLoadingProduct) return <>در حال بارگذاری</>;

  if (!product) {
    return <>محصولی یافت نشد</>;
  }

  return (
    <ManageProductForm
      product={product}
      isLoading={isLoading}
      onSave={handleSave}
    />
  );
};

export default EditProduct;
