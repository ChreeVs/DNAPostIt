import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import CalendarView from './components/CalendarView';
import ChannelsView from './components/ChannelsView';
import ProjectsView from './components/ProjectsView';
import ChannelRenewalView from './components/ChannelRenewalView';
import SettingsView from './components/SettingsView';
import ComposerModal from './components/ComposerModal';
import {
  INITIAL_PROJECTS,
  INITIAL_CHANNELS,
  INITIAL_POSTS,
  MCP_TOOLS_REGISTRY
} from './mockData';

export default function App() {
  // Navigation & Workspace Mode
  // 'global' = viewing platform Dashboard (all projects calendar, projects list on left)
  // 'project' = viewing specific project workspace with dedicated single-project menu
  const [workspaceMode, setWorkspaceMode] = useState('global');
  const [activeView, setActiveView] = useState('dashboard');

  // Projects State - completely empty, zero placeholder projects
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [currentProjectId, setCurrentProjectId] = useState(
    INITIAL_PROJECTS.length > 0 ? INITIAL_PROJECTS[0].id : null
  );

  const currentProject =
    projects.find((p) => p.id === currentProjectId) || (projects.length > 0 ? projects[0] : null);

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
    const proj =
      projects.find((p) => p.id === (savedPost.projectId || currentProjectId)) ||
      currentProject;

    const datePart =
      savedPost.date ||
      (savedPost.scheduledDate ? savedPost.scheduledDate.split('T')[0] : '2026-10-28');
    const timePart =
      savedPost.time ||
      (savedPost.scheduledDate
        ? savedPost.scheduledDate.split('T')[1]?.substring(0, 5)
        : '10:30');

    const enrichedPost = {
      ...savedPost,
      projectId: proj.id,
      projectName: proj.name,
      projectColor: proj.color,
      date: datePart,
      time: timePart,
      type: savedPost.type || 'FEED'
    };

    setPosts((prev) => {
      const existsIndex = prev.findIndex((p) => p.id === enrichedPost.id);
      if (existsIndex >= 0) {
        const updated = [...prev];
        updated[existsIndex] = enrichedPost;
        return updated;
      } else {
        return [enrichedPost, ...prev];
      }
    });
  };

  // Project Handlers
  const handleSelectProject = (projectId) => {
    setCurrentProjectId(projectId);
    setWorkspaceMode('project');
    setActiveView('calendar');
  };

  const handleCreateProject = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
    setCurrentProjectId(newProject.id);
    setWorkspaceMode('project');
    setActiveView('calendar');
  };

  const handleDeleteProject = (projectId) => {
    setProjects((prev) => {
      const filtered = prev.filter((p) => p.id !== projectId);
      if (currentProjectId === projectId) {
        if (filtered.length > 0) {
          setCurrentProjectId(filtered[0].id);
        } else {
          setCurrentProjectId(null);
          setWorkspaceMode('global');
          setActiveView('dashboard');
        }
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

  // Channel Renewal Handlers
  const handleRenewChannel = (channelId) => {
    setChannels((prev) =>
      prev.map((ch) =>
        ch.id === channelId
          ? {
              ...ch,
              expiresInDays: 60,
              expiryDate: '2026-12-26',
              connected: true,
              active: true,
              lastSync: 'Pochi secondi fa'
            }
          : ch
      )
    );
  };

  const handleRenewAllExpiring = () => {
    setChannels((prev) =>
      prev.map((ch) =>
        ch.expiresInDays <= 14
          ? {
              ...ch,
              expiresInDays: 60,
              expiryDate: '2026-12-26',
              connected: true,
              active: true,
              lastSync: 'Pochi secondi fa'
            }
          : ch
      )
    );
  };

  return (
    <div className="pubblie-app-layout">
      {/* DNAPostIt Sidebar (Dual Mode: Global Home vs Project Workspace) */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        workspaceMode={workspaceMode}
        setWorkspaceMode={setWorkspaceMode}
        projects={projects}
        currentProject={currentProject}
        onSelectProject={handleSelectProject}
        onOpenComposer={() => handleOpenComposer()}
        onOpenCreateProject={() => setActiveView('projects')}
      />

      {/* Main Content Area */}
      <main className="pubblie-main-wrapper">
        {/* GLOBAL DASHBOARD: Consolidated calendar showing all projects (matches screenshot) */}
        {activeView === 'dashboard' && (
          <CalendarView
            isGlobalDashboard={true}
            currentProject={currentProject}
            projects={projects}
            posts={posts}
            channels={channels}
            onOpenComposer={handleOpenComposer}
            onSelectPost={handleSelectPostToEdit}
            onNavigateToChannels={() => setActiveView('channels')}
            onSelectProjectFromCard={handleSelectProject}
          />
        )}

        {/* SINGLE PROJECT CALENDAR: Shows project-specific channels counters & posts */}
        {activeView === 'calendar' && (
          <CalendarView
            isGlobalDashboard={false}
            currentProject={currentProject}
            projects={projects}
            posts={posts}
            channels={channels}
            onOpenComposer={handleOpenComposer}
            onSelectPost={handleSelectPostToEdit}
            onNavigateToChannels={() => setActiveView('channels')}
            onSelectProjectFromCard={handleSelectProject}
          />
        )}

        {/* PROJECTS WORKSPACES VIEW */}
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

        {/* RINNOVO CANALI (Token expiration management view) */}
        {activeView === 'renewal' && (
          <ChannelRenewalView
            channels={channels}
            onRenewChannel={handleRenewChannel}
            onRenewAllExpiring={handleRenewAllExpiring}
          />
        )}

        {/* CHANNELS MANAGEMENT VIEW */}
        {activeView === 'channels' && (
          <ChannelsView
            channels={channels}
            onToggleChannelStatus={handleToggleChannelStatus}
            onConnectNewChannel={handleConnectNewChannel}
          />
        )}

        {/* GENERIC PLATFORM SETTINGS VIEW (MCP Hub, pCloud Media Storage, Docker Server) */}
        {activeView === 'settings' && (
          <SettingsView
            toolsRegistry={MCP_TOOLS_REGISTRY}
            onAgentSchedulePost={handleSavePost}
          />
        )}

      </main>

      {/* Modern Post Composer Modal */}
      {isComposerOpen && (
        <ComposerModal
          isOpen={isComposerOpen}
          initialDate={composerInitialDate}
          initialData={composerInitialData}
          projects={projects}
          currentProject={currentProject}
          onClose={() => setIsComposerOpen(false)}
          onSave={handleSavePost}
        />
      )}
    </div>
  );
}
