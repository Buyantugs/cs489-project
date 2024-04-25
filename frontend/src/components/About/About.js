import React from "react";
import { stackList } from "../../data/ProjectData";
import {
  Image,
  Technologies,
  Tech,
  TechImg,
  TechName,
  ContactWrapper,
} from "./AboutElements";
import SkillBars from "./SkillBar";

export default function About({data}) {

  const profile = data;  
  
  return (
    <ContactWrapper id="about">
      <div className="Container">
        <div className="SectionTitle">About Me</div>
        <div className="BigCard">
          <Image
            src="https://github.com/Buyantugs/cs489-project1/blob/main/Bio.jpg?raw=true"
            alt="man-svgrepo"
          />
          <div className="AboutBio">            
            {profile && profile.length > 0 ? profile[0].aboutme : ''}
          </div>
          <br></br>
          <div className="AboutBio Buya">
            <strong>I have become confident using the following technologies.</strong>
          </div>
          <br></br>
          <Technologies>
            {stackList.map((stack, index) => (
              <Tech key={index} className="tech">
                <TechImg src={stack.img} alt={stack.name} />                
                <TechName>{stack.name}</TechName>
              </Tech>
            ))}
          </Technologies>         
   
            {/* <SkillBars/> */}
		      
        </div>        
      </div>
    </ContactWrapper>
  );
}


