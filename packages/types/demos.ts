// Demo-related types

/**
 * Data that every demo should export
 */
export interface DemoExport {
  /**
   * Demo name
   */
  name: string;

  /**
   * Demo app that should be mounted
   */
  App: any;

  /**
   * Project's file tree
   */
  fileTree: FileTreeNode[];
}

/**
 * Demo's file tree node
 */
export interface FileTreeNode {
  /**
   * File or directory name
   */
  name: string;

  /**
   * Full path to this node from the tree's root
   */
  fullPath: string;

  /**
   * If string, content of the file. If array, content of the directory.
   */
  content: string | FileTreeNode[];
}

/**
 * Demo data that can be fetched from the file system
 */
export type DemoExportFsData = Pick<DemoExport, "fileTree" | "name">