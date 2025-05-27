import { BiSolidOffer, BiSupport } from "react-icons/bi";
import { SlWallet } from "react-icons/sl";
import { BsHouseDoorFill, BsSunFill, BsMoonStarsFill, BsPersonCircle, BsQuestionCircle } from 'react-icons/bs';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import useIsMobile from '../utils/useMobile';
import { useLocation } from 'react-router-dom';

export default function Layout({ children }) {
    const { isAuthenticated, user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const isMobile = useIsMobile();

    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className="layout-wrapper bg">
            <header className={`shadow-sm sticky-top bg1 ${isMobile ? "px-2" : ""}`}>
                <nav className="container navbar navbar-expand-lg navbar-light justify-content-between py-2">
                    <a className="navbar-brand fw-bold fs-4 text-primary" href="/">Ghoom <span className="text-success">India</span></a>
                    <ul className="navbar-nav flex-row gap-3 align-items-center">
                        {!isMobile && <>
                            <li className="nav-item">
                                <a className={`nav-link d-flex align-items-center gap-1 ${isActive('/offers') ? 'active' : ''}`} href="/">
                                    <BiSolidOffer /> Offers
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className={`nav-link d-flex align-items-center gap-1 ${isActive('/myTrip') ? 'active' : ''}`} href="/">
                                    <SlWallet /> My Trips
                                </a>
                            </li>

                            {isAuthenticated ? (
                                <li className="nav-item">
                                    <a className={`nav-link d-flex align-items-center gap-1 ${isActive('/account') ? 'active' : ''}`} href="/account">
                                        <BsPersonCircle />&nbsp;{user?.name}
                                    </a>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <a className={`nav-link d-flex align-items-center gap-1 ${isActive('/login') ? 'active' : ''}`} href="/login">
                                        <BsPersonCircle />&nbsp;Login
                                    </a>
                                </li>
                            )}
                        </>}

                        <li className="nav-item">
                            <a className={`nav-link d-flex align-items-center gap-1 ${isActive('/support') ? 'active' : ''}`} href="/">
                                <BiSupport /> {!isMobile && "Support"}
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className={`nav-link d-flex align-items-center gap-1 ${isActive('/help') ? 'active' : ''}`} href="/">
                                <BsQuestionCircle /> {!isMobile && "Help"}
                            </a>
                        </li>

                        <li className="nav-item">
                            <button className="btn btn-outline-secondary d-flex align-items-center gap-1" onClick={toggleTheme} aria-label="Toggle Theme">
                                {theme === 'light' ? <BsMoonStarsFill /> : <BsSunFill />}
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>

            {isMobile &&
                <nav className="bg1 fixed-bottom border-top py-2 shadow-sm bottom-nav">
                    <div className="container d-flex justify-content-around text-center">
                        <a href="/" className={`small ${isActive('/') ? 'active' : ''}`}>
                            <BsHouseDoorFill className="fs-4" />
                            <div>Home</div>
                        </a>
                        <a href="/" className={`small ${isActive('/offer') ? 'active' : ''}`}>
                            <BiSolidOffer className="fs-4" />
                            <div>Offers</div>
                        </a>
                        <a href="/" className={`small ${isActive('/myTrip') ? 'active' : ''}`}>
                            <SlWallet className="fs-4" />
                            <div>My Trip</div>
                        </a>
                        {isAuthenticated ? (
                            <a href="/account" className={`small ${isActive('/account') ? 'active' : ''}`}>
                                <BsPersonCircle className="fs-4" />
                                <div>Account</div>
                            </a>
                        ) : (
                            <a href="/login" className={`small ${isActive('/login') ? 'active' : ''}`}>
                                <BsPersonCircle className="fs-4" />
                                <div>Login</div>
                            </a>
                        )}
                    </div>
                </nav>
            }

            {/* Page Content */}
            <main className="container my-4">{children}</main>

            {/* Footer */}
            <footer className="footer mt-auto pt-5 border-top">
                <div className="container px-4 px-md-3" style={{ paddingBottom: isMobile ? "80px" : "20px" }}>
                    <div className="row gy-2">
                        <div className="col-12 col-md-3">
                            <h6 className="fw-bold mb-2">About</h6>
                            <ul className="list-unstyled small">
                                <li><a className="footer-nav" href="/">Careers</a></li>
                                <li><a className="footer-nav" href="/">Blog</a></li>
                                <li><a className="footer-nav" href="/">Contact</a></li>
                            </ul>
                        </div>

                        <div className="col-12 col-md-3">
                            <h6 className="fw-bold mb-2">Support</h6>
                            <ul className="list-unstyled small">
                                <li><a className="footer-nav" href="/">Help Center</a></li>
                                <li><a className="footer-nav" href="/">Cancellation</a></li>
                                <li><a className="footer-nav" href="/">Refund Policy</a></li>
                            </ul>
                        </div>

                        <div className="col-12 col-md-3">
                            <h6 className="fw-bold mb-2">Legal</h6>
                            <ul className="list-unstyled small">
                                <li><a className="footer-nav" href="/">Terms</a></li>
                                <li><a className="footer-nav" href="/">Privacy</a></li>
                            </ul>
                        </div>

                        <div className="col-12 col-md-3">
                            <h6 className="fw-bold mb-2">Follow Us</h6>
                            <div className="d-flex gap-3">
                                <a href="#" className="text-muted fs-5" aria-label="Facebook">
                                    <FaFacebookF />
                                </a>
                                <a href="#" className="text-muted fs-5" aria-label="Twitter">
                                    <FaTwitter />
                                </a>
                                <a href="#" className="text-muted fs-5" aria-label="Instagram">
                                    <FaInstagram />
                                </a>
                            </div>
                        </div>
                    </div>

                    <hr className="my-4" />
                    <p className="text-center small mb-0">&copy; {new Date().getFullYear()} Ghoom India Pvt Ltd. All rights reserved.</p>
                </div>
            </footer>

        </div>
    );
}