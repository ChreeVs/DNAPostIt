import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import CalendarView from './components/CalendarView';
import CarouselSplitterView from './components/CarouselSplitterView';
import ChannelsView from './components/ChannelsView';
import MediaLibraryView from './components/MediaLibraryView';
import McpHubView from './components/McpHubView';
import SettingsView from './components/SettingsView';
import ComposerModal from './components/ComposerModal';
import {
  INITIAL_PROJECTS,
  INITIAL_CHANNELS,
  INITIAL_POSTS,
  INITIAL_MEDIA_LIBRARY,
  MCP_TOOLS_REGISTRY
} from './mockData';

export default function App() {
  const [activeView, setActiveView] = useState('calendar');
  const [projects] = useState(INITIAL_PROJECTS);
  const [currentProject, setCurrentProject] = useState(INITIAL_PROJECTS[0]);
  const [channels] = useState(INITIAL_CHANNELS);
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [mediaLibrary] = useState(INITIAL_MEDIA_LIBRARY);

  const [selectedChannelFilter, setSelectedChannelFilter] = useState('all');

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
    setPosts(prev => {
      const existsIndex = prev.findIndex(p => p.id === savedPost.id);
      if (existsIndex >= 0) {
        const updated = [...prev];
        updated[existsIndex] = savedPost;
        return updated;
      } else {
        return [savedPost, ...prev];
      }
    });
  };

  // Carousel Slices flow to Composer
  const handleSendSlicesToComposer = (slicedDataUrls) => {
    setComposerInitialData({
      id: `post-carousel-${Date.now()}`,
      platforms: ['instagram', 'linkedin'],
      content: 'Nuovo approfondimento a scorrimento orizzontale. Scorri le slide per tutti i dettagli tecnici.',
      mediaUrls: slicedDataUrls,
      mediaType: 'carousel',
      firstComment: 'Commenta per ricevere la documentazione tecnica in formato PDF.'
    });
    setIsComposerOpen(true);
  };

  // Media Library to Splitter flow
  const handleSendMediaToSplitter = (mediaUrl) => {
    setActiveView('splitter');
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenComposer={() => handleOpenComposer()}
        projects={projects}
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
        postsCount={posts.length}
      />

      {/* Main Area */}
      <div className="main-wrapper">
        <Topbar
          activeView={activeView}
          selectedChannelFilter={selectedChannelFilter}
          setSelectedChannelFilter={setSelectedChannelFilter}
          onOpenComposer={() => handleOpenComposer()}
          onOpenSplitter={() => setActiveView('splitter')}
        />

        {/* View Router */}
        {activeView === 'calendar' && (
          <CalendarView
            posts={posts}
            selectedChannelFilter={selectedChannelFilter}
            onOpenComposer={handleOpenComposer}
            onSelectPost={handleSelectPostToEdit}
          />
        )}

        {activeView === 'splitter' && (
          <CarouselSplitterView
            onSendToComposer={handleSendSlicesToComposer}
            mediaLibrary={mediaLibrary}
          />
        )}

        {activeView === 'channels' && (
          <ChannelsView channels={channels} />
        )}

        {activeView === 'media' && (
          <MediaLibraryView
            mediaItems={mediaLibrary}
            onSendToSplitter={handleSendMediaToSplitter}
          />
        )}

        {activeView === 'mcp' && (
          <McpHubView
            toolsRegistry={MCP_TOOLS_REGISTRY}
            onAgentSchedulePost={handleSavePost}
          />
        )}

        {activeView === 'settings' && (
          <SettingsView />
        )}
      </div>

      {/* Post Composer Modal */}
      <ComposerModal
        isOpen={isComposerOpen}
        onClose={() => setIsComposerOpen(false)}
        onSavePost={handleSavePost}
        initialDate={composerInitialDate}
        initialData={composerInitialData}
        onOpenSplitter={() => setActiveView('splitter')}
      />
    </div>
  );
}
