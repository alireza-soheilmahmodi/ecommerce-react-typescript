import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { Category } from "@/forms/ManageProductForm/CategoriesSection";

type Props = {
  selectedCategory: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const FilterCategory = ({ selectedCategory, onChange }: Props) => {
  const { data: categories } = useQuery("fetchCategories", () =>
    apiClient.fetchAllCategories()
  );

  if (!categories) return <></>;

  return (
    <select value={selectedCategory} onChange={onChange} className="border">
      <option value="">دسته بندی محصول</option>
      {(categories as Category[]).map((category) => {
        return (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        );
      })}
    </select>
  );
};

export default FilterCategory;
