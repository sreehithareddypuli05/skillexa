import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, BookOpen, Briefcase, TrendingUp, Users, Star,
  CheckCircle, Zap, Award, Globe, Code2, Rocket,
  Plus, X, ChevronDown, ChevronUp, Shield, Eye, EyeOff,
  AlertCircle, CheckCircle2, Loader2, Pencil, Trash2, Upload, FileText,
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import CourseCard from '../components/ui/CourseCard';
import { coursesAPI, adminAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

// ─── constants ────────────────────────────────────────────────────────────────
const ADMIN_EMAIL = 'skillexalearnsmart@gmail.com';

const stats = [
  { label: 'students community', value: '10,000+', icon: Users },
  { label: 'Courses Available',  value: '20+',     icon: BookOpen },
  { label: 'Success Rate',       value: '94%',     icon: TrendingUp },
  { icon: Zap, label: 'Expert Mentors', value: '15+', color: 'purple' },
];

const features = [
  { icon: Code2,  title: 'Industry-Ready Curriculum', desc: 'Courses designed with top tech companies to ensure you learn what the industry demands.' },
  { icon: Users,  title: 'Community Learning',         desc: 'Join a thriving community of 12,000+ learners, mentors, and industry professionals.' },
  { icon: Rocket, title: 'Career Acceleration',        desc: 'From resume building to placement support — we guide you every step of the way.' },
  { icon: Globe,  title: 'Live & Self-Paced',          desc: 'Flexible learning formats to fit your schedule — live sessions, recordings, and projects.' },
];

const testimonials = [
  {
    name: 'Lakshmi Srinidhi', role: 'Student @ IIITN', avatar: 'LS', stars: 5,
    text: 'Just after my intermediate, I wanted to learn something real, and that\'s when I found SkillExa. Unlike many edtech platforms that only focus on teaching, the mentors here treated us like family ❤️ Joining SkillExa during my summer holidays was one of the best decisions I made. Even after completing the course a year ago, the mentors still guide and support us whenever we need help ✨'
  },
  {
    name: 'Shirisha', role: 'Student @ Malla Reddy College', avatar: 'SH', stars: 5,
    text: 'Akshitha Sriram is an amazing mentor. The way she teaches, motivates, and interacts with every student is truly inspiring. She creates a comfortable and engaging learning environment where students never hesitate to ask doubts or share ideas. Beyond technical skills, she constantly motivates us to believe in ourselves and improve continuously.'
  },
  {
    name: 'Jyothi', role: 'Student @ IIITN', avatar: 'JY', stars: 5,
    text: 'My experience with SkillExa (Codenexa) has been extremely valuable. The mentors explain concepts like Python and C in a very practical and beginner-friendly way. They also encouraged us to work on real projects, which boosted our confidence and practical knowledge. The career guidance, LinkedIn support, and mentorship helped us improve continuously and prepare for future opportunities.'
  },
  {
    name: 'Poornimaa', role: 'SkillExa Student', avatar: 'PO', stars: 5,
    text: 'Joining SkillExa truly helped me learn beyond academics. Before joining, I had no clear idea about engineering careers or opportunities, but with the guidance of the mentors, I gained clarity and became growth-focused. The mentorship from Akshitha Sriram and Sasi motivated me to continuously develop my skills and confidence.'
  },
  {
    name: 'Nirjara', role: 'Student @ IIITR', avatar: 'NI', stars: 5,
    text: 'SkillExa is a wonderful platform to start a journey in IT. The mentorship here is not only about learning technical skills but also about staying connected and supporting each other like family. The classes are engaging, practical, and filled with valuable content. I would definitely recommend SkillExa to anyone who is passionate about learning and growing in tech.'
  },
];

const homeServices = [
  { icon: '🎨', title: 'Design Services',      desc: 'Professional Canva designs, banners, and brand assets' },
  { icon: '📄', title: 'Resume Building',       desc: 'ATS-optimized resumes that get shortlisted' },
  { icon: '🚀', title: 'Startup Support',       desc: 'End-to-end growth consulting for your business' },
  { icon: '💼', title: 'LinkedIn Optimization', desc: 'Profile makeovers that attract recruiters' },
];

const staticFallback = [
  { id:1, title:'Python',                    icon:'FaPython',        level:'beginner',     level_display:'Beginner',     duration:'10 Weeks', enrollment_count:3520, short_description:'Learn Python from scratch — scripting, OOP, data handling, automation, and more.' },
  { id:2, title:'Full Stack Development',    icon:'FaCode',          level:'intermediate', level_display:'Intermediate', duration:'20 Weeks', enrollment_count:4120, short_description:'Build complete web apps with React, Node.js, and databases. From UI to deployment.' },
  { id:3, title:'Data Structures & Algorithms', icon:'FaProjectDiagram', level:'intermediate', level_display:'Intermediate', duration:'14 Weeks', enrollment_count:2340, short_description:'Crack coding interviews with strong DSA skills. Arrays, trees, graphs, dynamic programming.' },
  { id:4, title:'C Programming',             icon:'FaC',             level:'beginner',     level_display:'Beginner',     duration:'8 Weeks',  enrollment_count:1240, short_description:'Master the foundations of programming with C. Learn memory management, pointers, and more.' },
  { id:5, title:'Java',                      icon:'FaJava',          level:'intermediate', level_display:'Intermediate', duration:'12 Weeks', enrollment_count:1780, short_description:'Build enterprise-grade applications with Java. Learn OOP, collections, and Spring basics.' },
  { id:6, title:'Career Guidance',           icon:'FaBriefcase',     level:'beginner',     level_display:'Beginner',     duration:'3 Weeks',  enrollment_count:2100, short_description:'Navigate your career with clarity. Resume tips, interview strategies, and job search mastery.' },
];

// ─── small helpers ─────────────────────────────────────────────────────────────
function Alert({ type, msg, onClose }) {
  if (!msg) return null;
  const styles = type === 'success'
    ? 'bg-green-50 border-green-300 text-green-800 dark:bg-green-900/30 dark:border-green-600 dark:text-green-300'
    : 'bg-red-50 border-red-300 text-red-800 dark:bg-red-900/30 dark:border-red-600 dark:text-red-300';
  const Icon = type === 'success' ? CheckCircle2 : AlertCircle;
  return (
    <div className={`flex items-start gap-2 border rounded-lg px-4 py-3 text-sm mb-4 ${styles}`}>
      <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
      <span className="flex-1">{msg}</span>
      {onClose && <button onClick={onClose} className="ml-auto opacity-60 hover:opacity-100"><X className="w-4 h-4" /></button>}
    </div>
  );
}

function InputField({ label, required, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {props.as === 'textarea' ? (
        <textarea
          {...props} as={undefined} rows={props.rows || 3}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
        />
      ) : props.as === 'select' ? (
        <select
          {...props} as={undefined}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          {props.children}
        </select>
      ) : (
        <input
          {...props}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      )}
    </div>
  );
}

// ─── PDF Upload Field ──────────────────────────────────────────────────────────
function PdfUploadField({ value, onChange, existingUrl }) {
  const inputRef = useRef();
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    if (file.type !== 'application/pdf') {
      alert('Please select a PDF file only.');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      alert('PDF must be under 20MB.');
      return;
    }
    onChange(file);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Course PDF / Brochure
      </label>

      {/* existing PDF link */}
      {existingUrl && !value && (
        <div className="flex items-center gap-2 mb-2 text-xs text-blue-600 dark:text-blue-400">
          <FileText className="w-3.5 h-3.5" />
          <a href={existingUrl} target="_blank" rel="noreferrer" className="underline truncate max-w-xs">
            Current PDF
          </a>
          <span className="text-gray-400">(upload new to replace)</span>
        </div>
      )}

      {/* selected file preview */}
      {value && (
        <div className="flex items-center gap-2 mb-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg text-xs text-blue-700 dark:text-blue-300">
          <FileText className="w-4 h-4 flex-shrink-0" />
          <span className="truncate flex-1">{value.name}</span>
          <span className="text-gray-400 flex-shrink-0">({(value.size / 1024).toFixed(0)} KB)</span>
          <button type="button" onClick={() => onChange(null)} className="ml-1 opacity-60 hover:opacity-100">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
        className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg py-5 px-4 cursor-pointer transition-colors text-center
          ${dragOver
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
          }`}
      >
        <Upload className="w-6 h-6 text-gray-400" />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <span className="text-blue-600 dark:text-blue-400 font-medium">Click to upload</span> or drag & drop
        </p>
        <p className="text-xs text-gray-400">PDF only · Max 20 MB</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={e => handleFile(e.target.files[0])}
      />
    </div>
  );
}

// ─── Confirm Delete Dialog ─────────────────────────────────────────────────────
function ConfirmDialog({ title, msg, onConfirm, onCancel, busy }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{msg}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} disabled={busy}
            className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={busy}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-60 rounded-xl text-sm font-semibold text-white transition-colors">
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />} Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Admin: Add / Edit Course Modal ───────────────────────────────────────────
const EMPTY_COURSE = {
  title:'', slug:'', short_description:'', description:'',
  icon:'FaCode', level:'beginner',
  price:'0.00', is_free:true, is_featured:false, is_active:true, order:0,
};

function CourseModal({ onClose, onSuccess, initial }) {
  const isEdit = !!initial;
  const [form, setForm]     = useState(isEdit ? { ...initial } : EMPTY_COURSE);
  const [pdfFile, setPdf]   = useState(null);
  const [busy, setBusy]     = useState(false);
  const [alert, setAlert]   = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleTitle = (v) => {
    set('title', v);
    if (!isEdit) set('slug', v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.slug || !form.short_description) {
      setAlert({ type:'error', msg:'Please fill all required fields.' });
      return;
    }
    setBusy(true); setAlert(null);
    try {
      // Build FormData so PDF uploads correctly
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (v !== null && v !== undefined) fd.append(k, v);
      });
      fd.set('price', parseFloat(form.price) || 0);
      fd.set('order', parseInt(form.order) || 0);
      if (pdfFile) fd.append('pdf_file', pdfFile);

      if (isEdit) {
        await adminAPI.updateCourse(form.slug, fd);
        setAlert({ type:'success', msg:`Course "${form.title}" updated!` });
      } else {
        await adminAPI.createCourse(fd);
        setAlert({ type:'success', msg:`Course "${form.title}" created!` });
      }
      setTimeout(() => { onSuccess(); onClose(); }, 1200);
    } catch (err) {
      const detail = err.response?.data;
      const msg = typeof detail === 'object'
        ? Object.entries(detail).map(([k,v]) => `${k}: ${Array.isArray(v)?v.join(', '):v}`).join(' | ')
        : `Failed to ${isEdit ? 'update' : 'create'} course.`;
      setAlert({ type:'error', msg });
    } finally { setBusy(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {isEdit ? 'Edit Course' : 'Add New Course'}
            </h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Alert type={alert?.type} msg={alert?.msg} onClose={() => setAlert(null)} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Course Title" required value={form.title} onChange={e => handleTitle(e.target.value)} placeholder="e.g. Python Bootcamp" />
            <InputField label="Slug" required value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="python-bootcamp" />
          </div>

          <InputField label="Short Description" required value={form.short_description} onChange={e => set('short_description', e.target.value)} placeholder="One-line summary (max 300 chars)" maxLength={300} />
          <InputField label="Full Description" as="textarea" rows={3} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Detailed course description..." />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Level" as="select" value={form.level} onChange={e => set('level', e.target.value)}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </InputField>
            <InputField label="Icon Name" value={form.icon} onChange={e => set('icon', e.target.value)} placeholder="FaCode" />
          </div>

          {/* PDF Upload — replaces duration */}
          <PdfUploadField
            value={pdfFile}
            onChange={setPdf}
            existingUrl={isEdit ? form.pdf_file : null}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InputField label="Price (₹)" type="number" min="0" step="0.01" value={form.price} onChange={e => set('price', e.target.value)} />
            <InputField label="Display Order" type="number" min="0" value={form.order} onChange={e => set('order', e.target.value)} />
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Options</label>
              {[['is_free','Free Course'],['is_featured','Featured'],['is_active','Active']].map(([key, lbl]) => (
                <label key={key} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                  <input type="checkbox" checked={!!form[key]} onChange={e => set(key, e.target.checked)} className="rounded border-gray-300 text-blue-600" />
                  {lbl}
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={busy} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 rounded-xl text-sm font-semibold text-white transition-colors">
              {busy ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Plus className="w-4 h-4" /> {isEdit ? 'Save Changes' : 'Create Course'}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Admin: Add / Edit Service Modal ──────────────────────────────────────────
const EMPTY_SERVICE = {
  title:'', slug:'', short_description:'', description:'',
  icon:'🚀', category:'design', is_featured:false, is_active:true, order:0,
};

function ServiceModal({ onClose, onSuccess, initial }) {
  const isEdit = !!initial;
  const [form, setForm]   = useState(isEdit ? { ...initial } : EMPTY_SERVICE);
  const [busy, setBusy]   = useState(false);
  const [alert, setAlert] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleTitle = (v) => {
    set('title', v);
    if (!isEdit) set('slug', v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.slug || !form.short_description) {
      setAlert({ type:'error', msg:'Please fill all required fields.' }); return;
    }
    setBusy(true); setAlert(null);
    try {
      const payload = { ...form, order: parseInt(form.order) || 0 };
      if (isEdit) {
        await adminAPI.updateService(form.slug, payload);
        setAlert({ type:'success', msg:`Service "${form.title}" updated!` });
      } else {
        await adminAPI.createService(payload);
        setAlert({ type:'success', msg:`Service "${form.title}" created!` });
      }
      setTimeout(() => { onSuccess(); onClose(); }, 1200);
    } catch (err) {
      const detail = err.response?.data;
      const msg = typeof detail === 'object'
        ? Object.entries(detail).map(([k,v]) => `${k}: ${Array.isArray(v)?v.join(', '):v}`).join(' | ')
        : `Failed to ${isEdit ? 'update' : 'create'} service.`;
      setAlert({ type:'error', msg });
    } finally { setBusy(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {isEdit ? 'Edit Service' : 'Add New Service'}
            </h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Alert type={alert?.type} msg={alert?.msg} onClose={() => setAlert(null)} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Service Title" required value={form.title} onChange={e => handleTitle(e.target.value)} placeholder="e.g. Resume Building" />
            <InputField label="Slug" required value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="resume-building" />
          </div>

          <InputField label="Short Description" required value={form.short_description} onChange={e => set('short_description', e.target.value)} placeholder="One-line summary (max 300 chars)" maxLength={300} />
          <InputField label="Full Description" as="textarea" rows={3} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Detailed service description..." />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InputField label="Category" as="select" value={form.category} onChange={e => set('category', e.target.value)}>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
              <option value="development">Development</option>
              <option value="career">Career</option>
              <option value="business">Business</option>
            </InputField>
            <InputField label="Icon (emoji or name)" value={form.icon} onChange={e => set('icon', e.target.value)} placeholder="🚀 or FaRocket" />
            <InputField label="Display Order" type="number" min="0" value={form.order} onChange={e => set('order', e.target.value)} />
          </div>

          <div className="flex gap-6">
            {[['is_featured','Featured'],['is_active','Active']].map(([key, lbl]) => (
              <label key={key} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                <input type="checkbox" checked={!!form[key]} onChange={e => set(key, e.target.checked)} className="rounded border-gray-300 text-indigo-600" />
                {lbl}
              </label>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={busy} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 rounded-xl text-sm font-semibold text-white transition-colors">
              {busy ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Plus className="w-4 h-4" /> {isEdit ? 'Save Changes' : 'Create Service'}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Admin: Users Table ────────────────────────────────────────────────────────
function UsersTable({ users, loading, error }) {
  const [search, setSearch]       = useState('');
  const [showEmails, setShowEmails] = useState(false);

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    return (
      u.first_name?.toLowerCase().includes(q) || u.last_name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) || u.role?.toLowerCase().includes(q)
    );
  });

  if (loading) return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="w-6 h-6 animate-spin text-blue-500 mr-2" />
      <span className="text-gray-500 dark:text-gray-400 text-sm">Loading users...</span>
    </div>
  );

  if (error) return (
    <div className="flex items-center gap-2 text-red-500 py-6 text-sm">
      <AlertCircle className="w-4 h-4" /> {error}
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <input
          type="text" placeholder="Search by name, email or role..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="w-full sm:w-72 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">{filtered.length} of {users.length} users</span>
          <button
            onClick={() => setShowEmails(v => !v)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
          >
            {showEmails ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showEmails ? 'Hide Emails' : 'Show Emails'}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800 text-left">
              <th className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider">#</th>
              <th className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider">Name</th>
              {showEmails && <th className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider">Email</th>}
              <th className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider">Role</th>
              <th className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider">Phone</th>
              <th className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filtered.length === 0 ? (
              <tr><td colSpan={showEmails ? 6 : 5} className="text-center py-8 text-gray-400 dark:text-gray-500">No users found.</td></tr>
            ) : filtered.map((u, i) => (
              <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-4 py-3 text-gray-400 dark:text-gray-500">{i + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {(u.first_name?.[0] || u.email?.[0] || '?').toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {u.first_name || u.last_name ? `${u.first_name || ''} ${u.last_name || ''}`.trim() : u.username || '—'}
                    </span>
                  </div>
                </td>
                {showEmails && <td className="px-4 py-3 text-gray-600 dark:text-gray-400 font-mono text-xs">{u.email}</td>}
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    u.role === 'admin'
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                  }`}>{u.role || 'student'}</span>
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{u.phone || '—'}</td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">
                  {u.created_at ? new Date(u.created_at).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Admin: Courses List ───────────────────────────────────────────────────────
function CoursesManager({ onRefreshHome }) {
  const [courses, setCourses]   = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [showModal, setModal]   = useState(false);
  const [editing, setEditing]   = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [delBusy, setDelBusy]   = useState(false);
  const [alert, setAlert]       = useState(null);

  const fetch = async () => {
    setLoading(true); setError(null);
    try {
      const { data } = await adminAPI.getAllCourses();
      setCourses(Array.isArray(data) ? data : (data.results || []));
    } catch { setError('Failed to load courses.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const handleDelete = async () => {
    setDelBusy(true);
    try {
      await adminAPI.deleteCourse(deleting.slug);
      setAlert({ type:'success', msg:`"${deleting.title}" deleted.` });
      setDeleting(null);
      fetch();
      if (onRefreshHome) onRefreshHome();
    } catch { setAlert({ type:'error', msg:'Delete failed.' }); }
    finally { setDelBusy(false); }
  };

  return (
    <div className="space-y-4">
      {deleting && (
        <ConfirmDialog
          title="Delete Course"
          msg={`Are you sure you want to delete "${deleting.title}"? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
          busy={delBusy}
        />
      )}
      {(showModal || editing) && (
        <CourseModal
          initial={editing}
          onClose={() => { setModal(false); setEditing(null); }}
          onSuccess={() => { fetch(); if (onRefreshHome) onRefreshHome(); }}
        />
      )}

      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">All Courses ({courses.length})</h3>
        <button
          onClick={() => { setEditing(null); setModal(true); }}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Course
        </button>
      </div>

      <Alert type={alert?.type} msg={alert?.msg} onClose={() => setAlert(null)} />

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 animate-spin text-blue-400 mr-2" />
          <span className="text-gray-400 text-sm">Loading courses...</span>
        </div>
      )}
      {error && <div className="text-red-400 text-sm py-4 flex items-center gap-2"><AlertCircle className="w-4 h-4" />{error}</div>}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-xl border border-gray-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-800 text-left">
                <th className="px-4 py-3 text-gray-400 text-xs uppercase tracking-wider font-semibold">#</th>
                <th className="px-4 py-3 text-gray-400 text-xs uppercase tracking-wider font-semibold">Title</th>
                <th className="px-4 py-3 text-gray-400 text-xs uppercase tracking-wider font-semibold">Level</th>
                <th className="px-4 py-3 text-gray-400 text-xs uppercase tracking-wider font-semibold">PDF</th>
                <th className="px-4 py-3 text-gray-400 text-xs uppercase tracking-wider font-semibold">Status</th>
                <th className="px-4 py-3 text-gray-400 text-xs uppercase tracking-wider font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {courses.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-500">No courses yet. Add one!</td></tr>
              ) : courses.map((c, i) => (
                <tr key={c.id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-white">{c.title}</p>
                      <p className="text-xs text-gray-500 truncate max-w-xs">{c.short_description}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      c.level === 'beginner' ? 'bg-green-900/40 text-green-300' :
                      c.level === 'intermediate' ? 'bg-yellow-900/40 text-yellow-300' :
                      'bg-red-900/40 text-red-300'
                    }`}>{c.level_display || c.level}</span>
                  </td>
                  <td className="px-4 py-3">
                    {c.pdf_file
                      ? <a href={c.pdf_file} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs">
                          <FileText className="w-3.5 h-3.5" /> View PDF
                        </a>
                      : <span className="text-gray-600 text-xs">—</span>
                    }
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      {c.is_active
                        ? <span className="text-xs text-green-400">● Active</span>
                        : <span className="text-xs text-gray-500">○ Inactive</span>
                      }
                      {c.is_featured && <span className="text-xs text-yellow-400">★ Featured</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditing(c)}
                        className="p-1.5 rounded-lg bg-blue-900/30 hover:bg-blue-900/60 text-blue-400 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleting(c)}
                        className="p-1.5 rounded-lg bg-red-900/30 hover:bg-red-900/60 text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Admin: Services List ──────────────────────────────────────────────────────
function ServicesManager({ }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [showModal, setModal]   = useState(false);
  const [editing, setEditing]   = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [delBusy, setDelBusy]   = useState(false);
  const [alert, setAlert]       = useState(null);

  const fetch = async () => {
    setLoading(true); setError(null);
    try {
      const { data } = await adminAPI.getAllServices();
      setServices(Array.isArray(data) ? data : (data.results || []));
    } catch { setError('Failed to load services.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const handleDelete = async () => {
    setDelBusy(true);
    try {
      await adminAPI.deleteService(deleting.slug);
      setAlert({ type:'success', msg:`"${deleting.title}" deleted.` });
      setDeleting(null);
      fetch();
    } catch { setAlert({ type:'error', msg:'Delete failed.' }); }
    finally { setDelBusy(false); }
  };

  return (
    <div className="space-y-4">
      {deleting && (
        <ConfirmDialog
          title="Delete Service"
          msg={`Are you sure you want to delete "${deleting.title}"? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
          busy={delBusy}
        />
      )}
      {(showModal || editing) && (
        <ServiceModal
          initial={editing}
          onClose={() => { setModal(false); setEditing(null); }}
          onSuccess={fetch}
        />
      )}

      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">All Services ({services.length})</h3>
        <button
          onClick={() => { setEditing(null); setModal(true); }}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Service
        </button>
      </div>

      <Alert type={alert?.type} msg={alert?.msg} onClose={() => setAlert(null)} />

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 animate-spin text-indigo-400 mr-2" />
          <span className="text-gray-400 text-sm">Loading services...</span>
        </div>
      )}
      {error && <div className="text-red-400 text-sm py-4 flex items-center gap-2"><AlertCircle className="w-4 h-4" />{error}</div>}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-xl border border-gray-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-800 text-left">
                <th className="px-4 py-3 text-gray-400 text-xs uppercase tracking-wider font-semibold">#</th>
                <th className="px-4 py-3 text-gray-400 text-xs uppercase tracking-wider font-semibold">Title</th>
                <th className="px-4 py-3 text-gray-400 text-xs uppercase tracking-wider font-semibold">Category</th>
                <th className="px-4 py-3 text-gray-400 text-xs uppercase tracking-wider font-semibold">Status</th>
                <th className="px-4 py-3 text-gray-400 text-xs uppercase tracking-wider font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {services.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8 text-gray-500">No services yet. Add one!</td></tr>
              ) : services.map((s, i) => (
                <tr key={s.id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{s.icon?.length <= 2 ? s.icon : '📦'}</span>
                      <div>
                        <p className="font-medium text-white">{s.title}</p>
                        <p className="text-xs text-gray-500 truncate max-w-xs">{s.short_description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-900/40 text-indigo-300 capitalize">
                      {s.category_display || s.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      {s.is_active ? <span className="text-xs text-green-400">● Active</span> : <span className="text-xs text-gray-500">○ Inactive</span>}
                      {s.is_featured && <span className="text-xs text-yellow-400">★ Featured</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditing(s)}
                        className="p-1.5 rounded-lg bg-indigo-900/30 hover:bg-indigo-900/60 text-indigo-400 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleting(s)}
                        className="p-1.5 rounded-lg bg-red-900/30 hover:bg-red-900/60 text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Admin Panel Section ───────────────────────────────────────────────────────
function AdminPanel({ onRefreshCourses }) {
  const [activeTab, setActiveTab] = useState('users');
  const [collapsed, setCollapsed] = useState(false);

  // users state
  const [users, setUsers]           = useState([]);
  const [usersLoading, setUL]       = useState(false);
  const [usersError, setUE]         = useState(null);
  const [usersFetched, setUF]       = useState(false);

  const fetchUsers = async () => {
    setUL(true); setUE(null);
    try {
      const { data } = await adminAPI.listUsers();
      setUsers(Array.isArray(data) ? data : (data.results || []));
      setUF(true);
    } catch (err) {
      setUE(err.response?.data?.detail || 'Failed to load users.');
    } finally { setUL(false); }
  };

  useEffect(() => {
    if (activeTab === 'users' && !usersFetched) fetchUsers();
  }, [activeTab]);

  const tabs = [
    { id:'users',    label:'All Users',    icon: Users,     count: users.length || null },
    { id:'courses',  label:'Courses',      icon: BookOpen,  count: null },
    { id:'services', label:'Services',     icon: Briefcase, count: null },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Admin Panel
                <span className="text-xs bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 px-2 py-0.5 rounded-full font-normal">Admin Only</span>
              </h2>
              <p className="text-gray-400 text-sm">Manage courses, services and users</p>
            </div>
          </div>
          <button
            onClick={() => setCollapsed(v => !v)}
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 border border-gray-700 hover:border-gray-500 rounded-lg text-gray-400 hover:text-gray-200 transition-colors"
          >
            {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            {collapsed ? 'Expand' : 'Collapse'}
          </button>
        </div>

        {!collapsed && (
          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden">
            {/* tab bar */}
            <div className="flex border-b border-gray-800 bg-gray-950/40 overflow-x-auto">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      active
                        ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                        : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    {tab.count != null && tab.count > 0 && (
                      <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full leading-none">{tab.count}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* tab content */}
            <div className="p-6">
              {activeTab === 'users' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-white">Registered Users</h3>
                    <button
                      onClick={fetchUsers} disabled={usersLoading}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-blue-600 hover:bg--700 disabled:opacity-60 text-white rounded-lg transition-colors"
                    >
                      {usersLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : '↻'} Refresh
                    </button>
                  </div>
                  <UsersTable users={users} loading={usersLoading} error={usersError} />
                </div>
              )}

              {activeTab === 'courses' && (
                <CoursesManager onRefreshHome={onRefreshCourses} />
              )}

              {activeTab === 'services' && (
                <ServicesManager />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { user } = useAuth();
  const isAdmin = user?.email === ADMIN_EMAIL;

  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCourses = () => {
    setLoading(true);
    coursesAPI.getFeatured()
      .then(({ data }) => {
        const courses = Array.isArray(data) ? data : (data.results || []);
        setFeaturedCourses(courses.slice(0, 6));
      })
      .catch(() => setFeaturedCourses([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadCourses(); }, []);

  return (
    <Layout>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="hero-bg min-h-screen flex items-center pt-16 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-white/80 mb-6">
                <Zap className="w-4 h-4 text-yellow-400" /> EdTech Platform
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
                  Free demo session
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {['PS', 'AM', 'SG', 'RK'].map(initials => (
                    <div key={initials} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 border-2 border-white/20 flex items-center justify-center text-xs font-bold text-white">
                      {initials}
                    </div>
                  ))}
                </div>
                <div className="text-white/70 text-sm">
                  <span className="text-white font-semibold">10,000+</span> students community
                </div>
              </div>
            </div>

            {/* Orbiting Tech Logos */}
            <div className="flex items-center justify-center relative" style={{ minHeight: '400px' }}>
              <style>{`
                @keyframes orbitInner { from { transform: rotate(0deg) translateX(90px) rotate(0deg); } to { transform: rotate(360deg) translateX(90px) rotate(-360deg); } }
                @keyframes orbitOuter { from { transform: rotate(0deg) translateX(160px) rotate(0deg); } to { transform: rotate(360deg) translateX(160px) rotate(-360deg); } }
                @keyframes centerPulse { 0%,100% { box-shadow: 0 0 25px rgba(99,102,241,0.5), 0 0 60px rgba(99,102,241,0.2); } 50% { box-shadow: 0 0 45px rgba(99,102,241,0.9), 0 0 100px rgba(99,102,241,0.4); } }
                @keyframes ringPulse1 { 0%,100% { opacity: 0.15; } 50% { opacity: 0.35; } }
                @keyframes ringPulse2 { 0%,100% { opacity: 0.08; } 50% { opacity: 0.2; } }
                .orbit-icon { position: absolute; top: 50%; left: 50%; width: 38px; height: 38px; margin: -19px 0 0 -19px; display: flex; align-items: center; justify-content: center; }
                .orbit-icon svg { width: 34px; height: 34px; filter: drop-shadow(0 2px 8px rgba(0,0,0,0.6)); }
              `}</style>
              <div style={{ position: 'relative', width: '380px', height: '380px' }}>
                <div style={{ position:'absolute',top:'50%',left:'50%',width:'180px',height:'180px',marginTop:'-90px',marginLeft:'-90px',borderRadius:'50%',border:'1px solid rgba(255,255,255,0.12)',animation:'ringPulse1 3s ease-in-out infinite' }} />
                <div style={{ position:'absolute',top:'50%',left:'50%',width:'320px',height:'320px',marginTop:'-160px',marginLeft:'-160px',borderRadius:'50%',border:'1px dashed rgba(99,102,241,0.2)',animation:'ringPulse2 4s ease-in-out infinite' }} />
                <div style={{ position:'absolute',top:'50%',left:'50%',width:'72px',height:'72px',marginTop:'-36px',marginLeft:'-36px',borderRadius:'50%',background:'linear-gradient(135deg, #4338ca, #6366f1)',display:'flex',alignItems:'center',justifyContent:'center',animation:'centerPulse 3s ease-in-out infinite',border:'2px solid rgba(255,255,255,0.2)',zIndex:10 }}>
                  <span style={{ fontSize:'28px',fontWeight:'900',color:'white' }}>S</span>
                </div>
                <div className="orbit-icon" style={{ animation:'orbitInner 8s linear infinite 0s' }}><svg viewBox="0 0 128 128"><path fill="#659BD3" d="M115 33.4L67.1 6.1c-1.9-1.1-4.2-1.1-6.2 0L13 33.4c-1.9 1.1-3.1 3.1-3.1 5.3v54.7c0 2.2 1.2 4.2 3.1 5.3l47.9 27.3c1.9 1.1 4.2 1.1 6.2 0L115 98.7c1.9-1.1 3.1-3.1 3.1-5.3V38.7c0-2.2-1.2-4.2-3.1-5.3z"/><path fill="#fff" d="M85.6 76.2c-3.3 5.5-9.4 9.2-16.4 9.2-10.4 0-18.9-8.5-18.9-18.9s8.5-18.9 18.9-18.9c7 0 13.1 3.7 16.4 9.2l13-7.5C92.8 38.7 82.1 32.5 70 32.5c-17.4 0-31.5 14.1-31.5 31.5S52.6 95.5 70 95.5c12.1 0 22.8-6.2 28.6-15.7l-13-3.6z"/></svg></div>
                <div className="orbit-icon" style={{ animation:'orbitInner 8s linear infinite -2s' }}><svg viewBox="0 0 128 128"><path fill="#3776AB" d="M63.9 2C45.3 2 46.4 10 46.4 10l.02 8.3H64.2v2.5H28.8S18 19.4 18 38.2c0 18.8 10.4 18.1 10.4 18.1h6.2v-8.7s-.3-10.4 10.2-10.4h17.6s9.8.2 9.8-9.5V11.6S73.9 2 63.9 2zm-9.8 5.6c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2-3.2-1.4-3.2-3.2 1.4-3.2 3.2-3.2z"/><path fill="#FFD43B" d="M64.1 126c18.6 0 17.5-8 17.5-8l-.02-8.3H63.8v-2.5h35.4s10.8 1.4 10.8-17.4c0-18.8-10.4-18.1-10.4-18.1h-6.2v8.7s.3 10.4-10.2 10.4H65.6s-9.8-.2-9.8 9.5v15.7S54.1 126 64.1 126zm9.8-5.6c-1.8 0-3.2-1.4-3.2-3.2s1.4-3.2 3.2-3.2 3.2 1.4 3.2 3.2-1.4 3.2-3.2 3.2z"/></svg></div>
                <div className="orbit-icon" style={{ animation:'orbitInner 8s linear infinite -4s' }}><svg viewBox="0 0 128 128"><path fill="#EA2D2E" d="M47.6 67.9s-4.1 2.4 2.9 3.2c8.5 1 12.9.8 22.3-.9 0 0 2.5 1.5 5.9 2.9-20.9 9-47.3-.5-31.1-5.2zm-2.7-12.5s-4.6 3.4 2.4 4.1c9.1.9 16.3 1 28.7-1.3 0 0 1.7 1.8 4.4 2.7-25.4 7.4-53.7.6-35.5-5.5z"/><path fill="#EA2D2E" d="M69.3 36.3c5.2 6-1.4 11.4-1.4 11.4s13.2-6.8 7.1-15.3c-5.6-8-10-12 13.5-25.7 0 0-36.9 9.2-19.2 29.6z"/><path fill="#0074BD" d="M99.2 82.1s3 2.5-3.3 4.4c-12 3.6-50.1 4.7-60.7.1-3.8-1.6 3.3-3.9 5.5-4.4 2.3-.5 3.6-.4 3.6-.4-4.2-2.9-27 5.8-11.6 8.3 42 6.8 76.6-3.1 66.5-8z"/><path fill="#EA2D2E" d="M88.9 72.5c19.7-10.2 10.6-20 4.2-18.7-1.6.3-2.2.6-2.2.6s.6-1 1.6-1.4c12.2-4.3 21.6 12.7-4 19.4 0-.1.3-.3.4-.9z"/><path fill="#EA2D2E" d="M74.4 2s10.9 10.9-10.4 27.7c-17.1 13.5-3.9 21.2 0 30-9.9-9-17.2-16.9-12.3-24.3C58.9 24.4 80.1 18.7 74.4 2z"/></svg></div>
                <div className="orbit-icon" style={{ animation:'orbitInner 8s linear infinite -6s' }}><svg viewBox="0 0 128 128"><rect x="54" y="8" width="20" height="20" rx="10" fill="#a78bfa"/><rect x="14" y="52" width="20" height="20" rx="10" fill="#7c3aed"/><rect x="94" y="52" width="20" height="20" rx="10" fill="#7c3aed"/><rect x="4" y="96" width="20" height="20" rx="10" fill="#6d28d9"/><rect x="34" y="96" width="20" height="20" rx="10" fill="#6d28d9"/><rect x="74" y="96" width="20" height="20" rx="10" fill="#6d28d9"/><rect x="104" y="96" width="20" height="20" rx="10" fill="#6d28d9"/><line x1="64" y1="28" x2="24" y2="52" stroke="#a78bfa" strokeWidth="3"/><line x1="64" y1="28" x2="104" y2="52" stroke="#a78bfa" strokeWidth="3"/><line x1="24" y1="72" x2="14" y2="96" stroke="#7c3aed" strokeWidth="3"/><line x1="24" y1="72" x2="44" y2="96" stroke="#7c3aed" strokeWidth="3"/><line x1="104" y1="72" x2="84" y2="96" stroke="#7c3aed" strokeWidth="3"/><line x1="104" y1="72" x2="114" y2="96" stroke="#7c3aed" strokeWidth="3"/></svg></div>
                <div className="orbit-icon" style={{ animation:'orbitOuter 14s linear infinite 0s' }}><svg viewBox="0 0 128 128"><path fill="#F7DF1E" d="M1.4 1.4h125.2v125.2H1.4z"/><path d="M116.3 99.3c-.9-5.7-4.5-10.5-15.2-14.9-3.7-1.7-7.8-2.9-9-5.8-.4-1.6-.5-2.5.3-3.5.7-1 2-1.3 3.3-1.4 2.8-.2 5.5 1.1 7.1 3.3 1.9-1.2 1.9-1.2 3.2-2.1-1.1-1.6-1.6-2.3-2.3-2.9-2.5-2.8-5.9-4.2-11.6-4-1.1.1-2.2.3-3.3.6-3.1.9-5.5 2.9-6.6 5.5-1.6 3.8-.7 8.2 2.2 10.9 3.2 3 7.7 4 11.4 5.9 4.3 2.4 5.8 5 5.6 8.5-.2 3.3-2.5 6-6.2 6.8-4.7 1-8.9-.4-11.4-3.6-1.4-2-2.2-4.4-2.4-6.8l-4.1.7c.3 2.8 1.1 5.4 2.5 7.8 2.8 5.1 8.1 7.5 14.1 7.5 1.7 0 3.3-.2 4.9-.7 6.1-1.9 9.7-7.1 9.8-13.3zm-41.2-.6c-.7-4.6-3.5-8.4-16.7-13.5-1.8-.7-3.6-1.5-4-2.3-.6-.9-.6-2.1.1-3 1.1-1.5 3.2-1.8 5.2-1.4 1.6.4 3.1 1.3 4 2.7 1.7-1.1 1.7-1.1 3.1-2-1-1.4-1.4-2-2.1-2.7-2.4-2.7-5.8-4-11.3-3.8-6 .3-9.8 3.5-10.4 8.7-.4 3.4.5 5.8 2.8 7.9 1.8 1.7 4.2 2.7 6.7 3.5 5.1 1.8 8 3.5 8.9 6.3.5 2.7-.6 5.6-3.5 6.5-4.6 1.3-8.9-.4-11.1-3.4-1.4-2-2.3-4.3-2.6-6.8l-4.1.5c.3 2.8 1 5.4 2.3 7.8 2.6 5.1 7.7 7.8 13.6 7.9 1.9 0 3.8-.2 5.6-.8 6.3-2.1 9.4-7.6 8.5-13.1z"/></svg></div>
                <div className="orbit-icon" style={{ animation:'orbitOuter 14s linear infinite -2.33s' }}><svg viewBox="0 0 128 128"><g fill="#61DAFB"><circle cx="64" cy="64" r="11.4"/><path d="M64 35.4c14.8 0 28.5 2 38.6 5.2 12.2 3.9 19.4 9.8 19.4 16.4s-7.2 12.6-19.4 16.4c-10.1 3.2-23.8 5.2-38.6 5.2s-28.5-2-38.6-5.2C13.2 69.6 6 63.6 6 57s7.2-12.6 19.4-16.4C35.5 37.4 49.2 35.4 64 35.4z" fill="none" stroke="#61DAFB" strokeWidth="6"/><path d="M46.9 49.7C54.3 36.8 63 26.4 71 19.8c9.4-7.8 18.2-10.6 23.7-7.3s7.4 12.4 5.2 25c-1.8 10.3-6.9 23-13.9 35.1C78.6 84.5 70 94.8 62 101.5c-9.4 7.8-18.2 10.6-23.7 7.3-5.5-3.2-7.4-12.4-5.2-25 1.8-10.4 6.9-23.1 13.8-34.1z" fill="none" stroke="#61DAFB" strokeWidth="6"/><path d="M46.9 64.3c-7.4-12.9-11.7-25.9-12.3-36.5-.7-12.2 3.2-20.6 8.7-23.9 5.5-3.2 14.3-.4 23.7 7.4 7.9 6.6 16.4 17 23.4 29.1 7.4 12.9 11.7 25.9 12.3 36.5.7 12.2-3.2 20.6-8.7 23.9-5.5 3.2-14.3.4-23.7-7.4-8-6.6-16.5-17-23.4-29.1z" fill="none" stroke="#61DAFB" strokeWidth="6"/></g></svg></div>
                <div className="orbit-icon" style={{ animation:'orbitOuter 14s linear infinite -4.66s' }}><svg viewBox="0 0 128 128"><path fill="#83CD29" d="M112.8 85.5L69.2 110c-1.6.9-3.5 1.4-5.2 1.4s-3.6-.5-5.2-1.4L15.2 85.5c-3.2-1.9-5.2-5.3-5.2-8.9V36.3c0-3.7 2-7.1 5.2-8.9L58.8 3c1.6-.9 3.5-1.4 5.2-1.4s3.6.5 5.2 1.4l43.6 24.5c3.2 1.9 5.2 5.3 5.2 8.9v40.3c0 3.6-2 7-5.2 8.8z"/><path fill="#fff" d="M64 12.4L24.4 35v44.9L64 102.3l39.6-22.4V35L64 12.4zm0 10.5l29.4 16.6v33.1L64 89.2 34.6 72.6V39.5L64 22.9z"/></svg></div>
                <div className="orbit-icon" style={{ animation:'orbitOuter 14s linear infinite -7s' }}><svg viewBox="0 0 128 128"><path fill="#E44D26" d="M19.4 116.7L8.3 0h111.4l-11.1 116.6L64 128z"/><path fill="#F16529" d="M64 119.7l37.9-10.5 9.5-106.2H64z"/><path fill="#EBEBEB" d="M64 52.7H44.9l-1.4-15.5H64V22.1H28.6l.4 4.3 3.8 42.4H64zm0 41.5l-.1.1-16-4.3-.9-10.7H32.4l1.8 20.5 29.7 8.2.1-.1z"/><path fill="#fff" d="M63.9 52.7v15.1h17.7l-1.7 18.6-16 4.3v15.7l29.8-8.2.2-2.5 3.4-38.2.4-4.8zm0-30.6v15.1h34.8l.3-3.4.7-7.4.4-4.3z"/></svg></div>
                <div className="orbit-icon" style={{ animation:'orbitOuter 14s linear infinite -9.33s' }}><svg viewBox="0 0 128 128"><path fill="#1572B6" d="M19.4 116.7L8.3 0h111.4l-11.1 116.6L64 128z"/><path fill="#33A9DC" d="M64 119.7l37.9-10.5 9.5-106.2H64z"/><path fill="#fff" d="M64 52.7H34.3l.9 10.4H64v-10.4zm0-30.6H32.4l.9 10.4H64V22.1zm0 61.2l-.1.1-15.8-4.3-.9-10.7H37.5l1.8 20.5 24.5 6.8.2-.1z"/><path fill="#EBEBEB" d="M64 52.7v10.4h28.3l-.9 9.5-27.4 7.6v10.8l25.3-7 .3-3.5 3.1-34.8H64zm0-30.6v10.4h56.2l.9-10.4H64z"/></svg></div>
                <div className="orbit-icon" style={{ animation:'orbitOuter 14s linear infinite -11.66s' }}><svg viewBox="0 0 128 128"><path fill="#F34F29" d="M124.7 58.4L69.6 3.3c-3.1-3.1-8.2-3.1-11.3 0l-11.3 11.3 14.3 14.3c3.3-1.1 7.1-.4 9.7 2.2 2.7 2.7 3.4 6.6 2.1 10l13.8 13.8c3.4-1.4 7.3-.6 9.9 2.1 3.7 3.7 3.7 9.8 0 13.5-3.7 3.7-9.8 3.7-13.5 0-2.8-2.8-3.5-6.9-2-10.3L67.4 47.2v33.5c.8.4 1.5.9 2.2 1.6 3.7 3.7 3.7 9.8 0 13.5-3.7 3.7-9.8 3.7-13.5 0-3.7-3.7-3.7-9.8 0-13.5.8-.8 1.8-1.5 2.8-1.9V46.9c-1-.4-2-.9-2.8-1.9-2.8-2.8-3.5-6.9-2-10.3L40.2 20.8 3.3 57.7c-3.1 3.1-3.1 8.2 0 11.3l55.1 55.1c3.1 3.1 8.2 3.1 11.3 0l55-55.1c3.2-3.1 3.2-8.1.1-11.3-.1-.1-.1-.2-.1-.3z"/></svg></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────── */}
      <section className="py-12 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About overview ───────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider mb-3">About Skillexa</span>
              <h2 className="section-title mb-5">More Than an EdTech Platform</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Skillexa was founded with a singular mission: to bridge the gap between academic education and industry readiness. We combine world-class coding courses with career services and professional tools.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                From C Programming to Full Stack Development, LinkedIn optimization to startup growth consulting — we're your complete growth partner from day one.
              </p>
              <Link to="/about" className="btn-primary">Learn Our Story <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="card p-5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">{title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Courses ─────────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider mb-3">Our Courses</span>
            <h2 className="section-title">Featured Courses</h2>
            <p className="section-subtitle">Hand-picked courses designed to get you job-ready and skill-first.</p>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded mb-1" />
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(featuredCourses.length > 0 ? featuredCourses : staticFallback).map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link to="/courses" className="btn-primary">View All Courses <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* ── Services highlight ───────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-blue-200 font-semibold text-sm uppercase tracking-wider mb-3">Professional Services</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">We Don't Just Teach — We Support</h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">From resume building to startup consulting, we offer end-to-end professional services.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {homeServices.map(s => (
              <div key={s.title} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition-colors cursor-pointer">
                <h4 className="font-semibold text-white mb-1">{s.title}</h4>
                <p className="text-blue-200 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/services" className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-xl transition-all shadow-xl hover:-translate-y-0.5">
              Explore All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── ADMIN PANEL ──────────────────────────────────────────────── */}
      {isAdmin && <AdminPanel onRefreshCourses={loadCourses} />}

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider mb-3">Testimonials</span>
            <h2 className="section-title">What Our Students Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="card p-6">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.stars)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">{t.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-950 dark:bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/30">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Transform Your Career?</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of students who've already unlocked their potential with Skillexa. Start your journey today — it's free to begin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn-primary text-base px-8 py-4">Start Learning Free <ArrowRight className="w-5 h-5" /></Link>
            <Link to="/courses" className="btn-outline-white text-base px-8 py-4">Browse Courses</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}