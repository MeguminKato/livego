$(document).ready(function(){
   chatutils.connect();
   if(localStorage.getItem("nick")!=null){
      $("#username").html(localStorage.getItem("nick"));
   }
   $("#chatmsg").keyup(function(event){
      if(event.keyCode === 13){
         $("#button-send").click();
      }
   });
   $('.dmk-list').scroll(function(){
      if ($('.dmk-list').scrollTop() + $('.dmk-list').height() == $('.dmk-list').height()){
         chatutils.scrollLock = true;
      }else{
         chatutils.scrollLock = false;
      }
   });
});



var chatutils = {
   conn:null,
   connect:function(){
      if (window["WebSocket"]) {
         chatutils.conn = new WebSocket("wss://ddns.tohsaka.cn:9443/ws?room="+getQueryVariable("room"));
         chatutils.conn.onclose = function (evt) {
            chatutils.conn = null;
         };
         chatutils.conn.onmessage = function (evt) {
			 if(evt.data.startsWith("clients,")){
				 $("#online").html(evt.data.split(",")[1]);
				 return;
			 }
            var d = JSON.parse(evt.data);
            console.log(evt);
            chatutils.handleMsg(d);
         };
      }
   },
   room:getQueryVariable("room"),

   show:function(data){
      $(".dmk-list").append(chatutils.randombar(data));
   },
   randombar:function(data){
      var r = Math.round(Math.random() * 6);
      return "<div class=\"alert alert-"+chatutils.barid[r]+"\" role=\"alert\">"+data+"</div>"
   },
   barid : ["primary","secondary","success","danger","warning","info","dark"],
   setNick:function(){
      var nick = prompt("请输入昵称");
      if(nick!=null && nick.length>0){
         if(nick.length<3){
            alert("昵称长度不得小于3");
            return;
         }
         if(nick.length>10){
            alert("昵称长度不得大于10");
            return;
         }else{
            localStorage.setItem("nick",nick);
         }
      }else{
         return;
      }
      $("#username").html(localStorage.getItem("nick"));
   },
   checkNick:function(){
      if(localStorage.getItem("nick")==null){
         var nick = prompt("请先设置昵称");
         if(nick!=null && nick.length>0){
            if(nick.length<3){
               alert("昵称长度不得小于3");
               return;
            }
            if(nick.length>10){
               alert("昵称长度不得大于10");
               return;
            }else{
               localStorage.setItem("nick",nick);
            }
         }else{
            return;
         }

      }
      $("#username").html(localStorage.getItem("nick"));
   },
   sendMsg:function(){
      if(chatutils.conn==null){
         chatutils.show("已与聊天服务器断开连接");
         return;
      }
      chatutils.checkNick();
      var nick = localStorage.getItem("nick");
      if(nick==null || nick.trim().length<3 || nick.trim().length>10){
         return;
      }
      var msg = $("#chatmsg").val().trim();
      if(msg==null || msg.length<3){
         alert("消息长度不得小于3");
         return;
      }
      if(msg.length>100){
         alert("消息长度不得大于100");
         return;
      }
      chatutils.conn.send(JSON.stringify({nick:nick,msg:msg,room:chatutils.room}));
      $("#chatmsg").val("");
   },
   handleMsg:function(data){
      if(data.room == chatutils.room){
         chatutils.show(data.nick+": "+data.msg);
         if(!chatutils.scrollLock){
            $('.dmk-list').animate({scrollTop: 999999999999999}, 'fast');
         }
      }
   },
   scrollLock:false
}