
// TO CONVERT IMAGE TO WEBP ->
//      cwebp cover.jpg -o cover.webp && rm cover.jpg


const projects = [
 {
    title: "Spring Carnival 2025",
    include: true, // false by default
    comingSoon: true, // true by default
    byline: "Executive Committee - Booth Director",
    folder: "SpringCarnival",
    cover: "cover.webp",
    // images: ["01.TODO", "02.TODO", "03.TODO"],
    modalHTML: `
        TODO`
  },

  {
    title: "Into the Woods",
    include: true, // false by default
    comingSoon: true, // true by default
    byline: "Production Manager",
    folder: "IntoTheWoods",
    cover: "cover.webp",
    // images: ["01.TODO", "02.TODO", "03.TODO"],
    modalHTML: `
        TODO`
  },

    {
    title: "Lunar Gala: Liminal",
    include: true, // false by default
    comingSoon: true, // true by default
    byline: "Head of Stage Design and Carpentry",
    folder: "Liminal",
    cover: "cover.webp",
    // images: ["01.TODO", "02.TODO", "03.TODO"],
    modalHTML: `
        TODO`
  },

  {
    title: "Dreamscape Nature",
    include: true, // false by default
    comingSoon: true, // true by default
    byline: "Co-Designer and Fabricator",
    folder: "Inflatable",
    cover: "cover.webp",
    // images: ["01.TODO", "02.TODO", "03.TODO"],
    modalHTML: `
        TODO`
  },

  {
    title: "Horse Girls",
    include: true, // false by default
    comingSoon: true, // true by default
    byline: "Technical Director",
    folder: "HorseGirls",
    cover: "cover.webp",
    // images: ["01.TODO", "02.TODO", "03.TODO"],
    modalHTML: `
        TODO`
  },





// TEMPLATE CARD - NOT INCLUDED -----------------------------------------------
{
    title: "@TODO-Title",
    include: false, // false by default
    comingSoon: false, // true by default
    byline: "@TODO-Byline",
    folder: "@TODO-Title_NoSpaces",
    cover: "cover.TODO",
    images: ["01.TODO", "02.TODO", "03.TODO"],
    modalHTML: `
        <strong>This takes html!</strong><br>
        <em>24-672: DIY Design and Fabrication</em> - Problem Set #2<br>
        February 2025<br>
        Carnegie Mellon University`
  },



// EXAMPLE CARDS - NOT INCLUDED -----------------------------------------------
  {
    title: "StretchShade",
    include: false,
    comingSoon: true,
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
    title: "Horse Girls",
    include: false,
    comingSoon: false,
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
