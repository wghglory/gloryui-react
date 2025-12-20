# Publish Step

## Manual Publishing

```shell
# update package version including both package.json and lock

npm run build # make sure dist is latest

git add .
git commit

npm publish
```

## Automated Publishing with GitHub Actions

### Setup

1. **Create npm token:**

   - Go to https://www.npmjs.com/settings/[your-username]/tokens
   - Generate a new "Granular Access Token" with:
     - Type: **Publish**
     - Package: **gloryui-react**
     - Permissions: **Read and write**

2. **Add token to GitHub Secrets:**
   - Go to your GitHub repository
   - Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Paste your npm token
   - Click "Add secret"

### Publishing Workflows

Two workflows are available:

#### Option 1: `ci-cd.yml` (Recommended)

- **Runs on:** Every push to main/master and version tags (v\*)
- **Features:**
  - Runs tests and builds on every push/PR
  - Publishes automatically when:
    - A version tag is pushed (e.g., `git tag v1.0.1 && git push --tags`)
    - Commit message contains `[publish]`
  - Checks if version already exists before publishing

**To publish:**

```bash
# Update version in package.json
npm version patch  # or minor, major

# Push with tags
git push && git push --tags

# Or commit with [publish] in message
git commit -m "feat: new feature [publish]"
git push
```

#### Option 2: `publish.yml` (Simple)

- **Runs on:** Every push to main/master when `package.json` changes
- **Features:**
  - Automatically publishes when package.json version changes
  - Skips if version already exists
  - Add `[skip publish]` in commit message to skip

**To publish:**

```bash
# Update version in package.json
npm version patch  # or minor, major

# Commit and push
git add package.json package-lock.json
git commit -m "chore: bump version to 1.0.1"
git push
```

### Skip Publishing

To skip publishing in a commit, include `[skip publish]` in your commit message:

```bash
git commit -m "docs: update README [skip publish]"
```
