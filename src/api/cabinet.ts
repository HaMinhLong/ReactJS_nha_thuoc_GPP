import { apiWrapper } from "@/store/apiWrapper";
import { ErrorResponse } from "@/type/global";
import { PaginationType } from "./userGroup";

const injectedRtkApi = apiWrapper.injectEndpoints({
  endpoints: (build) => ({
    getListCabinet: build.query<
      GetListCabinetApiResponse | ErrorResponse,
      GetListCabinetApiArg
    >({
      query: (queryArg) => ({
        url: `/cabinet`,
        params: queryArg,
      }),
      providesTags: ["cabinet"],
    }),
    getDetailCabinet: build.query<
      GetDetailCabinetApiResponse | ErrorResponse,
      GetDetailCabinetApiArg
    >({
      query: (queryArg) => ({
        url: `/cabinet/${queryArg?.id}`,
        params: queryArg,
      }),
    }),
    postCabinet: build.mutation<
      PutCabinetApiResponse | ErrorResponse,
      PutCabinetApiArg
    >({
      query: (data) => ({
        url: `/cabinet`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cabinet"],
    }),
    putCabinet: build.mutation<
      PutCabinetApiResponse | ErrorResponse,
      PutCabinetApiArg
    >({
      query: (data) => ({
        url: `/cabinet/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["cabinet"],
    }),
    deleteCabinet: build.mutation<
      DeleteCabinetApiResponse | ErrorResponse,
      DeleteCabinetApiArg
    >({
      query: (queryArg) => ({
        url: `/cabinet/${queryArg?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cabinet"],
    }),
  }),
});

export type DeleteCabinetApiResponse = {
  data: {
    message: string;
    statusCode: number;
  };
};
export type DeleteCabinetApiArg = {
  id: number;
};

export type GetDetailCabinetApiArg = {
  id: number;
};
export type GetDetailCabinetApiResponse = {
  data: CabinetType;
  message: string;
  statusCode: number;
};

export type PutCabinetApiResponse = {
  data: {
    data: {
      message: string;
    };
    message: string;
    statusCode: number;
  };
};
export type PutCabinetApiArg = CabinetType;

export type CabinetType = {
  id?: number;
  name?: string;
  code?: string;
};
export type GetListCabinetApiResponse = {
  data: CabinetType[];
  message: string;
  statusCode: number;
  pagination?: PaginationType;
};
export type GetListCabinetApiArg = {
  keyword?: string;
  page?: number;
  limit?: number;
};

export { injectedRtkApi as CabinetApi };
export const {
  useGetListCabinetQuery,
  useLazyGetListCabinetQuery,
  useGetDetailCabinetQuery,
  useLazyGetDetailCabinetQuery,
  usePostCabinetMutation,
  usePutCabinetMutation,
  useDeleteCabinetMutation,
} = injectedRtkApi;
