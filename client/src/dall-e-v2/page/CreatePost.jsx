import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../../components/Navbar";
const baseUrl = import.meta.env.VITE_BASE_URL;

const CreatePost = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const username = user?.username;
  const generateDalleUrl = `${baseUrl}/generateimage`;
  const postImageUrl = `${baseUrl}/postimage`;

  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(generateDalleUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(postImageUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            username: username,
          }),
        });

        await response.json();
        navigate("/gallery");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please generate an image with proper details");
    }
  };

  return (
    <section className="mx-auto max-w-7xl">
      <div>
        <Navbar />
      </div>
      <div className="px-3.5 md:px-5">
        <div className="mx-auto mt-24 max-w-3xl ">
          <h1 className="font-melodrama text-4xl font-extrabold text-slate-800/90 lg:text-5xl ">
            CREATE
          </h1>
          <p className="mt-2 font-melodrama font-bold text-cyan-600/80 lg:text-lg">
            Create your Imagination
          </p>
        </div>
        <form className="mx-auto mt-8 max-w-3xl" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />
            <div className="relative flex h-80 w-80 items-center justify-center rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500">
              {form.photo ? (
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className="h-full w-full object-contain"
                />
              ) : (
                <img
                  src={preview}
                  alt="preview"
                  className="h-9/12 w-9/12 object-contain opacity-40"
                />
              )}
              {generatingImg && (
                <div className="absolute inset-0 z-0 flex items-center justify-center rounded-lg bg-[rgba(0,0,0,0.5)]">
                  <Loader />
                </div>
              )}
            </div>
          </div>
          <div className="mt-5 grid gap-2 sm:flex">
            <button
              type="button"
              onClick={generateImage}
              className=" w-full rounded-md bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 px-5 py-2.5 text-center text-base font-medium text-white shadow ring-1 ring-teal-500/20 drop-shadow"
            >
              {generatingImg ? "Generating..." : "Generate"}
            </button>
            <button
              type="submit"
              className="w-full rounded-md bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-5 py-2.5 text-center text-base font-medium text-white shadow ring-1 ring-red-500/20 drop-shadow"
            >
              {loading ? "Sharing..." : "Share with the Community"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
