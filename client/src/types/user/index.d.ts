interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    nickname: string;
    position: string;
    phoneNumber: string;
}

type UpdateUser = Omit<User, 'id'>;
