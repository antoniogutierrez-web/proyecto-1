// app/api/generate/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    console.log("Prompt recibido:", prompt);

    const hfResponse = await fetch("https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-125M", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    const data = await hfResponse.json();
    console.log("Respuesta de Hugging Face:", data);

    if (data.error) {
      throw new Error(data.error);
    }

    const generatedText = Array.isArray(data) && data[0]?.generated_text
      ? data[0].generated_text
      : "No se obtuvo respuesta generada";

    return NextResponse.json({ text: generatedText });
  } catch (error) {
    console.error("Error en la API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
