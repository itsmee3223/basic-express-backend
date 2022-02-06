const express = require('express');

const apiRoutes = require('./routes/tasks.routes');

const app = express()

// middleware
app.use(express.json())

// routes
app.use('/api/v1/tasks', apiRoutes)


const port = 3000
app.listen(port, console.log(`Server is running on port ${port}`))