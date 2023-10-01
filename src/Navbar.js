import {useState} from 'react';
import {Link} from 'react-router-dom';

function Navbar(props) {
    const { buttonsContent } = props;
    const [menuExpanded, setMenuExpanded] = useState(false);

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-brand">
                    <Link to={'/'} className="navbar-item logo">
                        Remarkable Places<span>UE</span>
                    </Link>
                    <a role="button" className={`navbar-burger ${menuExpanded ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="navMenu" onClick={() => setMenuExpanded(!menuExpanded)}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navMenu" className={`navbar-menu ${menuExpanded ? 'is-active' : ''}`}>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                {buttonsContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;