import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
  Link
} from 'react-router-dom';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import './App.css';

const MEMBERS = [
  {
    name: 'Jisoo',
    catchPhrase: 'Sooya! The mood maker!',
    webhookUrl: 'WEBHOOK_JISOO',
    bio: 'Jisoo is the eldest member of BlackPink, known for her vocals, visuals, and charming personality.',
    image: process.env.PUBLIC_URL + '/jisoo.png',
  },
  {
    name: 'Jennie',
    catchPhrase: 'Jennie Ruby Jane!',
    webhookUrl: 'WEBHOOK_JENNIE',
    bio: 'Jennie is the main rapper and vocalist of BlackPink, famous for her charisma and stage presence.',
    image: process.env.PUBLIC_URL + '/jennie.jpg',
  },
  {
    name: 'Rosé',
    catchPhrase: 'Rosie Posie!',
    webhookUrl: 'WEBHOOK_ROSÉ',
    bio: 'Rosé is the main vocalist and lead dancer of BlackPink, known for her unique voice and musicality.',
    image: process.env.PUBLIC_URL + '/rose.jpg',
  },
  {
    name: 'Lisa',
    catchPhrase: 'Lalisa, love me!',
    webhookUrl: 'WEBHOOK_LISA',
    bio: 'Lisa is the main dancer and rapper of BlackPink, celebrated for her dance skills and international appeal.',
    image: process.env.PUBLIC_URL + '/lisa.jpg',
  },
];

const BRET = {
  name: 'Bret Hart',
  image: process.env.PUBLIC_URL + '/bret_hart.jpg',
  bio: 'Bret "The Hitman" Hart, legendary wrestler and style icon, rocks the BlackPink tights with pride! Excellence of execution meets excellence of fashion.',
  webhookUrl: 'WEBHOOK_BRET', // placeholder
};

function NavBar() {
  return (
    <nav className="bp-navbar">
      <Link to="/" className="bp-nav-link">Home</Link>
      {MEMBERS.map((member, idx) => (
        <Link
          key={member.name}
          to={`/member/${idx}`}
          className="bp-nav-link"
        >
          {member.name}
        </Link>
      ))}
      <Link to="/bret" className="bp-nav-link">Bret Hart</Link>
    </nav>
  );
}

function MainPage() {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="bp-title">BlackPink AI Chat</h1>
      <div className="blink-chat-container">
        {MEMBERS.map((member, idx) => (
          <div key={member.name} className="member-column">
            <h2
              onClick={() => navigate(`/member/${idx}`)}
              className="member-name"
              style={{ cursor: 'pointer' }}
            >
              {member.name}
            </h2>
            <p className="catch-phrase">{member.catchPhrase}</p>
          </div>
        ))}
      </div>
      <div className="blackpink-group-img-wrapper">
        <img
          src={process.env.PUBLIC_URL + '/blackpink.jpg'}
          alt="BlackPink group"
          className="blackpink-group-img"
        />
      </div>
    </>
  );
}

function MemberDetail() {
  const { id } = useParams();
  const idx = parseInt(id, 10);
  const member = MEMBERS[idx];
  const [chatOpen, setChatOpen] = useState(false);
  const chatTargetId = `n8n-chat-detail-${idx}`;

  useEffect(() => {
    document.querySelectorAll('.n8n-chat-root').forEach(el => el.remove());
    if (!member || !chatOpen) return;
    const interval = setInterval(() => {
      const targetDiv = document.getElementById(chatTargetId);
      console.log('Target div:', targetDiv); // Debug line
      if (targetDiv) {
        createChat({
          webhookUrl: member.webhookUrl,
          webhookConfig: { method: 'POST', headers: {} },
          target: `#${chatTargetId}`,
          mode: 'window',
          chatInputKey: 'chatInput',
          chatSessionKey: 'sessionId',
          loadPreviousSession: true,
          metadata: {},
          showWelcomeScreen: false,
          defaultLanguage: 'en',
          initialMessages: [
            'BlackPink in your area!'
          ],
          i18n: {
            en: {
              title: 'BlackPink Chat',
              subtitle: `Chat with AI ${member.name}`,
              footer: '',
              getStarted: 'New Conversation',
              inputPlaceholder: 'Type your question..',
            },
          },
        });
        clearInterval(interval);
      }
    }, 50);
    return () => {
      clearInterval(interval);
      document.querySelectorAll('.n8n-chat-root').forEach(el => el.remove());
    };
  }, [member, chatOpen, chatTargetId]);

  if (!member) return <div>Member not found.</div>;

  return (
    <div className="member-detail-page">
      <h1 className="bp-title">{member.name}</h1>
      <div className="member-info-container">
        <img src={member.image} alt={member.name} className="member-photo-large" />
        <div className="member-bio-box">
          <div className="member-bio">{member.bio}</div>
        </div>
      </div>
      <h2 className="chat-title">Chat with {member.name}</h2>
      <div className="chat-expandable-container">
        <button className="chat-toggle-btn" onClick={() => setChatOpen(o => !o)}>
          {chatOpen ? 'Hide Chat' : 'Show Chat'}
        </button>
        {chatOpen && (
          <div className="chat-widget-container">
            <div id={chatTargetId} />
          </div>
        )}
      </div>
    </div>
  );
}

function BretHartPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const chatTargetId = 'n8n-chat-detail-bret';

  useEffect(() => {
    document.querySelectorAll('.n8n-chat-root').forEach(el => el.remove());
    if (!chatOpen) return;
    const interval = setInterval(() => {
      const targetDiv = document.getElementById(chatTargetId);
      if (targetDiv) {
        createChat({
          webhookUrl: BRET.webhookUrl,
          webhookConfig: { method: 'POST', headers: {} },
          target: `#${chatTargetId}`,
          mode: 'window',
          chatInputKey: 'chatInput',
          chatSessionKey: 'sessionId',
          loadPreviousSession: true,
          metadata: {},
          showWelcomeScreen: false,
          defaultLanguage: 'en',
          initialMessages: [
            'BlackPink in your area!'
          ],
          i18n: {
            en: {
              title: 'BlackPink Chat',
              subtitle: 'Chat with AI Bret Hart',
              footer: '',
              getStarted: 'New Conversation',
              inputPlaceholder: 'Type your question..',
            },
          },
        });
        clearInterval(interval);
      }
    }, 50);
    return () => {
      clearInterval(interval);
      document.querySelectorAll('.n8n-chat-root').forEach(el => el.remove());
    };
  }, [chatOpen, chatTargetId]);

  return (
    <div className="bret-page">
      <h1 className="bp-title">{BRET.name}</h1>
      <div className="bret-info-container">
        <img src={BRET.image} alt={BRET.name} className="bret-photo" />
        <div className="bret-bio-box">
          <div className="bret-bio">{BRET.bio}</div>
        </div>
      </div>
      <h2 className="chat-title">Chat with {BRET.name}</h2>
      <div className="chat-expandable-container">
        <button className="chat-toggle-btn" onClick={() => setChatOpen(o => !o)}>
          {chatOpen ? 'Hide Chat' : 'Show Chat'}
        </button>
        {chatOpen && (
          <div className="chat-widget-container">
            <div id={chatTargetId} />
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/member/:id" element={<MemberDetail />} />
        <Route path="/bret" element={<BretHartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
