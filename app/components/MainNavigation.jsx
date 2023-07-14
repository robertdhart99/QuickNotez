import { NavLink } from '@remix-run/react';   
//navlink lets the link that is currently active receive an active css class (gives it a special style)

function MainNavigation() {
    return (
        <>
             <div className="banner">
                <h1 className="title">QuickNotez</h1>
            </div>
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
        </>
    );
}

export default MainNavigation;
