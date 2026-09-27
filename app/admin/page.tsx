import Link from "next/link";
import { getDb, quoteStatuses, type QuoteRequestRow, type QuoteStatus } from "@/db";
import { requireAdmin } from "@/lib/admin-auth";
import { formatPrice, getSetup, getTier } from "@/lib/catalog";
import { formatReference } from "@/lib/enquiry";
import { logout } from "./actions";
import { formatWhen, parseReference, statusLabels } from "./format";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

type ListRow = Pick<QuoteRequestRow, "id" | "created_at" | "status" | "tier" | "setup_slug" | "name" | "phone" | "city"> & {
  item_count: string | null;
  total: string | null;
};

const PAGE_SIZE = 200;

export default async function AdminPage({ searchParams }: { searchParams: SearchParams }) {
  await requireAdmin();
  const params = await searchParams;
  const status = quoteStatuses.find((s) => s === params.status);
  const q = typeof params.q === "string" ? params.q.trim().slice(0, 100) : "";

  let rows: ListRow[] = [];
  let counts: Partial<Record<QuoteStatus, number>> = {};
  let failed = false;
  try {
    const db = getDb();
    const items = db("quote_request_items")
      .select("quote_request_id")
      .count({ item_count: "*" })
      .sum({ total: "unit_price" })
      .groupBy("quote_request_id")
      .as("i");

    const query = db("quote_requests as q")
      .leftJoin(items, "i.quote_request_id", "q.id")
      .select("q.id", "q.created_at", "q.status", "q.tier", "q.setup_slug", "q.name", "q.phone", "q.city", "i.item_count", "i.total")
      .orderBy("q.created_at", "desc")
      .limit(PAGE_SIZE);
    if (status) query.where("q.status", status);
    if (q) {
      const ref = parseReference(q);
      query.where((w) => {
        w.whereILike("q.name", `%${q}%`).orWhereILike("q.phone", `%${q}%`).orWhereILike("q.city", `%${q}%`);
        if (ref) w.orWhere("q.id", ref);
      });
    }
    rows = await query;

    const grouped: { status: QuoteStatus; count: string }[] = await db("quote_requests")
      .select("status")
      .count({ count: "*" })
      .groupBy("status");
    counts = Object.fromEntries(grouped.map((g) => [g.status, Number(g.count)]));
  } catch (error) {
    console.error("Failed to load enquiries", error);
    failed = true;
  }

  const total = Object.values(counts).reduce((a, b) => a + (b ?? 0), 0);
  const filterHref = (s?: QuoteStatus) => {
    const p = new URLSearchParams();
    if (s) p.set("status", s);
    if (q) p.set("q", q);
    return `/admin${p.size ? `?${p}` : ""}`;
  };

  return (
    <div className="wrap">
      <div className="admin-bar">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="h2">Enquiries</h1>
        </div>
        <form action={logout}>
          <button type="submit" className="text-link">
            Sign out
          </button>
        </form>
      </div>

      <div className="admin-tools">
        <nav className="chips" aria-label="Filter by status">
          <Link href={filterHref()} className="chip" aria-current={!status ? "page" : undefined}>
            All <span>{total}</span>
          </Link>
          {quoteStatuses.map((s) => (
            <Link key={s} href={filterHref(s)} className="chip" aria-current={status === s ? "page" : undefined}>
              {statusLabels[s]} <span>{counts[s] ?? 0}</span>
            </Link>
          ))}
        </nav>
        <form className="admin-search" role="search">
          {status && <input type="hidden" name="status" value={status} />}
          <input type="search" name="q" defaultValue={q} placeholder="Name, phone, city or SB-00012" aria-label="Search enquiries" />
          <button type="submit" className="btn btn-dark btn-sm">
            <span>Search</span>
          </button>
        </form>
      </div>

      {failed ? (
        <p className="admin-empty">Couldn&apos;t reach the database. Check DATABASE_URL and that migrations have run.</p>
      ) : rows.length === 0 ? (
        <p className="admin-empty">{q || status ? "No enquiries match." : "No enquiries yet."}</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th scope="col">Ref</th>
                <th scope="col">Received</th>
                <th scope="col">Customer</th>
                <th scope="col">City</th>
                <th scope="col">Request</th>
                <th scope="col">Value</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <Link href={`/admin/enquiries/${r.id}`} className="admin-ref">
                      {formatReference(r.id)}
                    </Link>
                  </td>
                  <td className="admin-nowrap">{formatWhen(r.created_at)}</td>
                  <td>
                    <strong>{r.name}</strong>
                    <br />
                    <span className="muted">{r.phone}</span>
                  </td>
                  <td>{r.city}</td>
                  <td>
                    {getTier(r.tier).name}
                    {" · "}
                    {r.tier === "build"
                      ? (getSetup(r.setup_slug ?? "")?.name ?? "Setup")
                      : `${r.item_count ?? 0} item${Number(r.item_count) === 1 ? "" : "s"}`}
                  </td>
                  <td className="admin-nowrap">{r.total ? formatPrice(Number(r.total)) : "Custom"}</td>
                  <td>
                    <span className={`status-pill status-${r.status}`}>{statusLabels[r.status]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === PAGE_SIZE && <p className="note">Showing the latest {PAGE_SIZE}. Filter or search to narrow down.</p>}
        </div>
      )}
    </div>
  );
}
