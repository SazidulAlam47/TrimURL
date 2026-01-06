import { type JwtPayload } from 'jwt-decode';

export type TDecodedUser = JwtPayload & {
    name: string;
    email: string;
    profilePhoto?: string;
    hasPassword: boolean;
};
