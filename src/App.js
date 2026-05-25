import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import PMVikas from './pages/PMVikas';
import Blog from './pages/Blog';
import './App.css';

// ── Global Data Store ──────────────────────────────────────────────────────
const initialData = {
  profile: {
    name: 'Asifa Ahammed E',
    tagline: 'IoT Engineer in the Making',
    bio: 'First-year B.Tech student passionate about the Internet of Things. Currently an IoT Assistant at PM-VIKAS IIITK, building real-world embedded systems and smart solutions. I learn by doing — and this is where I document the journey.',
    email: 'asifa@example.com',
    github: 'github.com/asifa',
    linkedin: 'linkedin.com/in/asifa',
    location: 'Kerala, India',
    course: 'IoT Assistant Course — PM-VIKAS, IIITK',
    degree: 'Bachelor of Technology (In Progress)',
  },
  skills: [
    { name: 'IoT Fundamentals', level: 70 },
    { name: 'Arduino / Embedded C', level: 60 },
    { name: 'Python', level: 55 },
    { name: 'Circuit Design', level: 50 },
    { name: 'Sensor Integration', level: 65 },
    { name: 'Data Logging', level: 45 },
  ],
  projects: [
    {
      id: 1,
      title: 'Smart Plant Monitor',
      description: 'An IoT system using soil moisture sensors and Arduino to monitor plant health and send alerts via serial output.',
      tech: ['Arduino', 'C++', 'Soil Sensor', 'LCD Display'],
      date: '2025-03',
      category: 'IoT',
      status: 'Completed',
      highlight: true,
    },
    {
      id: 2,
      title: 'Temperature Logger',
      description: 'Built a real-time temperature & humidity logger using DHT11 sensor with data visualization on a 16x2 LCD.',
      tech: ['Arduino', 'DHT11', 'LCD', 'Embedded C'],
      date: '2025-02',
      category: 'Embedded',
      status: 'Completed',
      highlight: false,
    },
  ],
  achievements: [
    {
      id: 1,
      title: 'PM-VIKAS IoT Assistant Selection',
      description: 'Selected among competitive applicants for the IoT Assistant course at IIIT Kottayam under PM-VIKAS scheme.',
      date: '2025-01',
      type: 'Award',
    },
    {
      id: 2,
      title: 'First Arduino Project — Live Demo',
      description: 'Successfully demonstrated a working embedded system project in the first month of the course.',
      date: '2025-02',
      type: 'Milestone',
    },
  ],
  pmvikasLogs: [
    {
      id: 1,
      week: 'Week 1',
      title: 'Introduction to IoT & Setup',
      date: '2025-01-15',
      learned: 'Covered IoT architecture basics, set up Arduino IDE, and ran first blink program.',
      tools: ['Arduino IDE', 'Arduino UNO'],
      status: 'Done',
    },
    {
      id: 2,
      week: 'Week 2',
      title: 'Sensors & Actuators',
      date: '2025-01-22',
      learned: 'Worked with DHT11, ultrasonic sensors, and servo motors. Built a simple distance alert.',
      tools: ['DHT11', 'HC-SR04', 'Servo'],
      status: 'Done',
    },
  ],
  blogPosts: [
    {
      id: 1,
      title: 'Why I Chose IoT as My First Specialization',
      date: '2025-02-10',
      category: 'Reflection',
      content: `When I first heard about the PM-VIKAS IoT course at IIITK, something clicked. I had always been curious about how everyday objects could become "smart" — how a simple sensor could turn a plant pot into something that tells you when it's thirsty.

As a first-year B.Tech student, I knew I wanted to build things, not just study theory. IoT felt like the perfect bridge between the physical world and the digital one.

The first week of the course was overwhelming in the best way. Setting up Arduino IDE, running my first blink program, watching an LED turn on because of code I wrote — it sounds small, but it felt enormous.

I'm documenting this journey here so I can look back on how far I've come. And maybe, someone else starting out will find this useful too.`,
      readTime: '3 min',
    },
  ],
};

export const DataContext = createContext(null);
export const useData = () => useContext(DataContext);

// ── Nav Component ──────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  React.useEffect(() => setOpen(false), [location]);

  const links = [
    { to: '/', label: 'Portfolio', icon: '◈' },
    { to: '/pm-vikas', label: 'PM Vikas', icon: '◉' },
    { to: '/blog', label: 'Blog', icon: '◎' },
  ];

  return (
    <nav className="nav">
      <div className="nav-brand">
        <span className="nav-initials">AE</span>
        <span className="nav-name">Asifa Ahammed E</span>
      </div>

      <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        <span className={open ? 'open' : ''}></span>
        <span className={open ? 'open' : ''}></span>
        <span className={open ? 'open' : ''}></span>
      </button>

      <ul className={`nav-links ${open ? 'mobile-open' : ''}`}>
        {links.map(link => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <span className="nav-link-icon">{link.icon}</span>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  const [data, setData] = useState(initialData);

  const updateData = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <DataContext.Provider value={{ data, updateData }}>
      <Router>
        <div className="app">
          <Nav />
          <main className="main">
            <Routes>
              <Route path="/" element={<Portfolio />} />
              <Route path="/pm-vikas" element={<PMVikas />} />
              <Route path="/blog" element={<Blog />} />
            </Routes>
          </main>
          <footer className="footer">
            <p>
              <span className="footer-name">Asifa Ahammed E</span>
              <span className="footer-sep">·</span>
              IoT Assistant, PM-VIKAS IIITK
              <span className="footer-sep">·</span>
              Built with React
            </p>
          </footer>
        </div>
      </Router>
    </DataContext.Provider>
  );
}
