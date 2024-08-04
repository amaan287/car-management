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
import Search from "./components/Search";
import UpdatePost from "./pages/UpdatePost";
import { ThemeProvider } from "./components/theme-provider";
import AllPosts from "./pages/AllPosts";
import LandingPage from "./pages/LandingPage";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import FooterCom from "./components/Footer";
import Privacy from "./pages/terms&condition";
import Socials from "./pages/Socials";
import Story from "./pages/Story";

function AppContent() {
  const location = useLocation();
  const showHeader = location.pathname !== "/dashboard";
  const showHeader1 = location.pathname !== "/";
  const showHeader2 = location.pathname !== "/sign-up";
  const showHeader3 = location.pathname !== "/sign-in";
  const showHeader4 = location.pathname !== "/privacy";
  const { currentUser } = useSelector((state: RootState) => state.user);
  return (
    <div className="dark:bg-black h-full">
      {showHeader1 && showHeader && <Header />}
      <Routes>
        {!currentUser && (
          <>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
          </>
        )}
        <Route path="/search" element={<Search />} />
        <Route path="/all-posts" element={<AllPosts />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="/home" element={<HomePage />} />
        <Route path="/story" element={<Story />} />
        <Route path="/socials" element={<Socials />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/post/:postSlug" element={<PostPage />} />
      </Routes>
      {showHeader1 &&
        showHeader &&
        showHeader2 &&
        showHeader3 &&
        showHeader4 && <FooterCom />}
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
