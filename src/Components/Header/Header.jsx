import React from "react";
import "./Header.css";

export default () =>
    <header>
        <h1>Conway's Game of Life</h1>
        <div className="nav-wrapper">
            <nav>
                <ul>
                    <li><button>play</button></li>
                    <li><button>pause</button></li>
                    <li><button>reset</button></li>
                </ul>
            </nav>
        </div>
    </header>