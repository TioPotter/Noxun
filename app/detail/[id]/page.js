"use client";

import Post from "@/app/components/Post";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const DetallesPost = () => {
  const [originalPost, setOriginalPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const params = useParams();
  const postId = params.id;

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/comments?postId=${postId}`);
        setComments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error obteniendo comentarios:", error);
        setError("No se pudieron cargar los comentarios.");
      }
      setLoading(false);
    };

    if (postId) {
      fetchComments();
    }

    const fetchOriginalPost = async () => {
      try {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?id=${postId}`,
        );
        setOriginalPost(res.data[0]);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOriginalPost();
  }, [postId]);

  if (loading) return <div className="grid place-items-center h-screen font-bold">Cargando comentarios...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between">
      <h1>Detalles del Post</h1>
      <Link href="/" className="px-2 py-1 bg-blue-600 rounded-2xl">Volver</Link>
      </div>
      <p>ID del Post: {postId}</p>
      <div className="grid gap-8 max-w-3xl m-auto mt-5">
      <Post post={originalPost} expand={true}/>
     
      {comments.length === 0 ? (
        <p>No hay comentarios</p>
      ) : (
        <ul className=" ">
          {comments.map((comment) => (
            <li key={comment.id} className="mb-8 flex flex-col gap-1 bg-gray-900 py-3 px-5 rounded-2xl">
              <h3 className="font-bold flex items-center gap-3"><FaUserCircle className="text-xl"/>{comment.name}</h3>
              <p className="text-gray-500 flex items-center gap-3"><MdEmail className="text-xl"/>{comment.email}</p>
              <p className="text-gray-100">{comment.body}</p>
            </li>
          ))}
        </ul>
      )}
      </div>
      
    </div>
  );
};

export default DetallesPost;
