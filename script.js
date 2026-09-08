/* =====================================================
   MUSIC
===================================================== */

const music = document.getElementById("music");

let musicStarted = false;

function startMusic() {

    if (!music) {
        console.error("Music element not found");
        return;
    }

    music.volume = 0.7;

    music.play()
        .then(() => {

            musicStarted = true;

            console.log("❤️ SONG IS PLAYING");

        })
        .catch(error => {

            console.error(
                "Song error:",
                error
            );

        });
}


/* =====================================================
   SCREENS
===================================================== */

const screens = [

    document.getElementById("startScreen"),
    document.getElementById("scene1"),
    document.getElementById("scene2"),
    document.getElementById("scene3"),
    document.getElementById("scene4"),
    document.getElementById("scene5"),
    document.getElementById("scene6"),
    document.getElementById("scene7")

];


function showScene(number) {

    screens.forEach(screen => {

        screen.classList.remove("active");

    });

    screens[number].classList.add("active");

    createHearts(6);

}


/* =====================================================
   START BUTTON + SONG
===================================================== */

document
    .getElementById("startButton")
    .addEventListener("click", function () {

        /*
         * IMPORTANT:
         * Music starts directly from this
         * user click, so Chrome allows it.
         */

        startMusic();

        showScene(1);

    });


/* =====================================================
   BIRTHDAY
===================================================== */

document
    .getElementById("birthdayNext")
    .addEventListener("click", function () {

        showScene(2);

    });


/* =====================================================
   BALLOONS
===================================================== */

const balloons =
    document.querySelectorAll("[data-balloon]");

const balloonMessage =
    document.getElementById("balloonMessage");

const balloonContinue =
    document.getElementById("balloonContinue");

let popped = 0;


balloons.forEach(balloon => {

    balloon.addEventListener("click", function () {

        if (
            balloon.classList.contains("popped")
        ) {
            return;
        }

        balloon.classList.add("popped");

        popped++;

        createPopParticles(balloon);


        if (popped === 4) {

            setTimeout(() => {

                balloonMessage.classList.add(
                    "visible"
                );

                typeText(
                    balloonMessage,
                    "Every little moment with you makes my heart smile. ❤️",
                    50
                );

            }, 500);


            setTimeout(() => {

                balloonContinue.classList.remove(
                    "hidden"
                );

            }, 4000);

        }

    });

});


/* =====================================================
   BALLOON NEXT
===================================================== */

document
    .getElementById("balloonNext")
    .addEventListener("click", function () {

        showScene(3);

    });


/* =====================================================
   PARTICLES
===================================================== */

function createPopParticles(balloon) {

    const rect =
        balloon.getBoundingClientRect();

    const symbols = [
        "♡",
        "✨",
        "✦",
        "💕"
    ];


    for (let i = 0; i < 15; i++) {

        const particle =
            document.createElement("div");

        particle.className =
            "pop-particle";

        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        particle.style.left =
            (
                rect.left +
                rect.width / 2
            ) + "px";

        particle.style.top =
            (
                rect.top +
                rect.height / 2
            ) + "px";

        particle.style.setProperty(
            "--x",
            ((Math.random() - 0.5) * 200) + "px"
        );

        particle.style.setProperty(
            "--y",
            ((Math.random() - 0.5) * 200) + "px"
        );

        document.body.appendChild(particle);

        setTimeout(() => {

            particle.remove();

        }, 1000);

    }

}


/* =====================================================
   ROSE
===================================================== */

document
    .getElementById("roseNext")
    .addEventListener("click", function () {

        showScene(4);

        startPhotos();

    });


/* =====================================================
   PHOTOS
===================================================== */

const photos =
    document.querySelectorAll(".memory-photo");

const dots =
    document.querySelectorAll(".photo-dot");

let photoIndex = 0;

let photoTimer;


function showPhoto(index) {

    photos.forEach(photo => {

        photo.classList.remove("active");

    });

    dots.forEach(dot => {

        dot.classList.remove("active");

    });

    photos[index].classList.add("active");

    dots[index].classList.add("active");

}


function startPhotos() {

    clearInterval(photoTimer);

    photoIndex = 0;

    showPhoto(0);

    photoTimer = setInterval(() => {

        photoIndex++;

        if (photoIndex >= photos.length) {

            photoIndex = 0;

        }

        showPhoto(photoIndex);

    }, 3000);

}


/* =====================================================
   PHOTO -> LETTER
===================================================== */

document
    .getElementById("memoryNext")
    .addEventListener("click", function () {

        clearInterval(photoTimer);

        showScene(5);

        startLetterWriting();

    });


/* =====================================================
   LETTER
===================================================== */

const letterTexts = [

    "Dear Baby,",

    "Happy Birthday to the person who holds such a special place in my heart. ❤️",

    "I don't think words will ever be enough to explain how much you mean to me.",

    "Thank you for every smile, every conversation, every memory, and every little moment that became special simply because it was with you.",

    "Today, I just want you to know how loved and precious you are.",

    "I hope this new year of your life brings you happiness, peace, success and everything your heart wishes for.",

    "Keep smiling, Baby. Always. ❤️",

    "With all my love,\nYours ❤️"

];


