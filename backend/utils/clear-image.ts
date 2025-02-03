import path from 'node:path';
import rootDir from './path.ts';
import { unlink } from 'node:fs';

export default function clearImage(filePath: string) {
  filePath = path.join(rootDir, filePath);
  unlink(filePath, console.log);
}
