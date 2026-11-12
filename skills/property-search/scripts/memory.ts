import {ListingRow} from "./search.js"
import { readFileSync, writeFileSync, existsSync } from "node:fs";

interface UserSession {
    city?: string | null;
    maxPrice?: number | null;
    beds?: number | null;
    baths?: number | null;
    sqft?: number | null;
    type?: string | null;
    pool?: string | null;
    hasView?: string | null;
    lastResults?: ListingRow[];
    conversationStep: number;
}
export const sessions = new Map<string, UserSession>();
//assigning previously saved memory to sessions if not cleared by user
if (existsSync("sessions.json")) {
    const data = JSON.parse(readFileSync("sessions.json", "utf8"));

    for (const [userId, session] of Object.entries(data)) {
        sessions.set(userId, session as UserSession);
    }
}
export function getSession(userId: string): UserSession {
    if (!sessions.has(userId)) {
        sessions.set(userId, { conversationStep: 0 });
    }
    return sessions.get(userId)!;
}
export function updateSession(userId: string, updates: Partial<UserSession>) {
    const session = getSession(userId);
    sessions.set(userId, { ...session, ...updates });
    saveSessions()
}
export function clearSession(userId: string) {
    sessions.delete(userId);
    saveSessions()
}
//function to save all memory in file, does not reset every time we run:
//pnpm exec tsx scripts/run.ts "USER_QUERY"
function saveSessions() {
    const data = Object.fromEntries(sessions);
    writeFileSync("sessions.json", JSON.stringify(data, null, 2));
}