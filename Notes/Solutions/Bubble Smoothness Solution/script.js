(function () {
  "use strict";

  var lava0;
  var ge1doot = {
    screen: {
      elem: null,
      callback: null,
      ctx: null,
      init: function (id, callback, initRes) {
        this.elem = document.getElementById(id);
        this.callback = callback || null;
        if (this.elem.tagName == "CANVAS")
          this.ctx = this.elem.getContext("2d");
        window.addEventListener(
          "resize",
          function () {
            this.resize();
          }.bind(this),
          false
        );
        this.elem.onselectstart = function () {
          return false;
        };
        this.elem.ondrag = function () {
          return false;
        };
        initRes && this.resize();
        return this;
      },
      resize: function () {
        var o = this.elem;
        this.width = o.offsetWidth;
        this.height = o.offsetHeight;
        for (this.left = 0, this.top = 0; o != null; o = o.offsetParent) {
          this.left += o.offsetLeft;
          this.top += o.offsetTop;
        }
        if (this.ctx) {
          this.elem.width = this.width;
          this.elem.height = this.height;
        }
        this.callback && this.callback();
      },
    },
  };

  var Point = function (x, y) {
    this.x = x;
    this.y = y;
    this.magnitude = x * x + y * y;
    this.computed = 0;
    this.force = 0;
  };
  Point.prototype.add = function (p) {
    return new Point(this.x + p.x, this.y + p.y);
  };

  var Ball = function (parent) {
    var min = 0.1;
    var max = 1.5;
    this.vel = new Point(
      (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random() * 0.25),
      (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random())
    );
    this.pos = new Point(
      parent.width * 0.2 + Math.random() * parent.width * 0.6,
      parent.height * 0.2 + Math.random() * parent.height * 0.6
    );
    this.size =
      parent.wh / 15 + (Math.random() * (max - min) + min) * (parent.wh / 15);
    this.width = parent.width;
    this.height = parent.height;
  };

  Ball.prototype.move = function () {
    if (this.pos.x >= this.width - this.size) {
      if (this.vel.x > 0) this.vel.x = -this.vel.x;
      this.pos.x = this.width - this.size;
    } else if (this.pos.x <= this.size) {
      if (this.vel.x < 0) this.vel.x = -this.vel.x;
      this.pos.x = this.size;
    }

    if (this.pos.y >= this.height - this.size) {
      if (this.vel.y > 0) this.vel.y = -this.vel.y;
      this.pos.y = this.height - this.size;
    } else if (this.pos.y <= this.size) {
      if (this.vel.y < 0) this.vel.y = -this.vel.y;
      this.pos.y = this.size;
    }

    this.pos = this.pos.add(this.vel);
  };

  var LavaLamp = function (width, height, numBalls, c0, c1, c2, c3) {
    this.step = 5;
    this.width = width;
    this.height = height;
    this.wh = Math.min(width, height);
    this.sx = Math.floor(this.width / this.step);
    this.sy = Math.floor(this.height / this.step);
    this.paint = false;
    this.metaFill = createRadialGradient(width, height, width, c0, c1, c2, c3);
    this.plx = [0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0];
    this.ply = [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1];
    this.mscases = [0, 3, 0, 3, 1, 3, 0, 3, 2, 2, 0, 2, 1, 1, 0];
    this.ix = [1, 0, -1, 0, 0, 1, 0, -1, -1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1];
    this.grid = [];
    this.balls = [];
    this.iter = 0;
    this.sign = 1;

    for (var i = 0; i < (this.sx + 2) * (this.sy + 2); i++) {
      this.grid[i] = new Point(
        (i % (this.sx + 2)) * this.step,
        Math.floor(i / (this.sx + 2)) * this.step
      );
    }

    for (var k = 0; k < numBalls; k++) {
      this.balls[k] = new Ball(this);
    }
  };

  LavaLamp.prototype.computeForce = function (x, y, idx) {
    var force;
    var id = idx || x + y * (this.sx + 2);

    if (x === 0 || y === 0 || x === this.sx || y === this.sy) {
      force = 0.6 * this.sign;
    } else {
      force = 0;
      var cell = this.grid[id];
      var i = 0;
      var ball;
      while ((ball = this.balls[i++])) {
        force +=
          (ball.size * ball.size) /
          (-2 * cell.x * ball.pos.x -
            2 * cell.y * ball.pos.y +
            ball.pos.magnitude +
            cell.magnitude);
      }
      force *= this.sign;
    }
    this.grid[id].force = force;
    return force;
  };

  LavaLamp.prototype.marchingSquares = function (next) {
    var x = next[0];
    var y = next[1];
    var pdir = next[2];
    var id = x + y * (this.sx + 2);
    if (this.grid[id].computed === this.iter) {
      return false;
    }
    var dir,
      mscase = 0;

    for (var i = 0; i < 4; i++) {
      var idn = x + this.ix[i + 12] + (y + this.ix[i + 16]) * (this.sx + 2);
      var force = this.grid[idn].force;
      if (
        (force > 0 && this.sign < 0) ||
        (force < 0 && this.sign > 0) ||
        !force
      ) {
        force = this.computeForce(
          x + this.ix[i + 12],
          y + this.ix[i + 16],
          idn
        );
      }
      if (Math.abs(force) > 1) mscase += Math.pow(2, i);
    }
    if (mscase === 15) {
      return [x, y - 1, false];
    } else {
      if (mscase === 5) dir = pdir === 2 ? 3 : 1;
      else if (mscase === 10) dir = pdir === 3 ? 0 : 2;
      else {
        dir = this.mscases[mscase];
        this.grid[id].computed = this.iter;
      }

      var ix =
        this.step /
        (Math.abs(
          Math.abs(
            this.grid[
              x +
                this.plx[4 * dir + 2] +
                (y + this.ply[4 * dir + 2]) * (this.sx + 2)
            ].force
          ) - 1
        ) /
          Math.abs(
            Math.abs(
              this.grid[
                x +
                  this.plx[4 * dir + 3] +
                  (y + this.ply[4 * dir + 3]) * (this.sx + 2)
              ].force
            ) - 1
          ) +
          1);
      ctx.lineTo(
        this.grid[
          x + this.plx[4 * dir] + (y + this.ply[4 * dir]) * (this.sx + 2)
        ].x +
          this.ix[dir] * ix,
        this.grid[
          x +
            this.plx[4 * dir + 1] +
            (y + this.ply[4 * dir + 1]) * (this.sx + 2)
        ].y +
          this.ix[dir + 4] * ix
      );
      this.paint = true;

      return [x + this.ix[dir + 4], y + this.ix[dir + 8], dir];
    }
  };

  LavaLamp.prototype.renderMetaballs = function () {
    var i = 0,
      ball;
    while ((ball = this.balls[i++])) ball.move();

    this.iter++;
    this.sign = -this.sign;
    this.paint = false;
    ctx.fillStyle = this.metaFill;
    ctx.beginPath();

    i = 0;

    while ((ball = this.balls[i++])) {
      var next = [
        Math.round(ball.pos.x / this.step),
        Math.round(ball.pos.y / this.step),
        false,
      ];

      do {
        next = this.marchingSquares(next);
      } while (next);

      if (this.paint) {
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        this.paint = false;
      }
    }
  };

  var createRadialGradient = function (w, h, r, c0, c1, c2, c3) {
    var gradient = ctx.createRadialGradient(w / 1, h / 1, 0, w / 1, h / 1, r);
    gradient.addColorStop(0.25, c0);
    gradient.addColorStop(0.5, c1);
    gradient.addColorStop(0.75, c2);
    gradient.addColorStop(1, c3);
    return gradient;
  };

  var run = function () {
    requestAnimationFrame(run);
    ctx.clearRect(0, 0, screen.width, screen.height);
    lava0.renderMetaballs();
  };

  var screen = ge1doot.screen.init("bubble", null, true),
    ctx = screen.ctx;
  screen.resize();

  lava0 = new LavaLamp(
    screen.width,
    screen.height,
    6,
    "#E033FF",
    "#3336FF",
    "#33FCFF",
    "#FFFF33"
  );

  run();
})();
