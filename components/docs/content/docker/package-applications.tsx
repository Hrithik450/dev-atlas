"use client";

import PackageApplicationsImage from "@/assets/content/package-applications.png";
import { CodeBlock, CodeBlockWithCopy } from "@/components/code-block";
import { Maximize2 } from "lucide-react";
import Image from "next/image";

export const WorkflowDocumentation = () => {
  return (
    <section
      id="workflow-documentation"
      data-nav-title="Workflow Documentation"
      data-scrollspy
      className="animate-in fade-in slide-in-from-bottom-4 duration-500 pt-8 md:pt-12"
    >
      <div className="w-full text-foreground mx-auto max-w-5xl">
        <header className="mb-10 border-b border-border pb-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <h1 className="text-xl md:text-2xl font-medium tracking-tight">
              Packaging Applications
            </h1>
            <div className="text-sm text-muted-foreground">
              Last updated: 07 Feb 2026
            </div>
          </div>
        </header>

        <div className="mb-12">
          <div className="p-5 rounded-xl shadow-xs border border-foreground/20 border-l-4 border-l-foreground/50">
            <p className="text-muted-foreground leading-relaxed">
              Docker packages your <strong>application</strong>, dependencies,
              runtime, and configuration into a portable unit called a{" "}
              <strong>Docker Image</strong>, which runs as a{" "}
              <strong>Container</strong>.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-medium mb-6">
            Below, we’ll package a sample Node.js application.
          </h2>

          <div className="space-y-12">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Step 1: Create Your Node.js Application
              </h3>

              <p className="text-muted-foreground">
                Your application contains source code and dependencies.
              </p>

              <CodeBlock
                language="bash"
                content={`my-node-app/
   ├── package.json
   ├── package-lock.json
   ├── server.js`}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Step 2: Create a .dockerignore File
              </h3>

              <p className="text-muted-foreground">
                The <code>.dockerignore</code> file prevents unnecessary files
                like <code>node_modules</code> from being copied into the Docker
                image. This avoids build errors and makes your image smaller and
                faster.
              </p>

              <CodeBlock
                language="bash"
                content={`my-node-app/
   ├── .dockerignore
   ├── package.json
   ├── package-lock.json
   ├── server.js`}
              />

              <CodeBlockWithCopy
                language=".dockerignore"
                content={`node_modules
dist
.git
Dockerfile
docker-compose.yml
.env`}
              />

              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-3">
                <p className="mb-2 text-muted-foreground">
                  ⚠️ Without <code>.dockerignore</code>, Docker may try to copy
                  your local <code>node_modules</code> into the container, which
                  can cause errors like:
                </p>

                <CodeBlock
                  language="bash"
                  content={`cannot replace to directory ... /app/node_modules/... with file`}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Step 3: Create a Dockerfile
              </h3>

              <p className="text-muted-foreground">
                A Dockerfile is a set of instructions that tells Docker how to
                create an image for your application, including what software to
                install and how to start the app.
              </p>

              <CodeBlock
                language="bash"
                content={`my-node-app/
   ├── Dockerfile
   ├── .dockerignore
   ├── package.json
   ├── package-lock.json
   ├── server.js`}
              />

              <CodeBlockWithCopy
                language="dockerfile"
                content={`# Builder Stage (Ignore this stage if you don't have build)
# This stage installs ALL dependencies (including devDependencies) and builds the application.

# Based on which node version your backend built,
# We'll use node.js 22 (LTS) with lightweight Alpine Linux and name this build stage "builder"
FROM node:22-alpine AS builder 

# Set working directory inside the container
WORKDIR /app

# Copy dependency files first (better Docker layer caching)
COPY package*.json ./

# Install ALL dependencies (dev + prod)
# Needed for building the project (e.g., TypeScript, ESLint)
RUN npm install

# Copy the rest of the source code from source to destination
COPY . ./

# Build the application (compile source code).
RUN npm run build

# Production Stage (This is the final image that will be deployed.)
# This stage installs only production dependencies, no devDependencies.
FROM node:22-alpine
WORKDIR /app

# Set environment to production
# This improves performance and ensures devDependencies are ignored
ENV NODE_ENV=production

# Create a non-root user for better security (containers should not run as root)
# Create a system group named "appgroup"
# -S → creates a system group (no login, minimal privileges)
# Groups are used to manage permissions inside the container
# Create a system user named "appuser"
# -S → creates a system user (no password, no login shell)
# -G appgroup → assign this user to the "appgroup"
# This user will be used to run the Node.js application
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy dependency files first
# This improves Docker layer caching (dependencies reinstall only when they change)
COPY package*.json ./

# Install ONLY production dependencies
RUN npm install --omit=dev

# Copy application files
# If build exists → copy compiled output (dist)
COPY --from=builder /app/dist ./dist

# If no build → copy source files directly
COPY . ./

# chown → "change owner" command in Linux
# -R → recursive (apply to all files and subfolders inside /app)
# appuser → new file owner (the user we created earlier)
# appgroup → new group owner
# /app → target directory (your application folder inside container noted earlier)
RUN chown -R appuser:appgroup /app

# Switch from root user to the safer non-root user (security best practice)
# After this line, all commands run as "appuser"
USER appuser

# Expose the port your app runs on
EXPOSE 3000

# Start the Node.js application (if build is present, replace server.js with dist/server.js)
CMD ["node", "server.js"] 
`}
              />

              <p>
                This Dockerfile provides a solid foundation and can be adapted
                for other applications.
              </p>

              <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-3">
                <p className="mb-1 text-muted-foreground">
                  For a complete list of Dockerfile instructions and advanced
                  patterns, refer to the official Docker documentation.
                </p>

                <a
                  href="https://docs.docker.com/reference/dockerfile/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  https://docs.docker.com/reference/dockerfile/
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Step 4: Docker Client Sends Build Request
              </h3>

              <p className="text-muted-foreground">
                You run the build command. The Docker Client sends this request
                to the Docker Daemon.
              </p>

              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-3">
                <strong>Note:</strong> Make sure Docker Desktop is installed and
                running before executing the build command. The Docker Daemon
                must be active to process the request.
              </div>

              <CodeBlockWithCopy
                language="bash"
                content={`docker build -t myapp:v1 .  # Builds a Docker image from the Dockerfile in the current directory and tags it as "myapp" with version "v1"`}
              />

              <p>
                The <strong>Docker Daemon</strong> reads the Dockerfile and
                builds a layered image.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Optional: Rebuild or Create a New Image Version
              </h3>

              <p className="text-muted-foreground">
                If you update your application or encounter errors, update your
                dockerfile, rebuild the image. You can either reuse the same
                version tag or create a new one.
              </p>

              <CodeBlockWithCopy
                language="bash"
                content={`# Rebuild using the same tag (overwrites previous image)
docker build -t myapp:v1 .`}
              />

              <CodeBlockWithCopy
                language="bash"
                content={`# OR build a new version tag (recommended for updates)
docker build -t myapp:v2 .`}
              />

              <p className="text-muted-foreground">
                If issues persist, force a clean rebuild without using cached
                layers:
              </p>

              <CodeBlockWithCopy
                language="bash"
                content={`docker build --no-cache -t myapp:v2 .`}
              />

              <p className="text-muted-foreground">
                If a previous container is still running, stop and remove it
                before running the updated image:
              </p>

              <CodeBlockWithCopy
                language="bash"
                content={`docker ps
docker stop <container_id>
docker rm <container_id>`}
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Step 5: Docker Image is Created
              </h3>

              <p className="text-muted-foreground">
                Once the build process completes, Docker creates a new image
                based on the instructions defined in your Dockerfile.
              </p>

              <p className="text-muted-foreground">The image contains:</p>

              <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
                <li>Minimal Linux base operating system</li>
                <li>Node.js runtime environment</li>
                <li>Your application source code</li>
                <li>All required dependencies</li>
              </ul>

              <p>
                Docker images are <strong>immutable</strong>, meaning they
                cannot be modified after creation. Each version is identified
                using a <strong>tag</strong> (e.g., <code>myapp:v1</code>).
              </p>

              <p className="text-muted-foreground">
                You can verify the newly created image using:
              </p>

              <CodeBlockWithCopy
                language="bash"
                content={`$ docker images    # List all locally available Docker images`}
              />

              <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-3">
                <p className="mb-1 text-muted-foreground">
                  You can explore and search for official and community Docker
                  images on Docker Hub.
                </p>
                <a
                  href="https://hub.docker.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  https://hub.docker.com/
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Step 6: Push to Docker Registry (Optional)
              </h3>

              <p className="text-muted-foreground">
                To share your image with others or deploy it in production, you
                can push it to a Docker registry such as Docker Hub.
              </p>

              <CodeBlockWithCopy
                language="bash"
                content={`$ docker login                          # Authenticate with Docker Hub
$ docker tag myapp:v1 username/myapp:v1  # Tag image with your Docker Hub username
$ docker push username/myapp:v1          # Upload image to Docker registry`}
              />

              <p className="text-muted-foreground">
                You can find your Docker username in the Docker Desktop
                application under your profile section.
              </p>

              <p className="text-muted-foreground">
                Once pushed, the image is stored in the registry and can be
                pulled on any server using:{" "}
              </p>

              <CodeBlockWithCopy
                language="bash"
                content={`docker pull username/myapp:v1`}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Step 7: Run Container</h3>

              <CodeBlockWithCopy
                language="bash"
                content={`docker run -p 3000:3000 myapp:v1  # Runs the container and maps host port 3000 to container port 3000 because containers are isolated and have their own internal ports.`}
              />

              <p className="text-muted-foreground">
                If your application uses environment variables, use the{" "}
                <code>--env-file</code> option to securely load them from a{" "}
                <code>.env</code> file (make sure .env file exists in your
                current dir):
              </p>

              <CodeBlockWithCopy
                language="bash"
                content={`docker run --env-file .env -p 3000:3000 myapp:v1`}
              />

              <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-3">
                <p className="text-sm text-muted-foreground">
                  This keeps sensitive values (like database URLs or API keys)
                  outside the Docker image instead of baking them into it.
                </p>
              </div>

              <p className="text-muted-foreground">
                Docker creates and starts a new container instance from the
                image.
              </p>

              <p className="text-muted-foreground">
                If the image already exists locally, Docker immediately starts
                the container and prints the container ID.
              </p>

              <p className="text-muted-foreground">
                You can verify the running container using:
              </p>

              <CodeBlockWithCopy
                language="bash"
                content={`$ docker ps   # List running containers`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const WorkflowDiagram = () => {
  const openInNewTab = () => {
    window.open(PackageApplicationsImage.src, "_blank");
  };

  return (
    <section
      id="workflow-diagram"
      data-scrollspy
      data-nav-title="Workflow Diagram"
      className="pt-6 md:pt-20"
    >
      <div className="relative w-full overflow-hidden rounded-xl md:rounded-4xl bg-[linear-gradient(to_right,var(--border-gradient-from),var(--border-gradient-via),var(--border-gradient-to))] shadow-xs">
        <button
          onClick={openInNewTab}
          aria-label="Open image in new tab"
          className="absolute top-2 md:top-4 right-2 md:right-4 z-10 rounded-full p-1.5 bg-foreground/70 backdrop-blur-md border border-background/10 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <Maximize2 className="w-3 h-3 text-background" />
        </button>

        <Image
          src={PackageApplicationsImage}
          alt="Workflow Diagram"
          className="w-full h-auto object-contain rounded-xl md:rounded-4xl"
          priority
        />
      </div>
    </section>
  );
};

export const PackageApplications = () => {
  return (
    <div>
      <WorkflowDiagram />
      <WorkflowDocumentation />
    </div>
  );
};
