# 🔍 Azure Resource Verification & Fix Guide

## 🚨 **Critical: Check if Azure Resources Exist**

### **Step 1: Verify Azure Portal Resources**

Go to: https://portal.azure.com

#### **Check Resource Group:**
1. Search for **"bookhub-rg"** in the search bar
2. **Expected**: Should show your resource group in South Africa North
3. **If missing**: Resources weren't created

#### **Check Static Web App:**
1. Search for **"bookhub-frontend"** 
2. **Expected**: Should show Static Web App resource
3. **If missing**: Frontend wasn't created

#### **Check App Service:**
1. Search for **"bookhub-backend"**
2. **Expected**: Should show Web App resource
3. **If missing**: Backend wasn't created

#### **Check PostgreSQL Database:**
1. Search for **"bookhub-db-server"**
2. **Expected**: Should show PostgreSQL Flexible Server
3. **If missing**: Database wasn't created

## 🛠️ **If Resources Are Missing - Create Them**

### **Option A: Use Azure Portal (Recommended)**

#### **1. Create Static Web App:**
1. Go to Azure Portal → "Create a resource"
2. Search for "Static Web App"
3. Click "Create"
4. **Fill in:**
   - **Subscription**: Your subscription
   - **Resource group**: `bookhub-rg`
   - **Name**: `bookhub-frontend`
   - **Region**: `South Africa North`
   - **Source**: `GitHub`
   - **Repository**: `vanessa-rwa/Book-Hub`
   - **Branch**: `main`
   - **App location**: `Frontend/book-hub`
   - **Output location**: `dist`
5. Click "Review + create" → "Create"

#### **2. Create App Service:**
1. Go to Azure Portal → "Create a resource"
2. Search for "Web App"
3. Click "Create"
4. **Fill in:**
   - **Subscription**: Your subscription
   - **Resource group**: `bookhub-rg`
   - **App name**: `bookhub-backend`
   - **Publish**: `Code`
   - **Runtime stack**: `Python 3.11`
   - **Operating System**: `Linux`
   - **Region**: `South Africa North`
   - **App Service Plan**: Use existing or create new
5. Click "Review + create" → "Create"

#### **3. Create PostgreSQL Database:**
1. Go to Azure Portal → "Create a resource"
2. Search for "Azure Database for PostgreSQL"
3. Click "Create" → "Flexible server"
4. **Fill in:**
   - **Subscription**: Your subscription
   - **Resource group**: `bookhub-rg`
   - **Server name**: `bookhub-db-server`
   - **Location**: `South Africa North`
   - **Admin username**: `bookhub_admin`
   - **Password**: `MukeJacke2024!Secure`
5. Click "Review + create" → "Create"

## 🔧 **If Resources Exist - Check Configuration**

### **For Static Web App (Frontend):**
1. Go to your Static Web App: `bookhub-frontend`
2. Check **"Actions"** tab for deployment status
3. Check **"Configuration"** → **"Management API token"**
4. Copy the token for GitHub secrets

### **For App Service (Backend):**
1. Go to your App Service: `bookhub-backend`
2. Check **"Deployment Center"** for deployment status
3. Check **"Configuration"** → **"Application settings"**
4. Download **"Publish profile"** for GitHub secrets

### **For PostgreSQL Database:**
1. Go to your PostgreSQL server: `bookhub-db-server`
2. Check **"Connection security"** → Enable Azure services access
3. Go to **"Databases"** → Create database: `bookhub_db`

## 📋 **GitHub Secrets Required**

Once resources are created, add these secrets to GitHub:

1. **AZURE_WEBAPP_NAME**: `bookhub-backend`
2. **AZURE_WEBAPP_PUBLISH_PROFILE**: [Download from App Service]
3. **DJANGO_SECRET_KEY**: `djangobookhub2024secretkeyforproductiondeployment`
4. **VITE_API_URL**: `https://bookhub-backend.azurewebsites.net`
5. **AZURE_STATIC_WEB_APPS_API_TOKEN_YELLOW_PEBBLE_0A3953C03**: [Get from Static Web App]

## 🎯 **Expected URLs After Setup**

- **Frontend**: `https://bookhub-frontend.azurestaticapps.net`
- **Backend**: `https://bookhub-backend.azurewebsites.net/api/books/`
- **Database**: `bookhub-db-server.postgres.database.azure.com`

## ⚠️ **Common Issues & Solutions**

### **If Static Web App shows 404:**
- Check GitHub Actions deployment status
- Verify the build completed successfully
- Check if `dist/` folder contains `index.html`

### **If App Service shows DNS error:**
- Verify the App Service was created successfully
- Check if the service is running (not stopped)
- Verify the URL is correct

### **If Database connection fails:**
- Check firewall rules allow Azure services
- Verify database `bookhub_db` exists
- Check connection string format 