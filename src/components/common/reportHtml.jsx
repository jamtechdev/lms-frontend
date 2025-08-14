import { useState, useMemo } from "react";
import swal from "sweetalert";
import loader from "../../assets/images/loader.gif";
import logo from "../../assets/images/logo/logo.png";
import background from "../../assets/images/dashboard-bg.png";
export default function WeeklyReport({ studentId, parentService, className }) {
  const [loading, setLoading] = useState(false);

  const icon = useMemo(
    () =>
      loading ? (
        <i className="ph ph-spinner-gap ph-spin" />
      ) : (
        <i className="ph ph-file-pdf" />
      ),
    [loading]
  );

  const handleClick = async () => {
    const reportWindow = window.open("QTN Vault", "_blank");
    if (!reportWindow) {
      swal(
        "Pop-up Blocked",
        "Please allow pop-ups for this site to view the report.",
        "warning"
      );
      return;
    }
    reportWindow.document.open();
    reportWindow.document.write(`
      <!doctype html>
      <html>
      <head><meta charset="utf-8"><title>Loading Report...</title></head>
      <body style="font-family:Arial,sans-serif;padding:20px">
        <div style="text-align:center;margin-top:40px">
          <img src=${loader} width="100" alt="Loading..." />
          <p>Preparing your weekly report…</p>
        </div>
      </body>
      </html>
    `);
    reportWindow.document.close();

    setLoading(true);
    try {
      const res = await parentService.getReport({ child_id: studentId });
      if (res?.data instanceof Blob && (res.data.type || "").includes("pdf")) {
        const pdfUrl = URL.createObjectURL(res.data);
        reportWindow.location.href = pdfUrl;
        setTimeout(() => URL.revokeObjectURL(pdfUrl), 15000);
        return;
      }

      const data =
        typeof res?.data === "object" ? res.data : JSON.parse(res.data);
      const html = buildWeeklyReportHTML(data);
      reportWindow.document.open();
      reportWindow.document.write(html);
      reportWindow.document.close();
    } catch (e) {
      console.error(e);
      reportWindow.document.open();
      reportWindow.document.write("<p>Failed to load report.</p>");
      reportWindow.document.close();
      swal("Failed", "Could not load the weekly report.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={className || "icon-button ms-2"}
      onClick={handleClick}
      title="Weekly Report"
      disabled={loading}
      aria-busy={loading ? "true" : "false"}
    >
      {icon}
    </button>
  );
}

const buildWeeklyReportHTML = (payload, theme = {}) => {
  const brand = {
    logoUrl: logo,
    background: background,
  };
  const colors = {
    primary: theme.colors?.primary || "#4E6CF3",
    accent: theme.colors?.accent || "#FF8A3D",
    chip: theme.colors?.chip || "#F4F6FF",
  };

  const rpt = payload || {};
  const info = rpt.student_data?.student_info || {};
  const assignments = rpt.student_data?.assignments || [];
  const questionBank = rpt.student_data?.question_bank || {};
  const gems = rpt.student_data?.gems || {};
  const gemHist = gems.gem_history_details || [];
  const perf = rpt.student_data?.performance_summary || {};
  const reportText = rpt.report || "";

  const mdToHtml = (md) =>
    `<p>${(md || "")
      .trim()
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/^-\s+/gm, "• ")
      .replace(/\n{2,}/g, "</p><p>")
      .replace(/\n/g, "<br/>")}</p>`;

  const assignmentRows = assignments
    .map(
      (a) => `
      <tr>
        <td>${a.title || "-"}</td>
        <td>${a.subject || "-"}</td>
        <td>${a.paper_title || "-"}</td>
        <td>${a.total_questions ?? "-"}</td>
        <td>${a.correct_answers ?? "-"}</td>
        <td>${a.percentage != null ? a.percentage + "%" : "-"}</td>
        <td>${a.grade || "-"}</td>
        <td>${(a.weaknesses || []).join(", ") || "-"}</td>
        <td>${a.gems_earned ?? "-"}</td>
        <td>${a.submitted_at || "-"}</td>
      </tr>`
    )
    .join("");

  const qbRows = Object.entries(questionBank)
    .map(
      ([subject, q]) => `
      <tr>
        <td>${subject}</td>
        <td>${q?.attempted ?? "-"}</td>
        <td>${q?.correct ?? "-"}</td>
        <td>${q?.percentage != null ? q.percentage + "%" : "-"}</td>
      </tr>`
    )
    .join("");

  const gemRows = gemHist
    .map(
      (g) => `
      <tr>
        <td>${g.date || "-"}</td>
        <td>${g.source || "-"}</td>
        <td>${g.subject || "-"}</td>
        <td>${g.assignment || "-"}</td>
        <td>${g.gems ?? "-"}</td>
      </tr>`
    )
    .join("");

  const today = new Date().toLocaleString();

  return `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>QTN Vault • Weekly Report ${
      info?.name ? "– " + info.name : ""
    }</title>
    <style>
      :root{
        --primary:${colors.primary};
        --accent:${colors.accent};
        --chip:${colors.chip};
        --bg:#fffdfb;
        --text:#222;
        --muted:#6b7280;
        --border:#e6e8f0;
        --card:#ffffff;
        --thead:#f3f5ff;
        --shadow:0 6px 18px rgba(20,22,35,.12);
        --radius:14px;
      }
      *{box-sizing:border-box}
      html,body{margin:0;padding:0}
      body{
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Apple Color Emoji","Segoe UI Emoji";
        color:var(--text);
        background:
          url("${brand.background}") center/fit no-repeat fixed,
          radial-gradient(24px 24px at 24px 24px, rgba(0,0,0,.02) 1px, transparent 1px),
          #fff;
      }

      .topbar{
        position:sticky; top:0; z-index:10;
        background: rgba(255, 138, 61, 0.90);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        padding: 10px 18px;
        display:flex; align-items:center; gap:12px;
        box-shadow: var(--shadow);
      }

      .brand{
        display:flex; align-items:center; gap:10px; color:#fff; text-decoration:none;
      }
      .brand img{height:34px; width:auto; border-radius:8px; background:#fff1; padding:4px}
      .brand-title{font-weight:800; letter-spacing:.2px}
      .chips{
        margin-left:auto; display:flex; gap:8px; align-items:center;
      }
      .chip{
        background:#ffffff22; border:1px solid #ffffff33; color:#fff;
        padding:6px 10px; border-radius:999px; font-size:12px;
      }
      .btn{
        border:0; border-radius:10px; padding:10px 14px; font-weight:600; cursor:pointer;
        background:#fff; color:var(--accent); display:inline-flex; align-items:center; gap:8px;
        box-shadow: var(--shadow);
      }
      .btn svg{height:16px;width:16px}

      .container{max-width:1100px; margin:24px auto; padding:0 16px}

      .card{
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.35);
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        overflow:hidden;
        margin-bottom:18px;
      }

      .card-header{
        display:flex; justify-content:space-between; align-items:center;
        padding:14px 16px;
        background: rgba(243, 245, 255, 0.75);
        border-bottom:1px solid rgba(230,232,240,0.7);
      }

      .title{margin:0; font-size:18px}
      .muted{color:var(--muted); font-size:13px}

      /* Info grid */
      .grid{
        display:grid; grid-template-columns: repeat(2,1fr); gap:10px; padding:16px;
      }
      .kv{
        background: rgba(244, 246, 255, 0.8);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        padding:10px 12px; border-radius:10px; border:1px solid rgba(230,232,240,0.7);
      }
      .kv strong{display:block; font-size:12px; color:var(--muted); margin-bottom:4px}

      table{width:100%; border-collapse:separate; border-spacing:0; font-size:14px}
      thead th{
        background: ${colors.primary};
        color:#fff; text-align:left; font-weight:700;
        padding:10px 12px; border:0;
      }
      thead th:first-child{border-top-left-radius:10px}
      thead th:last-child{border-top-right-radius:10px}

      tbody td{
        padding:10px 12px;
        border-bottom:1px solid rgba(230,232,240,0.8);
        background: rgba(255, 255, 255, 0.8);
      }
      tbody tr:last-child td{border-bottom:0}

      .section{padding:16px}

      .badge{
        display:inline-block; font-size:12px; padding:4px 8px; border-radius:999px; background:rgba(255,232,214,0.9); color:#7a3a00
      }

      footer{
        padding:12px 18px; font-size:13px; border-radius:8px;
        display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap;
        color:#fff;
        background: rgba(78, 108, 243, 0.85);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        box-shadow: var(--shadow);
      }

      @media (max-width: 720px){
        .grid{grid-template-columns: 1fr}
        .card-header{flex-direction:column; align-items:flex-start; gap:8px}
        .chips{display:none}
      }

      @media print {
        body{
          background:#fff; /* printers ignore background images */
        }
        .card,
        .kv,
        tbody td,
        .card-header,
        footer,
        .topbar{ 
          background:#fff !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .topbar, footer { box-shadow: none; }
      }
    </style>
  </head>
  <body>
    <!-- Topbar -->
    <header class="topbar">
      <a class="brand" href="javascript:void(0)">
        <img src="${brand.logoUrl}" alt="logo" />
      </a>
      <div class="chips">
        <button class="btn" onclick="window.print()" title="Print / Save PDF">
          <!-- pdf icon -->
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M6 9V2h12v7"></path>
            <path d="M6 18H4a2 2 0 0 1-2-2V9h20v7a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8" rx="2"></rect>
          </svg>
          Report
        </button>
      </div>
    </header>

    <main class="container">
      <!-- Overview / identity -->
      <section class="card">
        <div class="card-header">
          <h1 class="title">Weekly Learning Report</h1>
          <div class="muted">Period: ${info.week_period || "-"}</div>
        </div>
        <div class="grid">
          <div class="kv"><strong>Student</strong>${info.name || "-"}</div>
          <div class="kv"><strong>Level</strong>${info.level || "-"}</div>
          <div class="kv"><strong>Total Gems</strong>${
            info.total_gems ?? "-"
          }</div>
          <div class="kv"><strong>Generated</strong>${today}</div>
        </div>
        <div class="section">
          <div class="badge">Overview</div>
          ${mdToHtml(reportText)}
        </div>
      </section>

      <!-- Assignments -->
      <section class="card">
        <div class="card-header">
          <h2 class="title">Assignments</h2>
          <span class="muted">Completed: ${perf.assignments_completed ?? 0}/${
    perf.assignments_given ?? 0
  }</span>
        </div>
        <div class="section">
          <table>
            <thead>
              <tr>
                <th>Title</th><th>Subject</th><th>Paper</th><th>Total Qs</th>
                <th>Correct</th><th>Score</th><th>Grade</th><th>Weaknesses</th><th>Gems</th><th>Submitted</th>
              </tr>
            </thead>
            <tbody>${
              assignmentRows ||
              `<tr><td colspan="10" class="muted">No assignments this week.</td></tr>`
            }</tbody>
          </table>
        </div>
      </section>

      <!-- Question Bank -->
      <section class="card">
        <div class="card-header">
          <h2 class="title">Question Bank</h2>
        </div>
        <div class="section">
          <table>
            <thead>
              <tr><th>Subject</th><th>Attempted</th><th>Correct</th><th>Accuracy</th></tr>
            </thead>
            <tbody>${
              qbRows ||
              `<tr><td colspan="4" class="muted">No question bank activity.</td></tr>`
            }</tbody>
          </table>
        </div>
      </section>

      <!-- Gems -->
      <section class="card">
        <div class="card-header">
          <h2 class="title">Gems</h2>
          <span class="muted">Week Total: ${gems.total_gems ?? 0}</span>
        </div>
        <div class="section">
          <p class="muted">From Assignments: <strong>${
            gems.assignment_gems ?? 0
          }</strong> • From Question Bank: <strong>${
    gems.question_bank_gems ?? 0
  }</strong></p>
          <table>
            <thead>
              <tr><th>Date</th><th>Source</th><th>Subject</th><th>Assignment</th><th>Gems</th></tr>
            </thead>
            <tbody>${
              gemRows ||
              `<tr><td colspan="5" class="muted">No gems earned yet.</td></tr>`
            }</tbody>
          </table>
        </div>
      </section>

      <!-- Performance -->
      <section class="card">
        <div class="card-header">
          <h2 class="title">Performance Summary</h2>
        </div>
        <div class="section">
          <table>
            <tbody>
              <tr><td><strong>Assignments Given</strong></td><td>${
                perf.assignments_given ?? 0
              }</td></tr>
              <tr><td><strong>Assignments Completed</strong></td><td>${
                perf.assignments_completed ?? 0
              }</td></tr>
              <tr><td><strong>Completion Rate</strong></td><td>${
                perf.completion_rate != null ? perf.completion_rate + "%" : "-"
              }</td></tr>
              <tr><td><strong>Total Papers Completed</strong></td><td>${
                perf.total_papers_completed ?? 0
              }</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <footer>
        <div style="margin-bottom:0;">&copy; Copyright QTN Vault 2025, All Rights Reserved</div>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <span style="cursor:pointer;">License</span>
          <span style="cursor:pointer;">Documentation</span>
          <span style="cursor:pointer;">Support</span>
        </div>
      </footer>
    </main>
  </body>
  </html>
  `;
};
