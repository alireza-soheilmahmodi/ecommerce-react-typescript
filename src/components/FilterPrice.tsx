import { priceFormatter } from "@/utils";
import { Slider } from "./ui/slider";
import { useState } from "react";

type Props = {
  selectedPrice: string;
  onValueCommit: (value: number[]) => void;
};

const FilterPrice = ({ onValueCommit, selectedPrice }: Props) => {
  const [price, setPrice] = useState(
    selectedPrice ? parseInt(selectedPrice) : 0
  );

  const handleValueCommit = (value: number[]) => {
    setPrice(value[0]); // Update local state
    onValueCommit(value); // Notify parent
  };

  return (
    <div className="w-[200px]">
      <span className="mb-3">{priceFormatter(price.toString())}</span>
      <Slider
        min={0}
        max={10000000}
        step={100000}
        value={[price]}
        onValueChange={(value) => setPrice(value[0])}
        onValueCommit={handleValueCommit}
      />
    </div>
  );
};

export default FilterPrice;
