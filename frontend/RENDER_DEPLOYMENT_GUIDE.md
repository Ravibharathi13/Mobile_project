# Render Deployment Guide

## 🚀 Deployment Fixes Applied

### 1. Backend URL Updates
- ✅ Updated `.env` to use production URL
- ✅ Updated `vite.config.js` proxy configuration  
- ✅ Updated `api.jsx` timeout settings
- ✅ Added backend wake-up mechanism
- ✅ Added fallback to mock data

### 2. Timeout Handling
- ✅ Increased API timeout from 10s to 30s
- ✅ Added backend wake-up call before product requests
- ✅ Added fallback to mock data when backend times out
- ✅ Added better error messages for users

### 3. User Experience
- ✅ Added `BackendLoading` component for better loading states
- ✅ Added retry buttons for failed requests
- ✅ Better error messaging for Render spin-up delays

## 🔧 Common Render Issues & Solutions

### Issue: "timeout of 10000ms exceeded"
**Cause**: Render free tier spins down after inactivity
**Solution**: 
- Backend wake-up mechanism added
- Timeout increased to 30 seconds
- Fallback to mock data when backend is slow

### Issue: "Cannot connect to server"
**Cause**: Backend still starting up
**Solution**:
- Wait 30-60 seconds after first request
- Try refreshing the page
- Mock data will load as fallback

### Issue: CORS errors
**Cause**: Frontend and backend on different domains
**Solution**:
- Backend should have CORS configured
- Proxy settings updated in vite.config.js

## 📋 Deployment Checklist

### Backend (Render)
- [ ] CORS is configured for your frontend domain
- [ ] Health endpoint `/api/chatbot/health` is working
- [ ] Database connection is working
- [ ] Environment variables are set

### Frontend (Vercel/Netlify)
- [ ] Environment variables updated
- [ ] Build process completes successfully
- [ ] API calls point to production URL
- [ ] Error handling is in place

## 🧪 Testing After Deployment

1. **First Load**: May take 30-60 seconds (backend spin-up)
2. **Subsequent Loads**: Should be faster (backend warmed up)
3. **Error Handling**: Should show mock data if backend fails
4. **Retry Functionality**: Users can retry failed requests

## 🔄 Monitoring

Check browser console for:
- Backend wake-up messages
- Fallback to mock data warnings
- Any remaining API errors

## 🆘 If Still Having Issues

1. Check if backend is deployed and running
2. Verify CORS settings on backend
3. Check environment variables
4. Look at browser console for specific errors
5. Test backend health endpoint directly
