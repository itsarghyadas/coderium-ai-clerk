import React from "react";
import { SignUp } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";

function SignUpPage() {
  return (
    <div>
      <div className="nav-component">
        <Navbar />
      </div>
      <div className="flex h-screen items-center justify-center tracking-wider lg:h-[90vh]">
        <SignUp
          signInUrl="/login"
          redirectUrl="/dashboard"
          routing="path"
          path="/register"
          appearance={{
            elements: {
              card: {
                boxShadow: "0px 0px 20px -8px rgb(31 38 135 / 35%);",
                border: "1px solid #dfdfdf",
              },
              formFieldInput: {
                fontSize: "14.5px",
                fontWeight: "520",
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

export default SignUpPage;
