"use client";
import Link from "next/link";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { toast, Bounce } from "react-toastify";
import { useRouter } from "next/navigation";
import { authEndpoits } from "@/app/lib/endpoints";
import { useMutation } from "@tanstack/react-query";
export default function Signup() {
  const loginMutation = useMutation({ mutationFn: authEndpoits.login });
  const router = useRouter();
  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, "Username must be 4 characters at minimum")
      .required("Username is required"),
    password: Yup.string()
      .min(4, "Password must be 4 characters at minimum")
      .required("Password is required"),
  });
  function handleSuccessFullLogin(data, resetForm) {
    const { token, message } = data;

    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      className: "!bg-secondary",
      transition: Bounce,
    });
    Cookies.set("auth_token", token);
    resetForm();
    router.push("/");
  }
  const handleSubmit = (values, { resetForm }) => {
    loginMutation.mutate(
      {
        ...values,
      },
      {
        onError: (err) => {
          console.log(err);
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            className: "!bg-secondary",
            transition: Bounce,
          });
        },
        onSuccess: (data) => {
          handleSuccessFullLogin(data, resetForm);
        },
      }
    );
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-primary">
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            class="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 class="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Login to your account
          </h2>
        </div>

        <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form className="space-y-4">
                <div>
                  <label
                    for="username"
                    class="block text-sm font-medium leading-6 text-white"
                  >
                    Username
                  </label>
                  <div class="mt-1">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      autocomplete="username"
                      class="block w-full rounded-md border-none py-1.5 px-2 text-white bg-secondary outline-none shadow-sm ring-1 ring-inset ring-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-quaternary sm:text-sm sm:leading-6"
                    />
                  </div>
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm mt-0.5"
                  />
                </div>

                <div>
                  <div class="flex items-center justify-between">
                    <label
                      for="password"
                      class="block text-sm font-medium leading-6 text-white"
                    >
                      Password
                    </label>
                  </div>
                  <div class="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autocomplete="current-password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      class="block w-full rounded-md border-none py-1.5 px-2 text-white bg-secondary outline-none shadow-sm ring-1 ring-inset ring-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-quaternary sm:text-sm sm:leading-6"
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-0.5"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-quaternary px-3 py-1.5 text-sm font-semibold leading-6 text-primary shadow-sm hover:bg-tertiary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-quaternary"
                  >
                    Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <p class="mt-6 text-center text-sm text-gray-500">
            Not a member?
            <Link
              href="/auth/signup"
              class="font-semibold leading-6 ms-1 text-quaternary hover:text-tertiary"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
