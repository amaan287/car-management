import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import Dashboard from "./pages/dashboard";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./pages/CreatePost";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import PostPage from "./pages/PostPage";
import UpdatePost from "./pages/UpdatePost";
import { ThemeProvider } from "./components/theme-provider";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import FooterCom from "./components/Footer";
import Privacy from "./pages/terms&condition";
import Socials from "./pages/Socials";
import Story from "./pages/Story";
import { useEffect } from "react";
import AllPosts from "./pages/AllPosts";

function AppContent() {
  const location = useLocation();
  const showHeader = location.pathname !== "/dashboard";
  const showHeader2 = location.pathname !== "/sign-up";
  const showHeader3 = location.pathname !== "/sign-in";
  const showHeader4 = location.pathname !== "/privacy";
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
        <Route path="/all-posts" element={<AllPosts />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/story" element={<Story />} />
        <Route path="/socials" element={<Socials />} />

        <Route path="/privacy" element={<Privacy />} />
        <Route path="/post/:postSlug" element={<PostPage />} />
      </Routes>
      {showHeader && showHeader2 && showHeader3 && showHeader4 && <FooterCom />}
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
