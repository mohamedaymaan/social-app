import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../Context/UserContext/UserContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreatePost() {
  let { register, handleSubmit, } = useForm();
  let { user } = useContext(UserContext);
  let imgData = useRef();

  async function handleCreatePost({ body }) {
    let formData = new FormData();
    formData.append("body", body);
    formData.append("image", imgData.current.files[0]);

    let { data } = await axios
      .post(`https://linked-posts.routemisr.com/posts`, formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      }).catch((err) => {
        toast.error(err.response?.data.error);
      });
    if (data.message == "success") {
      toast.success("Post Added Successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }

    console.log(data);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleCreatePost)}
        className="bg-white p-4 rounded-2xl"
      >
        <h3 className="my-2">Post Something</h3>
        <div className="flex justify-between items-center">
          <div>
            <img
              className="w-10 h-10 rounded-full"
              src={user?.photo}
              alt="Rounded avatar"
            />
          </div>
          <div className="w-3/4">
            <input
              {...register("body")}
              type="text"
              id="first_name"
              className="p bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Post Body"
            />
          </div>
          <div>
            <label htmlFor="imgFile" className="cursor-pointer">
              <i className="fa-solid fa-image fa-2xl"></i>
            </label>
            <input type="file" id="imgFile" ref={imgData} hidden />
          </div>
        </div>
        <button
          type="submit"
          className="my-2 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Create Post
        </button>
      </form>
    </>
  );
}
