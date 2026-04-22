import { ImageResponse } from "next/og";
import { PROJECTS } from "@/data/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#080B0F",
            color: "#F0F4F8",
            fontSize: 48,
            fontWeight: 800,
          }}
        >
          Ben LaClair
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "60px",
          backgroundColor: "#080B0F",
          backgroundImage: `linear-gradient(135deg, ${project.coverColor}22 0%, transparent 60%)`,
        }}
      >
        {/* Category badge */}
        <div
          style={{
            display: "flex",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: project.coverColor,
            }}
          >
            {project.category}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#F0F4F8",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          {project.title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 24,
            color: "#A8B5C4",
            lineHeight: 1.4,
            maxWidth: "80%",
            marginBottom: "32px",
          }}
        >
          {project.description}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 800, color: "#F0F4F8" }}>
            ben
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              background: `linear-gradient(to right, #00DFFF, #0090C8)`,
              backgroundClip: "text",
              color: "#00DFFF",
            }}
          >
            .
          </div>
          <div style={{ fontSize: 16, color: "#A8B5C4", marginLeft: "8px" }}>
            benlaclair.com
          </div>
        </div>

        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: `linear-gradient(to right, ${project.coverColor}, ${project.coverColor}77)`,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
