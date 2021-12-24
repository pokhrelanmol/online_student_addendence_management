export const joinClasses = (...classes: string[]) => {
    return classes.join(" ");
};
interface ITokens {
    accessToken: string;
    refreshToken: string;
}
export const setTokens = (tokens: ITokens) => {
    localStorage.setItem("tokens", JSON.stringify(tokens));
    return;
};
