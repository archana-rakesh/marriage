import React, { useState, useEffect } from 'react';
import type { WeddingConfig } from './types/invitation';
import { getSavedConfig, getGuestNameFromUrl } from './utils/storage';
import { CoverEnvelope } from './components/CoverEnvelope';
import { MusicPlayer } from './components/MusicPlayer';
import { HeroSection } from './components/HeroSection';
import { InvitationSection } from './components/InvitationSection';
import { EventsSection } from './components/EventsSection';

export const App: React.FC = () => {
  const [config] = useState<WeddingConfig>(getSavedConfig());
  const [guestName, setGuestName] = useState<string | null>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [autoPlayMusic, setAutoPlayMusic] = useState(false);

  useEffect(() => {
    const urlGuest = getGuestNameFromUrl();
    if (urlGuest) {
      setGuestName(urlGuest);
    }
  }, []);

  const handleStartOpening = () => {
    setAutoPlayMusic(true);
  };

  const handleOpenInvitation = () => {
    setIsOpened(true);
  };

  return (
    <div className={`app-root theme-${config.theme}`}>
      {!isOpened && (
        <CoverEnvelope
          config={config}
          guestName={guestName}
          onStartOpening={handleStartOpening}
          onOpen={handleOpenInvitation}
        />
      )}

      <main className="main-content">
        <HeroSection config={config} />

        {[
          {
            id: 'invitation',
            photoUrl: 'images/couple-dark.jpg',
            badge: 'Sample 1 of 3 • Dark',
            nextSectionId: '#invitation-sample-2',
            nextLabel: 'VIEW SAMPLE 2',
          },
          {
            id: 'invitation-sample-2',
            photoUrl: 'images/couple4.jpg',
            badge: 'Sample 2 of 3 • Bright',
            nextSectionId: '#invitation-sample-3',
            nextLabel: 'VIEW SAMPLE 3',
          },
          {
            id: 'invitation-sample-3',
            photoUrl: 'images/couple-vignette.jpg',
            badge: 'Sample 3 of 3 • Vignette',
            nextSectionId: '#events',
            nextLabel: 'SCROLL FOR EVENTS',
          },
        ].map((sample) => (
          <InvitationSection
            key={sample.id}
            config={config}
            guestName={guestName}
            photoUrl={sample.photoUrl}
            sampleBadge={sample.badge}
            sectionId={sample.id}
            nextSectionId={sample.nextSectionId}
            nextLabel={sample.nextLabel}
          />
        ))}

        <EventsSection config={config} />
      </main>

      <MusicPlayer
        musicUrl={config.bgMusicUrl}
        autoPlayTriggered={autoPlayMusic}
        isVisible={isOpened}
      />
    </div>
  );
};

export default App;
