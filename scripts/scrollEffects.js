window.addEventListener("scroll", () => {
    const { scrollTop, clientHeight, clientWidth, scrollHeight } = document.body;
    console.log(scrollTop, scrollHeight, clientHeight, clientWidth);

    translateTitleAndSubTitle(scrollTop);
    translateScaleRocket(scrollTop);
    translateScalePlanet1(clientWidth, clientHeight, scrollTop, scrollHeight);
    scaleRotateFixedPlanet2(clientHeight, scrollTop);
    opacityBloc1Planet2(clientHeight, scrollTop);
    opacityBloc2Planet2(clientHeight, scrollTop);
    opacityBloc3Planet2(clientHeight, scrollTop);
    opacityBloc4Planet2(clientHeight, scrollTop);
});

// responsive ici, car on utilise la taille de l'écran dans le produit en croix
window.addEventListener("resize", () => {
    const { scrollTop, clientHeight, clientWidth, scrollHeight } = document.body;
    translateScalePlanet1(clientWidth, clientHeight, scrollTop, scrollHeight);
});

/* --- FUNCTIONS --- */
function translateTitleAndSubTitle(scrollValue) {
    if (title.classList.contains("translate-animation")) {
        title.classList.remove("translate-animation");
    }
    title.style.transform = `translate3d(0, ${-((scrollValue / 25) ** 2)}%, 0)`;

    if (subTitle.classList.contains("translate-animation")) {
        subTitle.classList.remove("translate-animation");
    }
    subTitle.style.transform = `translate3d(0, ${-((scrollValue / 25.5) ** 2)}%, 0)`;
}

function translateScaleRocket(scrollValue) {
    let scale = scrollValue / 300;
    if (scale > 1) scale = 1;
    rocket.style.transform = `translate3d(0, ${-((scrollValue / 23.5) ** 2)}%, 0) scale(${scale})`;
}

function translateScalePlanet1(clientWidth, clientHeight, scrollValue, scrollHeight, resize) {
    let distanceY =
        (scrollValue * (clientHeight / 2)) / clientHeight - planet1.clientHeight / 2 + planet1.clientHeight / 2;
    let distanceX =
        (scrollValue * (clientWidth / 2)) / clientHeight - planet1.clientWidth / 2 + planet1.clientWidth / 2;

    let rotate = (scrollValue * 180) / scrollHeight;

    planet1.style.transform = `translate3d(${-distanceX}px, ${distanceY}px, 0) rotate(${rotate}deg)`;

    let scale = (scrollValue * clientWidth) / clientHeight + clientWidth * 0.5;

    planet1.style.width = `${scale}px`;
    planet1.style.height = `${scale}px`;

    if (planet1.classList.contains("scale-animation")) planet1.classList.remove("scale-animation");
}

function scaleRotateFixedPlanet2(clientHeight, scrollValue) {
    let rotate = ((scrollValue - 2 * clientHeight) * 180) / clientHeight;
    if (rotate >= 540) rotate = 540;

    let scale = scrollValue / (clientHeight + clientHeight / 1.5);
    if (scale >= 1) scale = 1;

    planet2.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
    // on inverse la rottaion des enfants pour ne pas avoir de rotation
    planet2Bloc1.style.transform = `rotate(${-rotate}deg)`;
    planet2Bloc2.style.transform = `rotate(${-rotate}deg)`;
    planet2Bloc3.style.transform = `rotate(${-rotate}deg)`;
    planet2Bloc4.style.transform = `rotate(${-rotate}deg)`;

    if (scrollValue >= 2 * clientHeight && scrollValue <= 5 * clientHeight) {
        planet2.classList.add("fixed-planet-2");
    } else {
        if (planet2.classList.contains("fixed-planet-2")) planet2.classList.remove("fixed-planet-2");
        // FIN DU BLOC
        if (scrollValue >= 5 * clientHeight) {
            scale = 1 - (scrollValue - 5 * clientHeight) / (clientHeight + clientHeight / 1.5);

            planet2.style.transform += `translate3d(0, ${-clientHeight * 3}px, 0) scale(${scale})`;
        }
    }
}

function opacityBloc1Planet2(clientHeight, scrollValue) {
    let opacity = scrollValue / clientHeight;

    if (opacity > 1) opacity = 1 - (scrollValue - 2 * clientHeight) / (clientHeight / 2);

    planet2Bloc1.style.opacity = opacity;
}

function opacityBloc2Planet2(clientHeight, scrollValue) {
    let opacity = (scrollValue - 2.5 * clientHeight) / (clientHeight / 2);

    if (opacity > 1) opacity = 2 - (scrollValue - 2.5 * clientHeight) / (clientHeight / 2);

    planet2Bloc2.style.opacity = opacity;
}

function opacityBloc3Planet2(clientHeight, scrollValue) {
    let opacity = (scrollValue - 3.5 * clientHeight) / (clientHeight / 2);

    if (opacity > 1) opacity = 2 - (scrollValue - 3.5 * clientHeight) / (clientHeight / 2);

    planet2Bloc3.style.opacity = opacity;
}

function opacityBloc4Planet2(clientHeight, scrollValue) {
    let opacity = (scrollValue - 4.5 * clientHeight) / (clientHeight / 2);

    if (opacity > 1) opacity = 2 - (scrollValue - 4.5 * clientHeight) / (clientHeight / 2);

    planet2Bloc4.style.opacity = opacity;
}
