from django.core.management.base import BaseCommand
from django.utils.text import slugify
from apps.courses.models import Course, Category
from apps.services.models import Service


COURSES_DATA = [
    {
        "title": "C Programming",
        "short_description": "Master the foundations of programming with C. Learn memory management, pointers, and system-level programming.",
        "description": "A comprehensive course on C programming covering variables, control flow, functions, arrays, pointers, memory management, file I/O, and data structures.",
        "icon": "FaC",
        "duration": "8 Weeks",
        "level": "beginner",
        "is_featured": True,
        "enrollment_count": 1240,
        "order": 1,
    },
    {
        "title": "Python",
        "short_description": "Learn Python from scratch — scripting, OOP, data handling, automation, and more.",
        "description": "Complete Python course from basics to advanced. Covers OOP, file handling, modules, decorators, and popular libraries.",
        "icon": "FaPython",
        "duration": "10 Weeks",
        "level": "beginner",
        "is_featured": True,
        "enrollment_count": 3520,
        "order": 2,
    },
    {
        "title": "C++",
        "short_description": "Deepen your programming skills with C++, covering OOP, STL, templates, and competitive programming concepts.",
        "description": "C++ course covering object-oriented programming, STL, templates, exception handling, and competitive coding.",
        "icon": "SiCplusplus",
        "duration": "10 Weeks",
        "level": "intermediate",
        "is_featured": True,
        "enrollment_count": 890,
        "order": 3,
    },
    {
        "title": "Java",
        "short_description": "Build enterprise-grade applications with Java. Learn OOP, collections, multithreading, and Spring basics.",
        "description": "Comprehensive Java programming course with OOP principles, exception handling, Java Collections, multithreading, JDBC, and Spring introduction.",
        "icon": "FaJava",
        "duration": "12 Weeks",
        "level": "intermediate",
        "is_featured": True,
        "enrollment_count": 1780,
        "order": 4,
    },
    {
        "title": "Data Structures & Algorithms",
        "short_description": "Crack coding interviews with strong DSA skills. Arrays, trees, graphs, dynamic programming, and more.",
        "description": "Master data structures and algorithms essential for technical interviews. Covers arrays, linked lists, stacks, queues, trees, graphs, sorting, searching, and dynamic programming.",
        "icon": "FaProjectDiagram",
        "duration": "14 Weeks",
        "level": "intermediate",
        "is_featured": True,
        "enrollment_count": 2340,
        "order": 5,
    },
    {
        "title": "Full Stack Development",
        "short_description": "Build complete web apps with React, Node.js, and databases. From UI to deployment.",
        "description": "End-to-end full stack web development using HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, and deployment on cloud platforms.",
        "icon": "FaCode",
        "duration": "20 Weeks",
        "level": "intermediate",
        "is_featured": True,
        "enrollment_count": 4120,
        "order": 6,
    },
    {
        "title": "Git & GitHub",
        "short_description": "Learn version control essentials used by every developer. Branching, merging, pull requests, and collaboration.",
        "description": "Complete Git and GitHub course covering initialization, staging, commits, branching, merging, rebasing, pull requests, and team collaboration.",
        "icon": "FaGitAlt",
        "duration": "2 Weeks",
        "level": "beginner",
        "is_featured": False,
        "enrollment_count": 2890,
        "order": 7,
    },
    {
        "title": "Project Building",
        "short_description": "Learn how to ideate, plan, and build real-world software projects from scratch.",
        "description": "A practical course on building complete projects from ideation to deployment. Covers project planning, architecture, coding, testing, and presentation.",
        "icon": "FaRocket",
        "duration": "6 Weeks",
        "level": "intermediate",
        "is_featured": False,
        "enrollment_count": 1230,
        "order": 8,
    },
    {
        "title": "LinkedIn Optimization",
        "short_description": "Transform your LinkedIn profile into a powerful career tool. Get noticed by recruiters.",
        "description": "Step-by-step LinkedIn optimization course. Build a compelling profile, grow your network, publish content, and attract recruiters and opportunities.",
        "icon": "FaLinkedin",
        "duration": "1 Week",
        "level": "beginner",
        "is_featured": False,
        "enrollment_count": 3450,
        "order": 9,
    },
    {
        "title": "Career Guidance",
        "short_description": "Navigate your career with clarity. Resume tips, interview strategies, and job search mastery.",
        "description": "Complete career development program covering resume building, interview preparation, job search strategies, negotiation, and professional networking.",
        "icon": "FaBriefcase",
        "duration": "3 Weeks",
        "level": "beginner",
        "is_featured": False,
        "enrollment_count": 2100,
        "order": 10,
    },
    {
        "title": "Communication & Personal Branding",
        "short_description": "Build your personal brand, improve communication, and stand out in the professional world.",
        "description": "Develop professional communication skills, personal branding strategies, public speaking confidence, and social media presence.",
        "icon": "FaUsers",
        "duration": "4 Weeks",
        "level": "beginner",
        "is_featured": False,
        "enrollment_count": 1670,
        "order": 11,
    },
    {
        "title": "Life-Changing Webinars",
        "short_description": "Attend curated webinars by industry experts on trending tech and career topics.",
        "description": "Live and recorded webinars on cutting-edge technology, career advice, entrepreneurship, and personal development by top industry professionals.",
        "icon": "FaVideo",
        "duration": "Ongoing",
        "level": "beginner",
        "is_featured": False,
        "enrollment_count": 5600,
        "order": 12,
    },
    {
        "title": "Internship Guidance and Support",
        "short_description": "Get real-world internship opportunities, mentorship, and support to kickstart your career.",
        "description": "Comprehensive internship preparation program including resume reviews, mock interviews, company applications support, and ongoing mentorship during internships.",
        "icon": "FaGraduationCap",
        "duration": "Ongoing",
        "level": "beginner",
        "is_featured": False,
        "enrollment_count": 980,
        "order": 13,
    },
]

