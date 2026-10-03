import path from 'node:path';
import {fileURLToPath} from 'node:url';
export default { output: 'export', images: { unoptimized: true }, distDir: process.env.NODE_ENV==='development'?'.next-dev':'.next', outputFileTracingRoot:path.dirname(fileURLToPath(import.meta.url)) };
