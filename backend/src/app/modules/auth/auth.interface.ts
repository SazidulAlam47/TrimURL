import z from 'zod';
import { AuthValidations } from './auth.validation';

export type TRegisterUserPayload = z.infer<typeof AuthValidations.registerUser>;

export type TLoginWithEmailPayload = z.infer<
    typeof AuthValidations.loginWithEmail
>;
