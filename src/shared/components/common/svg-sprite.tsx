import { readFileSync } from 'fs';
import { join } from 'path';

export function SvgSprite() {
  const spriteContent = readFileSync(join(process.cwd(), 'public', 'sprites.svg'), 'utf-8');

  return <div dangerouslySetInnerHTML={{ __html: spriteContent }} style={{ display: 'none' }} />;
}
