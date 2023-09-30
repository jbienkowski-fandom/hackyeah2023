import React from "react";

function Help(props) {
    return (
        <section className="hero is-fullheight is-info">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <p className="title">
                        Głosowanie
                    </p>
                    <p className="subtitle">
                        Kliknij projekt, który jest Twoim zdaniem ciekawszy
                    </p>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        props.onClick();
                    }}>Rozumiem, zaczynajmy!</a>
                </div>
            </div>
        </section>
    )
}

export default Help;
