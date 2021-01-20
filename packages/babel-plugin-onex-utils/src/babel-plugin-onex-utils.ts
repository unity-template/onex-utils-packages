import traverse, { NodePath } from '@babel/traverse';
import types from '@babel/types';
import { PluginObj } from '@babel/core';
import { PluginPass } from './type';

export default function babelPluginOnexUtils(): PluginObj<PluginPass> {
  return {
    visitor: {
      Program(path, state) {},
      ImportDeclaration(path) {},
      ExportNamedDeclaration(path) {},
    },
  };
}
