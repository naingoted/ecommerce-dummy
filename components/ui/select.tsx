import React, { useState, useEffect, useRef } from "react";
import LoadingSpinner from "./spinner";

interface SelectProps extends React.HTMLProps<HTMLDivElement> {
  options: string[];
  loading?: boolean;
  onOptionSelect: (value: string) => void;
}

/**
 *
 * @todo more accessiabilty features like support keyboard navigation and more
 * @returns
 */
const Select: React.FC<SelectProps> = ({
  value,
  options,
  loading = false,
  onOptionSelect,
  id,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const selectRef = useRef<HTMLDivElement | null>(null);
  const listboxId = `${id}-listbox`; // generate ID for the listbox

  const handleOptionClick = (option: string) => {
    setSelected(option);
    setOpen(false);
    onOptionSelect(option);
  };

  useEffect(() => {
    setSelected(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div id={id} ref={selectRef} className="relative" {...props}>
      <button
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-labelledby={id}
        role="combobox"
        onClick={() => setOpen(!open)}
        className="mt-1 flex justify-between  w-full py-2 px-3 border capitalize border-gray-300 bg-white min-w-full md:min-w-[180px]  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
      >
        {selected}
        {loading && <LoadingSpinner size={15} />}
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute bg-white shadow p-2 rounded z-10 w-full mt-3 max-h-[300px] overflow-auto"
        >
          {options.map((option, index) => (
            <li
              key={option}
              role="option"
              aria-selected={selected === option}
              className={`cursor-pointer p-2 capitalize ${
                option === selected ? "bg-blue-200" : ""
              } hover:bg-blue-100`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
