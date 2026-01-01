import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const ChatPage = () => {
  const { logout, isLoggingOut } = useAuthStore();

  return (
    <div className="z-10">
      Chat Page
      <button onClick={logout} disabled={isLoggingOut}>
        logout
      </button>
    </div>
  );
};

export default ChatPage;
