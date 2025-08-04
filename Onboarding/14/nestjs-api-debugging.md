
# 1. Research tools for inspecting API requests

- **Postman**: A user-friendly GUI for sending and inspecting HTTP requests.
- **Bruno**: An open-source alternative to Postman, fully local and Git-friendly.
- **curl**: A command-line tool to make HTTP requests (comes pre-installed on many systems).

# 2. Log request payloads and headers in a NestJS controller


![alt text](image-1.png)

# 3. Inspect API responses and verify HTTP status codes

- API response is provided in the below screenshot. 
![alt text](image-2.png)


It can be seen that the return is correct with what was written in the class return statement as well as 201 created can be seen. This indicates that the POST request executed successfully and something was created on the server side. 

# 4. Use middleware or interceptors to modify and analyze API responses

-- Middleware is a function that runs before the controller class is ran. So I guess I can modify the request by catching it before it hits the controller?


Evidence of the middleware class loggin and returning a different response than was was originally returned by the controller.

![alt text](image-3.png)


Tried an injectable. Will only run if no return occurs from the middleware. I guess that is because if the middleware runs and returns then the controller is never hit by the request and therefore the injectable wont run.

![alt text](image-4.png)