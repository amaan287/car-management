import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/HomePage.tsx";
import SignUp from "./pages/auth/SignUp.tsx";
import SignIn from "./pages/auth/SignIn.tsx";
import Header from "./components/Header.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import AllCars from "./pages/AllCars.tsx";

function AppContent() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/allCars" element={<AllCars />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
