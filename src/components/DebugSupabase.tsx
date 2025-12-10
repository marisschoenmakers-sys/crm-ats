import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function DebugSupabase() {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    async function test() {
      if (!supabase) {
        setResult({ error: "Supabase not configured" });
        return;
      }

      const output: any = {};

      // Test simple query
      const { data: stages, error: stagesError } = await supabase
        .from("pipeline_stages")
        .select("*");

      output.pipeline = { count: stages?.length, error: stagesError?.message };

      // Test tables
      const tables = ["companies", "candidates", "vacancies", "talent_pools"];
      output.tables = {};

      for (const t of tables) {
        const { count, error } = await supabase
          .from(t)
          .select("*", { count: "exact", head: true });

        output.tables[t] = { count, error: error?.message };
      }

      setResult(output);
    }

    test();
  }, []);

  return (
    <div style={{ padding: 20, background: "#1a1a2e", color: "#fff", minHeight: "100vh" }}>
      <h1>Supabase Debug</h1>
      {result ? (
        <pre style={{ background: "#16213e", padding: 16, borderRadius: 8 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
