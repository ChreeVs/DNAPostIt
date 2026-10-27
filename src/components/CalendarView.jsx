import React, { useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  ClockIcon,
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
  TikTokIcon,
  YouTubeIcon,
  ThreadsIcon,
  GoogleBusinessIcon
} from './Icons';

export default function CalendarView({
  posts,
  selectedChannelFilter,
  onOpenComposer,
  onSelectPost
}) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 27)); // Oct 27, 2026
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'

  const monthNames = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];

  const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  const getChannelIcon = (platform) => {
    switch (platform) {
      case 'instagram': return <InstagramIcon className="svg-icon-sm" />;
      case 'facebook': return <FacebookIcon className="svg-icon-sm" />;
      case 'linkedin': return <LinkedInIcon className="svg-icon-sm" />;
      case 'tiktok': return <TikTokIcon className="svg-icon-sm" />;
      case 'youtube': return <YouTubeIcon className="svg-icon-sm" />;
      case 'threads': return <ThreadsIcon className="svg-icon-sm" />;
      case 'gmb': return <GoogleBusinessIcon className="svg-icon-sm" />;
      default: return <InstagramIcon className="svg-icon-sm" />;
    }
  };

  // Filter posts
  const filteredPosts = posts.filter(post => {
    if (selectedChannelFilter === 'all') return true;
    return post.channel === selectedChannelFilter || (post.platforms && post.platforms.includes(selectedChannelFilter));
  });

  // Calculate days for the monthly grid
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // First day of month (0 = Sunday, 1 = Monday)
  const firstDay = new Date(year, month, 1).getDay();
  // Adjust so Monday is 0, Sunday is 6
  const startingDayIndex = (firstDay + 6) % 7;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const calendarCells = [];

  // Previous month trailing days
  for (let i = startingDayIndex - 1; i >= 0; i--) {
    calendarCells.push({
      day: prevMonthDays - i,
      month: month - 1,
      year: year,
      isCurrentMonth: false,
      dateString: `${year}-${String(month).padStart(2, '0')}-${String(prevMonthDays - i).padStart(2, '0')}`
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = i === 27 && month === 9 && year === 2026;
    calendarCells.push({
      day: i,
      month: month,
      year: year,
      isCurrentMonth: true,
      isToday,
      dateString: `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    });
  }

  // Next month leading days to complete 35 or 42 grid cells
  const remainingCells = 35 - calendarCells.length;
  for (let i = 1; i <= (remainingCells >= 0 ? remainingCells : 42 - calendarCells.length); i++) {
    calendarCells.push({
      day: i,
      month: month + 1,
      year: year,
      isCurrentMonth: false,
      dateString: `${year}-${String(month + 2).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    });
  }

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const jumpToToday = () => {
    setCurrentDate(new Date(2026, 9, 27));
  };

  return (
    <div className="page-container">
      {/* Calendar Header Controls */}
      <div className="calendar-controls">
        <div className="cal-month-nav">
          <button className="btn-icon-nav" onClick={prevMonth} title="Mese Precedente">
            <ChevronLeftIcon className="svg-icon-sm" />
          </button>

          <div className="cal-month-title">
            {monthNames[month]} {year}
          </div>

          <button className="btn-icon-nav" onClick={nextMonth} title="Mese Successivo">
            <ChevronRightIcon className="svg-icon-sm" />
          </button>

          <button className="btn-secondary" onClick={jumpToToday} style={{ marginLeft: '12px' }}>
            Oggi
          </button>
        </div>

        <div className="cal-view-modes">
          <button
            className={`btn-mode ${viewMode === 'month' ? 'active' : ''}`}
            onClick={() => setViewMode('month')}
          >
            Mese
          </button>
          <button
            className={`btn-mode ${viewMode === 'week' ? 'active' : ''}`}
            onClick={() => setViewMode('week')}
          >
            Settimana
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="calendar-grid">
        {daysOfWeek.map((dayName, idx) => (
          <div key={idx} className="cal-header-day">
            {dayName}
          </div>
        ))}

        {calendarCells.map((cell, idx) => {
          const postsForThisDay = filteredPosts.filter(p => {
            const pDate = p.scheduledDate ? p.scheduledDate.split('T')[0] : '';
            return pDate === cell.dateString;
          });

          return (
            <div
              key={idx}
              className={`cal-cell ${!cell.isCurrentMonth ? 'other-month' : ''} ${cell.isToday ? 'today' : ''}`}
              onClick={() => {
                if (cell.isCurrentMonth) {
                  onOpenComposer(cell.dateString);
                }
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="cal-date-number">{cell.day}</span>
                {postsForThisDay.length > 0 && (
                  <span style={{ fontSize: '0.68rem', color: 'var(--primary-neon)', fontWeight: 700 }}>
                    {postsForThisDay.length} post
                  </span>
                )}
              </div>

              {/* List of post cards in the cell */}
              <div className="cal-posts-container" onClick={(e) => e.stopPropagation()}>
                {postsForThisDay.map(post => {
                  const timeStr = post.scheduledDate ? post.scheduledDate.split('T')[1].substring(0, 5) : '12:00';
                  const thumb = post.mediaUrls && post.mediaUrls[0];

                  return (
                    <div
                      key={post.id}
                      className="cal-post-card"
                      onClick={() => onSelectPost(post)}
                      title={`Clicca per modificare post su ${post.channel}`}
                    >
                      <span className={`cal-post-status status-bg-${post.status}`} />

                      <div className="post-channel-icon">
                        {getChannelIcon(post.channel)}
                      </div>

                      {thumb && (
                        <img src={thumb} alt="Media" className="cal-post-thumb" />
                      )}

                      <div className="cal-post-text">
                        {post.content.substring(0, 32)}...
                      </div>

                      <div className="cal-post-time">
                        {timeStr}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
