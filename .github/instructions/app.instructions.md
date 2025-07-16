---
applyTo: '**/*.ts'
---

# Project Overview and Conventions

For a high-level understanding of the application, including available services and commands, always refer to the `readme.md` file. It serves as the primary entry point to the project documentation.

To understand the services used in the application and how they interact, check the `docker-compose.yml` file. It provides insight into the infrastructure and running containers.

## Project Structure

The project is organized according to the following structure:

```txt
.
├── src/                                # Source code of the application
│   ├── modules/                        # Shared application modules
│   │   ├── prisma/                     # Prisma ORM integration
│   │   |   ├── prisma.module.ts        # Prisma module definition
│   │   |   └── prisma.service.ts       # Prisma service for database operations
│   |   ├── langchain/                  # LangChain integration
│   │   |   ├── langchain.module.ts     # LangChain module definition
│   │   |   └── langchain.service.ts    # LangChain service for AI operations
│   |   ├── graphql/                    # GraphQL API integration
│   │   |   └── graphql.module.ts       # GraphQL module definition
│   ├── commons/                        # Common utilities and helpers
│   │   ├── constants/                  # Application constants
│   │   ├── decorators/                 # Custom decorators
│   │   ├── exceptions/                 # Custom exceptions
│   │   ├── filters/                    # Exception filters
│   │   ├── guards/                     # Guards for route protection
│   │   ├── interceptors/               # Interceptors for request/response manipulation
│   │   ├── pipes/                      # Pipes for data transformation and validation
│   │   ├── functions/                  # Utility functions
│   │   ├── validators/                 # Custom validation logic
│   │   └── scalars/                    # Custom GraphQL scalars
│   ├── config/                         # Configuration files
│   │   ├── app.config.ts               # Application configuration
│   │   ├── database.config.ts          # Database configuration
│   │   └── langchain.config.ts         # LangChain configuration
│   ├── users/                          # Users domain
│   │   ├── models/                     # User models for GraphQL
│   │   |   ├── user.input.ts           # Input model to fetch single user
│   │   |   ├── user.object.ts          # Output model for user object
│   │   |   ├── users.input.ts          # Input model for to fetch multiple users
│   │   |   └── users.object.ts         # Output model for users list
│   │   ├── resolvers/                  # GraphQL resolvers for user operations
│   │   |   ├── user.resolver.ts        # Resolver for single user
│   │   |   └── users.resolver.ts       # Resolver for multiple users
│   │   ├── users.module.ts             # Users module definition
│   │   └── users.service.ts            # Users service for business logic
│   ├── app.module.ts                   # Main application module
│   └── main.ts                         # Entry point of the application
├── .env                                # Example environment variables file
├── docker-compose.yml                  # Docker Compose configuration for services
├── makefile                            # Makefile for project commands
├── package.json                        # Node.js package configuration
└── readme.md                           # Project documentation and overview
```

> Note:
> The project structure shown below is an example following the users domain. During development, new domains may be created as needed. Each new domain should follow the same directory structure and naming conventions as shown for consistency and maintainability.

## Module and File Naming Conventions

Resolvers for each domain should always reside in a resolvers/ directory and be named after what they resolve.

GraphQL inputs and outputs (object and input types) should always reside in a models/ directory within the domain and be named accordingly (user.input.ts, user.object.ts, etc.).

Shared modules like Prisma, LangChain, or GraphQL should be placed under modules/ and prefixed with App (e.g., AppPrismaModule) to avoid collisions with external modules of the same name.

Shared utilities such as interceptors, functions, GraphQL scalars, and guards should live under the commons/ directory.

---

#fetch https://www.prisma.io/docs/llms-full.txt
#fetch https://langchain-ai.github.io/langgraph/llms-full.txt

# Learning Resources and Documentation Access

This project uses Prisma, NestJS, and LangChain.
When writing code or searching for implementation patterns, always prioritize using official or structured documentation sources:

## Prisma

For Prisma-related functionality (ORM, migrations, queries, etc.), refer to the following LLM-friendly index: [https://www.prisma.io/docs/llms-full.txt](https://www.prisma.io/docs/llms-full.txt)

- This is only a content index with links to actual chapters.
- The process should be:
  - Fetch the content index.
  - Identify relevant chapters or topics.
  - Fetch those chapters individually when needed.
  - Use the content to inform code generation or suggestions.

## LangChain

For LangChain-related features (LangGraph, LLM tools, etc.), refer to: [https://langchain-ai.github.io/langgraph/llms-full.txt](https://langchain-ai.github.io/langgraph/llms-full.txt)

Same process as with Prisma applies: Fetch the index → Find interesting chapters → Fetch content separately.

## NestJS

There is no LLM-prepared documentation provided for NestJS.
When documentation is needed:

- Perform an internet search specifically using the NestJS official domain or GitHub page as a filter:
  - [https://docs.nestjs.com](https://docs.nestjs.com)
  - [https://github.com/nestjs/nest](https://github.com/nestjs/nest)
- Avoid using outdated or unofficial blogs unless there’s no other source available.

> Note:
> Whenever possible, prioritize structured content over open-ended search queries.
> Only resort to web crawling for NestJS when no structured source is provided.

## GraphQL

For GraphQL server we use Yoga. For documentation, refer to the official Yoga GraphQL documentation: [https://the-guild.dev/graphql/yoga-server/docs](https://the-guild.dev/graphql/yoga-server/docs)

And for documentation how to use it with NestJS please refer to: [https://the-guild.dev/graphql/yoga-server/docs/integrations/integration-with-nestjs](https://the-guild.dev/graphql/yoga-server/docs/integrations/integration-with-nestjs)
