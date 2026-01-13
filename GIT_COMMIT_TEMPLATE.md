# Git Commit Message Template Setup and Usage Guide

## 📋 Overview

This project uses an English commit message template. Maintain a consistent commit message format through the `.gitmessage` file.

## 🔧 Setup Instructions

### 1. Global Setup (Use across all projects)

```bash
# 1. Copy .gitmessage file to home directory
cp .gitmessage ~/.gitmessage

# 2. Set global git config
git config --global commit.template ~/.gitmessage

# 3. Verify configuration
git config --global --get commit.template
```

### 2. Project-specific Setup (Use only in a specific project)

```bash
# 1. Copy .gitmessage file to project root
cp .gitmessage /path/to/your/project/.gitmessage

# 2. Set project local git config
cd /path/to/your/project
git config --local commit.template .gitmessage

# 3. Verify configuration
git config --local --get commit.template
```

## 📝 Usage

### Basic Usage

```bash
# 1. Stage changes
git add .

# 2. Commit (template will automatically open if no message is provided)
git commit

# 3. When template opens in editor, remove comments (#) and write content
# 4. Save and exit editor
```

### Direct Message Writing (Without template)

```bash
# Use -m option to write directly without template
git commit -m "fix: resolve keyboard overlay issue"
```

## 📖 Commit Message Format

### Conventional Commits Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type Categories

- `feat`: New feature addition
- `fix`: Bug fix
- `docs`: Documentation changes only
- `style`: Changes that don't affect code meaning (formatting, semicolons, etc.)
- `refactor`: Code changes that are neither bug fixes nor feature additions
- `perf`: Performance improvement
- `test`: Test addition or modification
- `chore`: Build process or auxiliary tool changes

### Examples

```bash
# Good example
fix(keyboard): resolve keyboard overlay issue in category edit mode

- Add keyboard height detection
- Adjust KeyboardAvoidingView behavior
- Fix UndoRedoToolbar positioning on Android

# Bad example
키보드 문제 수정
or
fix bug
```

## 🔍 Verify Configuration

```bash
# Verify global configuration
git config --global --get commit.template

# Verify local configuration
git config --local --get commit.template

# Check all configurations
git config --list | grep commit.template
```

## 🗑️ Remove Configuration

```bash
# Remove global configuration
git config --global --unset commit.template

# Remove local configuration
git config --local --unset commit.template
```

## 📁 File Locations

- **Global configuration**: `~/.gitmessage`
- **Project-specific configuration**: `project-root/.gitmessage`

## 💡 Tips

1. **Editor Settings**: If default editor is vim, save and exit with `:wq`
2. **Ignore Template**: Use `-m` option to write directly without template
3. **Modify Template**: Customize by directly editing the `~/.gitmessage` file
