//radnom email function is the function for generating random email
export const randomEmail = () => {
    return (
        Math.random()
        .toString(36)
        .substr(2, 7) + '@test.com'
    );
}

//radnom password function is the function for generating random password
export const randomPassword = (length) => {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }