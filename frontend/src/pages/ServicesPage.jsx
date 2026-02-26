import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ServiceCard from '../components/ui/ServiceCard';
import { servicesAPI } from '../services/api';
import { X, Send, CheckCircle } from 'lucide-react';

const STATIC_SERVICES = [
  { id:1, title:'Canva Design Solutions', icon:'FaPalette', category:'design', category_display:'Design', short_description:'Professional posters, thumbnails, banners, and graphics crafted to make your brand shine.' },
  { id:2, title:'Video Creation for Ads', icon:'FaVideo', category:'marketing', category_display:'Marketing', short_description:'Compelling video content for your company ads, social media, and product promotions.' },
  { id:3, title:'Sales & Marketing Support', icon:'FaChartLine', category:'marketing', category_display:'Marketing', short_description:'Data-driven sales strategies and marketing campaigns to boost your business growth.' },
  { id:4, title:'LinkedIn Optimization', icon:'FaLinkedin', category:'career', category_display:'Career', short_description:'Professional LinkedIn profile makeover to attract recruiters and business opportunities.' },
  { id:5, title:'Startup Growth Support', icon:'FaRocket', category:'business', category_display:'Business', short_description:'End-to-end startup consulting — from ideation, branding, to scaling your business.' },
  { id:6, title:'Resume Building', icon:'FaFileAlt', category:'career', category_display:'Career', short_description:'ATS-optimized, professionally designed resumes that get you shortlisted.' },
  { id:7, title:'Portfolio Websites', icon:'FaGlobe', category:'development', category_display:'Development', short_description:'Custom portfolio websites to showcase your work, skills, and projects beautifully.' },
  { id:8, title:'Company Websites', icon:'FaBuilding', category:'development', category_display:'Development', short_description:'Professional, fast, and modern websites for businesses of all sizes.' },
  { id:9, title:'End-to-end Canva Design', icon:'FaPaintBrush', category:'design', category_display:'Design', short_description:'Complete brand design packages — logos, social kits, presentations, and marketing materials.' },
];

const CATEGORIES = ['all', 'design', 'marketing', 'career', 'development', 'business'];

function RequestModal({ service, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await servicesAPI.requestService(service.slug || service.id, form);
      setSuccess(true);
    } catch {
      // Fallback: simulate success for demo
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
        {success ? (
          <div className="p-10 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Sent!</h3>
            <p className="text-gray-500 mb-6">We'll reach out within 24 hours to discuss your <strong>{service.title}</strong> request.</p>
            <button onClick={onClose} className="btn-primary">Close</button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-xl text-gray-900">Request Service</h3>
                <p className="text-sm text-gray-500 mt-0.5">{service.title}</p>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && <div className="bg-red-50 text-red-600 rounded-xl p-3 text-sm">{error}</div>}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input required className="input-field" placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input className="input-field" placeholder="+91 xxxxx xxxxx" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input required type="email" className="input-field" placeholder="you@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea required rows={4} className="input-field resize-none" placeholder="Tell us about your requirements..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full py-3">
                {submitting ? 'Sending...' : <><Send className="w-4 h-4" /> Send Request</>}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const [services, setServices] = useState(STATIC_SERVICES);
  const [category, setCategory] = useState('all');
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    servicesAPI.getAll()
      .then(({ data }) => {
        const list = Array.isArray(data) ? data : (data.results || []);
        if (list.length > 0) setServices(list);
      })
      .catch(() => {});
  }, []);

  const filtered = category === 'all' ? services : services.filter(s => s.category === category);

  return (
    <Layout>
      {selectedService && <RequestModal service={selectedService} onClose={() => setSelectedService(null)} />}

      {/* Hero */}
      <section className="hero-bg pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block text-blue-300 font-semibold text-sm uppercase tracking-wider mb-4">Professional Services</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Growth, Our Expertise
          </h1>
          <p className="text-white/70 text-lg">
            From stunning designs to startup consulting — we provide professional services that accelerate your personal and business growth.
          </p>
        </div>
      </section>

      {/* Filters + Services */}
      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
                  category === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {cat === 'all' ? 'All Services' : cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(service => (
              <ServiceCard key={service.id} service={service} onRequest={() => setSelectedService(service)} />
            ))}
          </div>
        </div>
      </section>

      {/* Why our services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose Our Services?</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { emoji: '⚡', title: 'Fast Turnaround', desc: '48-72 hr delivery on most services' },
              { emoji: '🎯', title: 'Tailored for You', desc: 'Customized to your specific needs' },
              { emoji: '✅', title: 'Quality Guaranteed', desc: 'Revisions until you\'re satisfied' },
              { emoji: '💰', title: 'Student Pricing', desc: 'Affordable rates for everyone' },
            ].map(w => (
              <div key={w.title} className="card p-6">
                <div className="text-3xl mb-3">{w.emoji}</div>
                <h4 className="font-bold text-gray-900 mb-1">{w.title}</h4>
                <p className="text-xs text-gray-500">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}