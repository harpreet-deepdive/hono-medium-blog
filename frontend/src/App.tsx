import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/signIn";
import Blog from "./pages/blog";
import SignUp from "./pages/signUp";
import Blogs from "./pages/blogs";
import CreateBlog from "./pages/createBlog";
import EditBlog from "./pages/editBlog";
import { useSession } from "./shared/hooks/useSession";

function App() {
  const { token } = useSession();


  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={!token ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signin"
          element={!token ? <SignIn /> : <Navigate to={"/"} />}
        />
        <Route
          path="/blog/:id"
          element={!token ? <Navigate to={"/signin"} /> : <Blog />}
        />
        <Route
          path="/blog/edit/:id"
          element={!token ? <Navigate to={"/signin"} /> : <EditBlog />}
        />
        <Route
          path="/blog/create"
          element={!token ? <Navigate to={"/signin"} /> : <CreateBlog />}
        />
        <Route
          path="/"
          element={!token ? <Navigate to={"/signin"} /> : <Blogs />}
        />
      </Routes>
    </>
  );
}

export default App;
