import { Footer } from "flowbite-react";
// import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsGithub, BsYoutube } from "react-icons/bs";
import { Link } from "react-router-dom";
export default function FooterCom() {
  return (
    <div className="border w-full px-2 py-2 rounded-lg bg-background ">
      <div className="w-full px-2 py-2 max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          {/* <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Sahand's
              </span>
              Blog
            </Link>
          </div> */}
          <div className="grid grid-cols-2 gap-8 mt-4 py-2 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="Follow us" className="pb-2 " />
              <Footer.LinkGroup col>
                <Link
                  to="https://www.github.com/amaan287"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  Github
                </Link>
                <Link
                  to="https://www.facebook.com/priyansh.soni.12576"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  Facebook
                </Link>

                <Link to={"https://www.instagram.com/priyanshsoniii/"}>
                  Instagram
                </Link>

                <Link
                  to={"https://youtube.com/@priyanshsoniii?si=ixnJZJAczAKWnYgi"}
                >
                  Youtube
                </Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" className="pb-2" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider className="pb-2 my-2" />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="/"
            by="daily airs"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon
              href="https://www.facebook.com/priyansh.soni.12576"
              icon={BsFacebook}
            />
            <Footer.Icon
              href="https://www.instagram.com/priyanshsoniii/"
              icon={BsInstagram}
            />
            <Footer.Icon
              href="https://youtube.com/@priyanshsoniii?si=ixnJZJAczAKWnYgi"
              icon={BsYoutube}
            />
            <Footer.Icon href={"https://github.com/amaan287"} icon={BsGithub} />
          </div>
        </div>
      </div>
    </div>
  );
}
