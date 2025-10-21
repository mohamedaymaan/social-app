import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import * as Zod from "zod";
import { UserContext } from "../../Context/UserContext/UserContext";

const schema = Zod.object({
  email: Zod.string()
    .nonempty("Email is Requird")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email is InValid"
    ),
  password: Zod.string()
    .nonempty("Password is Requird")
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
});

export default function Login() {
  let { getUserData } = useContext(UserContext);

  let navgi = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  async function handleLogin(value) {
    let { data } = await axios
      .post(`https://linked-posts.routemisr.com/users/signin`, value)
      .catch((err) => {
        toast.error(err.response.data.error);
        console.log(err);
      });

    if (data?.message == "success") {
      console.log(data);
      toast.success("Login Successfully");
      localStorage.setItem("token", data.token);
      getUserData();
      navgi("/home");
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@gmail.com"
          />
          {errors.email ? (
            <p className="text-red-600 mt-2">* {errors.email.message}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.password ? (
            <p className="text-red-600 mt-2">* {errors.password.message}</p>
          ) : (
            ""
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
      </form>
    </>
  );
}
