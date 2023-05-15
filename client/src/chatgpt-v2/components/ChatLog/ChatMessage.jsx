import { GiBrain } from "react-icons/gi";
import { RxAvatar } from "react-icons/rx";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";
import { FaDownload } from "react-icons/fa";

function ChatMessage({ message, imageUrl }) {
  const isBotMessage = message.user === "bot";
  const components = {
    h1: ({ children, ...props }) => (
      <h1 className="text-2xl font-bold" {...props} />
    ),
    code: CodeBlock,
  };

  return (
    <div
      className={`chat-message-${message.user} chat-message m-auto w-full border-b border-l border-r border-dashed border-slate-500/10 px-1 py-4 lg:px-2 xl:max-w-3xl`}
    >
      <div>
        <div className="chat-message__avatar flex items-center justify-between space-x-2 px-5">
          <h1 className="font-bold">
            {message.user === "bot" ? (
              <span className="text-blue-500">Coderium</span>
            ) : (
              <span className="text-orange-500">User</span>
            )}
          </h1>
          <div
            className={`chat-message__avatar-image flex h-6 w-6 items-center justify-center rounded-full text-xl font-bold text-white ${
              message.user === "bot"
                ? "bg-gradient-to-br from-orange-300 to-red-600"
                : "bg-gradient-to-br from-sky-300 to-blue-600"
            }`}
          >
            {message.user === "bot" ? <GiBrain /> : <RxAvatar />}
          </div>
        </div>
      </div>
      <div className="chat-message-center font-karla flex flex-col justify-start py-2 px-5 text-[0.95rem] font-semibold leading-6 tracking-[-0.01em] md:text-[0.97rem] md:leading-[1.6rem] md:tracking-[-0.02em]">
        <div className="message__text whitespace-pre-wrap break-words">
          {isBotMessage && imageUrl !== undefined && imageUrl !== "" ? (
            <div className="flex flex-col gap-1.5">
              {message.message.startsWith("data:image/") ? (
                <div className="flex flex-col gap-y-2">
                  <img
                    className="h-[300px] w-[300px] rounded-md object-cover shadow-sm drop-shadow-sm"
                    src={message.message}
                    alt="ChatMessage image"
                  />
                  <button className="flex w-[300px] items-center justify-center space-x-2 rounded bg-slate-200 py-1.5 font-phudu text-lg font-semibold text-slate-700 shadow drop-shadow ">
                    <a href={message.message} download>
                      Download
                    </a>
                    <span>
                      <FaDownload />
                    </span>
                  </button>
                </div>
              ) : (
                <ReactMarkdown
                  children={message.message}
                  components={components}
                />
              )}
            </div>
          ) : (
            <>
              {isBotMessage ? (
                <ReactMarkdown
                  children={message.message}
                  components={components}
                />
              ) : (
                message.message
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
