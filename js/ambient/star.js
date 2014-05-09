(function (window) {
    function star(x, y, size, velocity) {
        this.initialize(x, y, size, velocity);
    }
    star.prototype = new window.createjs.Shape();

    // public properties:
    star.prototype.velocity = 0;
    star.prototype.colors = [
        "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF",
        "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF",
        "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF",
        "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF",
        "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF",
        "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF",
        "#26345c", "#c0362c", "#FF0033", "#6183e8"];

    // constructor:
    star.prototype.Shape_initialize = star.prototype.initialize; //unique to avoid overiding base class

    star.prototype.initialize = function(x, y, size, velocity) {
        this.Shape_initialize();
        var randomcolor = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.graphics.beginFill(randomcolor).drawPolyStar(0, 0, size, 4, 0.8, -90);
        this.x = x;
        this.y = y;
        this.width = size;
        this.height = size;
        this.velocity = velocity;
        stage.addChild(this);
    };

    star.prototype.update = function (direction, dt) {
        var size;
        switch (direction) {
            case 'northeast':
                this.x -= dt * this.velocity / 5;
                break;
            case 'northwest':
                this.x += dt * this.velocity / 5;
                break;
            default:
                break;
        }
        if (this.direction != 'stop') {
            this.y += dt * this.velocity / 5;
        }

        //  If the star has moved from the bottom of the screen, spawn it at the top.
        if (this.y > screen_height) {
            this.x = Math.random() * screen_width;
            this.y = 0;
            size = Math.random() * 3 + 1;
            this.width = size;
            this.height = size;
            this.velocity = (Math.random() * (starfield.maxVelocity - starfield.minVelocity)) + starfield.minVelocity;
        }
        if (this.x > screen_width && direction == 'northwest') {
            this.x = 0;
            this.y = Math.random() * screen_height;
            size = Math.random() * 3 + 1;
            this.width = size;
            this.height = size;
            this.velocity = (Math.random() * (starfield.maxVelocity - starfield.minVelocity)) + starfield.minVelocity;
        }
        if (this.x < 0 - 64 && this.direction == 'northeast') {
            this.x = screen_width;
            this.y = Math.random() * screen_height;
            size = Math.random() * 3 + 1;
            this.width = size;
            this.height = size;
            this.velocity = (Math.random() * (starfield.maxVelocity - starfield.minVelocity)) + starfield.minVelocity;
        }
    };

    window.Star = star;
}(window));