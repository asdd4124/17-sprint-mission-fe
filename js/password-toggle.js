// 심화: 눈 아이콘을 누르면 비밀번호를 보였다 숨겼다 해요.
document.querySelectorAll(".btn-eye").forEach(function (button) {
  var input = document.getElementById(button.getAttribute("aria-controls"));
  var icon = button.querySelector("img");

  button.addEventListener("click", function () {
    var isHidden = input.type === "password";
    input.type = isHidden ? "text" : "password";
    icon.src = isHidden
      ? "../images/icons/ic-visibility-on.svg"
      : "../images/icons/ic-visibility-off.svg";
    button.setAttribute(
      "aria-label",
      isHidden ? "비밀번호 숨기기" : "비밀번호 보기",
    );
  });
});
