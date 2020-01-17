import { IJudgeOption, SupportedJudges } from "~/judges";

export interface IScraperOptions {
  headless?: boolean;
  judges?: IJudgeOption[];
}

export type IJudges = {
  [key in SupportedJudges]: any;
};
