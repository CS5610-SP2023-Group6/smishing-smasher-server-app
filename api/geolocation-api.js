
// TODO: Move this to env variable
import axios from "axios";

const openCageApiKey = 'f6b670a509b14105930759e625ab222b';

const getNearestCity = async (req, res) => {
    const { latitude, longitude } = req.body;

    try {
        const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${openCageApiKey}`
        );

        console.log(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${openCageApiKey}`);

        const city = response.data.results[0].components.city;
        res.json({ city });
    } catch (error) {
        console.error('Error getting nearest city:', error);
        res.status(500).json({ error: 'Error getting nearest city' });
    }
};

export default (app) => {
    app.post('/api/loc/get-nearest-city', getNearestCity);

}