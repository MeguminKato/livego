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
    var player = document.getElementById('player01');
    player.setAttribute("video-url", "/live/"+getQueryVariable("room")+".flv");
    //player.setAttribute("video-url", "static/sample-30s.mp4");
    document.title="[ "+getQueryVariable("room")+" ] 的直播间";
}

function send(){
    var msg = {msg:document.getElementById("message").value,nick:document.getElementById("nick").value};
    window.ws.send(JSON.stringify(msg));

}