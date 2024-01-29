import React from 'react';
import socialMediaIcons from '../images/icons/';

export default function Footer() {
  return (
    <>
      <div className="m-[10px 0 10px 0] flex justify-center gap-5">
        <a
          className="h-7 w-7 "
          style={{ aspectRatio: 'auto 25 / 25' }}
          href="https://github.com/Brian3010"
          target="_blank"
        >
          <img className="w-full" src={socialMediaIcons.GitHubIcon} alt="GitHub icon" />
        </a>
        <a
          className="h-7 w-7"
          style={{ aspectRatio: 'auto 25 / 25' }}
          href="https://www.linkedin.com/in/brian-nguyen-411483196"
          target="_blank"
        >
          <img className="w-full" src={socialMediaIcons.LinkedInIcon} alt="Linkedin icon" />
        </a>
        <a className="h-7 w-7" style={{ aspectRatio: 'auto 25 / 25' }} href="mailto:briannguyenwg@gmail.com">
          <img className="w-full" src={socialMediaIcons.GmailIcon} alt="Gmail icon" />
        </a>
      </div>
      <div className="text-center pt-2">© 2024 Brian Nguyen. All rights reserved.</div>
    </>
  );
}
