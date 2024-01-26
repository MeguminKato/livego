


function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return "test";
}

window.onload = function () {
    const videoElement = document.getElementById('player01');
    const rtmp_player = webrtmpjs.createWebRTMP();
    rtmp_player.attachMediaElement(videoElement);
    rtmp_player.open(document.location.host.split(":")[0], 7002).then(()=>{
        rtmp_player.connect("live").then(()=>{                  // Application name  
            rtmp_player.play(getQueryVariable("room")).then(()=>{      // Stream name
                console.log("playing");
            })
        })
    });
    document.title="[ "+getQueryVariable("room")+" ] 的直播间";
}

function send(){
    var msg = {msg:document.getElementById("message").value,nick:document.getElementById("nick").value};
    window.ws.send(JSON.stringify(msg));

}

