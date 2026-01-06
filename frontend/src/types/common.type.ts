/* eslint-disable @typescript-eslint/no-explicit-any */
export type TResponseSuccessType = {
    data: any;
};

export type TResponseErrorType = {
    statusCode: number;
    message: string;
};
