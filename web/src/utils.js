export const isAuthenticated = () => {
    const token = localStorage.getItem('@rettiwt-js/token');
    console.log('TOKENEEENENENENE', token)
    if(token) {
        console.log(true)
        return true;
    } else {
        console.log(false)
        return false;
    }
}
 