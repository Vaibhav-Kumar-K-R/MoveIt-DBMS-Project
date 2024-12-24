import axiosInstance from "@/lib/axios";
import { LoginFormData } from "@/pages/login/Login";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLoginUserRequestMutation = () => {
  const loginUserRequestMutation = async (formData: LoginFormData) => {
    try {
      const response = await axiosInstance.post("/admin/sign-in", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const navigate = useNavigate();
  const {
    mutateAsync: loginUser,
    isLoading,
    data,
    reset,
  } = useMutation({
    mutationKey: "loginUserRequest",
    mutationFn: loginUserRequestMutation,
    onSuccess: () => {
      navigate("/", { replace: true });
      toast.success("Login successful!");
    },
    onError: (error: any) => {
      toast.error(error?.toString());
      reset();
    },
  });

  return {
    loginUser,
    isLoading,
    data,
  };
};
