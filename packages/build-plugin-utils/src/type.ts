export enum BuildType {
  umd = 'UMD'
}

export interface WebpackOptions {
  type?: BuildType;
}
