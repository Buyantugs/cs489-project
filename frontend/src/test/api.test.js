const axios = require('axios');
const { getProfile } = require('../data/network');

describe('getProfile API Tests', () => {
  afterEach(() => {
    jest.resetAllMocks(); // Reset all mocks after each test
  });

  it('should fetch profile data', async () => {
    const profileId = 1;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbWl1LmVkdSIsImlhdCI6MTcxMzQ4MzIwNH0.KNS_wSvV-rBlao-Xijp07Tg1_dJw9yY9mjFuk25bvhQ';
    const profileData = {
      "profileId": 1,
      "aboutme": "Highly accomplished professional with over 15+ years of experience in coding, database design, development, integration, optimization, and maintenance across Telecommunication, Broadband, Media, and Fintech sectors. Expertise includes SQL, PL/SQL, T-SQL development, data modeling, ETL, query optimization, and system analysis. Proven track record in solutions design, systems integration, migrations, and change management, project management.",
      "lastUpdateDate": "2024-04-25T05:00:00.000Z",
      "linkedin": "https://www.linkedin.com/in/buyantugs/",
      "phoneNumber": "(+1)319-217-9113",
      "emailAddress": "buyantugs.luu@gmail.com"
    };
    
    axios.get = jest.fn().mockResolvedValueOnce({ data: profileData });
    const data = await getProfile(profileId, token);
    expect(data).toEqual([profileData]);    
  });  
});
