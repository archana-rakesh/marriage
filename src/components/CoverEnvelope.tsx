import React, { useState } from 'react';
import type { WeddingConfig } from '../types/invitation';

interface CoverEnvelopeProps {
  config: WeddingConfig;
  guestName: string | null;
  onOpen: () => void;
  onStartOpening?: () => void;
}

export const CoverEnvelope: React.FC<CoverEnvelopeProps> = ({ guestName: _guestName, onOpen, onStartOpening }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isOpening) return;
    setIsOpening(true);
    if (onStartOpening) {
      onStartOpening();
    }
    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  return (
    <div
      className={`royal-doors-viewport envelope-section ${isOpening ? 'doors-open' : ''}`}
      onClick={() => handleOpenClick()}
    >
      <div className="envelope-mobile-wrapper">
        {/* Bottom Body Envelope Panel */}
        <div className="envelope-body-panel">
          <img
            src="images/card-bottom-body.jpg"
            alt="Envelope Body"
            className="envelope-body-img"
          />
        </div>

        {/* Top Flap Envelope Panel */}
        <div className="envelope-top-panel">
          <img
            src="images/card-top-flap.png"
            alt="Envelope Top Flap"
            className="envelope-top-img"
          />
        </div>

        {/* Center Monogram Wax Seal & Tap Hint */}
        <div className="royal-doors-center-content">
          <button
            className="center-seal-btn"
            onClick={handleOpenClick}
            aria-label="Tap to Open Royal Invitation"
          >
            <div className="seal-gold-wrapper">
              <img
                src="images/monogram-ra.png"
                alt="RA Monogram Seal"
                className="center-logo-img"
              />
            </div>

            {/* <div className="tap-hint-wrap">
              <div className="gold-chevron"></div>
              <span className="tap-hint-text font-sub">TAP TO OPEN</span>
              {guestName && (
                <div className="guest-welcome-pill">
                  Invited Guest: <strong>{guestName}</strong>
                </div>
              )}
            </div> */}
          </button>
        </div>
      </div>
    </div>
  );
};
