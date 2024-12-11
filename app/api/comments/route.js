import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json({ 
        error: 'Se requiere un ID de post.' 
      }, { status: 400 });
    }
    //Fetching de datos
    const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);

    const comments = response.data;
// console.log(comments)
    // Retorno de datos de comentarios
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ 
      error: error.message 
    }, { status: 500 });
  }
}