import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Settings from "./components/pages/Settings";
import Products from "./components/pages/products/Products";
import Home from "./components/pages/Home";
import Shopping from "./components/pages/Shopping";
import Informe from "./components/pages/Informe";
import Clients from "./components/pages/Clients/Clients";
import Login from "./components/Login";
import { AuthProvider } from "./context/authContext/";
import { Container } from "react-bootstrap";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login2 from "./components/Login2";

function App() {
  return (
    <Container>
      <div>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute> } />
            <Route path="/clientes" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/shopping" element={<ProtectedRoute><Shopping /></ProtectedRoute>} />
            <Route path="/resultados" element={<ProtectedRoute><Informe /></ProtectedRoute>} />
          </Routes>
        </AuthProvider>
      </div>
    </Container>
  );
}

export default App;
