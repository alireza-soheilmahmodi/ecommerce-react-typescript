import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Products = () => {
  return (
    <div className="flex justify-between">
      <h1 className="text-2xl">محصولات</h1>
      <Button asChild>
        <Link to="add">اضافه کردن محصول</Link>
      </Button>
    </div>
  );
};

export default Products;
