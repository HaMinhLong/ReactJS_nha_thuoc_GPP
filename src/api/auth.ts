import { apiWrapper } from "@/store/apiWrapper";
import { TypeUser } from "./user";

const injectedRtkApi = apiWrapper.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<LoginApiResponse, GetMeApiArg>({
      query: () => ({
        url: "/auth",
        method: "GET",
      }),
    }),
    postLogin: build.mutation<LoginApiResponse, LoginApiArg>({
      query: (queryArg) => ({
        url: "/auth/login",
        method: "POST",
        body: queryArg,
      }),
    }),
  }),
});

export type GetMeApiResponse = {
  data: { permission?: string[]; user?: TypeUser };
};
export type GetMeApiArg = void;

export type LoginApiResponse = {
  data: { accessToken?: string | null; permission?: string[]; user?: TypeUser };
};
export type LoginApiArg = {
  username: string;
  password: string;
};

export { injectedRtkApi as AuthApi };
export const { useGetMeQuery, useLazyGetMeQuery, usePostLoginMutation } =
  injectedRtkApi;
