import { Avatar } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { FormEvent, useEffect, useState } from "react";
import { RootState } from "../redux/store";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Input } from "./ui/input";
function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <div className=" top-0 z-50 pt-2">
      <nav className="border-b-2 mx-2 bg-gray-100 dark:bg-card rounded-xl shadow-xl flex justify-between px-5 py-2 items-center z-50">
        <Link to="/" className="text-sm sm:text-xl font-semibold ">
          Blog
        </Link>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder={"Search.."}
            className="hidden lg:inline w-[400px] "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <Link to={"/search"}>
          <Button className=" text-gray-800 hover:text-gray-100 dark:text-white dark:hover:text-gray-800 bg-transparent text-lg shadow-md w-12 h-10 items-center lg:hidden">
            <AiOutlineSearch />
          </Button>
        </Link>

        {currentUser ? (
          <div className="flex gap-4">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <h1 className=" cursor-pointer">
                  <Avatar
                    alt="user"
                    img={currentUser?.profilePicture}
                    rounded
                  />
                </h1>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                  <span className="block text-sm">
                    @{currentUser?.username}
                  </span>
                  <span className="block text-sm font-medium truncate">
                    {currentUser?.email}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to={"/dashboard?tab=profile"}>
                  <DropdownMenuCheckboxItem>Profile</DropdownMenuCheckboxItem>
                </Link>
                <DropdownMenuCheckboxItem onClick={handleSignout}>
                  Signout
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div>
            <Link to={"/sign-in"}>
              <Button color={"black"}>SignIn</Button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;
