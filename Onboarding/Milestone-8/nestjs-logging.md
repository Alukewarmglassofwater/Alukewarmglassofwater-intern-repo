# Notes

- NestJS pino is a nestjs module that allows you to use Pino to create logs
- Automatically logs HTTP requests/responses, errors and context
  - Faster than default logger
  - Structured
  - Can tie logs to a request lifecycle

# Reflection

### What are the benefits of using nestjs-pino for logging?

- Faster than the built in logger.
- Returned logs are structured in JSON.
- Integrated into HTTP request/response cycle automatically.

---

### How does global exception handling improve API consistency?

- Ensures all endpoints return errors in the same JSON structure, rather than inconsistent errors.
- Centralized place One place to manage how errors are logged and formatted, avoiding repetition in controllers.
- Can tune what logs displays, potentailly preventing data leakage.

---

### What is the difference between a logging interceptor and an exception filter?

- Logging Interceptor:
  - Runs around a request (before and after controller execution).
  - Typically used to measure response time, log input/output, or trace requests.
- Exception Filter:
  - Only runs when an error/exception is thrown.
  - Used to catch, log, and format specific error responses.
  - Error handling only. Literally filters exceptions that occur.

---

### How can logs be structured to provide useful debugging information?

- Include request context: HTTP method, URL, headers, and request ID (for correlation).
- Add user/session info: If authenticated, include user ID or role.
- Log error details: Status code, message, and stack trace for exceptions.
- Use structured fields: JSON key-value pair format.
- Consistent format of custom logging ensures logs are easy to read and search through.
