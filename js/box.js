let ARROW_INDEX = 0;
let BOX = null;
let ARROW = null;
let NB_MENUS = 0;

// TODO : Gérer la confirmation des boutons avec la touche Enter.
// Puisque les actions vont être différentes (redirection,
// affichage d'un menu déroulant, téléchargement...), il faudra
// certainement utiliser un système de callback (on précise le
// nom de la fonction dans le html et on gère son appel dans le JS)

document.addEventListener("DOMContentLoaded", (event) => {
    BOX = document.getElementById("box");

    ARROW = document.createElement("img");
    ARROW.src = "assets/images/cursor_menu.png";
    ARROW.id = "arrow-menu";
    NB_MENUS = BOX.children.length;

    BOX.insertBefore(ARROW, BOX.firstChild);
});

document.addEventListener("keydown", function (event) {
    const key = event.key || event.keyCode;
    let update = false;
    if (key === "ArrowRight" && ARROW_INDEX !== NB_MENUS - 1) {
        ++ARROW_INDEX;
        update = true;
    } else if (key === "ArrowLeft" && ARROW_INDEX !== 0) {
        --ARROW_INDEX;
        update = true;
    }
    if (update) {
        BOX.removeChild(ARROW);
        BOX.insertBefore(ARROW, BOX.children[ARROW_INDEX]);
        for (let i = 0; i < NB_MENUS + 1; ++i) {
            if (i < ARROW_INDEX)
                BOX.children[i].classList.add("box-arrow-margin");
            else BOX.children[i].classList.remove("box-arrow-margin");
        }
    }
});
