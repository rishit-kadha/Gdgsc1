# Cloudflare R2 Game Assets & File Storage API

The backend now includes a complete, production-grade **Cloudflare R2 Object Storage & Game Asset API**.

Full documentation, configuration instructions, API references, and frontend integration code examples are available in:

👉 [`backend/README_R2_STORAGE.md`](backend/README_R2_STORAGE.md)

---

## Quick Reference

### 1. Configure Cloudflare R2 in `backend/.env`
```env
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_BUCKET_NAME=gdgsc-game-assets
R2_PUBLIC_URL=https://pub-yourbucketid.r2.dev
```

### 2. Run Automated Tests
```bash
cd backend
npm test
```

### 3. Key Endpoints
* **Single Presigned Upload**: `POST /api/games/:gameId/assets/upload`
* **Confirm Upload**: `POST /api/assets/:assetId/complete`
* **Get Download / CDN URL**: `GET /api/assets/:assetId/url`
* **Multipart Start**: `POST /api/games/:gameId/assets/multipart/start`
* **Multipart Sign Part**: `POST /api/assets/:assetId/multipart/sign`
* **Multipart Complete**: `POST /api/assets/:assetId/multipart/complete`
* **Multipart Abort**: `POST /api/assets/:assetId/multipart/abort`
