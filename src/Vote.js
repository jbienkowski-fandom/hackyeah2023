import React, {useEffect, useState, useRef} from "react";
import {Link} from "react-router-dom";
import Help from "./Help";
import Projects from "./Projects";
import Ranking from "./Ranking";

function Vote() {
    const [menuExpanded, setMenuExpanded] = useState(false);
    const [displayHelp, setDisplayHelp] = useState(sessionStorage.getItem('displayHelp') !== 'false');
    const hideHelp = () => {
        setDisplayHelp(false);
        sessionStorage.setItem('displayHelp', 'false');
    };
    const timeoutRef = useRef(null);
    useEffect(() => {
        // Functions to open and close a modal
        function openModal($el) {
            $el.classList.add('is-active');
        }

        function closeModal($el) {
            $el.classList.remove('is-active');
        }

        function closeAllModals() {
            (document.querySelectorAll('.modal') || []).forEach(($modal) => {
                closeModal($modal);
            });
        }

        // Add a click event on buttons to open a specific modal
        (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
            const modal = $trigger.dataset.target;
            const $target = document.getElementById(modal);

            $trigger.addEventListener('click', () => {
                openModal($target);
            });
        });

        // Add a click event on various child elements to close the parent modal
        (document.querySelectorAll(
            '.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(
            ($close) => {
                const $target = $close.closest('.modal');

                $close.addEventListener('click', () => {
                    closeModal($target);
                });
            });

        // Add a keyboard event to close all modals
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Escape') {
                closeAllModals();
            }
        });
        timeoutRef.current = setTimeout(() => hideHelp(), 5000);
    }, []);
    return (<>
        <nav className="navbar is-transparent">
            <div className="container">
                <div className="navbar-brand">
                    <Link to={'/'} className="navbar-item">
                        <img src="https://mapadotacji.gov.pl/wp-content/uploads/2019/02/logo.png" alt="logo"/>
                    </Link>
                    <a role="button" className={`navbar-burger ${menuExpanded ? 'is-active' : ''}`} aria-label="menu"
                       aria-expanded="false" data-target="navVoteMenu" onClick={() => setMenuExpanded(!menuExpanded)}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navVoteMenu" className={`navbar-menu ${menuExpanded ? 'is-active' : ''}`}>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button className="button is-dark js-modal-trigger" data-target="modal-ranking">
                                    Ranking
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <div id="modal-ranking" className="modal">
            <div className="modal-background"></div>

            <div className="modal-content">
                <Ranking/>
            </div>

            <button className="modal-close is-large" aria-label="close"></button>
        </div>
        {displayHelp ? <Help onClick={() => {
            clearTimeout(timeoutRef.current);
            hideHelp();
        }}/> : <Projects/>}
    </>);
}

export default Vote;
