# Fix for GitHub Pages 404 Errors

## Problem
You're seeing 404 errors like:
```
GET https://test.github.io/assets/index-B5SIY8j.js net::ERR_ABORTED 404 (Not Found)
GET https://test.github.io/assets/index-BJi6dX4r.css net::ERR_ABORTED 404 (Not Found)
```

## Root Cause
The assets are being requested from the wrong path because:
1. The repository source is set to "Branch" instead of "GitHub Actions"
2. The base path is not configured correctly for a subdirectory repository

## Solution

### Step 1: Change Pages Source to "GitHub Actions" ⚠️ CRITICAL

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **"Source"**, change from **"Branch"** to **"GitHub Actions"**
4. Click **Save**

This is the most important step! The workflow will not work if the source is set to "Branch".

### Step 2: Verify Workflow is Running

1. Go to the **Actions** tab in your repository
2. You should see a workflow run after pushing code
3. Check the workflow logs to verify:
   - The base path is being detected correctly
   - The build is successful
   - The deployment completes

### Step 3: Check the Deployed URL

After the workflow completes:
- Your app should be available at: `https://test.github.io/wallet-app/`
- The assets should load from: `https://test.github.io/wallet-app/assets/...`

### Step 4: Clear Browser Cache

1. Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. Or clear browser cache completely
3. Try accessing the site again

## How It Works

The workflow automatically:
1. Detects your repository name (`wallet-app`)
2. Sets the base path to `/wallet-app/`
3. Builds the app with the correct base path
4. Creates `404.html` for React Router support
5. Deploys to GitHub Pages

## Manual Override (If Needed)

If automatic detection doesn't work, you can manually set the base path:

1. Edit `.github/workflows/deploy.yml`
2. Find the `Build` step
3. Change the `VITE_BASE_PATH` environment variable:

```yaml
- name: Build
  run: npm run build
  env:
    VITE_BASE_PATH: /wallet-app/  # Change this to your repo name
```

## Verification

After fixing, verify:
- ✅ Pages source is set to "GitHub Actions"
- ✅ Workflow runs successfully in Actions tab
- ✅ Assets load correctly (check browser Network tab)
- ✅ React Router routes work (click on a transaction)

## Still Having Issues?

1. Check GitHub Actions logs for errors
2. Verify repository name matches the base path
3. Ensure `.nojekyll` file exists in `public/` folder
4. Check that React Router basename is set (handled automatically)

## Expected Behavior

- **Repository**: `test/wallet-app`
- **Base Path**: `/wallet-app/`
- **URL**: `https://test.github.io/wallet-app/`
- **Assets**: `https://test.github.io/wallet-app/assets/...`

If your repository name is different, the base path will be `/your-repo-name/` automatically.

