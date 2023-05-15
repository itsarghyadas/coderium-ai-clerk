import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { MdContentCopy } from "react-icons/md";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || "language-js");
  const codeClassName = `message__code ${match ? `language-${match[1]}` : ""}`;

  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return inline ? (
    <code className={codeClassName} {...props}>
      {children}
    </code>
  ) : (
    <div style={{ position: "relative" }}>
      <button
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          padding: "5px",
          border: "none",
          borderRadius: "3px",
          color: "#fff",
          cursor: "pointer",
        }}
        onClick={handleCopy}
      >
        {copied ? (
          <span className="font-karla text-xs text-slate-400">Copied</span>
        ) : (
          <MdContentCopy size={20} className="text-slate-400" />
        )}
      </button>
      <SyntaxHighlighter
        children={String(children).replace(/\n$/, "")}
        style={oneDark}
        language={match[1]}
        PreTag="div"
        className={codeClassName}
        {...props}
      />
    </div>
  );
};

export default CodeBlock;
