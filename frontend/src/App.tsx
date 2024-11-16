import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateCar from "./pages/CreatePost";

import CarPage from "./pages/CarPage";
import UpdateCar from "./pages/UpdateCar";
import { ThemeProvider } from "./components/theme-provider";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useEffect } from "react";
import AllCars from "./pages/AllCars";

function AppContent() {
  const location = useLocation();
  const showHeader = location.pathname !== "/dashboard";

  const { currentUser } = useSelector((state: RootState) => state.user);
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }
  return (
    <div className="dark:bg-black h-full">
      {showHeader && <Header />}
      <ScrollToTop />
      <Routes>
        {!currentUser && (
          <>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
          </>
        )}
        <Route element={<PrivateRoute />}>
          <Route path="/allCars" element={<AllCars />} />
          <Route path="/update-Car/:CarId" element={<UpdateCar />} />
          <Route path="/create-Car" element={<CreateCar />} />
          <Route path="/Car/:CarSlug" element={<CarPage />} />
        </Route>

        <Route path="/" element={<HomePage />} />
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
