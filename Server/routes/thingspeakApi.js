import express from 'express'
import axios from "axios";
const router = express.Router();

const thingSpeakAPI = 'https://api.thingspeak.com/channels/2295351/fields/1/last.json?api_key=Y62GZ7WDLD9BU1WR';

router.get('/thingspeak', async (req, res) => {
  try {
    const response = await axios.get(thingSpeakAPI);
    console.log(response.data);
    res.console(response.data);
    const fieldValue = response.data.field1; // access field1 directly
    res.json({ value: fieldValue });

  } catch (error) {
    console.error('Error fetching ThingSpeak data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export {router as apiRouter}
