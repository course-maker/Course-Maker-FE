import { toast, ToastContent, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "success" | "error" | "warning" | "default";

const useToast = () => {
  const showToast = (message: ToastContent, type: ToastType = "default") => {
    const config: ToastOptions = {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: false,
      draggable: false,
      pauseOnHover: false,
      style: { marginTop: "8rem", width: "30rem", marginLeft: "auto", marginRight: "auto" },
    };

    switch (type) {
      case "success":
        return toast.success(message, config);
      case "error":
        return toast.error(message, config);
      case "warning":
        return toast.warning(message, config);
      default:
        return toast(message, config);
    }
  };

  return showToast;
};

export default useToast;
