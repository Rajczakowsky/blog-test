import { PageIndicator, PaginationWrapper, Button } from "../../styles";
import { useSearchParams } from "react-router-dom";

export function Pagination({ postsCount }: { postsCount: number }) {
  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page") || "1");
  const paginationPagesCount = Math.ceil(postsCount / 10);
  const pages = Array.from({ length: paginationPagesCount }, (_, i) => i + 1);

  let pagesToShow: Array<string | number> = pages;

  if (currentPage <= 3 || currentPage > paginationPagesCount - 3) {
    const startPages = pages.slice(0, 3);
    const endPages = pages.slice(-3, paginationPagesCount);
    pagesToShow = [...startPages, "...", ...endPages];
  } else {
    const startPages = 1;
    const endPages = paginationPagesCount;
    const middle = [currentPage - 1, currentPage, currentPage + 1];
    pagesToShow = [startPages, "...", ...middle, "...", endPages];
  }

  return (
    <PaginationWrapper>
      <Button
        to={`?page=${currentPage - 1}`}
        aria-disabled={currentPage === 1}
        disabled={currentPage === 1}
        onClick={(e) => {
          if (currentPage === 1) e.preventDefault();
        }}
      >
        Previous
      </Button>
      {pagesToShow.map((page, i) => {
        if (typeof page === "number") {
          return (
            <PageIndicator
              key={page + i}
              active={page === currentPage}
              to={`?page=${page}`}
            >
              {page}
            </PageIndicator>
          );
        }

        return <span key={page + i}>{page}</span>;
      })}

      <Button
        to={`?page=${currentPage + 1}`}
        aria-disabled={currentPage === pages.length}
        disabled={currentPage === pages.length}
        onClick={(e) => {
          if (currentPage === pages.length) e.preventDefault();
        }}
      >
        Next
      </Button>
    </PaginationWrapper>
  );
}
