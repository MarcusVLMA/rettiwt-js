export const isAuthenticated = async () => {
    const token = await localStorage.getItem('@rettiwt-js/token');

    return token ? true : false;
}
 