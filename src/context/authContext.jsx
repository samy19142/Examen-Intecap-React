import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { auth } from "../Firebase-config/";
const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no auth provider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user,setUser] = useState(null);
  const [loading,setLoading]= useState(true);

  const signup = async ({ email, password }) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async ({ email, password }) => {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  const logout =async()=>{
    await signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
      setLoading(false);
    });
  }, []);

  return (
    <authContext.Provider value={{ signup, login,user, logout,loading }}>
      {children}
    </authContext.Provider>
  );
};
