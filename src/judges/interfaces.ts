export type SupportedJudges = "Codeforces" | "URI" | "UVa";

export interface IJudgeOption {
  judge: SupportedJudges;
  credentials: IJudgeCredentials;
}
export interface IJudgeCredentials {
  username: string; // could be username, handle, or email
  password: string;
}
