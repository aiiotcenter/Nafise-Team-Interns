//simple edit method not needed rn 

const patchHandler = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    console.log('Updating entry with ID:', id, 'Data:', data);
    res.status(200).json({ message: `Entry with ID ${id} updated`, data });
};

module.exports = patchHandler; // Export the handler