/**
 * Poster POS Configuration
 * 
 * To connect your live Poster account:
 * 1. Open your Poster admin panel -> Settings -> API -> Generate Access Token
 * 2. Add VITE_POSTER_API_TOKEN into .env file or paste it directly below into apiToken.
 */

export interface PosterConfig {
  accountName: string;
  accountPosId: number;
  apiToken: string;
  defaultSpotId: number;
  isLiveMode: boolean;
}

const env = (import.meta as any).env || {};

export const POSTER_CONFIG: PosterConfig = {
  accountName: "crab-club",
  accountPosId: 21253,
  // When you obtain your token from Poster Admin, paste it here or in .env
  apiToken: env.VITE_POSTER_API_TOKEN || "",
  defaultSpotId: parseInt(env.VITE_POSTER_SPOT_ID || "1", 10),
  isLiveMode: Boolean(env.VITE_POSTER_API_TOKEN)
};
