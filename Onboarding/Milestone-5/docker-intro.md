# What is Docker and Why Use it?

## How does Docker differ from a virtual machine?

- A docker container allows the service running in the container to access the host kernel.
  In a virtual machine the kernel is emulated and communicated with the host kernel via the virtual kernel.
- It is OS'less, therefore anyone running windows, mac, linux etc... can run the same docker image.
- Images are much smaller than virtual machines as kernel, network, operating system,
  storage system etc. is not required. No hypervisor to maintain VMs so less overhead.
  Does not run all the same services.that would be running in a virtual machine. Only run the packaged application.
- Portable.

## Why is containerization useful for a backend like Focus Bear's?

- Simple for new developers to set up. Only require the docker compose file and docker does the rest.
  Easily setting up a backend environment for developers.
- Cross-compatibility with all systems FocusBear might use.
- Easy to rollback docker images. Helpful when something breaks.

## How do containers help with dependency management?

- Dependencies are isolated to the docker containers themselves.
  Multi-container apps don't have to have multiple dependency versions that may conflict with each running service.
  Also, when sharing across multiple dev machines, the dependencies installed on the host don't matter reducing OS->backend conflicts.
- Base image also freeze the environment the service is running on in the docker container. Further reducing compatibility issues.
- Docker images can be scanned quickly for know vulnerabilities, possibly integrated into a CI/CD pipeline, protecting the backend from potential vulnerabilities.

## What are the potential downsides of using docker?

- Docker is a complex system. If something breaks in between the docker container and docker daemon, troubleshooting/fixing that issue is no small feat.
- Possibly security vulnerability in the shared kernel? Sensitive operations may be visible to other contains from another container.
- Contains are ephemeral. If a docker container contains important files, they disappear once the container is stopped.
