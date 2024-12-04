import { AuthorizedContext } from "@/context/authorized";
import { useContext } from "react";

function useAuthorizedContext() {
  const context = useContext(AuthorizedContext);
  if (!context) {
    throw new Error(
      "useAuthorizedContext must be used within an AuthorizedContextProvider"
    );
  }
  return context;
}

export { useAuthorizedContext };