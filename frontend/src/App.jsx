import { StudentProvider } from "./context/StudentContext";
import AppRoutes from "./routes/AppRoutes";
 
function App() {
  return (
    <StudentProvider>
      <AppRoutes />
    </StudentProvider>
  );
}
 
export default App;