import Image from "next/image";
import mergeClass from "~/libs/mergeClass";

const ChatBubble = ({
    right = false,
    avatar = null,
    header = null,
    footer = null,
    time = null,
    text = null,
}) => {
    return (
        <div className={mergeClass("chat", right ? "chat-end" : "chat-start")}>
            {avatar && (
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <Image
                            alt="Tailwind CSS chat bubble component"
                            src={avatar}
                            height={30}
                            width={30}
                        />
                    </div>
                </div>
            )}
            {header && (
                <div className="chat-header">
                    {header}
                    {time && <time className="text-xs opacity-50">{time}</time>}
                </div>
            )}
            {text && <div className="chat-bubble w-[70%]">{text}</div>}
            {footer && <div className="opacity-50 chat-footer">{footer}</div>}
        </div>
    );
};

export default ChatBubble;
