import { useState } from "react";
import { FiCpu, FiUser, FiCopy, FiCheck } from "react-icons/fi";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
    role: "user" | "model";
    content: string;
}

const CodeBlock = ({ language, children }: { language: string, children: React.ReactNode }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(String(children));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative my-4 rounded-lg overflow-hidden border border-border bg-surfaceElevated">
            <div className="flex items-center justify-between px-4 py-1.5 bg-surface/50 border-b border-border">
                <span className="text-xs text-textSecondary font-mono">{language}</span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-textSecondary hover:text-textPrimary transition"
                    title="Copy Code"
                >
                    {copied ? <FiCheck size={14} className="text-green-400" /> : <FiCopy size={14} />}
                    <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
            </div>
            <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-textPrimary">
                {children}
            </div>
        </div>
    );
};

const ChatMessage = ({ role, content }: ChatMessageProps) => {
    const isAi = role === "model";

    return (
        <div className={`flex gap-4 ${isAi ? "bg-card border border-border shadow-sm" : "bg-transparent"} p-6 rounded-xl`}>
            {/* Avatar */}
            <div className={`
                flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                ${isAi ? "bg-primary/20 text-primary" : "bg-surfaceElevated text-textSecondary"}
            `}>
                {isAi ? <FiCpu size={18} /> : <FiUser size={18} />}
            </div>

            {/* Content */}
            <div className="flex-1 prose prose-invert prose-sm max-w-none">
                {isAi ? (
                    <ReactMarkdown
                        components={{
                            h1: ({ node, ...props }) => <h1 className="text-xl font-bold text-primary mt-4 mb-2" {...props} />,
                            h2: ({ node, ...props }) => <h2 className="text-lg font-semibold text-textPrimary mt-3 mb-2" {...props} />,
                            h3: ({ node, ...props }) => <h3 className="text-md font-medium text-textPrimary mt-2 mb-1" {...props} />,
                            p: ({ node, ...props }) => <p className="mb-2 leading-relaxed text-textSecondary" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc list-outside ml-4 mb-2 space-y-1 text-textSecondary" {...props} />,
                            ol: ({ node, ...props }) => <ol className="list-decimal list-outside ml-4 mb-2 space-y-1 text-textSecondary" {...props} />,
                            li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                            code: ({ node, className, children, ...props }) => {
                                const match = /language-(\w+)/.exec(className || "");
                                return !className ? (
                                    <code className="bg-surfaceElevated text-orange-400 px-1 py-0.5 rounded text-sm font-mono" {...props}>
                                        {children}
                                    </code>
                                ) : (
                                    <CodeBlock language={match?.[1] || "code"}>{children}</CodeBlock>
                                );
                            },
                            blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-primary/50 pl-4 py-1 my-2 bg-primary/5 text-textMuted italic rounded-r-lg" {...props} />,
                            a: ({ node, ...props }) => <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                            table: ({ node, ...props }) => <div className="overflow-x-auto my-4"><table className="w-full text-left border-collapse border border-border" {...props} /></div>,
                            th: ({ node, ...props }) => <th className="bg-surface/50 p-2 border border-border font-semibold text-textPrimary" {...props} />,
                            td: ({ node, ...props }) => <td className="p-2 border border-border text-textSecondary" {...props} />,
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                ) : (
                    <p className="whitespace-pre-wrap text-textPrimary">{content}</p>
                )}
            </div>
        </div>
    );
};

export default ChatMessage;
