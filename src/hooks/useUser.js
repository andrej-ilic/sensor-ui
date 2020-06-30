import { useContext } from "react";

import { UserContext } from "../context/user";

const useUser = () => {
  const user = useContext(UserContext);
  return {
    user,
    isAuthenticated: !!user,
    isVerified: user && user.emailVerified,
  };
};

export default useUser;
