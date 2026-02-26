import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Linkedin, Instagram, Twitter, Youtube } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { contactAPI } from '../services/api';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.message.trim()) errs.message = 'Message is required';
    else if (form.message.trim().length < 20) errs.message = 'Message must be at least 20 characters';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    setServerError('');
    try {
      await contactAPI.send(form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setServerError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="hero-bg pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block text-blue-300 font-semibold text-sm uppercase tracking-wider mb-4">Get In Touch</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">We'd Love to Hear From You</h1>
          <p className="text-white/70 text-lg">
            Have a question, want to enroll, or need a service? Our team is ready to help you.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Information</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Reach out through any channel. We typically respond within 2-4 hours during business hours.
                </p>
              </div>

              <div className="card p-6 space-y-4">
                <a href="mailto:hello@skillexa.com" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium">Email</div>
                    <div className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">hello@skillexa.com</div>
                  </div>
                </a>
                <a href="tel:+917000000000" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium">Phone</div>
                    <div className="text-sm font-semibold text-gray-800 group-hover:text-green-600 transition-colors">+91 70000 00000</div>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium">Location</div>
                    <div className="text-sm font-semibold text-gray-800">India (Remote-first)</div>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="card p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  {[
                    { icon: Linkedin, href: 'https://linkedin.com', color: 'bg-blue-600', label: 'LinkedIn' },
                    { icon: Instagram, href: 'https://instagram.com', color: 'bg-pink-600', label: 'Instagram' },
                    { icon: Twitter, href: 'https://twitter.com', color: 'bg-sky-500', label: 'Twitter' },
                    { icon: Youtube, href: 'https://youtube.com', color: 'bg-red-600', label: 'YouTube' },
                  ].map(({ icon: Icon, href, color, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className={`${color} w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-sm`}>
                      <Icon className="w-4 h-4 text-white" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
                <h4 className="font-semibold text-gray-900 mb-2">Business Hours</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between"><span>Mon – Fri</span><span className="font-medium">9:00 AM – 7:00 PM</span></div>
                  <div className="flex justify-between"><span>Saturday</span><span className="font-medium">10:00 AM – 5:00 PM</span></div>
                  <div className="flex justify-between"><span>Sunday</span><span className="text-gray-400">Closed</span></div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="card p-8">
                {success ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent! 🎉</h3>
                    <p className="text-gray-500 mb-6">Thank you for reaching out! We'll get back to you within 2-4 hours.</p>
                    <button onClick={() => setSuccess(false)} className="btn-primary">Send Another Message</button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                    {serverError && (
                      <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-5 text-sm">{serverError}</div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                          <input
                            type="text"
                            className={`input-field ${errors.name ? 'border-red-300 ring-1 ring-red-300' : ''}`}
                            placeholder="Your full name"
                            value={form.name}
                            onChange={handleChange('name')}
                          />
                          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                          <input
                            type="tel"
                            className="input-field"
                            placeholder="+91 xxxxx xxxxx"
                            value={form.phone}
                            onChange={handleChange('phone')}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                        <input
                          type="email"
                          className={`input-field ${errors.email ? 'border-red-300 ring-1 ring-red-300' : ''}`}
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={handleChange('email')}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                        <textarea
                          rows={5}
                          className={`input-field resize-none ${errors.message ? 'border-red-300 ring-1 ring-red-300' : ''}`}
                          placeholder="Tell us about your inquiry, course you're interested in, or service you need..."
                          value={form.message}
                          onChange={handleChange('message')}
                        />
                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                        <p className="text-gray-400 text-xs mt-1">{form.message.length} characters</p>
                      </div>

                      <button type="submit" disabled={submitting} className="btn-primary w-full py-4 text-base">
                        {submitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <Send className="w-5 h-5" /> Send Message
                          </span>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}