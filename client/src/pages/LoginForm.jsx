import { SignIn } from "@clerk/clerk-react";
import React from "react";
import Navbar from "../components/Navbar";

function SignInPage() {
  return (
    <div>
      <div className="nav-component">
        <Navbar />
      </div>
      <div className="flex h-screen items-center justify-center tracking-wider lg:h-[90vh]">
        <SignIn
          signUpUrl="/register"
          redirectUrl="/dashboard"
          afterSignInUrl="/dashboard"
          routing="path"
          path="/login"
          appearance={{
            elements: {
              card: {
                boxShadow: "0px 0px 20px -8px rgb(31 38 135 / 35%);",
                border: "1px solid #dfdfdf",
              },
              formFieldInput: {
                fontSize: "14.5px",
                fontWeight: "500",
              },
              footerActionLink: {
                fontSize: "13px",
                fontWeight: "520",
                "&:hover": {
                  color: "red",
                  textDecoration: "none",
                },
                "&:focus": {
                  boxShadow: "none",
                },
              },
              socialButtonsBlockButtonText: {
                fontWeight: "500",
                fontSize: "14px",
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default SignInPage;
