# Commit and Push

Commit staged changes to git and push to GitHub with proper commit message formatting.

## Instructions

This command will help you:
1. Review current git status and staged changes
2. Generate a conventional commit message following project standards
3. Commit the changes
4. Push to the remote repository (GitHub)

## Commit Message Format

Follow the conventional commit format used in this project:

```
<emoji> <type>: <description>

<optional body>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Commit Types & Emojis

- `✨ feat:` - New feature
- `🐛 fix:` - Bug fix
- `📝 docs:` - Documentation changes
- `♻️ refactor:` - Code refactoring (no feature change)
- `🎨 style:` - Formatting, styling (no code change)
- `⚡️ perf:` - Performance improvements
- `✅ test:` - Adding or updating tests
- `🔧 chore:` - Maintenance, tooling, dependencies
- `🚀 deploy:` - Deployment-related changes
- `🔥 remove:` - Removing code or files

## Process

1. **Check git status**
   - Run `git status` to see current state
   - Review staged and unstaged changes
   - Confirm working directory is clean or identify changes

2. **Review staged changes**
   - Run `git diff --staged` to see what will be committed
   - If no changes staged, ask user if they want to stage files
   - List files that would be committed

3. **Review recent commits**
   - Run `git log -5 --oneline` to see recent commit style
   - Match the emoji and format pattern

4. **Generate commit message**
   - Analyze the changes
   - Determine appropriate type and emoji
   - Write clear, concise description (50 chars or less)
   - Add body if needed (wrap at 72 chars)
   - Include attribution footer

5. **Show commit message to user**
   - Display the proposed commit message
   - Ask for confirmation or modifications
   - Allow user to edit message if needed

6. **Commit changes**
   - Use heredoc format for multi-line messages
   - Example: `git commit -m "$(cat <<'EOF' ... EOF)"`
   - Verify commit was successful

7. **Check remote status**
   - Run `git status` to see if ahead of remote
   - Check which branch is current

8. **Push to remote**
   - Ask user to confirm push
   - Run `git push` (or `git push -u origin <branch>` if new branch)
   - Confirm push was successful

## Git Safety Rules

**CRITICAL: Always follow these safety rules:**

- ✅ Review changes before committing
- ✅ Show commit message for user approval
- ✅ Confirm before pushing
- ✅ Use proper commit message format
- ✅ Check remote status before push
- ❌ NEVER use `--force` or `--force-with-lease` without explicit user request
- ❌ NEVER push to main/master with force
- ❌ NEVER skip hooks (--no-verify) unless explicitly requested
- ❌ NEVER amend commits that have been pushed (without explicit permission)
- ❌ NEVER commit sensitive information (API keys, passwords, credentials)

## Examples

### Example 1: Feature Commit
```bash
User: "/commit-and-push"

# Claude reviews changes, generates:
✨ feat: add Card component with variants

Implemented Card component with:
- Base structure and compound components
- Primary, secondary, and outline variants
- CSS Modules with design tokens
- Storybook stories for all variants

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Example 2: Bug Fix
```bash
🐛 fix: correct button focus state styles

Fixed focus ring not showing on keyboard navigation.
Updated focus-visible styles to use proper outline tokens.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Example 3: Documentation
```bash
📝 docs: update component usage examples

Added examples for:
- Compound component pattern
- Variant combinations
- Accessibility guidelines

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Example 4: Chore
```bash
🔧 chore: update dependencies

Updated CVA to latest version and fixed type issues.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

## Guidelines

### Commit Message Best Practices

- **Description**: Clear, imperative mood ("add" not "added")
- **Length**: First line ≤50 chars, body lines ≤72 chars
- **Focus**: Single logical change per commit
- **Context**: Include why, not just what
- **Reference**: Link to issues/tasks if relevant

### When NOT to Commit

- Incomplete features (prefer feature branches)
- Broken/non-compiling code
- Sensitive data (API keys, credentials, secrets)
- Large binary files without Git LFS
- Generated files that should be in .gitignore

### Push Considerations

- **Review**: Always review what you're pushing
- **Remote**: Confirm you're pushing to the correct remote/branch
- **CI/CD**: Consider if push will trigger automated deployments
- **Team**: Ensure branch is ready for team collaboration

## Troubleshooting

### No changes staged
```
Nothing to commit. Use 'git add <file>' to stage changes.
```
→ Ask user which files to stage or if they want to stage all

### Diverged branches
```
Your branch and 'origin/main' have diverged.
```
→ Suggest `git pull --rebase` or `git pull` before pushing
→ DO NOT auto-resolve, ask user how to proceed

### Push rejected
```
Updates were rejected because the remote contains work...
```
→ Suggest pulling changes first
→ NEVER force push without explicit permission

### Commit hook failed
```
Pre-commit hook failed...
```
→ Show hook error to user
→ Ask if they want to fix issues or skip hook (their decision)
→ If user says skip, use `--no-verify` (only with permission)

## Integration with Notion

**Optional**: After successful push, update related Notion tasks:
- Update task status to "Review" or "Done"
- Add comment with commit SHA and push confirmation
- Link to GitHub commit URL
- Note files changed

## Advanced Usage

### Stage specific files
```
User: "/commit-and-push src/components/Button/"
```
→ Stage only files in that directory

### Quick commit (if changes already staged)
```
User: "/commit-and-push with message: fix button padding"
```
→ Skip message generation, use provided message (add emoji/footer)

### Commit without push
```
User: "/commit-and-push --no-push"
```
→ Commit but don't push to remote

### Custom branch
```
User: "/commit-and-push to feature/new-component"
```
→ Push to specified branch instead of current

## Notes

- This command combines multiple git operations for convenience
- Always maintains git best practices and safety
- Follows project-specific commit message conventions
- Integrates with GitHub CLI when available
- Can be extended to create PRs after push
