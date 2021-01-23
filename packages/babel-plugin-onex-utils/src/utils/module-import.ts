import { addDefault, addNamed } from '@babel/helper-module-imports';
import { NodePath } from '@babel/core';


export function AddDefaultImported(path: NodePath<any>, packageName: string, imported: string, local?: string): NodePath {
  // 向上回溯一层
  const source = `${packageName}/${imported}`;
  return addDefault(path, source, {
    nameHint: local || imported,
  });
}

