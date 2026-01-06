import { Types } from 'mongoose';

export interface IShortUrl {
    shortId: string;
    originalUrl: string;
    user: Types.ObjectId;
    clicks: number;
    isDeleted: boolean;
}
