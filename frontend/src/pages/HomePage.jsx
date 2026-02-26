import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Briefcase, TrendingUp, Users, Star, CheckCircle, ChevronRight, Zap, Award, Globe, Code2, Rocket } from 'lucide-react';
import Layout from '../components/layout/Layout';
import CourseCard from '../components/ui/CourseCard';
import { coursesAPI } from '../services/api';

const stats = [
  { label: 'Students Enrolled', value: '12,000+', icon: Users },
  { label: 'Courses Available', value: '50+', icon: BookOpen },
  { label: 'Success Rate', value: '94%', icon: TrendingUp },
  { label: 'Expert Instructors', value: '30+', icon: Award },
];

const features = [
  { icon: Code2, title: 'Industry-Ready Curriculum', desc: 'Courses designed with top tech companies to ensure you learn what the industry demands.' },
  { icon: Users, title: 'Community Learning', desc: 'Join a thriving community of 12,000+ learners, mentors, and industry professionals.' },
  { icon: Rocket, title: 'Career Acceleration', desc: 'From resume building to placement support — we guide you every step of the way.' },
  { icon: Globe, title: 'Live & Self-Paced', desc: 'Flexible learning formats to fit your schedule — live sessions, recordings, and projects.' },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer @ Infosys',
    avatar: 'PS',
    stars: 5,
    text: 'Skillexa completely transformed my career. The Full Stack Development course was the best investment I ever made. Got placed within 3 months!',
  },
  {
    name: 'Arjun Mehta',
    role: 'Data Analyst @ TCS',
    avatar: 'AM',
    stars: 5,
    text: 'The DSA course here is phenomenal. The instructors explain concepts with real interview examples. Cracked 3 product company interviews!',
  },
  {
    name: 'Sneha Gupta',
    role: 'Frontend Developer @ Startup',
    avatar: 'SG',
    stars: 5,
    text: 'Not just coding — the career guidance and LinkedIn optimization helped me land my dream job. The community support is unmatched.',
  },
];

const services = [
  { icon: '🎨', title: 'Design Services', desc: 'Professional Canva designs, banners, and brand assets' },
  { icon: '📄', title: 'Resume Building', desc: 'ATS-optimized resumes that get shortlisted' },
  { icon: '🚀', title: 'Startup Support', desc: 'End-to-end growth consulting for your business' },
  { icon: '💼', title: 'LinkedIn Optimization', desc: 'Profile makeovers that attract recruiters' },
];

