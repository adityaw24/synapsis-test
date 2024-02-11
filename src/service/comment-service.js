import axiosInstance from "~/libs/api";

const pathUrl = "/comments";
const userId = process.env.NEXT_PUBLIC_USER_ID;

/**
 * @param {ListCommentPostRequestOptions} requestParams
 * @returns {ListCommentPostRequestParams}
 */
export default function generateRequestParamsPosts(requestParams) {
    /**@type {ListCommentPostRequestParams} params */
    let params = {};

    params.name = requestParams.search || "";
    params.per_page = requestParams.per_page;
    params.page = requestParams.page;

    return params;
}

// /**@param {ListCommentPostRequestOptions} requestParams */
export const commentGetRequest = async (requestParams) => {
    let params = generateRequestParamsPosts(requestParams);
    const res = await axiosInstance.get(pathUrl, {
        params,
    });
    return res;
};

// /**@param {ListPostRequestOptions} requestParams */
export const commentGetDetailRequest = async (
    idPost,
    idComment,
    requestParams
) => {
    let params = generateRequestParamsPosts(requestParams);
    const res = await axiosInstance.get(pathUrl, {
        params: {
            ...params,
            id: idComment,
            post_id: idPost,
        },
    });
    return res;
};

/**@param {CommentPostFormData} formData */
export const commentPostRequest = async (postId, formData) => {
    const res = await axiosInstance.post(`/posts/${postId}/comments`, formData);
    return res.data;
};
