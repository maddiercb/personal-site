// projects.js
const projects = [
  {
    include: true,
    comingSoon: true,
    abbrev: "SS",
    title: "StretchShade",
    byline: "Design and Fabrication Project",
    folder: "StretchShade",
    cover: "cover.webp",
    images: ["01.webp", "02.webp", "03.webp"],
    modalHTML: `
        <strong>Product Designer & Fabricator</strong><br>
        <span style="color:red">Final documentation coming soon!</span><br><br>
        <em>24-672: DIY Design and Fabrication</em> - Problem Set #2<br>
        February 2025<br>
        Carnegie Mellon University
    `
  },

  {
    include: true,
    comingSoon: false,
    abbrev: "HG",
    title: "Horse Girls",
    byline: "Technical Director",
    folder: "HorseGirls",
    cover: "cover.webp",
    images: ["01.webp", "02.webp", "03.webp"],
    modalHTML: `
        <strong>Technical Director</strong><br><br>
        <em>Horse Girls</em> by Jenny Rachel Weiner<br>
        December 6 & 7, 2024<br>
        Scotch'n'Soda Theatre Company
    `
  },

  // Add more projects here...
];
