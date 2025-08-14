# Reflection:

## How does dependency injection improve maintainability?

- Decouples classes from the concrete implementations of their dependencies. Allowing for more flexibility and maintainability.
- Allows for Jest testing as you can swap real dependencies with mocks/stubs in unit tests.
- Relatively simple dependency connection as it all occurs in the NestJS IoC container rather than pseudo-randomly (to a casual observer) across your code.
- Services can be reused in multiple modules without rewriting setup code, allowing easier maintainability as one class can be debugged versus multiple, slightly different variations of the same class across the codebase.
- Changing an implementation doesn’t require modifying all the classes that depend on it. Allowing for much easier scaling if dependency injection wasn't a part of the framework.

---

## What is the purpose of the `@Injectable()` decorator?

- Marks a class as a provider that can now be injected into other classes without having to initialize the class again.
- Class becomes managed by the IoC container, so its instances are automatically created and injected where the programmer specifies.

---

## What are the different types of provider scopes, and when would you use each?

---

### Singelton:

- Global scope for the provider. Once an application becomes bootstrapped all Singelton/default providers are created and available.

### Request:

- Provider is created on each incoming request to the application. Once the request has completed processing the provider is destroyed.

### Transient:

- Not shared across 'consumers' of the provider. Each consumer that request a transient provider will get their own instance of said provider (Unique to each consumer).

## How does NestJS automatically resolve dependencies?

- NestJS uses a combination of dependency injection (DI) along with TypeScript's built-in metadata reflection to automatically determine and provide the required dependencies for a class.
  -     TypeScript emits metadata stating that `Service1` is of type `Service1`. NestJS uses this metadata to look up a matching provider and inject it automatically.
