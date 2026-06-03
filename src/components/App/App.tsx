import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import css from "./App.module.css";

import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { fetchNotes } from "../../services/noteService";
import useDebounce from "../../hooks/useDebounce";

function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["notes", debouncedSearch, page],
    queryFn: () => fetchNotes({ page, search: debouncedSearch }),
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;
  const shouldShowPagination = totalPages > 1;
  const shouldShowEmptyMessage = !isLoading && !isError && notes.length === 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        {shouldShowPagination && (
          <Pagination
            currentPage={page}
            pageCount={totalPages}
            onPageChange={setPage}
          />
        )}

        <button
          className={css.button}
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>

      {(isLoading || isFetching) && <Loader />}
      {isError && <ErrorMessage message="Something went wrong. Please try again." />}

      {notes.length > 0 && <NoteList notes={notes} />}

      {shouldShowEmptyMessage && (
        <p className={css.empty}>No notes found. Try another search.</p>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default App;