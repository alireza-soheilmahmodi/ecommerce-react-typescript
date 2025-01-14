import { useEffect, useState } from "react";
import FilterCategory from "@/components/FilterCategory";
import FilterPrice from "@/components/FilterPrice";
import ShowSearchProducts from "@/components/ShowSearchProducts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();

  const searchQueryParam = searchParams.get("query") || undefined;
  const categoryParam = searchParams.get("category") || "";

  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLowPrice, setSelectedLowPrice] = useState("");
  const [selectedHighPrice, setSelectedHighPrice] = useState("");

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const handleChangeCategory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
    setPage(1);
  };

  return (
    <div>
      <div className="flex gap-2">
        <FilterCategory
          selectedCategory={selectedCategory}
          onChange={handleChangeCategory}
        />

        <DropdownMenu>
          <DropdownMenuTrigger className="border p-3">
            محدوده قیمت
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-3">
            از
            <FilterPrice
              selectedPrice={selectedLowPrice}
              onValueCommit={(value) => {
                setSelectedLowPrice(value[0].toString());
                setPage(1);
              }}
            />
            <DropdownMenuSeparator />
            تا
            <FilterPrice
              selectedPrice={selectedHighPrice}
              onValueCommit={(value) => {
                setSelectedHighPrice(value[0].toString());
                setPage(1);
              }}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ShowSearchProducts
        category={selectedCategory}
        lowPrice={selectedLowPrice}
        highPrice={selectedHighPrice}
        searchQuery={searchQueryParam}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default Search;
