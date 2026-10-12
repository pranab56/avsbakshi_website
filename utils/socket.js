import { io } from "socket.io-client";
import { baseURL } from "./BaseURL";
import { getToken } from "./storage";

let socket = null;

export const getSocket = () => {
  if (typeof window === "undefined") return null;

  const token =
    getToken() ||
    (typeof localStorage !== "undefined"
      ? localStorage.getItem("salon-token") ||
        localStorage.getItem("realState-token") ||
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken") ||
        ""
      : "");

  if (!socket) {
    socket = io(baseURL, {
      auth: {
        token: token,
        authorization: token ? `Bearer ${token}` : "",
      },
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
      extraHeaders: {
        authorization: token ? `Bearer ${token}` : "",
      },
      query: {
        token: token,
      },
      transports: ["websocket", "polling"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });
  } else if (!socket.connected && !socket.connecting) {
    if (token) {
      socket.auth = {
        token: token,
        authorization: `Bearer ${token}`,
      };
    }
    socket.connect();
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

