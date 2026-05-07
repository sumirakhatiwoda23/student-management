import { AuthProvider } from "./context/AuthContext";
import { StudentProvider } from "./context/StudentContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <StudentProvider>
        <AppRoutes />
      </StudentProvider>
    </AuthProvider>
  );
}

export default App;