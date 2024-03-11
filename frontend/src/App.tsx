import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/signIn";
import Blog from "./pages/blog";
import SignUp from "./pages/signUp";
import Blogs from "./pages/blogs";
import CreateBlog from "./pages/createBlog";
import EditBlog from "./pages/editBlog";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/blog/edit/:id" element={<EditBlog />} />
        <Route path="/blog/create" element={<CreateBlog />} />
        <Route path="/" element={<Blogs />} />
      </Routes>
    </>
  );
}

export default App;
