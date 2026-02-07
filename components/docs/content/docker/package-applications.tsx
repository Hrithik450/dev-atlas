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
              Last updated: 06 Feb 2026
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
                Step 2: Create a Dockerfile
              </h3>

              <p className="text-muted-foreground">
                A Dockerfile is a set of instructions that tells Docker how to
                create an image for your application, including what software to
                install and how to start the app.
              </p>

              <CodeBlock
                language="bash"
                content={`my-node-app/
   |__ Dockerfile
   ├── package.json
   ├── package-lock.json
   ├── server.js`}
              />

              <CodeBlockWithCopy
                language="bash"
                content={`FROM node:18-alpine # picks a small, lightweight Linux image with Node.js version 18 pre-installed.
  WORKDIR /app # Sets the "home" folder inside the container where all commands will run.
  COPY package*.json ./ # Moves only your dependency lists over first to speed up future builds via caching.
  RUN npm install # Downloads and installs all the libraries your project needs inside the image.
  COPY . . # Copies the rest of your actual source code into the image.
  EXPOSE 3000 # Tells Docker the app will listen on port 3000 (standard for React/Node).
  CMD ["node", "server.js"] # The final instruction that actually starts your server when the container turns on.`}
              />

              <p>
                This Dockerfile provides a solid foundation and can be adapted
                for other applications.
              </p>

              <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-3">
                <p className="mb-2 text-muted-foreground">
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
                Step 3: Docker Client Sends Build Request
              </h3>

              <p className="text-muted-foreground">
                You run the build command. The Docker Client sends this request
                to the Docker Daemon.
              </p>

              <div className="rounded-2xl border border-border bg-secondary p-3">
                <strong>Note:</strong> Make sure Docker Desktop is installed and
                running before executing the build command. The Docker Daemon
                must be active to process the request.
              </div>

              <CodeBlockWithCopy
                language="bash"
                content={`docker build -t myapp:v1 . # Creates an image named myapp with version v1 using the Dockerfile in your current folder.`}
              />

              <p>
                The <strong>Docker Daemon</strong> reads the Dockerfile and
                builds a layered image.
              </p>

              <p>Output:</p>
              <CodeBlock
                language="bash"
                content={`[+] Building 6.3s (8/8) FINISHED
 => [internal] load build definition from Dockerfile      0.1s
 => => transferring dockerfile: 245B                      0.0s
 => [internal] load .dockerignore                         0.1s
 => => transferring context: 2B                           0.0s
 => [1/5] FROM docker.io/library/node:18-alpine          1.5s
 => [2/5] WORKDIR /app                                    0.2s
 => [3/5] COPY package*.json ./                           0.1s
 => [4/5] RUN npm install                                 3.8s
 => [5/5] COPY . .                                        0.1s
 => exporting to image                                    0.3s
 => => writing image sha256:abc123xyz                     0.1s
 => => naming to docker.io/library/myapp:v1               0.0s`}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Step 4: Docker Image is Created
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
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Step 5: Push to Docker Registry (Optional)
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
                Once pushed, the image is stored in the registry and can be
                pulled on any server using:{" "}
              </p>

              <CodeBlockWithCopy
                language="bash"
                content={`docker pull username/myapp:v1`}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Step 6: Run Container</h3>

              <CodeBlockWithCopy
                language="bash"
                content={`$ docker run -p 3000:3000 myapp:v1   # Run container and map port 3000`}
              />

              <p className="text-muted-foreground">
                Docker creates and starts a new container instance from the
                image.
              </p>

              <p>Output:</p>

              <CodeBlock
                language="bash"
                content={`Unable to find image 'myapp:v1' locally
v1: Pulling from library/myapp
Digest: sha256:abc123xyz
Status: Downloaded newer image for myapp:v1
3f5c8d9e7a12b4c56d789e0123abc456789def0123456789abcdef0123456789`}
              />

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
