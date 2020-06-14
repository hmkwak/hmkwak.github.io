const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser";
const SHOW_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmitName(e){
    e.preventDefault();
    const currentValue = input.value;
    saveName(currentValue);
    painGreeting(currentValue);
}

function askForName(){
    form.classList.add(SHOW_CN);
    form.addEventListener("submit", handleSubmitName);
}

function painGreeting(text){
    form.classList.remove(SHOW_CN);
    greeting.innerText = `Hello ${text}`;
    greeting.classList.add(SHOW_CN);
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    
    if(currentUser === null){
        askForName();
    } else {
        painGreeting(currentUser);
    }
}

function initGreeting(){
    loadName();    
}

initGreeting();