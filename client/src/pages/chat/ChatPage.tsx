import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiSend, FiMenu } from "react-icons/fi";
import ChatSidebar from "../../components/chat/ChatSidebar";
import ChatMessage from "../../components/chat/ChatMessage";
import { createChat, getChatHistory, getChats, sendMessage, deleteChat } from "../../services/ai.service";
import { useAnalytics } from "../../hooks/useAnalytics";

// Type for messages
type Message = {
    role: "user" | "model";
    content: string;
};

const ChatPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: analyticsData } = useAnalytics(); // Context for AI

    const [chats, setChats] = useState<any[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial Load: Fetch Sidebar List
    useEffect(() => {
        loadChats();
    }, []);

    // Load Chat History when ID changes
    useEffect(() => {
        if (id) {
            loadHistory(id);
        } else {
            setMessages([]); // New Chat
        }
    }, [id]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const loadChats = async () => {
        try {
            const list = await getChats();
            setChats(list);
        } catch (error) {
            console.error("Failed to load chats", error);
        }
    };

    const loadHistory = async (chatId: string) => {
        setLoading(true);
        try {
            const chat = await getChatHistory(chatId);
            setMessages(chat.messages);
        } catch (error) {
            console.error("Failed to load history", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || loading) return;

        const text = input;
        setInput("");

        // Optimistic update
        setMessages(prev => [...prev, { role: "user", content: text }]);
        setLoading(true);

        try {
            let responseChat;
            if (id) {
                // Send to existing chat
                // We don't send context every time to save tokens, usually only needed for start?
                // But user wants "context too". Let's send basic stats if relevant.
                responseChat = await sendMessage(id, text, analyticsData);
            } else {
                // Create new chat
                responseChat = await createChat(text, analyticsData);
                // Refresh list to show new chat title
                loadChats();
                navigate(`/dashboard/ai/${responseChat._id}`);
            }

            // Backend returns full chat object with updated messages
            setMessages(responseChat.messages);

        } catch (error) {
            console.error("Failed to send message", error);
            setMessages(prev => [...prev, { role: "model", content: "Error: Could not get response. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    const handleNewChat = () => {
        navigate("/dashboard/ai");
        setMessages([]);
    };

    // Removed duplicate import

    // ... existing code ...

    const handleDeleteChat = async (chatId: string) => {
        try {
            await deleteChat(chatId);
            setChats(prev => prev.filter(c => c._id !== chatId));
            if (id === chatId) {
                navigate("/dashboard/ai");
                setMessages([]);
            }
        } catch (error) {
            console.error("Failed to delete chat", error);
        }
    };

    return (
        <div className="flex h-screen -m-8 rounded-none overflow-hidden bg-background">
            {/* Sidebar (Desktop) */}
            <div className={`
                ${sidebarOpen ? "w-64" : "w-0"} 
                transition-all duration-300 border-r border-border
                hidden md:block
            `}>
                <ChatSidebar
                    chats={chats}
                    activeChatId={id}
                    onNewChat={handleNewChat}
                    onDeleteChat={handleDeleteChat}
                />
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col h-full relative">

                {/* Mobile/Toggle Header */}
                <div className="p-4 border-b border-border text-textPrimary flex items-center gap-4 bg-surface/50 backdrop-blur z-10">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-surfaceElevated rounded-lg text-textSecondary"
                    >
                        <FiMenu />
                    </button>
                    <span className="font-semibold">AI Assistant</span>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-background scroll-smooth">
                    {messages.length === 0 && !loading && (
                        <div className="flex flex-col items-center justify-center h-full text-textMuted space-y-4">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                                <FiSend size={24} />
                            </div>
                            <h3 className="text-lg font-medium text-textPrimary">How can I help you today?</h3>
                            <p className="max-w-md text-center">Ask me anything about your productivity, goals, or daily activities.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mt-4 w-full max-w-lg px-4">
                                <button onClick={() => { setInput("Analyze my productivity today"); handleSend(); }} className="p-3 border border-border rounded-xl hover:bg-surface hover:border-primary/50 transition text-left">
                                    📊 Analyze my productivity
                                </button>
                                <button onClick={() => { setInput("Suggest 3 goals for tomorrow"); handleSend(); }} className="p-3 border border-border rounded-xl hover:bg-surface hover:border-primary/50 transition text-left">
                                    🎯 Suggest goals for tomorrow
                                </button>
                            </div>
                        </div>
                    )}

                    {messages.map((msg, idx) => (
                        <div key={idx} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <ChatMessage role={msg.role} content={msg.content} />
                        </div>
                    ))}

                    {loading && (
                        <div className="flex gap-4 p-6 rounded-xl bg-card animate-pulse border border-border max-w-3xl">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-surface rounded w-3/4"></div>
                                <div className="h-4 bg-surface rounded w-1/2"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 md:p-6 border-t border-border bg-surface/30 backdrop-blur-md sticky bottom-0 z-20">
                    <form onSubmit={handleSend} className="relative max-w-4xl mx-auto">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="
                                w-full bg-card text-textPrimary
                                rounded-2xl px-5 py-4 pr-12
                                focus:outline-none focus:ring-2 focus:ring-primary/50
                                border border-border
                                shadow-lg shadow-black/5
                                placeholder-textMuted
                                transition-all
                            "
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || loading}
                            className="
                                absolute right-3 top-1/2 -translate-y-1/2
                                p-2 rounded-xl
                                bg-primary text-white
                                hover:bg-primaryHover
                                disabled:opacity-50 disabled:bg-transparent disabled:text-textMuted
                                transition-all shadow-md
                                disabled:shadow-none
                            "
                        >
                            <FiSend size={18} />
                        </button>
                    </form>
                    <div className="text-center mt-2">
                        <p className="text-[10px] text-textMuted">AI can make mistakes. Please verify important information.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
