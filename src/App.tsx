import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./helpers/hooks";
import { authOperations } from "./redux/auth/authOperations";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/Routes/PrivateRoute";
import { PublicRoute } from "./components/Routes/PublicRoute";
import { Home } from "./pages/Home";
import { Authorization } from "./pages/Authorization";
import { Circles } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.root.auth.token);
  const isLoadingRefresh = useAppSelector(
    (state) => state.root.auth.isLoadingRefresh
  );

  useEffect(() => {
    if (token) {
      dispatch(authOperations.fetchCurrentUser());
    }
  }, [dispatch, token]);

  if (isLoadingRefresh) {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Circles
          height="150"
          width="150"
          color="#e3f9ff"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <>
      <ToastContainer autoClose={4000} />

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute redirect="/authorization">
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/authorization"
          element={
            <PublicRoute redirect="/" restricted>
              <Authorization />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
