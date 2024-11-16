import { Avatar } from "flowbite-react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";

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

import { motion } from "framer-motion";
function Header() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);

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

  return (
    <div className=" top-0 z-50 ">
      <nav className="border-b-2 mx-2 bg-gray-100 dark:bg-card rounded-xl shadow-xl flex justify-between px-5 py-2 items-center z-50">
        <Link
          to="/"
          className="text-sm sm:text-xl font-semibold flex items-center justify-center gap-2"
        >
          <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-medium text-black dark:text-white whitespace-pre"
          >
            CM
          </motion.span>
        </Link>

        <div className="flex gap-5 items-center justify-center">
          {currentUser ? (
            <Link to={"/create-Car"}>
              <Button className="bg-white text-gray-800 hover:bg-gray-200 hover:text-600">
                Create Post
              </Button>
            </Link>
          ) : null}
          {currentUser ? (
            <div className="flex gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <h1 className="scale-75 md:scale-100 cursor-pointer">
                    <Avatar
                      alt="user"
                      // size={icons}
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

                  <DropdownMenuCheckboxItem onClick={handleSignout}>
                    Signout
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div>
              <Link to={"/sign-in"}>
                <Button className="bg-white text-gray-800 hover:bg-gray-200 hover:text-600">
                  SignIn
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
