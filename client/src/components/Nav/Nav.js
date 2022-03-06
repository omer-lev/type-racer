import { GiKeyboard } from 'react-icons/gi';
import { VscAccount } from 'react-icons/vsc';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineBrightness6 } from 'react-icons/md';

import './Nav.css';

const Nav = () => {
  return (
    <nav>
        <div className="logo">
            <a href='/'>
                <GiKeyboard /> <span>TYPE</span>RIDER
            </a>
        </div>

        <div className="links">
            <a href="/profile"><VscAccount /></a>
            <a href="#"><MdOutlineBrightness6 /></a>
            <a href="/settings"><IoSettingsOutline /></a>
        </div>
    </nav>
  )
}

export default Nav;