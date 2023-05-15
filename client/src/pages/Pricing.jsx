import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
const baseUrl = import.meta.env.VITE_BASE_URL;

function Pricing() {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { user } = useUser();
  const checkoutUrl = `${baseUrl}/checkout`;
  if (user) {
    const existUsername = user.username;
    const userEmailId = user.emailAddresses[0]?.emailAddress;
  }

  const incrementQuantity = () => {
    if (quantity < 3) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleClick = async (itemId) => {
    if (!user) {
      navigate("/register");
      return;
    }

    const userEmailId = user?.emailAddresses[0]?.emailAddress;
    localStorage.setItem("itemId", itemId);
    localStorage.setItem("quantity", quantity);
    try {
      const response = await fetch(checkoutUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmailId,
          items: [{ id: itemId, quantity: quantity }],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col py-14 pb-14 font-bold lg:pt-0">
      <div className="nav-component">
        <Navbar />
      </div>
      <div className="container mx-auto max-w-4xl px-5 pt-8 pb-16 sm:pt-10">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="font-logo mt-4 text-center text-5xl font-bold md:text-6xl">
            Memberships
          </h1>
          <p className="m-auto mt-4 max-w-2xl text-center text-base text-slate-700/70">
            Choose a plan that works for you 🚀
          </p>
          <div className="my-8 space-y-8 md:mt-14 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
            <div className="card-one w-full rounded-lg p-8 ">
              <div className="flex h-full flex-col p-6">
                <div className="flex items-center space-x-5">
                  <h2 className="text-2xl font-semibold leading-6 underline decoration-dashed decoration-1 underline-offset-8">
                    Starter
                  </h2>
                  <div className="flex items-center  justify-center">
                    <button
                      className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-800/30 bg-lime-300 text-gray-700
                      "
                      onClick={decrementQuantity}
                    >
                      -
                    </button>
                    <span className="mx-2">{quantity}</span>
                    <button
                      className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-800/30 bg-lime-300 text-gray-700 "
                      onClick={incrementQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="mt-5 space-y-1 text-gray-600/80 ">
                  <div className="text-orange-600">
                    🎯 {2 * quantity} lakh Tokens.
                  </div>
                  <div>🎯 No slow generations.</div>
                  <div>🎯 Fast Support</div>
                  <div>🎯 One-Time Payment </div>
                </div>
                <div className="flex items-center space-x-10 pt-7">
                  <div>
                    <span className="white text-4xl font-bold text-slate-700">
                      ₹{80 * quantity}
                    </span>
                    <span className="text-base font-medium">/ Individual</span>
                  </div>
                </div>

                <button
                  className="mt-6 flex h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-gradient-to-t from-indigo-600 via-indigo-600 to-indigo-500 px-8 py-2 text-base text-white shadow drop-shadow transition-all hover:brightness-110 active:scale-95 "
                  onClick={() => handleClick(1)}
                >
                  Get started
                </button>
              </div>
            </div>
            <div className="card-one relative w-full rounded-lg p-8 ">
              <div className="absolute -top-2.5 -right-2.5 z-10 rounded bg-red-600 py-1.5 px-4 text-sm font-medium text-white shadow drop-shadow">
                Most Popular
              </div>
              <div className="flex h-full flex-col p-6">
                <h2 className="text-2xl font-semibold leading-6 underline decoration-dashed decoration-1 underline-offset-8">
                  Pro
                </h2>
                <div className="mt-5 space-y-1 text-lime-600 ">
                  <div className="text-orange-600">🎯 6 Million Tokens.</div>
                  <div>🎯 Ultimate Fast generations.</div>
                  <div>🎯 Ultra Fast Support</div>
                  <div>🎯 One-Time Payment </div>
                </div>
                <div className="mt-auto pt-7">
                  <span className="white text-4xl font-bold text-slate-700">
                    {" "}
                    ₹800
                  </span>
                  <span className="text-base font-medium">/ Individual</span>
                </div>
                <button
                  className="mt-6 flex h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-gradient-to-t from-indigo-600 via-indigo-600 to-indigo-500 px-8 py-2 text-base text-white shadow drop-shadow transition-all hover:brightness-110 active:scale-95 "
                  onClick={() => handleClick(2)}
                >
                  Get started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="m-auto max-w-4xl px-6">
        <h2 className="decoration-width-2 py-10 text-left text-4xl underline decoration-dashed decoration-1 underline-offset-8">
          Related Questions
        </h2>

        <div className="grid  grid-cols-1 gap-4 lg:grid-cols-2 ">
          <div className="faq card-one w-full rounded-lg p-8">
            <h4 className="mb-2">How does the plan limit work?</h4>
            <div className="text-[15px] text-zinc-500/80">
              If you go over your limit we'll nicely ask you to upgrade. You can
              create up to 100 images per month for free.
            </div>
          </div>
          <div className="faq card-one w-full rounded-lg p-8">
            <h4 className="mb-2">How does the plan limit work?</h4>
            <div className="text-[15px] text-zinc-500/80">
              If you go over your limit we'll nicely ask you to upgrade. You can
              create up to 100 images per month for free.
            </div>
          </div>
          <div className="faq card-one w-full rounded-lg p-8">
            <h4 className="mb-2">How does the plan limit work?</h4>
            <div className="text-[15px] text-zinc-500/80">
              If you go over your limit we'll nicely ask you to upgrade. You can
              create up to 100 images per month for free.
            </div>
          </div>
          <div className="faq card-one w-full rounded-lg p-8">
            <h4 className="mb-2">How does the plan limit work?</h4>
            <div className="text-[15px] text-zinc-500/80">
              If you go over your limit we'll nicely ask you to upgrade. You can
              create up to 100 images per month for free.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
