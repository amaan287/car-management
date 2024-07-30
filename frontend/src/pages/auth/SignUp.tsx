import { Alert, Button, Spinner } from "flowbite-react";
import { Label } from "flowbite-react/components/Label";
import { TextInput } from "flowbite-react/components/TextInput";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../../components/OAuth";
interface FormData {
  username?: string;
  email?: string;
  password?: string;
}
function SignUp() {
  const [formData, setFormData] = useState<FormData>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage((error as Error).message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [loading]);
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl flex-col mx-auto md:items-center gap-5">
        {/* left */}
        <h1 className="text-4xl font-bold">Sign Up</h1>
        {/* right */}

        <div className="h-[520px] w-[60%] border shadow-xl p-10 rounded-xl">
          <form
            className="flex h-[80%] flex-col gap-4 justify-center"
            onSubmit={handleSubmit}
          >
            <div>
              <Label value="Your Username" />
              <TextInput
                type="text"
                placeholder="username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="*****"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <OAuth />

          <div className="flex gap-2 text-sm mt-7 justify-center items-center">
            <span>Already have an account?</span>
            <Link to="/sign-in" className="">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
