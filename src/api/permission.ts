import { message } from "antd";
import { apiWrapper } from "@/store/apiWrapper";
import { ErrorResponse } from "@/type/global";
import { TypeUserGroup } from "./userGroup";

const injectedRtkApi = apiWrapper.injectEndpoints({
  endpoints: (build) => ({
    getDetailPermission: build.query<
      GetDetailPermissionApiResponse | ErrorResponse,
      GetDetailPermissionApiArg
    >({
      query: (queryArg) => ({
        url: `/user-group-permissions/user-group/${queryArg?.id}`,
        params: queryArg,
      }),
      providesTags: ["permission"],
    }),
    putPermission: build.mutation<
      PutPermissionApiResponse | ErrorResponse,
      PutPermissionApiArg
    >({
      query: (queryArg) => ({
        url: `/user-group-permissions`,
        method: "PUT",
        body: queryArg,
      }),
      invalidatesTags: ["permission"],
    }),
  }),
});

export type PutPermissionApiResponse = {
  data: {
    data: {
      message: string;
    };
    message: string;
    statusCode: number;
  };
};
export type PutPermissionApiArg = PermissionType[];

export type PermissionType = {
  id?: number;
  getList: boolean;
  getDetail: boolean;
  create: boolean;
  update: boolean;
  remove: boolean;
  permission?: TypeUserGroup;
};
export type GetDetailPermissionApiResponse = {
  data: PermissionType[];
  message: string;
  statusCode: number;
};
export type GetDetailPermissionApiArg = {
  id: number | string;
};

export { injectedRtkApi as PermissionApi };
export const {
  useGetDetailPermissionQuery,
  useLazyGetDetailPermissionQuery,
  usePutPermissionMutation,
} = injectedRtkApi;
