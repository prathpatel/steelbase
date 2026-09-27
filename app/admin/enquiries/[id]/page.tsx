import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/common";
import { CopyButton } from "@/components/copy-button";
import { getDb, quoteStatuses, type QuoteRequestItemRow, type QuoteRequestRow } from "@/db";
import { requireAdmin } from "@/lib/admin-auth";
import { formatPrice, getSetup, getTier } from "@/lib/catalog";
import { enquiryMessage, formatReference } from "@/lib/enquiry";
import { whatsappLink } from "@/lib/site";
import { updateEnquiry } from "../../actions";
import { customerWhatsapp, formatWhen, statusLabels } from "../../format";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function EnquiryPage({ params, searchParams }: Props) {
  await requireAdmin();
  const id = Number((await params).id);
  const saved = (await searchParams).saved === "1";
  if (!Number.isInteger(id) || id < 1) notFound();

  const db = getDb();
  const enquiry: QuoteRequestRow | undefined = await db("quote_requests").where({ id }).first();
  if (!enquiry) notFound();
  const items: QuoteRequestItemRow[] = await db("quote_request_items").where({ quote_request_id: id }).orderBy("id");

  const reference = formatReference(enquiry.id);
  const tier = getTier(enquiry.tier);
  const setup = enquiry.setup_slug ? getSetup(enquiry.setup_slug) : undefined;
  const total = items.reduce((sum, i) => sum + i.unit_price, 0);
  const message = enquiryMessage({
    ...enquiry,
    reference,
    items: items.map((i) => ({ name: i.product_name, code: i.product_code, price: i.unit_price })),
    setupName: setup?.name,
  });
  // The configured WhatsApp number is the manufacturer's, so this forwards the lead.
  const forward = whatsappLink(message);

  const details: [string, React.ReactNode][] = [
    ["Received", formatWhen(enquiry.created_at)],
    ["Tier", `${tier.name} (${tier.range})`],
    ...(enquiry.tier === "build"
      ? ([
          ["Setup", setup?.name ?? enquiry.setup_slug ?? "—"],
          ["Area", enquiry.area ?? "—"],
          ["Budget", enquiry.budget ?? "—"],
        ] as [string, React.ReactNode][])
      : []),
    ["City", `${enquiry.city}${enquiry.pincode ? ` (${enquiry.pincode})` : ""}`],
    ["Timeline", enquiry.timeline],
    [
      "Phone",
      <>
        <a href={`tel:${enquiry.phone.replace(/\s/g, "")}`} className="inline-link">
          {enquiry.phone}
        </a>
        {" · "}
        <a href={customerWhatsapp(enquiry.phone)} target="_blank" rel="noreferrer" className="inline-link">
          WhatsApp
        </a>
      </>,
    ],
    [
      "Email",
      enquiry.email ? (
        <a href={`mailto:${enquiry.email}`} className="inline-link">
          {enquiry.email}
        </a>
      ) : (
        "—"
      ),
    ],
    ["Customer notes", enquiry.notes ?? "—"],
  ];

  return (
    <div className="wrap">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/admin">Enquiries</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{reference}</span>
      </nav>
      <div className="admin-bar">
        <div>
          <p className="eyebrow">{reference}</p>
          <h1 className="h2">{enquiry.name}</h1>
        </div>
        <span className={`status-pill status-${enquiry.status}`}>{statusLabels[enquiry.status]}</span>
      </div>

      <div className="admin-grid">
        <div className="admin-card">
          <h2 className="admin-card-title">Request</h2>
          <dl className="admin-dl">
            {details.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          {items.length > 0 && (
            <table className="admin-table admin-items">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Code</th>
                  <th scope="col">Price at request</th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i.id}>
                    <td>
                      <Link href={`/equipment/${i.product_slug}`} className="inline-link">
                        {i.product_name}
                      </Link>
                    </td>
                    <td>{i.product_code}</td>
                    <td>{formatPrice(i.unit_price)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row" colSpan={2}>
                    Total
                  </th>
                  <td>{formatPrice(total)}</td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>

        <div className="admin-side">
          <div className="admin-card">
            <h2 className="admin-card-title">Follow-up</h2>
            {saved && (
              <p className="admin-saved" role="status">
                Saved.
              </p>
            )}
            <form action={updateEnquiry}>
              <input type="hidden" name="id" value={enquiry.id} />
              <label className="field">
                <span>Status</span>
                <select name="status" defaultValue={enquiry.status}>
                  {quoteStatuses.map((s) => (
                    <option key={s} value={s}>
                      {statusLabels[s]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>
                  Internal notes <em>(not shown to the customer)</em>
                </span>
                <textarea
                  name="admin_notes"
                  rows={5}
                  maxLength={5000}
                  defaultValue={enquiry.admin_notes ?? ""}
                  placeholder="Forwarded to manufacturer on…, quoted ₹…, commission…"
                />
              </label>
              <button type="submit" className="btn btn-dark">
                <span>Save</span>
                <Arrow />
              </button>
            </form>
            <p className="note">Last updated {formatWhen(enquiry.updated_at)}</p>
          </div>

          <div className="admin-card">
            <h2 className="admin-card-title">Forward to manufacturer</h2>
            <p className="admin-help">Includes the {reference} reference so the sale can be traced back to you.</p>
            <pre className="quote-preview">{message}</pre>
            <div className="actions">
              {forward && (
                <a href={forward} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                  <span>Send on WhatsApp</span>
                  <Arrow />
                </a>
              )}
              <CopyButton text={message} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
