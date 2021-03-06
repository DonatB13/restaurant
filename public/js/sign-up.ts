//Sets error message under the input that was not correctly filled out
function setInputError(inputElement: HTMLElement, message: string) {
    const errorSign: HTMLElement = inputElement.parentElement.querySelector("#check-failed");
    const passedSign: HTMLElement = inputElement.parentElement.querySelector("#check-passed");
    const errorText: HTMLElement = inputElement.parentElement.getElementsByTagName("small")[0];
    errorSign.classList.add("active");
    passedSign.classList.remove("active");
    inputElement.classList.add("error");
    errorText.textContent = message;
    errorText.classList.add("active");
}

//Clears error message under the input
function clearInputError(inputElement: HTMLElement) {
    const errorSign: HTMLElement = inputElement.parentElement.querySelector("#check-failed");
    const passedSign: HTMLElement = inputElement.parentElement.querySelector("#check-passed");
    const errorText: HTMLElement = inputElement.parentElement.getElementsByTagName("small")[0];
    errorSign.classList.remove("active");
    passedSign.classList.remove("active");
    inputElement.classList.remove("error");
    errorText.textContent = "";
    errorText.classList.remove("active");
}

//Indicates that input was correctly filled out
function setInputSuccess(inputElement: HTMLElement) {
    const errorSign: HTMLElement = inputElement.parentElement.querySelector("#check-failed");
    const passedSign: HTMLElement = inputElement.parentElement.querySelector("#check-passed");
    errorSign.classList.remove("active");
    passedSign.classList.add("active");
    inputElement.classList.remove("error");
}

document.addEventListener("DOMContentLoaded", () => {
    //Forms
    const loginForm: HTMLElement = document.querySelector("#login-form");
    const createAccountForm: HTMLElement = document.querySelector("#register-form");
    //Input fields
    const signUpEmail: HTMLElement = document.querySelector("#signupEmail");
    const firstName: HTMLElement = document.querySelector("#firstName");
    const lastName: HTMLElement = document.querySelector("#lastName");
    const address: HTMLElement = document.querySelector("#address");
    const phoneNumber: HTMLElement = document.querySelector("#phoneNumber");

    signUpEmail.addEventListener("blur", e => {
        if(!validEmail(e))
        {
            setInputError(signUpEmail, "Invalid email address.");
        }
        if ((<HTMLInputElement>e.target).value.length <= 0 || (<HTMLInputElement>e.target).value.length >= 40) {
            setInputError(signUpEmail, "Email address length is invalid.");
        }
    });

    signUpEmail.addEventListener("input", e => {
        clearInputError(signUpEmail);
    });

    firstName.addEventListener("blur", e => {
        if ((<HTMLInputElement>e.target).value.length <= 0 || (<HTMLInputElement>e.target).value.length >= 20) {
            setInputError(firstName, "Invalid First Name.");
        }
    });

    firstName.addEventListener("input", e => {
        clearInputError(firstName);
    });

    lastName.addEventListener("blur", e => {
        if ((<HTMLInputElement>e.target).value.length <= 0 || (<HTMLInputElement>e.target).value.length >= 20) {
            setInputError(lastName, "Invalid Last Name.");
        }
    });

    lastName.addEventListener("input", e => {
        clearInputError(lastName);
    });

    address.addEventListener("blur", e => {
        if ((<HTMLInputElement>e.target).value.length <= 10 || (<HTMLInputElement>e.target).value.length >= 100) {
            setInputError(address, "Invalid address length.");
        }
    })

    address.addEventListener("input", e => {
        clearInputError(address);
    });

    phoneNumber.addEventListener("blur", e => {
        if ((<HTMLInputElement>e.target).value.length <= 0 || (<HTMLInputElement>e.target).value.length < 10 || (<HTMLInputElement>e.target).value.length >= 12) {
            setInputError(phoneNumber, "Invalid phone number length.");
        }
    })

    phoneNumber.addEventListener("input", e => {
        clearInputError(phoneNumber);
    });

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        document.querySelector('#login-form').classList.remove('active');
        document.querySelector('#register-form').classList.toggle('active');
    });

    document.querySelector("#close-register").addEventListener("click", e => {
        e.preventDefault();
        document.querySelector('#register-form').classList.toggle('active');
    });
});

function validEmail(email) {
    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!filter.test(email.target.value)) {
        return false;
    }
    
    return true;
}