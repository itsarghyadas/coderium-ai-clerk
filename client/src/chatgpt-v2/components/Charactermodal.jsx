import React, { useState, useEffect, useRef } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GrTrigger } from "react-icons/gr";

function CharacterModal({ closeModal }) {
  const characterOptions = [
    {
      name: "Doctor",
      description:
        "A medical professional who treats patients and provides healthcare services.",
    },
    {
      name: "Teacher",
      description:
        "An educator who imparts knowledge and instructs students in various subjects.",
    },
    {
      name: "Professor",
      description:
        "An expert in a particular academic discipline who teaches and conducts research at a university.",
    },
    {
      name: "Motivational Speaker",
      description:
        "A person who delivers speeches or presentations to inspire and motivate others.",
    },
    {
      name: "Developer",
      description:
        "A professional who designs and creates software applications or systems.",
    },
    {
      name: "Singer",
      description:
        "An artist who uses their voice to perform songs and entertain an audience.",
    },
    {
      name: "Lawyer",
      description:
        "A legal professional who advises and represents clients in legal matters.",
    },
  ];

  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const innerModalRef = useRef(null);

  useEffect(() => {
    setIsOpen(true);

    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        innerModalRef.current &&
        !innerModalRef.current.contains(event.target)
      ) {
        handleCloseModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  function handleCharacterSelection(character) {
    setSelectedCharacter(character);
    console.log("Selected character:", character);
  }

  function handleSearchQueryChange(event) {
    setSearchQuery(event.target.value);
  }

  function handleCloseModal() {
    setIsOpen(false);
    setTimeout(closeModal, 300);
  }

  const filteredCharacters = characterOptions.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`fixed inset-0 z-[3000] select-none ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-sm">
        <div
          ref={modalRef}
          className={`animate-gradient mx-auto w-full max-w-[600px] transform transition-all duration-300 ${
            isOpen ? "scale-100" : "scale-0"
          }`}
        >
          <div
            ref={innerModalRef}
            className="rounded-lg border bg-white p-8 shadow-sm drop-shadow-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-clash text-xl font-semibold">
                Character Settings{" "}
                <span className="rounded-full border border-slate-500/50 bg-amber-300 px-1.5 py-0.5 font-clash text-sm font-bold text-gray-800 md:ml-2">
                  {characterOptions.length}
                </span>
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handleCloseModal}
              >
                <AiOutlineCloseCircle className="rounded-full bg-gray-800 text-2xl text-white focus:outline-none active:scale-110" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search characters..."
                  value={searchQuery}
                  onChange={handleSearchQueryChange}
                  className="w-full rounded-full border-2 border-gray-300 px-3 py-1.5 placeholder:text-sm"
                />
              </div>
              <div className="character-scroll -m-2 grid max-h-[450px] gap-3 overflow-y-auto p-2 md:max-h-[400px] md:grid-cols-2">
                {searchQuery === "" ? (
                  characterOptions.map((character) => (
                    <div
                      key={character.name}
                      className={`cursor-pointer rounded-lg px-3.5 py-2 ${
                        selectedCharacter === character.name
                          ? "border border-blue-500/50 bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300"
                          : "character-not-selected bg-white hover:bg-gray-50"
                      }`}
                      onClick={() => handleCharacterSelection(character.name)}
                    >
                      <h3 className="font-clash text-lg font-[580] text-slate-800">
                        {character.name}
                        {selectedCharacter === character.name && (
                          <GrTrigger className="ml-2 inline-block" />
                        )}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500">
                        {character.description}
                      </p>
                    </div>
                  ))
                ) : filteredCharacters.length > 0 ? (
                  filteredCharacters.map((character) => (
                    <div
                      key={character.name}
                      className={`cursor-pointer rounded-lg px-4 py-2 ${
                        selectedCharacter === character.name
                          ? "border border-blue-500/50 bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300"
                          : "character-not-selected bg-white hover:bg-gray-50"
                      }`}
                      onClick={() => handleCharacterSelection(character.name)}
                    >
                      <h3 className="text-lg font-bold">
                        {character.name}
                        {selectedCharacter === character.name && (
                          <GrTrigger className="ml-1 inline-block" />
                        )}
                      </h3>
                      <p className="text-xs font-semibold text-slate-600">
                        {character.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="max-w-600px text-gray-500">
                    <p className="rounded-lg border-2 border-dashed border-red-500/50 px-3 py-2 font-space font-semibold text-slate-700">
                      No Character Found.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterModal;
