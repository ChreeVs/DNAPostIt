import React, { useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  CheckIcon,
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  YouTubeIcon,
  LinkedInIcon,
  ThreadsIcon,
  GoogleBusinessIcon,
  FilterIcon,
  ChatBubbleIcon,
  BellIcon
} from './Icons';
import { OBSERVANCE_DAYS } from '../mockData';

export default function CalendarView({
  isGlobalDashboard = false,
  currentProject,
  projects = [],
  posts,
  channels,
  onOpenComposer,
  onSelectPost,
  onNavigateToChannels,
  onSelectProjectFromCard
}) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 27)); // Oct 2026
  const [viewMode, setViewMode] = useState('month'); // 'month' | 'week'
  const [selectedProjectFilter, setSelectedProjectFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const jumpToToday = () => {
    setCurrentDate(new Date(2026, 9, 27));
  };

  const daysOfWeek = ['lun', 'mar', 'mer', 'gio', 'ven', 'sab', 'dom'];

  // Helper to render platform circle badges on post card
  const renderPlatformBadges = (platforms) => {
    if (!platforms || platforms.length === 0) return null;

    const maxVisible = 3;
    const visiblePlatforms = platforms.slice(0, maxVisible);
    const extraCount = platforms.length - maxVisible;

    return (
      <div className="pubblie-post-platform-group">
        {visiblePlatforms.map((p, idx) => {
          let icon = null;
          let bgColor = '#1e2430';

          if (p === 'facebook') { icon = <FacebookIcon className="svg-icon-mini" />; bgColor = '#1877f2'; }
          else if (p === 'instagram') { icon = <InstagramIcon className="svg-icon-mini" />; bgColor = '#e1306c'; }
          else if (p === 'tiktok') { icon = <TikTokIcon className="svg-icon-mini" />; bgColor = '#000'; }
          else if (p === 'linkedin') { icon = <LinkedInIcon className="svg-icon-mini" />; bgColor = '#0a66c2'; }
          else if (p === 'youtube') { icon = <YouTubeIcon className="svg-icon-mini" />; bgColor = '#ff0000'; }
          else if (p === 'threads') { icon = <ThreadsIcon className="svg-icon-mini" />; bgColor = '#111'; }
          else if (p === 'gmb') { icon = <GoogleBusinessIcon className="svg-icon-mini" />; bgColor = '#4285f4'; }

          return (
            <div
              key={idx}
              className="pubblie-mini-social-circle"
              style={{ backgroundColor: bgColor }}
            >
              {icon}
            </div>
          );
        })}

        {extraCount > 0 && (
          <div className="pubblie-mini-extra-badge">
            +{extraCount}
          </div>
        )}
      </div>
    );
  };

  // Calendar matrix calculation for October 2026
  const weeksData = [
    {
      weekNumber: 'Sm40',
      days: [
        { dateStr: '2026-09-28', dayNumber: 28, isCurrentMonth: false },
        { dateStr: '2026-09-29', dayNumber: 29, isCurrentMonth: false },
        { dateStr: '2026-09-30', dayNumber: 30, isCurrentMonth: false },
        { dateStr: '2026-10-01', dayNumber: 1, isCurrentMonth: true },
        { dateStr: '2026-10-02', dayNumber: 2, isCurrentMonth: true },
        { dateStr: '2026-10-03', dayNumber: 3, isCurrentMonth: true },
        { dateStr: '2026-10-04', dayNumber: 4, isCurrentMonth: true }
      ]
    },
    {
      weekNumber: 'Sm41',
      days: [
        { dateStr: '2026-10-05', dayNumber: 5, isCurrentMonth: true },
        { dateStr: '2026-10-06', dayNumber: 6, isCurrentMonth: true },
        { dateStr: '2026-10-07', dayNumber: 7, isCurrentMonth: true },
        { dateStr: '2026-10-08', dayNumber: 8, isCurrentMonth: true },
        { dateStr: '2026-10-09', dayNumber: 9, isCurrentMonth: true },
        { dateStr: '2026-10-10', dayNumber: 10, isCurrentMonth: true },
        { dateStr: '2026-10-11', dayNumber: 11, isCurrentMonth: true }
      ]
    },
    {
      weekNumber: 'Sm42',
      days: [
        { dateStr: '2026-10-12', dayNumber: 12, isCurrentMonth: true },
        { dateStr: '2026-10-13', dayNumber: 13, isCurrentMonth: true },
        { dateStr: '2026-10-14', dayNumber: 14, isCurrentMonth: true },
        { dateStr: '2026-10-15', dayNumber: 15, isCurrentMonth: true },
        { dateStr: '2026-10-16', dayNumber: 16, isCurrentMonth: true },
        { dateStr: '2026-10-17', dayNumber: 17, isCurrentMonth: true },
        { dateStr: '2026-10-18', dayNumber: 18, isCurrentMonth: true }
      ]
    },
    {
      weekNumber: 'Sm43',
      days: [
        { dateStr: '2026-10-19', dayNumber: 19, isCurrentMonth: true },
        { dateStr: '2026-10-20', dayNumber: 20, isCurrentMonth: true },
        { dateStr: '2026-10-21', dayNumber: 21, isCurrentMonth: true },
        { dateStr: '2026-10-22', dayNumber: 22, isCurrentMonth: true },
        { dateStr: '2026-10-23', dayNumber: 23, isCurrentMonth: true },
        { dateStr: '2026-10-24', dayNumber: 24, isCurrentMonth: true },
        { dateStr: '2026-10-25', dayNumber: 25, isCurrentMonth: true }
      ]
    },
    {
      weekNumber: 'Sm44',
      days: [
        { dateStr: '2026-10-26', dayNumber: 26, isCurrentMonth: true },
        { dateStr: '2026-10-27', dayNumber: 27, isCurrentMonth: true, isToday: true },
        { dateStr: '2026-10-28', dayNumber: 28, isCurrentMonth: true },
        { dateStr: '2026-10-29', dayNumber: 29, isCurrentMonth: true },
        { dateStr: '2026-10-30', dayNumber: 30, isCurrentMonth: true },
        { dateStr: '2026-10-31', dayNumber: 31, isCurrentMonth: true },
        { dateStr: '2026-11-01', dayNumber: 1, isCurrentMonth: false }
      ]
    }
  ];

  // Filter posts based on mode and filter selection
  const displayedPosts = posts.filter((p) => {
    if (!isGlobalDashboard) {
      // In project mode: only this project's posts
      return p.projectId === (currentProject ? currentProject.id : 'proj-paa');
    }
    // In global dashboard: check filter
    if (selectedProjectFilter !== 'all') {
      return p.projectId === selectedProjectFilter;
    }
    return true;
  });

  return (
    <div className="pubblie-main-content">
      {/* GLOBAL DASHBOARD TOP BAR (MATCHING SCREENSHOT) */}
      {isGlobalDashboard ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 24px',
            borderBottom: '1px solid var(--border-grid)',
            background: '#ffffff'
          }}
        >
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#334155', letterSpacing: '-0.02em', margin: 0 }}>
            Dashboard
          </h1>

          {/* Right Header Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              type="button"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b', padding: '6px' }}
              title="Messaggi e commenti"
            >
              <ChatBubbleIcon className="svg-icon" />
            </button>

            <div style={{ position: 'relative', cursor: 'pointer' }} title="Notifiche piattaforma">
              <span
                style={{
                  background: '#f43f5e',
                  color: '#ffffff',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  padding: '2px 7px',
                  borderRadius: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '2px'
                }}
              >
                469
              </span>
            </div>

            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-granata)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
              title="Profilo Utente"
            >
              AD
            </div>
          </div>
        </div>
      ) : (
        /* SINGLE PROJECT TOP BAR (WITH CHANNELS COUNTERS STRIP) */
        <div className="pubblie-top-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: currentProject ? currentProject.color : 'var(--primary-granata)'
              }}
            />
            <h1 className="pubblie-project-title">
              {currentProject ? currentProject.name : 'PAA'}
            </h1>
          </div>

          <div className="pubblie-channels-counters-strip">
            {channels.map((ch) => {
              let icon = null;
              if (ch.platform === 'facebook') icon = <FacebookIcon className="svg-icon-sm" />;
              else if (ch.platform === 'instagram') icon = <InstagramIcon className="svg-icon-sm" />;
              else if (ch.platform === 'tiktok') icon = <TikTokIcon className="svg-icon-sm" />;
              else if (ch.platform === 'youtube') icon = <YouTubeIcon className="svg-icon-sm" />;
              else if (ch.platform === 'linkedin') icon = <LinkedInIcon className="svg-icon-sm" />;
              else if (ch.platform === 'threads') icon = <ThreadsIcon className="svg-icon-sm" />;
              else if (ch.platform === 'gmb') icon = <GoogleBusinessIcon className="svg-icon-sm" />;

              const isAct = ch.active && ch.connected;

              return (
                <div
                  key={ch.id}
                  className="pubblie-channel-bubble-col"
                  title={`${ch.name} - ${isAct ? 'Attivo' : 'Inattivo'}`}
                  style={{ opacity: isAct ? 1 : 0.45 }}
                >
                  <div
                    className="pubblie-channel-bubble-circle"
                    style={{ border: `1.5px solid ${ch.color}` }}
                  >
                    <span style={{ color: ch.color }}>{icon}</span>
                  </div>
                  <span className="pubblie-channel-bubble-count">
                    {ch.count || 0}
                  </span>
                </div>
              );
            })}

            <div
              className="pubblie-channel-bubble-col"
              title="Gestisci o attiva canali"
              onClick={onNavigateToChannels}
              style={{ cursor: 'pointer' }}
            >
              <div className="pubblie-channel-bubble-circle add-btn">
                <PlusIcon className="svg-icon-sm" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CALENDAR CONTROLS SUBHEAD (MATCHING SCREENSHOT) */}
      <div className="pubblie-calendar-nav-bar">
        <div className="pubblie-cal-subhead">
          <h2>Calendario editoriale</h2>
        </div>

        <div className="pubblie-nav-actions-left">
          <button className="pubblie-btn-nav" onClick={prevMonth} title="Mese precedente">
            <ChevronLeftIcon className="svg-icon-sm" />
          </button>
          <button className="pubblie-btn-nav" onClick={nextMonth} title="Mese successivo">
            <ChevronRightIcon className="svg-icon-sm" />
          </button>
          <button className="pubblie-btn-nav today-btn" onClick={jumpToToday}>
            Oggi
          </button>
        </div>

        <div className="pubblie-month-display">
          ottobre 2026
        </div>

        {/* Right side controls: Filtri and Mese / Settimana toggle */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Filtri button */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: selectedProjectFilter !== 'all' ? '#fef2f2' : '#ffffff',
                border: selectedProjectFilter !== 'all' ? '1px solid var(--primary-granata)' : '1px solid var(--border-grid)',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: selectedProjectFilter !== 'all' ? 'var(--primary-granata)' : '#475569',
                cursor: 'pointer'
              }}
            >
              <FilterIcon className="svg-icon-mini" />
              <span>Filtri</span>
              <span style={{ fontSize: '0.65rem' }}>▼</span>
            </button>

            {isFilterOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  width: '220px',
                  background: '#ffffff',
                  border: '1px solid var(--border-grid)',
                  borderRadius: '8px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  padding: '8px 0',
                  zIndex: 40
                }}
              >
                <div style={{ padding: '6px 14px', fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Filtra per Progetto
                </div>
                <div
                  onClick={() => {
                    setSelectedProjectFilter('all');
                    setIsFilterOpen(false);
                  }}
                  style={{
                    padding: '8px 14px',
                    fontSize: '0.8rem',
                    fontWeight: selectedProjectFilter === 'all' ? 700 : 500,
                    color: selectedProjectFilter === 'all' ? 'var(--primary-granata)' : '#334155',
                    background: selectedProjectFilter === 'all' ? '#fef2f2' : 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  Tutti i progetti ({posts.length})
                </div>
                {projects.map((proj) => {
                  const projPostsCount = posts.filter((p) => p.projectId === proj.id).length;
                  return (
                    <div
                      key={proj.id}
                      onClick={() => {
                        setSelectedProjectFilter(proj.id);
                        setIsFilterOpen(false);
                      }}
                      style={{
                        padding: '8px 14px',
                        fontSize: '0.8rem',
                        fontWeight: selectedProjectFilter === proj.id ? 700 : 500,
                        color: selectedProjectFilter === proj.id ? 'var(--primary-granata)' : '#334155',
                        background: selectedProjectFilter === proj.id ? '#fef2f2' : 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: proj.color }} />
                        {proj.name}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{projPostsCount}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Mese / Settimana Toggle */}
          <div style={{ display: 'inline-flex', border: '1px solid var(--border-grid)', borderRadius: '6px', overflow: 'hidden' }}>
            <button
              type="button"
              onClick={() => setViewMode('month')}
              style={{
                padding: '6px 14px',
                fontSize: '0.8rem',
                fontWeight: viewMode === 'month' ? 800 : 600,
                background: viewMode === 'month' ? '#1e293b' : '#ffffff',
                color: viewMode === 'month' ? '#ffffff' : '#64748b',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Mese
            </button>
            <button
              type="button"
              onClick={() => setViewMode('week')}
              style={{
                padding: '6px 14px',
                fontSize: '0.8rem',
                fontWeight: viewMode === 'week' ? 800 : 600,
                background: viewMode === 'week' ? '#1e293b' : '#ffffff',
                color: viewMode === 'week' ? '#ffffff' : '#64748b',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Settimana
            </button>
          </div>
        </div>
      </div>

      {/* CALENDAR GRID */}
      <div className="pubblie-grid-wrapper">
        {/* Days of week header row */}
        <div className="pubblie-days-header-row">
          <div className="pubblie-corner-cell" />
          {daysOfWeek.map((day) => (
            <div key={day} className="pubblie-day-name-cell">
              {day}
            </div>
          ))}
        </div>

        {/* Weeks rendering */}
        {weeksData
          .filter((_, idx) => (viewMode === 'week' ? idx === 4 : true))
          .map((week, wIdx) => (
            <div key={wIdx} className="pubblie-week-row">
              <div className="pubblie-week-number-cell">
                {week.weekNumber}
              </div>

              {week.days.map((dayObj, dIdx) => {
                const postsForDay = displayedPosts.filter((p) => p.date === dayObj.dateStr);
                const observances = OBSERVANCE_DAYS[dayObj.dateStr] || [];

                return (
                  <div
                    key={dIdx}
                    className={`pubblie-day-cell ${!dayObj.isCurrentMonth ? 'other-month' : ''} ${dayObj.isToday ? 'today-cell' : ''}`}
                    onClick={() => onOpenComposer(dayObj.dateStr)}
                    title="Clicca per programmare un post"
                  >
                    <div className="pubblie-cell-header">
                      <span className="pubblie-cell-date-num">{dayObj.dayNumber}</span>
                    </div>

                    {/* Posts list */}
                    <div
                      className="pubblie-cell-posts-list"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {postsForDay.map((post) => {
                        const isStory = post.type === 'STORY';
                        const isReel = post.type === 'REEL';

                        return (
                          <div
                            key={post.id}
                            className="pubblie-card-post"
                            onClick={() => onSelectPost(post)}
                            title={post.content}
                            style={{
                              borderLeft: isGlobalDashboard ? `3px solid ${post.projectColor || '#800020'}` : '1px solid #cbd5e1'
                            }}
                          >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', width: '100%' }}>
                              {/* If Global Dashboard: Show Project Name header on card (as in screenshot!) */}
                              {isGlobalDashboard && (
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: '1px'
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: '0.64rem',
                                      fontWeight: 800,
                                      color: post.projectColor || '#334155',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap'
                                    }}
                                  >
                                    {post.projectName || 'Progetto'}
                                  </span>
                                </div>
                              )}

                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div className="pubblie-card-pills-left">
                                  <span className={`pubblie-time-pill ${isStory ? 'story-pill' : isReel ? 'reel-pill' : 'feed-pill'}`}>
                                    <CheckIcon className="svg-icon-mini" />
                                    <span>{post.time}</span>
                                  </span>

                                  <span className={`pubblie-type-tag ${isStory ? 'story-tag' : isReel ? 'reel-tag' : 'feed-tag'}`}>
                                    {post.type}
                                  </span>
                                </div>

                                {renderPlatformBadges(post.platforms)}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Observances ("Giornate mondiali") */}
                    {observances.length > 0 && (
                      <div className="pubblie-observances-list">
                        {observances.map((obs, oIdx) => (
                          <div key={oIdx} className="pubblie-observance-item">
                            <span className="obs-plus">+</span>
                            <span className="obs-text">{obs}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
      </div>
    </div>
  );
}
