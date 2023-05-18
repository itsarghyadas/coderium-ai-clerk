import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Slide, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import Register from "./pages/RegisterForm";
import Dashboard from "./pages/Dashboard";
import ChatApp from "./chatgpt-v2/ChatApp";
import Pricing from "./pages/Pricing";
import Completion from "./pages/Completion";
import { Gallery, CreatePost } from "./dall-e-v2/page";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login/*" element={<LoginForm />} />
        <Route path="/register/*" element={<Register />} />
        <Route path="/completion" element={<Completion />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route
          path="/dashboard"
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                <Navigate to="/login" />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/chat"
          element={
            <>
              <SignedIn>
                <ChatApp />
              </SignedIn>
              <SignedOut>
                <Navigate to="/login" />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/imagica"
          element={
            <>
              <SignedIn>
                <CreatePost />
              </SignedIn>
              <SignedOut>
                <Navigate to="/login" />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </ClerkProvider>
  );
}

function App() {
  return (
    <div className="app">
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        theme="dark"
        transition={Slide}
        closeOnClick
        pauseOnHover
        limit={1}
      />
      <BrowserRouter>
        <ClerkProviderWithRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
