import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSession = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("jwt")
  );
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      setToken(token);
    }
  }, []);

  function logout() {
    localStorage.removeItem("jwt");
    window.location.reload();
  }

  return { token, logout };
};
