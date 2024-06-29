interface SignUpForm extends Omit<User, 'id'> {
    password: string;
}

interface SignInForm extends Pick<User, 'email'> {
    password: string;
}

interface AuthResponse {
    user: User;
    accessToken: string;
}
