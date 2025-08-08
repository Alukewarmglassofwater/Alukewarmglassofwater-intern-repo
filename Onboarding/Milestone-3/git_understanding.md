# Git concept: staging vs committing

### What is the difference between staging and committing?
- Staging allows you to select files or parts of files you intend to track the changes of. Once git add is ran the files are said to be in the staging area. Commiting is made after you stage files and is a record of the state of the files in the staging area at that specific point in time.

### Why does Git separate these two steps?
- Helps you avoid uneseccary commits.
- Allows you to carefully select what will get commited. Don't have to include unecessary junk files if they are any for example. 
- Can also use the staging area to see what is different between what you staged and what you changed (if you made some changes to a staged file and it broke the code for example). 
- Staged files stay staged. If you are working on files and, for whatever reason, forget what files you changed, they will be tracked in the staging area.
- Can track file changes after staging, therefore can revert to the staged version if unecessary changes were made to the file post-staging. 

### When would you want to stage changes without committing?
- When you've made multiple unrelated changes and want to commit them separately. You can stage just one group of changes now and come back to the others later.
- When you're not done yet but want to save a clean version of certain files.
- To carefully prepare a commit. 

# Branching & Team Collaboration

### Why is pushing directly to main problematic?
- It can introduce broken code into main.
- It bypasses code review, allowing unverified code into production.
- It increases the risk of merge conflicts, especially in teams.
- It makes it harder to isolate bugs or roll back specific changes.

### How do branches help with reviewing code?
- Branches allow for programming to be done and changes to be made without effecting the main branch.
- Code can be reviewed through pull requests before merging into the main branch.
- Reviewers can leave comments and suggestions on specific lines of code.
- Helps maintain a stable main branch.

### What happens if two people edit the same file on different branches?
- If in different parts of the file, normally merged automatically.
- If the edits are on the same line then Git will raise a merge conflict and the end user has to edit said line themselves to clear it.
