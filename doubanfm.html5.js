(function(){
    var makeRandomString = function (length) {
        var text = "";
        var possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < length; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };

    var doubanfmhtml5 = {
        getRequestData: function() {
            return {
                type: 'n',
                channel: -3,
                from: 'mainsite',
                r: makeRandomString(10)
            };
        },
        changeUI: function () {
            this.el = document.getElementById('fm-player');
            this.wrap = $('div.player-wrap').html('加载中...');
            this.playList();
        },
        playSound: function (songs, i) {
            var that = this;
            var song = songs[i];
            console.log(song);
            // todo change title of the page
            var html = '<img class="cover" src="'+song.picture+'">'
            var rightPanel = song.title+'<br>'+song.artist+'<br>';
            if (song.like) {
                rightPanel += '♥';
            };
            html += '<div class="r">'+rightPanel+'</div>'
            this.wrap.html(html);
            var soundfile = song.url;
            this.el.mp3 = new Audio(soundfile);
            this.el.mp3.play();
            $(this.el.mp3).bind('ended', function () {
                if (i < song.length) {
                    that.playSound(songs, i+1);
                } else {
                    console.log('end of list');
                    that.playList();
                }
            });
        },
        playList: function () {
            console.log('playList');
            var that = this;
            $.getJSON('/j/mine/playlist', doubanfmhtml5.getRequestData(), function(ret) {
                if (ret.r !== 0) {
                    alert('get playlist fail');
                    return;
                }
                that.playSound(ret.song, 0);
            });
        }
    };

    doubanfmhtml5.changeUI();
})();
