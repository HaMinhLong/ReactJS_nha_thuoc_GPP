import { apiWrapper } from "@/store/apiWrapper";
import { TypeUser } from "./user";

const injectedRtkApi = apiWrapper.injectEndpoints({
  endpoints: (build) => ({
    postLogin: build.mutation<LoginApiResponse, LoginApiArg>({
      query: (queryArg) => ({
        url: "/auth/login",
        method: "POST",
        body: queryArg,
      }),
    }),
  }),
});

export type LoginApiResponse = {
  data: { accessToken?: string | null; permission?: string[]; user?: TypeUser };
};
export type LoginApiArg = {
  username: string;
  password: string;
};

export { injectedRtkApi as AuthApi };
export const { usePostLoginMutation } = injectedRtkApi;
