import React, { useEffect, useState } from "react";
import { Card, FormField, Loader } from "../components";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseUrl = import.meta.env.VITE_BASE_URL;

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="w-fit rounded-lg bg-red-500 px-4 py-1.5 text-center font-medium text-white">
      {title}
      <RxCrossCircled className="mb-0.5 ml-2 inline-block text-xl text-white" />
    </h2>
  );
};

const Gallery = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const navigate = useNavigate();

  const getImageUrl = `${baseUrl}/getimage`;

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch(getImageUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts. Please try again later.");
      }

      const result = await response.json();
      setAllPosts(result.data.reverse());
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="mx-auto max-w-7xl">
      <div>
        <Navbar />
      </div>
      <div className="px-3.5 md:px-5">
        <div className="mt-24 flex flex-col items-center justify-center">
          <h1 className="font-melodrama text-6xl font-extrabold text-slate-800/90 lg:text-8xl ">
            IMAGICA
          </h1>
          <p className="mt-2 font-melodrama font-bold text-orange-600/80 lg:text-lg">
            Browse through the Gallery of Imagination
          </p>
        </div>
        <div>
          <div className="mt-7 flex items-center justify-start">
            <button
              type="button"
              className="generate-button w-full rounded-md bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 px-5 py-2.5 text-center text-base font-medium text-white shadow ring-1 ring-red-500/20 drop-shadow lg:w-fit"
              onClick={() => navigate("/imagica")}
            >
              Generate Images
            </button>
          </div>
        </div>
        <div className="mt-1">
          <FormField
            labelName="Search posts"
            type="text"
            name="text"
            placeholder="Search something..."
            value={searchText}
            handleChange={handleSearchChange}
          />
        </div>
        <div className="my-10">
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <>
              {searchText && (
                <h2 className="mb-3 w-fit rounded-lg border-2 border-slate-500/20 bg-gray-100 px-4 py-1.5 font-medium">
                  Showing Resuls for{" "}
                  <span className="text-[#222328]">{searchText}</span>
                  <FaLongArrowAltRight className="ml-2 inline-block text-slate-800" />
                </h2>
              )}
              <div className="xs:grid-cols-2 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {searchText ? (
                  <RenderCards
                    data={searchedResults}
                    title="No Search Results Found"
                  />
                ) : (
                  <RenderCards data={allPosts} title="No Posts Yet" />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
