// cs489 course final project
// author: Buyantugs
// date: 04/09/2024 

const express = require('express');
const { createToken, auth } = require("./utils");

const cors = require('cors'); // Import the cors package
const mysql = require('mysql2'); // Import mysql2 package
const app = express();
const PORT = 5555;

app.use(express.json());
// Use CORS middleware
app.use(cors());

const users = [
  { username: "test@miu.edu", password: "123" }
]

app.post("/login", (req, res) => {
  const user = req.body;   
  let found = users.find(x => x.username === user.username && x.password === user.password); 

  if (!found) {
    res.send({ success: false, error: "Wrong email" });
    return;
  }
  const token = createToken(found);
  console.log(token);

  res.send({ success: true, data: token });
});

app.use(auth);


// Create a connection
const connection = mysql.createConnection({
  host: '127.0.0.1', // Your MySQL server host
  port: 3306,
  user: 'tugs', // Your MySQL username
  password: 'tugs123', // Your MySQL password
  database: 'portfolio', // Your MySQL database name
});



// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});



// Endpoint to get profile from the database
app.get('/profile/:profileId', async (req, res) => {
  const profileId = req.params.profileId;
  try {
    const [rows, fields] = await connection.promise().query('SELECT * FROM profile WHERE profileId = ?',[profileId]); // Changed table name to 'profile'
    res.json(rows);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// // Endpoint to update profile data
app.post('/profile/:profileId', async (req, res) => {
  const profileId = req.params.profileId;
  const newData = req.body;
  try {
    await connection.promise().query('UPDATE profile SET ? WHERE profileId = ?', [newData, profileId]);
    res.send('Profile updated successfully');
  } catch (error) {
    console.error('Error updating profile data:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Endpoint to retrieve resume experience data
app.get('/experience/:profileId', async (req, res) => {
  const profileId = req.params.profileId;
  try {
    const [experienceRows] = await connection.promise().query('SELECT * FROM Experience WHERE Profile_profileId=?',[profileId]);
    const experience = await Promise.all(experienceRows.map(async (experienceRow) => {
      const [positionRows] = await connection.promise().query('SELECT * FROM Position WHERE position_id = ?', [experienceRow.Position_position_id]);
      const [achievementRows] = await connection.promise().query('SELECT * FROM Achievement WHERE Experience_experience_id = ?', [experienceRow.experience_id]);
      return {
        experience: experienceRow,
        position: positionRows[0], // Assuming there's only one position per experience
        achievements: achievementRows
      };
    }));
    res.json(experience);
  } catch (error) {
    console.error('Error retrieving resume experience data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to get projects from the database
app.get('/profile/:profileId/projects', async (req, res) => {
  const profileId = req.params.profileId;
  try {
    const [rows, fields] = await connection.promise().query('SELECT * FROM portfolio.project where profile_profiled=?',[profileId]); // Changed table name to 'profile'
    res.json(rows);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.use((req, res, next) => {
  res.send("API is not supported");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
