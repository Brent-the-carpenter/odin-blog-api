import { useCallback, useState } from "react";
import logout from "../fetch/POSTLogout";
import useUserContext from "../../context/UserContext/userHook";
const useLogout = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const { token, setUser } = useUserContext();
  const logoutUser = useCallback(async () => {
    try {
      const response = await logout(token);
      if (response) {
        setUser({ token: null, userName: null });
        localStorage.removeItem("user");
        setSuccess(response.message);
      }
    } catch (error) {
      console.error("Error:", error.status);
      setError(error.message);
    }
  }, [token, setUser]);

  return { success, error, logoutUser, setSuccess };
};

export default useLogout;
