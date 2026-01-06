import status from 'http-status';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { TDecodedUser } from '../../interface/jwt.interface';
import generateShortId from '../../utils/generateShortId';
import { User } from '../user/user.model';
import { ShortUrl } from './url.model';

const createShortUrl = async (
    decodedUser: TDecodedUser,
    originalUrl: string,
    baseUrl: string,
) => {
    let shortId: string;
    let isExists: boolean;

    do {
        shortId = generateShortId();
        isExists = Boolean(await ShortUrl.findOne({ shortId }));
    } while (isExists);

    const shortUrl = `${baseUrl}/${shortId}`;

    const user = await User.findOne({ email: decodedUser.email });
    if (!user) {
        throw new ApiError(status.NOT_FOUND, 'User not found');
    }

    const payload = {
        shortId,
        originalUrl,
        user: user._id,
    };

    await ShortUrl.create(payload);

    return { shortUrl };
};

const redirectToOriginalUrl = async (shortId: string) => {
    const result = await ShortUrl.findOne({ shortId, isDeleted: false });

    if (!result) {
        return config.client_url as string;
    }

    await ShortUrl.findByIdAndUpdate(result._id, { $inc: { clicks: 1 } });

    return result?.originalUrl;
};

const redirectBaseUrlToClient = async () => {
    return config.client_url as string;
};

const getMyAllUrls = async (decodedUser: TDecodedUser, baseUrl: string) => {
    const urls = await ShortUrl.find({
        user: decodedUser.id,
        isDeleted: false,
    }).sort({
        createdAt: -1,
    });

    const urlsWithShortUrl = urls.map((url) => ({
        ...url.toObject(),
        shortUrl: `${baseUrl}/${url.shortId}`,
    }));

    return urlsWithShortUrl;
};

const deleteMyUrlById = async (decodedUser: TDecodedUser, id: string) => {
    const user = await User.findOne({ email: decodedUser.email });
    if (!user) {
        throw new ApiError(status.NOT_FOUND, 'User not found');
    }
    const url = await ShortUrl.findById(id);
    if (!url) {
        throw new ApiError(status.NOT_FOUND, 'URL not found');
    }
    if (url.isDeleted) {
        throw new ApiError(status.NOT_FOUND, 'URL not found');
    }
    if (url.user.toString() !== user._id.toString()) {
        throw new ApiError(status.FORBIDDEN, 'Forbidden Access');
    }

    const result = await ShortUrl.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    return result;
};

export const UrlServices = {
    createShortUrl,
    redirectToOriginalUrl,
    redirectBaseUrlToClient,
    getMyAllUrls,
    deleteMyUrlById,
};
