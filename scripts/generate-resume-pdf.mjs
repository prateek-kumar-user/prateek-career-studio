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

const marginX = 38;
const pageWidth = page.getWidth();
const contentWidth = pageWidth - marginX * 2;
let y = 810;

const textColor = rgb(0.09, 0.09, 0.11);
const mutedColor = rgb(0.33, 0.34, 0.37);
const sectionColor = rgb(0.14, 0.14, 0.16);

const toSafe = (value) => String(value)
  .replace(/↔/g, 'and')
  .replace(/[—–]/g, '-')
  .replace(/[“”]/g, '"')
  .replace(/[’]/g, "'");

function wrapText(text, font, size, maxWidth) {
  const words = toSafe(text).split(/\s+/).filter(Boolean);
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

function drawParagraph(text, {
  size = 10,
  font = regular,
  color = textColor,
  leading = 12.4,
  x = marginX,
  maxWidth = contentWidth
} = {}) {
  const lines = wrapText(text, font, size, maxWidth);
  for (const line of lines) {
    page.drawText(line, { x, y, size, font, color });
    y -= leading;
  }
  return lines.length;
}

function drawBullet(text, { size = 9.8, leading = 12, indent = 10 } = {}) {
  page.drawText('-', { x: marginX, y, size, font: regular, color: textColor });
  drawParagraph(text, { size, leading, x: marginX + indent, maxWidth: contentWidth - indent });
}

function section(title) {
  y -= 5;
  page.drawLine({
    start: { x: marginX, y: y + 2 },
    end: { x: marginX + contentWidth, y: y + 2 },
    thickness: 0.8,
    color: rgb(0.8, 0.81, 0.84)
  });
  y -= 14;
  drawParagraph(title.toUpperCase(), { size: 9.2, font: bold, color: sectionColor, leading: 11.4 });
  y -= 2;
}

function ymLabel(ym) {
  if (!ym || ym === 'Present') return 'Present';
  const [year, month] = ym.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[Number(month) - 1]} ${year}`;
}

function drawRoleLine(job) {
  const roleLine = `${job.role} | ${job.company}`;
  const dateLine = `${ymLabel(job.start)} to ${ymLabel(job.end)}`;

  page.drawText(toSafe(roleLine), { x: marginX, y, size: 10.2, font: bold, color: textColor });
  const dateWidth = bold.widthOfTextAtSize(toSafe(dateLine), 9.4);
  page.drawText(toSafe(dateLine), {
    x: marginX + contentWidth - dateWidth,
    y,
    size: 9.4,
    font: bold,
    color: mutedColor
  });
  y -= 12.4;

  drawParagraph(job.location, { size: 9.2, color: mutedColor, leading: 11.4 });
}

// Header
page.drawText(toSafe(data.candidate.name), { x: marginX, y, size: 22, font: bold, color: textColor });
y -= 23;

drawParagraph(`${data.candidate.title} | ${data.candidate.location}`, {
  size: 10.3,
  color: mutedColor,
  leading: 12.4
});

drawParagraph(`${data.candidate.contact.email} | ${data.candidate.contact.phone} | ${data.candidate.contact.linkedin}`, {
  size: 9.1,
  color: mutedColor,
  leading: 11.4
});

section('Professional Summary');
for (const line of data.summary.slice(0, 3)) {
  drawBullet(line, { size: 9.8, leading: 11.8 });
}

section('Technical Strengths');
drawParagraph(data.skills.join(' | '), { size: 9, leading: 11.5 });

section('Professional Experience');
for (const job of data.experience.slice(0, 2)) {
  drawRoleLine(job);
  for (const highlight of (job.highlights ?? []).slice(0, 3)) {
    drawBullet(highlight, { size: 9.5, leading: 11.4, indent: 10 });
  }
  y -= 2.4;
}

section('Representative Case Studies');
for (const project of data.selected_projects.slice(0, 3)) {
  drawParagraph(`${project.name} | ${project.focus}`, { size: 9.7, font: bold, leading: 11.8 });
  drawBullet(project.impact, { size: 9.3, leading: 11.3, indent: 10 });
}

section('Education and Certifications');
const edu = data.education?.[0];
if (edu) {
  drawParagraph(`${edu.degree}, ${edu.school} (${edu.start}-${edu.end})`, { size: 9.7, leading: 11.8 });
}
drawParagraph(`Certifications: ${(data.certifications ?? []).join(' | ')}`, { size: 9.1, color: mutedColor, leading: 11.4 });

y -= 1;
drawParagraph(`Languages: ${(data.languages ?? []).map((l) => `${l.name} (${l.level})`).join(' | ')}`, {
  size: 9.1,
  color: mutedColor,
  leading: 11.4
});

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, await pdf.save());
console.log(`Generated: ${outputPath}`);
