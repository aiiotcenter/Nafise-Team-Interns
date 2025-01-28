//simple delete method not needed rn


const deleteHandler = (req, res) => {
    const { id } = req.params;
    console.log('Deleting entry with ID:', id);
    res.status(200).json({ message: `Entry with ID ${id} deleted` });
};

module.exports = deleteHandler; // Export the handler