import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import config from '../../config';
import { CookieOptions } from 'express';

const refreshCookieOptions: CookieOptions = {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: config.NODE_ENV === 'production' ? 'none' : 'strict',
};

const registerUser = catchAsync(async (req, res) => {
    const result = await AuthServices.registerUser(req.body);
    sendResponse(res, {
        statusCode: status.CREATED,
        message: 'User registered successfully',
        data: result,
    });
});

const loginWithEmail = catchAsync(async (req, res) => {
    const result = await AuthServices.loginWithEmail(req.body);
    const { refreshToken, accessToken } = result;

    res.cookie('refreshToken', refreshToken, refreshCookieOptions);

    sendResponse(res, {
        statusCode: status.OK,
        message: 'Logged in successfully',
        data: {
            accessToken,
        },
    });
});

const loginWithGoogle = catchAsync(async (req, res) => {
    const result = await AuthServices.loginWithGoogle(req.body.idToken);
    const { refreshToken, accessToken } = result;

    res.cookie('refreshToken', refreshToken, refreshCookieOptions);

    sendResponse(res, {
        statusCode: status.OK,
        message: 'Logged in successfully',
        data: {
            accessToken,
        },
    });
});

const logout = catchAsync(async (req, res) => {
    res.cookie('refreshToken', '', {
        ...refreshCookieOptions,
        expires: new Date(0),
    });

    res.clearCookie('refreshToken');

    sendResponse(res, {
        statusCode: status.OK,
        message: 'Logged out successfully',
        data: null,
    });
});

const setPassword = catchAsync(async (req, res) => {
    const result = await AuthServices.setPassword(req.user, req.body.password);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Password added successfully',
        data: result,
    });
});

const changePassword = catchAsync(async (req, res) => {
    const result = await AuthServices.changePassword(req.user, req.body);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Password is changed successfully',
        data: result,
    });
});

const refreshToken = catchAsync(async (req, res) => {
    const result = await AuthServices.refreshToken(req.cookies.refreshToken);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Access Token retrieved successfully',
        data: result,
    });
});

const forgetPassword = catchAsync(async (req, res) => {
    const { email } = req.body;
    const result = await AuthServices.forgetPassword(email);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Reset email is sent successfully',
        data: result,
    });
});

const resetPassword = catchAsync(async (req, res) => {
    const token = req.headers.authorization || '';
    const result = await AuthServices.resetPassword(token, req.body);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Password reset successful',
        data: result,
    });
});

export const AuthControllers = {
    registerUser,
    loginWithEmail,
    loginWithGoogle,
    logout,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword,
    setPassword,
};
