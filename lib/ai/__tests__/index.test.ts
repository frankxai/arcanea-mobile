import { getLuminor, listLuminors, getFallbackLuminor } from '../index';
import { ScriptaLuminor } from '../luminors/scripta';
import { LuminaLuminor } from '../luminors/lumina';
import { KinetixLuminor } from '../luminors/kinetix';

describe('AI Luminor Registry Utilities', () => {
  describe('getLuminor', () => {
    it('returns the correct Scripta luminor instance', () => {
      const luminor = getLuminor('scripta');
      expect(luminor).toBeInstanceOf(ScriptaLuminor);
      expect(luminor.id).toBe('scripta');
    });

    it('returns the correct Lumina luminor instance', () => {
      const luminor = getLuminor('lumina');
      expect(luminor).toBeInstanceOf(LuminaLuminor);
      expect(luminor.id).toBe('lumina');
    });

    it('returns the correct Kinetix luminor instance', () => {
      const luminor = getLuminor('kinetix');
      expect(luminor).toBeInstanceOf(KinetixLuminor);
      expect(luminor.id).toBe('kinetix');
    });

    it('throws an error for an unknown luminor id', () => {
      // @ts-expect-error - testing invalid runtime input
      expect(() => getLuminor('unknown-id')).toThrow('Luminor not found: unknown-id');
    });
  });

  describe('listLuminors', () => {
    it('returns a list of all registered luminors', () => {
      const luminors = listLuminors();
      expect(luminors).toHaveLength(3);

      const ids = luminors.map(l => l.id);
      expect(ids).toContain('scripta');
      expect(ids).toContain('lumina');
      expect(ids).toContain('kinetix');
    });
  });

  describe('getFallbackLuminor', () => {
    it('returns the Scripta luminor as the default fallback', () => {
      const fallback = getFallbackLuminor();
      expect(fallback).toBeInstanceOf(ScriptaLuminor);
      expect(fallback.id).toBe('scripta');
    });
  });
});
