import fs from 'node:fs';
import path from 'node:path';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const root = path.resolve(process.cwd());
const inputPath = path.join(root, 'data-bank', 'master-resume-v1.json');
const outputDir = path.join(root, 'public', 'resume');
const outputPath = path.join(outputDir, 'prateek-kumar-master-resume-1page.pdf');

const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const pdf = await PDFDocument.create();
const page = pdf.addPage([595.28, 841.89]); // A4
const regular = await pdf.embedFont(StandardFonts.Helvetica);
const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

const marginX = 42;
let y = 805;
const width = page.getWidth() - marginX * 2;

const toWinAnsiSafe = (value) => String(value)
  .replace(/↔/g, '<->')
  .replace(/—/g, '-')
  .replace(/–/g, '-')
  .replace(/•/g, '-')
  .replace(/[“”]/g, '"')
  .replace(/[’]/g, "'");

const draw = (text, opts = {}) => {
  const {
    size = 10.5,
    font = regular,
    color = rgb(0.1, 0.1, 0.1),
    leading = 14,
    indent = 0,
  } = opts;

  const lines = wrapText(toWinAnsiSafe(text), font, size, width - indent);
  for (const line of lines) {
    page.drawText(line, { x: marginX + indent, y, size, font, color });
    y -= leading;
  }
};

const section = (title) => {
  y -= 6;
  page.drawLine({ start: { x: marginX, y: y + 2 }, end: { x: marginX + width, y: y + 2 }, thickness: 0.8, color: rgb(0.75, 0.75, 0.75) });
  y -= 16;
  draw(title.toUpperCase(), { size: 10, font: bold, leading: 13, color: rgb(0.12, 0.12, 0.12) });
  y -= 2;
};

function wrapText(text, font, size, maxWidth) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    const w = font.widthOfTextAtSize(candidate, size);
    if (w <= maxWidth) {
      line = candidate;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// Header
draw(data.candidate.name, { size: 24, font: bold, leading: 26 });
draw(`${data.candidate.title}  •  ${data.candidate.location}`, { size: 11, leading: 14, color: rgb(0.22, 0.22, 0.22) });
draw(`${data.candidate.contact.email}  •  ${data.candidate.contact.phone}  •  ${data.candidate.contact.linkedin}`, { size: 9.5, leading: 13, color: rgb(0.28, 0.28, 0.28) });

section('Summary');
for (const line of data.summary.slice(0, 3)) {
  draw(`• ${line}`, { size: 10.2, leading: 13 });
}

section('Core Skills');
draw(data.skills.join(' • '), { size: 9.7, leading: 13 });

section('Experience');
for (const job of data.experience.slice(0, 2)) {
  draw(`${job.role} — ${job.company} (${job.start} to ${job.end})`, { size: 11, font: bold, leading: 14 });
  draw(job.location, { size: 9.5, leading: 12, color: rgb(0.3, 0.3, 0.3) });
  for (const h of job.highlights.slice(0, 3)) {
    draw(`• ${h}`, { size: 9.8, leading: 12.5, indent: 4 });
  }
  y -= 4;
}

section('Selected Projects');
for (const p of data.selected_projects.slice(0, 3)) {
  draw(`${p.name}: ${p.focus}`, { size: 10.2, font: bold, leading: 12.5 });
  draw(`• ${p.impact}`, { size: 9.8, leading: 12.2, indent: 4 });
}

section('Education');
const edu = data.education[0];
draw(`${edu.degree} — ${edu.school} (${edu.start}-${edu.end})`, { size: 10.2, leading: 13 });

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, await pdf.save());
console.log(`Generated: ${outputPath}`);
