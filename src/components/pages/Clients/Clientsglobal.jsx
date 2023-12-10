import { useState, useEffect } from "react";
import { db } from "../../../firebase-config/";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const Clientsglobal = () => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    direccion: "1 mayo",
    email: "Cris@gmail.com",
    nombre: "Cris",
    telefono: "121247650",
  });

  //config firestore
  const cliensCollectionRef = collection(db, "agenda");


  const getClients = async () => {
    const data = await getDocs(cliensCollectionRef);
    setClients(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const addClient=async()=>{
    await addDoc(cliensCollectionRef,newClient);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Cliente Guardado con éxito",
      showConfirmButton: false,
      timer: 1500
    });
  }
  const deleteClient = async (id) => {
    const userDoc = doc(db, "agenda", id); // referencia al documento de firebase que queremos eliminar ej: doc(db, "users", id) 
    await deleteDoc(userDoc); // deleteDoc: elimina un documento de una colección
    Swal.fire("Cliente Eliminado.", "success"); // alerta de sweetalert2
    
    getClients();
  };

  
  useEffect(() => {
    getClients();
  }, []);




  return (
    <>
      <h1>Bienvenido a clientes</h1>
      <button onClick={()=>addClient()}>AddClient</button>
    </>
  );
};

export default Clientsglobal;
