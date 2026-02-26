import { useState, useEffect } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import Layout from '../components/layout/Layout';
import CourseCard from '../components/ui/CourseCard';
import { coursesAPI } from '../services/api';

const STATIC_COURSES = [
  { id:1,  title:'C Programming',                    icon:'FaC',            level:'beginner',     level_display:'Beginner',     duration:'8 Weeks',  enrollment_count:1240, short_description:'Master the foundations of programming with C. Learn memory management, pointers, and system-level programming.' },
  { id:2,  title:'Python',                           icon:'FaPython',       level:'beginner',     level_display:'Beginner',     duration:'10 Weeks', enrollment_count:3520, short_description:'Learn Python from scratch — scripting, OOP, data handling, automation, and more.' },
  { id:3,  title:'C++',                              icon:'SiCplusplus',    level:'intermediate', level_display:'Intermediate', duration:'10 Weeks', enrollment_count:890,  short_description:'Deepen your programming skills with C++, covering OOP, STL, templates, and competitive programming.' },
  { id:4,  title:'Java',                             icon:'FaJava',         level:'intermediate', level_display:'Intermediate', duration:'12 Weeks', enrollment_count:1780, short_description:'Build enterprise-grade applications with Java. Learn OOP, collections, multithreading, and Spring basics.' },
  { id:5,  title:'Data Structures & Algorithms',     icon:'FaProjectDiagram',level:'intermediate',level_display:'Intermediate', duration:'14 Weeks', enrollment_count:2340, short_description:'Crack coding interviews with strong DSA skills. Arrays, trees, graphs, dynamic programming, and more.' },
  { id:6,  title:'Full Stack Development',           icon:'FaCode',         level:'intermediate', level_display:'Intermediate', duration:'20 Weeks', enrollment_count:4120, short_description:'Build complete web apps with React, Node.js, and databases. From UI to deployment.' },
  { id:7,  title:'Git & GitHub',                     icon:'FaGitAlt',       level:'beginner',     level_display:'Beginner',     duration:'2 Weeks',  enrollment_count:2890, short_description:'Learn version control essentials used by every developer. Branching, merging, pull requests, and collaboration.' },
  { id:8,  title:'Project Building',                 icon:'FaRocket',       level:'intermediate', level_display:'Intermediate', duration:'6 Weeks',  enrollment_count:1230, short_description:'Learn how to ideate, plan, and build real-world software projects from scratch.' },
  { id:9,  title:'LinkedIn Optimization',            icon:'FaLinkedin',     level:'beginner',     level_display:'Beginner',     duration:'1 Week',   enrollment_count:3450, short_description:'Transform your LinkedIn profile into a powerful career tool. Get noticed by recruiters.' },
  { id:10, title:'Career Guidance',                  icon:'FaBriefcase',    level:'beginner',     level_display:'Beginner',     duration:'3 Weeks',  enrollment_count:2100, short_description:'Navigate your career with clarity. Resume tips, interview strategies, and job search mastery.' },
  { id:11, title:'Communication & Personal Branding',icon:'FaUsers',        level:'beginner',     level_display:'Beginner',     duration:'4 Weeks',  enrollment_count:1670, short_description:'Build your personal brand, improve communication, and stand out in the professional world.' },
  { id:12, title:'Life-Changing Webinars',           icon:'FaVideo',        level:'beginner',     level_display:'Beginner',     duration:'Ongoing',  enrollment_count:5600, short_description:'Attend curated webinars by industry experts on trending tech and career topics.' },
  { id:13, title:'Internship Guidance and Support',  icon:'FaGraduationCap',level:'beginner',     level_display:'Beginner',     duration:'Ongoing',  enrollment_count:980,  short_description:'Get real-world internship opportunities, mentorship, and support to kickstart your career.' },
];

const LEVELS = ['all', 'beginner', 'intermediate', 'advanced'];

export default function CoursesPage() {
  const [courses, setCourses] = useState(STATIC_COURSES);
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('all');

  useEffect(() => {
    coursesAPI.getAll()
      .then(({ data }) => {
        const list = Array.isArray(data) ? data : (data.results || []);
        if (list.length > 0) setCourses(list);
      })
      .catch(() => {}); // keep static data on error
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
      {/* ── Hero ── */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 45%, #312e81 100%)',
        paddingTop: '96px', paddingBottom: '64px',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <span style={{ color: '#93c5fd', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '12px' }}>
          All Courses
        </span>
        <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 800, color: '#fff', marginBottom: '14px' }}>
          Master In-Demand Skills
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', marginBottom: '28px', maxWidth: '520px', margin: '0 auto 28px' }}>
          From coding fundamentals to career development — every course is designed to make you job-ready.
        </p>

        {/* Search */}
        <div style={{ position: 'relative', maxWidth: '460px', margin: '0 auto' }}>
          <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', width: 18, height: 18 }} />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '14px 16px 14px 48px',
              borderRadius: '12px', border: '1.5px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
              color: '#fff', fontFamily: 'inherit', fontSize: '0.95rem', outline: 'none',
            }}
          />
        </div>
      </div>

      {/* ── Filters + Grid ── */}
      <div style={{ background: '#f8fafc', minHeight: '60vh', padding: '40px 24px 60px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

          {/* Filter row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.85rem' }}>
              <Filter size={14} /> Filter:
            </div>
            {LEVELS.map(l => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                style={{
                  padding: '8px 18px', borderRadius: '10px', fontFamily: 'inherit',
                  fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer',
                  border: level === l ? 'none' : '1.5px solid #e2e8f0',
                  background: level === l ? '#2563eb' : '#fff',
                  color: level === l ? '#fff' : '#475569',
                  textTransform: 'capitalize',
                  boxShadow: level === l ? '0 4px 12px rgba(37,99,235,0.3)' : 'none',
                  transition: 'all 0.15s',
                }}
              >
                {l === 'all' ? 'All Levels' : l}
              </button>
            ))}
            <span style={{ marginLeft: 'auto', fontSize: '0.82rem', color: '#94a3b8' }}>
              {filtered.length} course{filtered.length !== 1 ? 's' : ''} found
            </span>
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <BookOpen style={{ width: 56, height: 56, color: '#cbd5e1', margin: '0 auto 16px' }} />
              <h3 style={{ color: '#94a3b8', fontWeight: 600, fontSize: '1.1rem' }}>No courses found</h3>
              <p style={{ color: '#cbd5e1', marginTop: '6px', fontSize: '0.9rem' }}>Try a different search or filter</p>
              <button onClick={() => { setSearch(''); setLevel('all'); }}
                style={{ marginTop: '16px', color: '#2563eb', fontWeight: 600, fontSize: '0.85rem', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                Clear filters
              </button>
            </div>
          )}

          {/* ✅ Course cards grid */}
          {filtered.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '20px',
            }}>
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