import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, QrCode, UploadCloud, AlertTriangle, History, 
  Sparkles, Award, ArrowRight, ShieldCheck, Recycle, CheckCircle2, TrendingUp, Cpu, Leaf, Layers 
} from 'lucide-react';
import { getDashboardDataApi } from '../services/api';

export default function Home() {
  const [stats, setStats] = useState({
    totalWeightKg: '512.4 kg',
    totalCollectionsCount: 89,
    activeCitizens: 248,
    activeDropPoints: 6
  });

  useEffect(() => {
    getDashboardDataApi()
      .then(res => {
        if (res.data && res.data.success && res.data.stats) {
          setStats(res.data.stats);
        }
      })
      .catch(err => console.warn('Live stats notice:', err.message));
  }, []);

  const actionCards = [
    {
      title: 'Find Nearest Drop Point',
      desc: 'Interactive Visakhapatnam map with live bin fill status, ward information, and direct GPS navigation.',
      icon: MapPin,
      path: '/find',
      color: 'from-emerald-500 to-teal-700',
      badge: 'Vizag Smart Map',
      bullets: ['Live Bin Fill Levels', 'Wards 12, 14, 8, 65 & 92', 'Navigation & Route']
    },
    {
      title: 'Scan Bin QR Code',
      desc: 'Scan physical QR code tags on official GVMC drop kiosks using your phone camera to verify location.',
      icon: QrCode,
      path: '/scan',
      color: 'from-cyan-500 to-blue-700',
      badge: 'QR Verification',
      bullets: ['Camera Scanner', 'Gallery Upload Backup', 'Instant Bin Auth']
    },
    {
      title: 'Upload Item (Gemini AI)',
      desc: 'Take a photo of your electronic item for automated AI category detection, weight estimation, and Green Points.',
      icon: UploadCloud,
      path: '/upload',
      color: 'from-purple-500 to-indigo-700',
      badge: 'Gemini AI Vision',
      bullets: ['Auto Category Detector', 'Estimate Weight (kg)', 'Instant Eco-Points']
    },
    {
      title: 'Report Illegal Dumping',
      desc: 'Submit complaints for overflowing bins, damaged kiosks, or illegal commercial e-waste dumping in your ward.',
      icon: AlertTriangle,
      path: '/complaint',
      color: 'from-amber-500 to-rose-600',
      badge: 'GVMC Public Health',
      bullets: ['Photo Evidence Upload', 'GPS Location Capture', 'Ward Officer Resolution']
    },
    {
      title: 'Submission History',
      desc: 'Review past drop-offs, track verification status, check green points, and monitor your personal CO₂ reduction.',
      icon: History,
      path: '/history',
      color: 'from-teal-500 to-emerald-800',
      badge: 'Citizen Eco Ledger',
      bullets: ['Verified Drop Logs', 'Track Complaint Status', 'Civic Green Points']
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Executive Smart City Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-8 sm:p-12 shadow-2xl border border-slate-800/80">
        
        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 right-1/4 -mt-20 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Hero Typography & CTA */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>GVMC Public Health & SWM Division</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              Smart E-Waste Collection Drive & <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
                Citizen Drop-Off Network
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-2xl">
              Preventing toxic e-waste contamination in Visakhapatnam. Locate smart drop bins across Siripuram, RK Beach, MVP Colony, and Gajuwaka, verify drop-offs with <strong>Gemini AI</strong>, and earn civic eco-rewards.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/find"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all flex items-center space-x-2 group"
              >
                <MapPin className="w-5 h-5 text-emerald-100" />
                <span>Find Drop Bins Near Me</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/upload"
                className="px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-extrabold text-sm backdrop-blur-md border border-slate-700/80 transition-all flex items-center space-x-2"
              >
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>Scan Item with AI</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Visual Showcase Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900/90 p-2 group hover:border-emerald-500/40 transition-colors">
              <img 
                src="/vizag_hero.png" 
                alt="Visakhapatnam Smart City E-Waste Kiosk" 
                className="w-full h-80 sm:h-96 object-cover rounded-xl"
              />
              
              {/* Floating Live AI Overlay Badges */}
              <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md border border-emerald-500/40 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-400 flex items-center space-x-1.5 shadow-lg animate-float">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Gemini AI Active</span>
              </div>

              <div className="absolute bottom-4 right-4 bg-slate-950/90 backdrop-blur-md border border-cyan-500/40 px-3 py-1.5 rounded-xl text-xs font-bold text-cyan-300 flex items-center space-x-1.5 shadow-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>APPCB Recycler Network</span>
              </div>
            </div>
          </div>

        </div>

      </section>


      {/* Citizen Services Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Citizen Smart Services Portal</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Select a service to participate in Visakhapatnam's solid waste recycling program</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center space-x-1.5 mt-2 sm:mt-0 bg-emerald-50 dark:bg-emerald-950 px-3.5 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>GVMC Certified Services</span>
          </span>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actionCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                to={card.path}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 hover:shadow-xl hover:border-emerald-500/40 hover:-translate-y-1 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed font-normal">
                    {card.desc}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {card.bullets.map((b, i) => (
                      <li key={i} className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <span>Open Service</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Official Recycling Process Section */}
      <section className="bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
            Certified Chain of Custody
          </span>
          <h2 className="text-2xl font-black text-white">Visakhapatnam E-Waste Lifecycle</h2>
          <p className="text-xs text-slate-300 font-medium">From Citizen Drop-Off to APPCB Authorized Recyclers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 text-center space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 mx-auto font-black flex items-center justify-center text-sm border border-emerald-500/40">1</div>
            <h4 className="font-extrabold text-sm text-white">Citizen Drop-Off & QR Scan</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">Residents deposit e-waste at Siripuram, RK Beach, or MVP Colony kiosks and scan the bin QR code.</p>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 text-center space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 mx-auto font-black flex items-center justify-center text-sm border border-cyan-500/40">2</div>
            <h4 className="font-extrabold text-sm text-white">Gemini AI Audit & Points</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">Image AI categorizes items, calculates confidence, estimates weight (kg), and awards green eco-points.</p>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 text-center space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 mx-auto font-black flex items-center justify-center text-sm border border-purple-500/40">3</div>
            <h4 className="font-extrabold text-sm text-white">APPCB Certified Processing</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">GVMC field officers empty bins, generate batch seals, and transfer e-waste to state-registered recyclers.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
