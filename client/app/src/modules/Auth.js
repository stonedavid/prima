class Auth {
    
    /**
     * Authenticate a user. Save a token string in local storage
     * 
     * @param {string} token
     **/
    
    static authenticateUser(token) {
        localStorage.setItem("token", token);
    }
    
    /**
     * check if a user is authenticated -- check if a token is saved in local storage
     * 
     * @returns {boolean}
     **/
    
    static isUserAuthenticated() {
        return localStorage.getItem("token") !== null;
    }
    
    /**
     * Deauthenticate a user. Remove a token from local storage
     * 
     **/
     
    static deauthenticateUser() {
        localStorage.removeItem("token");
    }
    
    /**
     * Get a token value
     * 
     * @returns {string}
     * 
     **/
     
    static getToken() {
        return localStorage.getItem("token");
    }
 }
 
 export default Auth;