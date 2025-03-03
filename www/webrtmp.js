!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.webrtmpjs = t() : e.webrtmpjs = t()
}(this, (() => (() => {
    "use strict";
    var e = {
        477: e => {
            e.exports = function (e, t, s, i) {
                var a = self || window;
                try {
                    try {
                        var n;
                        try {
                            n = new a.Blob([e])
                        } catch (t) {
                            (n = new (a.BlobBuilder || a.WebKitBlobBuilder || a.MozBlobBuilder || a.MSBlobBuilder)).append(e), n = n.getBlob()
                        }
                        var r = a.URL || a.webkitURL, o = r.createObjectURL(n), h = new a[t](o, s);
                        return r.revokeObjectURL(o), h
                    } catch (i) {
                        return new a[t]("data:application/javascript,".concat(encodeURIComponent(e)), s)
                    }
                } catch (e) {
                    if (!i) throw Error("Inline worker is not supported");
                    return new a[t](i, s)
                }
            }
        }
    }, t = {};

    function s(i) {
        var a = t[i];
        if (void 0 !== a) return a.exports;
        var n = t[i] = {exports: {}};
        return e[i](n, n.exports, s), n.exports
    }

    s.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return s.d(t, {a: t}), t
    }, s.d = (e, t) => {
        for (var i in t) s.o(t, i) && !s.o(e, i) && Object.defineProperty(e, i, {enumerable: !0, get: t[i]})
    }, s.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), s.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    };
    var a = {};
    return (() => {
        s.r(a), s.d(a, {WebRTMP: () => S, createWebRTMP: () => y});

        class e {
            static OFF = -1;
            static TRACE = 0;
            static DEBUG = 1;
            static INFO = 2;
            static WARN = 3;
            static ERROR = 4;
            static CRITICAL = 5;
            static WITH_STACKTRACE = !0;
            static LEVEL = e.INFO;
            static loglevels = {};
            static _output = function (t, s, ...i) {
                let a = e.LEVEL;
                try {
                    e.loglevels[s] && (a = e.loglevels[s])
                } catch (e) {
                    return
                }
                if (a === e.OFF) return;
                if (a > t) return;
                const n = e._getStackTrace();
                n.shift(), n.shift();
                let r = "color: silver";
                switch (t) {
                    case e.TRACE:
                        r = "background-color: gray";
                        break;
                    case e.DEBUG:
                        break;
                    case e.INFO:
                        r = "color: green";
                        break;
                    case e.WARN:
                        r = "color: orange; background-color: #EAA80035";
                        break;
                    case e.ERROR:
                        r = "color: red; background-color: #FF000020";
                        break;
                    case e.CRITICAL:
                        r = "color: red"
                }
                e._print(n, r, s, ...i)
            };

            static _print(t, s, i, ...a) {
                if (e.WITH_STACKTRACE) {
                    e.LEVEL === e.ERROR ? console.group("%c[" + i + "]", s, ...a) : console.groupCollapsed("%c[" + i + "]", s, ...a);
                    for (let e = 0; e < t.length; e++) console.log("%c" + t[e], s);
                    console.groupEnd()
                } else console.log("%c[" + i + "]", s, ...a)
            }

            static _getStackTrace = function () {
                let e = [];
                try {
                    i.dont.exist += 0
                } catch (t) {
                    if (t.stack) {
                        let s = t.stack.split("\n");
                        for (let t = 0; t < s.length; t++) e.push(s[t]);
                        e.shift(), e.shift()
                    }
                }
                return e
            };

            static c(t, ...s) {
                e._output(e.CRITICAL, t, ...s)
            }

            static e(t, ...s) {
                e._output(e.ERROR, t, ...s)
            }

            static i(t, ...s) {
                e._output(e.INFO, t, ...s)
            }

            static w(t, ...s) {
                e._output(e.WARN, t, ...s)
            }

            static d(t, ...s) {
                e._output(e.DEBUG, t, ...s)
            }

            static v(t, ...s) {
                e._output(e.DEBUG, t, ...s)
            }

            static t(t, ...s) {
                e._output(e.TRACE, t, ...s)
            }
        }

        const t = e, n = class {
            ListenerList = [];
            TAG = "EventEmitter";
            waiters = [];

            constructor() {
            }

            addEventListener(e, s, i = !1) {
                t.d(this.TAG, "addEventListener: " + e);
                for (let a = 0; a < this.ListenerList.length; a++) {
                    let n = this.ListenerList[a];
                    if (n[0] === e && (i || n[1] === s)) return void t.w(this.TAG, "Listener already registered, overriding")
                }
                this.ListenerList.push([e, s])
            }

            waitForEvent(e, t) {
                this.waiters.push([e, t])
            }

            addListener(e, t, s) {
                this.addEventListener(e, t, s)
            }

            removeEventListener(e, s) {
                t.d(this.TAG, "removeEventListener: " + e);
                for (let t = 0; t < this.ListenerList.length; t++) {
                    let i = this.ListenerList[t];
                    if (i[0] === e && i[1] === s) return void this.ListenerList.splice(t, 1)
                }
            }

            removeListener(e, t) {
                this.removeEventListener(e, t)
            }

            removeAllEventListener(e) {
                if (t.d(this.TAG, "removeAllEventListener: ", e), e) for (let t = 0; t < this.ListenerList.length; t++) this.ListenerList[t][0] === e && (this.ListenerList.splice(t, 1), t--); else this.ListenerList = []
            }

            removeAllListener(e) {
                this.removeAllEventListener(e)
            }

            emit(e, ...s) {
                t.t(this.TAG, "emit EVENT: " + e, ...s);
                for (let i = 0; i < this.waiters.length; i++) {
                    let a = this.waiters[i];
                    a[0] === e && (t.d(this.TAG, "hit waiting event: " + e), a[1].call(this, ...s), this.waiters.splice(i, 1), i--)
                }
                for (let t = 0; t < this.ListenerList.length; t++) {
                    let i = this.ListenerList[t];
                    i[0] === e && i[1].call(this, ...s)
                }
            }
        };

        class r {
            constructor() {
                this._list = []
            }

            clear() {
                this._list = []
            }

            appendArray(e) {
                let t = this._list;
                0 !== e.length && (t.length > 0 && e[0].originalDts < t[t.length - 1].originalDts && this.clear(), Array.prototype.push.apply(t, e))
            }

            getLastSyncPointBeforeDts(e) {
                if (0 === this._list.length) return null;
                let t = this._list, s = 0, i = t.length - 1, a = 0, n = 0, r = i;
                for (e < t[0].dts && (s = 0, n = r + 1); n <= r;) {
                    if (a = n + Math.floor((r - n) / 2), a === i || e >= t[a].dts && e < t[a + 1].dts) {
                        s = a;
                        break
                    }
                    t[a].dts < e ? n = a + 1 : r = a - 1
                }
                return this._list[s]
            }
        }

        class o {
            constructor(e) {
                this._message = e
            }

            get name() {
                return "RuntimeException"
            }

            get message() {
                return this._message
            }

            toString() {
                return this.name + ": " + this.message
            }
        }

        class h extends o {
            constructor(e) {
                super(e)
            }

            get name() {
                return "IllegalStateException"
            }
        }

        const d = {
            enableStashBuffer: !0,
            stashInitialSize: void 0,
            isLive: !0,
            autoCleanupSourceBuffer: !0,
            autoCleanupMaxBackwardDuration: 180,
            autoCleanupMinBackwardDuration: 120,
            statisticsInfoReportInterval: 600,
            fixAudioTimestampGap: !0,
            headers: void 0
        }, l = "init_segment", c = "media_segment", u = "error", m = "buffer_full";
        let p = {};
        !function () {
            let e = self.navigator.userAgent.toLowerCase(),
                t = /(edge)\/([\w.]+)/.exec(e) || /(opr)[\/]([\w.]+)/.exec(e) || /(chrome)[ \/]([\w.]+)/.exec(e) || /(iemobile)[\/]([\w.]+)/.exec(e) || /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(firefox)[ \/]([\w.]+)/.exec(e) || [],
                s = /(ipad)/.exec(e) || /(ipod)/.exec(e) || /(windows phone)/.exec(e) || /(iphone)/.exec(e) || /(kindle)/.exec(e) || /(android)/.exec(e) || /(windows)/.exec(e) || /(mac)/.exec(e) || /(linux)/.exec(e) || /(cros)/.exec(e) || [],
                i = {
                    browser: t[5] || t[3] || t[1] || "",
                    version: t[2] || t[4] || "0",
                    majorVersion: t[4] || t[2] || "0",
                    platform: s[0] || ""
                }, a = {};
            if (i.browser) {
                a[i.browser] = !0;
                let e = i.majorVersion.split(".");
                a.version = {
                    major: parseInt(i.majorVersion, 10),
                    string: i.version
                }, e.length > 1 && (a.version.minor = parseInt(e[1], 10)), e.length > 2 && (a.version.build = parseInt(e[2], 10))
            }
            if (i.platform && (a[i.platform] = !0), (a.chrome || a.opr || a.safari) && (a.webkit = !0), a.rv || a.iemobile) {
                a.rv && delete a.rv;
                let e = "msie";
                i.browser = e, a[e] = !0
            }
            if (a.edge) {
                delete a.edge;
                let e = "msedge";
                i.browser = e, a[e] = !0
            }
            if (a.opr) {
                let e = "opera";
                i.browser = e, a[e] = !0
            }
            if (a.safari && a.android) {
                let e = "android";
                i.browser = e, a[e] = !0
            }
            a.name = i.browser, a.platform = i.platform;
            for (let e in p) p.hasOwnProperty(e) && delete p[e];
            Object.assign(p, a)
        }();
        const g = p;
        var _ = s(477), f = s.n(_);

        function v() {
            return f()('(()=>{"use strict";class e{static OFF=-1;static TRACE=0;static DEBUG=1;static INFO=2;static WARN=3;static ERROR=4;static CRITICAL=5;static WITH_STACKTRACE=!0;static LEVEL=e.INFO;static loglevels={};static _output=function(t,s,...a){let i=e.LEVEL;try{e.loglevels[s]&&(i=e.loglevels[s])}catch(e){return}if(i===e.OFF)return;if(i>t)return;const n=e._getStackTrace();n.shift(),n.shift();let r="color: silver";switch(t){case e.TRACE:r="background-color: gray";break;case e.DEBUG:break;case e.INFO:r="color: green";break;case e.WARN:r="color: orange; background-color: #EAA80035";break;case e.ERROR:r="color: red; background-color: #FF000020";break;case e.CRITICAL:r="color: red"}e._print(n,r,s,...a)};static _print(t,s,a,...i){if(e.WITH_STACKTRACE){e.LEVEL===e.ERROR?console.group("%c["+a+"]",s,...i):console.groupCollapsed("%c["+a+"]",s,...i);for(let e=0;e<t.length;e++)console.log("%c"+t[e],s);console.groupEnd()}else console.log("%c["+a+"]",s,...i)}static _getStackTrace=function(){let e=[];try{i.dont.exist+=0}catch(t){if(t.stack){let s=t.stack.split("\\n");for(let t=0;t<s.length;t++)e.push(s[t]);e.shift(),e.shift()}}return e};static c(t,...s){e._output(e.CRITICAL,t,...s)}static e(t,...s){e._output(e.ERROR,t,...s)}static i(t,...s){e._output(e.INFO,t,...s)}static w(t,...s){e._output(e.WARN,t,...s)}static d(t,...s){e._output(e.DEBUG,t,...s)}static v(t,...s){e._output(e.DEBUG,t,...s)}static t(t,...s){e._output(e.TRACE,t,...s)}}const t=e;function s(...e){const t=new Uint8Array(e.reduce(((e,t)=>e+t.byteLength),0));return e.reduce(((e,s)=>(t.set(s,e),e+s.byteLength)),0),t}function a(e){const t=[];for(let s=0;s<e.length;s++){const a=e.charCodeAt(s);a>255&&t.push(a>>>8),t.push(255&a)}return t}function n(e){const t=new ArrayBuffer(8);return new DataView(t).setFloat64(0,e,!1),[].slice.call(new Uint8Array(t))}function r(e){let t=new ArrayBuffer(e.length),s=new DataView(t);return e.forEach((function(e,t){s.setUint8(t,e)})),s.getFloat64(0)}function o(e){let t="";for(let s=0;s<e.length;s++)t+=String.fromCharCode(e[s]);return t}const h={enableStashBuffer:!0,stashInitialSize:void 0,isLive:!0,autoCleanupSourceBuffer:!0,autoCleanupMaxBackwardDuration:180,autoCleanupMinBackwardDuration:120,statisticsInfoReportInterval:600,fixAudioTimestampGap:!0,headers:void 0},d="FormatError",l="CodecUnsupported",c=class{TAG="RTMPMessage";static MessageTypes=["dummy","PCMSetChunkSize","PCMAbortMessage","PCMAcknolegement","UserControlMessage","WindowAcknowledgementSize","PCMSetPeerBandwidth","dummy","AudioMessage","VideoMessage","dummy","dummy","dummy","dummy","dummy","DataMessageAMF3","Shared Object Message AMF3","CommandMessageAMF3","DataMessageAMF0","SharedObjectMessageAMF0","CommandMessageAMF0","dummy","Aggregate Message"];messageType;messageLength=0;length=0;timestamp=0;extendedTimestamp=!1;message_stream_id=0;payload=new Uint8Array(0);constructor(e){e&&(this.setMessageLength(e.length),this.addPayload(e))}clearPayload(){this.payload=new Uint8Array(0)}getBytes(){return this.header=new Uint8Array(11),this.header[0]=this.messageType,this.header[1]=this.length>>>16,this.header[2]=this.length>>>8,this.header[3]=this.length,this.header[4]=this.timestamp>>>24,this.header[5]=this.timestamp>>>16,this.header[6]=this.timestamp>>>8,this.header[7]=this.timestamp,this.header[8]=this.message_stream_id>>>16,this.header[9]=this.message_stream_id>>>8,this.header[10]=this.message_stream_id,s(this.header,this.payload)}setMessageType(e){switch(this.messageType=e,e){case 1:case 2:case 3:case 4:case 5:case 6:this.message_stream_id=0}}getMessageType(){return this.messageType}getMessageStreamID(){return this.message_stream_id}setMessageStreamID(e){this.message_stream_id=e}getPayloadlength(){return this.payload.length}getTimestamp(){return this.timestamp}setMessageTimestamp(e){t.v(this.TAG,"TS: "+e),this.timestamp=e}setExtendedTimestamp(e){t.w(this.TAG,"setExtendedTimestamp"),this.extendedTimestamp=e}getExtendedTimestamp(){return this.extendedTimestamp}setTimestampDelta(e){t.v(this.TAG,"TS: "+this.timestamp+" Delta: "+e),this.timestamp+=e}addPayload(e){e.length>this.bytesMissing()?t.e(this.TAG,"try to add too much data"):(this.payload=s(this.payload,e),this.length=this.payload.length,t.d(this.TAG,"[ RTMPMessage ] payload size is now: "+this.length))}getPayload(){return this.payload}setMessageLength(e){this.messageLength=e}getMessageLength(){return this.messageLength}isComplete(){return this.payload.length===this.messageLength}bytesMissing(){return this.messageLength-this.payload.length}},u=class{TAG="Chunk";chunk_stream_id=0;length;message_type;message_stream_id=0;timestamp;CHUNK_SIZE=128;payload;constructor(e){this.payload=e.getPayload(),this.length=this.payload.length,this.message_type=e.getMessageType(),this.message_stream_id=e.getMessageStreamID()}getBytes(){let e=new Uint8Array(this.payload),a=new Uint8Array(0),i=0;do{t.d(this.TAG,"create chunk: "+e.length),a=s(a,this._getHeaderBytes(i),e.slice(0,this.CHUNK_SIZE)),e=e.slice(this.CHUNK_SIZE),i=3}while(e.length>0);return a}_getHeaderBytes(e){let t,a;switch(this.chunk_stream_id<63?(t=new Uint8Array(1),t[0]=e<<6|this.chunk_stream_id):this.chunk_stream_id<65599?(t=new Uint8Array(2),t[0]=e<<6,t[1]=this.chunk_stream_id-64):(t=new Uint8Array(3),t[0]=e<<6|63,t[1]=this.chunk_stream_id-64>>>8,t[2]=this.chunk_stream_id-64),e){case 0:a=new Uint8Array(11),a[0]=this.timestamp>>>16,a[1]=this.timestamp>>>8,a[2]=this.timestamp,a[3]=this.length>>>16,a[4]=this.length>>>8,a[5]=this.length,a[6]=this.message_type,a[7]=this.message_stream_id>>>24,a[8]=this.message_stream_id>>>16,a[9]=this.message_stream_id>>>8,a[10]=this.message_stream_id;break;case 1:a=new Uint8Array(7),a[0]=this.timestamp>>>16,a[1]=this.timestamp>>>8,a[2]=this.timestamp,a[3]=this.length>>>16,a[4]=this.length>>>8,a[5]=this.length,a[6]=this.message_type;break;case 2:a=new Uint8Array(3),a[0]=this.timestamp>>>16,a[1]=this.timestamp>>>8,a[2]=this.timestamp;break;case 3:a=new Uint8Array(0)}return s(t,a)}getPayload(){return this.payload}getMessageType(){return this.message_type}getMessageStreamID(){return this.message_stream_id}setChunkSize(e){this.CHUNK_SIZE=e}setChunkStreamID(e){t.d(this.TAG,"setChunkStreamID:"+e),this.chunk_stream_id=e}setMessageStreamID(e){this.message_stream_id=e}setTimestamp(e){this.timestamp=e}};class m{event_type;event_data1;event_data2;static events=["StreamBegin","StreamEOF","StreamDry","SetBuffer","StreamIsRecorded","dummy","PingRequest","PingResponse"];getBytes(){let e;return this.event_data2?(e=new Uint8Array(10),e[0]=this.event_type>>>8,e[1]=this.event_type,e[2]=this.event_data1>>>24,e[3]=this.event_data1>>>16,e[4]=this.event_data1>>>8,e[5]=this.event_data1,e[6]=this.event_data2>>>24,e[7]=this.event_data2>>>16,e[8]=this.event_data2>>>8,e[9]=this.event_data2):(e=new Uint8Array(6),e[0]=this.event_type>>>8,e[1]=this.event_type,e[2]=this.event_data1>>>24,e[3]=this.event_data1>>>16,e[4]=this.event_data1>>>8,e[5]=this.event_data1),e}getEventMessage(){let e={};return 3===this.event_type?e[m.events[this.event_type]]=[this.event_data1,this.event_data2]:e[m.events[this.event_type]]=this.event_data1,e}setType(e){this.event_type=e}setEventData(e){this.event_data1=e}}const g=m;class p{TAG="ProtocolControlMessage";pcm_type;data;static pcm_types=["dummy","SetChunkSize","AbortMessage","Acknowledgement","UserControlMessage","WindowAcknowledgementSize","SetPeerBandwidth"];constructor(e,s){switch(e){case 1:case 2:case 3:case 5:this.pcm_type=e,this.data=s[0]<<24|s[1]<<16|s[2]<<8|s[3];break;case 6:t.w(this.TAG,"Protocol Control Message Type: "+e+" use SetPeerBandwidthMessage");break;default:t.e(this.TAG,"Protocol Control Message Type: "+e+" not supported")}}setPayload(e){this.data=e}getEventMessage(){let e={};return e[p.pcm_types[this.pcm_type]]=this.data,e}getBytes(){let e=[];return e[0]=this.data>>>24,e[1]=this.data>>>16,e[2]=this.data>>>8,e[3]=this.data,new Uint8Array(e)}}const _=p;class f{constructor(e){this._message=e}get name(){return"RuntimeException"}get message(){return this._message}toString(){return this.name+": "+this.message}}class y extends f{constructor(e){super(e)}get name(){return"IllegalStateException"}}class A extends f{constructor(e){super(e)}get name(){return"InvalidArgumentException"}}function S(e,t,s){let a=e;if(t+s<a.length){for(;s--;)if(128!=(192&a[++t]))return!1;return!0}return!1}function v(e){let t=[],s=e,a=0,i=e.length;for(;a<i;)if(s[a]<128)t.push(String.fromCharCode(s[a])),++a;else{if(s[a]<192);else if(s[a]<224){if(S(s,a,1)){let e=(31&s[a])<<6|63&s[a+1];if(e>=128){t.push(String.fromCharCode(65535&e)),a+=2;continue}}}else if(s[a]<240){if(S(s,a,2)){let e=(15&s[a])<<12|(63&s[a+1])<<6|63&s[a+2];if(e>=2048&&55296!=(63488&e)){t.push(String.fromCharCode(65535&e)),a+=3;continue}}}else if(s[a]<248&&S(s,a,3)){let e=(7&s[a])<<18|(63&s[a+1])<<12|(63&s[a+2])<<6|63&s[a+3];if(e>65536&&e<1114112){e-=65536,t.push(String.fromCharCode(e>>>10|55296)),t.push(String.fromCharCode(1023&e|56320)),a+=4;continue}}t.push(String.fromCharCode(65533)),++a}return t.join("")}let w=function(){let e=new ArrayBuffer(2);return new DataView(e).setInt16(0,256,!0),256===new Int16Array(e)[0]}();class b{static TAG="AMF";static parseScriptData(e){t.d(this.TAG,e);let s={};try{let a=b.parseValue(e);t.d(this.TAG,a);let i=b.parseValue(e.slice(a.size));t.d(this.TAG,i),s[a.data]=i.data}catch(e){t.w(this.TAG,e.toString())}return s}static parseObject(e){if(e.length<3)throw new y("Data not enough when parse ScriptDataObject");let t=b.parseString(e),s=b.parseValue(e.slice(t.size,e.length-t.size)),a=s.objectEnd;return{data:{name:t.data,value:s.data},size:t.size+s.size,objectEnd:a}}static parseVariable(e){return b.parseObject(e)}static parseString(e){if(e.length<2)throw new y("Data not enough when parse String");let t,s=new DataView(e.buffer).getUint16(0,!w);return t=s>0?v(new Uint8Array(e.slice(2,2+s))):"",{data:t,size:2+s}}static parseLongString(e){if(e.length()<4)throw new y("Data not enough when parse LongString");let t,s=new DataView(e.buffer).getUint32(0,!w);return t=s>0?v(new Uint8Array(e.slice(4,4+s))):"",{data:t,size:4+s}}static parseDate(e){if(e.length()<10)throw new y("Data size invalid when parse Date");let t=new DataView(e.buffer),s=t.getFloat64(0,!w);return s+=60*t.getInt16(8,!w)*1e3,{data:new Date(s),size:10}}static parseValue(e){if(e.length<1)throw new y("Data not enough when parse Value");let s,a=new DataView(e.buffer),i=1,n=a.getUint8(0),r=!1;try{switch(n){case 0:s=a.getFloat64(1,!w),i+=8;break;case 1:s=!!a.getUint8(1),i+=1;break;case 2:{let t=b.parseString(e.slice(1));s=t.data,i+=t.size;break}case 3:{s={};let t=0;for(9==(16777215&a.getUint32(e.length-4,!w))&&(t=3);i<e.length-4;){let a=b.parseObject(e.slice(i,i+e.length-t));if(a.objectEnd)break;s[a.data.name]=a.data.value,i+=a.size}i<=e.length-3&&9==(16777215&a.getUint32(i-1,!w))&&(i+=3);break}case 8:{s={},i+=4;let t=0;for(9==(16777215&a.getUint32(e.length-4,!w))&&(t=3);i<e.length-8;){let a=b.parseVariable(e.slice(i,i+e.length-t));if(a.objectEnd)break;s[a.data.name]=a.data.value,i+=a.size}i<=e.length-3&&9==(16777215&a.getUint32(i-1,!w))&&(i+=3);break}case 9:s=void 0,i=1,r=!0;break;case 10:{s=[];let t=a.getUint32(1,!w);i+=4;for(let a=0;a<t;a++){let t=b.parseValue(e.slice(i,e.length));s.push(t.data),i+=t.size}break}case 11:{let t=b.parseDate(e.slice(1));s=t.data,i+=t.size;break}case 12:{let t=b.parseString(e.slice(1));s=t.data,i+=t.size;break}default:i=e.length,t.w(this.TAG,"Unsupported AMF value type "+n)}}catch(e){t.e(this.TAG,e.toString())}return{data:s,size:i,objectEnd:r}}}const T=b;class M{static _ebsp2rbsp(e){let t=e,s=t.byteLength,a=new Uint8Array(s),i=0;for(let e=0;e<s;e++)e>=2&&3===t[e]&&0===t[e-1]&&0===t[e-2]||(a[i]=t[e],i++);return new Uint8Array(a.buffer,0,i)}static parseSPS(e){let t=M._ebsp2rbsp(e),s=new class{constructor(e){this.TAG="ExpGolomb",this._buffer=e,this._buffer_index=0,this._total_bytes=e.byteLength,this._total_bits=8*e.byteLength,this._current_word=0,this._current_word_bits_left=0}destroy(){this._buffer=null}_fillCurrentWord(){let e=this._total_bytes-this._buffer_index;if(e<=0)throw new y("ExpGolomb: _fillCurrentWord() but no bytes available");let t=Math.min(4,e),s=new Uint8Array(4);s.set(this._buffer.subarray(this._buffer_index,this._buffer_index+t)),this._current_word=new DataView(s.buffer).getUint32(0,!1),this._buffer_index+=t,this._current_word_bits_left=8*t}readBits(e){if(e>32)throw new A("ExpGolomb: readBits() bits exceeded max 32bits!");if(e<=this._current_word_bits_left){let t=this._current_word>>>32-e;return this._current_word<<=e,this._current_word_bits_left-=e,t}let t=this._current_word_bits_left?this._current_word:0;t>>>=32-this._current_word_bits_left;let s=e-this._current_word_bits_left;this._fillCurrentWord();let a=Math.min(s,this._current_word_bits_left),i=this._current_word>>>32-a;return this._current_word<<=a,this._current_word_bits_left-=a,t=t<<a|i,t}readBool(){return 1===this.readBits(1)}readByte(){return this.readBits(8)}_skipLeadingZero(){let e;for(e=0;e<this._current_word_bits_left;e++)if(0!=(this._current_word&2147483648>>>e))return this._current_word<<=e,this._current_word_bits_left-=e,e;return this._fillCurrentWord(),e+this._skipLeadingZero()}readUEG(){let e=this._skipLeadingZero();return this.readBits(e+1)-1}readSEG(){let e=this.readUEG();return 1&e?e+1>>>1:-1*(e>>>1)}}(t);s.readByte();let a=s.readByte();s.readByte();let i=s.readByte();s.readUEG();let n=M.getProfileString(a),r=M.getLevelString(i),o=1,h=420,d=8;if((100===a||110===a||122===a||244===a||44===a||83===a||86===a||118===a||128===a||138===a||144===a)&&(o=s.readUEG(),3===o&&s.readBits(1),o<=3&&(h=[0,420,422,444][o]),d=s.readUEG()+8,s.readUEG(),s.readBits(1),s.readBool())){let e=3!==o?8:12;for(let t=0;t<e;t++)s.readBool()&&(t<6?M._skipScalingList(s,16):M._skipScalingList(s,64))}s.readUEG();let l=s.readUEG();if(0===l)s.readUEG();else if(1===l){s.readBits(1),s.readSEG(),s.readSEG();let e=s.readUEG();for(let t=0;t<e;t++)s.readSEG()}let c=s.readUEG();s.readBits(1);let u=s.readUEG(),m=s.readUEG(),g=s.readBits(1);0===g&&s.readBits(1),s.readBits(1);let p=0,_=0,f=0,S=0;s.readBool()&&(p=s.readUEG(),_=s.readUEG(),f=s.readUEG(),S=s.readUEG());let v=1,w=1,b=0,T=!0,k=0,D=0;if(s.readBool()){if(s.readBool()){let e=s.readByte();e>0&&e<16?(v=[1,12,10,16,40,24,20,32,80,18,15,64,160,4,3,2][e-1],w=[1,11,11,11,33,11,11,11,33,11,11,33,99,3,2,1][e-1]):255===e&&(v=s.readByte()<<8|s.readByte(),w=s.readByte()<<8|s.readByte())}if(s.readBool()&&s.readBool(),s.readBool()&&(s.readBits(4),s.readBool()&&s.readBits(24)),s.readBool()&&(s.readUEG(),s.readUEG()),s.readBool()){let e=s.readBits(32),t=s.readBits(32);T=s.readBool(),k=t,D=2*e,b=k/D}}let C=1;1===v&&1===w||(C=v/w);let I=0,x=0;0===o?(I=1,x=2-g):(I=3===o?1:2,x=(1===o?2:1)*(2-g));let G=16*(u+1),U=16*(m+1)*(2-g);G-=(p+_)*I,U-=(f+S)*x;let R=Math.ceil(G*C);return s.destroy(),s=null,{profile_string:n,level_string:r,bit_depth:d,ref_frames:c,chroma_format:h,chroma_format_string:M.getChromaFormatString(h),frame_rate:{fixed:T,fps:b,fps_den:D,fps_num:k},sar_ratio:{width:v,height:w},codec_size:{width:G,height:U},present_size:{width:R,height:U}}}static _skipScalingList(e,t){let s=8,a=8,i=0;for(let n=0;n<t;n++)0!==a&&(i=e.readSEG(),a=(s+i+256)%256),s=0===a?s:a}static getProfileString(e){switch(e){case 66:return"Baseline";case 77:return"Main";case 88:return"Extended";case 100:return"High";case 110:return"High10";case 122:return"High422";case 244:return"High444";default:return"Unknown"}}static getLevelString(e){return(e/10).toFixed(1)}static getChromaFormatString(e){switch(e){case 420:return"4:2:0";case 422:return"4:2:2";case 444:return"4:4:4";default:return"Unknown"}}}const k=M;class D{static init(){D.types={avc1:[],avcC:[],btrt:[],dinf:[],dref:[],esds:[],ftyp:[],hdlr:[],mdat:[],mdhd:[],mdia:[],mfhd:[],minf:[],moof:[],moov:[],mp4a:[],mvex:[],mvhd:[],sdtp:[],stbl:[],stco:[],stsc:[],stsd:[],stsz:[],stts:[],tfdt:[],tfhd:[],traf:[],trak:[],trun:[],trex:[],tkhd:[],vmhd:[],smhd:[],".mp3":[]};for(let e in D.types)D.types.hasOwnProperty(e)&&(D.types[e]=[e.charCodeAt(0),e.charCodeAt(1),e.charCodeAt(2),e.charCodeAt(3)]);let e=D.constants={};e.FTYP=new Uint8Array([105,115,111,109,0,0,0,1,105,115,111,109,97,118,99,49]),e.STSD_PREFIX=new Uint8Array([0,0,0,0,0,0,0,1]),e.STTS=new Uint8Array([0,0,0,0,0,0,0,0]),e.STSC=e.STCO=e.STTS,e.STSZ=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0]),e.HDLR_VIDEO=new Uint8Array([0,0,0,0,0,0,0,0,118,105,100,101,0,0,0,0,0,0,0,0,0,0,0,0,86,105,100,101,111,72,97,110,100,108,101,114,0]),e.HDLR_AUDIO=new Uint8Array([0,0,0,0,0,0,0,0,115,111,117,110,0,0,0,0,0,0,0,0,0,0,0,0,83,111,117,110,100,72,97,110,100,108,101,114,0]),e.DREF=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,12,117,114,108,32,0,0,0,1]),e.SMHD=new Uint8Array([0,0,0,0,0,0,0,0]),e.VMHD=new Uint8Array([0,0,0,1,0,0,0,0,0,0,0,0])}static box(e){let t,s=8,a=Array.prototype.slice.call(arguments,1),i=a.length;for(let e=0;e<i;e++)s+=a[e].byteLength;t=new Uint8Array(s),t[0]=s>>>24&255,t[1]=s>>>16&255,t[2]=s>>>8&255,t[3]=255&s,t.set(e,4);let n=8;for(let e=0;e<i;e++)t.set(a[e],n),n+=a[e].byteLength;return t}static generateInitSegment(e){let t=D.box(D.types.ftyp,D.constants.FTYP),s=D.moov(e),a=new Uint8Array(t.byteLength+s.byteLength);return a.set(t,0),a.set(s,t.byteLength),a}static moov(e){let t=D.mvhd(e.timescale,e.duration),s=D.trak(e),a=D.mvex(e);return D.box(D.types.moov,t,s,a)}static mvhd(e,t){return D.box(D.types.mvhd,new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,e>>>24&255,e>>>16&255,e>>>8&255,255&e,t>>>24&255,t>>>16&255,t>>>8&255,255&t,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255]))}static trak(e){return D.box(D.types.trak,D.tkhd(e),D.mdia(e))}static tkhd(e){let t=e.id,s=e.duration,a=e.presentWidth,i=e.presentHeight;return D.box(D.types.tkhd,new Uint8Array([0,0,0,7,0,0,0,0,0,0,0,0,t>>>24&255,t>>>16&255,t>>>8&255,255&t,0,0,0,0,s>>>24&255,s>>>16&255,s>>>8&255,255&s,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,a>>>8&255,255&a,0,0,i>>>8&255,255&i,0,0]))}static mdia(e){return D.box(D.types.mdia,D.mdhd(e),D.hdlr(e),D.minf(e))}static mdhd(e){let t=e.timescale,s=e.duration;return D.box(D.types.mdhd,new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,t>>>24&255,t>>>16&255,t>>>8&255,255&t,s>>>24&255,s>>>16&255,s>>>8&255,255&s,85,196,0,0]))}static hdlr(e){let t;return t="audio"===e.type?D.constants.HDLR_AUDIO:D.constants.HDLR_VIDEO,D.box(D.types.hdlr,t)}static minf(e){let t;return t="audio"===e.type?D.box(D.types.smhd,D.constants.SMHD):D.box(D.types.vmhd,D.constants.VMHD),D.box(D.types.minf,t,D.dinf(),D.stbl(e))}static dinf(){return D.box(D.types.dinf,D.box(D.types.dref,D.constants.DREF))}static stbl(e){return D.box(D.types.stbl,D.stsd(e),D.box(D.types.stts,D.constants.STTS),D.box(D.types.stsc,D.constants.STSC),D.box(D.types.stsz,D.constants.STSZ),D.box(D.types.stco,D.constants.STCO))}static stsd(e){return"audio"===e.type?"mp3"===e.codec?D.box(D.types.stsd,D.constants.STSD_PREFIX,D.mp3(e)):D.box(D.types.stsd,D.constants.STSD_PREFIX,D.mp4a(e)):D.box(D.types.stsd,D.constants.STSD_PREFIX,D.avc1(e))}static mp3(e){let t=e.channelCount,s=e.audioSampleRate,a=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,t,0,16,0,0,0,0,s>>>8&255,255&s,0,0]);return D.box(D.types[".mp3"],a)}static mp4a(e){let t=e.channelCount,s=e.audioSampleRate,a=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,t,0,16,0,0,0,0,s>>>8&255,255&s,0,0]);return D.box(D.types.mp4a,a,D.esds(e))}static esds(e){let t=e.config||[],s=t.length,a=new Uint8Array([0,0,0,0,3,23+s,0,1,0,4,15+s,64,21,0,0,0,0,0,0,0,0,0,0,0,5].concat([s]).concat(t).concat([6,1,2]));return D.box(D.types.esds,a)}static avc1(e){let t=e.avcc,s=e.codecWidth,a=e.codecHeight,i=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,s>>>8&255,255&s,a>>>8&255,255&a,0,72,0,0,0,72,0,0,0,0,0,0,0,1,10,120,113,113,47,102,108,118,46,106,115,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,255,255]);return D.box(D.types.avc1,i,D.box(D.types.avcC,t))}static mvex(e){return D.box(D.types.mvex,D.trex(e))}static trex(e){let t=e.id,s=new Uint8Array([0,0,0,0,t>>>24&255,t>>>16&255,t>>>8&255,255&t,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1]);return D.box(D.types.trex,s)}static moof(e,t){return D.box(D.types.moof,D.mfhd(e.sequenceNumber),D.traf(e,t))}static mfhd(e){let t=new Uint8Array([0,0,0,0,e>>>24&255,e>>>16&255,e>>>8&255,255&e]);return D.box(D.types.mfhd,t)}static traf(e,t){let s=e.id,a=D.box(D.types.tfhd,new Uint8Array([0,0,0,0,s>>>24&255,s>>>16&255,s>>>8&255,255&s])),i=D.box(D.types.tfdt,new Uint8Array([0,0,0,0,t>>>24&255,t>>>16&255,t>>>8&255,255&t])),n=D.sdtp(e),r=D.trun(e,n.byteLength+16+16+8+16+8+8);return D.box(D.types.traf,a,i,r,n)}static sdtp(e){let t=e.samples||[],s=t.length,a=new Uint8Array(4+s);for(let e=0;e<s;e++){let s=t[e].flags;a[e+4]=s.isLeading<<6|s.dependsOn<<4|s.isDependedOn<<2|s.hasRedundancy}return D.box(D.types.sdtp,a)}static trun(e,t){let s=e.samples||[],a=s.length,i=12+16*a,n=new Uint8Array(i);t+=8+i,n.set([0,0,15,1,a>>>24&255,a>>>16&255,a>>>8&255,255&a,t>>>24&255,t>>>16&255,t>>>8&255,255&t],0);for(let e=0;e<a;e++){let t=s[e].duration,a=s[e].size,i=s[e].flags,r=s[e].cts;n.set([t>>>24&255,t>>>16&255,t>>>8&255,255&t,a>>>24&255,a>>>16&255,a>>>8&255,255&a,i.isLeading<<2|i.dependsOn,i.isDependedOn<<6|i.hasRedundancy<<4|i.isNonSync,0,0,r>>>24&255,r>>>16&255,r>>>8&255,255&r],12+16*e)}return D.box(D.types.trun,n)}static mdat(e){return D.box(D.types.mdat,e)}}D.init();const C=D;class I{constructor(e,t,s,a,i){this.dts=e,this.pts=t,this.duration=s,this.originalDts=a,this.isSyncPoint=i,this.fileposition=null}}class x{constructor(){this.beginDts=0,this.endDts=0,this.beginPts=0,this.endPts=0,this.originalBeginDts=0,this.originalEndDts=0,this.syncPoints=[],this.firstSample=null,this.lastSample=null}appendSyncPoint(e){e.isSyncPoint=!0,this.syncPoints.push(e)}}class G{constructor(e){this._type=e,this._list=[],this._lastAppendLocation=-1}get type(){return this._type}get length(){return this._list.length}isEmpty(){return 0===this._list.length}clear(){this._list=[],this._lastAppendLocation=-1}_searchNearestSegmentBefore(e){let t=this._list;if(0===t.length)return-2;let s=t.length-1,a=0,i=0,n=s,r=0;if(e<t[0].originalBeginDts)return r=-1,r;for(;i<=n;){if(a=i+Math.floor((n-i)/2),a===s||e>t[a].lastSample.originalDts&&e<t[a+1].originalBeginDts){r=a;break}t[a].originalBeginDts<e?i=a+1:n=a-1}return r}_searchNearestSegmentAfter(e){return this._searchNearestSegmentBefore(e)+1}append(e){let t=this._list,s=e,a=this._lastAppendLocation,i=0;-1!==a&&a<t.length&&s.originalBeginDts>=t[a].lastSample.originalDts&&(a===t.length-1||a<t.length-1&&s.originalBeginDts<t[a+1].originalBeginDts)?i=a+1:t.length>0&&(i=this._searchNearestSegmentBefore(s.originalBeginDts)+1),this._lastAppendLocation=i,this._list.splice(i,0,s)}getLastSegmentBefore(e){let t=this._searchNearestSegmentBefore(e);return t>=0?this._list[t]:null}getLastSampleBefore(e){let t=this.getLastSegmentBefore(e);return null!=t?t.lastSample:null}getLastSyncPointBefore(e){let t=this._searchNearestSegmentBefore(e),s=this._list[t].syncPoints;for(;0===s.length&&t>0;)t--,s=this._list[t].syncPoints;return s.length>0?s[s.length-1]:null}}const U=class{static getSilentFrame(e,t){if("mp4a.40.2"===e){if(1===t)return new Uint8Array([0,200,0,128,35,128]);if(2===t)return new Uint8Array([33,0,73,144,2,25,0,35,128]);if(3===t)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,142]);if(4===t)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,128,44,128,8,2,56]);if(5===t)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,130,48,4,153,0,33,144,2,56]);if(6===t)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,130,48,4,153,0,33,144,2,0,178,0,32,8,224])}else{if(1===t)return new Uint8Array([1,64,34,128,163,78,230,128,186,8,0,0,0,28,6,241,193,10,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,94]);if(2===t)return new Uint8Array([1,64,34,128,163,94,230,128,186,8,0,0,0,0,149,0,6,241,161,10,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,94]);if(3===t)return new Uint8Array([1,64,34,128,163,94,230,128,186,8,0,0,0,0,149,0,6,241,161,10,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,94])}return null}};let R={};!function(){let e=self.navigator.userAgent.toLowerCase(),t=/(edge)\\/([\\w.]+)/.exec(e)||/(opr)[\\/]([\\w.]+)/.exec(e)||/(chrome)[ \\/]([\\w.]+)/.exec(e)||/(iemobile)[\\/]([\\w.]+)/.exec(e)||/(version)(applewebkit)[ \\/]([\\w.]+).*(safari)[ \\/]([\\w.]+)/.exec(e)||/(webkit)[ \\/]([\\w.]+).*(version)[ \\/]([\\w.]+).*(safari)[ \\/]([\\w.]+)/.exec(e)||/(webkit)[ \\/]([\\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \\/]([\\w.]+)/.exec(e)||/(msie) ([\\w.]+)/.exec(e)||e.indexOf("trident")>=0&&/(rv)(?::| )([\\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(firefox)[ \\/]([\\w.]+)/.exec(e)||[],s=/(ipad)/.exec(e)||/(ipod)/.exec(e)||/(windows phone)/.exec(e)||/(iphone)/.exec(e)||/(kindle)/.exec(e)||/(android)/.exec(e)||/(windows)/.exec(e)||/(mac)/.exec(e)||/(linux)/.exec(e)||/(cros)/.exec(e)||[],a={browser:t[5]||t[3]||t[1]||"",version:t[2]||t[4]||"0",majorVersion:t[4]||t[2]||"0",platform:s[0]||""},i={};if(a.browser){i[a.browser]=!0;let e=a.majorVersion.split(".");i.version={major:parseInt(a.majorVersion,10),string:a.version},e.length>1&&(i.version.minor=parseInt(e[1],10)),e.length>2&&(i.version.build=parseInt(e[2],10))}if(a.platform&&(i[a.platform]=!0),(i.chrome||i.opr||i.safari)&&(i.webkit=!0),i.rv||i.iemobile){i.rv&&delete i.rv;let e="msie";a.browser=e,i[e]=!0}if(i.edge){delete i.edge;let e="msedge";a.browser=e,i[e]=!0}if(i.opr){let e="opera";a.browser=e,i[e]=!0}if(i.safari&&i.android){let e="android";a.browser=e,i[e]=!0}i.name=a.browser,i.platform=a.platform;for(let e in R)R.hasOwnProperty(e)&&delete R[e];Object.assign(R,i)}();const B=R,E=class{TAG="AMF0Object";data;params;constructor(e){e&&(this.params=e,t.d(this.TAG,"cmd: "+this.params[0]))}parseAMF0(e){this.data=Array.from(e);let s=[];for(;this.data.length>0;){const e=this.data.shift();switch(e){case 0:s.push(r(this.data.slice(0,8))),this.data=this.data.slice(8);break;case 1:0===this.data.shift()?s.push(!1):s.push(!0);break;case 2:let a=this.data[0]<<8|this.data[1];this.data=this.data.slice(2),s.push(o(this.data.slice(0,a))),this.data=this.data.slice(a);break;case 3:s.push(this._parseAMF0Object());break;case 5:s.push(null);break;default:t.w(this.TAG,"var_type: "+e+" not yet implemented")}}return this.params=s,s}_parseAMF0Object(){let e={};for(;this.data.length>0;){let s=this.data[0]<<8|this.data[1];if(this.data=this.data.slice(2),0===s&&9===this.data[0])return this.data=this.data.slice(1),e;let a=o(this.data.slice(0,s));this.data=this.data.slice(s);const i=this.data.shift();switch(i){case 0:e[a]=r(this.data.slice(0,8)),this.data=this.data.slice(8);break;case 1:0===this.data.shift()?e[a]=!1:e[a]=!0;break;case 2:let s=this.data[0]<<8|this.data[1];this.data=this.data.slice(2),e[a]=o(this.data.slice(0,s)),this.data=this.data.slice(s);break;case 5:e[a]=null;break;default:t.w(this.TAG,"var_type: "+i+" not yet implemented")}}return e}getBytes(){let e=[];for(let s=0;s<this.params.length;s++){const i=this.params[s];switch(typeof i){case"string":e.push(2),e.push(i.length>>>8),e.push(i.length),e=e.concat(a(i));break;case"number":e.push(0),e=e.concat(n(i));break;case"object":e.push(3);for(let s in i){let r=i[s],o=s.length;switch(e.push(o>>>8),e.push(o),e=e.concat(a(s)),typeof r){case"object":null==r&&e.push(5);break;case"string":const s=r.length;e.push(2),e.push(s>>>8),e.push(s),e=e.concat(a(r));break;case"number":e.push(0),e=e.concat(n(r));break;case"boolean":e.push(1),r?e.push(1):e.push(0);break;default:t.w(this.TAG,typeof r," not yet implementd")}}e.push(0),e.push(0),e.push(9);break;case"boolean":e.push(1),i?e.push(1):e.push(0);break;default:t.w(this.TAG,typeof i," not yet implementd")}}return new Uint8Array(e)}getCommand(){return this.params[0]}getTransactionId(){return this.params[1]}getCommandObject(){return this.params[2]}getAdditionalInfo(){return this.params[3]}},L="WebRTMP Worker";let P,F,V;t.LEVEL=t.DEBUG;const N=new class{TAG="WSSConnectionManager";host;port;wss;open(e,s,a){this.host=e,t.v(this.TAG,"connecting to: "+e+":"+s),this.wss=new WebSocket("ws://"+e+":"+s+"/"),this.wss.binaryType="arraybuffer",this.wss.onopen=e=>{t.v(this.TAG,e),a(!0)},this.wss.onclose=e=>{t.w(this.TAG,e),postMessage(["ConnectionLost"])},this.wss.onerror=e=>{t.e(this.TAG,e),a(!1)}}registerMessageHandler(e){this.wss.onmessage=e}getSocket(){return this.wss}getHost(){return this.host}close(){this.wss.close()}};self.addEventListener("message",(function(e){let a=e.data;switch(t.d(L,"CMD: "+a.cmd),a.cmd){case"open":F=a.host,P=a.port,N.open(F,P,(e=>{if(t.v(L,"open: "+F+":"+P),e){t.v(L,"WSSConnected"),postMessage(["WSSConnected"]);const e=new class{TAG="RTMPHandshake";state=0;onHandshakeDone=null;c1;c2;constructor(e){this.socket=e,this.socket.onmessage=e=>{t.v(this.TAG,e.data),this.processServerInput(new Uint8Array(e.data))}}do(){this.onHandshakeDone?(t.v(this.TAG,"send C0"),this.socket.send(new Uint8Array([3])),this.state=1,t.v(this.TAG,"send C1"),this.socket.send(this._generateC1()),this.state=2):t.e(this.TAG,"onHandshakeDone not defined")}_generateC1(){const e=new Uint8Array(1536);for(let t=0;t<e.length;t++)e[t]=Math.floor(256*Math.random());let t=Math.round(Date.now()/1e3);return e[0]=t>>>24,e[1]=t>>>16,e[2]=t>>>8,e[3]=t,e[4]=0,e[5]=0,e[6]=0,e[7]=0,this.c1=e,e}_generateC2(e){return this.c2=e,this.c2}_parseS0(e){t.v(this.TAG,"S0: ",e),3!==e[0]?t.e(this.TAG,"S0 response not 0x03"):t.v(this.TAG,"1st Byte OK"),this.state=3,e.length>1&&(t.v(this.TAG,"S1 included"),this._parseS1(e.slice(1)))}_parseS1(e){t.v(this.TAG,"parse S1: ",e),this.state=4;let s=e.slice(0,1536);t.v(this.TAG,"send C2"),this.socket.send(this._generateC2(s)),this.state=5,e.length>1536&&(t.v(this.TAG,"S2 included: "+e.length),this._parseS2(e.slice(1536)))}_parseS2(e){if(t.v(this.TAG,"parse S2: ",e),!this._compare(this.c1,e))return t.e(this.TAG,"C1 S1 not equal"),void this.onHandshakeDone(!1);this.state=6,t.v(this.TAG,"RTMP Connection established"),this.onHandshakeDone(!0)}_compare(e,t){for(let s=0;s<e.length;s++)if(e[s]!==t[s])return!1;return!0}processServerInput(e){switch(this.state){case 2:this._parseS0(e);break;case 3:this._parseS1(e);break;case 5:this._parseS2(e)}}}(N.getSocket());e.onHandshakeDone=e=>{e?(V=new class{TAG="RTMPMessageHandler";paused=!1;netconnections={};chunk_stream_id=2;trackedCommand="";socket;current_stream_id;constructor(e){this.socket=e,this.chunk_parser=new class{TAG="ChunkParser";static CHUNK_SIZE=128;_chunkstreams=[];_buffer=new Uint8Array(0);constructor(e){this.conn_worker=e}parseChunk(e){let a,i,n;this._buffer=s(this._buffer,e);do{t.d(this.TAG,"buffer length: "+this._buffer.length),this._buffer.length<100&&t.d(this.TAG,this._buffer);let e=this._buffer,s=0,r=0,o=0;n=(192&e[0])>>>6;let h,d=63&e[s++];switch(0===d?d=e[s++]+64:1===d&&(d=256*e[s++]+e[s++]+64),t.d(this.TAG,"chunk type: ",n," StreamID: "+d),n){case 0:i=e[s++]<<16|e[s++]<<8|e[s++],r=e[s++]<<16|e[s++]<<8|e[s++],a=new c,a.setMessageType(e[s++]),a.setMessageStreamID(e[s++]<<24|e[s++]<<16|e[s++]<<8|e[s++]),a.setMessageLength(r),16777215===i&&(i=e[s++]<<24|e[s++]<<16|e[s++]<<8|e[s++],a.setExtendedTimestamp(!0)),a.setMessageTimestamp(i),t.d(this.TAG,"message_length: "+r),this._chunkstreams[d]=a;break;case 1:i=e[s++]<<16|e[s++]<<8|e[s++],r=e[s++]<<16|e[s++]<<8|e[s++],a=this._chunkstreams[d],a.setMessageType(e[s++]),a.setMessageLength(r),16777215===i?(i=e[s++]<<24|e[s++]<<16|e[s++]<<8|e[s++],a.setExtendedTimestamp(!0)):a.setExtendedTimestamp(!1),a.setTimestampDelta(i),t.d(this.TAG,"message_length: "+r),this._chunkstreams[d]=a;break;case 2:i=e[s++]<<16|e[s++]<<8|e[s++],a=this._chunkstreams[d],16777215===i?(i=e[s++]<<24|e[s++]<<16|e[s++]<<8|e[s++],a.setExtendedTimestamp(!0)):a.setExtendedTimestamp(!1),a.setTimestampDelta(i);break;case 3:a=this._chunkstreams[d],a.getExtendedTimestamp()&&(i=e[s++]<<24|e[s++]<<16|e[s++]<<8|e[s++],a.setTimestampDelta(i))}if(a||t.e(this.TAG,"No suitable RTMPMessage found"),o=this._chunkstreams[d].bytesMissing(),o>this.CHUNK_SIZE&&(o=this.CHUNK_SIZE),h=e.slice(s,s+o),h.length<o)return void t.d(this.TAG,"packet("+h.length+"/"+o+") too small, wait for next");this._chunkstreams[d].addPayload(h),this._chunkstreams[d].isComplete()&&(t.d(this.TAG,"RTMP: ",a.getMessageType(),c.MessageTypes[a.getMessageType()],a.getPayloadlength(),a.getMessageStreamID()),this.conn_worker.onMessage(this._chunkstreams[d]),this._chunkstreams[d].clearPayload());let l=s+o;l>this._buffer.length&&t.w(this.TAG,"mehr abschneiden als da"),this._buffer=this._buffer.slice(l),t.d(this.TAG,"consumed: "+l+" bytes, rest: "+this._buffer.length)}while(this._buffer.length>11);t.d(this.TAG,"parseChunk complete")}setChunkSize(e){t.d(this.TAG,"SetChunkSize: "+e),this.CHUNK_SIZE=e}}(this),this.media_handler=new class{TAG="RTMPMediaMessageHandler";constructor(e){this._config=e,this._onError=null,this._onMediaInfo=null,this._onMetaDataArrived=null,this._onScriptDataArrived=null,this._onDataAvailable=null,this._onTrackMetadata=null,this._dispatch=!1,this._hasAudio=!0,this._hasVideo=!0,this._hasAudioFlagOverrided=!1,this._hasVideoFlagOverrided=!1,this._audioInitialMetadataDispatched=!1,this._videoInitialMetadataDispatched=!1,this._mediaInfo=new class{constructor(){this.mimeType=null,this.duration=null,this.hasAudio=null,this.hasVideo=null,this.audioCodec=null,this.videoCodec=null,this.audioDataRate=null,this.videoDataRate=null,this.audioSampleRate=null,this.audioChannelCount=null,this.width=null,this.height=null,this.fps=null,this.profile=null,this.level=null,this.refFrames=null,this.chromaFormat=null,this.sarNum=null,this.sarDen=null,this.metadata=null,this.segments=null,this.segmentCount=null,this.hasKeyframesIndex=null,this.keyframesIndex=null}isComplete(){let e=!1===this.hasAudio||!0===this.hasAudio&&null!=this.audioCodec&&null!=this.audioSampleRate&&null!=this.audioChannelCount,t=!1===this.hasVideo||!0===this.hasVideo&&null!=this.videoCodec&&null!=this.width&&null!=this.height&&null!=this.fps&&null!=this.profile&&null!=this.level&&null!=this.refFrames&&null!=this.chromaFormat&&null!=this.sarNum&&null!=this.sarDen;return null!=this.mimeType&&null!=this.duration&&null!=this.metadata&&null!=this.hasKeyframesIndex&&e&&t}isSeekable(){return!0===this.hasKeyframesIndex}getNearestKeyframe(e){if(null==this.keyframesIndex)return null;let t=this.keyframesIndex,s=this._search(t.times,e);return{index:s,milliseconds:t.times[s],fileposition:t.filepositions[s]}}_search(e,t){let s=0,a=e.length-1,i=0,n=0,r=a;for(t<e[0]&&(s=0,n=r+1);n<=r;){if(i=n+Math.floor((r-n)/2),i===a||t>=e[i]&&t<e[i+1]){s=i;break}e[i]<t?n=i+1:r=i-1}return s}},this._mediaInfo.hasAudio=this._hasAudio,this._mediaInfo.hasVideo=this._hasVideo,this._metadata=null,this._audioMetadata=null,this._videoMetadata=null,this._naluLengthSize=4,this._timestampBase=0,this._timescale=1e3,this._duration=0,this._durationOverrided=!1,this._referenceFrameRate={fixed:!0,fps:23.976,fps_num:23976,fps_den:1e3},this._flvSoundRateTable=[5500,11025,22050,44100,48e3],this._mpegSamplingRates=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350],this._mpegAudioV10SampleRateTable=[44100,48e3,32e3,0],this._mpegAudioV20SampleRateTable=[22050,24e3,16e3,0],this._mpegAudioV25SampleRateTable=[11025,12e3,8e3,0],this._mpegAudioL1BitRateTable=[0,32,64,96,128,160,192,224,256,288,320,352,384,416,448,-1],this._mpegAudioL2BitRateTable=[0,32,48,56,64,80,96,112,128,160,192,224,256,320,384,-1],this._mpegAudioL3BitRateTable=[0,32,40,48,56,64,80,96,112,128,160,192,224,256,320,-1],this._videoTrack={type:"video",id:1,sequenceNumber:0,samples:[],length:0},this._audioTrack={type:"audio",id:2,sequenceNumber:0,samples:[],length:0},this._littleEndian=function(){let e=new ArrayBuffer(2);return new DataView(e).setInt16(0,256,!0),256===new Int16Array(e)[0]}(),this.bytePos=0,this._config=h,this._remuxer=new class{TAG="MP4Remuxer";constructor(e){this._config=e,this._isLive=!0===e.isLive,this._dtsBase=-1,this._dtsBaseInited=!1,this._audioDtsBase=1/0,this._videoDtsBase=1/0,this._audioNextDts=void 0,this._videoNextDts=void 0,this._audioStashedLastSample=null,this._videoStashedLastSample=null,this._audioMeta=null,this._videoMeta=null,this._audioSegmentInfoList=new G("audio"),this._videoSegmentInfoList=new G("video"),this._onInitSegment=null,this._onMediaSegment=null,this._forceFirstIDR=!(!B.chrome||!(B.version.major<50||50===B.version.major&&B.version.build<2661)),this._fillSilentAfterSeek=B.msedge||B.msie,this._mp3UseMpegAudio=!B.firefox,this._fillAudioTimestampGap=this._config.fixAudioTimestampGap}destroy(){this._dtsBase=-1,this._dtsBaseInited=!1,this._audioMeta=null,this._videoMeta=null,this._audioSegmentInfoList.clear(),this._audioSegmentInfoList=null,this._videoSegmentInfoList.clear(),this._videoSegmentInfoList=null,this._onInitSegment=null,this._onMediaSegment=null}get onInitSegment(){return this._onInitSegment}set onInitSegment(e){this._onInitSegment=e}get onMediaSegment(){return this._onMediaSegment}set onMediaSegment(e){this._onMediaSegment=e}insertDiscontinuity(){this._audioNextDts=this._videoNextDts=void 0}seek(e){this._audioStashedLastSample=null,this._videoStashedLastSample=null,this._videoSegmentInfoList.clear(),this._audioSegmentInfoList.clear()}remux(e,t){if(!this._onMediaSegment)throw new y("MP4Remuxer: onMediaSegment callback must be specificed!");this._dtsBaseInited||this._calculateDtsBase(e,t),this._remuxVideo(t),this._remuxAudio(e)}_onTrackMetadataReceived(e,s){t.i(this.TAG,"_onTrackMetadataReceived");let a=null,i="mp4",n=s.codec;if("audio"===e)this._audioMeta=s,"mp3"===s.codec&&this._mp3UseMpegAudio?(i="mpeg",n="",a=new Uint8Array(0)):a=C.generateInitSegment(s);else{if("video"!==e)return;this._videoMeta=s,a=C.generateInitSegment(s)}if(!this._onInitSegment)throw new y("MP4Remuxer: onInitSegment callback must be specified!");this._onInitSegment(e,{type:e,data:a.buffer,codec:n,container:`${e}/${i}`,mediaDuration:s.duration})}_calculateDtsBase(e,t){this._dtsBaseInited||(e.samples&&e.samples.length&&(this._audioDtsBase=e.samples[0].dts),t.samples&&t.samples.length&&(this._videoDtsBase=t.samples[0].dts),this._dtsBase=Math.min(this._audioDtsBase,this._videoDtsBase),this._dtsBaseInited=!0)}flushStashedSamples(){let e=this._videoStashedLastSample,t=this._audioStashedLastSample,s={type:"video",id:1,sequenceNumber:0,samples:[],length:0};null!=e&&(s.samples.push(e),s.length=e.length);let a={type:"audio",id:2,sequenceNumber:0,samples:[],length:0};null!=t&&(a.samples.push(t),a.length=t.length),this._videoStashedLastSample=null,this._audioStashedLastSample=null,this._remuxVideo(s,!0),this._remuxAudio(a,!0)}_remuxAudio(e,s){if(t.i(this.TAG,"_remuxAudio"),null==this._audioMeta)return void t.w(this.TAG,"no audioMeta");let a,i=e,n=i.samples,r=-1,o=-1,h=this._audioMeta.refSampleDuration,d="mp3"===this._audioMeta.codec&&this._mp3UseMpegAudio,l=this._dtsBaseInited&&void 0===this._audioNextDts,c=!1;if(!n||0===n.length)return void t.w(this.TAG,"no samples");if(1===n.length&&!s)return void t.w(this.TAG,"1 sample");let u=0,m=null,g=0;d?(u=0,g=i.length):(u=8,g=8+i.length);let p=null;if(n.length>1&&(p=n.pop(),g-=p.length),null!=this._audioStashedLastSample){let e=this._audioStashedLastSample;this._audioStashedLastSample=null,n.unshift(e),g+=e.length}null!=p&&(this._audioStashedLastSample=p);let _=n[0].dts-this._dtsBase;if(this._audioNextDts)a=_-this._audioNextDts;else if(this._audioSegmentInfoList.isEmpty())a=0,this._fillSilentAfterSeek&&!this._videoSegmentInfoList.isEmpty()&&"mp3"!==this._audioMeta.originalCodec&&(c=!0);else{let e=this._audioSegmentInfoList.getLastSampleBefore(_);if(null!=e){let t=_-(e.originalDts+e.duration);t<=3&&(t=0),a=_-(e.dts+e.duration+t)}else a=0}if(c){let e=_-a,s=this._videoSegmentInfoList.getLastSegmentBefore(_);if(null!=s&&s.beginDts<e){let a=U.getSilentFrame(this._audioMeta.originalCodec,this._audioMeta.channelCount);if(a){let i=s.beginDts,r=e-s.beginDts;t.v(this.TAG,`InsertPrefixSilentAudio: dts: ${i}, duration: ${r}`),n.unshift({unit:a,dts:i,pts:i}),g+=a.byteLength}}else c=!1}let f=[];for(let e=0;e<n.length;e++){let s=n[e],i=s.unit,o=s.dts-this._dtsBase,d=o,l=!1,c=null,u=0;if(!(o<-.001)){if("mp3"!==this._audioMeta.codec){let e=o;const s=3;if(this._audioNextDts&&(e=this._audioNextDts),a=o-e,a<=-s*h){t.w(this.TAG,`Dropping 1 audio frame (originalDts: ${o} ms ,curRefDts: ${e} ms)  due to dtsCorrection: ${a} ms overlap.`);continue}if(a>=s*h&&this._fillAudioTimestampGap&&!B.safari){l=!0;let s=Math.floor(a/h);t.w(this.TAG,`Large audio timestamp gap detected, may cause AV sync to drift. Silent frames will be generated to avoid unsync.\\noriginalDts: ${o} ms, curRefDts: ${e} ms, dtsCorrection: ${Math.round(a)} ms, generate: ${s} frames`),d=Math.floor(e),u=Math.floor(e+h)-d;let n=U.getSilentFrame(this._audioMeta.originalCodec,this._audioMeta.channelCount);null==n&&(t.w(this.TAG,`Unable to generate silent frame for ${this._audioMeta.originalCodec} with ${this._audioMeta.channelCount} channels, repeat last frame`),n=i),c=[];for(let t=0;t<s;t++){e+=h;let t=Math.floor(e),s=Math.floor(e+h)-t,a={dts:t,pts:t,cts:0,unit:n,size:n.byteLength,duration:s,originalDts:o,flags:{isLeading:0,dependsOn:1,isDependedOn:0,hasRedundancy:0}};c.push(a),g+=a.size}this._audioNextDts=e+h}else d=Math.floor(e),u=Math.floor(e+h)-d,this._audioNextDts=e+h}else d=o-a,u=e!==n.length-1?n[e+1].dts-this._dtsBase-a-d:null!=p?p.dts-this._dtsBase-a-d:f.length>=1?f[f.length-1].duration:Math.floor(h),this._audioNextDts=d+u;-1===r&&(r=d),f.push({dts:d,pts:d,cts:0,unit:s.unit,size:s.unit.byteLength,duration:u,originalDts:o,flags:{isLeading:0,dependsOn:1,isDependedOn:0,hasRedundancy:0}}),l&&f.push.apply(f,c)}}if(0===f.length)return i.samples=[],i.length=0,void t.w(this.TAG,"no mp4Samples = 0");d?m=new Uint8Array(g):(m=new Uint8Array(g),m[0]=g>>>24&255,m[1]=g>>>16&255,m[2]=g>>>8&255,m[3]=255&g,m.set(C.types.mdat,4));for(let e=0;e<f.length;e++){let t=f[e].unit;m.set(t,u),u+=t.byteLength}let y=f[f.length-1];o=y.dts+y.duration;let A,S=new x;S.beginDts=r,S.endDts=o,S.beginPts=r,S.endPts=o,S.originalBeginDts=f[0].originalDts,S.originalEndDts=y.originalDts+y.duration,S.firstSample=new I(f[0].dts,f[0].pts,f[0].duration,f[0].originalDts,!1),S.lastSample=new I(y.dts,y.pts,y.duration,y.originalDts,!1),this._isLive||this._audioSegmentInfoList.append(S),i.samples=f,i.sequenceNumber++,A=d?new Uint8Array(0):C.moof(i,r),i.samples=[],i.length=0;let v={type:"audio",data:this._mergeBoxes(A,m).buffer,sampleCount:f.length,info:S};d&&l&&(v.timestampOffset=r),t.i(this.TAG,"send onMediaSegment audio"),this._onMediaSegment("audio",v)}_remuxVideo(e,s){if(t.i(this.TAG,"_remuxVideo"),null==this._videoMeta)return;let a,i=e,n=i.samples,r=-1,o=-1,h=-1,d=-1;if(!n||0===n.length)return void t.w(this.TAG,"no samples");if(1===n.length&&!s)return void t.w(this.TAG,"no sampes = 1");let l=8,c=null,u=8+e.length,m=null;if(n.length>1&&(m=n.pop(),u-=m.length),null!=this._videoStashedLastSample){let e=this._videoStashedLastSample;this._videoStashedLastSample=null,n.unshift(e),u+=e.length}null!=m&&(this._videoStashedLastSample=m);let g=n[0].dts-this._dtsBase;if(this._videoNextDts)a=g-this._videoNextDts;else if(this._videoSegmentInfoList.isEmpty())a=0;else{let e=this._videoSegmentInfoList.getLastSampleBefore(g);if(null!=e){let t=g-(e.originalDts+e.duration);t<=3&&(t=0),a=g-(e.dts+e.duration+t)}else a=0}let p=new x,_=[];for(let e=0;e<n.length;e++){let t=n[e],s=t.dts-this._dtsBase,i=t.isKeyframe,o=s-a,d=t.cts,l=o+d;-1===r&&(r=o,h=l);let c=0;if(c=e!==n.length-1?n[e+1].dts-this._dtsBase-a-o:null!=m?m.dts-this._dtsBase-a-o:_.length>=1?_[_.length-1].duration:Math.floor(this._videoMeta.refSampleDuration),i){let e=new I(o,l,c,t.dts,!0);e.fileposition=t.fileposition,p.appendSyncPoint(e)}_.push({dts:o,pts:l,cts:d,units:t.units,size:t.length,isKeyframe:i,duration:c,originalDts:s,flags:{isLeading:0,dependsOn:i?2:1,isDependedOn:i?1:0,hasRedundancy:0,isNonSync:i?0:1}})}c=new Uint8Array(u),c[0]=u>>>24&255,c[1]=u>>>16&255,c[2]=u>>>8&255,c[3]=255&u,c.set(C.types.mdat,4);for(let e=0;e<_.length;e++){let t=_[e].units;for(;t.length;){let e=t.shift().data;c.set(e,l),l+=e.byteLength}}let f=_[_.length-1];if(o=f.dts+f.duration,d=f.pts+f.duration,this._videoNextDts=o,p.beginDts=r,p.endDts=o,p.beginPts=h,p.endPts=d,p.originalBeginDts=_[0].originalDts,p.originalEndDts=f.originalDts+f.duration,p.firstSample=new I(_[0].dts,_[0].pts,_[0].duration,_[0].originalDts,_[0].isKeyframe),p.lastSample=new I(f.dts,f.pts,f.duration,f.originalDts,f.isKeyframe),this._isLive||this._videoSegmentInfoList.append(p),i.samples=_,i.sequenceNumber++,this._forceFirstIDR){let e=_[0].flags;e.dependsOn=2,e.isNonSync=0}let y=C.moof(i,r);i.samples=[],i.length=0,t.i(this.TAG,"send onMediaSegment video"),this._onMediaSegment("video",{type:"video",data:this._mergeBoxes(y,c).buffer,sampleCount:_.length,info:p})}_mergeBoxes(e,t){let s=new Uint8Array(e.byteLength+t.byteLength);return s.set(e,0),s.set(t,e.byteLength),s}}(this._config),this._remuxer.onInitSegment=(e,t)=>{postMessage(["init_segment",e,t])},this._remuxer.onMediaSegment=(e,t)=>{postMessage(["media_segment",e,t])},this._onDataAvailable=(e,t)=>{this._remuxer.remux(e,t)},this._onTrackMetadata=(e,t)=>{this._remuxer._onTrackMetadataReceived(e,t)}}destroy(){this._remuxer&&(this._remuxer.destroy(),this._remuxer=null),this._mediaInfo=null,this._metadata=null,this._audioMetadata=null,this._videoMetadata=null,this._videoTrack=null,this._audioTrack=null,this._onError=null,this._onMediaInfo=null,this._onMetaDataArrived=null,this._onScriptDataArrived=null,this._onTrackMetadata=null,this._onDataAvailable=null}get onMediaInfo(){return this._onMediaInfo}set onMediaInfo(e){this._onMediaInfo=e}get onMetaDataArrived(){return this._onMetaDataArrived}set onMetaDataArrived(e){this._onMetaDataArrived=e}get onScriptDataArrived(){return this._onScriptDataArrived}set onScriptDataArrived(e){this._onScriptDataArrived=e}get onError(){return this._onError}set onError(e){this._onError=e}_isInitialMetadataDispatched(){return this._hasAudio&&this._hasVideo?this._audioInitialMetadataDispatched&&this._videoInitialMetadataDispatched:this._hasAudio&&!this._hasVideo?this._audioInitialMetadataDispatched:!(this._hasAudio||!this._hasVideo)&&this._videoInitialMetadataDispatched}handleMediaMessage(e){if(t.d(this.TAG,"handleMediaMessage",e.getMessageType()),!(this._onError&&this._onMediaInfo&&this._onTrackMetadata&&this._onDataAvailable))throw new y("Flv: onError & onMediaInfo & onTrackMetadata & onDataAvailable callback must be specified");this._dispatch=!0;let s=e.getMessageType(),a=e.getTimestamp();switch(0!==e.getMessageStreamID()&&t.w(this.TAG,"Meet tag which has StreamID != 0!"),t.d(this.TAG,e),s){case 8:this._parseAudioData(e.getPayload(),a);break;case 9:this._parseVideoData(e.getPayload(),a,this.bytePos);break;case 18:this._parseScriptData(e.getPayload())}this.bytePos+=e.getMessageLength()+11+1,this._isInitialMetadataDispatched()&&this._dispatch&&(this._audioTrack.length||this._videoTrack.length)&&(t.i(this.TAG,"sedn2"),this._onDataAvailable(this._audioTrack,this._videoTrack))}_parseScriptData(e){let s=T.parseScriptData(e);if(s.hasOwnProperty("onMetaData")){if(null==s.onMetaData||"object"!=typeof s.onMetaData)return void t.w(this.TAG,"Invalid onMetaData structure!");this._metadata&&t.w(this.TAG,"Found another onMetaData tag!"),this._metadata=s;let e=this._metadata.onMetaData;if(this._onMetaDataArrived&&this._onMetaDataArrived(Object.assign({},e)),"boolean"==typeof e.hasAudio&&!1===this._hasAudioFlagOverrided&&(this._hasAudio=e.hasAudio,this._mediaInfo.hasAudio=this._hasAudio),"boolean"==typeof e.hasVideo&&!1===this._hasVideoFlagOverrided&&(this._hasVideo=e.hasVideo,this._mediaInfo.hasVideo=this._hasVideo),"number"==typeof e.audiodatarate&&(this._mediaInfo.audioDataRate=e.audiodatarate),"number"==typeof e.videodatarate&&(this._mediaInfo.videoDataRate=e.videodatarate),"number"==typeof e.width&&(this._mediaInfo.width=e.width),"number"==typeof e.height&&(this._mediaInfo.height=e.height),"number"==typeof e.duration){if(!this._durationOverrided){let t=Math.floor(e.duration*this._timescale);this._duration=t,this._mediaInfo.duration=t}}else this._mediaInfo.duration=0;if("number"==typeof e.framerate){let t=Math.floor(1e3*e.framerate);if(t>0){let e=t/1e3;this._referenceFrameRate.fixed=!0,this._referenceFrameRate.fps=e,this._referenceFrameRate.fps_num=t,this._referenceFrameRate.fps_den=1e3,this._mediaInfo.fps=e}}if("object"==typeof e.keyframes){this._mediaInfo.hasKeyframesIndex=!0;let t=e.keyframes;this._mediaInfo.keyframesIndex=this._parseKeyframesIndex(t),e.keyframes=null}else this._mediaInfo.hasKeyframesIndex=!1;this._dispatch=!1,this._mediaInfo.metadata=e,t.v(this.TAG,"Parsed onMetaData"),this._mediaInfo.isComplete()&&this._onMediaInfo(this._mediaInfo)}Object.keys(s).length>0&&this._onScriptDataArrived&&this._onScriptDataArrived(Object.assign({},s))}_parseKeyframesIndex(e){let t=[],s=[];for(let a=1;a<e.times.length;a++){let i=this._timestampBase+Math.floor(1e3*e.times[a]);t.push(i),s.push(e.filepositions[a])}return{times:t,filepositions:s}}_parseAudioData(e,s){if(t.d(this.TAG,"_parseAudioData",s),e.length<=1)return void t.w(this.TAG,"Flv: Invalid audio packet, missing SoundData payload!");if(!0===this._hasAudioFlagOverrided&&!1===this._hasAudio)return;this._littleEndian;let a=new DataView(e.buffer).getUint8(0),i=a>>>4;if(2!==i&&10!==i)return void this._onError(l,"Flv: Unsupported audio codec idx: "+i);let n=0,r=(12&a)>>>2;if(!(r>=0&&r<=4))return void this._onError(d,"Flv: Invalid audio sample rate idx: "+r);n=this._flvSoundRateTable[r];let o=1&a,h=this._audioMetadata,c=this._audioTrack;if(h||(!1===this._hasAudio&&!1===this._hasAudioFlagOverrided&&(this._hasAudio=!0,this._mediaInfo.hasAudio=!0),h=this._audioMetadata={},h.type="audio",h.id=c.id,h.timescale=this._timescale,h.duration=this._duration,h.audioSampleRate=n,h.channelCount=0===o?1:2),10===i){let a=this._parseAACAudioData(e.slice(1));if(null==a)return;if(0===a.packetType){h.config&&t.w(this.TAG,"Found another AudioSpecificConfig!");let e=a.data;h.audioSampleRate=e.samplingRate,h.channelCount=e.channelCount,h.codec=e.codec,h.originalCodec=e.originalCodec,h.config=e.config,h.refSampleDuration=1024/h.audioSampleRate*h.timescale,t.v(this.TAG,"Parsed AudioSpecificConfig"),this._isInitialMetadataDispatched()?this._dispatch&&(this._audioTrack.length||this._videoTrack.length)&&this._onDataAvailable(this._audioTrack,this._videoTrack):this._audioInitialMetadataDispatched=!0,this._dispatch=!1,t.i(this.TAG,"ON!"),this._onTrackMetadata("audio",h);let s=this._mediaInfo;s.audioCodec=h.originalCodec,s.audioSampleRate=h.audioSampleRate,s.audioChannelCount=h.channelCount,s.hasVideo?null!=s.videoCodec&&(s.mimeType=\'video/x-flv; codecs="\'+s.videoCodec+","+s.audioCodec+\'"\'):s.mimeType=\'video/x-flv; codecs="\'+s.audioCodec+\'"\',s.isComplete()&&this._onMediaInfo(s)}else if(1===a.packetType){let e=this._timestampBase+s,t={unit:a.data,length:a.data.byteLength,dts:e,pts:e};c.samples.push(t),c.length+=a.data.length}else t.e(this.TAG,`Flv: Unsupported AAC data type ${a.packetType}`)}else if(2===i){if(!h.codec){let s=this._parseMP3AudioData(e.slice(1),!0);if(null==s)return;h.audioSampleRate=s.samplingRate,h.channelCount=s.channelCount,h.codec=s.codec,h.originalCodec=s.originalCodec,h.refSampleDuration=1152/h.audioSampleRate*h.timescale,t.v(this.TAG,"Parsed MPEG Audio Frame Header"),this._audioInitialMetadataDispatched=!0,this._onTrackMetadata("audio",h);let a=this._mediaInfo;a.audioCodec=h.codec,a.audioSampleRate=h.audioSampleRate,a.audioChannelCount=h.channelCount,a.audioDataRate=s.bitRate,a.hasVideo?null!=a.videoCodec&&(a.mimeType=\'video/x-flv; codecs="\'+a.videoCodec+","+a.audioCodec+\'"\'):a.mimeType=\'video/x-flv; codecs="\'+a.audioCodec+\'"\',a.isComplete()&&this._onMediaInfo(a)}let a=this._parseMP3AudioData(e.slice(1),!1);if(null==a)return;let i=this._timestampBase+s,n={unit:a,length:a.byteLength,dts:i,pts:i};c.samples.push(n),c.length+=a.length}}_parseAACAudioData(e){if(e.length<=1)return void t.w(this.TAG,"Flv: Invalid AAC packet, missing AACPacketType or/and Data!");let s={};return s.packetType=e[0],0===e[0]?s.data=this._parseAACAudioSpecificConfig(e.slice(1)):s.data=e.subarray(1),s}_parseAACAudioSpecificConfig(e){let t=null,s=0,a=0,i=0,n=null;if(s=a=e[0]>>>3,i=(7&e[0])<<1|e[1]>>>7,i<0||i>=this._mpegSamplingRates.length)return void this._onError(d,"Flv: AAC invalid sampling frequency index!");let r=this._mpegSamplingRates[i],o=(120&e[1])>>>3;if(o<0||o>=8)return void this._onError(d,"Flv: AAC invalid channel configuration");5===s&&(n=(7&e[1])<<1|e[2]>>>7,e[2]);let h=self.navigator.userAgent.toLowerCase();return-1!==h.indexOf("firefox")?i>=6?(s=5,t=new Array(4),n=i-3):(s=2,t=new Array(2),n=i):-1!==h.indexOf("android")?(s=2,t=new Array(2),n=i):(s=5,n=i,t=new Array(4),i>=6?n=i-3:1===o&&(s=2,t=new Array(2),n=i)),t[0]=s<<3,t[0]|=(15&i)>>>1,t[1]=(15&i)<<7,t[1]|=(15&o)<<3,5===s&&(t[1]|=(15&n)>>>1,t[2]=(1&n)<<7,t[2]|=8,t[3]=0),{config:t,samplingRate:r,channelCount:o,codec:"mp4a.40."+s,originalCodec:"mp4a.40."+a}}_parseMP3AudioData(e,s){if(e.length<4)return void t.w(this.TAG,"Flv: Invalid MP3 packet, header missing!");let a=null;if(s){if(255!==e[0])return;let t=e[1]>>>3&3,s=(6&e[1])>>1,i=(240&e[2])>>>4,n=(12&e[2])>>>2,r=3!=(e[3]>>>6&3)?2:1,o=0,h=0,d=34,l="mp3";switch(t){case 0:o=this._mpegAudioV25SampleRateTable[n];break;case 2:o=this._mpegAudioV20SampleRateTable[n];break;case 3:o=this._mpegAudioV10SampleRateTable[n]}switch(s){case 1:d=34,i<this._mpegAudioL3BitRateTable.length&&(h=this._mpegAudioL3BitRateTable[i]);break;case 2:d=33,i<this._mpegAudioL2BitRateTable.length&&(h=this._mpegAudioL2BitRateTable[i]);break;case 3:d=32,i<this._mpegAudioL1BitRateTable.length&&(h=this._mpegAudioL1BitRateTable[i])}a={bitRate:h,samplingRate:o,channelCount:r,codec:l,originalCodec:l}}else a=e;return a}_parseVideoData(e,s,a){if(e.length<=1)return void t.w(this.TAG,"Flv: Invalid video packet, missing VideoData payload!");if(!0===this._hasVideoFlagOverrided&&!1===this._hasVideo)return;let i=e[0],n=(240&i)>>>4,r=15&i;7===r?this._parseAVCVideoPacket(e.slice(1),s,a,n):this._onError(l,`Flv: Unsupported codec in video frame: ${r}`)}_parseAVCVideoPacket(e,s,a,i){if(e.length<4)return void t.w(this.TAG,"Flv: Invalid AVC packet, missing AVCPacketType or/and CompositionTime");let n=this._littleEndian,r=new DataView(e.buffer),o=r.getUint8(0),h=(16777215&r.getUint32(0,!n))<<8>>8;if(0===o)this._parseAVCDecoderConfigurationRecord(e.slice(4));else if(1===o)this._parseAVCVideoData(e.slice(4),s,a,i,h);else if(2!==o)return void this._onError(d,`Flv: Invalid video packet type ${o}`)}_parseAVCDecoderConfigurationRecord(e){if(e.length<7)return void t.w(this.TAG,"Flv: Invalid AVCDecoderConfigurationRecord, lack of data!");let s=this._videoMetadata,a=this._videoTrack,i=this._littleEndian,n=new DataView(e.buffer);s?void 0!==s.avcc&&t.w(this.TAG,"Found another AVCDecoderConfigurationRecord!"):(!1===this._hasVideo&&!1===this._hasVideoFlagOverrided&&(this._hasVideo=!0,this._mediaInfo.hasVideo=!0),s=this._videoMetadata={},s.type="video",s.id=a.id,s.timescale=this._timescale,s.duration=this._duration);let r=n.getUint8(0),o=n.getUint8(1);if(n.getUint8(2),n.getUint8(3),1!==r||0===o)return void this._onError(d,"Flv: Invalid AVCDecoderConfigurationRecord");if(this._naluLengthSize=1+(3&n.getUint8(4)),3!==this._naluLengthSize&&4!==this._naluLengthSize)return void this._onError(d,"Flv: Strange NaluLengthSizeMinusOne: "+(this._naluLengthSize-1));let h=31&n.getUint8(5);if(0===h)return void this._onError(d,"Flv: Invalid AVCDecoderConfigurationRecord: No SPS");h>1&&t.w(this.TAG,`Flv: Strange AVCDecoderConfigurationRecord: SPS Count = ${h}`);let l=6;for(let t=0;t<h;t++){let a=n.getUint16(l,!i);if(l+=2,0===a)continue;let r=new Uint8Array(e.slice(l,l+a));l+=a;let o=k.parseSPS(r);if(0!==t)continue;s.codecWidth=o.codec_size.width,s.codecHeight=o.codec_size.height,s.presentWidth=o.present_size.width,s.presentHeight=o.present_size.height,s.profile=o.profile_string,s.level=o.level_string,s.bitDepth=o.bit_depth,s.chromaFormat=o.chroma_format,s.sarRatio=o.sar_ratio,s.frameRate=o.frame_rate,!1!==o.frame_rate.fixed&&0!==o.frame_rate.fps_num&&0!==o.frame_rate.fps_den||(s.frameRate=this._referenceFrameRate);let h=s.frameRate.fps_den,d=s.frameRate.fps_num;s.refSampleDuration=s.timescale*(h/d);let c=r.subarray(1,4),u="avc1.";for(let e=0;e<3;e++){let t=c[e].toString(16);t.length<2&&(t="0"+t),u+=t}s.codec=u;let m=this._mediaInfo;m.width=s.codecWidth,m.height=s.codecHeight,m.fps=s.frameRate.fps,m.profile=s.profile,m.level=s.level,m.refFrames=o.ref_frames,m.chromaFormat=o.chroma_format_string,m.sarNum=s.sarRatio.width,m.sarDen=s.sarRatio.height,m.videoCodec=u,m.hasAudio?null!=m.audioCodec&&(m.mimeType=\'video/x-flv; codecs="\'+m.videoCodec+","+m.audioCodec+\'"\'):m.mimeType=\'video/x-flv; codecs="\'+m.videoCodec+\'"\',m.isComplete()&&this._onMediaInfo(m)}let c=n.getUint8(l);if(0!==c){c>1&&t.w(this.TAG,`Flv: Strange AVCDecoderConfigurationRecord: PPS Count = ${c}`),l++;for(let e=0;e<c;e++){let e=n.getUint16(l,!i);l+=2,0!==e&&(l+=e)}s.avcc=new Uint8Array(e.length),s.avcc.set(new Uint8Array(e),0),t.v(this.TAG,"Parsed AVCDecoderConfigurationRecord"),this._isInitialMetadataDispatched()?this._dispatch&&(this._audioTrack.length||this._videoTrack.length)&&this._onDataAvailable(this._audioTrack,this._videoTrack):this._videoInitialMetadataDispatched=!0,this._dispatch=!1,this._onTrackMetadata("video",s)}else this._onError(d,"Flv: Invalid AVCDecoderConfigurationRecord: No PPS")}_parseAVCVideoData(e,s,a,i,n){t.v(this.TAG,s,a,this._timestampBase);let r=this._littleEndian,o=new DataView(e.buffer),h=[],d=0,l=e.length,c=0;const u=this._naluLengthSize;let m=this._timestampBase+s,g=1===i;for(;c<l;){if(c+4>=l){t.w(this.TAG,`Malformed Nalu near timestamp ${m}, offset = ${c}, dataSize = ${l}`);break}let s=o.getUint32(c,!r);if(3===u&&(s>>>=8),s>l-u)return void t.w(this.TAG,`Malformed Nalus near timestamp ${m}, NaluSize > DataSize!`);let a=31&o.getUint8(c+u);5===a&&(g=!0);let i=new Uint8Array(e.slice(c,c+u+s)),n={type:a,data:i};h.push(n),d+=i.byteLength,c+=u+s}if(h.length){let e=this._videoTrack,t={units:h,length:d,isKeyframe:g,dts:m,cts:n,pts:m+n};g&&(t.fileposition=a),e.samples.push(t),e.length+=d}}},this.media_handler.onError=(e,s)=>{t.d(this.TAG,e,s),postMessage(["onError",e,s])},this.media_handler.onMediaInfo=e=>{t.d(this.TAG,e),postMessage(["onMediaInfo",e])},this.media_handler.onMetaDataArrived=e=>{postMessage(["onMetaDataArrived",e])},this.media_handler.onScriptDataArrived=e=>{postMessage(["onScriptDataArrived",e])},this.media_handler.onScriptDataArrived=e=>{postMessage(["onMetaDataArrived",e])},this.media_handler.onScriptDataArrived=e=>{postMessage(["onMetaDataArrived",e])}}destroy(){this.media_handler.destroy(),this.media_handler=null,this.chunk_parser=null}parseChunk(e){t.d(this.TAG,"parseChunk: "+e.length),this.chunk_parser.parseChunk(e)}onMessage(e){switch(t.d(this.TAG," onMessage: "+e.getMessageType()+" StreamID:"+e.getMessageStreamID()),e.getMessageType()){case 1:case 2:case 3:case 5:case 6:this.netconnections[e.getMessageStreamID()].parseMessage(e);break;case 4:this._handleUserControlMessage(e);break;case 8:t.d(this.TAG,"AUDIOFRAME: ",e),this.media_handler.handleMediaMessage(e);break;case 9:t.d(this.TAG,"VIDEOFRAME: ",e),this.media_handler.handleMediaMessage(e);break;case 18:t.d(this.TAG,"DATAFRAME: ",e),this.media_handler.handleMediaMessage(e);break;case 19:t.d(this.TAG,"SharedObjectMessage",e);break;case 20:let s=(new E).parseAMF0(e.getPayload());switch(t.d(this.TAG,"AMF0",s),s[0]){case"_error":t.e(this.TAG,s);break;case"_result":switch(this.trackedCommand){case"connect":t.d(this.TAG,"got _result: "+s[3].code),"NetConnection.Connect.Success"===s[3].code&&(postMessage([s[3].code]),this.createStream(null));break;case"createStream":t.d(this.TAG,"got _result: "+s[3]),s[3]&&(this.current_stream_id=s[4],postMessage(["RTMPStreamCreated",s[3],s[4]]));break;case"play":case"pause":break;default:t.w("tracked command:"+this.trackedCommand)}break;case"onStatus":t.d(this.TAG,"onStatus: "+s[3].code),postMessage([s[3].code]);break;default:t.w(this.TAG,"CommandMessage "+s[0]+" not yet implemented")}break;case 22:break;case 15:case 16:case 17:t.e(this.TAG,"AMF3 is not yet implemented");break;default:t.d(this.TAG,"[MessageType: "+c.MessageTypes[e.getMessageType()]+"("+e.getMessageType()+")")}}connect(e){const t=new E(["connect",1,e]);this._sendCommand(3,t)}createStream(e){const t=new E(["createStream",1,e]);this._sendCommand(3,t)}deleteStream(e){const t=new E(["deleteStream",1,null,e]);this._sendCommand(3,t)}play(e){const t=new E(["play",1,null,e]);this._sendCommand(3,t)}stop(){this.deleteStream(this.current_stream_id)}pause(e){if(this.paused!==e){this.paused=e;const t=new E(["pause",0,null,e,0]);this._sendCommand(3,t)}}receiveVideo(e){const t=new E(["receiveVideo",0,null,e]);this._sendCommand(3,t)}receiveAudio(e){const t=new E(["receiveAudio",0,null,e]);this._sendCommand(3,t)}_sendCommand(e,s){t.d(this.TAG,"sendCommand:",s),this.trackedCommand=s.getCommand();let a=new c(s.getBytes());a.setMessageType(20),a.setMessageStreamID(0);const i=new u(a);i.setChunkStreamID(e);let n=i.getBytes();this.netconnections[0]=new class{TAG="NetConnection";WindowAcknowledgementSize;MessageStreamID;CHUNK_SIZE=128;BandWidth;socket;constructor(e,s){this.MessageStreamID=e,t.d(this.TAG,s),this.handler=s,this.socket=s.socket}parseMessage(e){let s=e.getPayload();switch(e.getMessageType()){case 1:this.CHUNK_SIZE=s[0]<<24|s[1]<<16|s[2]<<8|s[3],this.handler.setChunkSize(this.CHUNK_SIZE);break;case 2:case 3:case 5:this.WindowAcknowledgementSize=s[0]<<24|s[1]<<16|s[2]<<8|s[3],t.i(this.TAG,"WindowAcknowledgementSize: "+this.WindowAcknowledgementSize);break;case 6:this.BandWidth=s[0]<<24|s[1]<<16|s[2]<<8|s[3],t.i(this.TAG,"SetPeerBandwidth: "+this.BandWidth);let e=new _(5,this.WindowAcknowledgementSize),a=new c(e.getBytes());a.setMessageType(5);const i=new u(a);i.setChunkStreamID(2),t.i(this.TAG,"send WindowAcksize"),this.socket.send(i.getBytes())}}}(0,this),this.socket.send(n)}setChunkSize(e){this.chunk_parser.setChunkSize(e)}_getNextMessageStreamID(){return this.netconnections.length}_getNextChunkStreamID(){return++this.chunk_stream_id}_handleUserControlMessage(e){let s=e.getPayload();switch(this.event_type=s[0]<<8|s[1],s=s.slice(2),this.event_type){case 0:case 1:case 2:case 4:case 6:case 7:this.event_data1=s[0]<<24|s[1]<<16|s[2]<<8|s[3];break;case 3:this.event_data1=s[0]<<24|s[1]<<16|s[2]<<8|s[3],this.event_data2=s[4]<<24|s[5]<<16|s[6]<<8|s[7]}if(6===this.event_type){postMessage(["UserControlMessage",["ping",this.event_data1]]);const e=new g;e.setType(7),e.setEventData(this.event_data1);let s=new c(e.getBytes());s.setMessageType(4);const a=new u(s);a.setChunkStreamID(2),t.i(this.TAG,"send Pong"),this.socket.send(a.getBytes())}}}(N.getSocket()),t.d(L,"connect to RTMPManager"),N.registerMessageHandler((e=>{V.parseChunk(new Uint8Array(e.data))})),postMessage(["RTMPHandshakeDone"])):(t.e(L,"Handshake failed"),postMessage(["RTMPHandshakeFailed"]))},e.do()}else t.v(this.TAG,"WSSConnectFailed"),postMessage(["WSSConnectFailed"])}));break;case"connect":if(!V){t.e(this.TAG,"RTMP not connected");break}V.connect({app:i=a.appName,flashVer:"WebRTMP 0,0,1",tcUrl:"rtmp://"+F+":1935/"+i,fpad:!1,capabilities:15,audioCodecs:1024,videoCodecs:128,videoFunction:0});break;case"play":if(!V){t.e(this.TAG,"RTMP not connected");break}V.play(a.streamName);break;case"stop":if(!V){t.e(this.TAG,"RTMP not connected");break}V.stop();break;case"pause":if(!V){t.e(this.TAG,"RTMP not connected");break}V.pause(a.enable);break;case"disconnect":V&&V.destroy(),N.close();break;case"loglevels":t.d(L,"setting loglevels",a.loglevels),t.loglevels=a.loglevels;break;default:t.w(L,"Unknown CMD: "+a.cmd)}var i}),!1),postMessage(["Started"])})();\n', "Worker", void 0, void 0)
        }

        class S {
            TAG = "WebRTMP";
            _mediaElement = null;

            constructor() {
                this.wss = new class {
                    TAG = "WebRTMP_Controller";
                    host = document.location.host;
                    port = 9001;
                    WSSReconnect = !1;
                    isConnected = !1;
                    WebRTMPWorker = new v;

                    constructor() {
                        t.loglevels = {
                            RTMPMessage: t.ERROR,
                            RTMPMessageHandler: t.WARN,
                            RTMPMediaMessageHandler: t.ERROR,
                            ChunkParser: t.WARN,
                            RTMPHandshake: t.ERROR,
                            Chunk: t.OFF,
                            MP4Remuxer: t.ERROR,
                            Transmuxer: t.WARN,
                            EventEmitter: t.DEBUG,
                            MSEController: t.INFO,
                            WebRTMP: t.DEBUG,
                            WebRTMP_Controller: t.WARN,
                            "WebRTMP Worker": t.WARN,
                            AMF: t.WARN,
                            WSSConnectionManager: t.DEBUG
                        }, this._emitter = new n, this.WebRTMPWorker.addEventListener("message", (e => {
                            this.WorkerListener(e)
                        }))
                    }

                    open(e, t) {
                        return new Promise(((s, i) => {
                            if (this.isConnected) return i("Already Connected. Please disconnect first");
                            this._emitter.waitForEvent("RTMPHandshakeDone", s), this._emitter.waitForEvent("WSSConnectFailed", i), e && (this.host = e), t && (this.port = t), this.WebRTMPWorker.postMessage({
                                cmd: "open",
                                host: this.host,
                                port: this.port
                            })
                        }))
                    }

                    disconnect() {
                        this.WSSReconnect = !1, this.WebRTMPWorker.postMessage({cmd: "disconnect"})
                    }

                    connect(e) {
                        return new Promise(((t, s) => {
                            this._emitter.waitForEvent("RTMPStreamCreated", t), this.WebRTMPWorker.postMessage({
                                cmd: "connect",
                                appName: e
                            })
                        }))
                    }

                    play(e) {
                        this.WebRTMPWorker.postMessage({cmd: "play", streamName: e})
                    }

                    stop() {
                        this.WebRTMPWorker.postMessage({cmd: "stop"})
                    }

                    pause(e) {
                        this.WebRTMPWorker.postMessage({cmd: "pause", enable: e})
                    }

                    addEventListener(e, t, s) {
                        this._emitter.addEventListener(e, t, s)
                    }

                    removeEventListener(e, t) {
                        this._emitter.removeEventListener(e, t)
                    }

                    removeAllEventListener(e) {
                        this._emitter.removeAllEventListener(e)
                    }

                    WorkerListener(e) {
                        const s = e.data;
                        switch (s[0]) {
                            case"ConnectionLost":
                                this._emitter.emit("ConnectionLost"), t.d(this.TAG, "Event ConnectionLost"), this.isConnected = !1, this.WSSReconnect && (t.w(this.TAG, "[ WorkerListener ] Reconnect timed"), window.setTimeout((() => {
                                    t.w(this.TAG, "timed Reconnect"), this.open(this.host, this.port)
                                }), 1e3));
                                break;
                            case"Connected":
                                t.d(this.TAG, "Event Connected"), this._emitter.emit("Connected"), this.isConnected = !0;
                                break;
                            case"Started":
                                this.WebRTMPWorker.postMessage({cmd: "loglevels", loglevels: this.loglevels});
                                break;
                            default:
                                t.i(this.TAG, s[0], s.slice(1)), this._emitter.emit(s[0], s.slice(1))
                        }
                    }
                }, this._config = d, this.wss.addEventListener("RTMPMessageArrived", (e => {
                    t.d(this.TAG, "RTMPMessageArrived", e)
                })), this.wss.addEventListener("ProtocolControlMessage", (e => {
                    t.d(this.TAG, "ProtocolControlMessage", e)
                })), this.wss.addEventListener("UserControlMessage", (e => {
                    t.d(this.TAG, "UserControlMessage", e)
                })), this.wss.addEventListener("ConnectionLost", (() => {
                })), this._emitter = new n, this.e = {
                    onvLoadedMetadata: this._onvLoadedMetadata.bind(this),
                    onvCanPlay: this._onvCanPlay.bind(this),
                    onvStalled: this._onvStalled.bind(this),
                    onvProgress: this._onvProgress.bind(this),
                    onvPlay: this._onvPlay.bind(this),
                    onvPause: this._onvPause.bind(this),
                    onAppendInitSegment: this._appendMediaSegment.bind(this),
                    onAppendMediaSegment: this._appendMediaSegment.bind(this)
                }
            }

            _checkAndResumeStuckPlayback(e) {
                let s = this._mediaElement;
                if (e || !this._receivedCanPlay || s.readyState < 2) {
                    let e = s.buffered;
                    e.length > 0 && s.currentTime < e.start(0) && (t.w(this.TAG, `Playback seems stuck at ${s.currentTime}, seek to ${e.start(0)}`), this._mediaElement.currentTime = e.start(0), this._mediaElement.removeEventListener("progress", this.e.onvProgress))
                } else this._mediaElement.removeEventListener("progress", this.e.onvProgress)
            }

            _onvLoadedMetadata() {
                null != this._pendingSeekTime && (this._mediaElement.currentTime = this._pendingSeekTime, this._pendingSeekTime = null)
            }

            _onvCanPlay(e) {
                t.d(this.TAG, "onvCanPlay", e), this._mediaElement.play().then((() => {
                    t.d(this.TAG, "promise play")
                })), this._receivedCanPlay = !0, this._mediaElement.removeEventListener("canplay", this.e.onvCanPlay)
            }

            _onvStalled() {
                this._checkAndResumeStuckPlayback(!0)
            }

            _onvProgress() {
                this._checkAndResumeStuckPlayback()
            }

            _onmseBufferFull() {
                t.w(this.TAG, "MSE SourceBuffer is full")
            }

            _onvPlay(e) {
                t.d(this.TAG, "play:", e), this.pause(!1)
            }

            _onvPause(e) {
                t.d(this.TAG, "pause", e), this.pause(!0)
            }

            destroy() {
                t.w(this.TAG, "destroy webrtmp"), this._mediaElement && this.detachMediaElement(), this.e = null, this._emitter.removeAllListener(), this._emitter = null
            }

            disconnect() {
                this.wss.disconnect(), this.wss.removeAllEventListener("RTMPHandshakeDone"), this.wss.removeAllEventListener("WSSConnectFailed")
            }

            play(e) {
                return this.wss.play(e), this._mediaElement.play()
            }

            stopLoad() {
                this._mediaElement.pause()
            }

            open(e, t) {
                return this.wss.open(e, t)
            }

            connect(e) {
                return this.wss.connect(e)
            }

            pause(e) {
                this.wss.pause(e), e ? this._mediaElement.pause() : (this.kerkDown = 10, this._mediaElement.play().then((() => {
                })))
            }

            detachMediaElement() {
                this.wss.removeAllEventListener(l), this.wss.removeAllEventListener(c), this._mediaElement && (this._msectl.detachMediaElement(), this._mediaElement.removeEventListener("loadedmetadata", this.e.onvLoadedMetadata), this._mediaElement.removeEventListener("canplay", this.e.onvCanPlay), this._mediaElement.removeEventListener("stalled", this.e.onvStalled), this._mediaElement.removeEventListener("progress", this.e.onvProgress), this._mediaElement.removeEventListener("play", this.e.onvPlay), this._mediaElement.removeEventListener("pause", this.e.onvPause), this._mediaElement = null), this._msectl && (this._msectl.destroy(), this._msectl = null), this.disconnect()
            }

            attachMediaElement(e) {
                this._mediaElement = e, e.addEventListener("loadedmetadata", this.e.onvLoadedMetadata), e.addEventListener("canplay", this.e.onvCanPlay), e.addEventListener("stalled", this.e.onvStalled), e.addEventListener("progress", this.e.onvProgress), e.addEventListener("play", this.e.onvPlay), e.addEventListener("pause", this.e.onvPause), this._msectl = new class {
                    TAG = "MSEController";

                    constructor(e) {
                        this._config = e, this._emitter = new n, this._config.isLive && null == this._config.autoCleanupSourceBuffer && (this._config.autoCleanupSourceBuffer = !0), this.e = {
                            onSourceOpen: this._onSourceOpen.bind(this),
                            onSourceEnded: this._onSourceEnded.bind(this),
                            onSourceClose: this._onSourceClose.bind(this),
                            onSourceBufferError: this._onSourceBufferError.bind(this),
                            onSourceBufferUpdateEnd: this._onSourceBufferUpdateEnd.bind(this)
                        }, this._mediaSource = null, this._mediaSourceObjectURL = null, this._mediaElement = null, this._isBufferFull = !1, this._hasPendingEos = !1, this._requireSetMediaDuration = !1, this._pendingMediaDuration = 0, this._pendingSourceBufferInit = [], this._mimeTypes = {
                            video: null,
                            audio: null
                        }, this._sourceBuffers = {video: null, audio: null}, this._lastInitSegments = {
                            video: null,
                            audio: null
                        }, this._pendingSegments = {video: [], audio: []}, this._pendingRemoveRanges = {
                            video: [],
                            audio: []
                        }, this._idrList = new r
                    }

                    destroy() {
                        (this._mediaElement || this._mediaSource) && this.detachMediaElement(), this.e = null, this._emitter.removeAllListener(), this._emitter = null
                    }

                    on(e, t) {
                        this._emitter.addListener(e, t)
                    }

                    off(e, t) {
                        this._emitter.removeListener(e, t)
                    }

                    attachMediaElement(e) {
                        if (t.i(this.TAG, "attach"), this._mediaSource) throw new h("MediaSource has been attached to an HTMLMediaElement!");
                        let s = this._mediaSource = new window.MediaSource;
                        s.addEventListener("sourceopen", this.e.onSourceOpen), s.addEventListener("sourceended", this.e.onSourceEnded), s.addEventListener("sourceclose", this.e.onSourceClose), this._mediaElement = e, this._mediaSourceObjectURL = window.URL.createObjectURL(this._mediaSource), e.src = this._mediaSourceObjectURL
                    }

                    detachMediaElement() {
                        if (t.i(this.TAG, "detach"), this._mediaSource) {
                            let e = this._mediaSource;
                            if ("open" === e.readyState) try {
                                e.endOfStream()
                            } catch (e) {
                                t.e(this.TAG, e.message)
                            }
                            for (let s in this._sourceBuffers) {
                                let i = this._pendingSegments[s];
                                i.splice(0, i.length), this._pendingSegments[s] = null, this._pendingRemoveRanges[s] = null, this._lastInitSegments[s] = null;
                                let a = this._sourceBuffers[s];
                                if (a) {
                                    if (t.i(this.TAG, "try to remove sourcebuffer: " + s), "closed" !== e.readyState) {
                                        try {
                                            t.i(this.TAG, "removing sourcebuffer: " + s), e.removeSourceBuffer(a)
                                        } catch (e) {
                                            t.e(this.TAG, e.message)
                                        }
                                        a.removeEventListener("error", this.e.onSourceBufferError), a.removeEventListener("updateend", this.e.onSourceBufferUpdateEnd)
                                    }
                                    this._mimeTypes[s] = null, this._sourceBuffers[s] = null
                                }
                            }
                            e.removeEventListener("sourceopen", this.e.onSourceOpen), e.removeEventListener("sourceended", this.e.onSourceEnded), e.removeEventListener("sourceclose", this.e.onSourceClose), this._pendingSourceBufferInit = [], this._isBufferFull = !1, this._idrList.clear(), this._mediaSource = null
                        } else t.w(this.TAG, "no mediasource attached");
                        this._mediaElement && (this._mediaElement.src = "", this._mediaElement.removeAttribute("src"), this._mediaElement = null), this._mediaSourceObjectURL && (window.URL.revokeObjectURL(this._mediaSourceObjectURL), this._mediaSourceObjectURL = null)
                    }

                    appendInitSegment(e, s) {
                        if (t.i(this.TAG, "appendInitSegment", e), !this._mediaSource || "open" !== this._mediaSource.readyState) return this._pendingSourceBufferInit.push(e), void this._pendingSegments[e.type].push(e);
                        let i = e, a = `${i.container}`;
                        i.codec && i.codec.length > 0 && (a += `;codecs=${i.codec}`);
                        let n = !1;
                        if (t.v(this.TAG, "Received Initialization Segment, mimeType: " + a), this._lastInitSegments[i.type] = i, a !== this._mimeTypes[i.type]) {
                            if (this._mimeTypes[i.type]) t.v(this.TAG, `Notice: ${i.type} mimeType changed, origin: ${this._mimeTypes[i.type]}, target: ${a}`); else {
                                n = !0;
                                try {
                                    let e = this._sourceBuffers[i.type] = this._mediaSource.addSourceBuffer(a);
                                    e.addEventListener("error", this.e.onSourceBufferError), e.addEventListener("updateend", this.e.onSourceBufferUpdateEnd)
                                } catch (e) {
                                    return t.e(this.TAG, e.message), void this._emitter.emit(u, {
                                        code: e.code,
                                        msg: e.message
                                    })
                                }
                            }
                            this._mimeTypes[i.type] = a
                        }
                        s || this._pendingSegments[i.type].push(i), n || this._sourceBuffers[i.type] && !this._sourceBuffers[i.type].updating && this._doAppendSegments(), g.safari && "audio/mpeg" === i.container && i.mediaDuration > 0 && (this._requireSetMediaDuration = !0, this._pendingMediaDuration = i.mediaDuration / 1e3, this._updateMediaSourceDuration())
                    }

                    appendMediaSegment(e) {
                        t.d(this.TAG, "appendMediaSegment", e);
                        let s = e;
                        this._pendingSegments[s.type].push(s), this._config.autoCleanupSourceBuffer && this._needCleanupSourceBuffer() && this._doCleanupSourceBuffer();
                        let i = this._sourceBuffers[s.type];
                        !i || i.updating || this._hasPendingRemoveRanges() || this._doAppendSegments()
                    }

                    endOfStream() {
                        let e = this._mediaSource, t = this._sourceBuffers;
                        e && "open" === e.readyState ? t.video && t.video.updating || t.audio && t.audio.updating ? this._hasPendingEos = !0 : (this._hasPendingEos = !1, e.endOfStream()) : e && "closed" === e.readyState && this._hasPendingSegments() && (this._hasPendingEos = !0)
                    }

                    _needCleanupSourceBuffer() {
                        if (!this._config.autoCleanupSourceBuffer) return !1;
                        let e = this._mediaElement.currentTime;
                        for (let t in this._sourceBuffers) {
                            let s = this._sourceBuffers[t];
                            if (s) {
                                let t = s.buffered;
                                if (t.length >= 1 && e - t.start(0) >= this._config.autoCleanupMaxBackwardDuration) return !0
                            }
                        }
                        return !1
                    }

                    _doCleanupSourceBuffer() {
                        let e = this._mediaElement.currentTime;
                        for (let t in this._sourceBuffers) {
                            let s = this._sourceBuffers[t];
                            if (s) {
                                let i = s.buffered, a = !1;
                                for (let s = 0; s < i.length; s++) {
                                    let n = i.start(s), r = i.end(s);
                                    if (n <= e && e < r + 3) {
                                        if (e - n >= this._config.autoCleanupMaxBackwardDuration) {
                                            a = !0;
                                            let s = e - this._config.autoCleanupMinBackwardDuration;
                                            this._pendingRemoveRanges[t].push({start: n, end: s})
                                        }
                                    } else r < e && (a = !0, this._pendingRemoveRanges[t].push({start: n, end: r}))
                                }
                                a && !s.updating && this._doRemoveRanges()
                            }
                        }
                    }

                    _updateMediaSourceDuration() {
                        let e = this._sourceBuffers;
                        if (0 === this._mediaElement.readyState || "open" !== this._mediaSource.readyState) return;
                        if (e.video && e.video.updating || e.audio && e.audio.updating) return;
                        let s = this._mediaSource.duration, i = this._pendingMediaDuration;
                        i > 0 && (isNaN(s) || i > s) && (t.v(this.TAG, `Update MediaSource duration from ${s} to ${i}`), this._mediaSource.duration = i), this._requireSetMediaDuration = !1, this._pendingMediaDuration = 0
                    }

                    _doRemoveRanges() {
                        for (let e in this._pendingRemoveRanges) {
                            if (!this._sourceBuffers[e] || this._sourceBuffers[e].updating) continue;
                            let t = this._sourceBuffers[e], s = this._pendingRemoveRanges[e];
                            for (; s.length && !t.updating;) {
                                let e = s.shift();
                                t.remove(e.start, e.end)
                            }
                        }
                    }

                    _doAppendSegments() {
                        let e = this._pendingSegments;
                        for (let s in e) if (this._sourceBuffers[s] && !this._sourceBuffers[s].updating && e[s].length > 0) {
                            let i = e[s].shift();
                            if (i.timestampOffset) {
                                let e = this._sourceBuffers[s].timestampOffset, a = i.timestampOffset / 1e3;
                                Math.abs(e - a) > .1 && (t.v(this.TAG, `Update MPEG audio timestampOffset from ${e} to ${a}`), this._sourceBuffers[s].timestampOffset = a), delete i.timestampOffset
                            }
                            if (!i.data || 0 === i.data.byteLength) continue;
                            try {
                                this._sourceBuffers[s].appendBuffer(i.data), this._isBufferFull = !1, "video" === s && i.hasOwnProperty("info") && this._idrList.appendArray(i.info.syncPoints)
                            } catch (e) {
                                this._pendingSegments[s].unshift(i), 22 === e.code ? (this._isBufferFull || this._emitter.emit(m), this._isBufferFull = !0) : (t.e(this.TAG, e.message), this._emitter.emit(u, {
                                    code: e.code,
                                    msg: e.message
                                }))
                            }
                        }
                    }

                    _onSourceOpen() {
                        if (t.v(this.TAG, "MediaSource onSourceOpen"), this._mediaSource.removeEventListener("sourceopen", this.e.onSourceOpen), this._pendingSourceBufferInit.length > 0) {
                            let e = this._pendingSourceBufferInit;
                            for (; e.length;) {
                                let t = e.shift();
                                this.appendInitSegment(t, !0)
                            }
                        }
                        this._hasPendingSegments() && this._doAppendSegments(), this._emitter.emit("source_open")
                    }

                    _onSourceEnded() {
                        t.v(this.TAG, "MediaSource onSourceEnded")
                    }

                    _onSourceClose() {
                        t.v(this.TAG, "MediaSource onSourceClose"), this._mediaSource && null != this.e && (this._mediaSource.removeEventListener("sourceopen", this.e.onSourceOpen), this._mediaSource.removeEventListener("sourceended", this.e.onSourceEnded), this._mediaSource.removeEventListener("sourceclose", this.e.onSourceClose))
                    }

                    _hasPendingSegments() {
                        let e = this._pendingSegments;
                        return e.video.length > 0 || e.audio.length > 0
                    }

                    _hasPendingRemoveRanges() {
                        let e = this._pendingRemoveRanges;
                        return e.video.length > 0 || e.audio.length > 0
                    }

                    _onSourceBufferUpdateEnd() {
                        this._requireSetMediaDuration ? this._updateMediaSourceDuration() : this._hasPendingRemoveRanges() ? this._doRemoveRanges() : this._hasPendingSegments() ? this._doAppendSegments() : this._hasPendingEos && this.endOfStream(), this._emitter.emit("update_end")
                    }

                    _onSourceBufferError(e) {
                        t.e(this.TAG, `SourceBuffer Error: ${e}`)
                    }
                }(d), this._msectl.on(m, this._onmseBufferFull.bind(this)), this._msectl.on(u, (e => {
                    this._emitter.emit("error", "MediaError", "MediaMSEError", e)
                })), this.wss.addEventListener(l, this._appendInitSegment.bind(this), !0), this.wss.addEventListener(c, this._appendMediaSegment.bind(this), !0), this._msectl.attachMediaElement(e)
            }

            _appendInitSegment(e) {
                t.i(this.TAG, l, e[0], e[1]), this._msectl.appendInitSegment(e[1])
            }

            _appendMediaSegment(e) {
                t.t(this.TAG, c, e[0], e[1]), this._msectl.appendMediaSegment(e[1]), this.kerkDown && (this.kerkDown--, this._mediaElement.currentTime = 2e9, this.kerkDown || t.d(this.TAG, "kerkdown reached"))
            }
        }

        function y() {
            return new S
        }

        window.Log = t
    })(), a
})()));
//# sourceMappingURL=webrtmp.js.map