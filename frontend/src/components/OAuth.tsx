import { FcGoogle } from "react-icons/fc";
// import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
// import { app } from "../firebase";
// import { useDispatch } from "react-redux";
// import { signInSuccess } from "../redux/user/userSlice";
// import { useNavigate } from "react-router-dom";

export default function OAuth() {
  return (
    <div>
      <button
        // onClick={}
        className="transition-all shadow-md w-full border hover:text-cyan-900 rounded-lg hover:bg-gray-100  justify-center items-center flex py-2"
      >
        <FcGoogle className="w-6 h-6 mx-2" />{" "}
        <p className="font-semibold">Continue with google</p>
      </button>
    </div>
  );
}
