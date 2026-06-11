import { useParams } from "react-router-dom";

export function ExampleDetailPage() {
  const { id } = useParams();

  return (
    <div className="rounded-lg bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold">Example Details: {id}</h2>
      <p className="mt-4 text-gray-500">
        This page would fetch and display the full details of a single example.
      </p>
    </div>
  );
}
