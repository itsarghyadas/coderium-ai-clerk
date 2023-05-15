import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
const baseUrl = import.meta.env.VITE_BASE_URL;
function Completion() {
  const [totalToken, setTotalToken] = useState(0);
  const navigate = useNavigate();
  const { user } = useUser();
  const username = user?.username;
  const userEmailAddress = user?.emailAddresses[0].emailAddress;
  const tokenUrl = `${baseUrl}/totalTokens?username=${username}`;

  useEffect(() => {
    if (!username) return;
    const fetchTokenCount = async () => {
      try {
        const response = await fetch(tokenUrl);
        const { totalToken } = await response.json();
        setTotalToken(totalToken);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchTokenCount();
  }, [username]);

  return (
    <div className="completion">
      <div className="nav-component">
        <Navbar />
      </div>
      <div className="flex h-screen items-center justify-center lg:h-[90vh]">
        <div className="card-one max-w-lg rounded-lg bg-white px-10 py-8">
          <h1 className="mb-4 text-2xl font-bold">Payment Successful</h1>
          <p className="mt-2 font-medium text-slate-500/80">
            Thank you for your purchase. Your new token balance is{" "}
            <span className="font-bold text-purple-700">{totalToken}</span> 🎉
          </p>

          <p className="mt-2 font-medium text-slate-500/80">
            We have sent you the receipt to{" "}
            <span className="font-bold text-red-500">{userEmailAddress}</span>
          </p>

          <button
            className="mt-5 rounded-lg border border-slate-500/50 bg-indigo-500 px-5 py-2 font-medium text-white shadow drop-shadow-md"
            onClick={() => navigate("/chat")}
          >
            Got it Thanks !
          </button>
        </div>
      </div>
    </div>
  );
}

export default Completion;
