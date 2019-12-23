import { IJudgeOption, Codeforces, URI, UVa } from "../judges";

export interface IScraperOptions {
  headless?: boolean;
  judges: IJudgeOption[];
}

export type JudgesObject = {
  "Codeforces": Codeforces;
  "URI": URI;
  "UVa": UVa;
  // [key in SupportedJudges]: Codeforces | URI | UVa;
};
