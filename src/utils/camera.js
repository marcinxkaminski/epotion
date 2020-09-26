const getUserVideo = () => navigator.mediaDevices?.getUserMedia({ video: true });

const stopUserVideo = (userVideo) => userVideo?.getVideoTracks().forEach((track) => track.stop());

export const getPhoto = (width, compression) => new Promise((resolve, reject) => {
  const video = document.createElement('video');

  video.addEventListener('playing', () => {
    const height = video.videoHeight / (video.videoWidth / width);
    const canvas = document.createElement('canvas');

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    stopUserVideo(video.srcObject);

    resolve(canvas.toDataURL('image/jpeg', compression));
  });

  getUserVideo()
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch(reject);
});
