import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const LANGUAGES = [
    { code: 'en-IN', label: 'English' },
    { code: 'hi-IN', label: 'हिन्दी' },
    { code: 'ta-IN', label: 'தமிழ்' },
    { code: 'te-IN', label: 'తెలుగు' },
    { code: 'kn-IN', label: 'ಕನ್ನಡ' },
    { code: 'ml-IN', label: 'മലയാളം' },
    { code: 'mr-IN', label: 'मराठी' },
    { code: 'bn-IN', label: 'বাংলা' },
    { code: 'gu-IN', label: 'ગુજરાતી' },
    { code: 'pa-IN', label: 'ਪੰਜਾਬੀ' },
    { code: 'od-IN', label: 'ଓଡ଼ିଆ' },
];

const Navbar = ({ user, onOpenAuth, onLogout, currentLanguage, onLanguageChange }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const langMenuRef = useRef(null);
    const navigate = useNavigate();

    // Close lang menu on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
                setIsLangMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleLogout = () => {
        setIsUserMenuOpen(false);
        setIsMobileMenuOpen(false);
        onLogout();
        navigate('/');
    };

    const handleGoToDashboard = () => {
        setIsUserMenuOpen(false);
        if (user?.role === 'athlete') navigate('/dashboard/athlete');
        else if (user?.role === 'recruiter') navigate('/dashboard/recruiter');
    };

    const tabs = [
        { name: 'ABOUT US', path: '/about' },
        { name: 'FOR ATHLETES', path: '/athletes' },
        { name: 'FOR SCOUTS', path: '/scouts' },
        { name: 'BY SPORT', path: '/sports' },
        { name: 'BY REGION', path: '/regions' },
    ];

    return (
        <nav className="navbar-container">
            <div className="navbar-logo">
                <Link to="/" style={{ textDecoration: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="logo-text">SCOUTRIX<span className="logo-accent">.</span></span>
                </Link>
            </div>

            {/* Nav tabs — only visible to guests (not logged-in users) */}
            {!user && (
                <div className={`navbar-tabs ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
                    {tabs.map((tab, idx) => (
                        <Link key={idx} to={tab.path} className="navbar-tab" onClick={() => setIsMobileMenuOpen(false)}>
                            <span>{tab.name}</span>
                        </Link>
                    ))}

                    {/* Mobile: Log In button */}
                    <button className="btn-login-unified mobile-login-btn" onClick={() => {
                        setIsMobileMenuOpen(false);
                        onOpenAuth();
                    }}>
                        LOG IN
                    </button>
                </div>
            )}

            <div className="navbar-actions">
                {/* Language Selector */}
                <div className="lang-selector-wrap" ref={langMenuRef}>
                    <button
                        className="lang-selector-btn"
                        onClick={() => setIsLangMenuOpen(v => !v)}
                        aria-label="Select Language"
                        title="Translate Page"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                        <span className="lang-label">{LANGUAGES.find(l => l.code === currentLanguage)?.label ?? 'EN'}</span>
                    </button>
                    {isLangMenuOpen && (
                        <div className="lang-dropdown">
                            {LANGUAGES.map(lang => (
                                <button
                                    key={lang.code}
                                    className={`lang-option ${currentLanguage === lang.code ? 'active' : ''}`}
                                    onClick={() => {
                                        onLanguageChange(lang.code);
                                        setIsLangMenuOpen(false);
                                    }}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                {user ? (
                    <div className="user-menu-wrap">
                        <button
                            className="user-avatar-btn"
                            onClick={() => setIsUserMenuOpen(v => !v)}
                            aria-label="User menu"
                        >
                            <div className="user-avatar-circle">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="user-info-inline">
                                <span className="user-name-nav">{user.name?.split(' ')[0]}</span>
                                <span className="user-role-nav">{user.role}</span>
                            </div>
                            <svg className={`chevron-icon ${isUserMenuOpen ? 'open' : ''}`} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>

                        {isUserMenuOpen && (
                            <div className="user-dropdown">
                                <div className="dropdown-header">
                                    <span className="dropdown-name">{user.name}</span>
                                    <span className="dropdown-email">{user.email}</span>
                                </div>
                                <hr className="dropdown-divider" />
                                <button className="dropdown-item" onClick={handleGoToDashboard}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
                                    Dashboard
                                </button>
                                {user?.role === 'recruiter' && (
                                    <button className="dropdown-item" onClick={() => { setIsUserMenuOpen(false); navigate('/saved-profiles'); }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
                                        Saved Profiles
                                    </button>
                                )}
                                <button className="dropdown-item logout-item" onClick={handleLogout}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                                    Log Out
                                </button>
                            </div>
                        )}

                        {/* Backdrop to close dropdown */}
                        {isUserMenuOpen && (
                            <div className="dropdown-backdrop" onClick={() => setIsUserMenuOpen(false)} />
                        )}
                    </div>
                ) : (
                    <button className="btn-login-unified desktop-login-btn" onClick={onOpenAuth}>
                        LOG IN
                    </button>
                )}
            </div>

            <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
                <span className={`line line1 ${isMobileMenuOpen ? 'active' : ''}`}></span>
                <span className={`line line2 ${isMobileMenuOpen ? 'active' : ''}`}></span>
                <span className={`line line3 ${isMobileMenuOpen ? 'active' : ''}`}></span>
            </div>
        </nav>
    );
};

export default Navbar;
