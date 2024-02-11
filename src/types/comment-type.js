/**
 * type single user
 * @typedef {object} CommentPost
 * @property {number} id
 * @property {number} post_id
 * @property {string} name
 * @property {string} email
 * @property {string} body
 */

/**
 * type single user
 * @typedef {object} CommentPostFormData
 * @property {string} name
 * @property {string} email
 * @property {string} body
 */

/**
 * @typedef {object} 		ListCommentPostRequestParams
 *
 * @prop {number|string} 	page
 * @prop {number|string} 	per_page
 * @prop {number|string} 	id
 * @prop {number|string} 	post_id
 *
 * @prop {string} 			name
 * @prop {string} 			email
 */

/**
 * @typedef {object} 		ListCommentPostRequestOptions
 *
 * @prop {number|string} 	per_page
 * @prop {number|string} 	page
 *
 * @prop {string} 			[search]
 */
