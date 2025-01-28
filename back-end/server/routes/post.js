
//simple post method

const postHandler = (req, res) => {
    const data = req.body;
    console.log('Received data:', data);
    res.status(201).json({ message: 'Data added successfully', data });
};

module.exports = postHandler; // Export the handler