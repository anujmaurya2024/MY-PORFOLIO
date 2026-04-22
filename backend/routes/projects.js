const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

const mockProjects = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured online store with payment integration.",
    techStack: ["React", "Node.js", "MongoDB", "Stripe"],
    githubLink: "#",
    liveDemoLink: "#",
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80"
  },
  {
    title: "Task Management App",
    description: "Collaborative tool for teams to manage projects efficiently.",
    techStack: ["React", "Firebase", "Tailwind CSS"],
    githubLink: "#",
    liveDemoLink: "#",
    imageUrl: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&q=80"
  },
  {
    title: "AI Portfolio Generator",
    description: "AI-powered tool that creates stunning portfolios automatically.",
    techStack: ["Next.js", "OpenAI API", "PostgreSQL"],
    githubLink: "#",
    liveDemoLink: "#",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80"
  }
];

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    
    if (projects.length === 0) {
      return res.json(mockProjects);
    }
    
    res.json(projects);
  } catch (err) {
    console.log('Database error, serving mock data...');
    res.json(mockProjects);
  }
});

module.exports = router;
