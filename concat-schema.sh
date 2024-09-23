#!/bin/bash

echo 'datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}' > prisma/schema.prisma

# Concatenate all models
for file in prisma/models/*.prisma; do
  cat "$file" >> prisma/schema.prisma
done
