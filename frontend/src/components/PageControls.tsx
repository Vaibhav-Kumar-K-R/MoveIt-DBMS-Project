import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

type PageControlsProps = {
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  totalPages: number;
  currPage: number;
};

const PageControls = ({
  nextPage,
  prevPage,
  goToPage,
  currPage,
  totalPages,
}: PageControlsProps) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={prevPage}
            className={cn(
              currPage === 1
                ? "cursor-not-allowed opacity-70"
                : "cursor-pointer"
            )}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currPage}
              onClick={() => goToPage(page)}
              className="cursor-pointer"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={nextPage}
            className={cn(
              currPage === totalPages
                ? "cursor-not-allowed opacity-70"
                : "cursor-pointer"
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PageControls;
