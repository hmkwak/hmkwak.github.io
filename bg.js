const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImg(number){
    const img = new Image();
    img.src = `/images/${number + 1}.jpg`;
    img.classList.add("bgImage")
    body.prepend(img);
}

function getRandom(){
    const rand = Math.floor(Math.random() * IMG_NUMBER );
    return rand;
}

function initBg(){
    paintImg(getRandom());
}

initBg();