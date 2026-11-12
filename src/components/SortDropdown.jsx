import { useState } from "react";
import "./SortDropdown.css";

const SORT_OPTIONS = [
  { value: "recent", label: "최신순" },
  { value: "favorite", label: "좋아요순" },
];

function SortDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = SORT_OPTIONS.find((option) => option.value === value);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (nextValue) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <div className="sort-dropdown">
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
