import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import CalendarView from './components/CalendarView';
import ChannelsView from './components/ChannelsView';
import McpHubView from './components/McpHubView';
import SettingsView from './components/SettingsView';
import ComposerModal from './components/ComposerModal';
import {
  INITIAL_PROJECTS,
  INITIAL_CHANNELS,
  INITIAL_POSTS,
  MCP_TOOLS_REGISTRY
} from './mockData';

export default function App() {
  const [activeView, setActiveView] = useState('calendar');
  const [channels] = useState(INITIAL_CHANNELS);
  const [posts, setPosts] = useState(INITIAL_POSTS);

  // Composer Modal State
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [composerInitialDate, setComposerInitialDate] = useState(null);
  const [composerInitialData, setComposerInitialData] = useState(null);

  // Quick Open Handlers
  const handleOpenComposer = (targetDate = null) => {
    setComposerInitialDate(targetDate);
    setComposerInitialData(null);
    setIsComposerOpen(true);
  };

  const handleSelectPostToEdit = (post) => {
    setComposerInitialData(post);
    setComposerInitialDate(null);
    setIsComposerOpen(true);
  };

  const handleSavePost = (savedPost) => {
    setPosts((prev) => {
      const existsIndex = prev.findIndex((p) => p.id === savedPost.id);
      if (existsIndex >= 0) {
        const updated = [...prev];
        updated[existsIndex] = savedPost;
        return updated;
      } else {
        return [savedPost, ...prev];
      }
    });
  };

  return (
    <div className="pubblie-app-layout">
      {/* Pubblie Left Sidebar */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenComposer={() => handleOpenComposer()}
      />

      {/* Main Content Area */}
      <main className="pubblie-main-wrapper">
        {activeView === 'calendar' && (
          <CalendarView
            posts={posts}
            channels={channels}
            onOpenComposer={handleOpenComposer}
            onSelectPost={handleSelectPostToEdit}
          />
        )}

        {activeView === 'channels' && (
          <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
            <ChannelsView channels={channels} />
          </div>
        )}

        {activeView === 'integrations' && (
          <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
            <McpHubView
              toolsRegistry={MCP_TOOLS_REGISTRY}
              onAgentSchedulePost={handleSavePost}
            />
          </div>
        )}

        {activeView === 'settings' && (
          <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
            <SettingsView />
          </div>
        )}

        {/* Placeholder screens for other views to ensure seamless navigation */}
        {['contents', 'igfeed', 'comments', 'analytics', 'team'].includes(activeView) && (
          <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '1.4rem', textTransform: 'capitalize' }}>
              Sezione {activeView}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Questa sezione è attiva nel workspace di PAA. Clicca su <strong>Calendario</strong> nella barra laterale per tornare al piano editoriale principale.
            </p>
            <div>
              <button className="btn-secondary" onClick={() => setActiveView('calendar')}>
                Torna al Calendario Editoriale
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Composer Modal */}
      <ComposerModal
        isOpen={isComposerOpen}
        onClose={() => setIsComposerOpen(false)}
        onSavePost={handleSavePost}
        initialDate={composerInitialDate}
        initialData={composerInitialData}
      />
    </div>
  );
}
