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

        {/* 4 Sample sections for the user to choose their favorite photo */}
        <InvitationSection
          config={config}
          guestName={guestName}
          photoUrl="images/couple1.jpg"
          sampleBadge="Sample 1 of 4 • couple1.jpg"
          sectionId="invitation"
          nextSectionId="#invitation-sample-2"
          nextLabel="VIEW SAMPLE 2"
        />

        <InvitationSection
          config={config}
          guestName={guestName}
          photoUrl="images/couple2.jpg"
          sampleBadge="Sample 2 of 4 • couple2.jpg"
          sectionId="invitation-sample-2"
          nextSectionId="#invitation-sample-3"
          nextLabel="VIEW SAMPLE 3"
        />

        <InvitationSection
          config={config}
          guestName={guestName}
          photoUrl="images/couple3.jpg"
          sampleBadge="Sample 3 of 4 • couple3.jpg"
          sectionId="invitation-sample-3"
          nextSectionId="#invitation-sample-4"
          nextLabel="VIEW SAMPLE 4"
        />

        <InvitationSection
          config={config}
          guestName={guestName}
          photoUrl="images/couple4.jpg"
          sampleBadge="Sample 4 of 4 • couple4.jpg"
          sectionId="invitation-sample-4"
          nextSectionId="#events"
          nextLabel="SCROLL TO EVENTS"
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
