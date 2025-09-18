import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const crearUsuarioSiNoExiste = async (user: any) => {
  const userRef = doc(db, "usuarios", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, {
      nombre: user.displayName,
      email: user.email,
      nivelMaximo: 1,
    });
  }
};

export const obtenerUsuario = async (uid: string) => {
  const userRef = doc(db, "usuarios", uid);
  const snap = await getDoc(userRef);
  return snap.exists() ? snap.data() : null;
};

export const actualizarNivel = async (uid: string, nuevoNivel: number) => {
  const userRef = doc(db, "usuarios", uid);
  await updateDoc(userRef, { nivelMaximo: nuevoNivel });
};
