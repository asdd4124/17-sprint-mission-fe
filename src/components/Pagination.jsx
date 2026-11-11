import "./Pagination.css";

const PAGE_GROUP_SIZE = 5;

function Pagination({ currentPage, totalPages, onPageChange }) {
  const groupStart =
    Math.floor((currentPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE - 1, totalPages);

  const pageNumbers = [];
  for (let page = groupStart; page <= groupEnd; page++) {
    pageNumbers.push(page);
  }

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <nav className="pagination" aria-label="페이지 이동">
      <button
        type="button"
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
      >
        <img
          src={
            isFirstPage
              ? "/images/icons/ic_arrow_left_inactive.svg"
              : "/images/icons/ic_arrow_left.svg"
          }
          alt="이전 페이지"
          width="16"
          height="16"
        />
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          type="button"
          className={
            page === currentPage
              ? "pagination-button pagination-button-active"
              : "pagination-button"
          }
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
      >
        <img
          src={
            isLastPage
              ? "/images/icons/ic_arrow_right_inactive.svg"
              : "/images/icons/ic_arrow_right.svg"
          }
          alt="다음 페이지"
          width="16"
          height="16"
        />
      </button>
    </nav>
  );
}

export default Pagination;
