import { loadOptions, PluginObj } from '@babel/core';
import { PluginPass, ImportList, ImportItem } from './type';
import { Ids } from './const';
import lodash, { constant } from 'lodash';
import types from '@babel/types';
import traverse from '@babel/traverse';
import { findImportList } from './utils/findImportList';
import { AddDefaultImported } from './utils/module-import';

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

        if (isModule) return;
        const importList: ImportList = [];

        // 将项目中的import语句进行保存
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

              findImportList(
                importDeclarationPath,
                imported,
                specifiers,
              );
            },
          },
        });

        // 针对这些引用进行分析，替换其中引用的部分
        lodash.each(importList, (importItem) => {
          const { source } = importItem;
          if (!Ids.includes(source)) return;

          lodash.each(importItem.specifiers, (spec, index) => {
            const { local, imported } = spec;
            const binding = path.scope.getBinding(local);
            lodash.each(binding.referencePaths, (refPath) => {
              const { parentPath } = refPath;
              // 普通类型
              if (imported !== 'default') {
                const INode = AddDefaultImported(
                  refPath,
                  importItem.imported[index],
                  local,
                );
                refPath.replaceWith(INode);
              } else if (types.isMemberExpression(parentPath.node)) {
                const key = parentPath.node.property?.name;
                if (!key) return;
                const INode = AddDefaultImported(
                  refPath,
                  importItem.imported[index],
                  key,
                );
                parentPath.replaceWith(INode);
              }
            });
          });
        });
      },

      ImportDeclaration(path) {
        const packageName = path.node.source.value;
        if (Ids.includes(packageName)) {
          path.remove();
        }
      },

      ExportNamedDeclaration(path) {
        const packageName = path.node.source.value;
        if (!Ids.includes(packageName)) {
          return undefined;
        }
      },
    },
  };
}
