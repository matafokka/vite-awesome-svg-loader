import { ColorMapPerFiles } from "../types";

export type ResolvedColorReplacements = Required<Omit<ColorMapPerFiles, "files">>;
