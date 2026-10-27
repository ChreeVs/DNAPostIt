import React from 'react';
import {
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
  TikTokIcon,
  YouTubeIcon,
  ThreadsIcon,
  GoogleBusinessIcon,
  PlusIcon,
  ScissorsIcon
} from './Icons';

export default function Topbar({
  activeView,
  selectedChannelFilter,
  setSelectedChannelFilter,
  onOpenComposer,
  onOpenSplitter
}) {
  const titles = {
    calendar: 'Piano Editoriale & Calendario',
    splitter: 'Carousel Splitter Studio',
    media: 'Libreria Media AWS S3 & CloudFront',
    channels: 'Gestione Account Social & Token',
    mcp: 'Hub di Collegamento MCP (Model Context Protocol)',
    settings: 'Configurazione Server Dedicato'
  };

  const channelIcons = [
    { id: 'all', label: 'Tutti', icon: null },
    { id: 'instagram', label: 'Instagram', icon: <InstagramIcon className="svg-icon-sm" /> },
    { id: 'facebook', label: 'Facebook', icon: <FacebookIcon className="svg-icon-sm" /> },
    { id: 'linkedin', label: 'LinkedIn', icon: <LinkedInIcon className="svg-icon-sm" /> },
    { id: 'tiktok', label: 'TikTok', icon: <TikTokIcon className="svg-icon-sm" /> },
    { id: 'youtube', label: 'YouTube', icon: <YouTubeIcon className="svg-icon-sm" /> },
    { id: 'threads', label: 'Threads', icon: <ThreadsIcon className="svg-icon-sm" /> },
    { id: 'gmb', label: 'GMB', icon: <GoogleBusinessIcon className="svg-icon-sm" /> }
  ];

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="view-title">{titles[activeView] || 'Dashboard'}</h1>

        {activeView === 'calendar' && (
          <div className="channels-bar">
            {channelIcons.map(ch => (
              <button
                key={ch.id}
                className={`channel-pill ${selectedChannelFilter === ch.id ? 'active' : ''}`}
                onClick={() => setSelectedChannelFilter(ch.id)}
                title={`Filtra per ${ch.label}`}
              >
                {ch.icon ? ch.icon : <span style={{ fontSize: '0.7rem', fontWeight: 800 }}>ALL</span>}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="topbar-right">
        <button className="btn-secondary" onClick={onOpenSplitter}>
          <ScissorsIcon className="svg-icon-sm" />
          <span>Slicing Carosello</span>
        </button>

        <button className="btn-primary" onClick={onOpenComposer}>
          <PlusIcon className="svg-icon-sm" />
          <span>Programma Post</span>
        </button>
      </div>
    </header>
  );
}
