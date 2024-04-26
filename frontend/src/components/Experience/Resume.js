import React, { useContext, useState, useEffect } from "react";
import { getResumeExperience } from "../../data/network";
import context from "../../data/context";
import { ContactWrapper } from "./ResumeElements";

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    //const day = String(date.getDate()).padStart(2, "0");
    //return `${year}-${month}-${day}`;
    return `${year}/${month}`;
}


function Resume() {
    const [resumeExperience, setResumeExperience] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { state } = useContext(context);

    useEffect(() => {
        async function fetchResumeExperience() {
            try {
                const token = state.token; // Replace with your authentication token
                const experienceData = await getResumeExperience(1,token);
                setResumeExperience(experienceData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching resume experience:", error);
            }
        }

        fetchResumeExperience();
    }, [state.token]);

    return (
        <ContactWrapper id="contact">
            <div className="Container">
                <div className="SectionTitle">Experience</div>
                <div className="BigCard">
                    <div>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <ul>
                                {resumeExperience.map((experience, index) => (
                                    <li key={index}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight:"bolder" }}>
                                            <div>{experience.position.position_title}</div>
                                            <div>{experience.experience.organization}</div>
                                            <div>{formatDate(experience.experience.start_date)} - {formatDate(experience.experience.end_date)}</div>
                                        </div>
                                        <div style={{ fontStyle: 'italic', fontSize:"small" }}>{experience.position.position_duty}</div>                                       
                                        <ul style={{ marginLeft: '20px', fontSize:"small" }}>
                                            
                                            {experience.achievements.map((achievement, index) => (
                                                <li key={index}><strong>*&nbsp;</strong>{achievement.achievment_description}</li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </ContactWrapper>
    );
}

export default Resume;
