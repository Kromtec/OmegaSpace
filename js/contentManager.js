// Used to download all needed resources from our
// webserver
function ContentManager() {
    // Method called back once all elements have been downloaded
    var ondownloadcompleted;

    // setting the callback method
    this.SetDownloadCompleted = function (callbackMethod) {
        ondownloadcompleted = callbackMethod;
    };

    // definitions
    var loadProgressLabel;
    var loadingBarContainer;
    var loadingBarWidth;
    var loadingBar;

    // public method to launch the download process
    this.StartDownload = function () {

        loadProgressLabel = new window.createjs.Text("", "24px Audiowide", "white");
        loadProgressLabel.lineWidth = 200;
        loadProgressLabel.textAlign = "center";
        loadProgressLabel.x = canvas.width / 2;
        loadProgressLabel.y = Math.round(window.canvas.height / 2) - 40;
        window.stage.addChild(loadProgressLabel);

        loadingBarContainer = new window.createjs.Container();
        var loadingBarHeight = 20;
        loadingBarWidth = 200;
        var loadingBarColor = window.createjs.Graphics.getRGB(255, 255, 255);
        loadingBar = new window.createjs.Shape();
        loadingBar.graphics.beginFill(loadingBarColor).drawRect(0, 0, 1, loadingBarHeight).endFill();
        var frame = new window.createjs.Shape();
        var padding = 3;
        frame.graphics.setStrokeStyle(1).beginStroke(loadingBarColor).drawRect(-padding / 2, -padding / 2, loadingBarWidth + padding, loadingBarHeight + padding);
        loadingBarContainer.addChild(loadingBar, frame);
        loadingBarContainer.x = Math.round(window.canvas.width / 2 - loadingBarWidth / 2);
        loadingBarContainer.y = Math.round(window.canvas.height / 2);
        window.stage.addChild(loadingBarContainer);

        window.preload = new window.createjs.LoadQueue(false);
        window.preload.addEventListener("complete", handleComplete);
        window.preload.addEventListener("progress", handleProgress);

        window.preload.loadManifest([
            { id: "meteoroid_l01", src: "img/meteoroids/meteoroid_l01.png" },
            { id: "meteoroid_l02", src: "img/meteoroids/meteoroid_l02.png" },
            { id: "meteoroid_l03", src: "img/meteoroids/meteoroid_l03.png" },
            { id: "meteoroid_l04", src: "img/meteoroids/meteoroid_l04.png" },
            { id: "meteoroid_l05", src: "img/meteoroids/meteoroid_l05.png" },
            { id: "meteoroid_m01", src: "img/meteoroids/meteoroid_m01.png" },
            { id: "meteoroid_m02", src: "img/meteoroids/meteoroid_m02.png" },
            { id: "meteoroid_m03", src: "img/meteoroids/meteoroid_m03.png" },
            { id: "meteoroid_m04", src: "img/meteoroids/meteoroid_m04.png" },
            { id: "meteoroid_m05", src: "img/meteoroids/meteoroid_m05.png" },
            { id: "meteoroid_m06", src: "img/meteoroids/meteoroid_m06.png" },
            { id: "meteoroid_m07", src: "img/meteoroids/meteoroid_m07.png" },
            { id: "meteoroid_m08", src: "img/meteoroids/meteoroid_m08.png" },
            { id: "meteoroid_s01", src: "img/meteoroids/meteoroid_s01.png" },
            { id: "meteoroid_s02", src: "img/meteoroids/meteoroid_s02.png" },
            { id: "meteoroid_s03", src: "img/meteoroids/meteoroid_s03.png" },
            { id: "meteoroid_s04", src: "img/meteoroids/meteoroid_s04.png" },
            { id: "meteoroid_s05", src: "img/meteoroids/meteoroid_s05.png" },
            { id: "planet_desert", src: "img/planets/planet_desert.png" },
            { id: "spacestation", src: "img/spacestation.png" },
            { id: "interior", src: "img/interior.png" },
            { id: "char_dr_arthur_e_schwartz", src: "img/characters/controlled/char_dr_arthur_e_schwartz.png" },
            { id: "portrait_dr_arthur_e_schwartz", src: "img/characters/portraits/portrait_aes.png" },
            { id: "char_prof_susannah_blake", src: "img/characters/controlled/char_prof_susannah_blake.png" },
            { id: "portrait_prof_susannah_blake", src: "img/characters/portraits/portrait_sb.png" },
            { id: "char_X-4MR", src: "img/characters/controlled/char_X-4MR.png" },
            { id: "portrait_x-4mr", src: "img/characters/portraits/portrait_x-4mr.png" },
            { id: "hostile_vorx", src: "img/characters/hostile/hostile_vorx.png" },
        ]);

        window.stage.update();
    };

    function handleProgress() {

        loadingBar.scaleX = window.preload.progress * loadingBarWidth;

        var progressPercentage = Math.round(window.preload.progress * 100);
        loadProgressLabel.text = progressPercentage + "% Loaded";

        window.stage.update();
    }

    function handleComplete() {

        //loadProgressLabel.text = "Loading complete click to start";
        window.stage.update();

        window.canvas.addEventListener("click", handleClick);
    }

    function handleClick() {
        window.stage.removeChild(loadProgressLabel, loadingBarContainer);
        window.canvas.removeEventListener("click", handleClick);

        ondownloadcompleted();
    }
}