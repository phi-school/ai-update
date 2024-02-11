# Dockerfile for minimal development environment
FROM oven/bun:1
WORKDIR /usr/src/app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
CMD ["bun", "run", "test:integration"]