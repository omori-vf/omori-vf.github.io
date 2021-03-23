let DATES;
let PAGE_CONTENT;
let CURRENT_INDEX = 0;

document.addEventListener("DOMContentLoaded", (event) => {
    DATES = document.getElementById("dates");
    PAGE_CONTENT = document.getElementById("post-content");

    DATES.children[CURRENT_INDEX].id = "selected-date";
    for (let i = 0; i < PAGE_CONTENT.children.length; ++i) {
        if (CURRENT_INDEX * 2 !== i && CURRENT_INDEX * 2 + 1 !== i)
            PAGE_CONTENT.children[i].style.display = "none";
        else
            PAGE_CONTENT.children[i].style.display = "display";
    }
});

function update() {
    DATES.children[CURRENT_INDEX].id = "selected-date";

    for (let i = 0; i < PAGE_CONTENT.children.length; ++i) {
        if (CURRENT_INDEX * 2 !== i && CURRENT_INDEX * 2 + 1 !== i)
            PAGE_CONTENT.children[i].style.display = "none";
        else
            PAGE_CONTENT.children[i].style.display = "flex";
    }
}

function set_current_date(index) {
    DATES.children[CURRENT_INDEX].removeAttribute("id");
    CURRENT_INDEX = index;
    update();
}

document.addEventListener("keydown", function (event) {
    const key = event.key || event.keyCode;
    let need_update = false;
    if (key === "ArrowUp" && CURRENT_INDEX !== 0) {
        DATES.children[CURRENT_INDEX].removeAttribute("id");
        --CURRENT_INDEX;
        need_update = true;
    }
    else if (key === "ArrowDown" && CURRENT_INDEX !== DATES.children.length - 1) {
        DATES.children[CURRENT_INDEX].removeAttribute("id");
        ++CURRENT_INDEX;
        need_update = true;
    }
    if (need_update) {
        update();
    }
});
