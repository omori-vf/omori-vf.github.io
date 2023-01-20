let CANVAS = null;
let CANVAS_RECT = null;
let CTX = null;
let RED_HANDS = [];
let MOUSE_X;
let MOUSE_Y;

// TODO : Interface pour jouer
// TODO : Faire en sorte que les mains ne puissent pas se "lier" (variation de vitesse ?)

// Paramètres du mini-jeu
const UPDATE_RATE = 40; // FPS

function distance(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

class RedHand {
    constructor() {
        const spawn_position = this.get_spawn_location();
        const cursor_position = { x: MOUSE_X, y: MOUSE_Y };

        // TODO : Faire en sorte qu'une nouvelle main ne puisse pas spawn juste à côté du curseur
        if (distance(spawn_position, cursor_position) < RedHand.MINIMAL_SPAWN_LOCATION) {

        }

        this._x = spawn_position.x;
        this._y = spawn_position.y;
        this._img_idx = 0;
        this._frame = 0;

        ++RedHand.NB_INSTANCES;
    }

    get x() {
        return this._x;
    }

    set x(new_x) {
        this._x = new_x;
    }

    get y() {
        return this._y;
    }

    set y(new_y) {
        this._y = new_y;
    }

    get_spawn_location() {
        let x = Math.floor(Math.random() * CANVAS_RECT.width);
        let y = Math.floor(Math.random() * CANVAS_RECT.height);

        return { x: x, y: y };
    }

    update() {
        const vector = [MOUSE_X - this.x, MOUSE_Y - this.y];
        const norm = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));
        const unit_vector = [vector[0] / norm, vector[1] / norm];

        const moving_vector = [unit_vector[0] * RedHand.SPEED, unit_vector[1] * RedHand.SPEED];
        this.x += moving_vector[0];
        this.y += moving_vector[1];

        const arrow_center = [this.x + RedHand.IMAGES[this._img_idx].width / 2, this.y + RedHand.IMAGES[this._img_idx].height / 2];

        CTX.save();
        CTX.translate(arrow_center[0], arrow_center[1]);
        CTX.rotate(Math.atan2(unit_vector[0], -unit_vector[1]) + Math.PI / 2);
        CTX.translate(-arrow_center[0], -arrow_center[1]);
        CTX.drawImage(RedHand.IMAGES[this._img_idx], this.x, this.y);
        CTX.restore();

        ++this._frame;
        if (this._frame === 10) {
            this._img_idx = (this._img_idx + 1) % RedHand.IMAGES.length;
            this._frame = 0;
        }

    }

    static NB_INSTANCES = 0;
    static IMAGES_URL = ["assets/images/red_hand_1.png", "assets/images/red_hand_2.png"];
    static MAX_RED_HANDS = 5;
    static SPEED = 10;// Plus la valeur est élevée, plus les mains se rapprochent rapidement
    static SPAWN_COOLDOWN = 2; // Le nombre de secondes entre l'apparition de deux mains
    static IMAGES = [];
    static MINIMAL_SPAWN_LOCATION = 200;
}

RedHand.IMAGES.push(document.createElement("img"));
RedHand.IMAGES.push(document.createElement("img"));
RedHand.IMAGES[0].src = RedHand.IMAGES_URL[0];
RedHand.IMAGES[1].src = RedHand.IMAGES_URL[1];

function get_mouse_position() {
    const rect = CANVAS.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function init() {
    CANVAS = document.getElementById("minigame");
    CTX = CANVAS.getContext("2d");
    CANVAS_RECT = CANVAS.getBoundingClientRect();
}

function spawn_red_hand() {
    if (CANVAS === null) return;
    if (RedHand.NB_INSTANCES < RedHand.MAX_RED_HANDS)
        RED_HANDS.push(new RedHand());
}

function update_red_hands() {
    if (CANVAS === null) return;
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    for (red_hand of RED_HANDS) {
        red_hand.update();
    }
}

function on_mouse_update(event) {
    MOUSE_X = event.clientX - CANVAS_RECT.left;
    MOUSE_Y = event.clientY - CANVAS_RECT.top;
}


document.addEventListener("DOMContentLoaded", (event) => {
    init();
    setInterval(spawn_red_hand, RedHand.SPAWN_COOLDOWN * 1000);
    setInterval(update_red_hands, 1000 / UPDATE_RATE);
});
document.addEventListener('mousemove', on_mouse_update, false);
document.addEventListener('mouseenter', on_mouse_update, false);