// app/api/generate/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Extraemos el prompt del cuerpo de la petición
    const { prompt } = await request.json();
    
    // Simulamos la generación de contenido a partir del prompt.
    const responseText = `Contenido generado para el prompt: "${prompt}"`;

    // Devolvemos el resultado en formato JSON
    return NextResponse.json({ text: responseText });
  } catch (error) {
    console.error("Error en la API:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
