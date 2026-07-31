import React from 'react';
import { Recycle, ShieldCheck, MapPin, Phone, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand & Vision */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gvmc-600 flex items-center justify-center text-white font-bold">
                <Recycle className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white">EcoDrop <span className="text-gvmc-500">AI</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Greater Visakhapatnam Municipal Corporation (GVMC) Public Health & Solid Waste Management Initiative for sustainable e-waste diversion.
            </p>
            <div className="flex items-center space-x-2 text-xs text-gvmc-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>APPCB Certified Recycling Partner</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Citizen Portal</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><Link to="/find" className="hover:text-gvmc-400 transition-colors">Find Drop-Off Centers</Link></li>
              <li><Link to="/scan" className="hover:text-gvmc-400 transition-colors">Scan Center QR Code</Link></li>
              <li><Link to="/upload" className="hover:text-gvmc-400 transition-colors">AI E-Waste Image Classifier</Link></li>
              <li><Link to="/complaint" className="hover:text-gvmc-400 transition-colors">Report Illegal Dumping / Bin Issue</Link></li>
              <li><Link to="/history" className="hover:text-gvmc-400 transition-colors">My Submissions & Green Points</Link></li>
            </ul>
          </div>

          {/* GVMC Zones */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">GVMC Vizag Zones</h4>
            <ul className="space-y-1 text-xs text-slate-400">
              <li>Zone 1 - Bheemunipatnam</li>
              <li>Zone 2 - MVP Colony & Asilmetta</li>
              <li>Zone 3 - Siripuram & RK Beach</li>
              <li>Zone 4 - Gajuwaka Industrial Corridor</li>
              <li>Zone 5 - Pendurthi Zonal Command</li>
            </ul>
          </div>

          {/* Contact & Helpline */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">GVMC Support Helpline</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gvmc-500 shrink-0" />
                <span>GVMC Main Building, Tenneti Bhavan, Visakhapatnam - 530002</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gvmc-500 shrink-0" />
                <span>Toll-Free Helpline: 1800-425-0001</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gvmc-500 shrink-0" />
                <span>swm@gvmc.gov.in</span>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>© 2026 Greater Visakhapatnam Municipal Corporation (GVMC). All rights reserved.</p>
          <div className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Building a Clean & Green Visakhapatnam</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
