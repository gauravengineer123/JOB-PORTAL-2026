from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor

def create_presentation():
    prs = Presentation()

    def add_title_slide(title_text, subtitle_text):
        slide_layout = prs.slide_layouts[0]
        slide = prs.slides.add_slide(slide_layout)
        title = slide.shapes.title
        subtitle = slide.placeholders[1]
        title.text = title_text
        subtitle.text = subtitle_text
        
        # Styling
        title.text_frame.paragraphs[0].font.bold = True
        title.text_frame.paragraphs[0].font.size = Pt(44)
        title.text_frame.paragraphs[0].font.color.rgb = RGBColor(31, 73, 125)

    def add_content_slide(title_text, bullet_points):
        slide_layout = prs.slide_layouts[1]
        slide = prs.slides.add_slide(slide_layout)
        title = slide.shapes.title
        title.text = title_text
        
        # Styling title
        title.text_frame.paragraphs[0].font.bold = True
        title.text_frame.paragraphs[0].font.color.rgb = RGBColor(31, 73, 125)
        
        tf = slide.placeholders[1].text_frame
        tf.text = bullet_points[0] if bullet_points else ""
        
        for point in bullet_points[1:]:
            p = tf.add_paragraph()
            p.text = point
            p.level = 0

    # Slide 1: Title
    add_title_slide(
        "Job Portal + Startup Ideas Platform",
        "A Modern Full-Stack Solution for Employment and Innovation\nBuilt with Django & React"
    )

    # Slide 2: Tech Stack
    add_content_slide(
        "Technology Stack",
        [
            "Backend: Django, Django REST Framework (DRF)",
            "Database: SQLite (Development)",
            "Frontend: React.js, Tailwind CSS, Vite",
            "Security: JWT Authentication, Role-Based Access Control (RBAC)",
            "Media: Secure uploads for Resumes and Profile Pictures"
        ]
    )

    # Slide 3: Core Functionality
    add_content_slide(
        "Core Functionality - User Roles",
        [
            "Job Seeker: Search jobs, apply, and manage profile.",
            "Recruiter: Post jobs, manage applications, and track candidates.",
            "Admin: System moderation and user management.",
            "Universal: Real-time dashboards and secure authentication."
        ]
    )

    # Slide 4: Startup Ideas Platform (EXTRA)
    add_content_slide(
        "Innovative Extra: Startup Ideas Platform",
        [
            "Concept: A dedicated space for sharing startup ideas.",
            "Filtering: Category-based discovery (Tech, Health, etc.).",
            "Gamification: Trending & Featured badges for high-impact ideas.",
            "Engagement: Likes and voting system to validate concepts.",
            "UI/UX: Modern card-based layout with interactive transitions."
        ]
    )

    # Slide 5: AI-Powered Resume Builder (EXTRA)
    add_content_slide(
        "Innovative Extra: Advanced Resume Builder",
        [
            "Personalization: Step-by-step form for personal, exp, edu, and skills.",
            "Real-time Preview: See changes instantly in a professional layout.",
            "Export: One-click PDF generation for job applications.",
            "UX Focus: Floating background animations for a premium feel.",
            "Validation: Progress indicators to ensure complete data entry."
        ]
    )

    # Slide 6: Job Management System
    add_content_slide(
        "Job Management & Applications",
        [
            "Dynamic Listings: Filterable job board with real-time search.",
            "Detailed Info: Comprehensive job descriptions and requirements.",
            "Seamless Flow: Track applications from 'Applied' to 'Review'.",
            "Stubbed AI: Placeholder for future ML-based job matching."
        ]
    )

    # Slide 7: Additional Features
    add_content_slide(
        "Additional Platform Features",
        [
            "Industry Blog: Career advice and industry news integration.",
            "Support Center: FAQ and Contact systems for user help.",
            "Responsiveness: Mobile-first design using Tailwind utilities.",
            "Stability: Throttling & Rate limiting for API security."
        ]
    )

    # Slide 8: Future Roadmap
    add_content_slide(
        "Future Enhancements",
        [
            "True Machine Learning: Skill-based candidate matching.",
            "Real-time Chat: Integrated messaging for recruiters and seekers.",
            "Video Interviews: Built-in virtual meeting platform.",
            "Cloud Deployment: Migration to PostgreSQL and AWS/GCP."
        ]
    )

    prs.save("JobPortal_Project_Presentation.pptx")
    print("PPT created successfully as 'JobPortal_Project_Presentation.pptx'")

if __name__ == "__main__":
    create_presentation()
