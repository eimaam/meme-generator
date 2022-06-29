import React from "react"


function Nav(props){
    const navigate = ["About","Get More Apps"]
    const navListing = navigate.map(navItems => <li key={props.val}>{navItems}</li>)
    return(
        <header>
            <nav>
                <ul>
                    {navListing}
                </ul>
            </nav>
        </header>
    )
}

export default Nav;