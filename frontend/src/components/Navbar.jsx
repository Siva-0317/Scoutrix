import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onOpenAuth }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const tabs = [
        { name: 'ABOUT US', path: '/about' },
        { name: 'FOR ATHLETES', path: '/athletes' },
        { name: 'FOR SCOUTS', path: '/scouts' },
        { name: 'BY SPORT', path: '/sports' },
        { name: 'BY REGION', path: '/regions' }
    ];

    return (
        <nav className="navbar-container">
            <div className="navbar-logo">
                <Link to="/" style={{ textDecoration: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="logo-text">SCOUTRIX<span className="logo-accent">.</span></span>
                </Link>
            </div>

            <div className={`navbar-tabs ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
                {tabs.map((tab, idx) => (
                    <Link key={idx} to={tab.path} className="navbar-tab" onClick={() => setIsMobileMenuOpen(false)}>
                        <span>{tab.name}</span>
                    </Link>
                ))}
                {/* Mobile Login Button inside menu */}
                <button className="btn-login-unified mobile-login-btn" onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuth();
                }}>
                    LOG IN
                </button>
            </div>

            <div className="navbar-actions">
                <button className="btn-login-unified desktop-login-btn" onClick={onOpenAuth}>
                    LOG IN
                </button>
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
