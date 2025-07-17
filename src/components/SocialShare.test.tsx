import { render, screen, fireEvent } from '@testing-library/react';
import SocialShare from '@/components/SocialShare';

describe('SocialShare', () => {
  const mockShareText = "This is a test share text.";

  beforeEach(() => {
    // Mock navigator.share
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: jest.fn(),
    });
  });

  it('should render the share button', () => {
    render(<SocialShare shareText={mockShareText} />);
    expect(screen.getByRole('button', { name: /Share Fun Fact/i })).toBeInTheDocument();
  });

  it('should call navigator.share when button is clicked and API is available', async () => {
    render(<SocialShare shareText={mockShareText} />);
    const shareButton = screen.getByRole('button', { name: /Share Fun Fact/i });

    fireEvent.click(shareButton);

    expect(navigator.share).toHaveBeenCalledWith({
      title: 'Asteroid App Fun Fact',
      text: mockShareText,
    });
  });

  it('should show an alert if navigator.share is not available', () => {
    // Set navigator.share to undefined to simulate unavailability
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: undefined,
    });

    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<SocialShare shareText={mockShareText} />);
    const shareButton = screen.getByRole('button', { name: /Share Fun Fact/i });

    fireEvent.click(shareButton);

    expect(alertSpy).toHaveBeenCalledWith(`Please copy this text to share: "${mockShareText}"`);
    alertSpy.mockRestore();
  });
});
