import { useNavigate } from "react-router-dom";
import { FiMessageSquare, FiPlus, FiTrash2 } from "react-icons/fi";

type ChatItem = {
    _id: string;
    title: string;
    updatedAt: string;
};

interface ChatSidebarProps {
    chats: ChatItem[];
    activeChatId?: string;
    onNewChat: () => void;
    onDeleteChat: (id: string) => void;
}

const ChatSidebar = ({ chats, activeChatId, onNewChat, onDeleteChat }: ChatSidebarProps) => {
    const navigate = useNavigate();

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (confirm("Are you sure you want to delete this chat?")) {
            onDeleteChat(id);
        }
    };

    return (
        <div className="w-64 border-r border-border flex flex-col h-full bg-surface">
            {/* Header */}
            <div className="p-4 border-b border-border">
                <button
                    onClick={onNewChat}
                    className="
                        w-full flex items-center justify-center gap-2
                        bg-primary/10 text-primary
                        hover:bg-primary/20
                        py-2 rounded-lg font-medium
                        transition
                    "
                >
                    <FiPlus /> New Chat
                </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {chats.length === 0 && (
                    <div className="text-center text-textMuted text-sm mt-10">
                        No chats yet
                    </div>
                )}
                {chats.map((chat) => (
                    <div
                        key={chat._id}
                        onClick={() => navigate(`/dashboard/ai/${chat._id}`)}
                        className={`
                            group w-full text-left px-3 py-3 rounded-lg
                            flex items-center gap-3 cursor-pointer
                            transition truncate relative
                            ${activeChatId === chat._id
                                ? "bg-primary/10 text-primary"
                                : "text-textSecondary hover:bg-surfaceElevated hover:text-textPrimary"}
                        `}
                    >
                        <FiMessageSquare size={16} />
                        <span className="truncate text-sm flex-1">{chat.title}</span>

                        <button
                            onClick={(e) => handleDelete(e, chat._id)}
                            className="
                                opacity-0 group-hover:opacity-100
                                text-textMuted hover:text-red-400
                                transition p-1
                            "
                            title="Delete Chat"
                        >
                            <FiTrash2 size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatSidebar;
