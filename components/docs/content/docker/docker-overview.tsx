"use client";

import DockerOverviewImage from "@/assets/content/docker-overview.png";
import { CodeBlock } from "@/components/code-block";
import { Maximize2 } from "lucide-react";
import Image from "next/image";

// export const InstallationForMac = () => {
//   return (
//     <section
//       id="installation-for-mac"
//       data-nav-title="Installation for macOS"
//       data-scrollspy
//       className="pt-6 space-y-8"
//     >
//       <div className="w-full text-foreground mx-auto">
//         <header className="mb-6 border-b border-foreground/40">
//           <h1 className="text-xl md:text-2xl font-medium flex items-center gap-3 mb-6">
//             Install Docker on macOS
//           </h1>
//         </header>

//         <div className="mb-12 space-y-3">
//           <h3 className="text-lg md:text-xl font-medium">
//             Step 0 — Check Your Mac Type
//           </h3>

//           <p>
//             Click the Apple logo () → <strong>About This Mac</strong> and check
//             your processor type:
//           </p>

//           <ul className="list-disc ml-3 space-y-2">
//             <li>Apple Silicon (M1, M2, M3) → Download ARM version</li>
//             <li>Intel Chip → Download Intel version</li>
//           </ul>
//         </div>

//         <div className="mb-12 space-y-3">
//           <h3 className="text-lg md:text-xl font-medium">
//             Step 1 — Download Docker Desktop
//           </h3>

//           <p>Visit the official Docker website:</p>

//           <a
//             href="https://www.docker.com/products/docker-desktop/"
//             target="_blank"
//             className="text-blue-600 underline break-all"
//           >
//             https://www.docker.com/products/docker-desktop/
//           </a>

//           <p>
//             Download the correct version for your Mac (Apple Silicon or Intel).
//           </p>
//         </div>

//         <div className="mb-12 space-y-3">
//           <h3 className="text-lg md:text-xl font-semibold">
//             Step 2 — Install Docker
//           </h3>

//           <ul className="list-disc ml-3 space-y-2">
//             <li>
//               Open the downloaded <code>.dmg</code> file
//             </li>
//             <li>
//               Drag <strong>Docker.app</strong> into the Applications folder
//             </li>
//             <li>Open Docker Desktop from Applications</li>
//           </ul>

//           <p>
//             If macOS shows a security popup, click <strong>Open</strong>.
//           </p>
//         </div>

//         <div className="mb-12 space-y-3">
//           <h3 className="text-lg md:text-xl font-semibold">
//             Step 3 — Grant Permissions
//           </h3>

//           <p>
//             Docker may request system permissions and your password. Approve
//             these to allow Docker to install required networking components.
//           </p>
//         </div>

//         <div className="mb-12 space-y-3">
//           <h3 className="text-lg md:text-xl font-semibold">
//             Step 4 — Verify Installation
//           </h3>

//           <div className="bg-foreground text-background p-3 rounded-md font-mono text-sm">
//             <div>$ docker --version</div>
//             <div>$ docker run hello-world</div>
//           </div>

//           <p>If successful, you will see:</p>

//           <div className="bg-foreground text-background p-3 rounded-md font-mono text-sm">
//             Hello from Docker! <br />
//             This message shows that your installation appears to be working
//             correctly.
//           </div>
//         </div>

//         <div className="mb-12 space-y-3">
//           <h3 className="text-lg md:text-xl font-semibold">
//             Optional: Install via Homebrew
//           </h3>

//           <div className="bg-foreground text-background p-3 rounded-md font-mono text-sm">
//             brew install --cask docker
//           </div>

//           <p>After installation, open Docker from the Applications folder.</p>
//         </div>
//       </div>
//     </section>
//   );
// };

