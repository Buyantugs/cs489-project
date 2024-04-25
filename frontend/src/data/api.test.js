const axios = require('axios');
axios.defaults.baseURL = "http://localhost:5555";
const MockAdapter = require('axios-mock-adapter');
const { getProfile, getResumeExperience } = require('./network');

describe('API Tests', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should fetch profile data', async () => {
    const profileId = 1;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbWl1LmVkdSIsImlhdCI6MTcxMzQ4MzIwNH0.KNS_wSvV-rBlao-Xijp07Tg1_dJw9yY9mjFuk25bvhQ';
    const profileData = { /* mocked profile data */ };
    mock.onGet(`/profile/${profileId}`).reply(200, profileData);

    const data = await getProfile(profileId, token);

    expect(data).toEqual(profileData);
  });

  it('should fetch resume experience data', async () => {
    const token = 'exampleToken';
    const experienceData = [ /* mocked experience data */ ];
    mock.onGet('/experience').reply(200, experienceData);

    const data = await getResumeExperience(token);

    expect(data).toEqual(experienceData);
  });

  // Add more tests as needed
});
