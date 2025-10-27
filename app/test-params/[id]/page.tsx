import React from "react";

export default async function TestParamsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await React.use(params);

  return (
    <div>
      <h1>Test Params Page</h1>
      <p>ID: {id}</p>
    </div>
  );
}
