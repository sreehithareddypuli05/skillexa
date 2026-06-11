import { useState, useEffect } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import Layout from '../components/layout/Layout';
import CourseCard from '../components/ui/CourseCard';
import { coursesAPI } from '../services/api';
import { useTheme } from '../context/ThemeContext';

const STATIC_COURSES = [
  { id:1,  title:'C Programming',                    icon:'FaC',            level:'beginner',     level_display:'Beginner',     duration:'8 Weeks', short_description:'Master the foundations of programming with C. Learn memory management, pointers, and system-level programming.' },
  { id:2,  title:'Python',                           icon:'FaPython',       level:'beginner',     level_display:'Beginner',     duration:'10 Weeks', short_description:'Learn Python from scratch — scripting, OOP, data handling, automation, and more.' },
  { id:3,  title:'C++',                              icon:'SiCplusplus',    level:'intermediate', level_display:'Intermediate', duration:'10 Weeks', short_description:'Deepen your programming skills with C++, covering OOP, STL, templates, and competitive programming.' },
  { id:4,  title:'Java',                             icon:'FaJava',         level:'intermediate', level_display:'Intermediate', duration:'12 Weeks', short_description:'Build enterprise-grade applications with Java. Learn OOP, collections, multithreading, and Spring basics.' },
  { id:5,  title:'Data Structures & Algorithms',     icon:'FaProjectDiagram',level:'intermediate',level_display:'Intermediate', duration:'14 Weeks', short_description:'Crack coding interviews with strong DSA skills. Arrays, trees, graphs, dynamic programming, and more.' },
  { id:6,  title:'Full Stack Development',           icon:'FaCode',         level:'intermediate', level_display:'Intermediate', duration:'20 Weeks', short_description:'Build complete web apps with React, Node.js, and databases. From UI to deployment.' },
  { id:7,  title:'Git & GitHub',                     icon:'FaGitAlt',       level:'beginner',     level_display:'Beginner',     duration:'2 Weeks', short_description:'Learn version control essentials used by every developer. Branching, merging, pull requests, and collaboration.' },
  { id:8,  title:'Project Building',                 icon:'FaRocket',       level:'intermediate', level_display:'Intermediate', duration:'6 Weeks', short_description:'Learn how to ideate, plan, and build real-world software projects from scratch.' },
  { id:9,  title:'LinkedIn Optimization',            icon:'FaLinkedin',     level:'beginner',     level_display:'Beginner',     duration:'1 Week', short_description:'Transform your LinkedIn profile into a powerful career tool. Get noticed by recruiters.' },
  { id:10, title:'Career Guidance',                  icon:'FaBriefcase',    level:'beginner',     level_display:'Beginner',     duration:'3 Weeks', short_description:'Navigate your career with clarity. Resume tips, interview strategies, and job search mastery.' },
  { id:11, title:'Communication & Personal Branding',icon:'FaUsers',        level:'beginner',     level_display:'Beginner',     duration:'4 Weeks', short_description:'Build your personal brand, improve communication, and stand out in the professional world.' },
  { id:12, title:'Life-Changing Webinars',           icon:'FaVideo',        level:'beginner',     level_display:'Beginner',     duration:'Ongoing', short_description:'Attend curated webinars by industry experts on trending tech and career topics.' },
  { id:13, title:'Internship Guidance and Support',  icon:'FaGraduationCap',level:'beginner',     level_display:'Beginner',     duration:'Ongoing', short_description:'Get real-world internship opportunities, mentorship, and support to kickstart your career.' },
];

const LEVELS = ['all', 'beginner', 'intermediate', 'advanced'];

export default function CoursesPage() {
  const [courses, setCourses] = useState(STATIC_COURSES);
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('all');
  const { isDark } = useTheme();

  useEffect(() => {
    coursesAPI.getAll()
      .then(({ data }) => {
        const list = Array.isArray(data) ? data : (data.results || []);
        if (list.length > 0) setCourses(list);
      })
      .catch(() => {});
  }, []);

  const filtered = courses.filter(c => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      (c.short_description || '').toLowerCase().includes(search.toLowerCase());
    const matchLevel = level === 'all' || c.level === level;
    return matchSearch && matchLevel;
  });

  return (
    <Layout>
      {/* Hero */}
      <div className="hero-bg pt-24 pb-16 text-center relative overflow-hidden">
        <span className="block text-blue-300 font-semibold text-xs uppercase tracking-widest mb-3">All Courses</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Master In-Demand Skills</h1>
        <p className="text-white/65 text-base md:text-lg mb-8 max-w-lg mx-auto px-4">
          From coding fundamentals to career development — every course is designed to make you job-ready.
        </p>

        {/* Search */}
        <div className="relative max-w-md mx-auto px-4">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md text-white placeholder-white/40 text-sm outline-none focus:border-white/40"
          />
        </div>
      </div>

      {/* Filters + Grid */}
      <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Filter row */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm">
              <Filter size={14} /> Filter:
            </div>
            {LEVELS.map(l => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`px-4 py-2 rounded-xl font-semibold text-xs capitalize transition-all ${
                  level === l
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {l === 'all' ? 'All Levels' : l}
              </button>
            ))}
            <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">
              {filtered.length} course{filtered.length !== 1 ? 's' : ''} found
            </span>
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <BookOpen className="w-14 h-14 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <h3 className="text-gray-400 dark:text-gray-500 font-semibold text-lg">No courses found</h3>
              <p className="text-gray-300 dark:text-gray-600 mt-2 text-sm">Try a different search or filter</p>
              <button onClick={() => { setSearch(''); setLevel('all'); }}
                className="mt-4 text-blue-600 dark:text-blue-400 font-semibold text-sm underline bg-none border-none cursor-pointer">
                Clear filters
              </button>
            </div>
          )}

          {/* Cards grid */}
          {filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}