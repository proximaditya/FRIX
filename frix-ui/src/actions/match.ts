"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// 🔥 The Official Arpad Elo Mathematical Formula
function calculateElo(playerElo: number, opponentElo: number, didWin: boolean) {
  const expectedScore = 1 / (1 + Math.pow(10, (opponentElo - playerElo) / 400));
  const actualScore = didWin ? 1 : 0;
  const kFactor = 32; // Standard game impact factor
  
  return Math.round(playerElo + kFactor * (actualScore - expectedScore));
}

export async function endMatch(roomId: string, finalScoreA: number, finalScoreB: number, myTeam: "A" | "B") {
  const { userId } = await auth();
  if (!userId) return { success: false };

  // 1. Fetch the user's current stats from Postgres
  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) return { success: false };

  // 2. Did they win the Tug-of-War?
  const didWin = (myTeam === "A" && finalScoreA > finalScoreB) || (myTeam === "B" && finalScoreB > finalScoreA);
  
  // (In the future, we fetch the real opponent's ELO. For now, assume opponent is 1200)
  const opponentElo = 1200; 
  
  // 3. Run the advanced Math algorithm
  const newElo = calculateElo(user.eloRating, opponentElo, didWin);
  const eloChange = newElo - user.eloRating; // E.g., +15 or -14

  // 4. Save the new ranking to the database
  await prisma.user.update({
    where: { clerkId: userId },
    data: {
      eloRating: newElo,
      totalMatches: { increment: 1 },
      wins: didWin ? { increment: 1 } : { increment: 0 }
    }
  });

  // 5. Send the results back to the UI to trigger the Victory Screen!
  return { success: true, oldElo: user.eloRating, newElo, eloChange, didWin };
}