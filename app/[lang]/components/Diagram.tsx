"use client";

import Diagram, { createSchema, useSchema } from "beautiful-react-diagrams";
// import "beautiful-react-diagrams/styles.css";
import "@/styles/beautiful-react-diagrams.css";
import { useTheme } from "next-themes";

// the diagram model
const initialSchema = createSchema({
  nodes: [
    { id: "node-1", content: "Node 1", coordinates: [250, 60] },
    { id: "node-2", content: "Node 2", coordinates: [100, 200] },
    { id: "node-3", content: "Node 3", coordinates: [250, 220] },
    { id: "node-4", content: "Node 4", coordinates: [400, 200] },
  ],
  links: [
    { input: "node-1", output: "node-2" },
    { input: "node-1", output: "node-3" },
    { input: "node-1", output: "node-4" },
  ],
});

const UncontrolledDiagram = ({ schema }: any) => {
  // create diagrams schema
  const [schemainfo, { onChange }] = useSchema(createSchema(schema));
  const { theme } = useTheme();

  return (
    <div className={`h-48 ${theme === "dark" ? "bg-[#011627]" : "bg-white"}`}>
      <Diagram schema={schemainfo} onChange={onChange} />
    </div>
  );
};

export default UncontrolledDiagram;
