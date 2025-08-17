import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../../Component/Loading/Loading";

export default function PostDetails() {
  let { id } = useParams();
  useEffect(() => {
    getPostDetails();
  }, []);
  let [post, setPost] = useState(null);
  let [load, setLoad] = useState(true);
  console.log(id);
  async function getPostDetails() {
    let { data } = await axios.get(
      `https://linked-posts.routemisr.com/posts/${id}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(data);
    
    if(data.message == "success"){
      setLoad(false);
    }
    setPost(data.post);
  }

  return (
    <>
        <div className="w-3/4 mx-auto">
      { load ? <Loading/> : (
          
          <div className="item rounded-3xl bg-white p-5">
            <div className="avatarItem">
              <div className="flex items-center gap-4">
                <img
                  className="w-10 h-10 rounded-full"
                  src={post.user.photo}
                  alt=""
                />
                <div className="font-medium">
                  <div>{post.user.name}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}{" "}
                    {new Date(post.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
            <p className="my-2.5">{post.body}</p>
            <img src={post.image} className="w-full rounded-2xl" alt="" />
             <p className="my-3">{post.comments.length} Comments</p>
            {post.comments.map((comment) => {
              return (
                <div key={comment._id} className="postComments my-2.5 bg-gray-400 p-5 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={comment.commentCreator.photo}
                      alt=""
                    />
                    <div className="font-medium">
                      <div>{comment.commentCreator.name}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}{" "}
                        {new Date(comment.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <h4>{comment.content}</h4>
                </div>
              );
            })}
          </div>

        )}
        </div>
    </>
  );
}
