import { useEffect, useState } from "react";

export default function useSocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<null | any>(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");
    newSocket.onopen = () => {
      console.log("Connection established");
    };
    newSocket.onmessage = (event) => {
      const parsedData = JSON.parse(event.data.toString());
      setMessage(parsedData.payload);
    };
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return { socket, message };
}
