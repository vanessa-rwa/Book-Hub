# 🔧 GitHub Secrets Setup Guide

## 🚨 **Critical: Add These Secrets to Fix Deployment Issues**

Go to: https://github.com/vanessa-rwa/Book-Hub/settings/secrets/actions

### **Step 1: Access GitHub Secrets**
1. Go to your repository: https://github.com/vanessa-rwa/Book-Hub
2. Click **"Settings"** tab
3. Click **"Secrets and variables"** in left sidebar
4. Click **"Actions"**

### **Step 2: Add These Secrets**

#### **1. AZURE_WEBAPP_NAME**
- **Name**: `AZURE_WEBAPP_NAME`
- **Value**: `bookhub-backend`

#### **2. AZURE_WEBAPP_PUBLISH_PROFILE**
- **Name**: `AZURE_WEBAPP_PUBLISH_PROFILE`
- **Value**: [Download from Azure Portal → App Service → "Download publish profile"]

#### **3. DJANGO_SECRET_KEY**
- **Name**: `DJANGO_SECRET_KEY`
- **Value**: `djangobookhub2024secretkeyforproductiondeployment`

#### **4. VITE_API_URL**
- **Name**: `VITE_API_URL`
- **Value**: `https://bookhub-backend.azurewebsites.net`

#### **5. AZURE_STATIC_WEB_APPS_API_TOKEN_YELLOW_PEBBLE_0A3953C03**
- **Name**: `AZURE_STATIC_WEB_APPS_API_TOKEN_YELLOW_PEBBLE_0A3953C03`
- **Value**: [Get from Azure Static Web App → Configuration → Management API token]

## 🔍 **How to Get Missing Values**

### **For AZURE_WEBAPP_PUBLISH_PROFILE:**
1. Go to Azure Portal
2. Find your App Service: `bookhub-backend`
3. Click **"Download publish profile"**
4. Open the downloaded file in Notepad
5. Copy the entire content

### **For AZURE_STATIC_WEB_APPS_API_TOKEN_YELLOW_PEBBLE_0A3953C03:**
1. Go to Azure Portal
2. Find your Static Web App: `bookhub-frontend`
3. Go to **"Configuration"**
4. Click **"Management API token"**
5. Copy the token

## ✅ **After Adding Secrets**

1. **Commit the changes** to trigger a new deployment
2. **Check GitHub Actions** for successful build
3. **Monitor the deployment** in the Actions tab

## 🎯 **Expected Results**

- ✅ Frontend builds without PostCSS errors
- ✅ Backend deploys with proper Azure credentials
- ✅ Static Web Apps deploys to correct location
- ✅ Environment variables are properly set

## 🔄 **Workflow Separation**

- **Frontend**: Handled by `azure-static-web-apps-yellow-pebble-0a3953c03.yml` (auto-generated)
- **Backend**: Handled by `azure-deployment-backend-only.yml` (custom)
- **Both workflows** will run on push to main branch 