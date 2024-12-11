import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 10;
    const search = searchParams.get('search') || '';
    const userId = searchParams.get('userId') || null;

    // Obtener posts de JSONPlaceholder
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    let posts = response.data;

    // Filtrado por userId
    if (userId) {
      posts = posts.filter(post => post.userId === Number(userId));
    }

    // Filtrado por búsqueda
    if (search) {
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Paginación
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedPosts = posts.slice(startIndex, endIndex);

    //Retorno de datos 
    return NextResponse.json({
      posts: paginatedPosts,
      total: posts.length,
      totalPages: Math.ceil(posts.length / Number(limit)),
      currentPage: Number(page)
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Error obteniendo posts'
    }, { status: 500 });
  }
}