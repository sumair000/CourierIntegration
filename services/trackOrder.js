const axios = require('axios');

const trackOrder = async (req, res) => {
    consignment_no = req.body;
    const data = consignment_no ;

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://bigazure.com/api/json_v3/tracking/get_tracking.php',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic S0hJLTAwMDAwOjY0amt1eWVoNzVoa2pzdGdoODc='
    },
    data
  };

  try {
        const response = await axios.request(config);
        console.log(response.data);
        
        return response.data;
    } catch (err) {
        console.error('trackOrder error:', err?.response?.data ?? err.message ?? err);
        // rethrow so the caller can handle the error
        throw err;
    }
}

  


module.exports = { trackOrder };
