import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { GraphPoint, TrailPoint } from '../types/pendulum';

const PARAMS = {
  l1: 80,
  l2: 80,
  m1: 10,
  m2: 10,
  g: 9.81,
} as const;

const MAX_TRAIL = 200;
const DT = 0.05;
const TWO_PI = 2 * Math.PI;

const DoublePendulum: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [initialAngle2, setInitialAngle2] = useState<number>(Math.PI / 2);
  const [graphData, setGraphData] = useState<GraphPoint[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { l1, l2, m1, m2, g } = PARAMS;

    let angle1 = Math.PI / 2;
    let angle2 = initialAngle2;
    let angle1Velocity = 0;
    let angle2Velocity = 0;
    let time = 0;
    const blueTrail: TrailPoint[] = [];
    const redTrail: TrailPoint[] = [];

    setGraphData([]);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Runge-Kutta 4 would be more accurate, but Euler matches original behaviour
      const num1 = -g * (2 * m1 + m2) * Math.sin(angle1);
      const num2 = -m2 * g * Math.sin(angle1 - 2 * angle2);
      const num3 = -2 * Math.sin(angle1 - angle2) * m2;
      const num4 =
        angle2Velocity * angle2Velocity * l2 +
        angle1Velocity * angle1Velocity * l1 * Math.cos(angle1 - angle2);
      const den = l1 * (2 * m1 + m2 - m2 * Math.cos(2 * angle1 - 2 * angle2));
      const angle1Acceleration = (num1 + num2 + num3 * num4) / den;

      const num5 = 2 * Math.sin(angle1 - angle2);
      const num6 = angle1Velocity * angle1Velocity * l1 * (m1 + m2);
      const num7 = g * (m1 + m2) * Math.cos(angle1);
      const num8 = angle2Velocity * angle2Velocity * l2 * m2 * Math.cos(angle1 - angle2);
      const den2 = l2 * (2 * m1 + m2 - m2 * Math.cos(2 * angle1 - 2 * angle2));
      const angle2Acceleration = (num5 * (num6 + num7 + num8)) / den2;

      angle1Velocity += angle1Acceleration * DT;
      angle2Velocity += angle2Acceleration * DT;
      angle1 += angle1Velocity * DT;
      angle2 += angle2Velocity * DT;

      const pivotX = canvas.width / 2;
      const pivotY = canvas.height / 3;
      const x1 = pivotX + l1 * Math.sin(angle1);
      const y1 = pivotY + l1 * Math.cos(angle1);
      const x2 = x1 + l2 * Math.sin(angle2);
      const y2 = y1 + l2 * Math.cos(angle2);

      // Pivot
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, 5, 0, TWO_PI);
      ctx.fillStyle = '#1f2937';
      ctx.fill();

      // Arms
      ctx.beginPath();
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = '#6b7280';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Trails
      const drawTrail = (trail: TrailPoint[], rgb: string) => {
        trail.forEach((point, index) => {
          if (index === 0) return;
          const alpha = index / trail.length;
          ctx.beginPath();
          ctx.moveTo(trail[index - 1].x, trail[index - 1].y);
          ctx.lineTo(point.x, point.y);
          ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        });
      };

      blueTrail.push({ x: x1, y: y1 });
      redTrail.push({ x: x2, y: y2 });
      if (blueTrail.length > MAX_TRAIL) blueTrail.shift();
      if (redTrail.length > MAX_TRAIL) redTrail.shift();

      drawTrail(blueTrail, '59, 130, 246');
      drawTrail(redTrail, '239, 68, 68');

      // Bobs
      ctx.beginPath();
      ctx.arc(x1, y1, 10, 0, TWO_PI);
      ctx.fillStyle = '#3b82f6';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x2, y2, 10, 0, TWO_PI);
      ctx.fillStyle = '#ef4444';
      ctx.fill();

      time += DT;
      setGraphData(prev => [
        ...prev,
        { time: parseFloat(time.toFixed(2)), angle1: angle1 % TWO_PI, angle2: angle2 % TWO_PI },
      ]);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initialAngle2]);

  const handleAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitialAngle2(parseFloat(e.target.value));
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-md w-full max-w-2xl">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="border border-gray-200 rounded-xl mb-4 bg-gray-50"
      />

      <div className="w-full mb-6 px-2">
        <label htmlFor="angle-slider" className="block text-sm font-medium text-gray-700 mb-1">
          Initial angle of second pendulum:{' '}
          <span className="font-semibold text-blue-600">{initialAngle2.toFixed(2)} rad</span>
        </label>
        <input
          id="angle-slider"
          type="range"
          min={0}
          max={TWO_PI}
          step={0.01}
          value={initialAngle2}
          onChange={handleAngleChange}
          className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0</span>
          <span>π</span>
          <span>2π</span>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <LineChart
          width={560}
          height={260}
          data={graphData}
          margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="time"
            label={{ value: 'Time (s)', position: 'insideBottomRight', offset: -10 }}
            tick={{ fontSize: 11 }}
          />
          <YAxis
            domain={[-Math.PI, Math.PI]}
            ticks={[-Math.PI, -Math.PI / 2, 0, Math.PI / 2, Math.PI]}
            tickFormatter={(v: number) => v.toFixed(1)}
            label={{ value: 'Angle (rad)', angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: 11 }}
          />
          <Tooltip formatter={(v: number) => v.toFixed(4)} />
          <Legend />
          <Line type="monotone" dataKey="angle1" stroke="#3b82f6" dot={false} name="Angle 1" />
          <Line type="monotone" dataKey="angle2" stroke="#ef4444" dot={false} name="Angle 2" />
        </LineChart>
      </div>
    </div>
  );
};

export default DoublePendulum;
