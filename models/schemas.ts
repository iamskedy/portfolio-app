import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  role: { type: String, default: "SuperAdmin" },
  last_login: { type: Date },
  refresh_token: { type: String },
}, { timestamps: true });

const AboutSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  headline: { type: String, required: true },
  bio: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  resume_url: { type: String },
  profile_image_url: { type: String },
  social_links: [{
    platform: { type: String },
    url: { type: String }
  }],
}, { timestamps: true });

const ExperienceSchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  job_title: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date },
  is_current: { type: Boolean, default: false },
  description: [{ type: String }],
  tech_stack: [{ type: String }],
}, { timestamps: true });

const EducationSchema = new mongoose.Schema({
  institution_name: { type: String, required: true },
  degree: { type: String, required: true },
  field_of_study: { type: String },
  start_date: { type: Date },
  end_date: { type: Date },
  score: { type: String },
}, { timestamps: true });

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  proficiency: { type: Number, min: 0, max: 100 },
  icon_url: { type: String },
}, { timestamps: true });

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  short_description: { type: String, required: true },
  full_description: { type: String },
  image_url: { type: String },
  live_url: { type: String },
  github_url: { type: String },
  tech_stack: [{ type: String }],
  is_featured: { type: Boolean, default: false },
}, { timestamps: true });

const CertificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  issue_date: { type: Date, required: true },
  expiration_date: { type: Date },
  credential_id: { type: String },
  credential_url: { type: String },
}, { timestamps: true });

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String },
  content: { type: String, required: true },
  cover_image_url: { type: String },
  published_date: { type: Date },
  is_published: { type: Boolean, default: false },
  tags: [{ type: String }],
}, { timestamps: true });

const models = {
  Admin: mongoose.models.Admin || mongoose.model("Admin", AdminSchema),
  About: mongoose.models.About || mongoose.model("About", AboutSchema),
  Experience: mongoose.models.Experience || mongoose.model("Experience", ExperienceSchema),
  Education: mongoose.models.Education || mongoose.model("Education", EducationSchema),
  Skill: mongoose.models.Skill || mongoose.model("Skill", SkillSchema),
  Project: mongoose.models.Project || mongoose.model("Project", ProjectSchema),
  Certification: mongoose.models.Certification || mongoose.model("Certification", CertificationSchema),
  Blog: mongoose.models.Blog || mongoose.model("Blog", BlogSchema),
};

export default models;
