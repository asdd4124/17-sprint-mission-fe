import { useState } from "react";
import { useNavigate } from "react-router";
import { createProduct } from "../api/products";
import "./RegistrationForm.css";

const INITIAL_VALUES = {
  name: "",
  description: "",
  price: "",
  tag: "",
};

// 상품 등록 폼 (상품명 · 상품 소개 · 판매가격 · 태그)
function RegistrationForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 입력칸의 name과 같은 이름의 값만 바꾸기
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const tag = values.tag.trim();
      const product = await createProduct({
        name: values.name.trim(),
        description: values.description.trim(),
        price: Number(values.price),
        tags: tag ? [tag] : [],
      });
      navigate(`/items/${product.id}`); // 등록 성공 → 상품 상세 페이지
    } catch (err) {
      setError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <div className="registration-form-header">
        <h2 className="section-title">상품 등록하기</h2>
        <button
          className="btn-primary registration-form-submit"
          type="submit"
          disabled={isSubmitting}
        >
          등록
        </button>
      </div>

      {error && (
        <p className="registration-form-submit-error">
          상품을 등록하지 못했어요.
        </p>
      )}

      <div className="registration-form-field">
        <label className="registration-form-label" htmlFor="name">
          상품명
        </label>
        <input
          className="registration-form-input"
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          placeholder="상품명을 입력해주세요"
        />
      </div>

      <div className="registration-form-field">
        <label className="registration-form-label" htmlFor="description">
          상품 소개
        </label>
        <textarea
          className="registration-form-input registration-form-textarea"
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
          placeholder="상품 소개를 입력해주세요"
        />
      </div>

      <div className="registration-form-field">
        <label className="registration-form-label" htmlFor="price">
          판매가격
        </label>
        <input
          className="registration-form-input"
          id="price"
          name="price"
          type="text"
          inputMode="numeric"
          value={values.price}
          onChange={handleChange}
          placeholder="판매 가격을 입력해주세요"
        />
      </div>

      <div className="registration-form-field">
        <label className="registration-form-label" htmlFor="tag">
          태그
        </label>
        <input
          className="registration-form-input"
          id="tag"
          name="tag"
          type="text"
          value={values.tag}
          onChange={handleChange}
          placeholder="태그를 입력해주세요"
        />
      </div>
    </form>
  );
}

export default RegistrationForm;
