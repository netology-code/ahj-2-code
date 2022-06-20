const videoPlayer = document.querySelector(".video");
const record = document.querySelector(".record");
const stop = document.querySelector(".stop");

record.addEventListener("click", async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  // videoPlayer.srcOject = stream;

  // videoPlayer.addEventListener("canplay", () => {
  //   videoPlayer.play();
  // });

  const recorder = new MediaRecorder(stream);
  const chunks = [];

  recorder.addEventListener("start", () => {
    console.log("start");
  });

  recorder.addEventListener("dataavailable", (event) => {
    chunks.push(event.data);
  });

  recorder.addEventListener("stop", () => {
    const blob = new Blob(chunks);

    videoPlayer.src = URL.createObjectURL(blog);
  });

  recorder.start();

  stop.addEventListener("click", () => {
    recorder.stop();
    stream.getTracks().forEach((track) => track.stop());
  });
});

const audioPlayer = document.querySelector(".audio");
const audioRecord = document.querySelector(".audio-record");
const audioStop = document.querySelector(".audio-stop");

audioRecord.addEventListener("click", async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });

  // videoPlayer.srcOject = stream;

  // videoPlayer.addEventListener("canplay", () => {
  //   videoPlayer.play();
  // });

  const recorder = new MediaRecorder(stream);
  const chunks = [];

  recorder.addEventListener("start", () => {
    console.log("start");
  });

  recorder.addEventListener("dataavailable", (event) => {
    chunks.push(event.data);
  });

  recorder.addEventListener("stop", () => {
    const blob = new Blob(chunks);

    audioPlayer.src = URL.createObjectURL(blog);
  });

  recorder.start();

  audioStop.addEventListener("click", () => {
    recorder.stop();
    stream.getTracks().forEach((track) => track.stop());
  });
});
