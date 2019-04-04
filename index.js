const express = require('express')
const config = require('./config')

const app = express()
app.set('view engine', 'ejs')
app.use('/static', express.static('public'))
app.use(require('./app/dependencyInjections'))

app.get('/:directoryId?', require('./routes/indexHandler'))
app.get('/watch/:fileId', require('./routes/watchHandler'))
app.get('/video/:fileId', require('./routes/videoHandler'))

app.listen(config.port, () => console.log(`Server is working on port ${config.port}`))