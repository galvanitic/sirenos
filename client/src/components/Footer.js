import React, { Component } from 'react';
import Moment from 'react-moment';
import anchor from '../img/anchor-512.png'
import GitHubIcon from '@material-ui/icons/GitHub';

class Footer extends Component {
  render() {
    return (
      <footer>
        <a className="github" href='#' alt="See the source code on GitHub">
          <GitHubIcon />
        </a>
        <p>© <Moment format="YYYY"></Moment> | Rodolfo J. Galván Martínez</p>
        <img className="footer-icon" src={anchor} />
      </footer>
    );
  }
}

export default Footer;