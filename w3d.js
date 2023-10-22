class W3D {
    constructor(canvasId, width, height, customUpdate) {
      this.canvas = document.getElementById(canvasId);
      this.width = width;
      this.height = height;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.ctx = this.canvas.getContext("2d");
      this.loop = true;
      this.frameRate = 120;
      this.lastFrameTime = 0;
      this.frames = 0;
      this.mouseX = 0;
      this.mouseY = 0;
      this.mouseClicked = false;
      this.keysUp = {};
      this.keysDown = {};
  
      this.canvas.addEventListener("mousemove", (event) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = event.clientX - rect.left;
        this.mouseY = event.clientY - rect.top;
      });
      this.canvas.addEventListener("click", () => {
        this.mouseClicked = true;
      });
  
      this.onKeyUp = null;
      this.onKeyDown = null;
  
      window.addEventListener("keydown", (event) => {
        this.keysDown[event.key] = true;
        if (this.onKeyDown) {
          this.onKeyDown(event.key);
        }
      });
  
      window.addEventListener("keyup", (event) => {
        this.keysUp[event.key] = true;
        if (this.onKeyUp) {
          this.onKeyUp(event.key);
        }
  
        setTimeout(() => {
          delete this.keysUp[event.key];
        }, 100);
      });
  
      this.loopUpdate = () => {
        customUpdate();
        if (this.loop) {
          requestAnimationFrame(this.loopUpdate);
        }
      };
    }
  
    background(r, g, b) {
      this.canvas.style.backgroundColor = `rgb(${r},${g},${b})`;
    }
  
    circle(width, height, x, y, color) {
      this.ctx.beginPath();
      this.ctx.ellipse(x, y, width / 2, height / 2, 0, 0, Math.PI * 2);
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.closePath();
    }
  
    rect(x, y, width, height, color) {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x, y, width, height);
    }
  
    line(x1, y1, x2, y2, color, lineWidth = 1) {
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = lineWidth;
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  
    text(text, x, y, fontSize, color, font = "Arial") {
      this.ctx.font = `${fontSize}px ${font}`;
      this.ctx.fillStyle = color;
      this.ctx.fillText(text, x, y);
    }
  
    update() {
      this.frames++;
      const currentTime = performance.now();
      const elapsed = currentTime - this.lastFrameTime;
      if (elapsed >= 1000) {
        this.fps = ((this.frames / elapsed) * 1000).toFixed(2);
        this.frames = 0;
        this.lastFrameTime = currentTime;
      }
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      if (!this.lastFrameTime) {
        this.lastFrameTime = currentTime;
      }
      const frameElapsed = currentTime - this.lastFrameTime;
      if (frameElapsed >= 1000 / this.frameRate) {
        this.loopUpdate.call(this);
        this.lastFrameTime = currentTime;
      }
      requestAnimationFrame(this.loopUpdate);
    }
  
    clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
    start() {
      this.loop = true;
      this.lastFrameTime = 0;
      requestAnimationFrame(this.loopUpdate);
    }
  
    noLoop() {
      this.loop = false;
    }
  }
  