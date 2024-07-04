import { axiosWithAuth } from '../api/interceptors';

export const userService = {
    async getProfile() {
        const response = await axiosWithAuth.get<User>('user');

        return response.data;
    },

    async updateProfile(data: User) {
        const response = await axiosWithAuth.patch<User>('user', data);

        return response.data;
    },
};
