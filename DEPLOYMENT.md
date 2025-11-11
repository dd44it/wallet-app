# Deployment Guide for GitHub Pages

This guide explains how to deploy the Wallet App to GitHub Pages.

## Prerequisites

- A GitHub account
- A GitHub repository (either new or existing)
- Git installed on your local machine

## Setup Instructions

### 1. Create/Clone Repository

If you haven't already, create a new repository on GitHub or clone an existing one:

```bash
git clone https://github.com/username/wallet-app.git
cd wallet-app
```

### 2. Configure Base Path

The base path depends on your repository structure:

#### Option A: Root Repository (`username.github.io`)
If your repository is named `username.github.io` (your GitHub username + `.github.io`):
- The base path should be `/`
- No changes needed in the workflow file

#### Option B: Subdirectory Repository (`username.github.io/wallet-app`)
If your repository is a subdirectory:
- Edit `.github/workflows/deploy.yml`
- Change `VITE_BASE_PATH: /` to `VITE_BASE_PATH: /wallet-app/`
- Update `vite.config.ts` if needed (it already uses the environment variable)

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings**
3. Navigate to **Pages** in the sidebar
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### 4. Push Code

Push your code to the `main` or `master` branch:

```bash
git add .
git commit -m "Initial commit with GitHub Pages deployment"
git push origin main
```

### 5. Deploy

The GitHub Actions workflow will automatically:
1. Build the app
2. Create a 404.html file for client-side routing
3. Deploy to GitHub Pages

You can monitor the deployment progress in the **Actions** tab of your repository.

### 6. Access Your App

Once deployed, your app will be available at:
- Root repo: `https://username.github.io/`
- Subdirectory: `https://username.github.io/wallet-app/`

## Manual Deployment

If you prefer to deploy manually:

1. Build the app:
   ```bash
   npm run build
   ```

2. Copy `dist/index.html` to `dist/404.html`:
   ```bash
   cp dist/index.html dist/404.html
   ```

3. Push the `dist` folder contents to a `gh-pages` branch or use GitHub Pages

## Troubleshooting

### 404 Errors on Routes

If you're getting 404 errors when navigating to routes:
- Ensure `404.html` is created (the workflow does this automatically)
- Check that the base path is correct
- Verify that `.nojekyll` file exists in the root

### Assets Not Loading

If assets (CSS, JS) are not loading:
- Check the base path configuration
- Verify that `vite.config.ts` has the correct base path
- Check browser console for 404 errors on assets

### Build Fails

If the GitHub Actions build fails:
- Check the Actions tab for error messages
- Verify that all dependencies are in `package.json`
- Ensure Node.js version is compatible (workflow uses Node 18)

### Routes Not Working

If React Router routes are not working:
- Verify that `404.html` exists in the `dist` folder
- Check that React Router is using `BrowserRouter` (not `HashRouter`)
- Ensure the base path matches your repository structure

## Custom Domain

To use a custom domain:

1. Add a `CNAME` file to the `public` folder with your domain name
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings to use your custom domain

## Environment Variables

The workflow uses environment variables for configuration:
- `VITE_BASE_PATH`: Base path for the app (default: `/`)

You can modify these in `.github/workflows/deploy.yml` if needed.

## Notes

- The `.nojekyll` file prevents GitHub from processing files with Jekyll
- The `404.html` file allows React Router to handle all routes
- GitHub Pages deployment typically takes 1-2 minutes after pushing
- The workflow triggers on pushes to `main` or `master` branch

