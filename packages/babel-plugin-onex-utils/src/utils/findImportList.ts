import * as types from '@babel/types';
import { ImportItem } from '../type';
import { NodePath } from '@babel/core';

export const findImportList = (path: NodePath<babel.types.ImportDeclaration>, imported: ImportItem['imported'], specifiers: ImportItem['specifiers']) => {
  for (const specifier of path.get('specifiers')) {
    const local = specifier.node.local.name;

    /**
     * @remarks default类型引用的处理
     * ```ts
     * import utils from 'onex-utils';
     * ```
     */
    if (specifier.isImportDefaultSpecifier()) {
      imported.push('default');
      specifiers.push({
        kind: 'named',
        imported: 'default',
        local,
      });
    }

    /**
     * @remarks 解构类型的处理
     * ```ts
     * import { data } from 'onex-utils'
     * ```
     */
    if (specifier.isImportSpecifier()) {
      let importedName: string;
      if (types.isIdentifier(specifier.node.imported)) {
        importedName = specifier.node.imported.name;
      } else if (types.isStringLiteral(specifier.node.imported)) {
        importedName = specifier.node.imported.value;
      }
      imported.push(importedName);
      specifiers.push({
        kind: 'named',
        imported: importedName,
        local,
      });
    }

    /**
     * @remarks 命名空间方式
     * ```ts
     * import * as utils from 'onex-utils'
     * ```
     */
    if (specifier.isImportNamespaceSpecifier()) {
      imported.push('*');
      specifiers.push({
        kind: 'namespace',
        imported: '',
        local,
      });
    }
  }
};
