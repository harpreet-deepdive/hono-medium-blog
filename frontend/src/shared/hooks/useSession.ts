import { useEffect, useState } from "react";

export const useSession = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("jwt")
  );

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
