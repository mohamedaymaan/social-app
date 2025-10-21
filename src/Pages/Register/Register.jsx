import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import * as Zod from "zod";

const schema = Zod.object({
  name: Zod.string()
    .nonempty("Name is Requird")
    .min(3, "Min Char 3")
    .max(15, "Max Char 15"),
  email: Zod.string()
    .nonempty("Email is Requird")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  password: Zod.string()
    .nonempty("Password is Requird")
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  rePassword: Zod.string()
    .nonempty("rePassword is Requird")
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  gender: Zod.string()
    .nonempty("gender is Requird")
    .optional(["male", "female"]),
  dateOfBirth: Zod.coerce.date().refine((val) => {
    let nowDate = new Date().getFullYear();
    let birthDate = val.getFullYear();
    return nowDate - birthDate >= 18;
  }, "Date of birth is inValid"),
}).refine(
  (val) => {
    return val.password == val.rePassword;
  },
  { message: "PassWord Must be Match Confirm Password", path: ["rePassword"] }
);
export default function Register() {
  let navg = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  console.log(errors);

  async function handleGetData(value) {
    console.log(value);
    let { data } = await axios
      .post(`https://linked-posts.routemisr.com/users/signup`, value)
      .catch((err) => {
        toast.error(err.response.data.error);
        console.log(err);
      });
    if (data?.message == "success") {
      console.log(data);
      toast.success("Registration Successfully");
      navg("/login");
    }
  }
  // function getData(e){
  //   e.preventDefault();
  // }

  return (
    <>
      <form onSubmit={handleSubmit(handleGetData)} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Mohamed Ayman"
          />
          {errors.name ? (
            <p className="text-red-600 mt-2">* {errors.name.message}</p>
          ) : (
            ""
          )}
        </div>
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
        <div className="mb-5">
          <label
            htmlFor="coPassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>
          <input
            {...register("rePassword")}
            type="password"
            id="coPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.rePassword ? (
            <p className="text-red-600 mt-2">* {errors.rePassword.message}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="brDate"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Date of Birth
          </label>
          <input
            {...register("dateOfBirth")}
            type="date"
            id="brDate"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.dateOfBirth ? (
            <p className="text-red-600 mt-2">* {errors.dateOfBirth.message}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="gender"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your gender
          </label>
          <select
            {...register("gender")}
            id="gender"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {errors.gender ? (
              <p className="text-red-600 mt-2">* {errors.gender.message}</p>
            ) : (
              ""
            )}

            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register
        </button>
      </form>
    </>
  );
}
