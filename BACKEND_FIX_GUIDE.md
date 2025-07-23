# 🔧 Backend Fix Guide - Make Books Display

## 🚨 **Issue: Backend Loading Forever**

Your backend at `https://bookhub-backend-a0gfbea4h4g0hwak.southafricanorth-01.azurewebsites.net/` is loading forever because it's missing environment variables.

## 🛠️ **Step 1: Configure Backend Environment Variables**

### **Go to Azure Portal:**
1. Navigate to: https://portal.azure.com
2. Search for: `bookhub-backend-a0gfbea4h4g0hwak`
3. Click on your App Service

### **Add Environment Variables:**
1. Go to **"Settings"** → **"Configuration"**
2. Click the **blue banner** "Click here to go to Environment Variables menu"
3. In **"App settings"** tab, add these variables:

#### **Required Environment Variables:**

```
Name: DJANGO_SETTINGS_MODULE
Value: bookhub.production_settings

Name: SECRET_KEY
Value: djangobookhub2024secretkeyforproductiondeployment

Name: DEBUG
Value: False

Name: DATABASE_URL
Value: postgresql://bookhub_admin:MukeJacke2024!Secure@bookhub-db-server.postgres.database.azure.com:5432/bookhub_db

Name: FRONTEND_URL
Value: https://yellow-pebble-0a3953c03.1.azurestaticapps.net
```

4. Click **"Apply"** to save

## 🗄️ **Step 2: Configure Database**

### **Create Database:**
1. Go to your PostgreSQL server: `bookhub-db-server`
2. Navigate to **"Databases"**
3. Click **"Create database"**
4. **Name**: `bookhub_db`
5. Click **"Create"**

### **Enable Azure Services Access:**
1. In PostgreSQL server, go to **"Security"** → **"Connection security"**
2. Enable **"Allow Azure services and resources to access this server"**
3. Click **"Save"**

## 🔄 **Step 3: Deploy Backend Code**

### **Option A: Use GitHub Actions (Recommended)**
1. Go to: https://github.com/vanessa-rwa/Book-Hub/settings/secrets/actions
2. Add these secrets:
   - `AZURE_WEBAPP_NAME`: `bookhub-backend-a0gfbea4h4g0hwak`
   - `AZURE_WEBAPP_PUBLISH_PROFILE`: [Download from App Service]
   - `DJANGO_SECRET_KEY`: `djangobookhub2024secretkeyforproductiondeployment`
   - `VITE_API_URL`: `https://bookhub-backend-a0gfbea4h4g0hwak.southafricanorth-01.azurewebsites.net`

### **Option B: Manual Upload**
1. In App Service, go to **"Development Tools"** → **"Advanced Tools"**
2. Click **"Go"** to open Kudu
3. Upload your backend code

## 📚 **Step 4: Add Sample Books Data**

### **Create Sample Books:**
Once backend is working, you can add sample books through the API:

```bash
# Add a sample book
curl -X POST https://bookhub-backend-a0gfbea4h4g0hwak.southafricanorth-01.azurewebsites.net/api/books/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
    "isbn": "978-0743273565",
    "publication_year": 1925,
    "genre": "Fiction"
  }'
```

### **Or Add Multiple Books:**
```bash
# Add more sample books
curl -X POST https://bookhub-backend-a0gfbea4h4g0hwak.southafricanorth-01.azurewebsites.net/api/books/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "description": "The story of young Scout Finch and her father Atticus in a racially divided Alabama town.",
    "isbn": "978-0446310789",
    "publication_year": 1960,
    "genre": "Fiction"
  }'
```

## 🔗 **Step 5: Update Frontend API URL**

### **Update VITE_API_URL Secret:**
1. Go to GitHub: https://github.com/vanessa-rwa/Book-Hub/settings/secrets/actions
2. Update `VITE_API_URL` to: `https://bookhub-backend-a0gfbea4h4g0hwak.southafricanorth-01.azurewebsites.net`
3. This will trigger a new frontend deployment

## 🎯 **Expected Results:**

After completing these steps:
- ✅ **Backend loads quickly** instead of loading forever
- ✅ **API endpoint works**: `https://bookhub-backend-a0gfbea4h4g0hwak.southafricanorth-01.azurewebsites.net/api/books/`
- ✅ **Books display** in the frontend
- ✅ **Full application functionality** for presentation

## ⚡ **Quick Test Commands:**

```bash
# Test backend health
curl https://bookhub-backend-a0gfbea4h4g0hwak.southafricanorth-01.azurewebsites.net/

# Test books API
curl https://bookhub-backend-a0gfbea4h4g0hwak.southafricanorth-01.azurewebsites.net/api/books/
```

## 🚀 **Timeline:**
- **Environment setup**: 5 minutes
- **Database creation**: 2 minutes
- **Backend deployment**: 5-10 minutes
- **Sample data**: 2 minutes
- **Frontend update**: 5 minutes
- **Total**: ~20 minutes 