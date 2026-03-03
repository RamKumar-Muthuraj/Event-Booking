import "./App.css";
import MainLayout from "./components/layout/MainLayout";
import AppRouter from "./router/AppRouter";

function App() {
  return (
  <MainLayout>
      <AppRouter />
  </MainLayout>
);
}

export default App;
