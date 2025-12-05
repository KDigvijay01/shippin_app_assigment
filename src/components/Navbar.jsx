import React from 'react'
import { NavLink } from 'react-router-dom'


export default function Navbar() {
    return (
        <nav className="nav">
            <div className="brand">Shipping Box</div>
            <div className="links">
                <NavLink to="/add" className={({ isActive }) => isActive ? 'active' : ''}>Add Box</NavLink>
                <NavLink to="/list" className={({ isActive }) => isActive ? 'active' : ''}>List Boxes</NavLink>
            </div>
        </nav>
    )
}