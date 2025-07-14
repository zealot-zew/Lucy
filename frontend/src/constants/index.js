import { facebook, instagram, drawing, cat, maps, twitter } from "../assets/icons";

export const navLinks = [
    { href: "/", page: "lucychat/base", label: "Lucy Chat" },
    { href: "#co-drawing", page: "CoDrawing", label: "Co-Drawing" },
    { href: "#tiny-cats", page: "TinyCats", label: "Tiny Cats" },
    { href: "#map-planner", page: "MapExplorer", label: "Map Planner" },
];

export const features = [
    {
        imgURL: drawing,
        page: "CoDrawing",
        label: "Co-Drawing",
        subtext: "Sketch and Prompt, AI brings your drawing to life! Co create amazing art."
    },
    {
        imgURL: cat,
        page: "TinyCats",
        label: "Tiny Cats",
        subtext: "Condused? Let the Tiny cats explain! Get fun, illustrated slideshows breaking down complex topics with adorable feline metaphors. Cute, simple learning!"
    },
    {
        imgURL: maps,
        page: "MapExplorer",
        label: "Map Planner",
        subtext: "(coming soon)  Explore the world, one tap at a time! Discover amamzing places, plan your perfect day trips, and visualize your adventures on an interactive map."
    },
];


export const footerLinks = [
    {
        title: "Features",
        links: [
            { name: "Co-Drawing", link: "/" },
            { name: "Tiny Cats", link: "/" },
            { name: "Map Planner", link: "/" },
            { name: "SpatialAwareness", link: "/" },
        ],
    },
    {
        title: "Help",
        links: [
            { name: "About us", link: "/" },
            { name: "FAQs", link: "/" },
            { name: "How it works", link: "/" },
            { name: "Privacy policy", link: "/" },
            { name: "Payment policy", link: "/" },
        ],
    },
    {
        title: "Get in touch",
        links: [
            { name: "zealotsan@gmail.com", link: "mailto:zealotsan@gmail.com" },
            { name: "+92554862354", link: "tel:+92554862354" },
        ],
    },
];

export const socialMedia = [
    { src: facebook, alt: "facebook logo" },
    { src: twitter, alt: "twitter logo" },
    { src: instagram, alt: "instagram logo" },
];