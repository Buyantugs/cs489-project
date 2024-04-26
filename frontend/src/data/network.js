import axios from "axios";
axios.defaults.baseURL = "http://localhost:5555";

export async function getProfile(profileId, token) {
    const url = `/profile/${profileId}`;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
        const res = await axios.get(url);
        //console.log(res.data);
        return res.data;
    } catch (error) {
        return null;
    }
}

export async function getResumeExperience(profileId,token) {
    const url = `/profile/${profileId}/experience`;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      console.error("Error fetching resume experience data:", error);
      return null;
    }
}

export async function getProjects(profileId, token) {
  const url = `/profile/${profileId}/projects`;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
      const res = await axios.get(url);
      //console.log(res.data);
      return res.data;
  } catch (error) {
      return null;
  }
}

export async function getEducation(profileId, token) {
  const url = `/profile/${profileId}/education`;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
      const res = await axios.get(url);
      //console.log(res.data);
      return res.data;
  } catch (error) {
      return null;
  }
}