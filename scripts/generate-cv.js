const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const OUTPUT = path.join(__dirname, '../src/asset/pdf/Mahdi-Esmaeelnezhad-CV.pdf');
const PHOTO = path.join(__dirname, '../src/asset/img/personalImg.jpeg');
const FONT_REG = path.join(__dirname, '../src/asset/font/Roboto-Regular.ttf');
const FONT_MED = path.join(__dirname, '../src/asset/font/Roboto-Medium.ttf');
const FONT_BOLD = path.join(__dirname, '../src/asset/font/Roboto-Bold.ttf');

const ACCENT = '#10b981';
const DARK = '#0f172a';
const MUTED = '#64748b';
const LINE = '#e2e8f0';
const SIDEBAR_BG = '#0f172a';
const WHITE = '#ffffff';

const contact = {
  email: 'mahdiesmaeelnezhad7@gmail.com',
  phone: '+98 912 638 1582',
  location: 'Tehran, Iran',
  website: 'https://mahdiesmaeelnezhad-tpn2.vercel.app/',
  github: 'https://github.com/mahdi-esmaeelnezhad',
  linkedin: 'https://www.linkedin.com/in/mahdi-esmailnezhad',
};

const skills = {
  Frontend: ['React', 'Vue.js', 'Nuxt', 'Angular', 'Next.js', 'React Native', 'Flutter'],
  Backend: ['Node.js', 'Python', 'Go', 'C#', 'Blazor'],
  Languages: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'SQL'],
  'Data & APIs': ['PostgreSQL', 'MongoDB', 'REST APIs', 'WebSocket'],
  Tools: ['Redux', 'Material UI', 'Tailwind CSS', 'Git', 'npm', 'Docker'],
};

const experience = [
  {
    company: 'Clearfront Studio',
    role: 'Frontend Team Lead',
    place: 'Remote — United States',
    date: 'Jul 2023 – Present',
    bullets: [
      'Led remote frontend delivery across multiple product lines with clear architecture ownership.',
      'Built and evolved a production-grade design system for consistent, scalable UI.',
      'Enforced SOLID principles and reusable design patterns across React/Next.js codebases.',
    ],
  },
  {
    company: 'Blue Frog Software',
    role: 'Full-stack Developer',
    place: 'Remote — Australia',
    date: 'Jul 2022 – Jun 2023',
    bullets: [
      'Delivered full-stack web apps with React, Node.js, TypeScript, and PostgreSQL.',
      'Introduced a shared design system and clean module boundaries for faster iteration.',
      'Applied SOLID and maintainable architecture under rapid product delivery.',
    ],
  },
  {
    company: 'TopTours Custom CMS Platform',
    role: 'Full-stack Developer',
    place: 'Tehran, Iran',
    date: 'Jan 2018 – Jun 2022',
    bullets: [
      'Built a drag-and-drop CMS inspired by WordPress Elementor with React frontend.',
      'Integrated with Blazor Server admin panel for seamless full-stack workflows.',
      'Focused on usability, component reuse, and reliable UI–server interaction.',
    ],
  },
];

const projects = [
  {
    name: 'Orbit Task Platform',
    desc: 'Team project/task backend with Node.js, JWT, Redis, Swagger, Docker Compose.',
    url: 'https://github.com/mahdi-esmaeelnezhad/orbit-task-platform',
  },
  {
    name: 'Angular Smart Table Pro',
    desc: 'Angular data table with virtual scroll, server-side data, drag-and-drop, Excel export.',
    url: 'https://github.com/mahdi-esmaeelnezhad/ngx-smart-table-pro',
  },
  {
    name: 'ConfigKit',
    desc: 'Type-safe Go config library for JSON/YAML/TOML/ENV with hot reload and validation.',
    url: 'https://github.com/mahdi-esmaeelnezhad/configkit',
  },
  {
    name: 'Job Crawler Suite',
    desc: 'Python toolkit crawling Iranian job platforms and exporting results to Excel.',
    url: 'https://github.com/mahdi-esmaeelnezhad/crawl-p',
  },
];

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function drawSidebar(doc, pageHeight) {
  doc.save();
  doc.rect(0, 0, 200, pageHeight).fill(SIDEBAR_BG);
  doc.restore();
}

