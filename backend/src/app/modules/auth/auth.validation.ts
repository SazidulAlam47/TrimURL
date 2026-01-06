import z from 'zod';

const newPasswordSchema = z
    .string({ message: 'Please enter your New Password' })
    .min(6, 'Password must be at least 6 characters long')
    .refine(
        (password) => /[a-zA-Z]/.test(password),
        'Password must contain at least one letter',
    )
    .refine(
        (password) => /[a-z]/.test(password),
        'Password must contain at least one lowercase letter',
    )
    .refine(
        (password) => /[A-Z]/.test(password),
        'Password must contain at least one uppercase letter',
    )
    .refine(
        (password) => /[0-9]/.test(password),
        'Password must contain at least one number',
    )
    .refine(
        (password) => /[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]/.test(password),
        'Password must contain at least one special character',
    );

const registerUser = z.object({
    name: z.string(),
    email: z.string().email(),
    password: newPasswordSchema,
    profilePhoto: z.string().url().optional(),
});

const loginWithEmail = z.object({
    email: z.string().email(),
    password: z.string(),
});
const loginWithGoogle = z.object({
    idToken: z.string(),
});

const setPassword = z.object({
    password: newPasswordSchema,
});

const changePassword = z.object({
    oldPassword: z.string().min(1),
    newPassword: newPasswordSchema,
});

const forgetPassword = z.object({
    email: z.string().email(),
});

const resetPassword = z.object({
    id: z.string().min(1),
    password: newPasswordSchema,
});

export const AuthValidations = {
    registerUser,
    loginWithEmail,
    loginWithGoogle,
    changePassword,
    forgetPassword,
    resetPassword,
    setPassword,
};
