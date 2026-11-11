import React, { useEffect, useRef, useState } from 'react';
import { Music, Play, Pause } from 'lucide-react';

interface MusicPlayerProps {
  musicUrl: string;
  autoPlayTriggered: boolean;
  isVisible?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  musicUrl,
  autoPlayTriggered,
  isVisible = true
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const playAttemptedRef = useRef(false);
  const userPausedRef = useRef(false);
  const blurTimerRef = useRef<number | null>(null);

  const pauseAudio = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resumeAudio = () => {
    if (!audioRef.current || !isSupported || userPausedRef.current || document.hidden) return;
    if (!audioRef.current.paused) return;

    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.warn('Audio resume error:', err);
        if (err?.name === 'NotSupportedError') {
          setIsSupported(false);
        }
      });
  };

  // Check device and audio format support
  useEffect(() => {
    if (typeof window === 'undefined' || typeof Audio === 'undefined') {
      setIsSupported(false);
      return;
    }

    if (!musicUrl) {
      setIsSupported(false);
      return;
    }

    try {
      const probeAudio = document.createElement('audio');
      if (!probeAudio.canPlayType) {
        setIsSupported(false);
        return;
      }

      // Check whether the browser/device can play MP3/audio files
      const canPlayMp3 =
        probeAudio.canPlayType('audio/mpeg') ||
        probeAudio.canPlayType('audio/mp3') ||
        probeAudio.canPlayType('audio/aac');

      if (canPlayMp3 === '') {
        setIsSupported(false);
        return;
      }
    } catch (e) {
      console.warn('Audio support check failed, hiding music controls:', e);
      setIsSupported(false);
    }
  }, [musicUrl]);

  // Autoplay with delay when opening is triggered
  useEffect(() => {
    if (!autoPlayTriggered || !isSupported || playAttemptedRef.current) return;

    playAttemptedRef.current = true;
    const AUTOPLAY_DELAY_MS = 800; // Delay autoplay to ensure smooth animation and device readiness
    let isCancelled = false;
    let interactionCleanup: (() => void) | null = null;

    const timer = setTimeout(() => {
      if (isCancelled || !audioRef.current) return;
      if (userPausedRef.current || document.hidden) return;

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (!isCancelled) {
              setIsPlaying(true);
            }
          })
          .catch((err: any) => {
            console.warn('Autoplay delayed start encountered restriction:', err);
            if (!isCancelled) {
              setIsPlaying(false);
            }

            // If device explicitly rejected format/codec, hide player icons
            if (err?.name === 'NotSupportedError') {
              setIsSupported(false);
              return;
            }

            // Fallback: If blocked by browser autoplay policy on certain devices,
            // resume playback seamlessly on the very next user interaction (scroll or touch)
            const handleFirstInteraction = () => {
              if (!isCancelled && !userPausedRef.current && !document.hidden) {
                resumeAudio();
              }
              interactionCleanup?.();
            };

            interactionCleanup = () => {
              window.removeEventListener('touchstart', handleFirstInteraction);
              window.removeEventListener('click', handleFirstInteraction);
              window.removeEventListener('scroll', handleFirstInteraction);
              interactionCleanup = null;
            };

            window.addEventListener('touchstart', handleFirstInteraction, { once: true, passive: true });
            window.addEventListener('click', handleFirstInteraction, { once: true });
            window.addEventListener('scroll', handleFirstInteraction, { once: true, passive: true });
          });
      }
    }, AUTOPLAY_DELAY_MS);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
      interactionCleanup?.();
    };
  }, [autoPlayTriggered, isSupported]);

  // Pause music when website loses focus/visibility or hides; resume when open & focused
  useEffect(() => {
    if (!isSupported) return;

    const clearBlurTimer = () => {
      if (blurTimerRef.current !== null) {
        window.clearTimeout(blurTimerRef.current);
        blurTimerRef.current = null;
      }
    };

    const resumeIfEligible = () => {
      clearBlurTimer();
      if (!autoPlayTriggered) return;
      resumeAudio();
    };

    const handleVisibilityChange = () => {
      if (document.hidden || document.visibilityState !== 'visible') {
        clearBlurTimer();
        pauseAudio();
      } else {
        resumeIfEligible();
      }
    };

    const handleWindowBlur = () => {
      clearBlurTimer();
      // Defer slightly so hasFocus() distinguishes embedded map iframe interaction from leaving the site
      blurTimerRef.current = window.setTimeout(() => {
        blurTimerRef.current = null;
        if (!document.hidden && document.hasFocus()) return;
        pauseAudio();
      }, 60);
    };

    const handlePageHide = () => {
      clearBlurTimer();
      pauseAudio();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', resumeIfEligible);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('pageshow', resumeIfEligible);

    return () => {
      clearBlurTimer();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', resumeIfEligible);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('pageshow', resumeIfEligible);
    };
  }, [autoPlayTriggered, isSupported]);

  const togglePlay = () => {
    if (!audioRef.current || !isSupported) return;

    if (isPlaying) {
      userPausedRef.current = true;
      pauseAudio();
    } else {
      userPausedRef.current = false;
      resumeAudio();
    }
  };

  const handleAudioError = () => {
    console.warn('Device or audio format not supported, hiding music controls');
    setIsSupported(false);
    setIsPlaying(false);
  };

  // If the device does not support audio, hide all music player icons and controls completely
  if (!isSupported) {
    return null;
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        preload="auto"
        onError={handleAudioError}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {isVisible && (
        <div className="compact-music-floating">
          <button
            className={`compact-music-btn glass-morphism ${isPlaying ? 'playing' : ''}`}
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
            title={isPlaying ? 'Pause Music' : 'Play Music'}
          >
            <div className={`music-disc-mini ${isPlaying ? 'spin' : ''}`}>
              <Music size={15} className="gold-icon" />
            </div>
            <div className="music-play-state-icon">
              {isPlaying ? <Pause size={15} /> : <Play size={15} />}
            </div>
          </button>
        </div>
      )}
    </>
  );
};
