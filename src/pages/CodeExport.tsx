import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Copy, 
  Check, 
  Code2, 
  Download,
  Plus,
  Trash2,
  FileCode,
  Palette
} from "lucide-react";
import { toast } from "sonner";

const defaultColors = [
  { name: "primary", hex: "#A05AFF" },
  { name: "secondary", hex: "#1BCFB4" },
  { name: "accent", hex: "#4BCBEB" },
  { name: "background", hex: "#FAFAFA" },
  { name: "foreground", hex: "#1a1a2e" },
];

export default function CodeExport() {
  const [colors, setColors] = useState(defaultColors);
  const [copiedTab, setCopiedTab] = useState<string | null>(null);
  const [projectName, setProjectName] = useState("my-project");

  const addColor = () => {
    setColors([...colors, { name: `color-${colors.length + 1}`, hex: "#000000" }]);
  };

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const updateColor = (index: number, field: "name" | "hex", value: string) => {
    const newColors = [...colors];
    newColors[index][field] = value;
    setColors(newColors);
  };

  const copyToClipboard = (text: string, tab: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tab);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedTab(null), 2000);
  };

  // Generate different code formats
  const generateCSS = () => {
    return `:root {
${colors.map(c => `  --${c.name}: ${c.hex};`).join('\n')}
}

/* Usage: var(--primary) */`;
  };

  const generateSCSS = () => {
    return `// Color Variables
${colors.map(c => `$${c.name}: ${c.hex};`).join('\n')}

// Color Map
$colors: (
${colors.map(c => `  "${c.name}": $${c.name},`).join('\n')}
);

// Usage: $primary or map-get($colors, "primary")`;
  };

  const generateTailwind = () => {
    return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
${colors.map(c => `        '${c.name}': '${c.hex}',`).join('\n')}
      },
    },
  },
}

// Usage: bg-primary, text-secondary, border-accent`;
  };

  const generateJSON = () => {
    const colorObj: Record<string, string> = {};
    colors.forEach(c => colorObj[c.name] = c.hex);
    return JSON.stringify(colorObj, null, 2);
  };

  const generateReactNative = () => {
    return `// colors.ts
export const Colors = {
${colors.map(c => `  ${c.name}: '${c.hex}',`).join('\n')}
} as const;

export type ColorName = keyof typeof Colors;

// Usage: Colors.primary`;
  };

  const generateFlutter = () => {
    return `// colors.dart
import 'package:flutter/material.dart';

class AppColors {
${colors.map(c => `  static const Color ${c.name} = Color(0xFF${c.hex.slice(1).toUpperCase()});`).join('\n')}
}

// Usage: AppColors.primary`;
  };

  const generateSwiftUI = () => {
    return `// Colors.swift
import SwiftUI

extension Color {
${colors.map(c => `    static let ${c.name} = Color(hex: "${c.hex}")`).join('\n')}
}

// Usage: Color.primary`;
  };

  const generateVSCodeSnippet = () => {
    return `{
  "Color Palette": {
    "prefix": "colors",
    "body": [
${colors.map(c => `      "--${c.name}: ${c.hex};",`).join('\n')}
    ],
    "description": "Insert color palette"
  }
}`;
  };

  const codeFormats = [
    { id: "css", label: "CSS Variables", generate: generateCSS, icon: FileCode },
    { id: "scss", label: "SCSS/SASS", generate: generateSCSS, icon: FileCode },
    { id: "tailwind", label: "Tailwind CSS", generate: generateTailwind, icon: Code2 },
    { id: "json", label: "JSON", generate: generateJSON, icon: FileCode },
    { id: "react-native", label: "React Native", generate: generateReactNative, icon: Code2 },
    { id: "flutter", label: "Flutter/Dart", generate: generateFlutter, icon: Code2 },
    { id: "swiftui", label: "SwiftUI", generate: generateSwiftUI, icon: Code2 },
    { id: "vscode", label: "VS Code Snippet", generate: generateVSCodeSnippet, icon: Code2 },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Code Export
          </h1>
          <p className="text-muted-foreground mt-1">
            Export your color palette to any framework or language
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Color Palette Editor */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Your Palette
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {colors.map((color, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-lg border border-border"
                    style={{ backgroundColor: color.hex }}
                  />
                  <Input
                    value={color.name}
                    onChange={(e) => updateColor(index, "name", e.target.value)}
                    placeholder="Name"
                    className="flex-1 text-sm"
                  />
                  <Input
                    value={color.hex}
                    onChange={(e) => updateColor(index, "hex", e.target.value)}
                    className="w-24 font-mono text-sm"
                  />
                  <input
                    type="color"
                    value={color.hex}
                    onChange={(e) => updateColor(index, "hex", e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                  {colors.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeColor(index)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button onClick={addColor} variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Color
              </Button>
            </CardContent>
          </Card>

          {/* Code Export */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-secondary" />
                Export Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="css">
                <TabsList className="flex-wrap h-auto gap-1 mb-4">
                  {codeFormats.map((format) => (
                    <TabsTrigger key={format.id} value={format.id} className="text-xs">
                      {format.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {codeFormats.map((format) => (
                  <TabsContent key={format.id} value={format.id}>
                    <div className="relative">
                      <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-sm font-mono text-foreground">
                        {format.generate()}
                      </pre>
                      <Button
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(format.generate(), format.id)}
                      >
                        {copiedTab === format.id ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Download Options */}
        <Card>
          <CardHeader>
            <CardTitle>Download Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {codeFormats.slice(0, 5).map((format) => (
                <Button
                  key={format.id}
                  variant="outline"
                  onClick={() => {
                    const blob = new Blob([format.generate()], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${projectName}-colors.${format.id === "json" ? "json" : format.id === "flutter" ? "dart" : format.id === "swiftui" ? "swift" : format.id === "react-native" ? "ts" : "css"}`;
                    a.click();
                    toast.success(`Downloaded ${format.label} file`);
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {format.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="bg-muted/30">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-3">Integration Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">CSS Variables</p>
                <p>Use in any CSS file with <code className="bg-muted px-1 rounded">var(--primary)</code></p>
              </div>
              <div>
                <p className="font-medium text-foreground">Tailwind</p>
                <p>Add to your config and use classes like <code className="bg-muted px-1 rounded">bg-primary</code></p>
              </div>
              <div>
                <p className="font-medium text-foreground">VS Code</p>
                <p>Add snippet to User Snippets for quick insertion</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
