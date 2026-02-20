import { tool } from 'ai';
import { z } from 'zod';

export const weatherTool = tool({
  description: 'Get the weather for a city',

  inputSchema: z.object({
    city: z.string().describe('The city to get weather for'),
  }),

  execute: async ({ city }) => {
    const mockWeather: Record<string, { temp: number; condition: string }> = {
      london: { temp: 12, condition: 'Cloudy' },
      paris: { temp: 18, condition: 'Sunny' },
      newyork: { temp: 22, condition: 'Rainy' },
    };

    const weather =
      mockWeather[city.toLowerCase()] || {
        temp: 25,
        condition: 'Sunny',
      };

    return {
      city,
      temperature: weather.temp,
      condition: weather.condition,
    };
  },
});

export const calculatorTool = tool({
  description: 'Perform a basic math calculation',

  inputSchema: z.object({
    expression: z.string().describe('Math expression to evaluate'),
  }),

  execute: async ({ expression }) => {
    try {
      const result = eval(expression);
      return { result };
    } catch {
      return { error: 'Invalid expression' };
    }
  },
});

export const tools = {
  weatherTool,
  calculatorTool,
};