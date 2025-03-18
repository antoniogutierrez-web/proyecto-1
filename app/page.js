// app/page.js
"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data.text);
    } catch (error) {
      console.error("Error en la llamada a la API:", error);
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Generador de Contenido AI</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Escribe tu prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Generar
        </button>
      </form>
      {loading && <p className={styles.loading}>Cargando...</p>}
      {result && (
        <div className={styles.result}>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
