

const DEFAULT_BUFFER_KEY = "bWluby1pdi0xMjM0";
const DEFAULT_STORAGE_KEY = "mino-local-storage-key-32-bytes!";

// These values run in the browser and only protect persisted UI state from
// casual inspection. They must never be treated as server-side secrets.
const envConfig = {
  BUFFER_KEY:
    process.env.NEXT_PUBLIC_MINO_BUFFER?.trim() || DEFAULT_BUFFER_KEY,
  SECRET_KEY:
    process.env.NEXT_PUBLIC_MINO_SECRET?.trim() || DEFAULT_STORAGE_KEY,
};

export { envConfig };
export default envConfig;
