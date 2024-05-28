



export const getVideoEl = (video) => {
  if (video.tagName === 'VIDEO') {
    return video;
  } else {
    return video.querySelector("video");
  }
}

async function playVideo(video) {
  if (video.api) {
    return video.api.play();
  } else {
    return video.play();
  }
}

function getIsMuted(video) {
  if (video.api) {
    return video.api.isMuted();
  } else {
    return !!getVideoEl(video).muted;
  }
}

function pauseVideo(video) {
  if (video.api) {
    video.api.pause();
  } else {
    getVideoEl(video).pause();
  }
}

function setMuted(video, isMuted) {
  if (isMuted) {
    if (getIsMuted(video)) {
      return
    }
  }
  if (video.api) {
    video.api.setMuted(isMuted);
  } else {
    getVideoEl(video).muted = isMuted;
  }
}

function resetVideo(videoEl) {
  // Stop any prior fades
  clearInterval(videoEl.fadeIntervalId);
}

export const fadeInVideoEl = (videoPlayer, interval = 200) => {

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
        vol += 0.4;
        if (vol > 1.0) vol = 1.0;
        videoEl.volume = vol.toFixed(2);
      } else {
        // Stop the setInterval when 0 is reached
        clearInterval(videoEl.fadeIntervalId);
      }
    }, interval);
  }
};

export const fadeOutVideoEl = ({ videoPlayer, interval = 200, pause = false }) => {

  const videoEl = getVideoEl(videoPlayer);
  if (videoEl.muted) {
    // The video has already been faded out, we don't need to do anything.
    return;
  }

  resetVideo(videoEl)

  if (videoEl.volume > 0.0) {
    let vol = videoEl.volume;

    videoEl.fadeIntervalId = setInterval(function () {
      // Reduce volume as long as it is above 0
      if (vol > 0) {
        vol -= 0.1;
        if (vol < 0.0) vol = 0.0;
        videoEl.volume = vol.toFixed(2);
      } else {
        // Stop the setInterval when 0 is reached
        setMuted(videoPlayer, true);
        pause && pauseVideo(videoPlayer);
        clearInterval(videoEl.fadeIntervalId);
      }
    }, interval);
  }
};

/** This has to be 0.0 for now (don't ask questions) */
export const OBSERVATION_RATIO = 0.0;

/** Controls proportion of screen to cut observer margin */
export const OBSERVATION_MARGIN_RATIO = 0.35;

/** Class name for currently active Odyssey block media */
export const CLASS_ACTIVE = 'play-active';

/** For debugging playback errors */
const playbackErrorLog = e => console.error('OAVP playback error:', e);

export const observeElements = ({ videos, value }: { videos: Element[]; value: boolean }) => {

  function videoIn(video) {
    if (value) {
      setMuted(video, false);
      fadeInVideoEl(video);
    }
    video.dataset.expected = 'playing'
    playVideo(video).catch(e => {
      // Sometimes the first play event fails due to a race condition.
      if (e.message.includes('request was interrupted by a new load request')) {
        return video.play().catch(playbackErrorLog);
      }
      playbackErrorLog(e);
    });
  }

  function videoOut(video) {
    video.dataset.expected = 'paused'
    if (value) {
      fadeOutVideoEl({ videoPlayer: video, pause: true });
    } else {
      pauseVideo(video)
    }
  }

  const intersectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      const video = getVideoEl(entry.target);
      if (!video) return;
      if (entry.intersectionRatio > OBSERVATION_RATIO) {
        videoIn(video);
      } else {
        // Observe going out of view
        videoOut(video);
      }
    });
  }, {
    root: null,
    rootMargin: `-${window.innerHeight * OBSERVATION_MARGIN_RATIO}px 0px`,
    threshold: OBSERVATION_RATIO
  });

  Array.from(videos).forEach(videoPlayer => {
    intersectionObserver.observe(videoPlayer);
  });

  return () => {
    intersectionObserver.disconnect();
  }
}