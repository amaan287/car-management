import SignInForm from "../../components/example/signin-form";

export interface FormData {
  email?: string;
  password?: string;
}

function SignIn() {
  return (
    <div className="min-h-screen mt-20">
      <SignInForm />
    </div>
  );
}

export default SignIn;
