import axiosInstance from "~/libs/api";

const pathUrl = "/users";
const userId = process.env.NEXT_PUBLIC_USER_ID;

/**
 * @param {ListUserRequestOptions} requestParams
 * @returns {ListUserRequestParams}
 */
export default function generateRequestParamsUser(requestParams) {
    /**@type {ListUserRequestParams} params */
    let params = {};

    params.name = requestParams.search || "";
    params.per_page = requestParams.per_page;
    params.page = requestParams.page;

    return params;
}

/**@param {ListUserRequestOptions} requestParams */
export const userGetRequest = async (requestParams) => {
    let params = generateRequestParamsUser(requestParams);
    const res = await axiosInstance.get(pathUrl, {
        params,
    });
    return res;
};

export const userGetDetailRequest = async () => {
    const res = await axiosInstance.get(`${pathUrl}/${userId}`);
    return res.data;
};

export const userDeleteRequest = async (id) => {
    const res = await axiosInstance.delete(`${pathUrl}/${id}`);
    return res.data;
};

/**@param {UserFormData} formData */
export const userCreateRequest = async (formData) => {
    const res = await axiosInstance.post(pathUrl, formData);
    return res.data;
};

/**@param {UserFormData} formData */
export const userUpdateRequest = async (id, formData) => {
    const res = await axiosInstance.put(`${pathUrl}/${id}`, formData);
    return res.data;
};
