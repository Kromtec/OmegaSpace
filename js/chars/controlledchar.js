(function (window) {
    function controlledchar(name, profession, spriteimage, portrait, startTileX, startTileY) {
        this.initialize(name, profession, spriteimage, portrait, startTileX, startTileY);
    }
    controlledchar.prototype = new window.createjs.Container();

    this.walk_queue = [];

    controlledchar.prototype.walkspeed = 48;

    // constructor:
    controlledchar.prototype.Container_initialize = controlledchar.prototype.initialize;

    controlledchar.prototype.initialize = function (name, profession, spriteimage, portrait, startTileX, startTileY) {
        this.Container_initialize();

        this.tileX = startTileX;
        this.tileY = startTileY;
        this.name = name;
        this.profession = profession;
        this.portrait = portrait;

        var spriteSheet = new window.createjs.SpriteSheet({
            framerate: 10,
            images: [spriteimage],
            frames: { width: TILESIZE, height: TILESIZE },
            animations: {
                idle: [0],
                walk_down: [0, 3, true, 0.1],
                walk_right: [4, 7, true, 0.1],
                walk_up: [8, 11, true, 0.1],
                walk_left: [12, 15, true, 0.1]
            }
        });

        this.charsprite = new window.createjs.Sprite(spriteSheet, "idle");
        this.charsprite.shadow = new window.createjs.Shadow("#686755", 2, 0, 5);
        this.addChild(this.charsprite);

        this.healthbar = new window.createjs.Shape();
        this.healthbar.graphics.beginStroke("#000000").beginFill("red").drawRect(TILESIZE / 4, 0, TILESIZE / 2, 4);
        this.addChild(this.healthbar);

        this.setTransform(startTileX * TILESIZE, startTileY * TILESIZE);

        this.isSelected = false;
        this.isHover = false;

        this.addEventListener("mouseover", handleMouseOver);
        this.addEventListener("mouseout", handleMouseOut);
        this.addEventListener("click", handleClick);
        window.stage.addChild(this);
    };

    controlledchar.prototype.update = function (event) {
        this.healthbar.visible = this.isHover || this.isSelected;
        if (this.isSelected) {
            this.shadow = new window.createjs.Shadow("greenyellow", 0, 0, 10);
        } else {
            this.shadow = undefined;
        }

        if (this.walk_queue != undefined && this.walk_queue.length > 0) {
            var nextstop = this.walk_queue[0];
            var newstop;
            if (this.charsprite.currentAnimation == "walk_down") {
                this.y += this.walkspeed * (event.delta / 1000);
                if (this.y > nextstop[1] * TILESIZE) {
                    this.tileX = nextstop[0];
                    this.tileY = nextstop[1];
                    this.walk_queue.splice(0, 1);
                    if (this.walk_queue.length > 0) {
                        newstop = this.walk_queue[0];
                        if (this.tileX < newstop[0]) {
                            this.charsprite.gotoAndPlay("walk_right");
                        }
                        else if (this.tileX > newstop[0]) {
                            this.charsprite.gotoAndPlay("walk_left");
                        }
                        else if (this.tileY < newstop[1]) {
                            this.charsprite.gotoAndPlay("walk_down");
                        }
                        else if (this.tileY > newstop[1]) {
                            this.charsprite.gotoAndPlay("walk_up");
                        }
                    }
                }
            }
            else if (this.charsprite.currentAnimation == "walk_up") {
                this.y -= this.walkspeed * (event.delta / 1000);
                if (this.y < nextstop[1] * TILESIZE) {
                    this.tileX = nextstop[0];
                    this.tileY = nextstop[1];
                    this.walk_queue.splice(0, 1);
                    if (this.walk_queue.length > 0) {
                        newstop = this.walk_queue[0];
                        if (this.tileX < newstop[0]) {
                            this.charsprite.gotoAndPlay("walk_right");
                        }
                        else if (this.tileX > newstop[0]) {
                            this.charsprite.gotoAndPlay("walk_left");
                        }
                        else if (this.tileY < newstop[1]) {
                            this.charsprite.gotoAndPlay("walk_down");
                        }
                        else if (this.tileY > newstop[1]) {
                            this.charsprite.gotoAndPlay("walk_up");
                        }
                    }
                }
            }
            else if (this.charsprite.currentAnimation == "walk_right") {
                this.x += this.walkspeed * (event.delta / 1000);
                if (this.x > nextstop[0] * TILESIZE) {
                    this.tileX = nextstop[0];
                    this.tileY = nextstop[1];
                    this.walk_queue.splice(0, 1);
                    if (this.walk_queue.length > 0) {
                        newstop = this.walk_queue[0];
                        if (this.tileX < newstop[0]) {
                            this.charsprite.gotoAndPlay("walk_right");
                        }
                        else if (this.tileX > newstop[0]) {
                            this.charsprite.gotoAndPlay("walk_left");
                        }
                        else if (this.tileY < newstop[1]) {
                            this.charsprite.gotoAndPlay("walk_down");
                        }
                        else if (this.tileY > newstop[1]) {
                            this.charsprite.gotoAndPlay("walk_up");
                        }
                    }
                }
            }
            else if (this.charsprite.currentAnimation == "walk_left") {
                this.x -= this.walkspeed * (event.delta / 1000);
                if (this.x < nextstop[0] * TILESIZE) {
                    this.tileX = nextstop[0];
                    this.tileY = nextstop[1];
                    this.walk_queue.splice(0, 1);
                    if (this.walk_queue.length > 0) {
                        newstop = this.walk_queue[0];
                        if (this.tileX < newstop[0]) {
                            this.charsprite.gotoAndPlay("walk_right");
                        }
                        else if (this.tileX > newstop[0]) {
                            this.charsprite.gotoAndPlay("walk_left");
                        }
                        else if (this.tileY < newstop[1]) {
                            this.charsprite.gotoAndPlay("walk_down");
                        }
                        else if (this.tileY > newstop[1]) {
                            this.charsprite.gotoAndPlay("walk_up");
                        }
                    }
                }
            } else {
                newstop = nextstop;
                if (this.tileX < newstop[0]) {
                    this.charsprite.gotoAndPlay("walk_right");
                }
                else if (this.tileX > newstop[0]) {
                    this.charsprite.gotoAndPlay("walk_left");
                }
                else if (this.tileY < newstop[1]) {
                    this.charsprite.gotoAndPlay("walk_down");
                }
                else if (this.tileY > newstop[1]) {
                    this.charsprite.gotoAndPlay("walk_up");
                }
            }
        } else {
            this.charsprite.gotoAndPlay("idle");
        }
    };

    function handleMouseOver(event) {
        event.currentTarget.isHover = true;
    }
    function handleMouseOut(event) {
        event.currentTarget.isHover = false;
    }
    function handleClick(event) {
        event.currentTarget.isSelected = !event.currentTarget.isSelected;
        for (var i = 0; i < this.spacestation.controlledchars.length; i++) {
            if (this.spacestation.controlledchars[i].id != event.currentTarget.id) {
                this.spacestation.controlledchars[i].isSelected = false;
            }
        }

        var charPanel = $('#char_panel');
        if (!event.currentTarget.isSelected) {
            charPanel.hide("slide", { direction: 'right' }, 1000);
        } else {
            $('#char_portrait').attr("src", event.currentTarget.portrait.src);
            $('#char_name').text(event.currentTarget.name);
            $('#char_class').text(event.currentTarget.profession);
            charPanel.show("slide", { direction: 'right' }, 1000);
        }
    }

    window.ControlledChar = controlledchar;
}(window));