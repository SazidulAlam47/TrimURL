/* eslint-disable @typescript-eslint/no-explicit-any */
const SFormError = ({ error }: { error: any }) => {
    return (
        <>
            {error && (
                <p className="text-red-600 text-sm ml-0.5 mt-0.5">
                    {error?.message as string}
                </p>
            )}
        </>
    );
};

export default SFormError;
