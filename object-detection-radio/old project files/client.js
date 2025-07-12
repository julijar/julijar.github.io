const video = document.getElementById("webcam");
const loadModelButton = document.getElementById("loadModel");
const enableWebcamButton = document.getElementById("webcamButton");
const playStateButton = document.getElementById("playStateButton");
const PlantSlider = document.getElementById("PlantSlider");
const stabilizingSlider = document.getElementById("stabilizingSlider");
const PlantStationsMarkers = document.querySelectorAll(
  "#PlantStationsMarkers li"
);

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

let predictionActive = false;

const deepScan = document.getElementById("deepScanning");
const person = document.getElementById("person");
const beepScan = document.getElementById("beepScan");
const static = [
  document.getElementById("radioStatic1"),
  document.getElementById("radioStatic2"),
  document.getElementById("radioStatic3"),
];
const plantSounds = [
  document.getElementById("plantSound1"),
  document.getElementById("plantSound2"),
  document.getElementById("plantSound3"),
];

let volumeState = [0, 0, 0];
let model;

function enableCam(event) {
  if (!model) {
    console.log("no model");
    return;
  }

  const constraints = {
    video: true,
  };

  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    video.srcObject = stream;
    video.addEventListener("loadeddata", function () {
      startSounds();
      togglePlayState(true);
    });
    event.target.classList.add("removed");
  });
}

async function loadModel() {
  const demosSection = document.getElementById("demos");
  return await cocoSsd.load().then(
    function (loadedModel) {
      console.log("Model loaded");
      demosSection.classList.remove("invisible");
      return loadedModel;
    },
    function (error) {
      console.error(error);
      return false;
    }
  );
}

function togglePlayState(state = !predictionActive) {
  predictionActive = state;
  console.log("new state:", predictionActive);
  if (predictionActive) {
    loop();
  }
}

function startSounds() {
  deepScan.volume = 0;
  deepScan.loop = true;
  deepScan.play();
  person.volume = 0;
  person.loop = true;
  person.play();

  static.forEach(function (el) {
    el.volume = 0;
    el.loop = true;
    el.play();
  });
  plantSounds.forEach(function (el) {
    el.volume = 0;
    el.loop = true;
    el.play();
  });
}

function interpolateVolume(oldVol, targetVol, friction) {
  const diff = Math.max(targetVol, 0) - Math.max(oldVol, 0);
  const newVol = Math.max(oldVol + diff * friction, 0);
  return newVol;
}

async function loop() {
  const predictions = await model.detect(video).then((predictions) => predictions);
  const plantsDetected = predictions.filter(
    (prediction) => prediction.class == "potted plant"
  );
  const friction = stabilizingSlider.value;

  document.getElementById("predictionCount").innerHTML = plantsDetected.length;

  if (plantsDetected.length) {
    deepScan.volume = interpolateVolume(deepScan.volume, 0, friction);
  } else {
    deepScan.volume = interpolateVolume(deepScan.volume, 0.4, friction);
  }

  const ctx = video.getContext('2d');
  ctx.clearRect(0, 0, video.width, video.height);

  for (let i = 0; i < 3; i++) {
    const plant = plantsDetected[i];
    let targetVolume = 0;
    let plantPosition = "-100%";

    if (plant) {
      const sliderDistance = Math.abs(PlantSlider.value - plant.score);
      targetVolume = 1 - 2 * sliderDistance;
      plantPosition = plant.score * 100 + "%";

      // Draw a 1px solid white frame around the detected object
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 1;
      ctx.strokeRect(plant.bbox[0], plant.bbox[1], plant.bbox[2], plant.bbox[3]);
    }

    PlantStationsMarkers[i].style.left = plantPosition;
    let newVolume = interpolateVolume(
      plantSounds[i].volume,
      targetVolume,
      friction
    );

    static[i].volume = 1 - newVolume;
    plantSounds[i].volume = newVolume;
  }

  let personTargetVolume = 0;
  const personVolume = interpolateVolume(
    person.volume,
    personTargetVolume,
    friction
  );
  person.volume = personVolume;

  if (predictionActive) {
    setTimeout(loop, 100);
  }
}

function init() {
  if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
    console.warn("getUserMedia() is not supported by your browser");
    return;
  }

  loadModelButton.addEventListener("click", async function (ev) {
    model = await loadModel();
    ev.target.classList.add("removed");
  });

  enableWebcamButton.addEventListener("click", function (ev) {
    createAudioContext();
    enableCam(ev);
  });

  playStateButton.addEventListener("click", function (ev) {
    togglePlayState();
  });

  startSounds();
}

function createAudioContext() {
  if (!audioContext) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();
  }
}

init();
