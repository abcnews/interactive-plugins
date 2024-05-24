<script lang="ts">
  import { onMount } from 'svelte';
  /**
   * @file
   * A "prefers reduced motion" component
   */
  import NotificationContainer from '../NotificationContainer/NotificationContainer.svelte';
  import {
    CLASS_ACTIVE,
    OBSERVATION_MARGIN_RATIO,
    OBSERVATION_RATIO,
    fadeInVideoEl,
    intersectionObserverCallback,
    mutationObserverCallback,
    setMuted
  } from './utils';
  const BODY_CLASS = 'is-audio-enabled';

  let value = false;
  let videos;
  let showButton = false;
  let enableAudioTextEl;
  let observers;

  $: {
    // Set a class on the body so we can target with CSS/other stuff.
    document.body.classList[value ? 'add' : 'remove'](BODY_CLASS);
  }

  /** find and return compatible videos + update observers */
  const scanForVideos = () => {
    /**
     * Supported video types.
     * 1. Odyssey video player root
     * 2. Any <video> element inside a `class="oavp-video"` parent
     */
    const VIDEO_PLAYER_QUERY_SELECTOR = '.VideoPlayer,.oavp-video video';
    const nodeList = Array.from(document.querySelectorAll(VIDEO_PLAYER_QUERY_SELECTOR));
    videos = nodeList;
    return nodeList;
  };

  const clearVideoObservers = () => {
    if (observers) {
      try {
        observers.intersectionObserver.disconnect();
      } catch (e) {}
      try {
        observers.mutationObserver.disconnect();
      } catch (e) {}
      observers.videoMuteTeardowns.forEach(teardown => teardown());
    }
  };

  onMount(() => {
    scanForVideos();
    // Showing and hiding the floating mute button
    const buttonObserverCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio === 0) {
          showButton = true;
        } else {
          showButton = false;
        }
      });
    };

    const buttonObserver = new IntersectionObserver(buttonObserverCallback, {
      root: null,
      rootMargin: `0px 0px ${window.innerHeight}px`,
      threshold: 0.0
    });

    buttonObserver.observe(enableAudioTextEl);

    return () => {
      buttonObserver.unobserve(enableAudioTextEl);
      buttonObserver.disconnect();

      clearVideoObservers();
    };
  });

  $: {
    if (value) {
      scanForVideos().forEach(video => {
        setMuted(video, value);
      });
    }

    // Fade in the currently on-screen Odyssey video, otherwise it will be
    // unmuted with a volume of 0
    const activeVideo = document.querySelector(`.${CLASS_ACTIVE}`);

    if (activeVideo) {
      fadeInVideoEl(activeVideo);
    }
  }

  $: {
    if (videos) {
      let videoMuteTeardowns = [];
      let eventListener;
      clearVideoObservers();

      // observe when videos scroll onto the screen
      const intersectionObserver = new IntersectionObserver(intersectionObserverCallback, {
        root: null,
        rootMargin: `-${window.innerHeight * OBSERVATION_MARGIN_RATIO}px 0px`,
        threshold: OBSERVATION_RATIO
      });

      // observe for when videos are crossfaded in
      const mutationObserver = new MutationObserver(mutationObserverCallback);

      // Add video players to our intersectionObserver
      videos.forEach(video => {
        const isOdysseyBlockVideo = video.matches('.Block-media *');
        if (isOdysseyBlockVideo) {
          // Odyssey block videos all appear at once, stacked on each other. This confuses the intersection observer.
          // So let's use the mutation observer to check which video has the playing class.
          mutationObserver.observe(video, { attributes: true, attributeOldValue: true, attributeFilter: ['class'] });
        } else {
          // Regular videos play when they intersect with the viewport.
          intersectionObserver.observe(video.parentNode);
        }

        // Initially set videos to muted, in case not ambient
        // And pause
        setMuted(video, isMuted);

        // Set volume to zero so we can fade in
        getVideoEl(video).volume = 0.0;
        // Do not set preload on videos, otherwise mobile devices will try to pre-download the entire world.
        // videoEl.preload = "auto";

        // Trick non-ambient videos into playing more
        // than 1 video at a time
        if (video.api) {
          video.api.isAmbient = true;
        }

        eventListener = () => {
          isMuted.value = !isMuted.value;

          videos.forEach(vid => {
            setMuted(vid, !getIsMuted(vid));
          });
        };

        // Make "fake-ambient" videos support mute
        videoMuteButton = video.querySelector('.VideoControls-mute');

        if (videoMuteButton) videoMuteButton.addEventListener('click', eventListener);
        videoMuteTeardowns.push(() => videoMuteButton.removeEventListener('click', eventListener));
      });

      observers = {
        intersectionObserver,
        mutationObserver,
        videoMuteTeardowns
      };
    }
  }
</script>

