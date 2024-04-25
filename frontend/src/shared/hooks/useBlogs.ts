import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";
import { CreatePostType } from "@harpreetsinghsandhu/common-app";
import { DataProp } from "editorjs-blocks-react-renderer";

interface Post extends CreatePostType {
  id: string;
  author: {
    name: string;
  };
  fullCnt: DataProp;
  comments: [];
}

export const useBlog = (id: string) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Post>();
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBlog(response.data);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blog,
  };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Post[]>([]);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBlogs(response.data.posts);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
};
