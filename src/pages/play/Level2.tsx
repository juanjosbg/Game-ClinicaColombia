import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const preguntas = [
  { id: 1, texto: "Recibir un trato digno y respetuoso", tipo: "derecho" },
  { id: 2, texto: "Cumplir con las normas de la institución", tipo: "deber" },
  { id: 3, texto: "Acceder a la información de su tratamiento", tipo: "derecho" },
  { id: 4, texto: "Respetar al personal de salud", tipo: "deber" },
  { id: 5, texto: "Recibir atención segura", tipo: "derecho" },
];

function JuegoDerechos() {
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [vidas, setVidas] = useState(3);
  const [terminado, setTerminado] = useState(false);
  const [tiempo, setTiempo] = useState(0);
  const [respuestasBloqueadas, setRespuestasBloqueadas] = useState<string[]>([]);
  const [errores, setErrores] = useState<string[]>([]);
  const [repeticiones, setRepeticiones] = useState(1);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!terminado) {
      timer = setInterval(() => {
        setTiempo((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [terminado]);

  useEffect(() => {
    const rep = localStorage.getItem("repeticionesNivel2");
    setRepeticiones(rep ? Number(rep) : 1);
  }, []);

  const formatoTiempo = (segundos: number) => {
    const hrs = String(Math.floor(segundos / 3600)).padStart(2, "0");
    const mins = String(Math.floor((segundos % 3600) / 60)).padStart(2, "0");
    const secs = String(segundos % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const responder = (respuesta: "derecho" | "deber") => {
    if (respuestasBloqueadas.includes(respuesta)) return;

    if (respuesta === actual.tipo) {
      setTimeout(() => {
        if (index + 1 < preguntas.length) {
          setIndex(index + 1);
          setRespuestasBloqueadas([]);
        } else {
          setTerminado(true);
        }
      }, 1000);
    } else {
      setRespuestasBloqueadas((prev) => [...prev, respuesta]);
      setErrores((prev) => [...prev, actual.texto]);
      setVidas((prev) => {
        if (prev - 1 <= 0) {
          setTerminado(true);
          return 0;
        }
        return prev - 1;
      });
    }
  };

  const reiniciar = () => {
    setIndex(0);
    setVidas(3);
    setTerminado(false);
    setTiempo(0);
    setRespuestasBloqueadas([]);
    setErrores([]);
    const nuevaRepeticion = repeticiones + 1;
    setRepeticiones(nuevaRepeticion);
    localStorage.setItem("repeticionesNivel2", String(nuevaRepeticion));
  };

  const salir = () => {
    const confirmado = window.confirm(
      "¿Estás segura de volver al menú de inicio?"
    );
    if (confirmado) {
      navigate("/home");
    }
  };

  const usuarioLocal = localStorage.getItem("usuario");
  const usuario = usuarioLocal ? JSON.parse(usuarioLocal) : { nombre: "", area: "" };

  const guardarResultado = async (aprobado: boolean) => {
    try {
      await addDoc(collection(db, "resultados_nivel2"), {
        nombre: usuario.nombre,
        area: usuario.area,
        intentos: preguntas.length,
        preguntasErroneas: errores,
        cantidadErrores: errores.length,
        tiempo: formatoTiempo(tiempo),
        aprobado: aprobado,
        repitio: repeticiones > 1,
        repeticiones: repeticiones,
        fecha: new Date(),
      });
    } catch (error) {
      console.error("Error guardando resultado en Firebase:", error);
    }
  };

  const actual = preguntas[index];

  return (
    <div className="bg-wp h-dvh relative">
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

      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        {!terminado ? (
          <div className="bg-white shadow-lg rounded-xl p-6 max-w-lg w-full text-center">
            <div className="flex justify-between mb-4 text-lg font-semibold">
              <span>❤️ Vidas: {vidas}</span>
              <span>⏱ {formatoTiempo(tiempo)}</span>
            </div>

            <h2 className="text-xl font-bold mb-4">
              ¿Es un Derecho o un Deber?
            </h2>
            <p className="text-lg mb-6">{actual.texto}</p>

            <div className="flex gap-4 justify-center">
              {["derecho", "deber"].map((opcion) => {
                let color = "bg-blue-500 hover:bg-blue-600";
                if (respuestasBloqueadas.includes(opcion)) {
                  color = "bg-gray-400";
                } else if (
                  opcion === actual.tipo &&
                  respuestasBloqueadas.length > 0
                ) {
                  color = "bg-green-500";
                }
                return (
                  <button
                    key={opcion}
                    onClick={() => responder(opcion as "derecho" | "deber")}
                    disabled={respuestasBloqueadas.includes(opcion)}
                    className={`px-6 py-2 text-white rounded-lg shadow transition ${color}`}
                  >
                    {opcion === "derecho" ? "Derecho" : "Deber"}
                  </button>
                );
              })}
            </div>

            <p className="mt-4 text-gray-600">
              Pregunta {index + 1} de {preguntas.length}
            </p>
          </div>
        ) : vidas > 0 ? (
          <div className="bg-white shadow-lg rounded-xl p-6 max-w-lg w-full text-center">
            <h2 className="text-2xl font-bold mb-4">Nivel 2 completado 🎉</h2>
            <p className="text-lg mb-2">
              ⏱ Tiempo final: {formatoTiempo(tiempo)}
            </p>
            <p className="text-lg">❤️ Vidas restantes: {vidas}</p>
            <button
              onClick={async () => {
                localStorage.setItem("puntajeNivel2", String(vidas));
                localStorage.setItem("tiempoNivel2", String(tiempo));
                localStorage.setItem("nivelMaximo", "3");
                localStorage.setItem("erroresNivel2", JSON.stringify(errores));
                await guardarResultado(true);
                navigate("/home");
              }}
              className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
            >
              Guardar y Siguiente
            </button>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-xl p-6 max-w-lg w-full text-center">
            <h2 className="text-2xl font-bold mb-4">
              ¡ohh no! te has quedado sin vida💀
            </h2>
            <p className="text-lg mb-2">
              ⏱ Tiempo final: {formatoTiempo(tiempo)}
            </p>
            <p className="text-lg">❤️ Vidas restantes: {vidas}</p>
            <div className="flex gap-4 px-5 justify-center">
              <button
                onClick={reiniciar}
                className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
              >
                Volver a jugar
              </button>
              <button
                onClick={async () => {
                  await guardarResultado(false);
                  navigate("/home");
                }}
                className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
              >
                Salir
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JuegoDerechos;