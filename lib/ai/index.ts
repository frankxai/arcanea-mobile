import { ScriptaLuminor } from './luminors/scripta';
import { LuminaLuminor } from './luminors/lumina';
import { KinetixLuminor } from './luminors/kinetix';
import type { BaseLuminor } from './base-luminor';
import type { LuminorId } from './types';

const luminors = new Map<LuminorId, BaseLuminor>([
  ['scripta', new ScriptaLuminor()],
  ['lumina', new LuminaLuminor()],
  ['kinetix', new KinetixLuminor()],
]);

export function getLuminor(id: LuminorId): BaseLuminor {
  const luminor = luminors.get(id);
  if (!luminor) {
    throw new Error(`Luminor not found: ${id}`);
  }
  return luminor;
}

export function listLuminors(): BaseLuminor[] {
  return Array.from(luminors.values());
}

export function getFallbackLuminor(): BaseLuminor {
  return getLuminor('scripta');
}
