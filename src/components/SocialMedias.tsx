import React from "react";
import { Link } from "react-router-dom";

interface SocialMediasProps {
  formLink: '/login' | '/sign-up';
}

export const SocialMedias: React.FC<SocialMediasProps> = ({ formLink }) => {
  const socialMedias: SocialMediaButton[] = [
    { name: "Google", link: '/' },
    { name: "Apple", link: '/' },
    { name: "Facebook", link: '/' },
    { name: "Twitter", link: '/' },
    { name: "LinkedIn", link: '/' },
  ];

  return (
    <div className="socialMediaContainer">
      <span className="socialMediaContainer__title">Or continue with social medias</span>
      <div className="socialMediaContainer__buttonGroup buttonGroup">
        {socialMedias.map((media: SocialMediaButton, i) => (
          <a
            key={i}
            className="buttonGroup__button"
            href={media.link}
          >
            {media.name}
          </a>
        ))}
      </div>
      <span>
        {`Don't have an account? `}
        <Link
          to={formLink}
          className="socialMediaContainer__link">
          {formLink === '/login' && 'Log in'}
          {formLink === '/sign-up' && 'Sign up'}
        </Link>
      </span>
    </div>
  );
};
