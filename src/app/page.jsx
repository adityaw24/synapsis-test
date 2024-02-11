import Image from "next/image";
import { Toaster } from "react-hot-toast";
import { PostPage, UserPage } from "~/view/pages";
// import { useRemoteRefresh } from "next-remote-refresh/hook";
// import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

export default function Home() {
    // const router = useRouter();

    // useRemoteRefresh({
    //     shouldRefresh: (path) => path.includes(router.query.slug),
    // });

    return (
        <>
            <PostPage />
            <Toaster
                position="top-center"
                toastOptions={{
                    className:
                        "ring ring-base-300 !bg-base-100/40 !backdrop-blur !text-base-content",
                }}
            />
        </>
    );
}
