const truncateUrl = (urlString: string, maxLength = 40) => {
    if (urlString.length <= maxLength) return urlString;
    return urlString.substring(0, maxLength) + "...";
};

export default truncateUrl;
