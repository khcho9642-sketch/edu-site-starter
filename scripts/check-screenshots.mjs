import fs from 'node:fs';
import assert from 'node:assert/strict';
import sharp from 'sharp';

let checked = 0;
for (const registry of ['setup', 'walkthrough']) {
  const shots = JSON.parse(fs.readFileSync(`content/${registry}/screenshots.json`, 'utf8'));
  for (const [src, shot] of Object.entries(shots)) {
    const actual = await sharp(`public${src}`).metadata();
    assert(Number.isSafeInteger(shot.width) && shot.width > 0, `${src}: invalid width`);
    assert(Number.isSafeInteger(shot.height) && shot.height > 0, `${src}: invalid height`);
    assert.equal(shot.width, actual.width, `${src}: width must match decoded image`);
    assert.equal(shot.height, actual.height, `${src}: height must match decoded image`);
    checked++;
  }
}
console.log(`Screenshot dimensions: ${checked} decoded images match their layout metadata.`);
