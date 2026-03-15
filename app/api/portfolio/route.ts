import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/models/db";
import models from "@/models/schemas";

export async function GET() {
  try {
    await connectToDatabase();
    const about = await models.About.findOne({}).lean();
    const experiences = await models.Experience.find({}).sort({ start_date: -1 }).lean();
    const education = await models.Education.find({}).sort({ start_date: -1 }).lean();
    const skills = await models.Skill.find({}).lean();
    const projects = await models.Project.find({}).sort({ createdAt: -1 }).lean();
    const certifications = await models.Certification.find({}).sort({ issue_date: -1 }).lean();
    const blogs = await models.Blog.find({ is_published: true }).sort({ published_date: -1 }).lean();

    return NextResponse.json({
      about,
      experiences,
      education,
      skills,
      projects,
      certifications,
      blogs,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch portfolio" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { section, payload } = body as { section: string; payload: any };

    if (!section || !payload) {
      return NextResponse.json({ error: "Missing section or payload" }, { status: 400 });
    }

    const allowed = {
      about: models.About,
      experience: models.Experience,
      education: models.Education,
      skill: models.Skill,
      project: models.Project,
      certification: models.Certification,
      blog: models.Blog,
    } as Record<string, any>;

    const Model = allowed[section];
    if (!Model) {
      return NextResponse.json({ error: "Invalid section" }, { status: 400 });
    }

    const created = await Model.create(payload);
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create record" }, { status: 500 });
  }
}
