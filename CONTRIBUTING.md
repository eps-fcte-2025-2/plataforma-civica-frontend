# How to contribute

## Creating an Issue
Creating issues is a great way to help us improve the project by reporting bugs, suggesting new features, or documenting enhancements.

### Did you find a bug?

1. **Ensure the bug was not already reported** 

Search on GitHub under [Issues](https://github.com/eps-fcte-2025-2/plataforma-civica-frontend/issues) to see if the problem has already been reported.

2. **Open a new Issue** 

If you're unable to find an open issue addressing the problem, open a new one. Please provide as much relevant information as possible, such as:

* A step-by-step guide to reproducing the unexpected behavior.
* What you expected to happen vs. what actually happened.
* A code sample, screenshot, or video demonstrating the issue.

### Want to Suggest a New Feature?

1. **Check for existing requests** 

Before suggesting a new feature, please check the [Issues](https://github.com/eps-fcte-2025-2/plataforma-civica-frontend/issues). to see if it has already been requested.

2. **Open a new Issue**

If you can't find an open issue addressing the feature, open a new one. Provide a clear and detailed description explaining:

* The problem your feature aims to solve.
* The expected behavior of the new feature.

### Improving the Documentation
Good documentation is as important as good code. We welcome any help in making our docs clearer, more correct, and more complete. Improvements can range from fixing a simple typo to writing a new tutorial.

* **For small fixes** 

If you've found a typo, a broken link, or a sentence that could be clearer, feel free to open a Pull Request directly with the fix.

* **For major changes**

If you plan to rewrite a section, add a new guide, or make a structural change, please open an issue first to discuss your proposal. This ensures your effort aligns with the project's goals before you spend time on writing.

## Development Workflow

Our workflow is centered around GitHub Issues. All development, whether fixing a bug or implementing a new feature, must start from an issue. This ensures that every code change is connected to a documented requirement or problem.

Follow the steps below to start contributing code:

### 1. Pick an Issue

Browse the open [Issues](https://github.com/eps-fcte-2025-2/plataforma-civica-frontend/issues) and find one you would like to work on.

* Fell free to ask on the issue if there's lack of information to develop.
* Before you start, leave a comment on the issue to let everyone know you're working on it. Also change the issue status to `In Progress`. This prevents duplicate work.

### 2. Create Your Branch from the Issue

The easiest way to ensure the correct association is to create the branch directly from the issue page on GitHub.

In the right-hand sidebar of the issue page, look for the "Development" section and click "Create a branch". GitHub will automatically suggest a branch name, which you can adjust to fit our pattern.

### 3. Branch Naming Convention

We use a simple pattern to keep our branches organized. Your branch name must follow the format:

`[issue-number]-[type]-[short-description]`

`[issue-number]`: The number of the issue you are working on.

`[type]`: Describes the nature of the change. Use one of the following types:

* feat: For a new feature.

* fix: For a bug fix.

* docs: For documentation changes.

* style: For formatting and style changes that don't affect logic (spaces, semicolons, etc.).

* refactor: For code refactoring that neither fixes a bug nor adds a feature.

* test: For adding or fixing tests.

* chore: For build updates, dependency changes, or other maintenance tasks.

`[short-description]`: A short, 2-to-4-word description of the work, using hyphens as separators.`

**Examples**

*Issue #7, a new login feature:*

`7-feat-login-screen`

*Issue #15, a bug in the contact form:*

`15-fix-email-validation`

*Issue #23, an update to the README file:*

`23-docs-update-readme`

### 4. Format Your Commits (Convetional Commits)
To maintain a clear and readable version history, we use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) standard. Each commit message should objectively describe what was done.

The commit message structure is as follows:

`<type>(<scope>): <subject>`

`<type>`: Defines the category of the change. Use the same types we use for branches (feat, fix, docs, refactor, test, etc.).

`<scope>`: (optional): Describes the part of the codebase that was changed (e.g., login, api, button-component).

`<subject>`: A concise summary of the change, written in the imperative mood (e.g., "add" instead of "added" or "adds"). Start with a lowercase letter and do not end with a period.

**Examples**

*A simple new feature:*

```bash 
git commit -m "feat: allow users to share articles"
```

*A feature with a specific scope (the part of the app affected):*

```bash 
git commit -m "feat(auth): implement social login with Googles"
```

### 5. Open a Pull Request (PR)
With your changes properly committed, push your branch to the remote repository (git push origin your-branch-name). Then, open a Pull Request (PR) on GitHub so your code can be reviewed and merged into the project.

### 6. Keep the Issue Updated
Communication is key. Please add comments to the original issue to keep everyone informed about your progress. This helps maintainers track the status of your work and allows others to offer help or feedback.

It's good practice to comment when you:

* Run into a problem or have a question.
* Would like feedback on your approach.
* Finish the work and are about to open a Pull Request.