function sectionTitle(doc, text, x, y) {
  doc.font(FONT_BOLD).fontSize(11).fillColor(DARK).text(text.toUpperCase(), x, y, { characterSpacing: 0.8 });
  const w = doc.widthOfString(text.toUpperCase());
  doc.moveTo(x, y + 16).lineTo(x + Math.min(w, 120), y + 16).lineWidth(2).strokeColor(ACCENT).stroke();
  return y + 28;
}

function addLink(doc, text, url, x, y, options = {}) {
  doc.font(options.font || FONT_REG).fontSize(options.size || 8).fillColor(options.color || ACCENT);
  doc.text(text, x, y, {
    link: url,
    underline: true,
    width: options.width,
    continued: false,
  });
}

function generate() {
  ensureDir(OUTPUT);
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    info: {
      Title: 'Mahdi Esmaeelnezhad — CV',
      Author: 'Mahdi Esmaeelnezhad',
      Subject: 'Resume / Curriculum Vitae',
    },
  });

  const stream = fs.createWriteStream(OUTPUT);
  doc.pipe(stream);

  const pageW = doc.page.width;
  const pageH = doc.page.height;
  const sidebarW = 195;
  const contentX = sidebarW + 28;
  const contentW = pageW - contentX - 28;

  drawSidebar(doc, pageH);

  // Photo
  const photoSize = 110;
  const photoX = (sidebarW - photoSize) / 2;
  const photoY = 36;
  if (fs.existsSync(PHOTO)) {
    doc.save();
    doc.circle(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2).clip();
    doc.image(PHOTO, photoX, photoY, { width: photoSize, height: photoSize, cover: [photoSize, photoSize], align: 'center', valign: 'center' });
    doc.restore();
    doc.circle(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2).lineWidth(3).strokeColor(ACCENT).stroke();
  }

  let sy = photoY + photoSize + 28;
  doc.font(FONT_BOLD).fontSize(16).fillColor(WHITE).text('Mahdi\nEsmaeelnezhad', 20, sy, { width: sidebarW - 40, align: 'center', lineGap: 2 });
  sy = doc.y + 8;
  doc.font(FONT_MED).fontSize(9).fillColor(ACCENT).text('Full-stack Developer', 20, sy, { width: sidebarW - 40, align: 'center' });
  sy = doc.y + 18;

  // Contact
  doc.font(FONT_BOLD).fontSize(9).fillColor(WHITE).text('CONTACT', 22, sy, { characterSpacing: 1 });
  doc.moveTo(22, sy + 14).lineTo(80, sy + 14).lineWidth(1.5).strokeColor(ACCENT).stroke();
  sy += 22;

  const contactLines = [
    { label: 'Email', value: contact.email, url: `mailto:${contact.email}` },
    { label: 'Phone', value: contact.phone, url: `tel:${contact.phone.replace(/\s/g, '')}` },
    { label: 'Location', value: contact.location },
    { label: 'Website', value: 'Portfolio Site', url: contact.website },
    { label: 'GitHub', value: 'mahdi-esmaeelnezhad', url: contact.github },
    { label: 'LinkedIn', value: 'mahdi-esmailnezhad', url: contact.linkedin },
  ];

  contactLines.forEach((item) => {
    doc.font(FONT_MED).fontSize(7.5).fillColor(ACCENT).text(item.label.toUpperCase(), 22, sy);
    sy = doc.y + 2;
    if (item.url) {
      doc.font(FONT_REG).fontSize(8).fillColor(WHITE).text(item.value, 22, sy, {
        width: sidebarW - 44,
        link: item.url,
        underline: false,
      });
    } else {
      doc.font(FONT_REG).fontSize(8).fillColor(WHITE).text(item.value, 22, sy, { width: sidebarW - 44 });
    }
    sy = doc.y + 10;
  });

  sy += 6;
  doc.font(FONT_BOLD).fontSize(9).fillColor(WHITE).text('SKILLS', 22, sy, { characterSpacing: 1 });
  doc.moveTo(22, sy + 14).lineTo(70, sy + 14).lineWidth(1.5).strokeColor(ACCENT).stroke();
  sy += 22;

  Object.entries(skills).forEach(([group, items]) => {
    doc.font(FONT_MED).fontSize(8).fillColor(ACCENT).text(group, 22, sy);
    sy = doc.y + 3;
    doc.font(FONT_REG).fontSize(7.5).fillColor('#cbd5e1').text(items.join(' · '), 22, sy, {
      width: sidebarW - 44,
      lineGap: 1.5,
    });
    sy = doc.y + 10;
  });

  sy += 4;
  doc.font(FONT_BOLD).fontSize(9).fillColor(WHITE).text('EDUCATION', 22, sy, { characterSpacing: 1 });
  doc.moveTo(22, sy + 14).lineTo(95, sy + 14).lineWidth(1.5).strokeColor(ACCENT).stroke();
  sy += 22;
  doc.font(FONT_MED).fontSize(8.5).fillColor(WHITE).text('Software Engineering', 22, sy, { width: sidebarW - 44 });
  sy = doc.y + 2;
  doc.font(FONT_REG).fontSize(7.5).fillColor('#cbd5e1').text('University of Tehran', 22, sy, { width: sidebarW - 44 });

  // Main content
  let y = 40;
  doc.font(FONT_BOLD).fontSize(22).fillColor(DARK).text('Curriculum Vitae', contentX, y);
  y = doc.y + 4;
  doc.font(FONT_REG).fontSize(9).fillColor(MUTED).text('Full-stack Developer · React · Node.js · Python · Go', contentX, y);
  y = doc.y + 14;
  doc.moveTo(contentX, y).lineTo(pageW - 28, y).lineWidth(1).strokeColor(LINE).stroke();
  y += 16;

  // Summary
  y = sectionTitle(doc, 'Profile', contentX, y);
  doc.font(FONT_REG).fontSize(9).fillColor(MUTED).text(
    'Full-stack developer with 8+ years of experience building performant web and mobile applications. Skilled across React, Next.js, Vue, Node.js, Python, and Go. Strong focus on design systems, SOLID principles, and clean architecture.',
    contentX,
    y,
    { width: contentW, align: 'justify', lineGap: 2 }
  );
  y = doc.y + 16;

  // Experience
  y = sectionTitle(doc, 'Experience', contentX, y);
  experience.forEach((job) => {
    if (y > pageH - 120) {
      doc.addPage();
      drawSidebar(doc, pageH);
      y = 40;
    }
    doc.font(FONT_BOLD).fontSize(10).fillColor(DARK).text(job.role, contentX, y, { width: contentW * 0.62 });
    doc.font(FONT_MED).fontSize(8).fillColor(ACCENT).text(job.date, contentX + contentW * 0.62, y, {
      width: contentW * 0.38,
      align: 'right',
    });
    y = Math.max(doc.y, y + 12) + 2;
    doc.font(FONT_MED).fontSize(9).fillColor(DARK).text(job.company, contentX, y);
    y = doc.y + 1;
    doc.font(FONT_REG).fontSize(7.5).fillColor(MUTED).text(job.place, contentX, y);
    y = doc.y + 6;
    job.bullets.forEach((b) => {
      doc.font(FONT_REG).fontSize(8).fillColor(MUTED).text(`•  ${b}`, contentX, y, {
        width: contentW,
        lineGap: 1.5,
      });
      y = doc.y + 4;
    });
    y += 8;
  });

  // Projects
  if (y > pageH - 160) {
    doc.addPage();
    drawSidebar(doc, pageH);
    y = 40;
  }
  y = sectionTitle(doc, 'Projects', contentX, y);
  projects.forEach((p) => {
    if (y > pageH - 70) {
      doc.addPage();
      drawSidebar(doc, pageH);
      y = 40;
    }
    doc.font(FONT_BOLD).fontSize(9.5).fillColor(DARK).text(p.name, contentX, y);
    y = doc.y + 2;
    doc.font(FONT_REG).fontSize(8).fillColor(MUTED).text(p.desc, contentX, y, { width: contentW, lineGap: 1.5 });
    y = doc.y + 2;
    addLink(doc, p.url, p.url, contentX, y, { width: contentW, size: 7.5 });
    y = doc.y + 10;
  });

  // Website footer line
  if (y > pageH - 40) {
    doc.addPage();
    drawSidebar(doc, pageH);
    y = 40;
  }
  y += 4;
  doc.moveTo(contentX, y).lineTo(pageW - 28, y).lineWidth(1).strokeColor(LINE).stroke();
  y += 10;
  doc.font(FONT_REG).fontSize(8).fillColor(MUTED).text('Portfolio: ', contentX, y, { continued: true });
  doc.fillColor(ACCENT).text(contact.website, { link: contact.website, underline: true });

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on('finish', () => resolve(OUTPUT));
    stream.on('error', reject);
  });
}

generate()
  .then((file) => {
    console.log('CV generated:', file);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
