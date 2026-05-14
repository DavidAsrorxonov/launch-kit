export function renderOutputTree(nodes: IOutputFileNode[], level = 0) {
  return nodes.map((node) => (
    <div key={`${level}-${node.name}-${node.type}`}>
      <div
        className="flex items-center gap-2 text-white/45"
        style={{ paddingLeft: `${level * 14}px` }}
      >
        <span className="text-white/25">
          {node.type === "folder" ? "▸" : "•"}
        </span>
        <span>{node.name}</span>
      </div>

      {node.children?.length
        ? renderOutputTree(node.children, level + 1)
        : null}
    </div>
  ));
}
