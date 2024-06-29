import Cookies from 'js-cookie';

export enum EnumToken {
    'ACCESS_TOKEN' = 'accessToken',
}

export const getAccessToken = () => {
    const accessToken = Cookies.get(EnumToken.ACCESS_TOKEN);
    return accessToken || null;
};

export const saveTokenStorage = (accessToken: string) => {
    Cookies.set(EnumToken.ACCESS_TOKEN, accessToken, {
        expires: 1,
    });
};

export const removeFromStorage = () => {
    Cookies.remove(EnumToken.ACCESS_TOKEN);
};
