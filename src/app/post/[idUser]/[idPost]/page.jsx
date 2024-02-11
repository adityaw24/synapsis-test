import React from "react";
import { postGetRequest } from "~/service/post-service";
import { DetailPostPage } from "~/view/pages";

export async function generateStaticParams() {
    const posts = await postGetRequest({}).then((res) => res.data);

    return posts.map((post) => ({
        idUser: post.user_id.toString(),
        idPost: post.id.toString(),
    }));
}

const DetailPostCommentPage = ({ params }) => {
    const { idUser, idPost } = params;
    return <DetailPostPage userId={idUser} postId={idPost} />;
};

export default DetailPostCommentPage;
