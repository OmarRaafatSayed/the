'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating detailed historical and cultural explanations about specific Mashrabiya examples.
 *
 * - generateMashrabiyaExplanation - A function that handles the generation of Mashrabiya explanations.
 * - GenerateMashrabiyaExplanationInput - The input type for the generateMashrabiyaExplanation function.
 * - GenerateMashrabiyaExplanationOutput - The return type for the generateMashrabiyaExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMashrabiyaExplanationInputSchema = z.object({
  mashrabiyaName: z.string().describe('The name or type of the Mashrabiya example.'),
  description: z
    .string()
    .describe('A detailed description of the Mashrabiya example, including its features and context.'),
  imageUrl: z
    .string()
    .optional()
    .describe(
      "An optional photo of the Mashrabiya example, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateMashrabiyaExplanationInput = z.infer<typeof GenerateMashrabiyaExplanationInputSchema>;

const GenerateMashrabiyaExplanationOutputSchema = z.object({
  historicalContext: z
    .string()
    .describe(
      'A detailed explanation of the historical period, geographical origin, and architectural context of the Mashrabiya example.'
    ),
  culturalSignificance: z
    .string()
    .describe(
      'An explanation of the cultural, social, and functional significance of the Mashrabiya, including its role in privacy, ventilation, and aesthetics.'
    ),
  craftsmanshipDetails: z
    .string()
    .describe(
      'A description of the materials, construction techniques, typical patterns (e.g., geometric, calligraphic, floral), and artistic elements used in the Mashrabiya.'
    ),
});
export type GenerateMashrabiyaExplanationOutput = z.infer<typeof GenerateMashrabiyaExplanationOutputSchema>;

export async function generateMashrabiyaExplanation(
  input: GenerateMashrabiyaExplanationInput
): Promise<GenerateMashrabiyaExplanationOutput> {
  return mashrabiyaExplanationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'mashrabiyaExplanationPrompt',
  input: {schema: GenerateMashrabiyaExplanationInputSchema},
  output: {schema: GenerateMashrabiyaExplanationOutputSchema},
  prompt: `You are an expert in Islamic art, architecture, and cultural history, specializing in Mashrabiya.\n\nYour task is to provide a comprehensive explanation for a specific Mashrabiya example.\n\nBased on the provided Mashrabiya Name and Description, generate a detailed historical and cultural explanation. If an image is provided, use it to inform your explanation.\n\nFocus on the following aspects:\n1.  **Historical Context**: Describe the historical period, geographical origin, and architectural context.\n2.  **Cultural Significance**: Explain its cultural, social, and functional significance, including its role in privacy, ventilation, and aesthetics within Islamic societies.\n3.  **Craftsmanship Details**: Detail the materials, construction techniques, typical patterns (geometric, calligraphic, floral), and artistic elements.\n\nMashrabiya Name: {{{mashrabiyaName}}}\nDescription: {{{description}}}\n{{#if imageUrl}}\nImage: {{media url=imageUrl}}\n{{/if}}\n\nProvide your explanation in a structured JSON format matching the output schema.`,
});

const mashrabiyaExplanationFlow = ai.defineFlow(
  {
    name: 'mashrabiyaExplanationFlow',
    inputSchema: GenerateMashrabiyaExplanationInputSchema,
    outputSchema: GenerateMashrabiyaExplanationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
