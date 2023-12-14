const host = "http://localhost:3005";

//auth
export const regiserRoutes = `${host}/api/auth/register`;
export const loginRoutes = `${host}/api/auth/login`;
export const logOutRoutes = `${host}/api/auth/logout`;

//group
export const createGroupRoutes = `${host}/api/group/create`;
export const getGroupRoutes = `${host}/api/group/all-group`;
export const getGroupByIdRoutes = `${host}/api/group/group-by-id`;
