import { useState } from "react";
import SignUpScreen from "./SignupScreen";
import SigninScreen from "./SigninScreen";

export function Loginflow() {
  const [isSignUp, setIsSignUp] = useState(true);

  if (isSignUp) return <SignUpScreen onSignin={() => setIsSignUp(false)} />;

  return <SigninScreen onSignup={() => setIsSignUp(true)} />;
}
