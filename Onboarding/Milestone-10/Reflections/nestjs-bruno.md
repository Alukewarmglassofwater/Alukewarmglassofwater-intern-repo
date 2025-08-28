# Research what Bruno is and how it differs from Postman

- Bruno is an opensource API client.
  - Runs locally
  - Each requests is saves as a .bru file making it easy to sync with git.
  - No scripting ability. Supports custom environments and variables without extra plugins
  - Free
- Postman is an closedsource API client
  - Runs in the cloud
  - Cannot use Git, have to use Postman proprietary service for collaboration
  - JS scripting ability.
  - Free with a premium tier for extra features

# Install Bruno and create a new API collection

![alt text](image.png)

# Manually add and test a simple public NestJS API endpoint

![alt text](image-1.png)

# Explore how to pass headers and authentication tokens in Bruno

![alt text](image-2.png)

- Old auth token passed to API. Confirmation of JWT seen in response. Not sure why a new token doesn't seem to work. Must be a routing error somewhere. Will take too long to debug given the size of the NestJS app currently.

# Reflection

## How does Bruno help with API testing compared to Postman or cURL?

- Bruno is open source, local to the machine and every request is a .bru file. Making it easy to integrate with Git.
- Postman is feature rich but requires a subscription to access the higher features. Overkill for our current requirements.
- cURL is fast and is installed with every linux distro. Its nice for quick one-off requests but gets messy when requests become complex.

## How do you send an authenticated request in Bruno?

- You create a new requests and go to the Auth tab, where you specify the type of security, in my NestJS applications case, a JWT Bearer Token, include the token, then send the request as per normal.

## What are the advantages of organizing API requests in collections?

- Easier to understand what the requests are there to test
- Easy to repeat if you know where they are and what they are intended to do

## How would you structure a Bruno collection for a NestJS backend project?

- Possible a Env directory, followed by local, staging and prod .env files so I can test different versions of the project. From there I will have subfolders that test different aspects of the API. E.g. an auth folder for authentication and a items folder for database queries.
