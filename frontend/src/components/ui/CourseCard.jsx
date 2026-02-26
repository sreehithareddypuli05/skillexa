import { Clock, Users } from 'lucide-react';

const iconMap = {
  FaC: '🔧', FaPython: '🐍', SiCplusplus: '⚡', FaJava: '☕',
  FaProjectDiagram: '🌐', FaCode: '💻', FaGitAlt: '🔀', FaRocket: '🚀',
  FaLinkedin: '💼', FaBriefcase: '🎯', FaUsers: '👥', FaVideo: '🎥',
  FaGraduationCap: '🎓',
};

const levelStyles = {
  beginner:     { bar: '#10b981', badge: '#dcfce7', badgeText: '#15803d', label: 'Beginner' },
  intermediate: { bar: '#f59e0b', badge: '#fef3c7', badgeText: '#92400e', label: 'Intermediate' },
  advanced:     { bar: '#ef4444', badge: '#fee2e2', badgeText: '#991b1b', label: 'Advanced' },
};

export default function CourseCard({ course }) {
  const emoji = iconMap[course.icon] || '📚';
  const lvl = course.level || 'beginner';
  const style = levelStyles[lvl] || levelStyles.beginner;
  const label = course.level_display || style.label;
  const count = (course.enrollment_count || 0).toLocaleString();

  return (
    <div style={{
      background: '#fff',
      borderRadius: '1rem',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      transition: 'transform 0.25s, box-shadow 0.25s',
      cursor: 'default',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 16px 32px rgba(0,0,0,0.12)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.07)';
    }}
    >
      {/* Color bar */}
      <div style={{ height: '4px', background: style.bar }} />

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Icon + Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '12px',
            background: '#eff6ff', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '1.4rem',
          }}>
            {emoji}
          </div>
          <span style={{
            background: style.badge, color: style.badgeText,
            borderRadius: '999px', padding: '3px 10px',
            fontSize: '0.7rem', fontWeight: 700,
          }}>
            {label}
          </span>
        </div>

        {/* Title */}
        <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a', marginBottom: '8px', lineHeight: 1.3 }}>
          {course.title}
        </h3>

        {/* Description */}
        <p style={{
          color: '#64748b', fontSize: '0.83rem', lineHeight: 1.6,
          marginBottom: '16px', flex: 1,
          display: '-webkit-box', WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {course.short_description}
        </p>

        {/* Meta */}
        <div style={{
          display: 'flex', gap: '16px', fontSize: '0.75rem', color: '#94a3b8',
          paddingTop: '12px', marginBottom: '14px',
          borderTop: '1px solid #f1f5f9',
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={12} /> {course.duration}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Users size={12} /> {count} enrolled
          </span>
        </div>

        {/* Button */}
        <button style={{
          width: '100%', padding: '10px', borderRadius: '10px',
          background: '#2563eb', color: '#fff', border: 'none',
          fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
          fontFamily: 'inherit', transition: 'background 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
        onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
}