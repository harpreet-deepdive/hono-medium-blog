import { Button, Label, TextInput, Textarea } from "flowbite-react";
import TailwindEditor from "../components/editor";
import { FormEvent, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    content: {},
  });

  function handleData(data: object) {

    setFormValues({ ...formValues, content: data });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
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
          Add a new Post
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <Label htmlFor="name" className="block mb-2 dark:text-white">
                Post Title
              </Label>
              <TextInput
                id="name"
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
              <TailwindEditor sendData={handleData} />
            </div>
          </div>

          <Button type="submit" className="mt-6 [&>span]:px-5 [&>span]:py-2.5">
            Add Post
          </Button>
        </form>
      </div>
    </section>
  );
};

export default CreateBlog;
