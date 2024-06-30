import { axiosClassic } from "../api/interceptors";
import { removeFromStorage, saveTokenStorage } from "./token.service";

export const authService = {
    async signUp(data: SignUpForm) {
        const response = await axiosClassic.post<AuthResponse>(
            `/auth/sign-up`,
            data
        );

        const { accessToken } = response.data;
        if (accessToken) saveTokenStorage(accessToken);

        return response;
    },

    async signIn(data: SignInForm) {
        const response = await axiosClassic.post<AuthResponse>(
            `/auth/sign-in`,
            data
        );

        const { accessToken } = response.data;
        if (accessToken) saveTokenStorage(accessToken);

        return response;
    },

    async logout() {
        const response = await axiosClassic.get<boolean>('/auth/logout');

        if (response.data) removeFromStorage();

        return response;
    }
};
