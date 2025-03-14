import React from "react";
import "./FeatureCards.css";

const FeatureCards = () => {
  const features = [
    {
      id: "trusted-friends",
      title: "Trusted Friends",
      description:
        "Trusted Friend® is a M-of-N social recovery module that allows users to access their accounts.",
      icon: (
        <svg viewBox="0 0 200 200" className="feature-icon">
          <defs>
            <linearGradient
              id="handGradient1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#9C27B0" />
              <stop offset="100%" stopColor="#FF6B6B" />
            </linearGradient>
            <linearGradient
              id="handGradient2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#00BCD4" />
              <stop offset="100%" stopColor="#3F51B5" />
            </linearGradient>
            <radialGradient
              id="circleGradient"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="#0288D1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#01579B" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="url(#circleGradient)"
            opacity="0.4"
          />
          <g transform="translate(50, 60)">
            <path
              d="M0,0 C10,5 20,5 30,0 C40,-5 50,-5 60,0 C70,5 80,5 90,0"
              stroke="url(#handGradient1)"
              strokeWidth="4"
              fill="none"
              opacity="0.8"
            />
            <path
              d="M20,10 C30,15 40,15 50,10 C60,5 70,5 80,10"
              stroke="url(#handGradient2)"
              strokeWidth="4"
              fill="none"
              opacity="0.8"
              transform="translate(0, 20)"
            />
          </g>
          <g transform="translate(70, 70)">
            <circle cx="0" cy="0" r="2" fill="#FF6B6B" />
            <circle cx="10" cy="5" r="1" fill="#FF6B6B" />
            <circle cx="20" cy="-5" r="1.5" fill="#FF6B6B" />
            <circle cx="30" cy="0" r="1" fill="#FF6B6B" />
            <circle cx="-10" cy="-5" r="1" fill="#FF6B6B" />
            <circle cx="-20" cy="5" r="1.5" fill="#FF6B6B" />
          </g>
        </svg>
      ),
    },
    {
      id: "identity",
      title: "Identity",
      description:
        "All accounts can have an unlimited number of sub-accounts specified.",
      icon: (
        <svg viewBox="0 0 200 200" className="feature-icon">
          <defs>
            <linearGradient
              id="fingerprintGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#E91E63" />
              <stop offset="100%" stopColor="#9C27B0" />
            </linearGradient>
            <radialGradient
              id="fingerprintRadial"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="#E91E63" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#9C27B0" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="url(#fingerprintRadial)"
            opacity="0.4"
          />
          <g transform="translate(70, 50)">
            <path
              d="M0,30 C10,10 50,10 60,30 C70,50 30,80 30,100"
              stroke="url(#fingerprintGradient)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M10,40 C20,25 40,25 50,40 C60,55 25,75 25,90"
              stroke="url(#fingerprintGradient)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
            />
            <path
              d="M20,50 C25,40 35,40 40,50 C45,60 20,70 20,80"
              stroke="url(#fingerprintGradient)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>
        </svg>
      ),
    },
    {
      id: "backup",
      title: "Backup of the capsule shard",
      description:
        "Each capsule has a unique shard which allows the NFT owner to decipher it.",
      icon: (
        <svg viewBox="0 0 200 200" className="feature-icon">
          <defs>
            <linearGradient
              id="diskGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#E91E63" />
              <stop offset="100%" stopColor="#FF5722" />
            </linearGradient>
            <linearGradient
              id="waveGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#00BCD4" />
              <stop offset="100%" stopColor="#3F51B5" />
            </linearGradient>
            <radialGradient
              id="backupRadial"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="#0288D1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#01579B" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="url(#backupRadial)"
            opacity="0.4"
          />
          <g transform="translate(100, 100)">
            <ellipse cx="0" cy="0" rx="35" ry="10" fill="url(#waveGradient)" />
            <path
              d="M-35,0 A35,10 0 0,1 35,0"
              fill="none"
              stroke="url(#waveGradient)"
              strokeWidth="1"
              opacity="0.8"
              transform="translate(0, -15)"
            />
            <path
              d="M-30,0 A30,8 0 0,1 30,0"
              fill="none"
              stroke="url(#waveGradient)"
              strokeWidth="1"
              opacity="0.6"
              transform="translate(0, -30)"
            />

            <circle cx="0" cy="-40" r="15" fill="url(#diskGradient)" />
            <circle
              cx="0"
              cy="-55"
              r="12"
              fill="url(#diskGradient)"
              opacity="0.8"
            />
            <circle
              cx="0"
              cy="-67"
              r="9"
              fill="url(#diskGradient)"
              opacity="0.6"
            />
          </g>
        </svg>
      ),
    },
    {
      id: "trusted-friends",
      title: "Trusted Friends",
      description:
        "Trusted Friend® is a M-of-N social recovery module that allows users to access their accounts.",
      icon: (
        <svg viewBox="0 0 200 200" className="feature-icon">
          <defs>
            <linearGradient
              id="handGradient1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#9C27B0" />
              <stop offset="100%" stopColor="#FF6B6B" />
            </linearGradient>
            <linearGradient
              id="handGradient2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#00BCD4" />
              <stop offset="100%" stopColor="#3F51B5" />
            </linearGradient>
            <radialGradient
              id="circleGradient"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="#0288D1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#01579B" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="url(#circleGradient)"
            opacity="0.4"
          />
          <g transform="translate(50, 60)">
            <path
              d="M0,0 C10,5 20,5 30,0 C40,-5 50,-5 60,0 C70,5 80,5 90,0"
              stroke="url(#handGradient1)"
              strokeWidth="4"
              fill="none"
              opacity="0.8"
            />
            <path
              d="M20,10 C30,15 40,15 50,10 C60,5 70,5 80,10"
              stroke="url(#handGradient2)"
              strokeWidth="4"
              fill="none"
              opacity="0.8"
              transform="translate(0, 20)"
            />
          </g>
          <g transform="translate(70, 70)">
            <circle cx="0" cy="0" r="2" fill="#FF6B6B" />
            <circle cx="10" cy="5" r="1" fill="#FF6B6B" />
            <circle cx="20" cy="-5" r="1.5" fill="#FF6B6B" />
            <circle cx="30" cy="0" r="1" fill="#FF6B6B" />
            <circle cx="-10" cy="-5" r="1" fill="#FF6B6B" />
            <circle cx="-20" cy="5" r="1.5" fill="#FF6B6B" />
          </g>
        </svg>
      ),
    },
    {
      id: "identity",
      title: "Identity",
      description:
        "All accounts can have an unlimited number of sub-accounts specified.",
      icon: (
        <svg viewBox="0 0 200 200" className="feature-icon">
          <defs>
            <linearGradient
              id="fingerprintGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#E91E63" />
              <stop offset="100%" stopColor="#9C27B0" />
            </linearGradient>
            <radialGradient
              id="fingerprintRadial"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="#E91E63" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#9C27B0" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="url(#fingerprintRadial)"
            opacity="0.4"
          />
          <g transform="translate(70, 50)">
            <path
              d="M0,30 C10,10 50,10 60,30 C70,50 30,80 30,100"
              stroke="url(#fingerprintGradient)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M10,40 C20,25 40,25 50,40 C60,55 25,75 25,90"
              stroke="url(#fingerprintGradient)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
            />
            <path
              d="M20,50 C25,40 35,40 40,50 C45,60 20,70 20,80"
              stroke="url(#fingerprintGradient)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>
        </svg>
      ),
    },
    {
      id: "backup",
      title: "Backup of the capsule shard",
      description:
        "Each capsule has a unique shard which allows the NFT owner to decipher it.",
      icon: (
        <svg viewBox="0 0 200 200" className="feature-icon">
          <defs>
            <linearGradient
              id="diskGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#E91E63" />
              <stop offset="100%" stopColor="#FF5722" />
            </linearGradient>
            <linearGradient
              id="waveGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#00BCD4" />
              <stop offset="100%" stopColor="#3F51B5" />
            </linearGradient>
            <radialGradient
              id="backupRadial"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="#0288D1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#01579B" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="url(#backupRadial)"
            opacity="0.4"
          />
          <g transform="translate(100, 100)">
            <ellipse cx="0" cy="0" rx="35" ry="10" fill="url(#waveGradient)" />
            <path
              d="M-35,0 A35,10 0 0,1 35,0"
              fill="none"
              stroke="url(#waveGradient)"
              strokeWidth="1"
              opacity="0.8"
              transform="translate(0, -15)"
            />
            <path
              d="M-30,0 A30,8 0 0,1 30,0"
              fill="none"
              stroke="url(#waveGradient)"
              strokeWidth="1"
              opacity="0.6"
              transform="translate(0, -30)"
            />

            <circle cx="0" cy="-40" r="15" fill="url(#diskGradient)" />
            <circle
              cx="0"
              cy="-55"
              r="12"
              fill="url(#diskGradient)"
              opacity="0.8"
            />
            <circle
              cx="0"
              cy="-67"
              r="9"
              fill="url(#diskGradient)"
              opacity="0.6"
            />
          </g>
        </svg>
      ),
    },
  ];

  return (
    <div className="feature-cards-container">
      <h2 className="section-title">Our Signature Events</h2>
      <p className="section-subtitle">
        Browse through our portfolio of successful events
      </p>
      <div className="feature-cards">
        {features.map((feature) => (
          <div key={feature.id} className="feature-card">
            <div className="feature-icon-container">{feature.icon}</div>
            <h2 className="feature-title">{feature.title}</h2>
            <p className="feature-description">{feature.description}</p>
            {/* <div className="card-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;
