import { HTMLInputTypeAttribute } from 'react';

export const registerFormInputs: Array<{
    name: keyof SignUpForm;
    content: string;
    type?: HTMLInputTypeAttribute;
}> = [
    {
        name: 'email',
        content: 'Email',
        type: 'email',
    },
    {
        name: 'password',
        content: 'password',
        type: 'password',
    },
    {
        name: 'firstName',
        content: 'first name',
    },
    {
        name: 'lastName',
        content: 'last name',
    },
    {
        name: 'nickname',
        content: 'nickname',
    },
    {
        name: 'phoneNumber',
        content: 'phone number',
        type: 'tel',
    },
    {
        name: 'position',
        content: 'position',
    },
];
