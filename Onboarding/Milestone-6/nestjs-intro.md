# **Notes**

## Research what NestJS is and how it differs from Express.js

- Both use javascript as their language.
- NestJS is an opinionated, structure framework built upon Node.js. It is an enterprise grade framework which is highly scalable.
  -- It has strong conventions, making the project more straightforward for beginners.
  -- Relatively strong functionality from its default configuration.
- Express.js is minimal and unopinionated by comparison. It provides middleware and routing however all other functionality must be written by the user.
  -- Highly flexible compared to NestJS.

## Explore NestJS's modular architecture (Modules, Controllers, Services)

### Module

- A logical grouping of related components (controllers, services, providers).
- Decorated with `@Module()`.
- Can import/export other modules to share functionality.
- Every NestJS app has at least one root module (`AppModule`).

### Controller

- Handles incoming requests and returns responses.
- Decorated with `@Controller()`.
- Defines route handlers using decorators like `@Get()`, `@Post()`, etc.
- Actual application logic is handled by Services. Controllers are relatively simple in that they route traffic to the correct Service, take the Service output, and send it back to the user.

### Service

- Encapsulates business logic and data access.
- Queries databases, processes data and returns them to the controller(s).
- Decorated with `@Injectable()`.
- Can be injected into controllers or other services using NestJS’s dependency injection.

## Understand why dependency injection is a key concept in NestJS

- Dependencies of a component are provided as input by an external entity. E.g. an injector.
- Allows the creation of dependent objects outside of a class provider and provides the objects to whatever class that needs them.
- E.g. A class doesn't create anything itself, more so whatever it needs is injected into the class as required.
- You can write a class, decorate it with `@Injectable()`, and register it in a module’s `providers` array for it to be available for injection elsewhere in the application.

### With DI and Without DI example:

```js
class CatsController {
  private catsService = new CatsService(); // you manually create it
}
```

```js
class CatsController {
  constructor(private catsService: CatsService) {} // Nest creates & injects it
}
```

### Constructor (General)

- A special method in a class that runs automatically when the class is instantiated.
- Can take outside variables (parameters) and initialize them as properties inside the object.
- In NestJS, constructors are also used to receive injected dependencies from the DI container.

### Dependency Injection in NestJS

- Automatically creates and initializes instances of other classes (providers) and passes them into your class via the constructor.
- Removes the need to manually instantiate dependencies with new.
- Managed by Nest’s IoC (Inversion of Control) container, which handles creation, configuration, and reuse (singleton by default).

## Find out how decorators (@controller(), @Injectable()) work in NestJS

### How Decorators Work in NestJS

- Special TypeScript/JavaScript functions prefixed with `@` that attach metadata to classes, methods, properties, or parameters.
- A decorator is essentially a function that receives the target it decorates and can annotate or modify it.

---

#### Common NestJS Decorators

##### `@Controller()`

- Marks a class as a controller that can handle incoming requests.
- Optional argument defines the route prefix for all routes in that controller.

##### `@Injectable()`

- Marks a class as a provider that can be managed by Nest’s Dependency Injection system.
- Needs to be there to allow a class to be injected into other classes.
- Used for services, repositories, helpers, and other reusable logic.
- The class becomes a provider when it is decorates as an Injectable.

# **Reflection**

## Key Differences Between NestJS and Express.js

- Both use JavaScript (and TypeScript for NestJS by default).
- NestJS:
  - Opinionated, structured framework built on Node.js.
  - Enterprise-grade and highly scalable.
  - Strong conventions make projects more straightforward for beginners.
  - Provides rich functionality from its default configuration.
- Express.js:
  - Minimal and unopinionated.
  - Provides middleware and routing only; all other functionality must be written by the developer.
  - More flexible than NestJS but with less built-in structure.

---

## Why NestJS Uses Decorators Extensively

- Decorators are special functions prefixed with `@`. Attach metadata to classes giving them further functionality.
- They let NestJS define the role of a class or method (e.g., controller, provider) without manually configuring everything.
- Examples:
  - `@Controller()` → marks a class to handle incoming HTTP requests.
  - `@Injectable()` → marks a class as a provider that can be managed and injected by Nest’s DI system.

---

## How NestJS Handles Dependency Injection

- Dependencies of a component are provided as input.
- You can write a class, decorate it with `@Injectable()`, and register it in a module’s `providers` array.
- The IoC container automatically:
  - Creates and initializes provider instances.
  - Injects them into constructors of classes that depend on them.
- This removes the need for manual instantiation with `new` and centralizes dependency management.

---

## Benefits of Modular Architecture in a Large-Scale App

- Containerization of application features
  - Each feature has its own module containing its controllers, services, and providers.
- Reusable modules, coincides with the clean code principle.
  - Modules can be imported into other modules or even other projects.
- Easier to maintain given code is 'modular'.
- Individual modules can be tested in isolation.
- New features can be added as new modules without affecting unrelated parts of the application.
