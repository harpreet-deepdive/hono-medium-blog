import { Button, Label, TextInput, Textarea } from "flowbite-react";
import TailwindEditor from "../components/editor";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import { DataProp } from "editorjs-blocks-react-renderer";

const EditBlog = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState<{
    title: string;
    description: string;
    content: DataProp;
  }>({
    title: "",
    description: "",
    content: {
      time: 1556098174501,
      blocks: [
        {
          type: "header",
          data: {
            text: "Start Typing here ... Press '/' to load commands ",
            level: 2,
          },
        },
      ],
      version: "2.12.4",
    },
  });

  const blogId = params.id;

  useEffect(() => {
    if (!blogId) return;

    setIsLoading(true);
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${blogId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((response) => {
        setFormValues({
          title: response.data.title,
          description: response.data.content,
          content: response.data.fullCnt,
        });
        setIsLoading(false);
      });
  }, [blogId]);

  function handleData(data: object) {
    console.log("recieving from editor", data);

    setFormValues({ ...formValues, content: data as DataProp });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      await axios.put(
        `${BACKEND_URL}/api/v1/blog`,
        {
          id: blogId,
          title: formValues.title,
          content: formValues.description,
          fullCnt: formValues.content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      navigate("/");
    } catch (error) {}
  }
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-4xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Update Post
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <Label htmlFor="name" className="block mb-2 dark:text-white">
                Post Title
              </Label>
              <TextInput
                id="name"
                defaultValue={formValues.title}
                onChange={(e) =>
                  setFormValues({ ...formValues, title: e.target.value })
                }
                name="name"
                placeholder="Type product name"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <Label
                htmlFor="description"
                className="block mb-2 dark:text-white"
              >
                Description
              </Label>
              <Textarea
                id="description"
                defaultValue={formValues.description}
                onChange={(e) =>
                  setFormValues({ ...formValues, description: e.target.value })
                }
                placeholder="Your description here"
                rows={8}
                className="text-sm resize-none"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="content" className="block mb-2 dark:text-white">
                Content
              </Label>
              {isLoading ? (
                <div className="h-56 animate-pulse border rounded-xl p-2 w-fullbg-gray-50 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-700 ">
                  {" "}
                </div>
              ) : (
                <TailwindEditor
                  defaultData={formValues.content}
                  sendData={handleData}
                />
              )}
            </div>
          </div>

          <Button type="submit" className="mt-6 [&>span]:px-5 [&>span]:py-2.5">
            Update Post
          </Button>
        </form>
      </div>
    </section>
  );
};

export default EditBlog;
