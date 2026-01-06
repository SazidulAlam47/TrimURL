import status from 'http-status';
import ApiError from '../../errors/ApiError';
import { comparePassword, hashPassword } from '../../utils/bcrypt';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginWithEmailPayload, TRegisterUserPayload } from './auth.interface';
import sendEmail from '../../utils/sendEmail';
import config from '../../config';
import { Secret } from 'jsonwebtoken';
import ms from 'ms';
import { createToken, verifyToken } from '../../utils/token';
import { TDecodedUser } from '../../interface/jwt.interface';
import verifyFirebaseToken from '../../utils/verifyFirebaseToken';

const registerUser = async (payload: TRegisterUserPayload) => {
    const isUserExists = await User.findOne({ email: payload.email });

    if (isUserExists) {
        throw new ApiError(status.CONFLICT, 'This Email is Already registered');
    }

    const hashedPassword = await hashPassword(payload.password);

    const newUser: IUser = {
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
        profilePhoto: payload.profilePhoto || undefined,
    };

    const createdUser = await User.create(newUser);
    delete createdUser.password; // remove password from response

    return createdUser;
};

const loginWithEmail = async (payload: TLoginWithEmailPayload) => {
    const user = await User.findOne({ email: payload.email }).select(
        '+password',
    );

    if (!user) {
        throw new ApiError(status.NOT_FOUND, 'This email is not registered');
    }

    if (!user.password) {
        throw new ApiError(
            status.BAD_REQUEST,
            'Password not set for this account. Please log in using Google',
        );
    }

    const isCorrectPassword = await comparePassword(
        payload.password,
        user.password,
    );

    if (!isCorrectPassword) {
        throw new ApiError(status.FORBIDDEN, 'Wrong password');
    }

    const jwtPayload = {
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
        hasPassword: true,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt.access_token_secret as Secret,
        config.jwt.access_token_expires_in as ms.StringValue,
    );

    const refreshToken = createToken(
        jwtPayload,
        config.jwt.refresh_token_secret as Secret,
        config.jwt.refresh_token_expires_in as ms.StringValue,
    );

    return {
        accessToken,
        refreshToken,
    };
};

const loginWithGoogle = async (idToken: string) => {
    const decodedUser = await verifyFirebaseToken(idToken);

    if (!decodedUser) {
        throw new ApiError(status.UNAUTHORIZED, 'You are not authorized');
    }

    const { name, email, picture } = decodedUser;

    let user = await User.findOne({ email }).select('+password');

    if (!user) {
        user = await User.create({ name, email, profilePhoto: picture });
    }

    const jwtPayload = {
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
        hasPassword: !!user?.password,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt.access_token_secret as Secret,
        config.jwt.access_token_expires_in as ms.StringValue,
    );

    const refreshToken = createToken(
        jwtPayload,
        config.jwt.refresh_token_secret as Secret,
        config.jwt.refresh_token_expires_in as ms.StringValue,
    );

    return {
        accessToken,
        refreshToken,
    };
};

const setPassword = async (decodedUser: TDecodedUser, password: string) => {
    const user = await User.findOne({ email: decodedUser.email }).select(
        '+password',
    );

    if (!user) {
        throw new ApiError(status.NOT_FOUND, 'User not fund');
    }

    if (user?.password) {
        throw new ApiError(
            status.CONFLICT,
            'A password is already set for this account',
        );
    }

    const hashedPassword = await hashPassword(password);

    await User.findByIdAndUpdate(
        user._id,
        {
            password: hashedPassword,
        },
        {
            new: true,
        },
    );
    return null;
};

const changePassword = async (
    decodedUser: TDecodedUser,
    payload: { oldPassword: string; newPassword: string },
) => {
    const user = await User.findOne({ email: decodedUser.email }).select(
        '+password',
    );

    if (!user) {
        throw new ApiError(status.NOT_FOUND, 'User not fund');
    }

    if (!user?.password) {
        throw new ApiError(
            status.BAD_REQUEST,
            'Password not set for this account',
        );
    }

    // checking password
    const isCorrectPassword = await comparePassword(
        payload.oldPassword,
        user.password,
    );

    if (!isCorrectPassword) {
        throw new ApiError(status.FORBIDDEN, 'Old Password did not matched');
    }

    const newHashedPassword = await hashPassword(payload.newPassword);

    await User.findByIdAndUpdate(
        user._id,
        {
            password: newHashedPassword,
        },
        {
            new: true,
        },
    );
    return null;
};

const refreshToken = async (refreshToken: string) => {
    // check the token is valid
    const decodedUser = verifyToken(
        refreshToken,
        config.jwt.refresh_token_secret as string,
    );

    const user = await User.findOne({ email: decodedUser.email });

    if (!user) {
        throw new ApiError(status.NOT_FOUND, 'User not fund');
    }

    const jwtPayload = {
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
        hasPassword: !!user?.password,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt.access_token_secret as Secret,
        config.jwt.access_token_expires_in as ms.StringValue,
    );

    return { accessToken };
};

const forgetPassword = async (email: string) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(status.NOT_FOUND, 'This Email is not registered');
    }

    const jwtPayload = {
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
        hasPassword: !!user?.password,
    };

    const resetToken = createToken(
        jwtPayload,
        config.jwt.reset_pass_secret as string,
        '10m',
    );

    const resetLink = `${config.client_url}/reset-password?id=${user.id}&token=${resetToken}`;

    const subject = 'Reset Password';
    const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="text-align: center; color: #333;">Password Reset Request</h2>
            <p>Hello ${user.name},</p>
            <p>You requested to reset your password. Click the button below to reset it:</p>
            <div style="text-align: center; margin: 20px 0;">
            <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
            </div>
            <p>If you didn’t request this, you can safely ignore this email.</p>
            <p>Regards,</p>
            <p><strong>TrimURL</strong></p>
        </div>
        `;

    await sendEmail(user.email, subject, htmlBody);

    return null;
};

const resetPassword = async (
    tokenBearer: string,
    payload: { id: string; password: string },
) => {
    if (!tokenBearer) {
        throw new ApiError(status.UNAUTHORIZED, 'You are not authorized');
    }
    const token = tokenBearer.split(' ')[1]; // Extract token after "Bearer"
    if (!token) {
        throw new ApiError(status.UNAUTHORIZED, 'You are not authorized');
    }

    const decoded = verifyToken(token, config.jwt.reset_pass_secret as Secret);

    const user = await User.findById(payload.id);

    if (!user) {
        throw new ApiError(status.NOT_FOUND, 'User not found');
    }

    // check payload email and decoded email
    if (decoded.email !== user.email) {
        throw new ApiError(status.FORBIDDEN, 'Forbidden access');
    }

    const hashedPassword = await hashPassword(payload.password);

    await User.findByIdAndUpdate(
        user._id,
        {
            password: hashedPassword,
        },
        {
            new: true,
        },
    );
    return null;
};

export const AuthServices = {
    registerUser,
    loginWithEmail,
    loginWithGoogle,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword,
    setPassword,
};
