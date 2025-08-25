import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function RegistroEncargados() {
  const [formData, setFormData] = useState({
    nombre: "",
    area: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "usuarios"), {
        nombre: formData.nombre,
        area: formData.area,
        email: formData.email,
        creadoEn: new Date(),
      });

      localStorage.setItem("usuario", JSON.stringify({
        nombre: formData.nombre,
        area: formData.area,
      }));

      navigate("/home");
    } catch (error) {
      console.error("Error al guardar en Firestore:", error);
      alert("❌ Hubo un error, revisa la consola.");
    }
  };

  return (
    <div className="">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Game Clinica</span>
              <img
                alt="Game Clinica"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
          </div>
        </nav>
      </header>

      {/* Formulario */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
              Registro de Encargados
            </h1>

            <form
              onSubmit={handleSubmit}
              className="max-w-sm mx-auto mt-8 space-y-5"
            >
              {/* Nombre */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Área */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Área del encargado
                </label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Ejemplo: Ventas, Marketing, TI"
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Correo */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="correo@ejemplo.com"
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Botón */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Registrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
