# Use Bun base image (lightweight runtime for JavaScript/TypeScript)
FROM oven/bun:slim AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the lockfile and package.json into the container to install dependencies
COPY bun.lockb package.json tsconfig.json environment.d.ts drizzle.config.ts . 

# Install dependencies using Bun, ensuring to use the exact versions from the lockfile
RUN bun install --frozen-lockfile

# Copy the source code into the container
COPY src ./src 

# Final lightweight image
FROM oven/bun:distroless
WORKDIR /app
COPY --from=builder /app /app

# Expose the port the app will run on
EXPOSE 8080

# Define the default command to run the application in development mode
CMD ["run", "./src/app.ts"]
