import { SigninType } from "@harpreetsinghsandhu/common-app";
import { Button, Label, TextInput } from "flowbite-react";
import { FormEvent, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

const SignIn = () => {
  const [formInputs, setFormInputs] = useState<SigninType>({
    email: "",
    password: "",
  });

  async function submitHandler(e: FormEvent) {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        formInputs
      );


      const jwt = res.data.token;
      localStorage.setItem("jwt", jwt);

      window.location.reload();
    } catch (error) {}
  }

  return (
    <section className="bg-gray-700 bg-opacity-60 bg-[url('https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/background.jpg')] bg-cover bg-center bg-no-repeat bg-blend-multiply">
      <div className="pt:mt-0 mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen">
        <div className="w-full rounded-lg bg-white shadow dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6 lg:space-y-8">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Sign in to your account
            </h1>
            <form
              onSubmit={submitHandler}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <Label htmlFor="email" className="mb-2 block dark:text-white">
                  Your email
                </Label>
                <TextInput
                  id="email"
                  placeholder="name@company.com"
                  required
                  onChange={(e) => {
                    setFormInputs({ ...formInputs, email: e.target.value });
                  }}
                  type="email"
                />
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="mb-2 block dark:text-white"
                >
                  Password
                </Label>
                <TextInput
                  id="confirm-password"
                  placeholder="••••••••"
                  required
                  onChange={(e) => {
                    setFormInputs({ ...formInputs, password: e.target.value });
                  }}
                  type="password"
                />
              </div>

              <Button type="submit" className="w-full">
                Log in to your account
              </Button>
              <p className="text-center text-sm text-gray-500 dark:text-gray-300">
                <Button
                  color="none"
                  href="/signup"
                  className="w-full text-primary-600 dark:text-primary-500 p-0 [&>span]:p-0 hover:underline"
                >
                  Don't have an account?
                </Button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
