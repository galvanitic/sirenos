import React, { Component } from 'react';
import Moment from 'react-moment';
import anchor from '../img/anchor-512.png'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="upper-ftr">
          <p>© <Moment format="YYYY"></Moment> | Rodolfo J. Galván Martínez</p>
        </div>
        <hr />
        <div className="lower-ftr">
          <a className="twitter" href="https://twitter.com/galvanitic">
            <TwitterIcon />
          </a>
          <a className="github" href='https://github.com/galvanitic/siren' alt="See the source code on GitHub">
            <GitHubIcon />
          </a>
          <a className="linkedin" href='https://www.linkedin.com/in/galvanitic/'>
            <LinkedInIcon />
          </a>

        </div>
        <img className="footer-icon" src={anchor} />
      </footer>
    );
  }
}

export default Footer;