import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(
    () => localStorage.getItem("accessToken") !== null
  );
  const [isLoading, setIsLoading] = useState(false);

  const value = {
    isLogin,
    setIsLogin,
    isLoading,
    setIsLoading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
