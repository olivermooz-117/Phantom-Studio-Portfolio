import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProjectGrid from "./components/ProjectGrid";
import AddProjectModal from "./components/AddProjectModal";
import Footer from "./components/Footer";
import { initialProjects } from "./data/projects";
import "./styles/global.css";

export default function App() {
  const [projects, setProjects] = useState(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ["All", ...new Set(initialProjects.map((p) => p.category))];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = activeFilter === "All" || project.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleAddProject = (newProject) => {
    setProjects((prev) => [
      { ...newProject, id: Date.now(), featured: false },
      ...prev,
    ]);
    setIsModalOpen(false);
  };

  return (
    <div className="app">
      <Navbar onAddProject={() => setIsModalOpen(true)} />
      <Hero />
      <main className="main-content">
        <ProjectGrid
          projects={filteredProjects}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          categories={categories}
          totalCount={projects.length}
        />
      </main>
      <Footer />
      {isModalOpen && (
        <AddProjectModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddProject}
          categories={categories.filter((c) => c !== "All")}
        />
      )}
    </div>
  );
}
