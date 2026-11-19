import { useEffect, useRef, useState } from "react";
import { ORDER_BY } from "../constants/product";
import "./SortDropdown.css";

const SORT_OPTIONS = [{ value: ORDER_BY.RECENT, label: "최신순" }];

function SortDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = SORT_OPTIONS.find((option) => option.value === value);

  // 메뉴가 열려 있을 때 바깥을 누르면 닫기
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (!dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (nextValue) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <div className="sort-dropdown" ref={dropdownRef}>
      <button
        type="button"
        className="sort-dropdown-button"
        onClick={handleToggle}
        aria-label={`정렬: ${selectedOption.label}`}
      >
        <span className="sort-dropdown-label">{selectedOption.label}</span>
        <img
          className="sort-dropdown-arrow"
          src="/images/icons/ic_arrow_down.svg"
          alt=""
          width="24"
          height="24"
        />
        <img
          className="sort-dropdown-icon"
          src="/images/icons/ic_sort.svg"
          alt=""
          width="24"
          height="24"
        />
      </button>

      {isOpen && (
        <ul className="sort-dropdown-menu">
          {SORT_OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className="sort-dropdown-item"
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SortDropdown;
