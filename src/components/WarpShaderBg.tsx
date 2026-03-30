'use client';

import { Warp } from '@paper-design/shaders-react';

interface WarpShaderBgProps {
  colors?: string[];
}

const defaultColors = [
  'hsl(204, 50%, 21%)',   /* Fjord #1B3A52 */
  'hsl(205, 45%, 52%)',   /* Seafoam lighter */
  'hsl(209, 52%, 36%)',   /* Ocean #2C5F8A */
  'hsl(200, 35%, 75%)',   /* Seafoam #A8C5D8 */
];

export default function WarpShaderBg({ colors = defaultColors }: WarpShaderBgProps) {
  return (
    <Warp
      style={{ height: '100%', width: '100%' }}
      proportion={0.45}
      softness={1}
      distortion={0.25}
      swirl={0.8}
      swirlIterations={10}
      shape="checks"
      shapeScale={0.1}
      scale={1}
      rotation={0}
      speed={0.8}
      colors={colors}
    />
  );
}