<!-- When the toggle button changes -->
<NotificationContainer bind:value>
  <span slot="text">This story is best experienced&nbsp;with&nbsp;sound&nbsp;on</span>
  <span slot="label" bind:this={enableAudioTextEl}>Enable audio</span>

  <svg slot="icon" width="37" height="35" viewBox="0 0 37 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Headphones" clip-path="url(#clip0_50_1018)">
      <path
        id="Ellipse 69"
        d="M34.5 25V18.3636C34.5 9.32625 27.3366 2 18.5 2C9.66344 2 2.5 9.32625 2.5 18.3636V25"
        stroke="black"
        stroke-width="4"
      />
      <path
        id="Rectangle 98"
        d="M28.5 21.0774C28.5 19.6301 29.9897 18.662 31.3123 19.2498L32.1246 19.6108C33.5691 20.2528 34.5 21.6853 34.5 23.2661V28.7338C34.5 30.3145 33.5691 31.747 32.1246 32.389L31.3123 32.75C29.9897 33.3378 28.5 32.3697 28.5 30.9224V21.0774Z"
        stroke="black"
        stroke-width="4"
      />
      <path
        id="Rectangle 99"
        d="M8.5 21.0774C8.5 19.6301 7.0103 18.662 5.68772 19.2498L4.87545 19.6108C3.43093 20.2528 2.5 21.6853 2.5 23.2661V28.7338C2.5 30.3145 3.43093 31.747 4.87545 32.389L5.68772 32.75C7.0103 33.3378 8.5 32.3697 8.5 30.9224V21.0774Z"
        stroke="black"
        stroke-width="4"
      />
    </g>
    <defs>
      <clipPath id="clip0_50_1018">
        <rect width="37" height="35" fill="white" />
      </clipPath>
    </defs>
  </svg>
</NotificationContainer>
<button
  class="app-oavp__floater"
  class:app-oavp__floater--visible={showButton}
  class:app-oavp__floater--enabled={value}
  aria-hidden={showButton}
  tabindex={showButton ? 0 : -1}
  on:click={() => (value = !value)}
>
  <div class="app-oavp__svg-wrapper">
    <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="19" height="19">
      <title>{true ? 'Mute audio' : 'Enable audio'}</title>
      <g fill-rule="evenodd">
        <path d="M11.355 3.078v18l-5-6h-4v-6h4z" transform="translate(-2.355 -2.078)" />
        <path
          class="app-oavp__graphic-enabled"
          d="M13.438 3.334c3.92.976 6.897 4.618 6.897 8.744 0 4.126-2.978 7.768-6.897 8.744v-2.074c2.825-.917 4.928-3.622 4.928-6.668 0-3.046-2.103-5.753-4.928-6.67zm.001 4.289c1.74.75 2.955 2.462 2.955 4.455 0 1.993-1.215 3.705-2.955 4.455v-2.281a2.892 2.892 0 0 0 0-4.348z"
          transform="translate(-2.355 -2.078)"
        />
        <path
          class="app-oavp__graphic-disabled"
          d="m19.855 8.078 1.5 1.5-2.5 2.5 2.5 2.5-1.5 1.5-2.5-2.5-2.5 2.5-1.5-1.5 2.5-2.5-2.5-2.5 1.5-1.5 2.5 2.5z"
          transform="translate(-2.355 -2.078)"
        />
      </g>
    </svg>
  </div>
</button>

<style>
  .app-oavp__floater {
    --defaultOpacity: 0;
    position: fixed;
    bottom: 15px;
    right: 15px;
    z-index: 100;
    background: rgba(0, 0, 0, 0.6);
    border: none;
    padding: 0.6rem;
    cursor: pointer;
    transition: all ease-out 0.5s;
    opacity: var(--defaultOpacity);
    transition: opacity 0.2s;
    border-radius: 100%;
    box-sizing: border-box;
    width: 2.6rem;
    height: 2.6rem;
  }
  .app-oavp__floater :global(svg path) {
    fill: white;
  }

  .app-oavp__floater:hover {
    background: black;
    opacity: 0.9;
  }

  .app-oavp__floater:active {
    opacity: 1;
  }

  .app-oavp__floater:focus-visible {
    outline: 2px solid black;
    outline-offset: 2px;
  }

  .app-oavp__floater--visible {
    --defaultOpacity: 0.8;
    pointer-events: auto;
    scale: 1;
  }

  .app-oavp__graphic-disabled,
  .app-oavp__graphic-enabled {
    opacity: 0;
    transform-origin: 15px 10px;
    transition: all 0.15s;
  }

  .app-oavp__floater--enabled .app-oavp__graphic-enabled {
    scale: 1;
    opacity: 1;
  }

  .app-oavp__floater:not(.app-oavp__floater--enabled) .app-oavp__graphic-disabled {
    opacity: 1;
    scale: 1;
  }

  .app-oavp__svg-wrapper {
    width: 20px;
    height: 20px;
  }

  :global(.is-dark-mode) .app-oavp__floater {
    background: rgba(255, 255, 255, 0.6);
  }
  :global(.is-dark-mode) .app-oavp__floater :global(svg path) {
    fill: white;
  }
  :global(.is-dark-mode) .app-oavp__floater:hover {
    background: white;
  }
  :global(.is-dark-mode) .app-oavp__floater:focus-visible {
    outline-color: white;
  }
</style>
