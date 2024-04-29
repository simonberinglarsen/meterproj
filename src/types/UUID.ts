import { v4 as uuidv4 } from 'uuid';

// Define UUID type
export type UUID = string;

// Generate UUID function
export function generateUUID(): UUID {
    return uuidv4();
}