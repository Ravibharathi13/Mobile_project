# CORS Fix Deployment Guide

## 🚀 CORS Issues Fixed

### Problem
Your Vercel frontend (`https://mobile-project-three.vercel.app`) was being blocked by CORS policy because the backend only allowed localhost origins.

### Solution Applied
1. ✅ Added your Vercel domain to CORS allowed origins
2. ✅ Added flexible CORS configuration with environment variable support
3. ✅ Added explicit OPTIONS handler for pre-flight requests
4. ✅ Added logging for blocked CORS attempts

## 📋 What Was Changed

### Backend `server.js`
```javascript
// Before: Only localhost origins
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', ...]
}));

// After: Flexible CORS with your Vercel domain
const allowedOrigins = [
  'http://localhost:3000', 
  'http://localhost:3001', 
  'http://localhost:3002', 
  'http://localhost:5173',
  'https://mobile-project-three.vercel.app',
  ...(process.env.FRONTEND_URLS ? process.env.FRONTEND_URLS.split(',') : [])
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors()); // Handle pre-flight requests
```

### Environment Variables
Added `FRONTEND_URLS` to `.env.example` for easy management of multiple frontend URLs.

## 🔄 Deployment Steps

### 1. Update Render Environment Variables
In your Render dashboard, add this environment variable:
```
FRONTEND_URLS=https://mobile-project-three.vercel.app
```

### 2. Redeploy Backend
1. Go to your Render service
2. Click "Manual Deploy" → "Deploy Latest Commit"
3. Wait for deployment to complete

### 3. Test CORS Fix
```bash
# Test from browser console
fetch('https://mobile-project-fizd.onrender.com/api/products')
  .then(r => r.json())
  .then(data => console.log('CORS works!', data))
```

## 🔍 Testing Checklist

- [ ] Backend redeployed successfully
- [ ] Frontend can fetch products without CORS errors
- [ ] Login/register endpoints work
- [ ] All API endpoints accessible from Vercel domain
- [ ] Backend logs show allowed origins (not blocked)

## 🆘 If Still Having CORS Issues

1. **Check backend logs**: Look for "CORS blocked origin" messages
2. **Verify domain**: Ensure the exact Vercel domain is added
3. **Clear browser cache**: CORS headers are cached aggressively
4. **Test with curl**: 
   ```bash
   curl -H "Origin: https://mobile-project-three.vercel.app" \
        https://mobile-project-fizd.onrender.com/api/products
   ```

## 🎯 Expected Result

After deployment, you should see:
- ✅ No more CORS errors in browser console
- ✅ Products load successfully from your Vercel frontend
- ✅ Login/register functionality works
- ✅ All API calls succeed without network errors

The CORS issues should be completely resolved!
