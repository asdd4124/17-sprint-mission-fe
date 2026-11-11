import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <img
        className="search-form-icon"
        src="/images/icons/ic_search.svg"
        alt=""
        width="24"
        height="24"
      />
      <input
        className="search-form-input"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="검색할 상품을 입력해주세요"
      />
    </form>
  );
}

export default SearchForm;
