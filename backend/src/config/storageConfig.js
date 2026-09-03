// backend/src/config/storageConfig.js

/**
 * Centralized Storage & File Upload Configuration
 * All file size limits, MIME type validations, URL expirations, and thresholds
 * are defined here to ensure consistency and avoid magic numbers.
 */

const parseEnvInt = (val, fallback) => {
  if (!val) return fallback;
  const parsed = parseInt(val, 10);
  return isNaN(parsed) ? fallback : parsed;
};

const storageConfig = {
  // Cloudflare R2 Credentials & Endpoints
  r2: {
    accountId: process.env.R2_ACCOUNT_ID,
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    bucketName: process.env.R2_BUCKET_NAME || "gdgsc-game-assets",
    publicUrl: (process.env.R2_PUBLIC_URL || "").replace(/\/+$/, ""), // strip trailing slash
  },

  // Maximum File Sizes in Bytes
  limits: {
    file: parseEnvInt(
      process.env.MAX_FILE_SIZE_GAME_BYTES,
      5 * 1024 * 1024 * 1024,
    ), // 5 GB default for builds
    video: parseEnvInt(
      process.env.MAX_FILE_SIZE_VIDEO_BYTES,
      500 * 1024 * 1024,
    ), // 500 MB default for videos
    image: parseEnvInt(process.env.MAX_FILE_SIZE_IMAGE_BYTES, 20 * 1024 * 1024), // 20 MB default for images
    asset: parseEnvInt(
      process.env.MAX_FILE_SIZE_ASSET_BYTES,
      100 * 1024 * 1024,
    ), // 100 MB default for config/other
  },

  // Allowed MIME types mapped by Asset Type
  allowedMimeTypes: {
    file: [
      "application/zip",
      "application/x-zip-compressed",
      "application/x-rar-compressed",
      "application/vnd.rar",
      "application/x-rar",
      "application/x-7z-compressed",
      "application/octet-stream",
      "application/x-msdownload",
      "application/x-executable",
      "application/gzip",
      "application/x-tar",
      "application/x-gzip",
      "application/vnd.android.package-archive",
    ],
    image: [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/gif",
      "image/svg+xml",
    ],
    video: [
      "video/mp4",
      "video/webm",
      "video/quicktime",
      "video/ogg",
      "video/x-matroska",
    ],
    asset: [
      "application/json",
      "text/plain",
      "text/csv",
      "application/pdf",
      "application/octet-stream",
      "application/zip",
    ],
  },

  // Allowed File Extensions (lowercase, with leading dot)
  allowedExtensions: {
    file: [
      ".zip",
      ".rar",
      ".7z",
      ".tar",
      ".gz",
      ".exe",
      ".dmg",
      ".pkg",
      ".apk",
      ".iso",
      ".bin",
    ],
    image: [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"],
    video: [".mp4", ".webm", ".mov", ".ogv", ".mkv"],
    asset: [".json", ".txt", ".csv", ".pdf", ".bin", ".zip", ".cfg", ".ini"],
  },

  // Supported Asset Types and Categories
  types: ["file", "image", "video"],
  categories: [
    "build",
    "thumbnail",
    "banner",
    "screenshot",
    "trailer",
    "asset",
    "other",
  ],

  // Mapping of category to expected type (for auto-validation)
  categoryTypeMapping: {
    build: "file",
    thumbnail: "image",
    banner: "image",
    screenshot: "image",
    trailer: "video",
    asset: "file",
    other: "file",
  },

  // Presigned URL TTL in seconds
  presignedExpiry: {
    upload: parseEnvInt(process.env.PRESIGNED_UPLOAD_EXPIRY_SECONDS, 900), // 15 minutes
    download: parseEnvInt(process.env.PRESIGNED_DOWNLOAD_EXPIRY_SECONDS, 3600), // 1 hour
  },

  // Multipart upload configuration
  multipart: {
    thresholdBytes: parseEnvInt(
      process.env.MULTIPART_THRESHOLD_BYTES,
      20 * 1024 * 1024,
    ), // 20 MB
    minPartSizeBytes: 5 * 1024 * 1024, // 5 MB minimum per part as required by S3/R2 standard
    defaultPartSizeBytes: 10 * 1024 * 1024, // 10 MB suggested part size
  },
};

module.exports = storageConfig;
