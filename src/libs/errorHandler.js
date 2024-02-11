import toast from "react-hot-toast";

export default function errorHandler(err) {
    // if (import.meta.env.DEV) console.log(err);

    const msg =
        err?.response?.data?.message ||
        err?.toString() ||
        "Something went wrong :(";

    toast.error(msg, {
        duration: 5000,
    });
}