const letterElements = [

    document.getElementById("letter1"),
    document.getElementById("letter2"),
    document.getElementById("letter3"),
    document.getElementById("letter4"),
    document.getElementById("letter5"),
    document.getElementById("letter6"),
    document.getElementById("letter7"),
    document.getElementById("letter8")

];


function startLetterWriting() {

    letterElements.forEach(element => {

        element.textContent = "";

    });

    document
        .getElementById("letterNext")
        .classList.add("hidden");


    writeParagraph(0);

}


function writeParagraph(number) {

    if (number >= letterTexts.length) {

        setTimeout(() => {

            document
                .getElementById("letterNext")
                .classList.remove("hidden");

        }, 500);

        return;
    }


    const element =
        letterElements[number];

    const text =
        letterTexts[number];

    let index = 0;


    const timer = setInterval(() => {

        element.textContent +=
            text.charAt(index);

        index++;


        const paper =
            document.querySelector(".letter-paper");

        paper.scrollTop =
            paper.scrollHeight;


        if (index >= text.length) {

            clearInterval(timer);

            setTimeout(() => {

                writeParagraph(number + 1);

            }, 300);

        }

    }, 28);

}


/* =====================================================
   LETTER -> WISH
===================================================== */

document
    .getElementById("letterNext")
    .addEventListener("click", function () {

        showScene(6);

        openWish();

    });


/* =====================================================
   WISH
===================================================== */

function openWish() {

    const intro =
        document.getElementById("wishIntro");

    const typing =
        document.getElementById("wishTyping");

    const content =
        document.getElementById("wishContent");


    intro.classList.remove("hide");

    content.classList.add("hidden");

    content.classList.remove("show");

    typing.textContent = "";


    const text =
        "Close your eyes, Baby... make a beautiful wish. ✨";


    typeText(
        typing,
        text,
        65
    );


    setTimeout(() => {

        intro.classList.add("hide");

        setTimeout(() => {

            content.classList.remove(
                "hidden"
            );

            content.classList.add(
                "show"
            );

            createHearts(15);

        }, 600);

    }, 4300);

}


/* =====================================================
   TYPE TEXT
===================================================== */

function typeText(
    element,
    text,
    speed
) {

    element.textContent = "";

    let index = 0;

    const timer = setInterval(() => {

        element.textContent +=
            text.charAt(index);

        index++;

        if (index >= text.length) {

            clearInterval(timer);

        }

    }, speed);

}


/* =====================================================
   BLOW CANDLE
===================================================== */

const blowButton =
    document.getElementById("blowButton");

const flame =
    document.getElementById("bigFlame");

const wishMessage =
    document.getElementById("wishMessage");

let candleBlown = false;


blowButton.addEventListener("click", function () {

    if (candleBlown) {
        return;
    }

    candleBlown = true;


    flame.style.animation = "none";

    flame.style.transform =
        "translateY(-30px) scale(0)";

    flame.style.opacity = "0";


    blowButton.style.display =
        "none";


    typeText(
        wishMessage,
        "Wish made... ❤️",
        70
    );


    createHeartBurst();


    setTimeout(() => {

        showScene(7);

    }, 3000);

});


/* =====================================================
   HEART BURST
===================================================== */

function createHeartBurst() {

    const symbols = [
        "❤️",
        "💕",
        "💗",
        "♡",
        "✨",
        "✦"
    ];


    for (let i = 0; i < 45; i++) {

        setTimeout(() => {

            const heart =
                document.createElement("div");

            heart.className =
                "float-heart";

            heart.textContent =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];

            heart.style.left =
                Math.random() * 100 + "vw";

            heart.style.fontSize =
                (16 + Math.random() * 25) + "px";

            heart.style.animationDuration =
                (4 + Math.random() * 3) + "s";

            document.body.appendChild(heart);

            setTimeout(() => {

                heart.remove();

            }, 8000);

        }, i * 45);

    }

}


/* =====================================================
   FLOATING HEARTS
===================================================== */

function createHeart() {

    const heart =
        document.createElement("div");

    heart.className =
        "float-heart";

    const symbols = [
        "♡",
        "♥",
        "💕",
        "✦"
    ];

    heart.textContent =
        symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
        ];

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.fontSize =
        (13 + Math.random() * 17) + "px";

    heart.style.animationDuration =
        (5 + Math.random() * 4) + "s";

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 10000);

}


function createHearts(amount) {

    for (let i = 0; i < amount; i++) {

        setTimeout(() => {

            createHeart();

        }, i * 120);

    }

}


/* =====================================================
   REPLAY
===================================================== */

document
    .getElementById("replayButton")
    .addEventListener("click", function () {

        location.reload();

    });


/* INITIAL */

setTimeout(() => {

    createHearts(8);

}, 800);