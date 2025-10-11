import { AuthCard } from "../components/AuthCard";

export function SigninPage() {
  return (
    <AuthCard
      title="Sign In"
      buttonText="Login"
      onSubmit={(u, p) => console.log("Signin:", u, p)}
    />
  );
}
