const getUserVideo = () => navigator.mediaDevices?.getUserMedia({ video: true });

const stopUserVideo = (userVideo) => userVideo?.getVideoTracks().forEach((track) => track.stop());

export const getImage = (width, compression) =>
  new Promise((resolve, reject) => {
    const video = document.createElement('video');

    video.addEventListener('playing', () => {
      const height = video.videoHeight / (video.videoWidth / width);
      const canvas = document.createElement('canvas');

      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      canvas.getContext('2d').drawImage(video, 0, 0, width, height);
      stopUserVideo(video.srcObject);

      const image = new Image();
      image.src = canvas.toDataURL('image/jpeg', compression);

      resolve(image);
    });

    getUserVideo()
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })
      .catch(reject);
  });
