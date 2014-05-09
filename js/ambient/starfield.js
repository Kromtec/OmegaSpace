function Starfield() {

    Starfield.prototype.stars = [];
    Starfield.prototype.fps = 120;
    Starfield.prototype.minVelocity = 15;
    Starfield.prototype.maxVelocity = 30;
    Starfield.prototype.direction = 'northwest';

    Starfield.prototype.initialise = function (starcount) {
        for (var i = 0; i < starcount; i++) {
            this.stars[i] = new Star(Math.random() * screen_width, Math.random() * screen_height, Math.random() * 3 + 1,
            (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity);
        }
    };

    Starfield.prototype.update = function () {
        var dt = 1 / this.fps;
        var i;
        for (i = 0; i < this.stars.length; i++) {
            this.stars[i].update(this.direction, dt);
        }
    };
}
