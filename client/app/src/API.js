// there's a challenge for this since i'm calling dispatch from the response. 
// solution at https://redux-saga.github.io/redux-saga/docs/basics/DispatchingActions.html

import Auth from "../src/modules/Auth";

/**
 * function login
 * @param form = { email, password }
 * @returns Promise
 **/

export const login = (form) => {

    return new Promise((resolve, reject) => {

        const email = encodeURIComponent(form.email);
        const password = encodeURIComponent(form.password);
        const formData = `email=${email}&password=${password}`;

        const xhr = new XMLHttpRequest();
        xhr.open("post", "/auth/login");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.responseType = "json";

        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                Auth.authenticateUser(xhr.response.token);
                resolve(xhr.response);
            }
            else {
                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;
                reject(xhr.response);
            }
        });

        xhr.send(formData);

    });

};

/**
 * function saveCards
 * @param form = { user, cardset }
 * @returns Promise
 **/

export const saveCards = (form) => {

    return new Promise((resolve, reject) => {

        console.log("Saving these cards", form);

        const email = encodeURIComponent(form.user);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `/api/save/${email}`);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", `bearer ${Auth.getToken()}`);
        xhr.responseType = "json";

        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            }
            else {
                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;
                reject(xhr.response);
            }
        });

        xhr.send(JSON.stringify(form));

    });
};

export const getUserLessons = (email) => {

    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();
        email = encodeURIComponent(email);
        xhr.open("get", "/api/getLessons/" + email);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Authorization", `bearer ${Auth.getToken()}`);
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                resolve(Object.values(xhr.response.lessons).sort( (a,b) => {
                    return a.index < b.index ? -1 : 1;
                }));
            }
            else {
                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;
                reject(xhr.response);
            }
        });
        xhr.send();
        
    });
};
