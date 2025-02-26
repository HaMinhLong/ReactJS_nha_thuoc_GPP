import { apiWrapper } from "@/store/apiWrapper";
import { ErrorResponse } from "@/type/global";
import { PaginationType } from "./userGroup";

const injectedRtkApi = apiWrapper.injectEndpoints({
  endpoints: (build) => ({
    getListProductType: build.query<
      GetListProductTypeApiResponse | ErrorResponse,
      GetListProductTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/product-type`,
        params: queryArg,
      }),
      providesTags: ["product-type"],
    }),
    getDetailProductType: build.query<
      GetDetailProductTypeApiResponse | ErrorResponse,
      GetDetailProductTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/product-type/${queryArg?.id}`,
        params: queryArg,
      }),
    }),
    postProductType: build.mutation<
      PutProductTypeApiResponse | ErrorResponse,
      PutProductTypeApiArg
    >({
      query: (data) => ({
        url: `/product-type`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-type"],
    }),
    putProductType: build.mutation<
      PutProductTypeApiResponse | ErrorResponse,
      PutProductTypeApiArg
    >({
      query: (data) => ({
        url: `/product-type/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["product-type"],
    }),
    deleteProductType: build.mutation<
      DeleteProductTypeApiResponse | ErrorResponse,
      DeleteProductTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/product-type/${queryArg?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product-type"],
    }),
  }),
});

export type DeleteProductTypeApiResponse = {
  data: {
    message: string;
    statusCode: number;
  };
};
export type DeleteProductTypeApiArg = {
  id: number;
};

export type GetDetailProductTypeApiArg = {
  id: number;
};
export type GetDetailProductTypeApiResponse = {
  data: ProductType;
  message: string;
  statusCode: number;
};

export type PutProductTypeApiResponse = {
  data: {
    data: {
      message: string;
    };
    message: string;
    statusCode: number;
  };
};
export type PutProductTypeApiArg = ProductType;

export type ProductType = {
  id?: number;
  name?: string;
  isMedicine?: number;
  status?: number;
  createdAt?: string;
  updatedAt?: string;
};
export type GetListProductTypeApiResponse = {
  data: ProductType[];
  message: string;
  statusCode: number;
  pagination?: PaginationType;
};
export type GetListProductTypeApiArg = {
  keyword?: string;
  page?: number;
  limit?: number;
};

export { injectedRtkApi as ProductTypeApi };
export const {
  useGetListProductTypeQuery,
  useLazyGetListProductTypeQuery,
  useGetDetailProductTypeQuery,
  useLazyGetDetailProductTypeQuery,
  usePostProductTypeMutation,
  usePutProductTypeMutation,
  useDeleteProductTypeMutation,
} = injectedRtkApi;
