// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create an instance of Express
const app = express();

// Enable Cross-Origin Resource Sharing (CORS) so your frontend can access this API
app.use(cors());

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// -----------------------------
// Connect to MongoDB
// -----------------------------
mongoose.connect('mongodb+srv://dbUser:dbPassword@blog.882k5.mongodb.net/?retryWrites=true&w=majority&appName=blog', {
  useNewUrlParser: true,//dbUser
  useUnifiedTopology: true,//dbPassword
  serverSelectionTimeoutMS: 5000
})
.then(
    () =>{
        console.log('Connected to MongoDB successfully');
        seedDatabase();
    } 

)
.catch(err => console.error('Error connecting to MongoDB:', err));

// -----------------------------
// Define Mongoose Schemas and Models
// -----------------------------
// Schema for a State (each state has a name)
const StateSchema = new mongoose.Schema({
  name: { type: String, required: true }
});
const State = mongoose.model('State', StateSchema);

// Schema for a District (each district has a name and is associated with a state)
const DistrictSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stateId: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true }
});
const District = mongoose.model('District', DistrictSchema);

// Schema for News (news items have a title, content, and may be related to a state or a district)
const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  stateId: { type: mongoose.Schema.Types.ObjectId, ref: 'State' },      // optional if the news is state-level
  districtId: { type: mongoose.Schema.Types.ObjectId, ref: 'District' } // optional if the news is district-level
});
const News = mongoose.model('News', NewsSchema);

// -----------------------------
// Define API Endpoints
// -----------------------------

// 1. Get all states
app.get('/states', async (req, res) => {
  try {
    const states = await State.find();
    res.json(states);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching states' });
  }
});

// 2. Get all news for a specific state (using stateId)
app.get('/news/state/:stateId', async (req, res) => {
  try {
    const news = await News.find({ stateId: req.params.stateId });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching state news' });
  }
});

// 3. Get all districts for a specific state (using stateId)
app.get('/districts/:stateId', async (req, res) => {
  try {
    const districts = await District.find({ stateId: req.params.stateId });
    res.json(districts);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching districts' });
  }
});

// 4. Get all news for a specific district (using districtId)
app.get('/news/district/:districtId', async (req, res) => {
  try {
    const news = await News.find({ districtId: req.params.districtId });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching district news' });
  }
});

// -----------------------------
// Start the Server
// -----------------------------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

async function seedDatabase() {
    try {
      const existingStates = await State.find();
      if (existingStates.length > 0) {
        console.log("Database already seeded.");
        return;
      }
  
      // Insert States
      const ap = await new State({ name: "Andhra Pradesh" }).save();
      const karnataka = await new State({ name: "Karnataka" }).save();
  
      // Insert Districts
      const districts = [
        { name: "Alluri Sitharama Raju", stateId: ap._id },
        { name: "Anakapalli", stateId: ap._id },
        { name: "Anantapur", stateId: ap._id },
        { name: "Annamayya", stateId: ap._id },
        { name: "Bapatla", stateId: ap._id },
        { name: "Chittoor", stateId: ap._id },
        { name: "East Godavari", stateId: ap._id },
        { name: "Eluru", stateId: ap._id },
        { name: "Guntur", stateId: ap._id },
        { name: "Kadapa", stateId: ap._id },
        { name: "Kakinada", stateId: ap._id },
        { name: "Konaseema", stateId: ap._id },
        { name: "Krishna", stateId: ap._id },
        { name: "Kurnool", stateId: ap._id },
        { name: "Nandyal", stateId: ap._id },
        { name: "Nellore", stateId: ap._id },
        { name: "Parvathipuram Manyam", stateId: ap._id },
        { name: "Prakasam", stateId: ap._id },
        { name: "Srikakulam", stateId: ap._id },
        { name: "Tirupati", stateId: ap._id },
        { name: "Visakhapatnam", stateId: ap._id },
        { name: "Vizianagaram", stateId: ap._id },
        { name: "West Godavari", stateId: ap._id },
        { name: "Palnadu", stateId: ap._id },
  
        { name: "Bagalkot", stateId: karnataka._id },
        { name: "Ballari", stateId: karnataka._id },
        { name: "Belagavi", stateId: karnataka._id },
        { name: "Bengaluru Rural", stateId: karnataka._id },
        { name: "Bengaluru Urban", stateId: karnataka._id },
        { name: "Bidar", stateId: karnataka._id },
        { name: "Chamarajanagar", stateId: karnataka._id },
        { name: "Chikkaballapur", stateId: karnataka._id },
        { name: "Chikkamagaluru", stateId: karnataka._id },
        { name: "Chitradurga", stateId: karnataka._id },
        { name: "Dakshina Kannada", stateId: karnataka._id },
        { name: "Davanagere", stateId: karnataka._id },
        { name: "Dharwad", stateId: karnataka._id },
        { name: "Gadag", stateId: karnataka._id },
        { name: "Hassan", stateId: karnataka._id },
        { name: "Haveri", stateId: karnataka._id },
        { name: "Kalaburagi", stateId: karnataka._id },
        { name: "Kodagu", stateId: karnataka._id },
        { name: "Kolar", stateId: karnataka._id },
        { name: "Koppal", stateId: karnataka._id },
        { name: "Mandya", stateId: karnataka._id },
        { name: "Mysuru", stateId: karnataka._id },
        { name: "Raichur", stateId: karnataka._id },
        { name: "Ramanagara", stateId: karnataka._id },
        { name: "Shivamogga", stateId: karnataka._id },
        { name: "Tumakuru", stateId: karnataka._id },
        { name: "Udupi", stateId: karnataka._id },
        { name: "Uttara Kannada", stateId: karnataka._id },
        { name: "Vijayapura", stateId: karnataka._id },
        { name: "Yadgir", stateId: karnataka._id },
      ];
  
      await District.insertMany(districts);
      console.log("Districts added successfully!");
    } catch (err) {
      console.log("Error inserting districts:", err);
    }
  }
  