
function playVideo(video) {
  if (video.api) {
    return video.api.play();
  } else {
    return video.play();
  }
}

function getIsPaused(video) {
  if (video.api) {
    return video.api.isPaused();
  } else {
    return getVideoEl(video).paused;
  }
}

export function getIsMuted(video) {
  if (video.api) {
    return video.api.isMuted();
  } else {
    return !!getVideoEl(video).muted;
  }
}

export function pauseVideo(video) {
  if (video.api) {
    video.api.pause();
  } else {
    getVideoEl(video).pause();
  }
}

export const getVideoEl = (video) => {
  if (video.tagName === 'VIDEO') {
    return video;
  } else {
    return video.querySelector("video")
  }
}

export function setMuted(video, isMuted) {
  if (video.api) {
    video.api.setMuted(isMuted);
  } else {
    getVideoEl(video).muted = isMuted;
  }
}

export const fadeInVideoEl = videoPlayer => {
  // Get the actual video element
  const videoEl = getVideoEl(videoPlayer);

  // If we're set to unload, don't do it
  clearTimeout(videoEl.unloaderId);
  // If we're already fading out, then stop
  clearInterval(videoEl.fadeOutIntervalId);

  // Play the video
  console.log('playing', videoEl, videoPlayer)
  if (!isMuted.value && getIsMuted(videoPlayer)) setMuted(videoPlayer, false);
  videoEl.playsInline = true;
  if (getIsPaused(videoPlayer)) playVideo(videoPlayer);

  // Fade in
  if (videoEl.volume < 1.0) {
    let vol = videoEl.volume;
    const interval = 200;

    videoEl.fadeInIntervalId = setInterval(function () {
      // Reduce volume as long as it is above 0
      if (vol < 1.0) {
        vol += 0.4;
        if (vol > 1.0) vol = 1.0;
        videoEl.volume = vol.toFixed(2);
      } else {
        // Stop the setInterval when 0 is reached
        clearInterval(videoEl.fadeInIntervalId);
      }
    }, interval);
  }
};

export const fadeOutVideoEl = videoPlayer => {
  const videoEl = getVideoEl(videoPlayer);

  // If we're already fading in, then stop
  clearInterval(videoEl.fadeInIntervalId);

  if (videoEl.volume > 0.0) {
    let vol = videoEl.volume;
    const interval = 200;

    const intervalId = setInterval(function () {
      // Reduce volume as long as it is above 0
      if (vol > 0) {
        vol -= 0.1;
        if (vol < 0.0) vol = 0.0;
        videoEl.volume = vol.toFixed(2);
      } else {
        // Stop the setInterval when 0 is reached
        pauseVideo(videoPlayer);
        setMuted(videoPlayer, true);
        clearInterval(intervalId);
      }
    }, interval);
    videoEl.fadeInIntervalId = intervalId;
  }
};

/** This has to be 0.0 for now (don't ask questions) */
export const OBSERVATION_RATIO = 0.0;

/** Controls proportion of screen to cut observer margin */
export const OBSERVATION_MARGIN_RATIO = 0.35;

/** Class name for currently active Odyssey block media */
export const CLASS_ACTIVE = 'play-active';

// This is done when element observed
export const intersectionObserverCallback = (entries, observer) => {
  entries.forEach(entry => {
    const videoPlayer = entry.target.querySelector(VIDEO_PLAYER_QUERY_SELECTOR);
    if (!videoPlayer) return;
    if (entry.intersectionRatio > OBSERVATION_RATIO) {
      fadeInVideoEl(videoPlayer);
    } else {
      // Observe going out of view
      fadeOutVideoEl(videoPlayer);
    }
  });
};
/**
 * When an Odyssey contains multiple videos in blocks, intended to crossfade
 * between them, only the first video is observed, because the rest are
 * on-screen but invisible.
 *
 * Instead we check whether they're visible using a mutation observer on the
 * class property.
 */
export const mutationObserverCallback = (mutationList) => {
  mutationList.forEach(({ target, oldValue }) => {
    const isActive = target.classList.contains(CLASS_ACTIVE);
    const wasActive = oldValue.includes(CLASS_ACTIVE);

    // fade this vid in
    if (isActive && !wasActive) {
      return fadeInVideoEl(target);
    }

    // Fade this vid out
    if (!isActive && wasActive) {
      return fadeOutVideoEl(target);
    }
  });
}