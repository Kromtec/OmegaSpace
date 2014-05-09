(function (window) {
    function meteoroid(x, y, velocity) {
        this.initialize(x, y, velocity);
    }
    meteoroid.prototype = new window.createjs.Bitmap();

    // public properties:
    meteoroid.prototype.velocity = 0;

    meteoroid.prototype.meteoroid_images = undefined;


    // constructor:
    meteoroid.prototype.Bitmap_initialize = meteoroid.prototype.initialize; //unique to avoid overiding base class

    meteoroid.prototype.initialize = function (x, y, velocity) {
        if (this.meteoroid_images == undefined) {
            this.meteoroid_images = [window.preload.getResult("meteoroid_l01"), window.preload.getResult("meteoroid_l02"), window.preload.getResult("meteoroid_l03"),
                window.preload.getResult("meteoroid_l04"), window.preload.getResult("meteoroid_l05"), window.preload.getResult("meteoroid_m01"), window.preload.getResult("meteoroid_m02"),
                window.preload.getResult("meteoroid_m03"), window.preload.getResult("meteoroid_m04"), window.preload.getResult("meteoroid_m05"), window.preload.getResult("meteoroid_m06"),
                window.preload.getResult("meteoroid_m07"), window.preload.getResult("meteoroid_m08"), window.preload.getResult("meteoroid_s01"), window.preload.getResult("meteoroid_s02"),
                window.preload.getResult("meteoroid_s03"), window.preload.getResult("meteoroid_s04"), window.preload.getResult("meteoroid_s05")];
        }
        var random = Math.floor(Math.random() * this.meteoroid_images.length);
        var image = this.meteoroid_images[random];
        this.Bitmap_initialize(image);
        this.x = x;
        this.y = y;
        this.velocity = velocity * 2;
        stage.addChild(this);
    };

    meteoroid.prototype.update = function(direction, dt) {
        switch (direction) {
            case 'northeast':
                this.x -= dt * this.velocity;
                break;
            case 'northwest':
                this.x += dt * this.velocity;
                break;
            default:
                break;
        }
        if (direction != 'stop') {
            this.y += dt * this.velocity;
        }
    };

    window.Meteoroid = meteoroid;
}(window));