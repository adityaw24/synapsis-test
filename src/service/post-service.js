import axiosInstance from "~/libs/api";

const pathUrlPostsAll = "/posts";
const userId = process.env.NEXT_PUBLIC_USER_ID;
const pathUrl = `/users/${userId}/posts`;

/**
 * @param {ListPostRequestOptions} requestParams
 * @returns {ListPostRequestParams}
 */
export default function generateRequestParamsPosts(requestParams) {
    /**@type {ListPostRequestParams} params */
    let params = {};

    params.title = requestParams.search || "";
    params.per_page = requestParams.per_page;
    params.page = requestParams.page;

    return params;
}

// /**@param {ListPostRequestOptions} requestParams */
export const postGetRequest = async (requestParams) => {
    let params = generateRequestParamsPosts(requestParams);
    const res = await axiosInstance.get(pathUrlPostsAll, {
        params,
    });
    return res;
};

// /**@param {ListPostRequestOptions|{}} requestParams */
export const postGetDetailRequest = async (idPost, idUser, requestParams) => {
    let params = generateRequestParamsPosts(requestParams);
    const res = await axiosInstance.get(pathUrlPostsAll, {
        params: {
            ...params,
            id: idPost,
            user_id: idUser,
        },
    });
    return res;
};

/**@param {PostFormData} formData */
export const postCreateRequest = async (formData) => {
    const res = await axiosInstance.post(pathUrl, formData);
    return res.data;
};
