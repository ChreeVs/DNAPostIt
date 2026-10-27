import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import CalendarView from './components/CalendarView';
import ChannelsView from './components/ChannelsView';
import ProjectsView from './components/ProjectsView';
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

  // Projects State
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [currentProjectId, setCurrentProjectId] = useState(
    INITIAL_PROJECTS.length > 0 ? INITIAL_PROJECTS[0].id : 'proj-1'
  );

  const currentProject =
    projects.find((p) => p.id === currentProjectId) || projects[0] || {
      id: 'proj-1',
      name: 'DNA PostIt',
      slug: 'dna-postit',
      color: '#800020'
    };

  // Channels & Posts State
  const [channels, setChannels] = useState(INITIAL_CHANNELS);
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

  // Project Handlers
  const handleSelectProject = (projectId) => {
    setCurrentProjectId(projectId);
  };

  const handleCreateProject = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
    setCurrentProjectId(newProject.id);
  };

  const handleDeleteProject = (projectId) => {
    setProjects((prev) => {
      const filtered = prev.filter((p) => p.id !== projectId);
      if (currentProjectId === projectId && filtered.length > 0) {
        setCurrentProjectId(filtered[0].id);
      }
      return filtered;
    });
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
  };

  // Channel Handlers
  const handleToggleChannelStatus = (channelId) => {
    setChannels((prev) =>
      prev.map((ch) =>
        ch.id === channelId ? { ...ch, active: !ch.active } : ch
      )
    );
  };

  const handleConnectNewChannel = (newChannel) => {
    setChannels((prev) => [newChannel, ...prev]);
  };

  return (
    <div className="pubblie-app-layout">
      {/* DNAPostIt Sidebar */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenComposer={() => handleOpenComposer()}
        currentProject={currentProject}
      />

      {/* Main Content Area */}
      <main className="pubblie-main-wrapper">
        {activeView === 'calendar' && (
          <CalendarView
            currentProject={currentProject}
            posts={posts}
            channels={channels}
            onOpenComposer={handleOpenComposer}
            onSelectPost={handleSelectPostToEdit}
            onNavigateToChannels={() => setActiveView('channels')}
          />
        )}

        {activeView === 'projects' && (
          <ProjectsView
            projects={projects}
            currentProjectId={currentProjectId}
            onSelectProject={handleSelectProject}
            onCreateProject={handleCreateProject}
            onDeleteProject={handleDeleteProject}
            onNavigateToSettings={() => setActiveView('settings')}
          />
        )}

        {activeView === 'channels' && (
          <ChannelsView
            channels={channels}
            onToggleChannelStatus={handleToggleChannelStatus}
            onConnectNewChannel={handleConnectNewChannel}
          />
        )}

        {activeView === 'settings' && (
          <SettingsView
            currentProject={currentProject}
            projects={projects}
            onUpdateProject={handleUpdateProject}
            channels={channels}
            onToggleChannelStatus={handleToggleChannelStatus}
            toolsRegistry={MCP_TOOLS_REGISTRY}
            onAgentSchedulePost={handleSavePost}
          />
        )}

        {/* Informative functional placeholders for additional views */}
        {['contents', 'igfeed', 'comments', 'analytics', 'team'].includes(activeView) && (
          <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '1.4rem', textTransform: 'capitalize', color: 'var(--text-dark)' }}>
              Sezione {activeView} ({currentProject.name})
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Questa sezione è sincronizzata per il workspace <strong>{currentProject.name}</strong>. Clicca su <strong>Calendario</strong> nella barra laterale per tornare alla pianificazione dei post.
            </p>
          </div>
        )}
      </main>

      {/* Modern Post Composer Modal */}
      {isComposerOpen && (
        <ComposerModal
          isOpen={isComposerOpen}
          initialDate={composerInitialDate}
          initialData={composerInitialData}
          onClose={() => setIsComposerOpen(false)}
          onSave={handleSavePost}
        />
      )}
    </div>
  );
}
