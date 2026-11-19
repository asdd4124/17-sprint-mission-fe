import { useState } from "react";
import { useNavigate } from "react-router";
import { createProduct } from "../api/products";
import useProductValidation from "../hooks/useProductValidation";
import "./RegistrationForm.css";

const INITIAL_VALUES = {
  name: "",
  description: "",
  price: "",
  tag: "",
};

// 에러가 있으면 빨간 테두리 클래스를 붙이기
const getInputClassName = (className, error) =>
  error ? `${className} registration-form-input-error` : className;

// 상품 등록 폼 (상품명 · 상품 소개 · 판매가격 · 태그)
function RegistrationForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [tags, setTags] = useState([]); // Enter로 추가한 태그 칩 목록
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { errors, getError, handleBlur, isValid } =
    useProductValidation(values);

  // 입력칸별 에러 문구 (없으면 "")
  const nameError = getError("name");
  const descriptionError = getError("description");
  const priceError = getError("price");
  const tagError = getError("tag");

  // 입력칸의 name과 같은 이름의 값만 바꾸기
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // 태그 입력 후 Enter → 칩으로 추가
  const handleTagKeyDown = (e) => {
    // 한글 조합 중 Enter는 무시 (같은 태그가 두 번 추가되지 않게)
    if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
    e.preventDefault(); // Enter로 폼이 제출되지 않게

    const tag = values.tag.trim();
    if (!tag) return;
    if (errors.tag) {
      handleBlur(e); // 5글자를 넘으면 칩 대신 에러 문구 보여 주기
      return;
    }
    // 같은 태그는 한 번만 추가하고, 입력칸은 비우기
    if (!tags.includes(tag)) setTags((prev) => [...prev, tag]);
    setValues((prev) => ({ ...prev, tag: "" }));
  };

  // X 버튼 → 그 태그만 목록에서 빼기
  const handleTagDelete = (deleteTag) => {
    setTags((prev) => prev.filter((tag) => tag !== deleteTag));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const product = await createProduct({
        name: values.name.trim(),
        description: values.description.trim(),
        price: Number(values.price),
        tags,
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
          disabled={!isValid || isSubmitting}
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
          className={getInputClassName("registration-form-input", nameError)}
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="상품명을 입력해주세요"
        />
        {nameError && <p className="registration-form-error">{nameError}</p>}
      </div>

      <div className="registration-form-field">
        <label className="registration-form-label" htmlFor="description">
          상품 소개
        </label>
        <textarea
          className={getInputClassName(
            "registration-form-input registration-form-textarea",
            descriptionError,
          )}
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="상품 소개를 입력해주세요"
        />
        {descriptionError && (
          <p className="registration-form-error">{descriptionError}</p>
        )}
      </div>

      <div className="registration-form-field">
        <label className="registration-form-label" htmlFor="price">
          판매가격
        </label>
        <input
          className={getInputClassName("registration-form-input", priceError)}
          id="price"
          name="price"
          type="text"
          inputMode="numeric"
          value={values.price}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="판매 가격을 입력해주세요"
        />
        {priceError && <p className="registration-form-error">{priceError}</p>}
      </div>

      <div className="registration-form-field">
        <label className="registration-form-label" htmlFor="tag">
          태그
        </label>
        <input
          className={getInputClassName("registration-form-input", tagError)}
          id="tag"
          name="tag"
          type="text"
          value={values.tag}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleTagKeyDown}
          placeholder="태그를 입력해주세요"
        />
        {tagError && <p className="registration-form-error">{tagError}</p>}
        {tags.length > 0 && (
          <ul className="registration-form-tags">
            {tags.map((tag) => (
              <li className="registration-form-tag" key={tag}>
                #{tag}
                <button
                  className="registration-form-tag-delete"
                  type="button"
                  onClick={() => handleTagDelete(tag)}
                  aria-label={`${tag} 태그 삭제`}
                >
                  <img
                    src="/images/icons/ic_x.svg"
                    alt=""
                    width="24"
                    height="24"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}

export default RegistrationForm;
