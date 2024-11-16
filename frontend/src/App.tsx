import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/HomePage.tsx";
import SignUp from "./pages/auth/SignUp.tsx";
import SignIn from "./pages/auth/SignIn.tsx";
import Header from "./components/Header.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import AllCars from "./pages/AllCars.tsx";
import CreateCar from "./pages/CreatePost.tsx";
import UpdateCar from "./pages/UpdateCar.tsx";
import CarPage from "./pages/CarPage.tsx";

function AppContent() {
  return (
    <div className="bg-black h-screen">
      <Header />
      <Routes>
        <Route path="/create-Car" element={<CreateCar />} />
        <Route path="/update-Car/:CarId" element={<UpdateCar />} />
        <Route path="/allCars" element={<AllCars />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/Car/:slug" element={<CarPage />} />
        <Route path="/sign-in" element={<SignIn />} />
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
