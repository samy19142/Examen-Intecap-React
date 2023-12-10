import { useState } from "react";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";

import { useAuth } from "../context/authContext/";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login2 = () => {
  //--------------------------------

  const navigate = useNavigate();
  const { signup, login, user } = useAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
console.log(name)
    setFormData({ ...formData, [name]: value });
  };

  const handleRegisterOrLogin = () => {
    setIsRegister(!isRegister);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        await signup(formData);
        Swal.fire({
          position: "top-right",
          icon: "success",
          title: "Registro Exitoso!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      } else {
        await login(formData);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "top-right",
        icon: "error",
        title: "Ocurrio un error mientras se registraba",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  //----------------------------------

  if (user) {
    return navigate("/");
  } else
    return (
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={1}
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">
            {isRegister ? "Registrar" : "Iniciar sesion"}
          </Typography>

          <TextField
            id="email"
            label="Nombre de Usuario"
            variant="outlined"
            fullWidth
            type="text"
            name="email"
            value={formData.email}
            onChange={(e) => handleInputs(e)}
          />
          <TextField
            label="Contraseña"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => handleInputs(e)}
          />
        
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => handleSubmit(e)}
            style={{ marginTop: 20 }}
          >
            {isRegister ? "Registrar" : "Iniciar sesión"}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleRegisterOrLogin()}
            style={{ marginTop: 10 }}
          >
            {isRegister ? "Regresar" : "Registrar"}
          </Button>
        </Paper>
      </Container>
    );
};

export default Login2;
