/**
 * BrideHub Vendor Data Management
 * 
 * This file serves as the main entry point for all vendor data.
 * Data has been decoupled into organized modules for better maintainability.
 * 
 * Structure:
 * - lib/data/types.ts - TypeScript interfaces and types
 * - lib/data/categories.ts - Category definitions
 * - lib/data/[category].ts - Individual vendor data by category
 * - lib/data/utils.ts - Helper functions for data management
 * - lib/data/index.ts - Main aggregator module
 */

// Re-export everything from the organized data structure
export * from "./data/index"
