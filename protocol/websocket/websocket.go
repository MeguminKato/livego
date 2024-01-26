package websocket

import (
	"github.com/gwuhaolin/livego/av"
	"github.com/gwuhaolin/livego/protocol/rtmp"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	"golang.org/x/net/websocket"
	"io"
	"net"
	"net/http"
)

type Server struct {
	handler av.Handler
}

var rtmp_addr string

func NewServer(h av.Handler) *Server {
	return &Server{
		handler: h,
	}
}

func (server *Server) ServWebsocket(stream *rtmp.RtmpStream, config *viper.Viper) {
	var certFile string = config.GetString("ws_cert")
	var keyFile string = config.GetString("ws_key")
	var port string = config.GetString("ws_addr")
	rtmp_addr = config.GetString("ws_dst")
	http.Handle("/", websocket.Handler(server.relayHandler))
	var listener, _ = net.Listen("tcp", port)
	var err error
	if certFile != "" && keyFile != "" {
		err = http.ServeTLS(listener, nil, certFile, keyFile)
	} else {
		err = http.Serve(listener, nil)
	}
	if err != nil {
		log.Fatal(err)
	}
}

func copyWorker(dst io.Writer, src io.Reader, doneCh chan<- bool) {
	io.Copy(dst, src)
	doneCh <- true
}

func (server *Server) relayHandler(ws *websocket.Conn) {
	conn, err := net.Dial("tcp", rtmp_addr)
	if err != nil {
		log.Printf("[ERROR] %v \n", err)
		return
	}

	ws.PayloadType = websocket.BinaryFrame

	doneCh := make(chan bool)

	go copyWorker(conn, ws, doneCh)
	go copyWorker(ws, conn, doneCh)

	<-doneCh
	conn.Close()
	ws.Close()
	<-doneCh
}
