import { useContext } from "react";
import { UserContext } from "../context/useContext"; // adjust path as needed

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
