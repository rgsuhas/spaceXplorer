import { render, screen } from '@testing-library/react';
import AboutSection from '@/components/AboutSection';

describe('AboutSection', () => {
  it('should render the about section with correct text', () => {
    render(<AboutSection />);

    expect(screen.getByText("About This Project")).toBeInTheDocument();
    expect(screen.getByText(/This web application provides engaging and educational information about asteroids/i)).toBeInTheDocument();
    expect(screen.getByText(/NASA NeoWs \(Near Earth Object Web Service\) API/i)).toBeInTheDocument();
    expect(screen.getByText(/Built with Next.js, React, and Tailwind CSS/i)).toBeInTheDocument();
  });
});
