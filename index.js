const express = require('express');
const morgan = require('morgan');

// Connect to database
require('./drivers/connect-db');

const app = express();
app.set('PORT', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json());

app.use('/modalities', require('./routes/routes-modalities'));
app.use('/projects', require('./routes/routes-projects'));

// Ruta raíz para confirmar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('API is working');
});

app.listen(app.get('PORT'), () => console.log(`Server Ready at port ${app.get('PORT')}`));

