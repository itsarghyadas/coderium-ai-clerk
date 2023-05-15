import React, { useEffect, useRef, useState } from "react";
import SideMenu from "./components/SideMenu";
import ChatLog from "./components/ChatLog/ChatLog";
import ChatAdvancedSetting from "./components/ChatSettings/ChatAdvancedSetting";
import "./CSS/chatapp.css";
import { useUser } from "@clerk/clerk-react";
const baseUrl = import.meta.env.VITE_BASE_URL;

function ChatApp() {
  const chatInputRef = useRef(null);
  const chatLogRef = useRef(null);
  const [tokenUsage, setTokenUsage] = useState(0);
  const [totalToken, setTotalToken] = useState(0);
  const [userId, setUserId] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const { user } = useUser();
  const { username } = user;
  const generateImageurl = `${baseUrl}/searchimage`;
  const chatUrl = `${baseUrl}/chat`;
  const googleSearchUrl = `${baseUrl}/googlesearch`;
  const tokenUrl = `${baseUrl}/totalTokens?username=${username}`;

  const handleRoleSelected = (role) => {
    setSelectedRole(role);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    const inputValue = chatInputRef.current.value.trim();
    if (!inputValue) {
      setLoading(false);
      return;
    }

    if (totalToken < 2000) {
      alert("You have run out of tokens. Please Buy More.");
      return;
    }

    const userMessage = { user: "user", message: inputValue };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    chatInputRef.current.value = "";

    const age = localStorage.getItem("age");
    const region = localStorage.getItem("region");

    if (inputValue.startsWith("create an image")) {
      try {
        const response = await fetch(generateImageurl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: inputValue,
          }),
        });

        if (response.ok) {
          const { image } = await response.json();
          const base64Image = `data:image/png;base64,${image}`;
          setImageUrl(base64Image);

          const botMessages = { user: "bot", message: base64Image };
          setMessages((prevMessages) => [...prevMessages, botMessages]);
          setLoading(false);

          setImageUrl(base64Image);
        } else {
          const errorResponse = await response.json();
          const errorMessage = errorResponse.message;
          console.error("API Error:", errorMessage);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      let googleEnable = localStorage.getItem("google-enable");
      let fetchURL = "";
      if (googleEnable === "true") {
        fetchURL = googleSearchUrl;
      } else {
        fetchURL = chatUrl;
      }
      try {
        const response = await fetch(fetchURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: inputValue,
            userId: userId,
            age: age,
            region: region,
          }),
        });

        const { message: { content } = {}, tokenUsage } = await response.json();

        const botMessages = { user: "bot", message: content };
        setMessages((prevMessages) => [...prevMessages, botMessages]);

        setTokenUsage((prevTokenUsage) => prevTokenUsage + tokenUsage);

        const newTotalToken = totalToken - tokenUsage;
        updateTokenCount(newTotalToken);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    setLoading(false);
  };

  const updateTokenCount = async (newTotalToken) => {
    try {
      await fetch(tokenUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ totalToken: newTotalToken }),
      });

      const response = await fetch(tokenUrl);
      const { totalToken } = await response.json();
      setTotalToken(totalToken);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

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

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTo({
        top: chatLogRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="chatapp flex w-full font-cabinet">
      <div>
        <SideMenu
          clearChat={clearChat}
          totalToken={totalToken}
          handleRoleSelected={handleRoleSelected}
          messages={messages}
        />
      </div>
      <div className="chat-interface-container relative w-full rounded-md p-8">
        <div className="chat-interface flex border-2 border-transparent xl:rounded-xl">
          <ChatLog
            chatInputRef={chatInputRef}
            chatLogRef={chatLogRef}
            handleSubmit={handleSubmit}
            loading={loading}
            messages={messages}
            imageUrl={imageUrl}
            clearChat={clearChat}
            totalToken={totalToken}
            handleRoleSelected={handleRoleSelected}
          />
          <ChatAdvancedSetting />
        </div>
      </div>
    </div>
  );
}

export default ChatApp;
