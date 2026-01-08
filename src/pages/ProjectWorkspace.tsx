import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  FolderOpen, 
  Plus, 
  Trash2, 
  Copy, 
  Share2,
  Clock,
  Palette,
  FileText,
  Image,
  Users,
  History,
  Star,
  MoreHorizontal
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface ColorNote {
  hex: string;
  usage: string;
}

interface PaletteVersion {
  id: string;
  colors: string[];
  timestamp: Date;
  note: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  colors: ColorNote[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  versions: PaletteVersion[];
  collaborators: string[];
  logo?: string;
}

export default function ProjectWorkspace() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [newProjectName, setNewProjectName] = useState("");
  const [newColor, setNewColor] = useState("#6366F1");
  const [colorUsage, setColorUsage] = useState("");

  // Load projects from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("color-projects");
    if (saved) {
      const parsed = JSON.parse(saved);
      setProjects(parsed.map((p: Project) => ({
        ...p,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt),
        versions: p.versions.map((v: PaletteVersion) => ({
          ...v,
          timestamp: new Date(v.timestamp)
        }))
      })));
    }
  }, []);

  // Save projects to localStorage
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem("color-projects", JSON.stringify(projects));
    }
  }, [projects]);

  const createProject = () => {
    if (!newProjectName.trim()) {
      toast.error("Please enter a project name");
      return;
    }

    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectName,
      description: "",
      colors: [],
      notes: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      versions: [],
      collaborators: []
    };

    setProjects([newProject, ...projects]);
    setActiveProject(newProject);
    setNewProjectName("");
    toast.success("Project created!");
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
    if (activeProject?.id === id) {
      setActiveProject(null);
    }
    toast.success("Project deleted");
  };

  const updateProject = (updates: Partial<Project>) => {
    if (!activeProject) return;
    
    const updated = {
      ...activeProject,
      ...updates,
      updatedAt: new Date()
    };
    
    setProjects(projects.map(p => p.id === activeProject.id ? updated : p));
    setActiveProject(updated);
  };

  const addColor = () => {
    if (!activeProject) return;
    
    const newColorNote: ColorNote = {
      hex: newColor,
      usage: colorUsage || "General use"
    };
    
    updateProject({
      colors: [...activeProject.colors, newColorNote]
    });
    
    setColorUsage("");
    toast.success("Color added to project");
  };

  const removeColor = (index: number) => {
    if (!activeProject) return;
    updateProject({
      colors: activeProject.colors.filter((_, i) => i !== index)
    });
  };

  const saveVersion = () => {
    if (!activeProject || activeProject.colors.length === 0) {
      toast.error("Add some colors first");
      return;
    }
    
    const version: PaletteVersion = {
      id: Date.now().toString(),
      colors: activeProject.colors.map(c => c.hex),
      timestamp: new Date(),
      note: `Version ${activeProject.versions.length + 1}`
    };
    
    updateProject({
      versions: [...activeProject.versions, version]
    });
    
    toast.success("Version saved!");
  };

  const restoreVersion = (version: PaletteVersion) => {
    if (!activeProject) return;
    
    updateProject({
      colors: version.colors.map(hex => ({ hex, usage: "" }))
    });
    
    toast.success("Version restored");
  };

  const shareProject = () => {
    if (!activeProject) return;
    
    const shareData = {
      name: activeProject.name,
      colors: activeProject.colors.map(c => c.hex)
    };
    
    const shareUrl = `${window.location.origin}/shared?data=${btoa(JSON.stringify(shareData))}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Share link copied!");
  };

  const copyAllColors = () => {
    if (!activeProject) return;
    navigator.clipboard.writeText(activeProject.colors.map(c => c.hex).join(", "));
    toast.success("All colors copied!");
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <FolderOpen className="w-4 h-4" />
            <span className="text-sm font-medium">Project Management</span>
          </div>
          <h1 className="text-4xl font-bold">Project Workspace</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Organize your color palettes by projects. Add notes, track versions, 
            and collaborate with your team.
          </p>
        </div>

        {!user && (
          <Card className="bg-amber-500/10 border-amber-500/20">
            <CardContent className="p-4 flex items-center gap-4">
              <Users className="w-8 h-8 text-amber-500" />
              <div>
                <p className="font-medium">Sign in to save your projects</p>
                <p className="text-sm text-muted-foreground">
                  Projects are saved locally. Sign in to sync across devices.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Project List */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="New project name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && createProject()}
              />
              <Button onClick={createProject} size="icon">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              {projects.length === 0 ? (
                <Card className="p-8 text-center">
                  <FolderOpen className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">No projects yet</p>
                  <p className="text-sm text-muted-foreground">
                    Create a project to organize your palettes
                  </p>
                </Card>
              ) : (
                projects.map((project) => (
                  <Card
                    key={project.id}
                    className={`cursor-pointer transition-all hover:border-primary ${
                      activeProject?.id === project.id ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setActiveProject(project)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{project.name}</h3>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            {project.updatedAt.toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge variant="secondary">{project.colors.length}</Badge>
                        </div>
                      </div>
                      {project.colors.length > 0 && (
                        <div className="flex gap-1 mt-3">
                          {project.colors.slice(0, 5).map((c, i) => (
                            <div
                              key={i}
                              className="w-6 h-6 rounded-full border"
                              style={{ backgroundColor: c.hex }}
                            />
                          ))}
                          {project.colors.length > 5 && (
                            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
                              +{project.colors.length - 5}
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Project Details */}
          <div className="lg:col-span-3">
            {activeProject ? (
              <Tabs defaultValue="colors" className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">{activeProject.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      Created {activeProject.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={shareProject}>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => deleteProject(activeProject.id)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>

                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="colors" className="gap-2">
                    <Palette className="w-4 h-4" />
                    Colors
                  </TabsTrigger>
                  <TabsTrigger value="notes" className="gap-2">
                    <FileText className="w-4 h-4" />
                    Notes
                  </TabsTrigger>
                  <TabsTrigger value="assets" className="gap-2">
                    <Image className="w-4 h-4" />
                    Assets
                  </TabsTrigger>
                  <TabsTrigger value="history" className="gap-2">
                    <History className="w-4 h-4" />
                    History
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="colors" className="space-y-4">
                  {/* Add Color */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Add Color</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex gap-2 items-center">
                          <Input
                            type="color"
                            value={newColor}
                            onChange={(e) => setNewColor(e.target.value)}
                            className="w-12 h-10 p-1 cursor-pointer"
                          />
                          <Input
                            value={newColor}
                            onChange={(e) => setNewColor(e.target.value)}
                            className="w-28"
                          />
                        </div>
                        <Input
                          placeholder="Usage note (e.g., CTA buttons only)"
                          value={colorUsage}
                          onChange={(e) => setColorUsage(e.target.value)}
                          className="flex-1"
                        />
                        <Button onClick={addColor}>
                          <Plus className="w-4 h-4 mr-2" />
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Color Palette */}
                  {activeProject.colors.length > 0 && (
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Project Palette</CardTitle>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={copyAllColors}>
                              <Copy className="w-4 h-4 mr-2" />
                              Copy All
                            </Button>
                            <Button variant="outline" size="sm" onClick={saveVersion}>
                              <Star className="w-4 h-4 mr-2" />
                              Save Version
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {/* Color Strip */}
                        <div className="flex h-16 rounded-lg overflow-hidden mb-4">
                          {activeProject.colors.map((color, i) => (
                            <div
                              key={i}
                              className="flex-1 cursor-pointer hover:scale-105 transition-transform"
                              style={{ backgroundColor: color.hex }}
                              onClick={() => {
                                navigator.clipboard.writeText(color.hex);
                                toast.success(`Copied ${color.hex}`);
                              }}
                            />
                          ))}
                        </div>

                        {/* Color Details */}
                        <div className="grid gap-2">
                          {activeProject.colors.map((color, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-10 h-10 rounded-lg border-2"
                                  style={{ backgroundColor: color.hex }}
                                />
                                <div>
                                  <code className="font-mono">{color.hex}</code>
                                  <p className="text-sm text-muted-foreground">{color.usage}</p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeColor(i)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="notes">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Project Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="Add notes about this project, client requirements, design decisions..."
                        value={activeProject.notes}
                        onChange={(e) => updateProject({ notes: e.target.value })}
                        className="min-h-[300px]"
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="assets">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Brand Assets</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed rounded-lg p-12 text-center">
                        <Image className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                        <p className="text-muted-foreground">
                          Drag & drop logos or brand assets here
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Coming soon: Upload brand logos for reference
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Version History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {activeProject.versions.length === 0 ? (
                        <div className="text-center py-8">
                          <History className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                          <p className="text-muted-foreground">No versions saved yet</p>
                          <p className="text-sm text-muted-foreground">
                            Save a version to track changes over time
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {activeProject.versions.map((version) => (
                            <div
                              key={version.id}
                              className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                            >
                              <div className="flex items-center gap-4">
                                <div className="flex -space-x-1">
                                  {version.colors.slice(0, 5).map((hex, i) => (
                                    <div
                                      key={i}
                                      className="w-8 h-8 rounded-full border-2 border-background"
                                      style={{ backgroundColor: hex }}
                                    />
                                  ))}
                                </div>
                                <div>
                                  <p className="font-medium">{version.note}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {version.timestamp.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => restoreVersion(version)}
                              >
                                Restore
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <Card className="p-12 text-center">
                <FolderOpen className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Select a Project</h3>
                <p className="text-muted-foreground">
                  Choose a project from the list or create a new one to get started
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
