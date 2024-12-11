"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./components/Post";
import Paginacion from "./components/Paginacion";
import Image from "next/image";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [userIdFilter, setUserIdFilter] = useState(null);

  // Función para obtener posts
  const fetchPosts = async (userId = null) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/posts", {
        params: { 
          page, 
          search, 
          limit: 10, 
          ...(userId && { userId })
        },
      });
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  // UseEffect para cargar posts
  useEffect(() => {
    fetchPosts(userIdFilter);
  }, [page, search, userIdFilter]);

  // Función para buscar posts
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // Función para cambiar página
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Función para filtrar por userId
  const handleUserIdFilter = (userId) => {
    setUserIdFilter(userIdFilter === userId ? null : userId);
    setPage(1); 
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Image src="/logoNoxun1.png" width={200} height={200} alt="Logo Noxun" />
      
      <div className="mb-10 mt-7 flex flex-col items-center justify-between gap-4 md:flex-row">
        <h1 className="text-3xl font-bold">Publicaciones</h1>

        {/* Barra de búsqueda */}
        <input
          type="text"
          placeholder="Buscar posts..."
          value={search}
          onChange={handleSearch}
          className="w-full rounded-md border px-4 py-2 text-black md:w-2/5"
        />
      </div>

      {/* Indicador de filtro activo */}
      {userIdFilter && (
        <div className="mb-4 text-center">
          <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-2 rounded">
            Filtrando posts de Usuario {userIdFilter}
            <button 
              onClick={() => setUserIdFilter(null)} 
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </span>
        </div>
      )}

      {/* Lista de Posts */}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="m-auto grid max-w-3xl gap-12">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center">
              <button 
                onClick={() => handleUserIdFilter(post.userId)}
                className={`mr-4 flex h-7 w-8 items-center justify-center rounded-full p-2 font-semibold ${
                  userIdFilter === post.userId 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-blue-600'
                }`}
              >
                {post.userId}
              </button>
              <Post post={post} expand={false} />
            </div>
          ))}
        </div>
      )}

      {/* Paginación */}
      <div className="mt-6 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <Paginacion
            pageNum={pageNum}
            page={page}
            handlePageChange={handlePageChange}
            key={pageNum}
          />
        ))}
      </div>
    </div>
  );
}