let canvas, ctx;

function random_integer(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

class Vector2D {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  static add(vec1, vec2) {
    return new Vector2D(vec1.x + vec2.x, vec1.y + vec2.y);
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  static sub(vec1, vec2) {
    return new Vector2D(vec1.x - vec2.x, vec1.y - vec2.y);
  }

  sub(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
  }

  mul(scalar) {
    this.x *= scalar;
    this.y *= scalar;
  }

  reset() {
    this.x = 0;
    this.y = 0;
  }

  copy() {
    return new Vector2D(this.x, this.y);
  }

  limit(max_magnitude) {
    this.normalize();
    this.mul(max_magnitude);
  }

  magnitude() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  normalize() {
    const magnitude = this.magnitude();
    if (magnitude !== 0) {
      this.x /= magnitude;
      this.y /= magnitude;
    }
  }

  normalized() {
    return this.copy().normalize();
  }
}

class RedHand {
  static animation_1 = document.createElement("img");
  static animation_2 = document.createElement("img");
  static animation_width = 56;
  static animation_height = 20;
  static animation_update_time_rate = 100; // Every 100ms, update the animation
  static target_update_time_rate = 100; // Every 300ms, update the target (wandering behavior)
  static speed = 3;
  static max_force = 0.15;
  static nb_red_hands = 20;
  static target_margin = 100; // Spawn targets inside the screen (100px margin) so red hand doesn't get off screen for too long
  static wander_ring_distance = 200;
  static wander_ring_radius = 50;

  static init() {
    RedHand.animation_1.src = "/img/background/red_hand_animation_1.png";
    RedHand.animation_2.src = "/img/background/red_hand_animation_2.png";
  }

  static get_random_position() {
    return new Vector2D(
      random_integer(0, canvas.width),
      random_integer(0, canvas.height)
    );
  }

  static get_random_target() {
    return new Vector2D(
      random_integer(
        RedHand.target_margin,
        canvas.width - RedHand.target_margin
      ),
      random_integer(
        RedHand.target_margin,
        canvas.height - RedHand.target_margin
      )
    );
  }

  constructor() {
    this.position = RedHand.get_random_position();
    this.velocity = new Vector2D();
    this.acceleration = new Vector2D();
    this.target = RedHand.get_random_target();
    this.target_time = 0;
    this.animation = RedHand.animation_1;
    this.animation_time = 0;
  }

  apply_force(force) {
    this.acceleration.add(force);
  }

  update_target(elapsed_time) {
    this.target_time += elapsed_time;
    if (this.target_time > RedHand.target_update_time_rate)
      this.target = RedHand.get_random_target();
  }

  update_animation(elapsed_time) {
    this.animation_time += elapsed_time;
    if (this.animation_time > RedHand.animation_update_time_rate) {
      this.animation =
        this.animation == RedHand.animation_1
          ? RedHand.animation_2
          : RedHand.animation_1;
      this.animation_time = 0;
    }
  }

  seek_target(elapsed_time) {
    let desired_vector = Vector2D.sub(this.target, this.position);
    desired_vector.normalize();
    desired_vector.mul(RedHand.speed * elapsed_time);

    let steering_force = Vector2D.sub(desired_vector, this.velocity);
    steering_force.limit(RedHand.max_force);
    this.apply_force(steering_force);
  }

  move() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(RedHand.speed);
    this.position.add(this.velocity);
    this.acceleration.reset();
  }

  update(elapsed_time) {
    this.update_target(elapsed_time);
    this.seek_target(elapsed_time);
    this.move();
    this.update_animation(elapsed_time);
  }

  draw() {
    if (
      this.position.x < -RedHand.animation_width ||
      this.position.x > canvas.width + RedHand.animation_width ||
      this.position.y < -RedHand.animation_height ||
      this.position.y > canvas.height + RedHand.animation_height
    )
      // don't bother drawing if off screen
      return;

    const angle = Math.atan2(this.velocity.y, this.velocity.x) + Math.PI;

    ctx.save();
    ctx.translate(
      this.position.x + RedHand.animation_width / 2,
      this.position.y + RedHand.animation_height / 2
    );
    ctx.rotate(angle);
    ctx.drawImage(this.animation, 0, 0);
    ctx.restore();
  }
}

function init_canvas() {
  canvas = document.getElementById("canvas-background");
  canvas.classList.add("size-handled");
  ctx = canvas.getContext("2d");

  canvas.width = document.body.scrollWidth;
  canvas.height = document.documentElement.scrollHeight;
}

window.addEventListener("load", () => {
  init_canvas();

  RedHand.init();
  let red_hands = [];
  for (let i = 0; i < RedHand.nb_red_hands; ++i) red_hands.push(new RedHand());

  let last_time;
  let elapsed_time;

  function loop(current_time) {
    if (!last_time) last_time = current_time;
    elapsed_time = current_time - last_time;
    last_time = current_time;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const red_hand of red_hands) {
      red_hand.update(elapsed_time);
      red_hand.draw();
    }
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
});

window.addEventListener("resize", () => {
  init_canvas();
});
