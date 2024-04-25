import React from "react";
import SocialIcon from "../SocialIcon/SocialIcon";
import { ContactWrapper, Email } from "./ContactElements";
function Contact({ data }) {

  const profile = data;

  return (
    <ContactWrapper id="contact">
      <div className="Container">
        <div className="SectionTitle">Get In Touch</div>
        <div className="BigCard">
          <Email>
            email: {profile && profile.length > 0 ? profile[0].emailAddress : ''}
          </Email>
          <Email>
            phone: {profile && profile.length > 0 ? profile[0].phoneNumber : ''}
          </Email>
          <Email>
            <a
              href={profile && profile.length > 0 ? profile[0].linkedin : ''}
              target="_blank"
              rel="noopener noreferrer"
            >
              Linked In
            </a>{" "}
          </Email>
        </div>
        <SocialIcon />
      </div>
    </ContactWrapper>
  );
}

export default Contact;
