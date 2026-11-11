import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import type { WeddingConfig } from '../types/invitation';

interface InvitationSectionProps {
  config: WeddingConfig;
  guestName: string | null;
}

export const InvitationSection: React.FC<InvitationSectionProps> = ({ config: _config, guestName }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="snap-section invitation-section" id="invitation" ref={sectionRef}>
      {/* Couple Photo Background */}
      <div className="section-bg-image" style={{ backgroundImage: `url(${_config.coupleHeroPhoto})` }}>
        <div className="section-overlay-gradient"></div>
      </div>

      <div className="section-container container">
        <div className="event-overlay-content">
          {/* Guest Welcome Badge (if present) */}
          {guestName && (
            <div className="guest-welcome-badge">
              <span
                className={`guest-badge-label font-sub slow-fade-in-up ${isVisible ? 'visible' : ''}`}
                style={{ animationDelay: '0.1s', transitionDelay: '0.1s' }}
              >
                DEAREST GUEST
              </span>
              <h3
                className={`guest-name-highlight slow-fade-in-up ${isVisible ? 'visible' : ''}`}
                style={{ animationDelay: '0.35s', transitionDelay: '0.35s' }}
              >
                {guestName}
              </h3>
            </div>
          )}

          {/* Event Title */}
          <h2
            className={`overlay-event-title font-serif slow-fade-in-up ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: guestName ? '0.6s' : '0.1s', transitionDelay: guestName ? '0.6s' : '0.1s' }}
          >
            Welcome To Our Celebration
          </h2>

          {/* Title Underline */}
          <div
            className={`title-underline slow-fade-in-up ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: guestName ? '0.85s' : '0.35s', transitionDelay: guestName ? '0.85s' : '0.35s' }}
          ></div>

          {/* Blessing Quote */}
          <p
            className={`invitation-blessing-quote font-sub slow-fade-in-up ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: guestName ? '1.1s' : '0.6s', transitionDelay: guestName ? '1.1s' : '0.6s' }}
          >
            "With the blessings of our beloved families, we request the honour of your presence as we unite in holy matrimony."
          </p>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#events"
          className={`scroll-indicator margin-top-md slow-fade-in-up ${isVisible ? 'visible' : ''}`}
          style={{ animationDelay: guestName ? '1.35s' : '0.85s', transitionDelay: guestName ? '1.35s' : '0.85s' }}
          aria-label="Scroll to Events"
        >
          <span className="scroll-text">SCROLL FOR EVENTS</span>
          <ChevronDown className="bounce-arrow" size={20} />
        </a>
      </div>
    </section>
  );
};
