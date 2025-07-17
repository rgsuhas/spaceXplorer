
# checklist.md (Atomic Steps Version)

## Core Functional Features

### 1. Asteroid of the Day

- [ ] **Fetching and Data Logic**
  - [ ] Write a function to fetch a random asteroid from NASA NeoWs API using async/await and the API key from environment variables.
  - [ ] Ensure the function returns required properties: name, image, close approach date, diameter, and hazard flag.
  - [ ] Write a unit test to verify the function returns valid, well-formed data.

- [ ] **Display UI**
  - [ ] Create a React component to display the asteroid’s image, name, approach data, and key facts.
  - [ ] Apply responsive and accessible styling to the component.
  - [ ] Write a test checking the component renders all necessary fields on load.

- [ ] **Share Feature**
  - [ ] Add a share button, prefilled with a catchy asteroid fact.
  - [ ] Write a test to confirm button invokes sharing and uses correct share text.

### 2. Live Close-Approach List

- [ ] **Data Fetching**
  - [ ] Implement a function fetching a list of close-approach asteroids from NASA NeoWs for the next 7 days.
  - [ ] Write a test to ensure the data always includes name, approach date, and distance for each item.

- [ ] **List UI**
  - [ ] Build a responsive React component that displays the close-approach list.
  - [ ] Add visual emphasis to most imminent approaches.
  - [ ] Write a test that renders the component with sample data and checks every row displays required info.

### 3. Fun Fact Section

- [ ] **Fun Fact Logic**
  - [ ] Create or source a list of vetted fun facts (from NASA/ESA or static).
  - [ ] Write a pure function to pick a random fun fact on load (or rotate every 24 hours).
  - [ ] Write a test to ensure the function returns only valid/vetted facts.

- [ ] **Display Component**
  - [ ] Build a component that shows the current fun fact and updates/rotates correctly.
  - [ ] Style for visual and accessibility standards.
  - [ ] Write a test to verify rotation/changing on refresh or timer.

### 4. Visual Comparison Widget

- [ ] **Conversion Logic**
  - [ ] Write helper function to convert asteroid’s diameter (in meters) to “number of school buses” (12m each).
  - [ ] Unit test function with various diameters for accuracy.

- [ ] **Comparison UI**
  - [ ] Add a component displaying the converted value and horizontal SVG icon for buses.
  - [ ] Test that the UI matches input values and displays correct number of icons/text.

### 5. Quick Risk Meter

- [ ] **Status Logic**
  - [ ] Implement function to translate NASA hazard property into friendly message and emoji.
  - [ ] Write a test covering “hazardous” and “not hazardous” cases—returns correct emoji and text.

- [ ] **Risk Meter UI**
  - [ ] Add the risk meter (with emoji/status text) to the asteroid detail UI.
  - [ ] Test component for correct display in both states and accessibility attributes.

### 6. About Section

- [ ] **Component**
  - [ ] Create static, accessible About component summarizing purpose and NASA API use.
  - [ ] Test that component renders and key summary points are present.

## Testing & Validation

- [ ] **Unit/Integration Tests**
  - [ ] For each data function (fetch, process, display), create Jest+RTL tests for success/failure/edge cases.
  - [ ] Create tests for UI responsiveness and accessibility (axe).

- [ ] **Manual Code Review**
  - [ ] Review every Gemini or auto-generated code change for correctness and visual quality before merging.

## Accessibility & Responsiveness

- [ ] **Mobile/Desktop Rendering**
  - [ ] For every UI, create tests for major breakpoints (mobile, tablet, desktop).
- [ ] **Accessibility Checks**
  - [ ] Integrate axe or jest-axe, check for valid roles, aria-labels, color contrast in all components.

## Technical/Process

- [ ] **Atomic Workflow**
  - [ ] Each prompt/PR/code change implements one, and only one, atomic feature or fix.
  - [ ] Always write or update a failing test before new work (TDD/BDD).

- [ ] **Automation**
  - [ ] All content and visuals (images, facts, charts) are live API-driven—no hardcoded data unless as fallback.

- [ ] **Checkpoints**
  - [ ] Create a git commit or Gemini checkpoint before starting any major change run.

## Documentation

- [ ] **Checklist updates**
  - [ ] After adding any new feature, update this checklist.md.
- [ ] **About & README**
  - [ ] Ensure all new features, APIs, and goals are accurately summarized in About and main README.

