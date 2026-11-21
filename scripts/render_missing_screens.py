#!/usr/bin/env python3
import os
import subprocess
import tempfile

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCREENS_DIR = os.path.join(BASE_DIR, "screens")
CHROME_BIN = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

os.makedirs(SCREENS_DIR, exist_ok=True)

HTML_WRAPPER = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=390, height=844, initial-scale=1.0">
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 0;
    width: 390px;
    height: 844px;
    overflow: hidden;
    background: #0f172a;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Inter', 'Hind Siliguri', system-ui, sans-serif;
  }
  .phone-screen {
    width: 390px;
    height: 844px;
    background: #F5F7F6;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    color: #1A1F2B;
  }
  .bengali { font-family: 'Hind Siliguri', sans-serif; }
</style>
</head>
<body>
<div class="phone-screen">
  <!-- Android Status Bar -->
  <div class="h-8 bg-[#0F7B4F] text-white px-4 flex justify-between items-center text-xs font-medium z-20 shrink-0">
    <span>9:41</span>
    <div class="flex items-center gap-2">
      <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 3C7.5 3 3.7 4.9 1 8l11 13L23 8c-2.7-3.1-6.5-5-11-5z"/></svg>
      <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M2 22h20V2L2 22z"/></svg>
      <div class="w-5 h-2.5 border border-white rounded-sm p-0.5 flex items-center">
        <div class="h-full w-full bg-white rounded-xs"></div>
      </div>
    </div>
  </div>

  <!-- Screen Body -->
  <div class="flex-1 flex flex-col overflow-y-auto">
    __CONTENT__
  </div>

  <!-- Optional Bottom Nav -->
  __BOTTOM_NAV__
