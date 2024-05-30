import { log } from "../../util/debug";




export const getVideoEl = (video) => {
  if (video.tagName === 'VIDEO') {
    return video;
  } else {
    return video.querySelector("video");
  }
}

function getIsMuted(video) {
  if (video.api) {
    return video.api.isMuted();
  } else {
    return !!getVideoEl(video).muted;
  }
}

function setMuted(video, isMuted) {
  if (isMuted) {
    if (getIsMuted(video)) {
      return;
    }
  }
  if (video.api) {
    video.api.setMuted(isMuted);

    // setMuted sets this flag, which stops Odyssey autoplaying video
    video.api.isUserInControl = false;
  } else {
    getVideoEl(video).muted = isMuted;
  }
}

function resetVideo(videoEl) {
  // Stop any prior fades
  clearInterval(videoEl.fadeIntervalId);
}

export const fadeInVideoEl = ({ videoPlayer, interval = 100 }) => {

  // Get the actual video element
  const videoEl = getVideoEl(videoPlayer);

  resetVideo(videoEl);

  videoEl.muted = false;
  videoEl.playsInline = true;

  // Fade in
  if (videoEl.volume < 1.0) {
    let vol = videoEl.volume;

    videoEl.fadeIntervalId = setInterval(function () {
      // Reduce volume as long as it is above 0
      if (vol < 1.0) {
        vol += 0.2;
        if (vol > 1.0) vol = 1.0;
        videoEl.volume = vol.toFixed(2);
      } else {
        // Stop the setInterval when 0 is reached
        clearInterval(videoEl.fadeIntervalId);
      }
    }, interval);
  }
};

export const fadeOutVideoEl = ({ videoPlayer, interval = 100 }) => {

  let isRunning = true;

  const promise = new Promise((resolve, reject) => {

    const videoEl = getVideoEl(videoPlayer);
    if (videoEl.muted) {
      // The video has already been faded out, we don't need to do anything.
      resolve();
      return;
    }

    resetVideo(videoEl);

    if (videoEl.volume > 0.0) {
      let vol = videoEl.volume;

      videoEl.fadeIntervalId = setInterval(function () {
        if (!isRunning) {
          log('fadeOutVideoEl', 'rejecting')
          return reject();
        }
        // Reduce volume as long as it is above 0
        if (vol > 0) {
          log('fadeOutVideoEl', 'adjusting volume')
          vol -= 0.05;
          if (vol < 0.0) vol = 0.0;
          videoEl.volume = vol.toFixed(2);
        } else {
          log('fadeOutVideoEl', 'volume is zero')
          // Stop the setInterval when 0 is reached
          setMuted(videoPlayer, true);
          resetVideo(videoEl);
          resolve();
        }
      }, interval);
    }
  });
  promise.cancel = () => {
    isRunning = false;
    log('fadeOutVideoEl', 'cancelling');
  };
  return promise;

};

/** This has to be 0.0 for now (don't ask questions) */
export const OBSERVATION_RATIO = 0.0;

/** Controls proportion of screen to cut observer margin */
export const OBSERVATION_MARGIN_RATIO = 0.35;

/** Class name for currently active Odyssey block media */
export const CLASS_ACTIVE = 'play-active';

export const overridePlayState = ({ videoPlayers, value }: { videoPlayers: Element[]; value: boolean }) => {
  const reversions: (() => void)[] = [];
  Array.from(videoPlayers).forEach(videoPlayer => {
    if (!videoPlayer.api) {
      log('init', 'error, video doesn\'t have API', videoPlayer);
      return;
    }

    // Tell Odyssey we want to play videos simultaneously.
    videoPlayer.api.isAmbient = true;

    // Adjust Odyssey's threshold for playing videos
    videoPlayer.api.willPlayAudio = true;

    if (value) {
      fadeInVideoEl({ videoPlayer });
    } else {
      fadeOutVideoEl({ videoPlayer });
      return;
    }

    // Extend Odyssey play function to fade in as required
    const oldPlay = videoPlayer.api.play;
    videoPlayer.api.play = () => {
      oldPlay.apply(videoPlayer);
      fadeInVideoEl({ videoPlayer });
    }
    reversions.push(() => {
      videoPlayer.api.play = oldPlay;
    })

    // Extend Odyssey pause function to fade out as required
    const oldPause = videoPlayer.api.pause;
    videoPlayer.api.pause = () => {
      fadeOutVideoEl({ videoPlayer }).then(() => {
        oldPause.apply(videoPlayer);
      }).catch(e => {
        // Don't do anything. This only throws if the fade out was interrupted by a fade in.
      })

    }
    reversions.push(() => {
      videoPlayer.api.pause = oldPause;
    })

  })

  return () => {
    log('revert', 'reverting changes to odyssey')
    reversions.forEach(revert => revert())
  }
}