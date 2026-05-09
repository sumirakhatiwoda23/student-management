import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { StudentProvider } from "./context/StudentContext";
import AppRoutes from "./routes/AppRoutes";

// Inner component so it can read AuthContext that wraps it
const StudentProviderWithAuth = ({ children }) => {
  const { loading: authReady, token } = useContext(AuthContext);
  // authReady here means "auth has finished loading" — we pass !loading
  return (
    <StudentProvider authReady={!authReady} token={token}>
      {children}
    </StudentProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <StudentProviderWithAuth>
        <AppRoutes />
      </StudentProviderWithAuth>
    </AuthProvider>
  );
}

export default App;