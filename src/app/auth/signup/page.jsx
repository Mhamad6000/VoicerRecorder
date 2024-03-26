"use client";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { authEndpoits } from "../../lib/endpoints";
import Cookies from "js-cookie";
import { toast, Bounce } from "react-toastify";
import { useRouter } from "next/navigation";
export default function Signup() {
  const signUpMutation = useMutation({ mutationFn: authEndpoits.register });
  const router = useRouter();

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, "Username must be 4 characters at minimum")
      .required("Username is required"),
    password: Yup.string()
      .min(4, "Password must be 4 characters at minimum")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  function createUser(values, { resetForm }) {
    signUpMutation.mutate(
      {
        username: values.username,
        password: values.password,
        role: "USER",
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
        onSuccess: () => {
          resetForm();
          toast.success("User created successfully.", {
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
          router.push("/auth/login");
        },
      }
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Create your account
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{
              username: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={createUser}
          >
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Username
                </label>
                <div className="mt-1">
                  <Field
                    id="username"
                    name="username"
                    type="text"
                    className="block w-full rounded-md border-none py-1.5 px-2 text-white bg-secondary outline-none shadow-sm ring-1 ring-inset ring-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-quaternary sm:text-sm sm:leading-6"
                  />
                </div>
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-0.5"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
                <div className="mt-1">
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className="block w-full rounded-md border-none py-1.5 px-2 text-white bg-secondary outline-none shadow-sm ring-1 ring-inset ring-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-quaternary sm:text-sm sm:leading-6"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-0.5"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Confirm password
                </label>
                <div className="mt-1">
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className="block w-full rounded-md border-none py-1.5 px-2 text-white bg-secondary outline-none shadow-sm ring-1 ring-inset ring-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-quaternary sm:text-sm sm:leading-6"
                  />
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-0.5"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-quaternary px-3 py-1.5 text-sm font-semibold leading-6 text-primary shadow-sm hover:bg-tertiary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-quaternary"
                >
                  Sign Up
                </button>
              </div>
            </Form>
          </Formik>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?
            <Link
              href="/auth/login"
              className="font-semibold leading-6 ms-1 text-quaternary hover:text-tertiary"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
