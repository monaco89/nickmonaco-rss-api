# GraphQL API for [rss.nickmonaco.me](https://rss.nickmonaco.me)

Serverless GraphQL API using AWS Lambda with MySQL.

Client: [React Apollo Client](https://github.com/monaco89/nickmonaco-rss)

## Libraries

- Apollo Server Lambda, GraphQL
- Knex.js
- Serverless
- MySQL, AWS RDS

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiUlh1RzA4Tk85dW9UcnNDWEdCYUhGNFBsRkJWTU5ac1FGNC9kaUQ4dVZTSmlJMm0wZC9TMG1seTh4SHZNWC82WDBsMFVXbkwvbmk5N0dKOURaTnBMRHR3PSIsIml2UGFyYW1ldGVyU3BlYyI6InFkNk5sR1paTFFESlQxU1oiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=aws/aws-sdk-js-v3)](https://dependabot.com)

## Migrations

`knex migrate:make migration_name --esm` create a knex migration file
`knex migrate:latest --env environment_name --esm` (local, dev, etc.) look in /knexfile.js for configuration for each environment,
