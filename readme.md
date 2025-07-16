# Documents processing

The project involves building an AI-powered document processing system that automates content extraction, classification, and search. It supports uploading PDFs, DOCX, TXT files, and images, integrating with storage solutions like S3. Using LangChain and LLMs, the system extracts structured data, summarizes documents, identifies keywords, detects language, performs sentiment analysis, and classifies documents into customizable categories with confidence scoring. It also offers vector-based search for efficient document retrieval and ranking.

### Getting started

To bootstrap the project, run the following command. This will setup all the necessary development tools and dependencies.

```bash
make bootstrap
```

The bootstrap command is required to be run only once to install dependencies, set up environment variables, run migrations, and seed the database with initial data. In subsequent development sessions, you can simply start the containers using the following command:

```bash
make watch
```

### Available services

List of available services in the project:

| Service Name | URL                                                              | Description                      |
| ------------ | ---------------------------------------------------------------- | -------------------------------- |
| GraphQL API  | [http://localhost:10000/graphql](http://localhost:10000/graphql) |                                  |
| PostgreSQL   | [postgres://localhost:11000](postgres://localhost:11000)         | Credentials: `postgres:password` |

### Available commands

| Command                  | Description                                                                                                     |
| ------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `make bootstrap`         | Bootstrap the project, install dependencies and set up development environment.                                 |
| `make environment`       | Set up environment variables for the project. This will create a `.env` file with the necessary configurations. |
| `make wait-for-services` | Wait for all required services to be up and running before starting the application.                            |
| `make install`           | Install project dependencies.                                                                                   |
| `make migrate`           | Run database migrations to set up the schema.                                                                   |
| `make truncate`          | Truncate the database, removing all data and dropping all tables.                                               |
| `make prestart`          | Run all required services before starting the application.                                                      |
| `make start`             | Start the application in development mode.                                                                      |
| `make stop`              | Stop the application and all related services.                                                                  |
| `make watch`             | Start the application in development mode with live reloading.                                                  |
| `make prune`             | Remove unused dependencies and clean up the project.                                                            |
