let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

function random_integer(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

class Vector2D {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  static add(vec1: Vector2D, vec2: Vector2D) {
    return new Vector2D(vec1.x + vec2.x, vec1.y + vec2.y);
  }

  add(vector: Vector2D) {
    this.x += vector.x;
    this.y += vector.y;
  }

  static sub(vec1: Vector2D, vec2: Vector2D) {
    return new Vector2D(vec1.x - vec2.x, vec1.y - vec2.y);
  }

  sub(vector: Vector2D) {
    this.x -= vector.x;
    this.y -= vector.y;
  }

  mul(scalar: number) {
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

  ceilingMagnitude(max_magnitude: number) {
    const magnitude = this.magnitude();
    this.normalize();
    this.mul(Math.min(magnitude, max_magnitude));
  }

  fixedMagnitude(magnitude: number) {
    this.normalize();
    this.mul(magnitude);
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
  static standard_update_frequence = 1000 / 60;

  static animation_update_time_rate = 100; // Every 100ms, update the animation
  static target_update_time_rate = 300; // Every 300ms, update the target (wandering behavior)

  static speed = 3;
  static steering_force = 0.025;

  static nb_red_hands = 20;
  static target_margin = 50; // Spawn targets inside the screen (50px margin) so red hand doesn't get off screen for too long

  position = RedHand.get_random_position();
  velocity = new Vector2D();
  acceleration = new Vector2D();
  target = RedHand.get_random_target();
  target_time = 0;
  animation = RedHand.animation_1;
  animation_time = 0;

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

  static relative_value(value: number, elapsed_time: number) {
    return (value / RedHand.standard_update_frequence) * elapsed_time;
  }

  apply_force(force: Vector2D) {
    this.acceleration.add(force);
  }

  update_target(elapsed_time: number) {
    this.target_time += elapsed_time;
    if (this.target_time > RedHand.target_update_time_rate) {
      this.target = RedHand.get_random_target();
      this.target_time = 0;
    }
  }

  update_animation(elapsed_time: number) {
    this.animation_time += elapsed_time;
    if (this.animation_time > RedHand.animation_update_time_rate) {
      this.animation =
        this.animation == RedHand.animation_1
          ? RedHand.animation_2
          : RedHand.animation_1;

      this.animation_time = 0;
    }
  }

  seek_target(elapsed_time: number) {
    const desired_direction = Vector2D.sub(this.target, this.position);

    const steering_force = Vector2D.sub(desired_direction, this.velocity);
    steering_force.fixedMagnitude(
      RedHand.relative_value(RedHand.steering_force, elapsed_time)
    );

    this.apply_force(steering_force);
  }

  move(elapsed_time: number) {
    this.velocity.add(this.acceleration);
    this.velocity.fixedMagnitude(
      RedHand.relative_value(RedHand.speed, elapsed_time)
    );

    this.position.add(this.velocity);
    this.acceleration.reset();
  }

  update(elapsed_time: number) {
    this.update_target(elapsed_time);
    this.seek_target(elapsed_time);
    this.move(elapsed_time);
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
  canvas = document.getElementById("canvas-background") as HTMLCanvasElement;
  canvas.classList.add("size-handled");
  ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  canvas.width = document.body.scrollWidth;
  canvas.height = document.documentElement.scrollHeight;
}

window.addEventListener("load", () => {
  init_canvas();

  RedHand.init();
  const red_hands: RedHand[] = [];
  for (let i = 0; i < RedHand.nb_red_hands; ++i) red_hands.push(new RedHand());

  let last_time: number;
  let elapsed_time: number;

  function loop(current_time: number) {
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
