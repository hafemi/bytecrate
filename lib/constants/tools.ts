export const MazeMinValues: Record<string, number> = {
  width: 5,
  height: 5,
  startDirections: 1,
  speed: 0,
};

export const MazeMaxValues: Record<string, number> = {
  width: 150,
  height: 150,
  startDirections: 4,
  speed: 1000,
};

export const PWGenLengthRange: Record<string, number> = {
  min: 1,
  max: 512,
};

// Weak (Red), Fair (Orange), Okay (Yellow), Good (Lightblue), Strong (Green)
export const PWGenStrengthColor =
  ['#ff0000', '#eb8715', '#f0e446', '#16c8db', '#84f564'];