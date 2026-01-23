import React, { Suspense } from "react";
import PropertyAddForm from "../_components/PropertyAddForm";

export default function PropertyAddpage() {
  return (
    <div>
      <Suspense
        fallback={<div className="p-10 text-center">Loading Form...</div>}
      >
        <PropertyAddForm />
      </Suspense>
    </div>
  );
}
