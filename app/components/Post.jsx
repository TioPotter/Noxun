"use client";

import { useState } from "react";
import Botones from "./Botones";
import Link from "next/link";

const Post = ({ post, expand }) => {
  const [expandir, setExpandir] = useState(expand);
  //Funcion para cambiar el estado del string Ver mas.
  const cambiarExpandir = () => {
    setExpandir(!expandir);
  };
  // const Details = (id) => {
  //   console.log(id);
  // };
  return (
    <div className="flex justify-start">
      
      <div
        key={post.id}
        className="flex cursor-pointer flex-col justify-between rounded-md border p-4 shadow-sm transition-shadow hover:shadow-md"
      >
        <Link
          href={`http://localhost:3000/detail/${post.id}`}
          className="mb-2 rounded-md bg-blue-600 px-2 py-1 text-xl font-bold"
        >
          {post.title}
        </Link>
        <p className="cursor-default text-gray-300">
          {expandir ? post.body : `${post.body?.slice(0, 110)}...`}
          <span
            onClick={cambiarExpandir}
            className="ml-2 cursor-pointer text-blue-500 hover:underline"
          >
            {expandir ? "Ver menos" : "Ver más"}
          </span>
        </p>
        <Botones />
      </div>
    </div>
  );
};

export default Post;
