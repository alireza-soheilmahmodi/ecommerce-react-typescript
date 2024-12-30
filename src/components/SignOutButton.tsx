import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({
        type: "SUCCESS",
        message: "شما از حساب کاربری خود خارج شدید",
      });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ type: "ERROR", message: error.message });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <Button
      onClick={handleClick}
      className="text-gray-600 px-3 font-bold bg-white hover:bg-gray-100"
    >
      خروج از حساب کاربری
    </Button>
  );
};

export default SignOutButton;
