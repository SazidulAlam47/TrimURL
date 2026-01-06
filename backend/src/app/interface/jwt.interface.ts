import { JwtPayload } from 'jsonwebtoken';

export type TDecodedUser = {
    name: string;
    email: string;
    profilePhoto?: string;
    hasPassword: boolean;
} & JwtPayload;
