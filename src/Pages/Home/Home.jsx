import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import Loading from "../../Component/Loading/Loading";
import CreatePost from "../../Component/CreatePost/CreatePost";
import ToggleMenu from "../../Component/ToggleMenu/ToggleMenu";
import { UserContext } from "../../Context/UserContext/UserContext";

export default function Home() {
  let userDataContext = useContext(UserContext);
  useEffect(() => {
    getAllPosts();
  }, []);
  let [postsList, setPosts] = useState([]);
  let [loading, setLoading] = useState(true);

  async function getAllPosts() {
    let { data } = await axios.get(
      `https://linked-posts.routemisr.com/posts?limit=20&sort=-createdAt`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    if (data?.message == "success") {
      setPosts(data.posts);
      setLoading(false);
    }
    console.log(data);
    console.log(postsList);
  }
  return (
    <>
      <div className="w-1/2 mx-auto">
        <CreatePost />
        {loading
          ? Array.from({ length: 8 }).map(() => <Loading />)
          : postsList.map((el) => {
              let {
                _id,
                body,
                image,
                user: { name, photo },
                createdAt,
                comments,
              } = el;
              return (
                <div key={_id} className="item rounded-3xl bg-white p-5 my-3">
                  <div className="flex justify-between">
                    <div className="avatarItem">
                      <div className="flex items-center gap-4">
                        <img
                          className="w-10 h-10 rounded-full"
                          src={photo}
                          alt=""
                        />
                        <div className="font-medium">
                          <div>{name}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(createdAt).toLocaleDateString()}{" "}
                            {new Date(createdAt).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    {userDataContext.user._id === el.user._id && (
                      <ToggleMenu postId={_id} postBody={body} />
                    )}
                  </div>

                  <p className="my-2.5">{body}</p>
                  <img src={image} className="w-full rounded-2xl" alt="" />
                  <div className="postComments my-2.5 bg-gray-400 p-5 rounded-2xl">
                    <div className="flex justify-between mb-2.5">
                      <p>{comments.length} Comments</p>
                      <Link
                        to={`/postDetails/${_id}`}
                        className="text-blue-600"
                      >
                        See Post Details
                      </Link>
                    </div>
                    {comments.length > 0 && (
                      <>
                        <div className="flex items-center gap-4">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={
                              comments[comments.length - 1].commentCreator.photo
                            }
                            alt=""
                          />
                          <div className="font-medium">
                            <div>
                              {
                                comments[comments.length - 1].commentCreator
                                  .name
                              }
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(
                                comments[comments.length - 1].createdAt
                              ).toLocaleDateString()}{" "}
                              {new Date(
                                comments[comments.length - 1].createdAt
                              ).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                        <h4>{comments[comments.length - 1].content}</h4>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
      </div>
    </>
  );
}
