export function getRiskStatus(isHazardous: boolean): { message: string; emoji: string } {
  if (isHazardous) {
    return { message: "Potentially Hazardous", emoji: "⚠️" };
  } else {
    return { message: "Not Potentially Hazardous", emoji: "✅" };
  }
}
