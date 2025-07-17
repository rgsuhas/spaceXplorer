export const funFacts = [
  "Asteroids are rocky, airless worlds that orbit our sun, but are too small to be called planets.",
  "The first asteroid, Ceres, was discovered in 1801 by Giuseppe Piazzi.",
  "Most asteroids are found in the main asteroid belt, a region between the orbits of Mars and Jupiter.",
  "Some asteroids have moons of their own.",
  "The total mass of all the asteroids in the main belt is less than that of Earth's Moon.",
  "Asteroids are remnants from the early solar system, about 4.6 billion years ago.",
  "Some asteroids are thought to be the shattered remains of planetesimals, small bodies that failed to grow into planets.",
  "The largest asteroid, Ceres, is also classified as a dwarf planet.",
  "Asteroids can be rich in valuable resources like metals and water.",
  "Scientists study asteroids to learn more about the formation of our solar system.",
];

export function getRandomFunFact(): string {
  const randomIndex = Math.floor(Math.random() * funFacts.length);
  return funFacts[randomIndex];
}
