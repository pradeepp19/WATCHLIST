import { AuthCard } from "../components/AuthCard";

export function SignupPage() {
  return (
    <AuthCard
      title="Sign Up"
      buttonText="Create Account"
      onSubmit={(u, p) => console.log("Signup:", u, p)}
    />
  );
}
