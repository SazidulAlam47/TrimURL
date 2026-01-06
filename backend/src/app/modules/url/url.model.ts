import { model, Schema } from 'mongoose';
import { IShortUrl } from './url.interface';

const shortUrl = new Schema<IShortUrl>(
    {
        shortId: {
            type: String,
            required: true,
            unique: true,
        },
        originalUrl: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        clicks: {
            type: Number,
            default: 0,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

export const ShortUrl = model<IShortUrl>('ShortUrl', shortUrl);
