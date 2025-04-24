"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function HomePage() {
  const [productos, setProductos] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProductos() {
      const { data, error } = await supabase.from("productos").select("*");
      if (!error && data) setProductos(data);
    }
    fetchProductos();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Productos disponibles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {productos.map((prod) => (
          <div key={prod.id} className="p-4 border rounded-lg shadow">
            <h2 className="text-xl font-semibold">{prod.nombre}</h2>
            <p>{prod.descripcion}</p>
            <p className="font-bold text-green-600">${prod.precio}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
