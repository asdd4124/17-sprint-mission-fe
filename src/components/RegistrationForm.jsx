import "./RegistrationForm.css";

// 상품 등록 폼 (상품명 · 상품 소개 · 판매가격 · 태그)
function RegistrationForm() {
  return (
    <form className="registration-form">
      <div className="registration-form-header">
        <h2 className="section-title">상품 등록하기</h2>
        <button className="btn-primary registration-form-submit" type="submit">
          등록
        </button>
      </div>

      <div className="registration-form-field">
        <label className="registration-form-label" htmlFor="name">
          상품명
        </label>
        <input
          className="registration-form-input"
          id="name"
          type="text"
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
          type="text"
          inputMode="numeric"
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
          type="text"
          placeholder="태그를 입력해주세요"
        />
      </div>
    </form>
  );
}

export default RegistrationForm;