SERVICES_DATA = [
    {
        "title": "Canva Design Solutions",
        "short_description": "Professional posters, thumbnails, banners, and graphics crafted to make your brand shine.",
        "icon": "FaPalette",
        "category": "design",
        "is_featured": True,
        "order": 1,
    },
    {
        "title": "Video Creation for Ads",
        "short_description": "Compelling video content for your company ads, social media, and product promotions.",
        "icon": "FaVideo",
        "category": "marketing",
        "is_featured": True,
        "order": 2,
    },
    {
        "title": "Sales & Marketing Support",
        "short_description": "Data-driven sales strategies and marketing campaigns to boost your business growth.",
        "icon": "FaChartLine",
        "category": "marketing",
        "is_featured": True,
        "order": 3,
    },
    {
        "title": "LinkedIn Optimization",
        "short_description": "Professional LinkedIn profile makeover to attract recruiters and business opportunities.",
        "icon": "FaLinkedin",
        "category": "career",
        "is_featured": True,
        "order": 4,
    },
    {
        "title": "Startup Growth Support",
        "short_description": "End-to-end startup consulting — from ideation, branding, to scaling your business.",
        "icon": "FaRocket",
        "category": "business",
        "is_featured": True,
        "order": 5,
    },
    {
        "title": "Resume Building",
        "short_description": "ATS-optimized, professionally designed resumes that get you shortlisted.",
        "icon": "FaFileAlt",
        "category": "career",
        "is_featured": True,
        "order": 6,
    },
    {
        "title": "Portfolio Websites",
        "short_description": "Custom portfolio websites to showcase your work, skills, and projects beautifully.",
        "icon": "FaGlobe",
        "category": "development",
        "is_featured": False,
        "order": 7,
    },
    {
        "title": "Company Websites",
        "short_description": "Professional, fast, and modern websites for businesses of all sizes.",
        "icon": "FaBuilding",
        "category": "development",
        "is_featured": False,
        "order": 8,
    },
    {
        "title": "End-to-end Canva Design",
        "short_description": "Complete brand design packages — logos, social kits, presentations, and marketing materials.",
        "icon": "FaPaintBrush",
        "category": "design",
        "is_featured": False,
        "order": 9,
    },
]


class Command(BaseCommand):
    help = 'Seed database with initial Skillexa courses and services'

    def handle(self, *args, **options):
        self.stdout.write('Seeding courses...')
        cat, _ = Category.objects.get_or_create(name='Programming', defaults={'slug': 'programming'})

        for data in COURSES_DATA:
            slug = slugify(data['title'])
            Course.objects.update_or_create(
                slug=slug,
                defaults={**data, 'slug': slug, 'category': cat}
            )
        self.stdout.write(self.style.SUCCESS(f'  Created/updated {len(COURSES_DATA)} courses'))

        self.stdout.write('Seeding services...')
        from apps.services.models import Service
        for data in SERVICES_DATA:
            slug = slugify(data['title'])
            Service.objects.update_or_create(
                slug=slug,
                defaults={**data, 'slug': slug}
            )
        self.stdout.write(self.style.SUCCESS(f'  Created/updated {len(SERVICES_DATA)} services'))
        self.stdout.write(self.style.SUCCESS('✅ Database seeded successfully!'))