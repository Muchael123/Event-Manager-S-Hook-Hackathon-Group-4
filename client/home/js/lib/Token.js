
function AddTokentoLocalStorage(token) {
    localStorage.setItem('token', token);
}
function RemoveTokenfromLocalStorage() {
    localStorage.removeItem('token');
}
function GetTokenfromLocalStorage() {
    return localStorage.getItem('token');
}
function checkToken() {
    if (GetTokenfromLocalStorage() === null) {
        window.location.href = '/login.html';
    }
}
export { AddTokentoLocalStorage, RemoveTokenfromLocalStorage, GetTokenfromLocalStorage, checkToken };
