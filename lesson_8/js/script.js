function setCookie(cookieKey, cookieValue, exdays) {
    const cookieDate = new Date();
    const expiryDaysInMs = exdays * 24 * 60 * 60 * 1000;
    cookieDate.setTime(cookieDate.getTime() + expiryDaysInMs);
    let expires = "expires="+ cookieDate.toUTCString();
    document.cookie = cookieKey + "=" + cookieValue + ";" + expires +
    ";path=/";
    }

setCookie('first_name', 'Jim', 30);

function getCookie(cookieKey) {
    let name = cookieKey + "=";
    let myCookie = document.cookie.split(';');
    for(let i = 0; i < myCookie.length; i++) {
    let theCookie = myCookie[i];
    while (theCookie.charAt(0) == ' ') {
    theCookie = theCookie.substring(1);
    }
    if (theCookie.indexOf(name) == 0) {
    return theCookie.substring(name.length, theCookie.length);
    }
    }
    return "";
    }
getCookie('first_name') 

sessionStorage.setItem("lastname", "Smith");
sessionStorage.getItem("lastname");
sessionStorage.removeItem("lastname"); // sessionStorage.removeItem("lastname");
sessionStorage.clear();

window.localStorage.setItem('name', 'John Doe');
// localStorage only wants Strings. You can store an object in localStorage,
// but you'll have to convert it to a string first. JSON has a function for that.
let person = { name: "John", age: 28 };
window.localStorage.setItem('person', JSON.stringify(person));

// '{ "name": "John", "age": "28" }

window.localStorage.getItem('name');
console.log(JSON.parse(window.localStorage.getItem('person')).name);