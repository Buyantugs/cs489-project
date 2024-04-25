import React from "react";
import { useContext, useEffect, useState } from "react";
import context from "../../../data/context";
import {
  Card,
  CardLeft,
  CardRight,
  Stack,
  BtnGroup,
} from "./ProjectCardElements";

import { getProjects } from "../../../data/network";

function ProjectCard() {

  const { state } = useContext(context);
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await getProjects(1,state.token); // need to pass token
      if (res) {
        setProjectList(res);        
        console.log(res);
      }
    }
    getData();
  }, []); 

  return (
    <>
      {projectList.map((list, index) => (
        <Card key={index}>
          <CardLeft>
            <img src={list.image_url} alt={list.name} />
          </CardLeft>
          <CardRight>
            <h4>{list.project_title}</h4>
            <p>{list.project_description}</p>
            <Stack>
              <span className="stackTitle">Experienced -</span>
              <span className="tags">{list.experienced}</span>
            </Stack>
            <BtnGroup>              
              <a
                className="btn PrimaryBtn"
                href={list.demo_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Demo ➜
              </a>
            </BtnGroup>
          </CardRight>
        </Card>
      ))}
    </>
  );
}

export default ProjectCard;
