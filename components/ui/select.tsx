"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import LoadingSpinner from "./spinner";

interface SelectProps extends React.HTMLProps<HTMLDivElement> {
  options: string[];
  loading?: boolean;
  onOptionSelect: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  value,
  options,
  loading = false,
  onOptionSelect,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value || options[0]);
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [dropdownStyle, setDropdownStyle] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const handleOptionClick = (option: string) => {
    setSelected(option);
    setOpen(false);
    onOptionSelect(option);
  };

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

  useLayoutEffect(() => {
    if (selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      setDropdownStyle({
        top: rect.top + rect.height,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [selectRef]);

  return (
    <div ref={selectRef} {...props}>
      <div
        onClick={(e) => {
          setOpen(!open);
        }}
        className="mt-1 flex justify-between  w-full py-2 px-3 border capitalize border-gray-300 bg-white min-w-[180px]  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
      >
        {selected}
        {loading && <LoadingSpinner size={15} />}
      </div>
      {open && (
        <div
          style={dropdownStyle}
          className="absolute bg-white shadow p-2 rounded z-10 w-full mt-3 max-h-[300px] overflow-auto"
        >
          {options.map((option, index) => (
            <div
              key={option}
              className={`cursor-pointer p-2 capitalize ${
                option === selected ? "bg-blue-200" : ""
              } hover:bg-blue-100`}
              onClick={(e) => {
                handleOptionClick(option);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
