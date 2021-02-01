import { addNamespace } from '@babel/helper-module-imports';
import { NodePath } from '@babel/core';

export function AddDefaultImported(
  path: NodePath<any>,
  packageName: string,
  imported: string,
  local?: string,
): any {
  let source: string = packageName;
  if (imported && imported !== 'default') {
    source = `${source}/build/utils/${imported}`;
  } else {
    source = `${source}/${imported}`;
  }
  return addNamespace(path, source, {
    nameHint: local || imported,
  });
}

