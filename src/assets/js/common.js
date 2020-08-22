if (document.querySelectorAll('.btn-video-play').length && document.querySelectorAll('.player-box').length) {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";

    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var done = false;

    function onPlayerReady(event) {
        event.target.playVideo();

        return done = true;
    }

    var player = null;

    function onPlayerPlay() {
        player.playVideo();
    }

    document.querySelector('.btn-video-play').addEventListener('click', function () {
        document.querySelector('.player-box').style.display = "flex";

        new Promise(function (resolve, reject) {
            document.querySelector('.player-box').style.opacity = "1";

            resolve();
        }).then(function () {
            if (!done){
                player  = new YT.Player('player', {
                    videoId: 'YBMCX8ouGnY',
                    events: {
                        'onReady': onPlayerReady,
                        'onStateChange': onPlayerStateChange
                    }
                });
            } else {
                setTimeout(onPlayerPlay,10);
            }
        });
    });


    function onPlayerStateChange(event) {
        var substrate = document.querySelector('.player-box__substrate');
        var btnClose = document.querySelector('.brt-close-video');

        var listButton = [
            substrate,
            btnClose
        ];

        listButton.forEach(function (btn) {
            btn.addEventListener('click', function () {
                if (event.data == 1) {
                    setTimeout(function () {
                        event.target.pauseVideo();
                    },10)
                }

                document.querySelector('.player-box').style.opacity = "0";

                setTimeout(function () {
                    document.querySelector('.player-box').style.display = "none";
                },400);
            });
        });
    }
}