# What is CI/CD and why is it used in software development?

- Continuous integration and continous deployment is the concept where small code changes are merged into main frequently. Every merge 'request' runs a pipeline that both builds and tests code. Only deploying it into production when all these checks are passed and code standards are met.

# What is the purpose of ci/cd

- ship small changes often with confidence
- catch bugs and or format issues early with repeatable checks
- Forces main to always be deployable

# How does automating style checks improve project quality

- Enforces a single code style across the repo
- Stops nitpicks in reviews and speeds them up by catching simple mistakes
- Builds trust that any branch meets a baseline standard

# What are some challenges with enforcing checks in ci/cd

- Flaky tools can cause constant errors. Annoying the user.
- Slow pipelines can block merge requests, slowing the project down
- Legacy files that may have been formatted incorrectly throw errors
- Possibly false positives can make the user ignore alerts overtime?

# How do ci/cd pipelines differ between small projects and large teams

## Small projects

- One pipeline, a few jobs, fast builds as the project is simpler
- Broad pipeline checks on every push
- Simple approvals/auto deployment

## Large teams

- Many pipelines per service/domain/software component
- Required reviews from other team members
- Deployment has to be staged and checked for if not could break production
- More built in guard rails/checks to prevent issues that would occur in smaller projects occuring in larger ones
