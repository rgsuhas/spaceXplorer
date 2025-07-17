import { render, screen } from '@testing-library/react';
import FunFactSection from '@/components/FunFactSection';

// Mock the entire @/lib/funFacts module
jest.mock('@/lib/funFacts', () => ({
  __esModule: true, // This is important for ES Modules
  getRandomFunFact: jest.fn(),
  funFacts: ["This is a test fun fact."], // Provide a mock for funFacts array if needed
}));

// Import the mocked module
import * as funFactsModule from '@/lib/funFacts';

describe('FunFactSection', () => {
  beforeEach(() => {
    // Reset mocks before each test to ensure isolation
    (funFactsModule.getRandomFunFact as jest.Mock).mockClear();
  });

  it('should render a fun fact', () => {
    // Set the mock implementation for this specific test
    (funFactsModule.getRandomFunFact as jest.Mock).mockReturnValue("This is a test fun fact.");

    render(<FunFactSection />);

    expect(screen.getByText("🚀 Fun Fact!")).toBeInTheDocument();
    expect(screen.getByText("\"This is a test fun fact.\"")).toBeInTheDocument();
    expect(funFactsModule.getRandomFunFact).toHaveBeenCalledTimes(1);
  });
});