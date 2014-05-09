function MeteoroidField() {

    this.meteoroids = [];
    MeteoroidField.prototype.fps = 120;
    MeteoroidField.prototype.minVelocity = 15;
    MeteoroidField.prototype.maxVelocity = 30;
    MeteoroidField.prototype.direction = 'northwest';

    MeteoroidField.prototype.lfHeld = false;
    MeteoroidField.prototype.rtHeld = false;
    MeteoroidField.prototype.fwHeld = false;
    MeteoroidField.prototype.bkHeld = false;

    MeteoroidField.prototype.navspeed = 128 * 1.5;

    MeteoroidField.prototype.initialise = function (meteoroidcount) {
        for (var i = 0; i < meteoroidcount; i++) {
            this.meteoroids[i] = new Meteoroid(Math.random() * screen_width, Math.random() * screen_height, (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity);
        }
    };

    MeteoroidField.prototype.update = function (event) {
        

        var dt = 1 / this.fps;
        var i;
        for (i = 0; i < this.meteoroids.length; i++) {
            var meteoroid = this.meteoroids[i];

            meteoroid.update(this.direction, dt);
            
            if (this.lfHeld) {
                meteoroid.x += this.navspeed * (event.delta / 1000);
            }
            if (this.rtHeld) {
                meteoroid.x -= this.navspeed * (event.delta / 1000);
            }
            if (this.fwHeld) {
                meteoroid.y += this.navspeed * (event.delta / 1000);
            }
            if (this.bkHeld) {
                meteoroid.y -= this.navspeed * (event.delta / 1000);
            }

            if (meteoroid.y > screen_height) {
                stage.removeChild(meteoroid);
                meteoroid = new Meteoroid(Math.random() * screen_width, 0 - 64, (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity);
                this.meteoroids[i] = meteoroid;
            }
            if (meteoroid.x > screen_width && this.direction == 'northwest') {
                stage.removeChild(meteoroid);
                meteoroid = new Meteoroid(0 - 64, Math.random() * screen_height, (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity);
                this.meteoroids[i] = meteoroid;
            }
            if (meteoroid.x < 0 - 64 && this.direction == 'northeast') {
                stage.removeChild(meteoroid);
                meteoroid = new Meteoroid(screen_width + 64, Math.random() * screen_height, (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity);
                this.meteoroids[i] = meteoroid;
            }
        }
    };
}
