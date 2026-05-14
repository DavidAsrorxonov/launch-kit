export function mergeOutputTrees(
  trees: IOutputFileNode[][],
): IOutputFileNode[] {
  const result: IOutputFileNode[] = [];

  for (const tree of trees) {
    for (const node of tree) {
      mergeNode(result, node);
    }
  }

  return result;
}

function mergeNode(target: IOutputFileNode[], node: IOutputFileNode) {
  const existing = target.find(
    (item) => item.name === node.name && item.type === node.type,
  );

  if (!existing) {
    target.push(cloneNode(node));
    return;
  }

  if (existing.type === "folder" && node.type === "folder") {
    existing.children = existing.children || [];

    for (const child of node.children || []) {
      mergeNode(existing.children, child);
    }
  }
}

function cloneNode(node: IOutputFileNode): IOutputFileNode {
  return {
    name: node.name,
    type: node.type,
    children: node.children?.map(cloneNode),
  };
}
