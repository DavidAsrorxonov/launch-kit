interface IOutputFileNode {
  name: string;
  type: "file" | "folder";
  children?: IOutputFileNode[];
}
