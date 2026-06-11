import { ArrowRight } from 'lucide-react';

const iconMap = {
  FaPalette: '🎨', FaVideo: '🎬', FaChartLine: '📈',
  FaLinkedin: '💼', FaRocket: '🚀', FaFileAlt: '📄',
  FaGlobe: '🌐', FaBuilding: '🏢', FaPaintBrush: '🖌️',
};

const categoryColor = {
  design: 'from-purple-500 to-pink-500',
  marketing: 'from-orange-500 to-red-500',
  development: 'from-blue-500 to-cyan-500',
  career: 'from-green-500 to-teal-500',
  business: 'from-indigo-500 to-purple-500',
};

export default function ServiceCard({ service, onRequest }) {
  const emoji = iconMap[service.icon] || '⚙️';
  const bg = categoryColor[service.category] || 'from-blue-500 to-indigo-500';

  return (
    <div
      className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-xl dark:hover:shadow-gray-900/60 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
      onClick={onRequest}
    >
      <div className={`h-1.5 bg-gradient-to-r ${bg}`} />

      <div className="p-6 flex flex-col flex-1">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${bg} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
          {emoji}
        </div>

        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
          {service.category_display || service.category}
        </span>

        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {service.title}
        </h3>

        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5 flex-1">
          {service.short_description}
        </p>

        <button
          onClick={(e) => { e.stopPropagation(); onRequest && onRequest(service); }}
          className="w-full py-2.5 px-4 border-2 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:hover:text-white rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
        >
          Request Service <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}