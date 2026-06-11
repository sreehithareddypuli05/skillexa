import { Clock, Users } from 'lucide-react';

const iconMap = {
  FaC: { short: 'C', gradient: 'linear-gradient(135deg,#2563eb,#1e40af)' },
  FaPython: { short: 'PY', gradient: 'linear-gradient(135deg,#3b82f6,#7c3aed)' },
  SiCplusplus: { short: 'C++', gradient: 'linear-gradient(135deg,#06b6d4,#2563eb)' },
  FaJava: { short: 'JV', gradient: 'linear-gradient(135deg,#f97316,#dc2626)' },
  FaProjectDiagram: { short: 'DS', gradient: 'linear-gradient(135deg,#0891b2,#2563eb)' },
  FaCode: { short: 'FS', gradient: 'linear-gradient(135deg,#8b5cf6,#ec4899)' },
  FaGitAlt: { short: 'GT', gradient: 'linear-gradient(135deg,#f97316,#ea580c)' },
  FaRocket: { short: 'RK', gradient: 'linear-gradient(135deg,#6366f1,#8b5cf6)' },
  FaLinkedin: { short: 'IN', gradient: 'linear-gradient(135deg,#0ea5e9,#2563eb)' },
  FaBriefcase: { short: 'CR', gradient: 'linear-gradient(135deg,#14b8a6,#0f766e)' },
  FaUsers: { short: 'CM', gradient: 'linear-gradient(135deg,#ec4899,#db2777)' },
  FaVideo: { short: 'VD', gradient: 'linear-gradient(135deg,#ef4444,#b91c1c)' },
  FaGraduationCap: { short: 'ED', gradient: 'linear-gradient(135deg,#7c3aed,#4338ca)' },
};

const levelStyles = {
  beginner:     { bar: '#10b981', badge: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400', label: 'Beginner' },
  intermediate: { bar: '#f59e0b', badge: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400', label: 'Intermediate' },
  advanced:     { bar: '#ef4444', badge: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400', label: 'Advanced' },
};

export default function CourseCard({ course }) {
  const iconData = iconMap[course.icon] || { short: 'SK', gradient: 'linear-gradient(135deg,#2563eb,#7c3aed)' };
  const lvl = course.level || 'beginner';
  const style = levelStyles[lvl] || levelStyles.beginner;
  const label = course.level_display || style.label;
  const count = (course.enrollment_count || 0).toLocaleString();

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-gray-900/60 cursor-default">
      {/* Color bar */}
      <div style={{ height: '4px', background: style.bar }} />

      <div className="p-5 flex flex-col flex-1">
        {/* Icon + Badge */}
        <div className="flex justify-between items-start mb-4">
          <div style={{
            width: '52px', height: '52px', borderRadius: '16px',
            background: iconData.gradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '0.95rem', fontWeight: '800',
            letterSpacing: '0.5px', boxShadow: '0 10px 20px rgba(37,99,235,0.18)',
          }}>
            {iconData.short}
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${style.badge}`}>
            {label}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2 leading-snug">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {course.short_description}
        </p>

        {/* Meta */}
        <div className="flex gap-4 text-xs text-gray-400 dark:text-gray-500 pt-3 mb-4 border-t border-gray-100 dark:border-gray-800">
          <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
         
        </div>

        {/* Button */}
        <button
          className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors duration-200"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
}