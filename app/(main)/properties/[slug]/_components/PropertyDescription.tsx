interface PropertyDescriptionProps {
  description: string | null;
}

export default function PropertyDescription({
  description,
}: PropertyDescriptionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-slate-900">Description</h3>
      <div className="prose prose-slate max-w-none">
        <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
          {description || "No description provided for this listing."}
        </p>
      </div>
    </div>
  );
}
