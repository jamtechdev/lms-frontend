import { useState, useMemo } from "react";
import swal from "sweetalert";
import loader from "../../assets/images/loader.gif";

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
    const reportWindow = window.open("about:blank", "_blank");
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
         <div className="text-center mt-5">
        <img src=${loader} width={100} />
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

const buildWeeklyReportHTML = (payload) => {
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
        <td>${a.title}</td>
        <td>${a.subject}</td>
        <td>${a.paper_title}</td>
        <td>${a.total_questions}</td>
        <td>${a.correct_answers}</td>
        <td>${a.percentage}%</td>
        <td>${a.grade}</td>
        <td>${(a.weaknesses || []).join(", ") || "-"}</td>
        <td>${a.gems_earned}</td>
        <td>${a.submitted_at}</td>
      </tr>`
    )
    .join("");

  const qbRows = Object.entries(questionBank)
    .map(
      ([subject, q]) => `
      <tr>
        <td>${subject}</td>
        <td>${q.attempted}</td>
        <td>${q.correct}</td>
        <td>${q.percentage}%</td>
      </tr>`
    )
    .join("");

  const gemRows = gemHist
    .map(
      (g) => `
      <tr>
        <td>${g.date}</td>
        <td>${g.source}</td>
        <td>${g.subject}</td>
        <td>${g.assignment || "-"}</td>
        <td>${g.gems}</td>
      </tr>`
    )
    .join("");

  const today = new Date().toLocaleString();

  return `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8"/>
    <title>Weekly Report - ${info.name}</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 20px; }
      h1,h2 { margin-bottom: 8px; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
      th, td { border: 1px solid #ccc; padding: 6px; text-align: left; font-size: 14px; }
      th { background: #f4f4f4; }
      .grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 8px; margin-bottom: 20px; }
      .box { border: 1px solid #ddd; padding: 10px; margin-bottom: 20px; border-radius: 4px; }
    </style>
  </head>
  <body>
    <h1>Weekly Learning Report</h1>
    <div class="grid">
      <div><strong>Student:</strong> ${info.name}</div>
      <div><strong>Period:</strong> ${info.week_period}</div>
      <div><strong>Level:</strong> ${info.level}</div>
      <div><strong>Total Gems:</strong> ${info.total_gems}</div>
    </div>

    <div class="box">
      <h2>Overview</h2>
      ${mdToHtml(reportText)}
    </div>

    <div class="box">
      <h2>Assignments</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th><th>Subject</th><th>Paper</th><th>Total Qs</th><th>Correct</th><th>Score</th><th>Grade</th><th>Weaknesses</th><th>Gems</th><th>Submitted</th>
          </tr>
        </thead>
        <tbody>${assignmentRows}</tbody>
      </table>
    </div>

    <div class="box">
      <h2>Question Bank</h2>
      <table>
        <thead>
          <tr><th>Subject</th><th>Attempted</th><th>Correct</th><th>Accuracy</th></tr>
        </thead>
        <tbody>${qbRows}</tbody>
      </table>
    </div>

    <div class="box">
      <h2>Gems</h2>
      <p>From Assignments: ${gems.assignment_gems}, From Question Bank: ${
    gems.question_bank_gems
  }, Total (week): ${gems.total_gems}</p>
      <table>
        <thead>
          <tr><th>Date</th><th>Source</th><th>Subject</th><th>Assignment</th><th>Gems</th></tr>
        </thead>
        <tbody>${gemRows}</tbody>
      </table>
    </div>

    <div class="box">
      <h2>Performance Summary</h2>
      <table>
        <tbody>
          <tr><td>Assignments Given</td><td>${perf.assignments_given}</td></tr>
          <tr><td>Assignments Completed</td><td>${
            perf.assignments_completed
          }</td></tr>
          <tr><td>Completion Rate</td><td>${perf.completion_rate}%</td></tr>
          <tr><td>Total Papers Completed</td><td>${
            perf.total_papers_completed
          }</td></tr>
        </tbody>
      </table>
    </div>

    <footer style="margin-top:30px;font-size:12px;color:#666;">
      Generated on ${today}
    </footer>
  </body>
  </html>
  `;
};
