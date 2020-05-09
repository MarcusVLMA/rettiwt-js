export const isAuthenticated = () => {
    const token = localStorage.getItem('@rettiwt-js/token');
    if(token) {
        return true;
    } else {
        return false;
    }
}
 