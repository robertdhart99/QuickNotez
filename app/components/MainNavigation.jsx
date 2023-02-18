import { NavLink } from '@remix-run/react';   
//navlink lets the link that is currently active receieve a active css class (gives it a special style)

function MainNavigation() {
    return (
        <nav id="main-navigation">
            <ul>
                <li className="nav-item">
                    <NavLink to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/notes">My Notes</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default MainNavigation;