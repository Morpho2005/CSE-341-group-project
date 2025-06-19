// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
 
// Load custom schemas
const studentSchema = require('./swagger/schemas/studentSchema');
const staffSchema = require('./swagger/schemas/staffSchema');
const classSchema = require('./swagger/schemas/classSchema');
const degreeSchema = require('./swagger/schemas/degreeSchema');
 
// Swagger definition setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'School Management API',
      version: '1.0.0',
      description: 'API for school admin storage and management',
    },
    servers: [
      {
        url: 'https://cse-341-group-project-mfvd.onrender.com/api',
      },
    ],
    components: {
      schemas: {
        student: studentSchema,
        staff: staffSchema,
        class: classSchema,
        degree: degreeSchema,
      },
      securitySchemes: {
        GitHubOAuth: {
          type: 'oauth2',
          flows: {
            authorizationCode: {
              authorizationUrl:
                'https://cse-341-group-project-mfvd.onrender.com/api/auth/login',
              tokenUrl:
                'https://cse-341-group-project-mfvd.onrender.com/github/callback',
              scopes: {
                student: 'Access student data',
                staff: 'Access staff data',
                class: 'Access class data',
                degree: 'Access degree data',
              },
              refreshUrl:
                'https://cse-341-group-project-mfvd.onrender.com/github/callback',
            },
          },
        },
      },
    },
    security: [
      {
        GitHubOAuth: ['user'],
      },
    ],
  },
  apis: ['./routes/*.js'],
};
 
// Generate the OpenAPI spec
const specs = swaggerJsdoc(options);
 
// Save as YAML
const yamlOutputPath = path.join(__dirname, 'swagger', 'swagger-output.yaml');
fs.writeFileSync(yamlOutputPath, yaml.dump(specs));
 
// Export for use in Express
module.exports = app => {
  // Serve Swagger UI
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      swaggerOptions: {
        oauth: {
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
          scopes: ['student', 'staff', 'class', 'degree'],
          usePkceWithAuthorizationCodeGrant: true,
          redirectUri:
            'https://cse-341-group-project-mfvd.onrender.com/github/callback',
        },
        persistAuthorization: true,
      },
    }),
  );
 
  // serve raw JSON and YAML
  app.get('/api-docs.json', (req, res) => res.json(specs));
  app.get('/api-docs.yaml', (req, res) => {
    res.setHeader('Content-Type', 'application/x-yaml');
    res.sendFile(yamlOutputPath);
  });
};
 
 