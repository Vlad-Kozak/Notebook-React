import { useEffect } from "react";
import { Circles } from "react-loader-spinner";
import { Container } from "../components/Container";
import { Notes } from "../components/Notes";
import { SideBar } from "../components/SideBar";
import { useGetCategoriesQuery } from "../redux/categoriesApi";
import { useGetNotesQuery } from "../redux/notesApi";

export function Home() {
  const notes = useGetNotesQuery();
  const categories = useGetCategoriesQuery();

  useEffect(() => {
    notes.refetch();
    categories.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-screen h-screen bg-transparent">
      <SideBar />

      <Container>
        {notes.isFetching || categories.isFetching ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Circles
              height="150"
              width="150"
              color="#e3f9ff"
              ariaLabel="circles-loading"
            />
          </div>
        ) : (
          <Notes />
        )}
      </Container>
    </div>
  );
}
