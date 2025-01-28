require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;//PORT 5000 BACKEND

// Middleware
app.use(cors());//CORS is a security feature implemented by web browsers to prevent web pages from making requests to a different domain than the one that served the web page
app.use(express.json());
app.use(express.static('public'));

// Templating engine for common headers navbar footer etc 
app.use(expressLayout);
app.set('layout', './layouts/app');
app.set('view engine', 'ejs');



// API Endpoints
//delete method
app.delete('/date/:id', (req, res) => {
    const { id } = req.params;
    console.log('Deleting entry with ID:', id);
    res.status(200).json({ message: `Entry with ID ${id} deleted` });
});
//modiffy method
app.patch('/date/:id', (req, res) => {
    const { id } = req.params;
    const data = req.body;
    console.log('Updating entry with ID:', id, 'Data:', data);
    res.status(200).json({ message: `Entry with ID ${id} updated`, data });
});
//post method
app.post('/date', (req, res) => {
    const data = req.body;
    console.log('Received data:', data);
    res.status(201).json({ message: 'Data added successfully', data });
});

/*app.use('/api', require('./routes/server/delete'));
app.use('/api', require('./server/routes/post'));
app.use('/api', require('./server/routes/patch'));*/

//project so small so no need for the other files 
// Start the server to listen on the port "what s the input"  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);//test
});