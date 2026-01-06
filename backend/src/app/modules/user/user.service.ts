import status from 'http-status';
import ApiError from '../../errors/ApiError';
import { TDecodedUser } from '../../interface/jwt.interface';
import { User } from './user.model';

const getMe = async (decodedUser: TDecodedUser) => {
    const user = await User.findOne({ email: decodedUser.email }).select(
        '+password',
    );
    if (!user) {
        throw new ApiError(status.NOT_FOUND, 'User not found');
    }

    const result = {
        name: user.name,
        email: user.email,
        profilePhoto: user?.profilePhoto,
        hasPassword: !!user?.password,
    };
    return result;
};

export const UserServices = {
    getMe,
};
