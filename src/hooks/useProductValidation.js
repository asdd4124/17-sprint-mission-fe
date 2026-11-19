import { useState } from "react";

// 유효성 검사 기준 (백엔드 CreateProduct 규칙과 같게)
const NAME_MAX_LENGTH = 10;
const DESCRIPTION_MIN_LENGTH = 10;
const DESCRIPTION_MAX_LENGTH = 100;
const TAG_MAX_LENGTH = 5;
const NUMBER_ONLY = /^\d+$/; // 0~9 숫자로만 이루어진 값
const REQUIRED_FIELDS = ["name", "description", "price"]; // 꼭 채워야 하는 입력칸

// 상품 소개: 10자 이상 100자 이내 (조건이 2개라 함수로 분리)
function getDescriptionError(description) {
  if (!description) return "";
  if (description.length < DESCRIPTION_MIN_LENGTH)
    return `${DESCRIPTION_MIN_LENGTH}자 이상 입력해주세요`;
  if (description.length > DESCRIPTION_MAX_LENGTH)
    return `${DESCRIPTION_MAX_LENGTH}자 이내로 입력해주세요`;
  return "";
}

// 입력값 → 입력칸별 에러 문구 (통과했거나 빈 값이면 "")
function getErrors(values) {
  const name = values.name.trim();
  const description = values.description.trim();
  const price = values.price.trim();
  const tag = values.tag.trim();

  return {
    name:
      name.length > NAME_MAX_LENGTH
        ? `${NAME_MAX_LENGTH}자 이내로 입력해주세요`
        : "",
    description: getDescriptionError(description),
    price: price && !NUMBER_ONLY.test(price) ? "숫자로 입력해주세요" : "",
    tag:
      tag.length > TAG_MAX_LENGTH
        ? `${TAG_MAX_LENGTH}글자 이내로 입력해주세요`
        : "",
  };
}

// 상품 등록 입력값 유효성 검사 (그릴 때마다 현재 값으로 다시 계산)
function useProductValidation(values) {
  const [touched, setTouched] = useState({}); // 한 번이라도 벗어난 입력칸
  const errors = getErrors(values);

  // 입력칸을 벗어나면(blur) 그 칸의 name을 touched에 기록
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // 벗어난 적 있는 입력칸만 에러 문구 돌려주기 (처음부터 빨간색이 뜨지 않게)
  const getError = (name) => (touched[name] ? errors[name] : "");

  // 꼭 채워야 하는 칸이 모두 있고 에러가 하나도 없으면 등록 가능
  const isValid =
    REQUIRED_FIELDS.every((name) => values[name].trim()) &&
    Object.values(errors).every((error) => !error);

  return { errors, getError, handleBlur, isValid };
}

export default useProductValidation;
