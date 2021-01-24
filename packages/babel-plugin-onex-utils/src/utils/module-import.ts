import { addDefault } from '@babel/helper-module-imports';
import { NodePath } from '@babel/core';

export function AddDefaultImported(
  path: NodePath<any>,
  packageName: string,
  imported: string,
  local?: string,
): any {
  const source = `${packageName}/${imported}`;
  return addDefault(path, source, {
    nameHint: local || imported,
  });
}

