"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link href={`/work/${project.slug}`} className="group block">
        {/* Cover */}
        <div
          className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-4"
          style={{ background: project.coverImage ? undefined : `linear-gradient(to right, ${project.coverColor}, ${project.coverColor}77)` }}
        >
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          ) : (
            <>
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(0,0,0,0.4) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-5xl md:text-6xl font-extrabold text-white/15 tracking-tighter select-none">
                  {project.title.split("—")[0].trim().toUpperCase()}
                </span>
              </div>
            </>
          )}
          <div className="absolute inset-0 bg-[#080B0F]/0 group-hover:bg-[#080B0F]/80 transition-all duration-300 flex items-center justify-center">
            <span className="text-ink font-extrabold text-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
              View Project →
            </span>
          </div>
        </div>

        {/* Info row */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-bold text-ink text-base leading-snug group-hover:text-grad transition-colors truncate">
              {project.title}
            </h3>
            <p className="text-sm text-muted mt-0.5 line-clamp-2">{project.description}</p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className="text-xs font-extrabold bg-grad text-[#080B0F] px-2.5 py-1 rounded-full whitespace-nowrap">
              {project.category}
            </span>
            <span className="text-xs text-muted">{project.year}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
