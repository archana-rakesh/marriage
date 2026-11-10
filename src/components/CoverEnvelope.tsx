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
        {/* Left Side Door Panel */}
        <div className="door-panel door-panel-left">
          <img
            src="images/card-door-left.jpg"
            alt="Left Cover Door"
            className="door-img door-img-left"
          />
        </div>

        {/* Right Side Door Panel */}
        <div className="door-panel door-panel-right">
          <img
            src="images/card-door-right.jpg"
            alt="Right Cover Door"
            className="door-img door-img-right"
          />
        </div>

        {/* Center Monogram Wax Seal & Tap Hint */}
        <div className="royal-doors-center-content">
          <button
            className="center-seal-btn"
            onClick={handleOpenClick}
            aria-label="Click here to open invitation"
          >
            <div className="seal-gold-wrapper">
              <img
                src="images/monogram-ra.png"
                alt="RA Monogram Seal"
                className="center-logo-img"
              />
            </div>

            <div className="tap-hint-wrap">
              <span className="tap-hint-text font-sub">Click here to open</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
