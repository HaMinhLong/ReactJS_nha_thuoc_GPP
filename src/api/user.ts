import { apiWrapper } from "../store/apiWrapper";

const injectedRtkApi = apiWrapper.injectEndpoints({
  endpoints: (build) => ({
    getListUser: build.query<GetListUserApiResponse, GetListUserApiArg>({
      query: (queryArg) => ({
        url: "/user",
        params: queryArg.params,
      }),
      providesTags: ["user"],
    }),
  }),
});

export type GetListUserApiResponse = any;
export type GetListUserApiArg = any;

export type TypeUser = {
  id?: number;
  name?: string;
};

export { injectedRtkApi as UserApi };
export const { useGetListUserQuery, useLazyGetListUserQuery } = injectedRtkApi;
