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

        {/* Sample 1: New uploaded darker couple photo */}
        <InvitationSection
          config={config}
          guestName={guestName}
          photoUrl="images/couple-dark.jpg"
          sampleBadge="Sample 1 of 2 • New Photo"
          sectionId="invitation"
          nextSectionId="#invitation-sample-2"
          nextLabel="VIEW SAMPLE 2 (OLD)"
        />

        {/* Sample 2: Previous couple4 photo */}
        <InvitationSection
          config={config}
          guestName={guestName}
          photoUrl="images/couple4.jpg"
          sampleBadge="Sample 2 of 2 • Previous Photo"
          sectionId="invitation-sample-2"
          nextSectionId="#events"
          nextLabel="SCROLL FOR EVENTS"
        />

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
