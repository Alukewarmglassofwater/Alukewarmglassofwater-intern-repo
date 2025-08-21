# How does Auth0 store and manage user roles?

- Define permissions on an API; bundle them into roles that can be assigned to user requests to that API.
- Permissions can be added to access tokens; roles usually via a namespaced custom clai when the access token is generated. E.g.
  node -e "console.log(require('jsonwebtoken').sign(
  {
  sub: 'user123',
  iss: 'http://localhost/',
  aud: 'api://default', (audience, what API is this token for. Can build a function to check that the request is getting the correct token)
  'https://test/roles': ['user'] // generates a token that is not for 'admin' but 'user'. API checks this field in the token.
  },
  'dev-secret',
  { algorithm: 'HS256', expiresIn: '1h' }
  ))"
- Client sends the generated token in their request. Authorization is handled by the backend.
- Best practice ia to authorize by permissions and then use roles to group them.

# What is the purpose of a guard in NestJS?

- Runs before controllers to allow/deny requests.
- Used for authentication (e.g., JSON Web Token (JWT)) and authorization (roles/permissions).
- Implements CanActivate; return true or throw (e.g., Unauthorized, Forbidden).

# How would you restrict access to an API endpoint based on user roles?

- Ensure JWT auth populates req.user (field attached to express request that the API can now check against to deterime auth logic).
- Put roles in a namespaced claim (or use permissions).
- Write a guard that checks req.user[<namespace>].includes('admin').
- Apply: @UseGuards(JwtAuthGuard, AdminOnlyGuard) on the route.

# What are the security risks of improper authorization, and how can they be mitigated?

- IDOR (Insecure Direct Object Reference) / BOLA (Broken Object Level Authorization) → check ownership/entitlements on the server to prevent.
- Privilege escalation. Make sure least privilege is enforced; explicit allow checks.
- Unverified tokens → validate signature, issuer, audience, expiry.
- Misconfig (algorithm and or secret used) → correct algorithm as well as secure secrets in use and they are rotated.
- Overlogging → never log tokens; redact logs if possible.
- Lack of audit → audit often and review roles regularly so principle of least privilege is enforced.
