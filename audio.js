// audio.js

let localStream;
let peerConnection;
const config = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};

const localAudio = document.getElementById("localAudio");
const remoteAudio = document.getElementById("remoteAudio");

// گرفتن دسترسی به میکروفون
async function startAudio() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    localAudio.srcObject = localStream;

    peerConnection = new RTCPeerConnection(config);
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    peerConnection.ontrack = (event) => {
      remoteAudio.srcObject = event.streams[0];
    };

    // اتصال بین دو کاربر (سیگنالینگ نیاز داره: با WebSocket یا سرور)
    // اینجا فقط اسکلت کد هست، بدون signaling کامل

  } catch (err) {
    alert("دسترسی به میکروفون ممکن نیست: " + err.message);
  }
}

startAudio();
