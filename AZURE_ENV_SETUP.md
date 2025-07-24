# Azure Environment Variables Setup

## 🔧 Required Environment Variables

In Azure Portal → App Service → Configuration → Application settings:

### **Application Settings:**
```
DJANGO_SETTINGS_MODULE = bookhub.production_settings
SECRET_KEY = djangobookhub2024secretkeyforproductiondeployment
DEBUG = False
DATABASE_URL = postgresql://bookhub_admin:MukeJacke2024!Secure@bookhub-db-server.postgres.database.azure.com:5432/bookhub_db
FRONTEND_URL = https://yellow-pebble-0a3953c03.1.azurestaticapps.net
CORS_ALLOW_ALL_ORIGINS = True
WEBSITE_RUN_FROM_PACKAGE = 1
```

### **Steps:**
1. Click "New application setting" for each variable
2. Add Name and Value exactly as shown above
3. Click "Save" after adding all variables
4. Click "Continue" when prompted to restart the app

## ✅ **Verification:**
After saving, your app will restart automatically and:
- ✅ Run database migrations
- ✅ Populate 8 sample books 
- ✅ Configure CORS properly
- ✅ Be ready for production use 