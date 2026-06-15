import { useExampleStore } from "../store";
import type { Example } from "../model";

interface ExampleCardProps {
  example: Example;
}

export function ExampleCard({ example }: ExampleCardProps) {
  const isSelected = useExampleStore((s) => s.selectedIds.has(example.id.toString()));
  const toggleSelection = useExampleStore((s) => s.toggleSelection);

  return (
    <div 
      onClick={() => toggleSelection(example.id.toString())}
      className={`cursor-pointer rounded-lg border p-4 transition-all ${
        isSelected ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200" : "border-gray-200 bg-white hover:border-blue-300"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{example.title}</h3>
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          example.status === "active" ? "bg-green-100 text-green-800" :
          example.status === "archived" ? "bg-gray-100 text-gray-800" :
          "bg-yellow-100 text-yellow-800"
        }`}>
          {example.status}
        </span>
      </div>
      {example.description && (
        <p className="mt-2 text-sm text-gray-500">{example.description}</p>
      )}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>Score: {example.score}</span>
        <span>ID: {example.id}</span>
      </div>
    </div>
  );
}
