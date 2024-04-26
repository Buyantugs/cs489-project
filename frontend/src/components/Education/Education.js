import React, { useContext, useState, useEffect } from "react";
import context from "../../data/context";
import { getEducation } from "../../data/network";

const Education = () => {

    const [educationData, setEducationData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { state } = useContext(context);

    useEffect(() => {
        async function fetchEducation() {
            try {
                const token = state.token; // Replace with your authentication token
                const educationData = await getEducation(1,token);
                console.log(educationData);

                setEducationData(educationData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching education:", error);
            }
        }

        fetchEducation();
    }, [isLoading,state.token]);


  return (
    <div className="education">
      <h3><strong>Education</strong></h3>
      {educationData.map((edu) => (
        <div key={edu.eduId} className="education-item" style={{ fontStyle: 'italic', fontSize:"small" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight:"bolder" }}>
                                            <div>{edu.degree}</div>
                                            <div>{edu.institution_name}</div>
                                            <div>{edu.address}</div>
                                        </div>
          
          <p style={{ fontStyle: 'italic', fontSize:"small" }}>
            {new Date(edu.startDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
            })}{' '}
            -{' '}
            {edu.endDate
              ? new Date(edu.endDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                })
              : 'Present'}
          </p>
          <p className="courses" style={{ fontStyle: 'italic', fontSize:"small" }}>Courses: {edu.courses}</p>
          <br></br>
        </div>
      ))}
    </div>
  );
};

export default Education;
