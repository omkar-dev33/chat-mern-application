import { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import ChatHeader from '../component/ChatHeader.jsx';
import { formatMessageTime } from '../lib/utils';
import MessageInput from '../component/MessageInput';
import MessageSkeleton from '../component/skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore'
const ChatContainer = () => {

  const { messages, getMessages, isMessageLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);


  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();

  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  if (isMessageLoading) {
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {
          messages.map((message) => {
            <div
              key={message._id}
              className={`chat `}
              ref={messageEndRef}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img src={message.senderId == authUser._id ?
                    authUser.profilePic || "/avatar.png"
                    : selectedUser.profilePic || "/avatar.png"
                  } alt="profile pic"
                  />
                </div>
              </div>

              <div className="chat-header">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              <div className="chat-bubble flex flex-col">
                {message.image && (
                  <img src="" alt="Attachment" className="sm:max-w-[200px] rounded-md mb-2" />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          })
        }
      </div>

      <MessageInput />
    </div>
  );
}
export default ChatContainer;


