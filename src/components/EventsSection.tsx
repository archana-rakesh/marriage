import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Heart} from 'lucide-react';
import type { WeddingConfig } from '../types/invitation';

interface EventsSectionProps {
  config: WeddingConfig;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ config }) => {
  const muhurthamEvent = config.events.find(e => e.id === 'muhurtham') || config.events[0];
  const receptionEvent = config.events.find(e => e.id === 'reception') || config.events[1] || config.events[0];
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

  const muhurthamMapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${muhurthamEvent.location}, ${muhurthamEvent.address}`
  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  const receptionMapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${receptionEvent.location}, ${receptionEvent.address}`
  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="snap-section events-section" id="events" ref={sectionRef}>
      {/* Background Image */}
      <div className="section-bg-image" style={{ backgroundImage: `url('images/welcome-bg.jpg')` }}>
        <div className="section-overlay-gradient welcome-overlay-gradient"></div>
      </div>

      <div className="section-container container">
        <div className="events-combined-overlay">
          {/* Main Title Badge */}
          <div
            className={`save-date-badge slow-fade-in-up ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: '0.1s', transitionDelay: '0.1s' }}
          >
            <Heart size={15} className="gold-icon" />
            <span>WEDDING & RECEPTION</span>
          </div>

          <div className="events-blocks-container">
            {/* SECTION BLOCK 1: WEDDING CEREMONY BOX (Entire Card slides in from Left) */}
            <div
              className={`event-block-card wedding-block-grid slow-slide-left ${isVisible ? 'visible' : ''}`}
              style={{ animationDelay: '0.25s', transitionDelay: '0.25s' }}
            >
              {/* Left Column: Details */}
              <div className="event-block-details">
                <div className="event-title-badge">
                  <Sparkles size={14} className="gold-icon" />
                  <span>MUHURTHAM</span>
                </div>
                <h3 className="event-simple-heading font-serif">
                  {muhurthamEvent.location}
                </h3>
                <p className="event-simple-sub font-sub">
                  {muhurthamEvent.address}
                </p>
                <p className="event-simple-meta">
                  Sunday, Nov 29 • 10:30 AM
                </p>
              </div>

              {/* Right Column: Small Map View */}
              <div className="event-map-container map-right-frame">
                <iframe
                  title="Wedding Venue Map"
                  src={muhurthamMapEmbed}
                  className="event-map-iframe"
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <div className="events-divider-line"></div>

            {/* SECTION BLOCK 2: GRAND RECEPTION BOX (Entire Card slides in from Right) */}
            <div
              className={`event-block-card reception-block-grid slow-slide-right ${isVisible ? 'visible' : ''}`}
              style={{ animationDelay: '0.45s', transitionDelay: '0.45s' }}
            >
              {/* Left Column: Small Map View */}
              <div className="event-map-container map-left-frame">
                <iframe
                  title="Reception Venue Map"
                  src={receptionMapEmbed}
                  className="event-map-iframe"
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Right Column: Details */}
              <div className="event-block-details event-right-align">
                <div className="event-title-badge">
                  <Sparkles size={14} className="gold-icon" />
                  <span>RECEPTION</span>
                </div>
                <h3 className="event-simple-heading font-serif">
                  {receptionEvent.location}
                </h3>
                <p className="event-simple-sub font-sub">
                  {receptionEvent.address}
                </p>
                <p className="event-simple-meta">
                  Sunday, Nov 29 • 05:30 PM Onwards
                </p>
              </div>
            </div>
          </div>

          <div
            className={`reception-footer-blessing margin-top-xs slow-fade-in-up ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: '0.65s', transitionDelay: '0.65s' }}
          >
            <Sparkles size={16} className="gold-icon margin-bottom-xs" />
            <p className="footer-blessing-text font-sub">We can't wait to celebrate with you!</p>
            <h4 className="footer-couple-names">{config.groomName} & {config.brideName}</h4>
          </div>
        </div>
      </div>
    </section>
  );
};
