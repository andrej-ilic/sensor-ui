import { useContext } from "react";

import { UserContext } from "../context/user";

const useUser = () => {
  const user = useContext(UserContext);
  return { user, isAuthenticated: !!user };
};

export default useUser;
