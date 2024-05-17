import React, {useContext} from "react";
import { getFullYear, getFooterCopy } from '../utils/utils';
import './Footer.css';
import AppContext from '../App/AppContext';

function Footer() {
  const value = useContext(AppContext);
  return (
    <>
      <footer className="App-footer">
        <p>Copyright {getFullYear()} - {getFooterCopy(true)}</p>
        {value.user.isLoggedIn ? (
            <p><a href="">Contact us</a></p>
          ) : null}
      </footer>
    </>
  );
}

export default Footer;
