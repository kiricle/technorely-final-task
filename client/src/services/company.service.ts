import { axiosWithAuth } from '../api/interceptors';

export const companyService = {
    async getCompanies() {
        const response = await axiosWithAuth.get<Company[]>('company');

        return response.data;
    },

    async createCompany(data: CreateCompany) {
        const response = await axiosWithAuth.post<Company>('company', data)

        return response.data
    },
};