export const DockerCommands = () => {
  return (
    <section
      id="docker-commands"
      data-nav-title="Docker Commands"
      data-scrollspy
      className="animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div>
        <h3 className="text-xl md:text-2xl font-medium mb-4">
          Docker CLI Commands
        </h3>

        <CodeBlock
          language="bash"
          content={`# Docker Installation & Status
docker --version # Shows the installed Docker version.
docker ps # Lists running containers (also confirms Docker daemon is running).
docker info # Displays detailed system-wide Docker information.

# Docker Images
docker pull <image_name> # Downloads an image from Docker Hub or registry.
docker images # Lists all locally available images.
docker rmi <image_id> # Removes a Docker image.
docker rmi -f <image_id> # Force removes an image (even if used by container).

# Docker Containers
docker run <image_name> # Creates and runs a new container.
docker run -it <image_name> # Runs container in interactive terminal mode.
docker run -d -p 3000:3000 --name node-js <image_name> # Runs in detached mode and maps port 3000.
docker ps # Lists running containers.
docker ps -a # Lists all containers (running + stopped).
docker stop <container_id> # Stops a running container.
docker start <container_id> # Starts a stopped container.
docker restart <container_id> # Restarts a container.
docker rm <container_id> # Deletes a stopped container.
docker rm -f <container_id> # Force deletes a container.

# Docker Logs & Debugging
docker logs <container_id> # Shows container logs.
docker logs -f <container_id> # Streams logs in real-time.
docker exec -it <container_id> /bin/bash # Opens interactive bash shell.
docker exec -it <container_id> /bin/sh # Opens sh shell (Alpine-based images).

# Dockerfile Commands
docker build -t <image_name> . # Builds Docker image from Dockerfile.
docker run -p 3000:3000 <image_name> # Runs image and maps port 3000.

# Docker Compose (Multi-Container Apps)
docker compose up # Starts all services in docker-compose.yml.
docker compose up -d # Starts services in detached mode.
docker compose down # Stops and removes all services.
docker compose up --build # Rebuilds images before starting.

# Docker Volumes
docker volume create <volume_name> # Creates a named volume.
docker volume ls # Lists all volumes.
docker run -v <volume_name>:/data <image_name> # Mounts volume into container.
docker volume rm <volume_name> # Deletes a volume.

# Docker Networks
docker network ls # Lists all Docker networks.
docker network create <network_name> # Creates a custom network.
docker run --network <network_name> <image_name> # Runs container inside network.
docker network inspect <network_name> # Shows network details.

# Production-Grade Commands
docker run -d --restart unless-stopped <image_name> # Restart container automatically unless manually stopped.
docker run --env-file .env <image_name> # Inject environment variables from file.
docker run -m 512m <image_name> # Limits container memory to 512MB.

# Cleanup Commands
docker container prune # Removes all stopped containers.
docker image prune # Removes dangling images.
docker system prune # Removes unused containers, networks, images.
docker system prune -a # Aggressive cleanup (removes all unused images).
`}
        />
      </div>
    </section>
  );
};

