import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import { EnumToken } from '../../services/token.service';

export const PrivatePage = () => {
    const accessToken = Cookies.get(EnumToken.ACCESS_TOKEN);
    console.log(accessToken);
    if (!accessToken) {
        return <Navigate to={'/register'} />;
    }

    return <div>PrivatePage</div>;
};
