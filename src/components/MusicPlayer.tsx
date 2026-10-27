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

    const timer = setTimeout(() => {
      if (isCancelled || !audioRef.current) return;

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
              if (audioRef.current && audioRef.current.paused) {
                audioRef.current
                  .play()
                  .then(() => {
                    setIsPlaying(true);
                  })
                  .catch((fallbackErr) => {
                    console.warn('Interaction play error:', fallbackErr);
                  });
              }
              cleanup();
            };

            const cleanup = () => {
              window.removeEventListener('touchstart', handleFirstInteraction);
              window.removeEventListener('click', handleFirstInteraction);
              window.removeEventListener('scroll', handleFirstInteraction);
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
    };
  }, [autoPlayTriggered, isSupported]);

  const togglePlay = () => {
    if (!audioRef.current || !isSupported) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error('Audio play error:', err);
          if (err?.name === 'NotSupportedError') {
            setIsSupported(false);
          }
        });
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
