# 🔐 GitHub Secrets Setup Guide

## 🚨 **CRITICAL: Fix Publish Profile Issue**

The deployment is failing because of an invalid publish profile. Follow these steps to fix it:

## 📋 **Step 1: Get Fresh Publish Profile**

1. **Go to Azure Portal** → Your App Service (`bookhub-backend-a0gfbea4h4g0hwak`)
2. **Click "Get publish profile"** (in the Overview section)
3. **Download the file** (it will be named something like `bookhub-backend-a0gfbea4h4g0hwak.PublishSettings`)
4. **Open the file** in a text editor
5. **Copy the ENTIRE content** (it's XML format)

## 📋 **Step 2: Update GitHub Secrets**

1. **Go to your GitHub repository**
2. **Click "Settings"** → **"Secrets and variables"** → **"Actions"**
3. **Update these secrets:**

### 🔑 **AZURE_WEBAPP_PUBLISH_PROFILE**
- **Name**: `AZURE_WEBAPP_PUBLISH_PROFILE`
- **Value**: Paste the ENTIRE content from the publish profile file
- **Type**: Secret

### 🔑 **DJANGO_SECRET_KEY**
- **Name**: `DJANGO_SECRET_KEY`
- **Value**: `djangobookhub2024secretkeyforproductiondeployment`
- **Type**: Secret

### 🔑 **DATABASE_URL**
- **Name**: `DATABASE_URL`
- **Value**: `postgresql://bookhub_admin:MukeJacke2024!Secure@bookhub-db-server.postgres.database.azure.com:5432/bookhub_db`
- **Type**: Secret

### 🔑 **FRONTEND_URL**
- **Name**: `FRONTEND_URL`
- **Value**: `https://yellow-pebble-0a3953c03.1.azurestaticapps.net`
- **Type**: Secret

## 📋 **Step 3: Verify Secrets**

After setting up all secrets, go to:
- **GitHub Actions** → **"Deploy Backend to Azure App Service"**
- **Click "Run workflow"** → **"Run workflow"**

## 🔍 **Troubleshooting**

### ❌ **"Publish profile is invalid" Error**
- **Solution**: Download a fresh publish profile from Azure Portal
- **Make sure**: You're copying the ENTIRE XML content, not just part of it

### ❌ **"App name not found" Error**
- **Solution**: Verify the app name in the workflow matches your Azure App Service name exactly

### ❌ **"Permission denied" Error**
- **Solution**: Make sure the publish profile is for the correct App Service

## ✅ **Success Indicators**

When the deployment succeeds, you should see:
- ✅ **"Deploy to Azure App Service"** step completes
- ✅ **"Run post-deployment setup"** step shows the backend URL
- ✅ **No red error messages** in the workflow

## 🚀 **After Successful Deployment**

1. **Test the backend**: `https://bookhub-backend-a0gfbea4h4g0hwak.southafricanorth-01.azurewebsites.net/`
2. **Test health check**: `https://bookhub-backend-a0gfbea4h4g0hwak.southafricanorth-01.azurewebsites.net/api/health/`
3. **Test books API**: `https://bookhub-backend-a0gfbea4h4g0hwak.southafricanorth-01.azurewebsites.net/api/books/`

## 📞 **Need Help?**

If you're still having issues:
1. **Check the workflow logs** for specific error messages
2. **Verify all secrets are set correctly**
3. **Make sure the App Service name matches exactly** 