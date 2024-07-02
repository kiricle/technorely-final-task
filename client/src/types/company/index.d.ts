interface Company {
    id: string;
    name: string;
    address: string;
    serviceOfActivity: string;
    numberOfEmployees: number;
    description: string;
    type: string;
    ownerId: string;
}

interface CreateCompanyForm extends Omit<Company, 'id' | 'ownerId'> {
    numberOfEmployees: string;
}

type CreateCompany = Omit<Company, 'id' | 'ownerId'>;
