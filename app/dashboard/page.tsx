const cards = ["New leads today", "Calls made today", "Follow-ups due", "Hot leads", "Site visits", "Inventory", "Attendance"];

export default function DashboardPage() {
  return (
    <section className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">EstateFlow CRM Dashboard</h1>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{cards.map((c) => <div key={c} className="rounded-xl bg-white p-4 shadow">{c}</div>)}</div>
      <div className="rounded-xl bg-white p-4 shadow">Recent activity feed and charts placeholder.</div>
    </section>
  );
}
