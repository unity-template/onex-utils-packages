import * as types from '@babel/types';
import lodash from 'lodash';
import traverse from '@babel/traverse';
import { AddDefaultImported } from './utils/module-import';
import { findImportList } from './utils/findImportList';
import { Ids } from './const';
import { ImportItem, ImportList, PluginPass } from './type';
import { PluginObj, NodePath } from '@babel/core';


function getCallee({ parentPath }: NodePath) {
  // Trace curried calls to their origin, e.g. `fp.partial(func)([fp, 2])(1)`.
  while (!parentPath.isStatement()) {
    if (parentPath.isCallExpression()) {
      let result = parentPath.node.callee;

      while (types.isCallExpression(result)) {
        result = result.callee;
      }

      return result;
    }

    parentPath = parentPath.parentPath;
  }
}

export default function babelPluginOnexUtils(): PluginObj<PluginPass> {
  return {
    visitor: {
      Program(path) {
        let isModule = false;
        lodash.each(path.node.body, (node) => {
          if (types.isModuleDeclaration(node)) {
            isModule = true;
          }
        });

        if (!isModule) return;
        const importList: ImportList = [];

        traverse(path.node, {
          ImportDeclaration: {
            exit(importDeclarationPath) {
              const imported: ImportItem['imported'] = [];
              const specifiers: ImportItem['specifiers'] = [];
              const importItem: ImportItem = {
                source: importDeclarationPath.node.source.value,
                imported,
                specifiers,
              };
              importList.push(importItem);

              findImportList(importDeclarationPath, imported, specifiers);
            },
          },
        });

        lodash.each(importList, (importItem) => {
          const { source } = importItem;
          if (!Ids.includes(source)) return;

          lodash.each(importItem.specifiers, (spec, index) => {
            const { local, imported } = spec;
            const binding = path.scope.getBinding(local);

            lodash.each(binding.referencePaths, (refPath) => {
              const { parentPath } = refPath;
              if (imported && imported !== 'default') {
                const INode = AddDefaultImported(refPath, source, imported, local);
                refPath.replaceWith(INode);
              } else if (types.isMemberExpression(parentPath.node)) {
                // BUG: 需要将状态进行保存，放置重复引用
                if (!types.isIdentifier(parentPath.node.property)) {
                  return;
                }
                const key = parentPath.node.property.name;
                if (!key) return;
                const INode = AddDefaultImported(refPath, source, key);
                parentPath.replaceWith(INode);
              } else if (
                imported === 'default' &&
                types.isExpression(parentPath.node)
              ) {
                // BUG: 直接使用default相关处理
                const INode = AddDefaultImported(refPath, source, 'default');
                refPath.replaceWith(INode);
              }
            });
          });
        });
      },

      ImportDeclaration: {
        enter(path) {
          const packageName = path.node.source.value;
          if (Ids.includes(packageName)) {
            path.remove();
          }
        },
        exit(path) {
          const packageName = path.node.source.value.replace('/default', '');
          if (Ids.includes(packageName)) {
            path.node.source.value = packageName;
          }
        },
      },

      ExportNamedDeclaration(path) {
        const packageName = path.node.source?.value;
        if (!Ids.includes(packageName)) {
          return undefined;
        }

        path.node.source = null;

        lodash.each(path.node.specifiers, (spec) => {
          if (types.isExportSpecifier(spec)) {
            const importName = types.isIdentifier(spec.exported) ? spec.exported.name : spec.exported.value;
            const result = AddDefaultImported(
              path,
              packageName,
              importName,
              spec.local.name,
            );
            spec.local = result;
          }
        });
      },
    },
  };
}
