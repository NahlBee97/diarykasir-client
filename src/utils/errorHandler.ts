import axios from "axios";
import toast from "react-hot-toast";

export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const serverMessage = error.response?.data?.message;

    toast.error(serverMessage);
    console.error(error);

    return serverMessage;
  }

  if (error instanceof Error) {
    toast.error(error.message);
    console.error(error);
    return error.message;
  }
};