</div>
</body>
</html>
"""

def passenger_nav(active_tab):
    tabs = [
        ("Home", "হোম", "home", """<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>"""),
        ("Buses", "বাসসমূহ", "buses", """<path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>"""),
        ("Alerts", "বিজ্ঞপ্তি", "alerts", """<path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>"""),
        ("Complaints", "অভিযোগ", "complaints", """<path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/>"""),
        ("Profile", "প্রোফাইল", "profile", """<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>""")
    ]
    html = '<div class="h-16 bg-white border-t border-slate-200 px-2 flex justify-around items-center shrink-0 shadow-lg">'
    for name, bangla, key, icon in tabs:
        is_active = (key == active_tab)
        color = "#0F7B4F" if is_active else "#64748B"
        font_weight = "font-bold text-[#0F7B4F]" if is_active else "text-slate-500 font-medium"
        html += f"""
        <div class="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer">
          <svg class="w-5 h-5 fill-current" style="color: {color};" viewBox="0 0 24 24">{icon}</svg>
          <span class="text-[10px] mt-1 {font_weight}">{name}</span>
          <span class="text-[8px] text-slate-400 bengali leading-none">{bangla}</span>
        </div>
        """
    html += '</div>'
    return html

def checker_nav(active_tab):
    tabs = [
        ("Entry", "নতুন এন্ট্রি", "entry", """<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>"""),
        ("History", "ইতিহাস", "history", """<path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>"""),
        ("Sync", "সিঙ্ক", "sync", """<path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>"""),
        ("Profile", "প্রোফাইল", "profile", """<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>""")
    ]
    html = '<div class="h-16 bg-white border-t-2 border-slate-200 px-3 flex justify-around items-center shrink-0 shadow-lg">'
    for name, bangla, key, icon in tabs:
        is_active = (key == active_tab)
        color = "#0F7B4F" if is_active else "#64748B"
        font_weight = "font-bold text-[#0F7B4F]" if is_active else "text-slate-500 font-semibold"
        bg = "bg-emerald-50 px-3 py-1 rounded-xl" if is_active else "px-3 py-1"
        html += f"""
        <div class="flex flex-col items-center justify-center cursor-pointer {bg}">
          <svg class="w-6 h-6 fill-current" style="color: {color};" viewBox="0 0 24 24">{icon}</svg>
          <span class="text-xs mt-0.5 {font_weight}">{name}</span>
          <span class="text-[9px] text-slate-400 bengali leading-none">{bangla}</span>
        </div>
        """
    html += '</div>'
    return html

SCREENS = {
    # P13: Notifications and Arrival Alerts
    "P13_notifications_alerts": {
        "nav": passenger_nav("alerts"),
        "content": """
        <!-- Top App Bar -->
        <div class="bg-[#0F7B4F] text-white px-4 pt-3 pb-4">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-xl font-bold tracking-tight">Alerts</h1>
              <span class="text-xs text-emerald-100 bengali">বিজ্ঞপ্তি ও ট্র্যাকিং সতর্কতা</span>
            </div>
            <div class="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
            </div>
          </div>
          <!-- Tabs -->
          <div class="flex gap-2 mt-4 bg-emerald-900/40 p-1 rounded-xl">
            <button class="flex-1 py-2 rounded-lg bg-white text-[#0F7B4F] font-bold text-xs shadow-sm flex flex-col items-center">
              <span>Notifications</span>
              <span class="text-[9px] font-normal bengali">বিজ্ঞপ্তি (3)</span>
            </button>
            <button class="flex-1 py-2 rounded-lg text-emerald-100 font-medium text-xs flex flex-col items-center">
              <span>My Route Alerts</span>
              <span class="text-[9px] font-normal bengali">রুট সাবস্ক্রিপশন</span>
            </button>
          </div>
        </div>

        <div class="p-4 space-y-4">
          <!-- Subscribed Routes Quick Strip -->
          <div class="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-slate-800">Active Route Alerts / সতর্কবার্তা চালু</span>
              <button class="text-[11px] font-bold text-[#0F7B4F] flex items-center gap-1">
                <span>+ Subscribe</span>
              </button>
            </div>
            <div class="space-y-2">
              <div class="flex items-center justify-between py-1.5 px-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-[#2E9E5B]"></div>
                  <div>
                    <div class="text-xs font-semibold text-slate-800">Mirpur 10 → Motijheel</div>
                    <div class="text-[10px] text-slate-500 bengali">মিরপুর ১০ ↔ মতিঝিল</div>
                  </div>
                </div>
                <div class="w-10 h-5 bg-[#0F7B4F] rounded-full p-0.5 flex justify-end items-center cursor-pointer">
                  <div class="w-4 h-4 bg-white rounded-full shadow"></div>
                </div>
              </div>
              <div class="flex items-center justify-between py-1.5 px-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-slate-300"></div>
                  <div>
                    <div class="text-xs font-semibold text-slate-700">Farmgate → Shahbag</div>
                    <div class="text-[10px] text-slate-500 bengali">ফার্মগেট ↔ শাহবাগ</div>
                  </div>
                </div>
                <div class="w-10 h-5 bg-slate-200 rounded-full p-0.5 flex justify-start items-center cursor-pointer">
                  <div class="w-4 h-4 bg-white rounded-full shadow"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Notification Feed -->
          <div class="space-y-2.5">
            <div class="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">Recent Activity / সাম্প্রতিক তথ্য</div>

            <!-- Card 1: Arrival Alert -->
            <div class="bg-white p-3.5 rounded-2xl border-l-4 border-l-[#2E9E5B] border border-slate-200/80 shadow-sm relative">
              <div class="w-2 h-2 bg-[#2F6FED] rounded-full absolute top-3 right-3"></div>
              <div class="flex gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F7B4F] flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/></svg>
                </div>
                <div class="flex-1 pr-3">
                  <div class="flex items-center gap-1.5">
                    <span class="text-xs font-bold text-slate-900">Bus DM-11-2345 approaching</span>
                    <span class="px-1.5 py-0.5 bg-emerald-100 text-[#0F7B4F] text-[9px] font-bold rounded">ETA 5 min</span>
                  </div>
                  <p class="text-xs text-slate-600 mt-1">Thikana Paribahan passed Kazipara checkpoint. Seats available.</p>
                  <span class="text-[10px] text-slate-400 mt-1 block">Just now · ২ মিনিট আগে</span>
                </div>
              </div>
            </div>

            <!-- Card 2: Complaint Resolved -->
            <div class="bg-white p-3.5 rounded-2xl border-l-4 border-l-[#2F6FED] border border-slate-200/80 shadow-sm relative">
              <div class="w-2 h-2 bg-[#2F6FED] rounded-full absolute top-3 right-3"></div>
              <div class="flex gap-3">
                <div class="w-10 h-10 rounded-xl bg-blue-50 text-[#2F6FED] flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
                </div>
                <div class="flex-1 pr-3">
                  <div class="flex items-center gap-1.5">
                    <span class="text-xs font-bold text-slate-900">Complaint #C-1042 Resolved</span>
                    <span class="px-1.5 py-0.5 bg-blue-100 text-[#2F6FED] text-[9px] font-bold rounded">Resolved</span>
                  </div>
                  <p class="text-xs text-slate-600 mt-1">Admin has verified the fare overcharge issue and warned staff.</p>
                  <span class="text-[10px] text-slate-400 mt-1 block">15 min ago · ১৫ মিনিট আগে</span>
                </div>
              </div>
            </div>

            <!-- Card 3: Traffic Delay Warning -->
            <div class="bg-white p-3.5 rounded-2xl border-l-4 border-l-[#F5A524] border border-slate-200/80 shadow-sm">
              <div class="flex gap-3">
                <div class="w-10 h-10 rounded-xl bg-amber-50 text-[#F5A524] flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-1.5">
                    <span class="text-xs font-bold text-slate-900">Heavy Traffic at Farmgate</span>
                    <span class="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-bold rounded">+12 min delay</span>
                  </div>
                  <p class="text-xs text-slate-600 mt-1">Route Mirpur 10 → Motijheel experiencing significant congestion.</p>
                  <span class="text-[10px] text-slate-400 mt-1 block">35 min ago · ৩৫ মিনিট আগে</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        """
    },

    # P14: Profile and Settings
    "P14_profile_settings": {
        "nav": passenger_nav("profile"),
        "content": """
        <!-- Top App Bar -->
        <div class="bg-[#0F7B4F] text-white px-4 pt-4 pb-6">
          <div class="flex items-center justify-between">
            <h1 class="text-xl font-bold tracking-tight">Passenger Profile</h1>
            <span class="text-xs bg-emerald-800/80 px-2 py-1 rounded-full text-emerald-100 font-medium">Pothe v1.0 pilot</span>
          </div>

          <!-- User Card -->
          <div class="flex items-center gap-3.5 mt-4">
            <div class="w-14 h-14 rounded-full bg-white text-[#0F7B4F] font-black text-xl flex items-center justify-center border-2 border-emerald-300 shadow">
              RA
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-base font-bold">Ramim Azad</span>
                <span class="px-2 py-0.5 bg-emerald-400/30 text-white border border-emerald-300/40 text-[10px] font-bold rounded-full flex items-center gap-1">
                  <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
                  Verified
                </span>
              </div>
              <div class="text-xs text-emerald-100 mt-0.5">+880 1712-345678</div>
              <button class="mt-1.5 text-[11px] font-bold text-white underline underline-offset-2 flex items-center gap-1">
                Edit Profile / প্রোফাইল এডিট
              </button>
            </div>
          </div>
        </div>

        <div class="p-4 space-y-4">
          <!-- Settings List -->
          <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm divide-y divide-slate-100 overflow-hidden">
            <!-- Language -->
            <div class="p-3.5 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-emerald-50 text-[#0F7B4F] flex items-center justify-center">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                </div>
                <div>
                  <div class="text-xs font-bold text-slate-800">Language / ভাষা</div>
                  <div class="text-[10px] text-slate-500">English & বাংলা</div>
                </div>
              </div>
              <div class="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-bold">
                <span class="px-2 py-1 rounded bg-white text-[#0F7B4F] shadow-xs">EN</span>
                <span class="px-2 py-1 text-slate-500 bengali">বাং</span>
              </div>
            </div>

            <!-- Password -->
            <div class="p-3.5 flex items-center justify-between cursor-pointer">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
                </div>
                <div>
                  <div class="text-xs font-bold text-slate-800">Change Password</div>
                  <div class="text-[10px] text-slate-500 bengali">পাসওয়ার্ড পরিবর্তন</div>
                </div>
              </div>
              <svg class="w-4 h-4 text-slate-400" viewBox="0 0 24 24"><path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
            </div>

            <!-- Notification Preferences -->
            <div class="p-3.5 flex items-center justify-between cursor-pointer">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
                </div>
                <div>
                  <div class="text-xs font-bold text-slate-800">Notification Preferences</div>
                  <div class="text-[10px] text-slate-500 bengali">বিজ্ঞপ্তি সেটিংস</div>
                </div>
              </div>
              <svg class="w-4 h-4 text-slate-400" viewBox="0 0 24 24"><path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
            </div>

            <!-- Help & Support -->
            <div class="p-3.5 flex items-center justify-between cursor-pointer">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>
                </div>
                <div>
                  <div class="text-xs font-bold text-slate-800">Help & Support</div>
                  <div class="text-[10px] text-slate-500 bengali">সহায়তা ও যোগাযোগ</div>
                </div>
              </div>
              <svg class="w-4 h-4 text-slate-400" viewBox="0 0 24 24"><path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
            </div>
          </div>

          <!-- Bottom Sheet State Preview: Edit Profile Form -->
          <div class="bg-white p-3.5 rounded-2xl border-2 border-emerald-500/50 shadow-md">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-[#0F7B4F]">Quick Edit Profile / প্রোফাইল এডিট</span>
              <span class="text-[10px] text-slate-400">Modal sheet</span>
            </div>
            <div class="space-y-2">
              <div>
                <label class="text-[10px] font-bold text-slate-600 block">Full Name</label>
                <input class="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg" value="Ramim Azad" readonly>
              </div>
              <div>
                <label class="text-[10px] font-bold text-slate-600 block">Email</label>
                <input class="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg" value="ramim@example.com" readonly>
              </div>
              <div>
                <label class="text-[10px] font-bold text-slate-600 block">Phone (Verified, read-only)</label>
                <input class="w-full text-xs p-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-500" value="+880 1712-345678" readonly>
              </div>
              <button class="w-full py-2 bg-[#0F7B4F] text-white rounded-lg text-xs font-bold mt-1">
                Save Changes / সংরক্ষণ করুন
              </button>
            </div>
          </div>

          <!-- Log Out Button -->
          <button class="w-full py-3 border-2 border-[#D64545] text-[#D64545] rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-rose-50 transition">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
            <span>Log Out / লগআউট</span>
          </button>
        </div>
        """
    },

    # C2: Checker Home: Shift Dashboard
    "C02_checker_home_dashboard": {
        "nav": checker_nav("entry"),
        "content": """
        <!-- Dark Green Header Card -->
        <div class="bg-[#0F7B4F] text-white p-4 pb-5 rounded-b-3xl shadow-md">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-[11px] text-emerald-200 uppercase tracking-wider font-semibold">Checker Duty / চেকার ডিউটি</div>
              <h1 class="text-xl font-extrabold tracking-tight">Rahim Uddin</h1>
            </div>
            <div class="text-right">
              <span class="px-2.5 py-1 bg-white/20 rounded-full text-xs font-bold">#CHK-8801</span>
            </div>
          </div>

          <div class="mt-3.5 bg-emerald-950/40 p-3 rounded-2xl border border-emerald-400/20">
            <div class="flex items-center justify-between text-xs">
              <div>
                <span class="text-emerald-300 block text-[10px]">Checkpoint / চেকপয়েন্ট</span>
                <span class="font-bold text-sm">Mirpur 10 (মিরপুর ১০)</span>
              </div>
              <div class="text-right">
                <span class="text-emerald-300 block text-[10px]">Route / রুট</span>
                <span class="font-bold">Mirpur ↔ Motijheel</span>
              </div>
            </div>
            <div class="mt-2.5">
              <div class="flex justify-between text-[10px] text-emerald-200 mb-1">
                <span>Shift: 6:00 AM – 2:00 PM</span>
                <span>65% completed</span>
              </div>
              <div class="w-full h-2 bg-emerald-900 rounded-full overflow-hidden">
                <div class="h-full bg-emerald-400 rounded-full" style="width: 65%;"></div>
              </div>
            </div>
          </div>

          <!-- Status Row Chips -->
          <div class="grid grid-cols-3 gap-2 mt-3">
            <div class="bg-white/10 px-2 py-1.5 rounded-xl text-center">
              <span class="text-[9px] text-emerald-200 block">Location</span>
              <span class="text-[11px] font-bold text-emerald-300">Inside ✓</span>
            </div>
            <div class="bg-white/10 px-2 py-1.5 rounded-xl text-center">
              <span class="text-[9px] text-emerald-200 block">Network</span>
              <span class="text-[11px] font-bold text-emerald-300">Online ●</span>
            </div>
            <div class="bg-white/10 px-2 py-1.5 rounded-xl text-center">
              <span class="text-[9px] text-emerald-200 block">Pending Sync</span>
              <span class="text-[11px] font-bold text-white">0</span>
            </div>
          </div>
        </div>

        <div class="p-4 space-y-4">
          <!-- Big Stats Row -->
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
              <span class="text-xs text-slate-500 font-medium block">Entries Today</span>
              <span class="text-2xl font-black text-[#0F7B4F]">48</span>
              <span class="text-[10px] text-slate-400 bengali block">মোট এন্ট্রি</span>
            </div>
            <div class="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
              <span class="text-xs text-slate-500 font-medium block">Last Bus Count</span>
              <span class="text-2xl font-black text-slate-800">2 min</span>
              <span class="text-[10px] text-slate-400 bengali block">সর্বশেষ এন্ট্রি</span>
            </div>
          </div>

          <!-- HUGE ACTION BUTTON (80px tall) -->
          <button class="w-full h-20 bg-[#0F7B4F] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-lg shadow-emerald-900/20 active:scale-98 transition">
            <div class="w-10 h-10 rounded-full bg-white text-[#0F7B4F] flex items-center justify-center font-bold text-2xl">+</div>
            <div class="text-left">
              <div class="text-base font-extrabold leading-tight">+ New Bus Entry</div>
              <div class="text-xs text-emerald-200 bengali font-normal">নতুন বাস এন্ট্রি ও যাত্রী গণনা</div>
            </div>
          </button>

          <!-- Recent Entries Short List -->
          <div class="space-y-2">
            <div class="flex items-center justify-between px-1">
              <span class="text-xs font-bold text-slate-700">Recent Logs / সাম্প্রতিক এন্ট্রি</span>
              <span class="text-xs font-bold text-[#0F7B4F]">View History</span>
            </div>

            <div class="bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span class="text-xs font-black text-slate-900">DM-11-2345 (Thikana)</span>
                <span class="text-[10px] text-slate-500 block">10:42 AM · Mirpur 10</span>
              </div>
              <div class="text-right">
                <span class="text-xs font-bold text-[#0F7B4F] px-2 py-0.5 bg-emerald-50 rounded-lg">S: 28 · St: 14</span>
              </div>
            </div>

            <div class="bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span class="text-xs font-black text-slate-900">DM-11-8921 (Bihanga)</span>
                <span class="text-[10px] text-slate-500 block">10:35 AM · Mirpur 10</span>
              </div>
              <div class="text-right">
                <span class="text-xs font-bold text-slate-700 px-2 py-0.5 bg-slate-100 rounded-lg">S: 36 · St: 20</span>
              </div>
            </div>
          </div>
        </div>
        """
    },

    # C3: Select Bus ID (Tap 1)
    "C03_select_bus_id": {
        "nav": checker_nav("entry"),
        "content": """
        <!-- Progress Bar -->
        <div class="bg-[#0F7B4F] text-white px-4 pt-3 pb-3">
          <div class="flex items-center justify-between">
            <h1 class="text-lg font-bold">Select Bus / বাস নির্বাচন</h1>
            <span class="text-xs font-bold bg-white/20 px-2.5 py-0.5 rounded-full">Step 1 of 3</span>
          </div>
          <!-- Direction Tabs -->
          <div class="grid grid-cols-2 gap-2 mt-3">
            <button class="py-2 bg-white text-[#0F7B4F] font-extrabold text-xs rounded-xl shadow-xs">
              Up Direction ↓ (উর্ধ্বগামী)
            </button>
            <button class="py-2 bg-emerald-800/80 text-emerald-100 font-bold text-xs rounded-xl">
              Down Direction ↑ (নিম্নগামী)
            </button>
          </div>
        </div>

        <div class="p-4 space-y-3">
          <!-- Search Bar -->
          <div class="relative">
            <input class="w-full p-3 pl-9 bg-white border-2 border-slate-300 rounded-xl text-sm font-semibold text-slate-800 placeholder-slate-400 focus:border-[#0F7B4F] outline-none" placeholder="Type bus number (e.g. 2345)...">
            <svg class="w-4 h-4 text-slate-400 absolute left-3 top-3.5" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          </div>

          <div class="text-[11px] text-slate-500 font-semibold px-1">
            Registered buses on Mirpur 10 ↔ Motijheel route:
          </div>

          <!-- Bus Tiles (72px tall each) -->
          <!-- Selected Tile -->
          <div class="h-[72px] bg-white border-2 border-[#0F7B4F] rounded-2xl p-3 flex items-center justify-between shadow-sm relative">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-[#0F7B4F] text-white flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <div class="text-base font-black text-[#1A1F2B]">DM-11-2345</div>
                <div class="text-xs text-slate-600 font-medium">Thikana Paribahan · ঠিকানা</div>
              </div>
            </div>
            <div class="text-right">
              <span class="px-2 py-0.5 bg-emerald-100 text-[#0F7B4F] text-[10px] font-bold rounded-lg block">Up ↓</span>
              <span class="text-[9px] text-slate-400 mt-1 block">Cap: 76</span>
            </div>
          </div>

          <!-- Tile 2 with Duplicate Warning -->
          <div class="h-[72px] bg-white border border-slate-200 rounded-2xl p-3 flex items-center justify-between shadow-xs">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold">
                🚌
              </div>
              <div>
                <div class="text-base font-black text-[#1A1F2B]">DM-11-8921</div>
                <div class="text-xs text-slate-600 font-medium">Bihanga Paribahan · বিহঙ্গ</div>
              </div>
            </div>
            <div class="text-right">
              <span class="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-lg block">Passed 5m ago!</span>
              <span class="text-[9px] text-slate-400 mt-1 block">Up ↓</span>
            </div>
          </div>

          <!-- Tile 3 -->
          <div class="h-[72px] bg-white border border-slate-200 rounded-2xl p-3 flex items-center justify-between shadow-xs">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold">
                🚌
              </div>
              <div>
                <div class="text-base font-black text-[#1A1F2B]">DM-11-4412</div>
                <div class="text-xs text-slate-600 font-medium">Alif Enterprise · আলিফ</div>
              </div>
            </div>
            <div class="text-right">
              <span class="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-lg block">Up ↓</span>
              <span class="text-[9px] text-slate-400 mt-1 block">Cap: 76</span>
            </div>
          </div>

          <!-- Bottom Button -->
          <div class="pt-2">
            <button class="w-full h-14 bg-[#0F7B4F] text-white rounded-xl font-black text-base flex items-center justify-center gap-2 shadow-md">
              <span>Next: Enter Counts / পরবর্তী</span>
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
            </button>
          </div>
        </div>
        """
    },

    # C4: Enter Passenger Counts (Taps 2 and 3)
    "C04_enter_passenger_counts": {
        "nav": checker_nav("entry"),
        "content": """
        <!-- Top Step Header -->
        <div class="bg-[#0F7B4F] text-white px-4 pt-3 pb-3">
          <div class="flex items-center justify-between">
            <h1 class="text-lg font-bold">Passenger Count / যাত্রী সংখ্যা</h1>
            <span class="text-xs font-bold bg-white/20 px-2.5 py-0.5 rounded-full">Step 2 of 3</span>
          </div>
          <!-- Selected Bus Badge -->
          <div class="mt-2 bg-emerald-950/40 p-2.5 rounded-xl flex items-center justify-between text-xs">
            <span class="font-extrabold text-white text-sm">DM-11-2345 (Thikana)</span>
            <span class="text-emerald-200 text-[11px]">Cap: 36 seats / 40 standing</span>
          </div>
        </div>

        <div class="p-4 space-y-4">
          <!-- Read-only auto server strip -->
          <div class="bg-slate-200/80 p-2 rounded-xl flex justify-between items-center text-[10px] text-slate-700 font-semibold">
            <span class="flex items-center gap-1">🔒 Time: 10:42 AM (Auto Server)</span>
            <span class="flex items-center gap-1">🔒 Loc: Mirpur 10 (GPS Locked)</span>
          </div>

          <!-- 2 GIANT COUNTER BLOCKS -->
          <!-- Counter 1: Sitting -->
          <div class="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm text-center">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-black text-slate-700 uppercase tracking-wider">Sitting / বসা</span>
              <span class="text-[10px] text-slate-400">Max: 36</span>
            </div>
            <div class="flex items-center justify-between gap-3 my-2">
              <button class="w-[72px] h-[72px] rounded-2xl bg-slate-100 text-slate-800 font-black text-3xl border border-slate-300 active:bg-slate-200 flex items-center justify-center">
                −
              </button>
              <div class="text-5xl font-black text-[#0F7B4F] tracking-tight">
                28
              </div>
              <button class="w-[72px] h-[72px] rounded-2xl bg-[#0F7B4F] text-white font-black text-3xl active:bg-emerald-800 flex items-center justify-center shadow-md">
                +
              </button>
            </div>
          </div>

          <!-- Counter 2: Standing -->
          <div class="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm text-center">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-black text-slate-700 uppercase tracking-wider">Standing / দাঁড়ানো</span>
              <span class="text-[10px] text-slate-400">Max: 40</span>
            </div>
            <div class="flex items-center justify-between gap-3 my-2">
              <button class="w-[72px] h-[72px] rounded-2xl bg-slate-100 text-slate-800 font-black text-3xl border border-slate-300 active:bg-slate-200 flex items-center justify-center">
                −
              </button>
              <div class="text-5xl font-black text-[#F5A524] tracking-tight">
                14
              </div>
              <button class="w-[72px] h-[72px] rounded-2xl bg-[#0F7B4F] text-white font-black text-3xl active:bg-emerald-800 flex items-center justify-center shadow-md">
                +
              </button>
            </div>
            <!-- Soft Warning Banner -->
            <div class="mt-2 bg-amber-50 border border-amber-200 text-amber-800 p-2 rounded-lg text-[11px] font-semibold text-left">
              ⚠️ Count looks high for this bus. Please recheck before submitting.
            </div>
          </div>

          <!-- Huge Submit Button -->
          <button class="w-full h-16 bg-[#0F7B4F] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 active:scale-98">
            <span>Submit Entry / জমা দিন</span>
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
          </button>
        </div>
        """
    },

    # C5: Entry Submitted: Success and Undo Window
    "C05_entry_submitted_success": {
        "nav": checker_nav("entry"),
        "content": """
        <div class="p-6 flex-1 flex flex-col justify-center items-center text-center">
          <!-- Animated checkmark circle -->
          <div class="w-24 h-24 rounded-full bg-[#2E9E5B] text-white flex items-center justify-center shadow-xl shadow-emerald-600/30 mb-4 animate-bounce">
            <svg class="w-12 h-12 fill-current" viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
          </div>

          <h1 class="text-2xl font-extrabold text-[#1A1F2B]">Entry Saved!</h1>
          <span class="text-sm font-semibold text-[#0F7B4F] bengali">এন্ট্রি সফলভাবে সংরক্ষিত হয়েছে</span>

          <!-- Summary Card -->
          <div class="w-full bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm mt-5 text-left space-y-2">
            <div class="flex justify-between items-center border-b pb-2">
              <span class="text-xs text-slate-500 font-medium">Bus ID / বাস নং</span>
              <span class="text-sm font-black text-slate-900">DM-11-2345 (Thikana)</span>
            </div>
            <div class="flex justify-between items-center border-b pb-2">
              <span class="text-xs text-slate-500 font-medium">Passenger Count</span>
              <span class="text-sm font-black text-[#0F7B4F]">Sitting: 28 · Standing: 14</span>
            </div>
            <div class="flex justify-between items-center border-b pb-2">
              <span class="text-xs text-slate-500 font-medium">Checkpoint</span>
              <span class="text-sm font-bold text-slate-800">Mirpur 10 (মিরপুর ১০)</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs text-slate-500 font-medium">Timestamp</span>
              <span class="text-xs font-bold text-slate-700">10:42:18 AM</span>
            </div>
          </div>

          <!-- Undo / Correction Countdown Banner -->
          <div class="w-full bg-amber-50 border-2 border-amber-300 p-3 rounded-2xl mt-4">
            <div class="text-xs font-bold text-amber-900 flex items-center justify-center gap-1.5">
              <span>⏳ Editable for next:</span>
              <span class="px-2 py-0.5 bg-amber-200 rounded text-amber-950 font-black">04:32 min</span>
            </div>
            <div class="grid grid-cols-2 gap-2 mt-2.5">
              <button class="py-2 bg-white border border-amber-400 text-amber-900 rounded-xl text-xs font-bold shadow-xs">
                Correct / সংশোধন
              </button>
              <button class="py-2 bg-white border border-rose-400 text-rose-700 rounded-xl text-xs font-bold shadow-xs">
                Void / বাতিল
              </button>
            </div>
          </div>

          <!-- Next Action Button -->
          <div class="w-full mt-6 space-y-2">
            <button class="w-full h-14 bg-[#0F7B4F] text-white rounded-2xl font-black text-base shadow-md flex items-center justify-center gap-2">
              <span>Next Bus / পরবর্তী বাস</span>
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
            </button>
            <a href="#" class="text-xs font-bold text-slate-500 underline block pt-1">Back to Dashboard</a>
          </div>
        </div>
        """
    },

    # C6: Entry Rejected: Geofence and Validation Errors
    "C06_entry_rejected_geofence_error": {
        "nav": checker_nav("entry"),
        "content": """
        <!-- Top App Bar -->
        <div class="bg-[#D64545] text-white px-4 pt-3 pb-4">
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
            <div>
              <h1 class="text-lg font-bold">Entry Not Accepted</h1>
              <span class="text-xs text-rose-100 bengali">এন্ট্রি গ্রহণ করা হয়নি</span>
            </div>
          </div>
        </div>

        <div class="p-4 space-y-4">
          <!-- Primary Reason Card with Geofence Map -->
          <div class="bg-white p-4 rounded-2xl border-2 border-rose-300 shadow-sm">
            <div class="flex items-center gap-2 text-xs font-bold text-[#D64545] mb-2">
              <span>⚠️ Geofence Restriction Failed</span>
            </div>
            <p class="text-xs text-slate-700 font-semibold leading-relaxed">
              You are outside the <strong class="text-slate-900">Mirpur 10</strong> checkpoint area (about <strong class="text-rose-600">240 m away</strong>).
            </p>

            <!-- Illustrated mini map -->
            <div class="w-full h-36 bg-slate-100 rounded-xl mt-3 border border-slate-200 relative overflow-hidden flex items-center justify-center">
              <!-- Route line -->
              <div class="absolute w-full h-2 bg-emerald-200 rotate-12"></div>
              <!-- Green geofence circle -->
              <div class="w-24 h-24 rounded-full border-2 border-dashed border-[#2E9E5B] bg-emerald-50/60 flex items-center justify-center relative">
                <span class="text-[9px] font-bold text-[#0F7B4F] absolute -top-4">Mirpur 10 Geofence</span>
                <div class="w-3 h-3 bg-[#0F7B4F] rounded-full"></div>
              </div>
              <!-- Checker dot outside -->
              <div class="absolute right-8 bottom-6 flex flex-col items-center">
                <div class="w-4 h-4 bg-[#2F6FED] rounded-full border-2 border-white shadow animate-ping"></div>
                <span class="text-[9px] font-black text-[#2F6FED] mt-1">You (240m)</span>
              </div>
            </div>
          </div>

          <!-- Secondary Validation Errors Collapsed Card -->
          <div class="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-xs">
            <span class="text-xs font-bold text-slate-700 block mb-1.5">Additional Validation Checks:</span>
            <ul class="text-xs text-slate-600 space-y-1">
              <li class="flex items-center gap-1.5 text-emerald-600 font-medium">✓ Passenger counts are whole numbers</li>
              <li class="flex items-center gap-1.5 text-rose-600 font-medium">✗ Checker GPS coordinate out-of-bounds</li>
              <li class="flex items-center gap-1.5 text-emerald-600 font-medium">✓ Standing count within bus threshold</li>
            </ul>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-2 pt-2">
            <button class="w-full h-14 bg-[#0F7B4F] text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-md">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>
              <span>Retry Location Check / অবস্থান পুনরায় যাচাই</span>
            </button>
            <button class="w-full h-12 bg-white border border-slate-300 text-slate-700 rounded-xl font-bold text-sm">
              Back / ফিরে যান
            </button>
          </div>
        </div>
        """
    },

    # C7: Entry History
    "C07_entry_history": {
        "nav": checker_nav("history"),
        "content": """
        <!-- Top App Bar -->
        <div class="bg-[#0F7B4F] text-white px-4 pt-3 pb-4">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-xl font-bold">My Entries / আমার এন্ট্রি</h1>
              <span class="text-xs text-emerald-100">Checkpoint: Mirpur 10</span>
            </div>
            <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/></svg>
            </div>
          </div>

          <!-- Filter Chips -->
          <div class="flex gap-2 mt-3">
            <span class="px-3 py-1 bg-white text-[#0F7B4F] rounded-lg text-xs font-black shadow-xs">Today (48)</span>
            <span class="px-3 py-1 bg-emerald-800/80 text-emerald-100 rounded-lg text-xs font-semibold">Yesterday</span>
            <span class="px-3 py-1 bg-emerald-800/80 text-emerald-100 rounded-lg text-xs font-semibold">This Week</span>
          </div>
        </div>

        <div class="p-4 space-y-3">
          <!-- Summary Strip -->
          <div class="bg-white p-2.5 rounded-xl border border-slate-200/90 flex justify-around text-center text-xs font-bold">
            <div><span class="text-slate-400 block text-[10px]">Total</span><span class="text-slate-900">48</span></div>
            <div class="border-l border-slate-100"></div>
            <div><span class="text-slate-400 block text-[10px]">Corrected</span><span class="text-[#2F6FED]">2</span></div>
            <div class="border-l border-slate-100"></div>
            <div><span class="text-slate-400 block text-[10px]">Voided</span><span class="text-slate-400 line-through">1</span></div>
          </div>

          <!-- Entries List -->
          <div class="space-y-2">
            <!-- Row 1: Saved with Edit Window -->
            <div class="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-black text-slate-900">DM-11-2345</span>
                  <span class="px-1.5 py-0.5 bg-emerald-100 text-[#0F7B4F] text-[9px] font-bold rounded">Saved</span>
                </div>
                <div class="text-xs text-slate-600 mt-0.5">S: 28 · St: 14</div>
                <div class="text-[10px] text-slate-400">10:42 AM · Thikana</div>
              </div>
              <button class="px-2.5 py-1.5 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-xs font-bold flex items-center gap-1">
                <span>✏️ Edit</span>
                <span class="text-[10px] font-black text-amber-700">(3:10)</span>
              </button>
            </div>

            <!-- Row 2: Corrected -->
            <div class="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-black text-slate-900">DM-11-8921</span>
                  <span class="px-1.5 py-0.5 bg-blue-100 text-[#2F6FED] text-[9px] font-bold rounded">Corrected</span>
                </div>
                <div class="text-xs text-slate-600 mt-0.5">S: 36 · St: 22</div>
                <div class="text-[10px] text-slate-400">10:35 AM · Bihanga</div>
              </div>
              <span class="text-[11px] text-slate-400 font-semibold">Locked</span>
            </div>

            <!-- Row 3: Voided -->
            <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200/60 shadow-xs flex items-center justify-between opacity-60">
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-black text-slate-600 line-through">DM-11-4412</span>
                  <span class="px-1.5 py-0.5 bg-slate-200 text-slate-600 text-[9px] font-bold rounded">Voided</span>
                </div>
                <div class="text-xs text-slate-500 mt-0.5 line-through">S: 15 · St: 0</div>
                <div class="text-[10px] text-slate-400">10:20 AM · Alif</div>
              </div>
              <span class="text-[11px] text-rose-500 font-bold">Cancelled</span>
            </div>

            <!-- Row 4: Pending Sync -->
            <div class="bg-white p-3 rounded-2xl border-l-4 border-l-amber-500 border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-black text-slate-900">DM-11-5500</span>
                  <span class="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-bold rounded flex items-center gap-1">
                    ☁️ Pending Sync
                  </span>
                </div>
                <div class="text-xs text-slate-600 mt-0.5">S: 24 · St: 8</div>
                <div class="text-[10px] text-slate-400">09:50 AM · Victor</div>
              </div>
              <span class="text-xs text-amber-600 font-bold">Queued</span>
            </div>
          </div>
        </div>
        """
    },

    # C8: Correct or Void Entry
    "C08_correct_or_void_entry": {
        "nav": checker_nav("history"),
        "content": """
        <!-- Top App Bar -->
        <div class="bg-[#0F7B4F] text-white px-4 pt-3 pb-4">
          <div class="flex items-center justify-between">
            <h1 class="text-lg font-bold">Correct Entry / এন্ট্রি সংশোধন</h1>
            <span class="px-2 py-0.5 bg-rose-500 text-white rounded-full text-xs font-black animate-pulse">03:10 Left</span>
          </div>
        </div>

        <div class="p-4 space-y-3">
          <!-- Original Card -->
          <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Original Record:</div>
            <div class="text-sm font-black text-slate-800 mt-0.5">DM-11-2345 (Thikana Paribahan)</div>
            <div class="text-xs text-slate-600">Initial Count: Sitting 28 · Standing 14 (10:42 AM)</div>
          </div>

          <!-- Pre-filled modified counters -->
          <div class="bg-white p-3.5 rounded-2xl border-2 border-emerald-500 shadow-sm space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black text-[#0F7B4F]">Adjust Counts / সংখ্যা পরিবর্তন:</span>
              <span class="text-[10px] text-emerald-600 font-bold">Highlighted</span>
            </div>

            <!-- Sitting -->
            <div class="flex items-center justify-between p-2 bg-emerald-50/50 rounded-xl border border-emerald-200">
              <span class="text-xs font-bold text-slate-800">Sitting / বসা:</span>
              <div class="flex items-center gap-3">
                <button class="w-8 h-8 rounded-lg bg-white border border-slate-300 font-black">−</button>
                <span class="text-xl font-black text-[#0F7B4F]">30</span>
                <button class="w-8 h-8 rounded-lg bg-[#0F7B4F] text-white font-black">+</button>
              </div>
            </div>

            <!-- Standing -->
            <div class="flex items-center justify-between p-2 bg-emerald-50/50 rounded-xl border border-emerald-200">
              <span class="text-xs font-bold text-slate-800">Standing / দাঁড়ানো:</span>
              <div class="flex items-center gap-3">
                <button class="w-8 h-8 rounded-lg bg-white border border-slate-300 font-black">−</button>
                <span class="text-xl font-black text-[#F5A524]">12</span>
                <button class="w-8 h-8 rounded-lg bg-[#0F7B4F] text-white font-black">+</button>
              </div>
            </div>
          </div>

          <!-- Reason Dropdown -->
          <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
            <label class="text-xs font-bold text-slate-700 block mb-1">Reason for Correction *</label>
            <select class="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800">
              <option>Typing mistake / টাইপিং ভুল</option>
              <option>Wrong bus selected</option>
              <option>Passenger boarded after count</option>
              <option>Other</option>
            </select>
          </div>

          <!-- Bottom Sheet Confirmation Preview -->
          <div class="bg-rose-50 border-2 border-rose-300 p-3 rounded-2xl text-center">
            <span class="text-xs font-extrabold text-rose-800 block">Void Entry? / এই এন্ট্রি বাতিল করবেন?</span>
            <span class="text-[10px] text-rose-600 block mt-0.5">This cannot be undone. Audit log will record this action.</span>
          </div>

          <!-- Dual Buttons -->
          <div class="grid grid-cols-2 gap-2 pt-1">
            <button class="py-3 bg-[#0F7B4F] text-white rounded-xl text-xs font-extrabold shadow-md">
              Save Correction
            </button>
            <button class="py-3 border-2 border-[#D64545] text-[#D64545] rounded-xl text-xs font-extrabold">
              Void Entry / বাতিল
            </button>
          </div>
          <div class="text-[9px] text-slate-400 text-center">All changes are digitally logged with checker ID & GPS timestamp.</div>
        </div>
        """
    },

    # C9: Offline Queue and Sync
    "C09_offline_queue_sync": {
        "nav": checker_nav("sync"),
        "content": """
        <!-- Offline Amber Top Bar -->
        <div class="bg-[#F5A524] text-slate-950 px-4 pt-3 pb-4 shadow-sm">
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.94 0 11.66 0 15c0 3.86 3.14 7 7 7h11.73l2 2 1.41-1.41L4.41 3.86 3 5.27zM7 20c-2.76 0-5-2.24-5-5 0-2.64 2.05-4.78 4.65-4.96l9.62 9.62L7 20z"/></svg>
            <div>
              <h1 class="text-lg font-black">You Are Offline</h1>
              <span class="text-xs text-amber-950 font-medium bengali">অফলাইন মোড চালু রয়েছে</span>
            </div>
          </div>
          <p class="text-xs text-amber-950 mt-2 font-medium">
            Entries are saved locally on this device. They will be submitted automatically with original timestamp when signal returns.
          </p>
        </div>

        <div class="p-4 space-y-3">
          <!-- Big Counter Block -->
          <div class="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm text-center">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Local Storage Queue</span>
            <div class="text-4xl font-black text-[#F5A524] my-1">4 entries waiting</div>
            <span class="text-xs text-slate-400 bengali">৪টি এন্ট্রি সিঙ্কের অপেক্ষায়</span>
          </div>

          <!-- Disabled Sync Button with offline hint -->
          <div>
            <button class="w-full h-14 bg-slate-300 text-slate-500 rounded-xl font-black text-sm flex items-center justify-center gap-2 cursor-not-allowed">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>
              <span>Sync Now / এখনই সিঙ্ক করুন (Waiting for network)</span>
            </button>
            <div class="text-[10px] text-slate-400 text-center mt-1">Last synced successfully at 10:12 AM</div>
          </div>

          <!-- Queued Entries List -->
          <div class="space-y-2">
            <div class="text-xs font-bold text-slate-700 px-1">Queued Records / পেন্ডিং রেকর্ডসমূহ</div>

            <div class="bg-white p-2.5 rounded-xl border border-amber-200 flex justify-between items-center shadow-xs">
              <div>
                <span class="text-xs font-black text-slate-900">DM-11-2345 (Thikana)</span>
                <span class="text-[10px] text-slate-500 block">S: 28 · St: 14 · Original time: 10:31 AM</span>
              </div>
              <span class="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">Waiting</span>
            </div>

            <div class="bg-white p-2.5 rounded-xl border border-amber-200 flex justify-between items-center shadow-xs">
              <div>
                <span class="text-xs font-black text-slate-900">DM-11-9876 (Bihanga)</span>
                <span class="text-[10px] text-slate-500 block">S: 36 · St: 10 · Original time: 10:25 AM</span>
              </div>
              <span class="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">Waiting</span>
            </div>

            <div class="bg-white p-2.5 rounded-xl border border-slate-200 flex justify-between items-center opacity-75">
              <div>
                <span class="text-xs font-black text-slate-800">DM-11-1234 (Alif)</span>
                <span class="text-[10px] text-slate-500 block">S: 22 · St: 5 · Original time: 10:19 AM</span>
              </div>
              <span class="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">Waiting</span>
            </div>
          </div>
        </div>
        """
    },

    # C10: Checker Profile and Settings
    "C10_checker_profile_settings": {
        "nav": checker_nav("profile"),
        "content": """
        <!-- Top App Bar -->
        <div class="bg-[#0F7B4F] text-white px-4 pt-4 pb-6">
          <div class="flex items-center justify-between">
            <h1 class="text-xl font-bold tracking-tight">Checker Profile</h1>
            <span class="text-xs bg-emerald-800/80 px-2.5 py-1 rounded-full text-emerald-100 font-semibold">Active Shift</span>
          </div>

          <!-- User Card -->
          <div class="flex items-center gap-3.5 mt-4">
            <div class="w-14 h-14 rounded-full bg-white text-[#0F7B4F] font-black text-xl flex items-center justify-center border-2 border-emerald-300 shadow">
              RU
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-base font-bold">Rahim Uddin</span>
                <span class="px-2 py-0.5 bg-emerald-400/30 text-white border border-emerald-300/40 text-[10px] font-bold rounded-full">
                  ID: #CHK-8801
                </span>
              </div>
              <div class="text-xs text-emerald-100 mt-0.5">+880 1812-345678</div>
              <span class="text-[10px] text-emerald-200 font-medium">Assigned by Dhaka Bus Association</span>
            </div>
          </div>
        </div>

        <div class="p-4 space-y-3.5">
          <!-- Duty Context Cards -->
          <div class="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
            <div class="flex justify-between items-center text-xs">
              <span class="text-slate-500 font-medium">Assigned Stop / চেকপয়েন্ট</span>
              <span class="font-extrabold text-slate-900">Mirpur 10 (মিরপুর ১০)</span>
            </div>
            <div class="flex justify-between items-center text-xs border-t pt-2">
              <span class="text-slate-500 font-medium">Authorized Route</span>
              <span class="font-extrabold text-slate-900">Mirpur 10 ↔ Motijheel</span>
            </div>
            <div class="flex justify-between items-center text-xs border-t pt-2">
              <span class="text-slate-500 font-medium">Current Shift</span>
              <span class="font-extrabold text-[#0F7B4F]">6:00 AM – 2:00 PM (Morning)</span>
            </div>
          </div>

          <!-- Checker Settings -->
          <div class="bg-white rounded-2xl border border-slate-200/90 shadow-sm divide-y divide-slate-100 overflow-hidden">
            <!-- Large Text Mode -->
            <div class="p-3.5 flex items-center justify-between">
              <div>
                <div class="text-xs font-bold text-slate-800">Large Text Mode / বড় হরফ</div>
                <div class="text-[10px] text-slate-500">Enhanced legibility for direct sunlight</div>
              </div>
              <div class="w-10 h-5 bg-[#0F7B4F] rounded-full p-0.5 flex justify-end items-center cursor-pointer">
                <div class="w-4 h-4 bg-white rounded-full shadow"></div>
              </div>
            </div>

            <!-- Language -->
            <div class="p-3.5 flex items-center justify-between">
              <div>
                <div class="text-xs font-bold text-slate-800">Language / ভাষা</div>
                <div class="text-[10px] text-slate-500">English & বাংলা</div>
              </div>
              <div class="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-bold">
                <span class="px-2 py-1 text-slate-500">EN</span>
                <span class="px-2 py-1 rounded bg-[#0F7B4F] text-white shadow-xs bengali">বাং</span>
              </div>
            </div>

            <!-- Change Password -->
            <div class="p-3.5 flex items-center justify-between cursor-pointer">
              <div class="text-xs font-bold text-slate-800">Change PIN / Password</div>
              <svg class="w-4 h-4 text-slate-400" viewBox="0 0 24 24"><path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
            </div>

            <!-- Help / Admin Contact -->
            <div class="p-3.5 flex items-center justify-between cursor-pointer">
              <div>
                <div class="text-xs font-bold text-slate-800">Help / Contact Admin</div>
                <div class="text-[10px] text-slate-500">Call Dispatch Support: 16216</div>
              </div>
              <svg class="w-4 h-4 text-slate-400" viewBox="0 0 24 24"><path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
            </div>
          </div>

          <!-- Unsynced Entries Safe Note -->
          <div class="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-center gap-2 text-xs text-[#0F7B4F] font-bold">
            <span>✓ You have 0 unsynced entries. Safe to log out.</span>
          </div>

          <!-- Log Out Button -->
          <button class="w-full py-3 border-2 border-[#D64545] text-[#D64545] rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-rose-50 transition">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
            <span>Log Out / লগআউট</span>
          </button>
        </div>
        """
    }
}

def render_screen(screen_id, config):
    output_png = os.path.join(SCREENS_DIR, f"{screen_id}.png")
    html_content = HTML_WRAPPER.replace("__CONTENT__", config["content"]).replace("__BOTTOM_NAV__", config["nav"])
    
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as f:
        f.write(html_content)
        temp_html = f.name

    try:
        cmd = [
            CHROME_BIN,
            "--headless",
            "--disable-gpu",
            "--hide-scrollbars",
            "--force-device-scale-factor=2",
            "--window-size=390,844",
            f"--screenshot={output_png}",
            f"file://{temp_html}"
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if os.path.exists(output_png):
            print(f"Rendered: {screen_id} -> {output_png} ({os.path.getsize(output_png)} bytes)")
        else:
            print(f"Error rendering {screen_id}: {res.stderr}")
    finally:
        if os.path.exists(temp_html):
            os.remove(temp_html)

if __name__ == "__main__":
    for s_id, conf in SCREENS.items():
        render_screen(s_id, conf)
