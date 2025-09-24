import { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

function formatoTiempo(segundos: number) {
  const hrs = String(Math.floor(segundos / 3600)).padStart(2, "0");
  const mins = String(Math.floor((segundos % 3600) / 60)).padStart(2, "0");
  const secs = String(segundos % 60).padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
}

export default function Inf() {
  const [usuario, setUsuario] = useState<{ nombre: string; area: string } | null>(null);
  const [tiempoNivel1, setTiempoNivel1] = useState<number>(0);
  const [tiempoNivel2, setTiempoNivel2] = useState<number>(0);
  const [tiempoNivel3, setTiempoNivel3] = useState<number>(0);
  const [tiempoGlobal, setTiempoGlobal] = useState<number>(0);

  const [erroresNivel1, setErroresNivel1] = useState<string[]>([]);
  const [erroresNivel2, setErroresNivel2] = useState<string[]>([]);
  const [erroresNivel3, setErroresNivel3] = useState<string[]>([]);

  // Usa tu Formspree ID real aquí
  const [state, handleSubmit] = useForm("xvgbpbwk");

  useEffect(() => {
    const data = localStorage.getItem("usuario");
    if (data) setUsuario(JSON.parse(data));

    setTiempoNivel1(Number(localStorage.getItem("tiempoNivel1") || "0"));
    setTiempoNivel2(Number(localStorage.getItem("tiempoNivel2") || "0"));
    setTiempoNivel3(Number(localStorage.getItem("tiempoNivel3") || "0"));

    setErroresNivel1(JSON.parse(localStorage.getItem("erroresNivel1") || "[]"));
    setErroresNivel2(JSON.parse(localStorage.getItem("erroresNivel2") || "[]"));
    setErroresNivel3(JSON.parse(localStorage.getItem("erroresNivel3") || "[]"));
  }, []);

  useEffect(() => {
    setTiempoGlobal(tiempoNivel1 + tiempoNivel2 + tiempoNivel3);
  }, [tiempoNivel1, tiempoNivel2, tiempoNivel3]);

  if (state.succeeded) {
    return (
      <div className="bg-wp h-dvh flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-6">
            ¡Gracias por enviar tus datos!
          </h2>
          <p className="text-lg">Tu resumen ha sido enviado correctamente.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-wp h-dvh relative flex items-center justify-center">
      <div className="area absolute inset-0 -z-10">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <form className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Resumen de tu juego
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Nombre completo:
          </label>
          <input
            type="text"
            name="nombre"
            value={usuario?.nombre || ""}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Área:
          </label>
          <input
            type="text"
            name="area"
            value={usuario?.area || ""}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Tiempo Nivel 1:
          </label>
          <input
            type="text"
            name="tiempo_nivel_1"
            value={formatoTiempo(tiempoNivel1)}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Tiempo Nivel 2:
          </label>
          <input
            type="text"
            name="tiempo_nivel_2"
            value={formatoTiempo(tiempoNivel2)}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Tiempo Nivel 3:
          </label>
          <input
            type="text"
            name="tiempo_nivel_3"
            value={formatoTiempo(tiempoNivel3)}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-1">
            Tiempo total:
          </label>
          <input
            type="text"
            name="tiempo_total"
            value={formatoTiempo(tiempoGlobal)}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          />
        </div>
        {/* Preguntas en las que te equivocaste */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-1">
            Preguntas en las que te equivocaste:
          </label>
          <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
            {erroresNivel1.length === 0 && erroresNivel2.length === 0 && erroresNivel3.length === 0 ? (
              <span>No te equivocaste en ninguna pregunta.</span>
            ) : (
              <>
                {erroresNivel1.length > 0 && (
                  <div>
                    <span className="font-bold">Nivel 1:</span>
                    <ul className="list-disc ml-5">
                      {erroresNivel1.map((err, i) => <li key={`err1-${i}`}>{err}</li>)}
                    </ul>
                  </div>
                )}
                {erroresNivel2.length > 0 && (
                  <div>
                    <span className="font-bold">Nivel 2:</span>
                    <ul className="list-disc ml-5">
                      {erroresNivel2.map((err, i) => <li key={`err2-${i}`}>{err}</li>)}
                    </ul>
                  </div>
                )}
                {erroresNivel3.length > 0 && (
                  <div>
                    <span className="font-bold">Nivel 3:</span>
                    <ul className="list-disc ml-5">
                      {erroresNivel3.map((err, i) => <li key={`err3-${i}`}>{err}</li>)}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <ValidationError errors={state.errors} />
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm/6 font-semibold text-gray-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={state.submitting}
            className="rounded-full bg-blue-500 px-5 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}