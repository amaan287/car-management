import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { RootState } from "../redux/store";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
export interface User {
  _id: string;
  createdAt: string;
  profilePicture: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

export default function DashUsers() {
  const { currentUser } = useSelector(
    (state: RootState) => state.user
  ) as unknown as {
    currentUser: { _id: string; isAdmin: boolean };
  };
  const [users, setUsers] = useState<User[]>([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        console.log("Fetched users:", data); // Debug log

        if (res.ok) {
          setUsers(data.users || []);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        } else {
          console.error("Failed to fetch users:", data.message);
        }
      } catch (error) {
        console.log((error as Error).message);
      }
    };
    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      console.log("Fetched more users:", data); // Debug log

      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      } else {
        console.error("Failed to fetch more users:", data.message);
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log("Deleted user:", data); // Debug log

      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
      } else {
        console.error("Failed to delete user:", data.message);
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return (
    <div className="table-auto w-screen overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser?.isAdmin && users.length > 0 ? (
        <>
          <Table className="shadow-md rounded-xl">
            <TableCaption>List of accounts logged in</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date created</TableHead>
                <TableHead>User image</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow className=" " key={user._id}>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                    />
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="">
              <TableRow>
                <TableCell colSpan={5}>Total Users</TableCell>
                <TableCell className="text-left">{users.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no users yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header className="bg-background" />
        <Modal.Body className="bg-background">
          <div className="text-center bg-background">
            <HiOutlineExclamationCircle className="h-14 text-red-500 w-14 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg ">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                className="bg-gradient-to-r from-red-500 to-pink-600 text-white"
                onClick={handleDeleteUser}
              >
                Yes, I'm sure
              </Button>
              <Button onClick={() => setShowModal(false)}>No, cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
