import { CheckCircle, Target, Eye, Heart, Award, Users, BookOpen, Zap } from 'lucide-react';
import Layout from '../components/layout/Layout';

const values = [
  { icon: '🎯', title: 'Student First', desc: 'Every decision we make puts student outcomes at the center. Your success is our north star.' },
  { icon: '🚀', title: 'Innovation', desc: 'We constantly evolve our curriculum and methods to stay ahead of industry trends.' },
  { icon: '🤝', title: 'Community', desc: 'Learning is better together. We foster a supportive ecosystem of peers and mentors.' },
  { icon: '✨', title: 'Excellence', desc: 'We hold ourselves to the highest standards — in content quality, support, and outcomes.' },
  { icon: '🌍', title: 'Accessibility', desc: 'Great education should be accessible. We ensure our programs are affordable and inclusive.' },
  { icon: '💡', title: 'Integrity', desc: 'We are transparent, honest, and accountable in everything we do.' },
];

const whyUs = [
  'Industry-aligned, regularly updated curriculum',
  'Hands-on projects from day one',
  'Lifetime access to course materials',
  'Dedicated career support and placement',
  'Live doubt clearing sessions',
  'Real internship and job referrals',
  'Small batch sizes for personalized attention',
  'Community of 12,000+ active learners',
];

const timeline = [
  { year: '2022', title: 'Founded', desc: 'Skillexa was started with just 3 courses and a passion to make quality tech education accessible.' },
  { year: '2022', title: '1,000 Students', desc: 'Crossed 1,000 enrolled students within 6 months of launch.' },
  { year: '2023', title: 'Services Division', desc: 'Launched professional services including resume building, LinkedIn optimization, and design services.' },
  { year: '2023', title: '5,000+ Students', desc: 'Expanded course catalog to 13+ courses across coding and career development.' },
  { year: '2024', title: 'Startup Support', desc: 'Launched startup growth consulting and business services division.' },
  { year: '2025', title: '12,000+ Students', desc: 'Reached milestone of 12,000+ students with 94% placement rate. Growing every day.' },
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="hero-bg pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block text-blue-300 font-semibold text-sm uppercase tracking-wider mb-4">About Skillexa</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
            We're on a Mission to{' '}
            <span className="bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
              Transform Careers
            </span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Skillexa is more than an EdTech platform — it's a career transformation partner. We combine world-class education with real-world services to help students and professionals achieve their full potential.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">Our Story</span>
              <h2 className="text-3xl font-bold text-gray-900 mb-5">Born from a Student's Frustration</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Skillexa was founded in 2022 when our founders — fresh graduates themselves — realized that most coding courses taught theory but not the skills companies actually wanted. They saw friends struggling despite having degrees, lacking practical skills and career guidance.
                </p>
                <p>
                  We built Skillexa to solve exactly this problem. A platform where students don't just learn to code — they build projects, optimize their professional profiles, get career mentorship, and access professional services all under one roof.
                </p>
                <p>
                  Today, we've helped 12,000+ students land jobs, build businesses, and transform their lives. And we're just getting started.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, label: 'Students', value: '12,000+', color: 'blue' },
                { icon: BookOpen, label: 'Courses', value: '50+', color: 'indigo' },
                { icon: Award, label: 'Placement Rate', value: '94%', color: 'green' },
                { icon: Zap, label: 'Expert Mentors', value: '30+', color: 'purple' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className={`card p-6 text-center border-t-4 border-${color}-500`}>
                  <Icon className={`w-8 h-8 text-${color}-600 mx-auto mb-3`} />
                  <div className="text-3xl font-bold text-gray-900">{value}</div>
                  <div className="text-sm text-gray-500 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-8">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To democratize quality tech education and career support — making it accessible, affordable, and outcome-driven for every student, regardless of their background or location.
              </p>
            </div>
            <div className="card p-8">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                A world where every student has the skills, confidence, and professional tools to build their dream career — and where talent, not privilege, determines success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">Core Values</span>
            <h2 className="section-title">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(v => (
              <div key={v.title} className="card p-6">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">{v.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-200 font-semibold text-sm uppercase tracking-wider block mb-3">Why Skillexa?</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                The Skillexa Difference
              </h2>
              <p className="text-blue-100 mb-8 leading-relaxed">
                Hundreds of platforms teach coding. We're the ones who make sure you actually get hired, launch your startup, or build the career you've dreamed of.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {whyUs.map(item => (
                <div key={item} className="flex items-start gap-3 bg-white/10 rounded-xl p-4">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">Our Journey</span>
            <h2 className="section-title">The Skillexa Timeline</h2>
          </div>
          <div className="space-y-8 relative before:absolute before:left-6 before:top-0 before:bottom-0 before:w-0.5 before:bg-blue-200">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-6 relative">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-lg z-10">
                  {item.year.slice(2)}
                </div>
                <div className="card p-5 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{item.year}</span>
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                  </div>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}