export default function HomePage() {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    coursesAPI.getFeatured()
      .then(({ data }) => {
        // Handle paginated or array response
        const courses = Array.isArray(data) ? data : (data.results || []);
        setFeaturedCourses(courses.slice(0, 6));
      })
      .catch(() => setFeaturedCourses([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-bg min-h-screen flex items-center pt-16 pb-20 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-white/80 mb-6">
                <Zap className="w-4 h-4 text-yellow-400" />
                India's #1 Student EdTech Platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Empowering Students with{' '}
                <span className="bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
                  Skills & Career Growth
                </span>
              </h1>

              <p className="text-lg text-white/70 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Learn to code, build real projects, get career guidance, and access professional services — all in one place. Join 12,000+ students already transforming their futures.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/courses" className="btn-primary text-base px-8 py-4">
                  Explore Courses <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/signup" className="btn-outline-white text-base px-8 py-4">
                  Get Started Free
                </Link>
              </div>

              {/* Quick trust signals */}
              <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {['PS', 'AM', 'SG', 'RK'].map(initials => (
                    <div key={initials} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 border-2 border-white/20 flex items-center justify-center text-xs font-bold text-white">
                      {initials}
                    </div>
                  ))}
                </div>
                <div className="text-white/70 text-sm">
                  <span className="text-white font-semibold">12,000+</span> students enrolled
                </div>
                <div className="flex items-center gap-1 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-white/70 ml-1">4.9/5</span>
                </div>
              </div>
            </div>

            {/* Right - floating cards */}
            <div className="hidden lg:block relative">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { emoji: '🐍', title: 'Python', students: '3.5K+' },
                  { emoji: '💻', title: 'Full Stack Dev', students: '4.1K+' },
                  { emoji: '🌐', title: 'DSA', students: '2.3K+' },
                  { emoji: '☕', title: 'Java', students: '1.8K+' },
                ].map((c, i) => (
                  <div key={c.title}
                    className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 ${i % 2 === 1 ? 'mt-6' : ''}`}>
                    <div className="text-3xl mb-2">{c.emoji}</div>
                    <div className="font-semibold text-white">{c.title}</div>
                    <div className="text-xs text-white/60 mt-1">{c.students} enrolled</div>
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-4 -right-4 bg-green-500 text-white rounded-2xl px-4 py-3 text-sm font-semibold shadow-xl">
                ✅ 94% Placement Rate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{value}</div>
                <div className="text-sm text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">
                About Skillexa
              </span>
              <h2 className="section-title mb-5">
                More Than an EdTech Platform
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Skillexa was founded with a singular mission: to bridge the gap between academic education and industry readiness. We combine world-class coding courses with career services and professional tools to give students an unfair advantage in the job market.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                From C Programming to Full Stack Development, LinkedIn optimization to startup growth consulting — we're your complete growth partner from day one.
              </p>
              <Link to="/about" className="btn-primary">
                Learn Our Story <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="card p-5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm">{title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">Our Courses</span>
            <h2 className="section-title">Featured Courses</h2>
            <p className="section-subtitle">
              Hand-picked courses designed to get you job-ready and skill-first.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl mb-4" />
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-3 bg-gray-100 rounded mb-1" />
                  <div className="h-3 bg-gray-100 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : featuredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            /* Static fallback courses when API unavailable */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id:1, title: 'Python', icon:'FaPython', level:'beginner', level_display:'Beginner', duration:'10 Weeks', enrollment_count:3520, short_description:'Learn Python from scratch — scripting, OOP, data handling, automation, and more.' },
                { id:2, title: 'Full Stack Development', icon:'FaCode', level:'intermediate', level_display:'Intermediate', duration:'20 Weeks', enrollment_count:4120, short_description:'Build complete web apps with React, Node.js, and databases. From UI to deployment.' },
                { id:3, title: 'Data Structures & Algorithms', icon:'FaProjectDiagram', level:'intermediate', level_display:'Intermediate', duration:'14 Weeks', enrollment_count:2340, short_description:'Crack coding interviews with strong DSA skills. Arrays, trees, graphs, dynamic programming.' },
                { id:4, title: 'C Programming', icon:'FaC', level:'beginner', level_display:'Beginner', duration:'8 Weeks', enrollment_count:1240, short_description:'Master the foundations of programming with C. Learn memory management, pointers, and more.' },
                { id:5, title: 'Java', icon:'FaJava', level:'intermediate', level_display:'Intermediate', duration:'12 Weeks', enrollment_count:1780, short_description:'Build enterprise-grade applications with Java. Learn OOP, collections, and Spring basics.' },
                { id:6, title: 'Career Guidance', icon:'FaBriefcase', level:'beginner', level_display:'Beginner', duration:'3 Weeks', enrollment_count:2100, short_description:'Navigate your career with clarity. Resume tips, interview strategies, and job search mastery.' },
              ].map(course => <CourseCard key={course.id} course={course} />)}
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/courses" className="btn-primary">
              View All Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services highlight */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-blue-200 font-semibold text-sm uppercase tracking-wider mb-3">Professional Services</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">We Don't Just Teach — We Support</h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              From resume building to startup consulting, we offer end-to-end professional services.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {services.map(s => (
              <div key={s.title} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition-colors cursor-pointer">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h4 className="font-semibold text-white mb-1">{s.title}</h4>
                <p className="text-blue-200 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/services" className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
              Explore All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Student Success */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">Success Stories</span>
            <h2 className="section-title">Students Who Made It</h2>
            <p className="section-subtitle">Real transformations from real students.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { initials: 'PS', name: 'Priya S.', company: 'Infosys', role: 'Software Engineer', salary: '₹8.5 LPA', course: 'Full Stack Dev' },
              { initials: 'AM', name: 'Arjun M.', company: 'TCS', role: 'Data Analyst', salary: '₹7 LPA', course: 'Python + DSA' },
              { initials: 'RK', name: 'Rohan K.', company: 'Wipro', role: 'Backend Developer', salary: '₹9 LPA', course: 'Java' },
            ].map(s => (
              <div key={s.name} className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                    {s.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{s.name}</div>
                    <div className="text-xs text-gray-500">{s.role} @ {s.company}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl mb-4">
                  <span className="text-xs text-gray-500">Package</span>
                  <span className="font-bold text-green-600">{s.salary}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  Completed: {s.course}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">Testimonials</span>
            <h2 className="section-title">What Our Students Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="card p-6">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/30">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of students who've already unlocked their potential with Skillexa. Start your journey today — it's free to begin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn-primary text-base px-8 py-4">
              Start Learning Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/courses" className="btn-outline-white text-base px-8 py-4">
              Browse Courses
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}