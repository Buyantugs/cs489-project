import React from "react";
import Hero from "../components/Hero/Hero";
import Projects from "../components/Projects/Projects";
import About from "../components/About/About";
import Experience from "../components/Experience/Resume";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import FixSocialIcon from "../components/SocialIcon/FixSocialIcon";
import { useContext, useEffect, useState } from "react";
import context from "../data/context";
import { getProfile } from "../data/network";

function Home() {

  const { state } = useContext(context);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function getData() {
      const res = await getProfile(1,state.token); // need to pass token
      if (res) {
        setProfile(res);        
        console.log(res);
      }
    }
    getData();
  }, [state.token]); 

  return (
    <>
      <Hero />
      <Projects />
      <About data={profile}/>
      <Experience/>
      <Contact data={profile}/>
      <Footer />
      <FixSocialIcon />
    </>
  );
}

export default Home;
