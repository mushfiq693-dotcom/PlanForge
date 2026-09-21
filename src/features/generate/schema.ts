import { z } from "zod";

export const experienceLevelEnum = z.enum([
  "beginner",
  "intermediate",
  "advanced",
  "let_ai_decide",
]);

export const timelineEnum = z.enum([
  "weekend",
  "2_weeks",
  "1_month",
  "open",
  "let_ai_decide",
]);

export const generatePlanRequestSchema = z.object({
  idea: z
    .string({
      error: "App idea is required.",
    })
    .trim()
    .min(30, "App idea must be at least 30 characters long to generate a high-quality plan.")
    .max(6000, "App idea cannot exceed 6,000 characters."),

  name: z
    .string()
    .trim()
    .max(100, "Project name cannot exceed 100 characters.")
    .optional()
    .or(z.literal(""))
    .nullable(),

  targetUsers: z
    .string()
    .trim()
    .max(500, "Target users cannot exceed 500 characters.")
    .optional()
    .or(z.literal(""))
    .nullable(),

  stack: z
    .string()
    .trim()
    .max(500, "Preferred stack cannot exceed 500 characters.")
    .optional()
    .or(z.literal(""))
    .nullable(),

  level: experienceLevelEnum
    .optional()
    .or(z.literal(""))
    .nullable(),

  timeline: timelineEnum
    .optional()
    .or(z.literal(""))
    .nullable(),

  mustHave: z
    .string()
    .trim()
    .max(2000, "Must-have features cannot exceed 2,000 characters.")
    .optional()
    .or(z.literal(""))
    .nullable(),

  outOfScope: z
    .string()
    .trim()
    .max(2000, "Out-of-scope items cannot exceed 2,000 characters.")
    .optional()
    .or(z.literal(""))
    .nullable(),
});

export type GeneratePlanRequest = z.infer<typeof generatePlanRequestSchema>;
export type ExperienceLevel = z.infer<typeof experienceLevelEnum>;
export type Timeline = z.infer<typeof timelineEnum>;
