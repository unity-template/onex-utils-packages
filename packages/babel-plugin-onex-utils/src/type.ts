export interface PluginOptions {
}

export interface PluginPass {
  opts: PluginOptions;
  file: any;
}

export type ImportList = ImportItem[];
export interface ImportItem {
  /**
   * path.node.source.value
   */
  source: string;
  imported: string[];
  specifiers: SpecifyItem[];
}
export interface SpecifyItem {
  kind: string;
  imported?: string;
  local: string;
}
