import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center">
      <div className="bg-white w-96 h-96 shadow-xl text-black px-10 items-center justify-center rounded-xl flex">
        <h1 className="text-lg">
          This website and all its content, including the paintings, are the
          exclusive property of
          <Link to={"https://www.instagram.com/amaanmirza_am/"}>
            {" "}
            <span className="text-blue-500 px-2 font-bold">
              Amaan mirza
            </span>{" "}
          </Link>{" "}
          and{" "}
          <Link to={"https://www.instagram.com/priyanshsoniii/"}>
            <span className="text-blue-500 px-2 font-bold">Priyansh soni</span>{" "}
          </Link>{" "}
          Unauthorized use of any material from this site is strictly prohibited
          and constitutes a violation of our privacy policy.
        </h1>
      </div>
    </div>
  );
}
