import React from "react";
import "./About.css";
import authorImage from "../../assets/profile.jpg"; // Ensure this path points to your actual image

function About() {
  return (
    <section className="about">
      <img src={authorImage} alt="Author" className="about__image" />
      <div className="about__content">
        <h2 className="about__title">About the Author</h2>
        <p className="about__description">
          Full-stack Engineer with a strong foundation in building dynamic,
          browser-based user interfaces using React, TypeScript, and modern web
          technologies. Experienced in creating high-performance, scalable
          applications and integrating APIs. Adept at solving complex technical
          challenges through elegant, maintainable code. Passionate about
          contributing to innovative products that transform content creation
          and AI-powered workflows.
        </p>
      </div>
    </section>
  );
}

export default About;
