import type { ComponentType } from "react";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import css from "./Pagination.module.css";

type ModuleWithDefault<T> = { default?: T };

const ReactPaginate =
  (
    ReactPaginateModule as unknown as ModuleWithDefault<
      ComponentType<ReactPaginateProps>
    >
  ).default ?? (ReactPaginateModule as unknown as ComponentType<ReactPaginateProps>);

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (selected: number) => void;
}

const Pagination = ({
  currentPage,
  pageCount,
  onPageChange,
}: PaginationProps) => {
  return (
    <ReactPaginate
      forcePage={currentPage - 1}
      pageCount={pageCount}
      onPageChange={({ selected }: { selected: number }) =>
        onPageChange(selected + 1)
      }
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageClassName={css.pageItem}
      previousClassName={css.pageItem}
      nextClassName={css.pageItem}
      disabledClassName={css.disabled}
      previousLabel="←"
      nextLabel="→"
    />
  );
};

export default Pagination;