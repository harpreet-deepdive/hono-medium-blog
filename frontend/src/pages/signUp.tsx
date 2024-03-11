import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { FormEvent, useState } from "react";
import { SignUpType } from "@harpreetsinghsandhu/common-app";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const SignUp = () => {
  const navigate = useNavigate();
  const [formInputs, setFormInputs] = useState<SignUpType>({
    name: "",
    email: "",
    password: "",
  });

  async function submitHandler(e: FormEvent) {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        formInputs
      );

      const jwt = res.data.token;
      localStorage.setItem("jwt", jwt);
      navigate("/");
    } catch (error) {}
  }

  return (
    <section className="bg-gray-700 bg-opacity-60 bg-[url('https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/background.jpg')] bg-cover bg-center bg-no-repeat bg-blend-multiply">
      <div className="pt:mt-0 mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen">
        <div className="w-full rounded-lg bg-white shadow dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6 lg:space-y-8">
            <h2 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Create your Free Account
            </h2>
            <form
              onSubmit={submitHandler}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="email" className="dark:text-white">
                  Your email
                </Label>
                <TextInput
                  id="email"
                  name="email"
                  placeholder="name@company.com"
                  required
                  onChange={(e) => {
                    setFormInputs({ ...formInputs, email: e.target.value });
                  }}
                  type="email"
                />
              </div>
              <div>
                <Label htmlFor="email" className="mb-2 block dark:text-white">
                  Your name
                </Label>
                <TextInput
                  id="name"
                  onChange={(e) => {
                    setFormInputs({ ...formInputs, name: e.target.value });
                  }}
                  placeholder="harry"
                  required
                  type="text"
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="username" className="dark:text-white">
                  Password
                </Label>
                <TextInput
                  id="username"
                  name="username"
                  placeholder="••••••••"
                  required
                  onChange={(e) => {
                    setFormInputs({ ...formInputs, password: e.target.value });
                  }}
                />
              </div>

              <Button type="submit" className="w-full">
                Create an account
              </Button>
              <p className="text-center text-sm text-gray-900 dark:text-white font-medium">
                <a
                  href="/signin"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Already have an account?
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
