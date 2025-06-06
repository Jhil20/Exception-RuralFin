import { io } from "socket.io-client";

let socket = null;

export const createSocket = (userId) => {
  socket = io("http://localhost:5000", {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    // console.log("Socket connected:", socket.id);
    socket.emit("join", userId);
  });

  return socket;
};

export const getSocket = (userId) => {
  if (!socket) {
    socket = createSocket(userId);
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    // console.log("Socket disconnected:", socket.id);
    socket.disconnect();
    socket = null;
  }
};
