import toptis from '../../asset/img/touristpanel.webp'

const blueFrogLogo = "https://www.google.com/s2/favicons?domain=bluefrogsoftware.com.au&sz=128";
const clearfrontLogo = "https://www.google.com/s2/favicons?domain=clearfront.studio&sz=128";

const exList = [
    {
        compony: "TopTours Custom CMS Platform",
        img: toptis,
        city: "Tehran, Iran",
        position: "Full-stack Developer",
        skil: ["react", "typescript", "c#", "blazor server"],
        date: "January 2018 - June 2022",
        describe: "Inspired by WordPress Elementor, researched and implemented a dynamic front-end builder interface using React, integrated with a Blazor Server admin panel. Contributed to both front-end and back-end development, focusing on seamless interaction between the user interface and server, enabling users to drag and drop components to design their websites easily.",
        link: "https://app.touristpanel.ir"
    },
    {
        compony: "Blue Frog Software",
        img: blueFrogLogo,
        city: "Remote — Australia",
        position: "Full-stack Developer",
        skil: ["node.js", "react", "typescript", "postgresql", "solid", "design-system"],
        date: "July 2022 - June 2023",
        describe: "Built and shipped high-impact full-stack web applications for a remote Australian software studio. Architected scalable APIs and frontend modules around SOLID principles, introduced a shared design system that improved UI consistency across products, and applied clean architecture patterns that made the codebase easier to extend under rapid delivery.",
        link: "https://bluefrogsoftware.com.au"
    },
    {
        compony: "Clearfront Studio",
        img: clearfrontLogo,
        city: "Remote — United States",
        position: "Frontend Team Lead",
        skil: ["react", "next.js", "typescript", "design-system", "solid", "architecture"],
        date: "July 2023 - Present",
        describe: "Led the remote frontend team for a US-based product studio, owning architecture decisions and delivery quality across multiple engagements. Designed and evolved production-grade design systems, enforced SOLID and reusable design patterns across React/Next.js codebases, and raised engineering standards so complex UI features shipped faster with stronger consistency and long-term maintainability.",
        link: "https://clearfront.studio"
    },
]

export default exList
