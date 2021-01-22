import { addDefault } from '@babel/helper-module-imports';
import { NodePath } from '@babel/core';


export function AddDefaultImported(path: NodePath, packageName: string, imported: string): NodePath {
  // 向上回溯一层
  const source = `${packageName}/${imported}`;
  return addDefault(path, source);
}

