let ARROW_INDEX = 0;
let BOX = null;
let ARROW = null;
let NB_MENUS = 0;

document.addEventListener("DOMContentLoaded", (event) => {
    BOX = document.getElementById("box");
    if (BOX !== null) {

        ARROW = document.createElement("img");
        ARROW.src = "assets/images/cursor_menu.png";
        ARROW.id = "arrow-menu";
        NB_MENUS = BOX.children.length;

        BOX.insertBefore(ARROW, BOX.firstChild);
    }
});

document.addEventListener("keydown", function (event) {
    if (BOX === null) return;
    const key = event.key || event.keyCode;
    let update = false;
    if (key === "ArrowRight" && ARROW_INDEX !== NB_MENUS - 1) {
        ++ARROW_INDEX;
        update = true;
    } else if (key === "ArrowLeft" && ARROW_INDEX !== 0) {
        --ARROW_INDEX;
        update = true;
    }
    else if (key === "Enter") {
        const current_box = BOX.children[ARROW_INDEX + 1];
        const callback = current_box.getAttribute("callback");
        execute_str_callback(callback);
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
