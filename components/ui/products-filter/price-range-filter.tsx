import React, { FC, useState, useEffect, ChangeEvent } from "react";
import useDebounce from "@/hooks/use-debounce";
import Input from "../input";

interface PriceRangeFilterProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const PriceRangeFilter: FC<PriceRangeFilterProps> = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState(value);

  const debouncedPrice = useDebounce(localValue);
  console.log("1", value);
  console.log("local", localValue);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  /**
   * @todo validation to make sure min can't be greater than max
   * @todo only validate after debounce is over.
   */
  const handleMinValChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    setLocalValue([newMin, localValue[1]]);
  };

  const handleMaxValChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    setLocalValue([localValue[0], newMax]);
  };

  // Notify the parent about the change
  useEffect(() => {
    onChange(debouncedPrice);
  }, [debouncedPrice, onChange]);

  return (
    <div className="flex gap-4">
      <Input
        type="number"
        id="priceMin"
        label="Min Price"
        value={String(localValue[0])}
        onChange={handleMinValChange}
      />
      <Input
        type="number"
        id="priceMax"
        label="Max Price"
        value={localValue[1]}
        onChange={handleMaxValChange}
      />
    </div>
  );
};

export default PriceRangeFilter;
