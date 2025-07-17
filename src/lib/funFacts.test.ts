import { getRandomFunFact, funFacts } from '@/lib/funFacts';

describe('getRandomFunFact', () => {
  it('should return a string', () => {
    const fact = getRandomFunFact();
    expect(typeof fact).toBe('string');
  });

  it('should return a fact from the funFacts array', () => {
    const fact = getRandomFunFact();
    expect(funFacts).toContain(fact);
  });

  it('should return different facts over multiple calls (probabilistic)', () => {
    const facts = new Set();
    for (let i = 0; i < 100; i++) {
      facts.add(getRandomFunFact());
    }
    // It's highly unlikely to get only one unique fact in 100 calls if the function is truly random
    expect(facts.size).toBeGreaterThan(1);
  });
});
