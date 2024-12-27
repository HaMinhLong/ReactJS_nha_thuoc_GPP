import { apiWrapper } from "@/store/apiWrapper";
import { ErrorResponse } from "@/type/global";
import { TypeUser } from "./user";

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
      providesTags: ["user-group"],
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
      TypeUserGroup
    >({
      query: (data) => ({
        url: "/user-group",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["user-group"],
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
      invalidatesTags: ["user-group"],
    }),
    deleteUserGroup: build.mutation<
      DeleteUserGroupApiResponse | ErrorResponse,
      DeleteUserGroupApiArg
    >({
      query: (queryArg) => ({
        url: `/user-group/${queryArg?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user-group"],
    }),
  }),
});

export type PutUserGroupApiArg = {
  id: number;
  body: TypeUserGroup;
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
  message?: string;
  statusCode?: number;
  data?: TypeUserGroup[];
  pagination?: PaginationType;
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
  users?: TypeUser[];
};

export type GetListUserGroupApiArg = {
  keyword?: string;
  page?: number;
  limit?: number;
  selectFields?: string[];
};

export type PostUserGroupApiResponse = {
  message: string;
  statusCode: number;
  data: TypeUserGroup;
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
