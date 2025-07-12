const express = require('express');
const app = express();

// Middlewares
app.use(express.json());

// Routes
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./src/config/swagger.yaml');

const authRoutes = require('./routes/auth');
const teamRoutes = require('./routes/teams');
const playerRoutes = require('./routes/players');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/auth', authRoutes);
app.use('/teams', teamRoutes);
app.use('/players', playerRoutes);

// JSON parsing error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Bad JSON:', err.message);
    return res.status(400).send({ error: 'Invalid JSON payload' });
  }
  next();
});

module.exports = app;
