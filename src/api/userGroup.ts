import { apiWrapper } from "../store/apiWrapper";
import { TypeUser } from "./user";
import { ErrorResponse } from "../type/global";

const injectedRtkApi = apiWrapper.injectEndpoints({
  endpoints: (build) => ({
    getListUserGroup: build.query<
      GetListUserGroupApiResponse | ErrorResponse,
      GetListUserGroupApiArg
    >({
      query: (queryArg) => ({
        url: "/user-group",
        params: queryArg,
      }),
    }),
    getDetailUserGroup: build.query<
      GetDetailUserGroupApiResponse | ErrorResponse,
      GetDetailUserGroupApiArg
    >({
      query: (queryArg) => ({
        url: `/user-group/${queryArg?.id}`,
        params: queryArg,
      }),
    }),
    postUserGroup: build.mutation<
      PostUserGroupApiResponse | ErrorResponse,
      PostUserGroupApiArg
    >({
      query: (data) => ({
        url: "/user-group",
        body: data,
        method: "POST",
      }),
    }),
    putUserGroup: build.mutation<
      PostUserGroupApiResponse | ErrorResponse,
      PutUserGroupApiArg
    >({
      query: (data) => ({
        url: `/user-group/${data.id}`,
        body: data.body,
        method: "PUT",
      }),
    }),
    deleteUserGroup: build.mutation<
      DeleteUserGroupApiResponse | ErrorResponse,
      DeleteUserGroupApiArg
    >({
      query: (queryArg) => ({
        url: `/user-group/${queryArg?.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export type PutUserGroupApiArg = {
  id: number;
  body: {
    name: string;
  };
};

export type GetDetailUserGroupApiArg = {
  id: number;
};
export type GetDetailUserGroupApiResponse = {
  data: TypeUserGroup;
  message: string;
  statusCode: number;
};

export type DeleteUserGroupApiResponse = {
  data: {
    message: string;
    statusCode: number;
  };
};
export type DeleteUserGroupApiArg = {
  id: number;
};

export type GetListUserGroupApiResponse = {
  message: string;
  statusCode: number;
  data: TypeUserGroup[];
  pagination: PaginationType;
};

export type PaginationType = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type TypeUserGroup = {
  id?: number;
  name?: string;
  users: TypeUser[];
};

export type GetListUserGroupApiArg = {
  keyword?: string;
  page?: number;
  limit?: number;
};

export type PostUserGroupApiResponse = {
  message: string;
  statusCode: number;
  data: TypeUserGroup;
};

export type PostUserGroupApiArg = {
  name: string;
};

export { injectedRtkApi as UserGroupGroupApi };
export const {
  useGetListUserGroupQuery,
  useLazyGetListUserGroupQuery,
  useGetDetailUserGroupQuery,
  useLazyGetDetailUserGroupQuery,
  usePostUserGroupMutation,
  usePutUserGroupMutation,
  useDeleteUserGroupMutation,
} = injectedRtkApi;