export const WorkflowDocumentation = () => {
  return (
    <section
      id="workflow-documentation"
      data-nav-title="Workflow Documentation"
      data-scrollspy
      className="animate-in fade-in slide-in-from-bottom-4 duration-500 pt-8 md:pt-12"
    >
      <div className="w-full text-foreground mx-auto">
        <header className="mb-8 border-b border-border pb-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Docker
            </h1>

            <div className="text-sm text-muted-foreground">
              Last updated: 06 Feb 2026
            </div>
          </div>
        </header>

        <div className="mb-12">
          <div className="p-5 rounded-xl shadow-xs border border-foreground/20 border-l-4 border-l-foreground/50">
            <p className="text-muted-foreground text-sm">
              Docker packs your application, dependencies, and configs into a
              portable box called a <strong>container</strong>, so it runs the
              same everywhere.{" "}
              <span className="italic">
                (aka Docker is an open-source platform that enables developers
                to build, package, distribute, and run applications inside{" "}
                <strong>lightweight, portable containers</strong>.)
              </span>
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h4 className="text-xl md:text-2xl font-medium mb-4">
            Client-Server Architecture
          </h4>
          <p>
            Docker follows a client-server architecture. The Docker Client
            communicates with the Docker Daemon using a REST API.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            Why do we need docker ?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-5 rounded-lg border border-foreground/20">
              <h3 className="font-medium mb-3">Before Docker (The Chaos)</h3>
              <ul className="space-y-2 text-sm list-disc pl-5">
                <li>Mismatched Node/Python versions</li>
                <li>Missing system libraries</li>
                <li>OS differences (Mac vs Linux)</li>
                <li>Conflicting dependencies</li>
              </ul>
            </div>
            <div className="p-5 rounded-lg border border-foreground/20">
              <h3 className="font-medium mb-3">After Docker (The Order)</h3>
              <ul className="space-y-2 text-sm list-disc pl-5">
                <li>Identical environment for every dev</li>
                <li>One-command setup</li>
                <li>Instant developer onboarding</li>
                <li>Reliable deployments</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-medium mb-8">
            Understanding the Docker Workflow
          </h2>

          <div className="space-y-8 mt-8">
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-medium">
                1. Docker Client
              </h3>

              <p>
                The Docker Client is the primary interface you use to interact
                with Docker. It is the command-line tool (<code>docker</code>)
                that allows you to send instructions to the Docker Engine
                (Daemon).
              </p>

              <p>
                When you type a Docker command in your terminal, the client does
                not execute it directly. Instead, it sends a request to the
                Docker Daemon, which performs the actual work such as building
                images, running containers, or pulling images from a registry.
              </p>

              <h4 className="font-medium mt-4">How It Works</h4>
              <ul className="list-disc ml-6 space-y-2">
                <li>You enter a Docker command in the terminal.</li>
                <li>The Docker Client parses the command.</li>
                <li>It sends the request to the Docker Daemon via REST API.</li>
                <li>The Daemon executes the request.</li>
                <li>
                  The result/output is sent back to the client and displayed.
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-medium">
                2. Docker Host (The Engine)
              </h3>

              <p>
                The Docker Host is the machine where Docker is installed and
                running. It can be:
              </p>

              <ul className="list-disc ml-6 space-y-1">
                <li>Your local development laptop</li>
                <li>A cloud virtual machine (AWS, GCP, Azure)</li>
              </ul>

              <p>
                Inside the Docker Host, three major components work together:
              </p>

              <div className="bg-card p-4 rounded-lg border shadow-sm space-y-3">
                <span className="font-medium text-md block">
                  1. Docker Daemon
                </span>

                <p className="text-sm">
                  The Docker Daemon is the core background service running in
                  the background. It listens for requests from the Docker Client
                  and performs container-related operations.
                </p>

                <ul className="list-disc ml-6 text-sm space-y-1">
                  <li>Build Docker images</li>
                  <li>Pull and push images from registries</li>
                  <li>Create and start containers</li>
                  <li>
                    Manage container lifecycle (start, stop, restart, remove)
                  </li>
                  <li>Handle networking between containers</li>
                  <li>Manage volumes for persistent storage</li>
                </ul>

                <p className="text-sm">
                  The daemon is what actually performs the work. Without it,
                  containers cannot run.
                </p>
              </div>

              <div className="bg-card p-5 rounded-lg border shadow-sm space-y-3">
                <span className="font-medium text-md block">
                  2. Docker Images
                </span>

                <p className="text-sm">
                  A Docker Image is a read-only template used to create
                  containers. It contains everything required to run an
                  application:
                </p>

                <ul className="list-disc ml-6 text-sm space-y-1">
                  <li>Base operating system (usually Linux)</li>
                  <li>Runtime environment (Node, Python, Java, etc.)</li>
                  <li>Application code</li>
                  <li>Dependencies and libraries</li>
                  <li>Environment configuration</li>
                </ul>

                <p className="text-sm">
                  Images are built using a <strong>Dockerfile</strong>, and they
                  are layered. Each instruction in the Dockerfile creates a new
                  layer. This layered architecture improves caching and
                  performance.
                </p>

                <p className="text-sm">
                  Images are immutable. Once created, they do not change. Any
                  modification results in a new image version.
                </p>
              </div>

              <div className="bg-card p-5 rounded-lg border shadow-sm space-y-3">
                <span className="font-medium text-md block">
                  3. Docker Containers
                </span>

                <p className="text-sm">
                  A container is a running instance of a Docker Image. It is
                  lightweight and isolated from the host system and other
                  containers.
                </p>

                <ul className="list-disc ml-6 text-sm space-y-1">
                  <li>Shares the host OS kernel</li>
                  <li>Runs as an isolated process</li>
                  <li>Starts in seconds</li>
                  <li>Consumes fewer resources than virtual machines</li>
                </ul>

                <p className="text-sm">
                  Containers are ephemeral by default, meaning any data stored
                  inside them is lost when the container is removed unless
                  volumes are used.
                </p>

                <p className="text-sm">
                  Multiple containers can run on a single Docker Host, each
                  isolated but sharing the same underlying system resources.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-medium">
                3. Docker Registry
              </h3>

              <p>
                A Docker Registry is a centralized storage system where Docker
                images are stored, versioned, and distributed.
              </p>

              <p>
                Similar to how GitHub stores source code or npm stores
                JavaScript packages.
              </p>

              <p>
                The most popular public registry is <strong>Docker Hub</strong>,
                but organizations can also host private registries for internal
                use.
              </p>

              <h4 className="font-medium mt-4">What a Registry Stores</h4>
              <ul className="list-disc ml-6 space-y-2">
                <li>Docker images</li>
                <li>Image versions (tags)</li>
                <li>Metadata and configuration</li>
              </ul>

              <h4 className="font-medium mt-4">Image Tags & Versioning</h4>

              <CodeBlock
                language="bash"
                content={`nginx:latest
node:18 
myapp:v1.0.2`}
              />

              <p>
                If no tag is specified, Docker automatically uses the
                <strong> latest </strong> tag by default.
              </p>

              <p>
                Proper version tagging is critical in production environments to
                ensure predictable deployments.
              </p>

              <h4 className="font-medium mt-4">
                {" "}
                How It Works (Push & Pull Flow)
              </h4>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <strong>Pull:</strong> Download an image from a registry to
                  your local Docker Host.
                </li>
                <li>
                  <strong>Push:</strong> Upload your locally built image to a
                  registry.
                </li>
              </ul>

              <CodeBlock
                language="bash"
                content={`docker pull nginx  # Download nginx image from Docker Hub
docker build -t myapp:v1 . # Build Docker image tagged as v1
docker push myapp:v1 # Push image to configured registry`}
              />

              <p>
                When you run a container and the image does not exist locally,
                Docker automatically pulls it from the registry.
              </p>

              <h4 className="font-medium mt-4">Authentication & Security</h4>

              <p>To push images to a registry, authentication is required.</p>

              <CodeBlock
                language="bash"
                content={`$ docker login # Authenticate with Docker Hub or private registry`}
              />
            </div>

            <div className="space-y-6">
              <h4 className="font-medium mt-4">
                Important Concept: The Client Does NOT Run Containers
              </h4>
              <p>
                A common misunderstanding is that the Docker Client runs
                containers. It does not. It only sends instructions. The Docker
                Daemon is the component that actually creates and manages
                containers.
              </p>

              <CodeBlock
                language="bash"
                content={`$ docker run nginx # Create and start a new nginx container`}
              />
              <p>In this example:</p>

              <ul className="list-disc ml-6 space-y-2">
                <li>The client sends "run nginx" to the daemon.</li>
                <li>The daemon checks if the image exists locally.</li>
                <li>If not, it pulls from Docker Hub.</li>
                <li>It creates and starts the container.</li>
                <li>The logs/output are returned to the client.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const WorkflowDiagram = () => {
  const openInNewTab = () => {
    window.open(DockerOverviewImage.src, "_blank");
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
          src={DockerOverviewImage}
          alt="Workflow Diagram"
          className="w-full h-auto object-contain rounded-xl md:rounded-4xl"
          priority
        />
      </div>
    </section>
  );
};

export const DockerOverview = () => {
  return (
    <div>
      <WorkflowDiagram />
      <WorkflowDocumentation />
      <DockerCommands />
      {/* <InstallationForMac /> */}
    </div>
  );
};
