import { Question } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const APP_NAME = 'Developer Self-Assessment';

export const CATEGORIES = {
  TECHNICAL_SKILLS: 'Technical Skills',
  TECHNICAL_KNOWLEDGE: 'Technical Knowledge & Understanding',
  PROBLEM_SOLVING: 'Problem Solving & Debugging',
  ALGORITHMS: 'Data Structures & Algorithms',
  VERSION_CONTROL: 'Version Control & Git',
  COLLABORATION: 'Collaboration',
  COMMUNICATION: 'Communication',
  LEARNING: 'Learning & Growth',
  PRECISION: 'Precision & Attention to Detail',
  INDEPENDENCE: 'Independence & Autonomy',
} as const;

// Default configuration for "Other" option
export const OTHER_OPTION_CONFIG = {
  scoreWeight: 0.5, // Neutral score for multiple-choice
  checkboxScoreWeight: 0.18, // Neutral score for checkbox/tech-stack
  recommendations: [
    'Document your approach and share with the team',
    'Research best practices in this area',
    'Connect with others using similar approaches',
    'Create a knowledge base article about your experience',
  ],
  mentorExplanation: "Thanks for sharing your unique approach! Every developer's journey is different, and it's great that you're exploring your own path. Here are some general recommendations to help you continue growing in this area.",
  resources: [
    { title: 'Developer Roadmaps', url: 'https://roadmap.sh/', type: 'docs' as const, description: 'Explore structured learning paths' },
    { title: 'freeCodeCamp', url: 'https://www.freecodecamp.org/', type: 'course' as const, description: 'Free comprehensive development courses' },
    { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/', type: 'docs' as const, description: 'Comprehensive web development documentation' },
    { title: 'Stack Overflow', url: 'https://stackoverflow.com/', type: 'article' as const, description: 'Community-driven Q&A for developers' },
  ],
};

export const QUESTIONS: Question[] = [
  {
    "id": "06e82c17-1a15-42ba-894d-24d9dedfad52",
    "type": "multiple-choice",
    "title": "How well do you communicate technical concepts to non-technical stakeholders?",
    "hint": "Translating complexity into clear business impact is a key senior developer skill",
    "options": [
      {
        "mentorExplanation": "Adapting language to your audience shows empathy. Next level: persuasion. When you need budget for tech debt, can you frame it as risk reduction? When proposing a new architecture, can you quantify the business impact? Frame technical work in business terms.",
        "label": "I adapt my language for the audience and convey technical trade-offs clearly",
        "recommendations": [
          "Level up to persuasive communication",
          "Learn to write compelling technical proposals",
          "Practice presenting to executives"
        ],
        "isCorrect": true,
        "resources": [],
        "scoreWeight": 0.6,
        "value": "competent"
      },
      {
        "resources": [
          {
            "url": "https://www.youtube.com/watch?v=Unzc731iCUY",
            "title": "Executive Communication",
            "type": "video"
          }
        ],
        "scoreWeight": 0.35,
        "value": "basic",
        "mentorExplanation": "Non-technical stakeholders care about outcomes, not implementation. Don't say 'We need to refactor the database layer.' Say 'This 2-week investment will cut customer-facing errors by 80%.' Lead with impact, not technical details.",
        "recommendations": [
          "Practice structured storytelling",
          "Focus on business impact over technical details",
          "Use before/after scenarios"
        ],
        "label": "I can explain basics but lose non-technical people on complex topics"
      },
      {
        "value": "expert",
        "resources": [
          {
            "type": "book",
            "title": "CTO Communication Patterns",
            "url": "https://ctohb.com/"
          }
        ],
        "scoreWeight": 1,
        "label": "I shape technical vision at an organizational level through compelling communication",
        "recommendations": [
          "Publish thought leadership content",
          "Speak at industry conferences",
          "Mentor leaders on technical communication"
        ],
        "isCorrect": true,
        "mentorExplanation": "You shape organizational direction through communication. Your technical vision becomes company strategy because you translate it into business value. This is rare. Share this skill - write, speak publicly, mentor others."
      },
      {
        "mentorExplanation": "Bridging technical and business worlds is one of the most valuable skills you can develop. Practice the Feynman Technique: explain concepts using simple language. If your audience needs a dictionary to understand you, you've lost them. Use analogies.",
        "recommendations": [
          "Practice the \"explain it to a 5-year-old\" technique",
          "Use analogies and visual aids",
          "Study technical writing basics"
        ],
        "label": "I struggle to explain technical concepts in plain language",
        "scoreWeight": 0.15,
        "resources": [
          {
            "url": "https://fs.blog/feynman-technique/",
            "type": "article",
            "title": "Feynman Technique"
          },
          {
            "type": "course",
            "title": "Technical Communication for Engineers",
            "url": "https://developers.google.com/tech-writing"
          }
        ],
        "value": "struggle"
      },
      {
        "label": "I regularly present technical strategy to leadership and align it with business goals",
        "recommendations": [
          "Mentor engineers on stakeholder communication",
          "Develop your personal communication style",
          "Create communication guidelines for your team"
        ],
        "isCorrect": true,
        "mentorExplanation": "You bridge technical-business effectively. This skill drives careers to staff/principal level. Help your team develop it - pair junior engineers with stakeholder communication opportunities. Make communication a core competency.",
        "value": "strong",
        "scoreWeight": 0.8,
        "resources": [
          {
            "url": "https://staffeng.com/guides/staff-archetypes/",
            "type": "article",
            "title": "Staff Engineer Communication"
          },
          {
            "type": "article",
            "title": "Engineering Manager Communication",
            "url": "https://leaddev.com/communication"
          }
        ]
      }
    ],
    "allowOther": true,
    "category": "Communication"
  },
  {
    "id": "0c273934-629a-4a68-aa49-43cd66ef7fbc",
    "category": "Precision & Attention to Detail",
    "followUpQuestion": "",
    "options": [
      {
        "mentorExplanation": "Start with clarity! Before coding, list what you're asked to do. Confirm understanding. Test each requirement. When you get feedback, implement it exactly, then verify. Precision comes from process.",
        "recommendations": [
          "Read instructions completely before starting",
          "Take notes during discussions",
          "Test thoroughly before submitting",
          "Ask clarifying questions upfront"
        ],
        "label": "I frequently create bugs and often fail to follow instructions correctly. I need significant help fixing issues.",
        "scoreWeight": 0.1,
        "resources": [],
        "value": "bugs1"
      },
      {
        "recommendations": [
          "Create acceptance criteria checklists",
          "Test against requirements systematically",
          "Learn common bug patterns to avoid",
          "Document implementation before coding"
        ],
        "label": "I often create bugs and sometimes misunderstand instructions. I can fix issues with guidance.",
        "mentorExplanation": "Build systematic habits! For every task: 1) List requirements, 2) Plan approach, 3) Implement, 4) Test each requirement, 5) Review. This structure reduces bugs and ensures you deliver what's asked.",
        "value": "bugs2",
        "resources": [
          {
            "url": "https://jvns.ca/blog/2019/06/23/a-few-debugging-resources/",
            "title": "Debugging Strategies",
            "description": "Finding bugs",
            "type": "article"
          }
        ],
        "scoreWeight": 0.2
      },
      {
        "mentorExplanation": "You're developing! Reduce bugs by thinking: 'What could go wrong?' Test those cases. When you get instructions, repeat them back to confirm. When bugs appear, fix quickly and learn the pattern.",
        "label": "I occasionally create bugs and sometimes need clarification on instructions. I can usually fix issues myself.",
        "recommendations": [
          "Improve requirement understanding",
          "Test edge cases more thoroughly",
          "Learn defensive programming",
          "Practice reproducing and fixing bugs quickly"
        ],
        "resources": [
          {
            "title": "Defensive Programming",
            "type": "article",
            "description": "Preventing errors",
            "url": "https://en.wikipedia.org/wiki/Defensive_programming"
          },
          {
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling",
            "description": "Handling failures",
            "type": "docs",
            "title": "Error Handling"
          }
        ],
        "scoreWeight": 0.3,
        "value": "bugs3"
      },
      {
        "scoreWeight": 0.4,
        "resources": [
          {
            "type": "docs",
            "title": "Bug Tracking",
            "description": "Issue management",
            "url": "https://linear.app/docs"
          }
        ],
        "value": "bugs4",
        "mentorExplanation": "Good progress! When instructions are unclear, ask before implementing (saves time). After a bug, ask: 'How could I have prevented this?' Build that check into your process. Learn from every issue.",
        "label": "I follow instructions well with occasional need for clarification. I create bugs sometimes but fix them independently.",
        "recommendations": [
          "Proactively clarify ambiguities",
          "Build comprehensive test coverage if test is a common practice in your team",
          "Learn from bugs to prevent recurrence",
          "Review your code for potential issues"
        ]
      },
      {
        "resources": [
          {
            "url": "https://google.github.io/eng-practices/review/",
            "description": "Effective reviews",
            "title": "Code Review Best Practices",
            "type": "docs"
          }
        ],
        "scoreWeight": 0.5,
        "value": "bugs5",
        "mentorExplanation": "Strong intermediate! You're reliable - following instructions well and delivering quality. Now help others - share your approach, review their work, create guides for common issues. Multiply your impact.",
        "label": "I follow instructions accurately and rarely create bugs. I quickly identify and fix my own issues.",
        "recommendations": [
          "Start taking more ownership of design decisions, not just execution.",
          "Practice suggesting improvements or alternatives before implementing instructions.",
          "Look for opportunities to prevent issues earlier, not just fix them quickly."
        ]
      },
      {
        "value": "bugs6",
        "resources": [
          {
            "url": "https://github.com/analysis-tools-dev/static-analysis",
            "title": "Static Analysis",
            "description": "Automated bug detection",
            "type": "github"
          },
          {
            "type": "article",
            "description": "Testing interactions",
            "title": "Integration Testing",
            "url": "https://martinfowler.com/bliki/IntegrationTest.html"
          }
        ],
        "scoreWeight": 0.6,
        "label": "I consistently follow instructions precisely and rarely introduce bugs. I fix issues quickly when they occur.",
        "recommendations": [
          "Start asking more questions about the “why” behind tasks to improve solutions, not just execute them.",
          "Practice suggesting improvements or alternative approaches before starting implementation.",
          "Take more ownership of outcomes, not just task completion and fixes."
        ],
        "mentorExplanation": "Advanced reliability! People trust your implementations. Build on this - create team standards for requirement clarification, testing protocols, bug prevention checklists. Your precision becomes team capability."
      },
      {
        "value": "bugs7",
        "scoreWeight": 0.7,
        "resources": [
          {
            "url": "https://cucumber.io/docs/bdd/",
            "type": "docs",
            "description": "BDD approach",
            "title": "Behavior-Driven Development"
          },
          {
            "type": "docs",
            "description": "Automated quality checks",
            "title": "Quality Gates",
            "url": "https://docs.sonarsource.com/sonarqube/latest/user-guide/quality-gates/"
          }
        ],
        "label": "I excel at precise implementation and almost never create bugs. I often exceed expectations in following directions.",
        "recommendations": [
          "Start getting more involved in design discussions, not just implementation, so you can help shape better solutions early.",
          "Practice questioning and improving requirements when needed, instead of only following them exactly.",
          "Take on more ownership by proposing alternative approaches and explaining trade-offs before you start building."
        ],
        "mentorExplanation": "Excellent! You're a model of precision. Scale this - build requirement templates, create testing frameworks, establish review processes. Help the team achieve your level of reliability."
      },
      {
        "value": "bugs8",
        "scoreWeight": 0.8,
        "resources": [
          {
            "description": "Production reliability",
            "type": "book",
            "title": "Release Engineering",
            "url": "https://sre.google/sre-book/release-engineering/"
          },
          {
            "url": "https://www.scaledagileframework.com/built-in-quality/",
            "title": "Quality Culture",
            "description": "Built-in quality",
            "type": "article"
          }
        ],
        "label": "I have very high precision in implementation. I rarely create bugs and consistently implement feedback correctly.",
        "recommendations": [
          "Start focusing more on the “why” behind solutions, not just perfect execution, so you can influence better system design.",
          "Practice proposing improvements or alternatives before implementing feedback, instead of only executing it.",
          "Take on more end-to-end ownership of features, including design decisions and trade-offs, not just implementation."
        ],
        "mentorExplanation": "Senior/expert level! Your work is production-ready on first submission. Build systems - automated testing pipelines, quality metrics, requirement frameworks. Your precision sets organizational standards."
      },
      {
        "recommendations": [
          "Expand your impact beyond individual systems to how multiple systems work together and scale.",
          "Focus on preventing entire classes of issues early through better design and processes, not just fixing implementation bugs.",
          "Take more leadership in setting standards and helping others improve quality, not only delivering high-quality work yourself."
        ],
        "label": "I have strong attention to detail. I build reliable systems with very few bugs and help improve overall quality.",
        "mentorExplanation": "Outstanding! You achieve near-perfect implementation. Share this mastery - publish methodologies, create frameworks, speak at conferences. Influence how the industry thinks about quality and precision.",
        "value": "bugs9",
        "scoreWeight": 0.9,
        "resources": [
          {
            "url": "https://www.microsoft.com/en-us/research/",
            "description": "Quality research",
            "type": "article",
            "title": "Microsoft Research"
          }
        ]
      },
      {
        "scoreWeight": 1,
        "resources": [],
        "value": "bugs10",
        "mentorExplanation": "Exceptional! Your precision enables mission-critical systems. Your frameworks prevent bugs at scale. Focus on maximum impact - create tools and standards that ensure quality for millions of users worldwide.",
        "label": "I have world-class standards for quality, and I build practices that help prevent bugs and improve reliability.",
        "recommendations": [
          "Evolve your frameworks to handle new systems and larger scale.",
          "Share and teach your practices so others can adopt them.",
          "Influence broader engineering strategy, not just quality."
        ]
      }
    ],
    "hint": "Consider: following given instructions accurately, implementing feedback correctly, bug frequency in your contributions, speed of identifying and fixing your own errors",
    "title": "How would you describe your ability to follow instructions and prevent bugs in your code?",
    "type": "multiple-choice"
  },
  {
    "id": "22665e92-a8b4-4308-b093-851cd0ac467f",
    "allowOther": true,
    "category": "Technical Skills",
    "followUpQuestion": "How many years of experience do you have with each?",
    "options": [
      {
        "value": "react",
        "scoreWeight": 0.8,
        "resources": [
          {
            "url": "https://epicreact.dev",
            "description": "Comprehensive React course from beginner to advanced. Best structured learning path for React.",
            "title": "Epic React by Kent C. Dodds",
            "type": "course"
          },
          {
            "type": "course",
            "description": "Free university-level course covering React, Node.js, and full-stack development.",
            "title": "Full Stack Open",
            "url": "https://fullstackopen.com/"
          },
          {
            "url": "https://www.patterns.dev/posts/reactjs/",
            "title": "React Patterns",
            "description": "Modern React patterns and best practices. Great for intermediate developers.",
            "type": "article"
          }
        ],
        "label": "React",
        "recommendations": [
          "Build a full-stack React application",
          "Master React hooks and performance optimization",
          "Learn state management patterns",
          "Practice component composition",
          "Optimize rendering performance",
          "Build accessible React apps"
        ],
        "mentorExplanation": "React is incredibly powerful for building modern user interfaces! Here's the thing - React is actually pretty simple at its core (it's just JavaScript), but the ecosystem can feel overwhelming. Focus on mastering hooks first - useState, useEffect, and custom hooks will take you far. Then, understand how React renders and re-renders - this knowledge prevents performance issues. Remember: React is declarative, which means you describe what the UI should look like, and React figures out how to make it happen. This mindset shift is crucial! Build small projects to practice, then gradually tackle state management (Context, Redux, Zustand). The best way to learn React is by building - start with something simple like a todo app, then level up to something more complex."
      },
      {
        "label": "Node.js",
        "recommendations": [
          "Create a REST API with Express",
          "Master async/await and the event loop",
          "Learn streams and buffers",
          "Build real-time applications if you have time",
          "Understand middleware patterns",
          "Optimize Node.js performance"
        ],
        "mentorExplanation": "Node.js brings JavaScript to the backend, which is powerful because you can use one language across your entire stack! But here's what trips people up: Node.js is single-threaded with an event loop, which means it handles concurrency differently than languages like Java or Python. You need to understand async/await deeply - it's not just syntax, it's about thinking in asynchronous patterns. Learn about streams (they're super efficient for handling large data), middleware patterns (especially in Express), and error handling (unhandled promise rejections can crash your server!). Node.js shines for I/O-heavy operations like APIs and real-time apps. Start by building a REST API, then graduate to WebSockets or GraphQL. The ecosystem (npm) is massive - both a blessing and a curse. Choose packages wisely!",
        "value": "nodejs",
        "scoreWeight": 0.8,
        "resources": [
          {
            "description": "Comprehensive collection of 100+ best practices. Updated regularly.",
            "type": "github",
            "title": "Node.js Best Practices",
            "url": "https://github.com/goldbergyoni/nodebestpractices"
          },
          {
            "url": "https://nodejs.dev/learn",
            "title": "Learn Node.js",
            "description": "Official learning resources with hands-on examples.",
            "type": "docs"
          },
          {
            "description": "Comprehensive course covering APIs, authentication, and deployment.",
            "type": "course",
            "title": "Node.js: The Complete Guide",
            "url": "https://www.udemy.com/course/nodejs-the-complete-guide/"
          }
        ]
      },
      {
        "mentorExplanation": "TypeScript is a game-changer! At first it might feel like extra work, but once you experience catching bugs at compile time instead of runtime, you'll never want to go back. Here's my advice: start gradually. Don't try to make everything perfectly typed immediately - use 'any' sparingly at first, then tighten types as you learn. Focus on understanding type inference (TypeScript is smart - let it infer types when obvious), learn the utility types (Partial, Pick, Omit, etc. - they're incredibly useful), and practice type narrowing with type guards. The real power comes when you use generics - they let you write reusable, type-safe code. TypeScript isn't just about avoiding errors; it's about making your code self-documenting and enabling better autocomplete. This makes you faster! The investment pays off quickly.",
        "recommendations": [
          "Master advanced types and generics",
          "Learn utility types",
          "Understand type inference",
          "Practice type narrowing",
          "Build type-safe APIs"
        ],
        "label": "TypeScript",
        "scoreWeight": 0.9,
        "resources": [
          {
            "type": "docs",
            "title": "TypeScript Handbook",
            "description": "Comprehensive official documentation. Best reference for TypeScript features.",
            "url": "https://www.typescriptlang.org/docs/handbook/intro.html"
          },
          {
            "url": "https://github.com/type-challenges/type-challenges",
            "type": "github",
            "title": "Type Challenges",
            "description": "Practice TypeScript types with challenges from easy to extreme. Learn by doing!"
          },
          {
            "description": "62 specific ways to improve your TypeScript. Great for intermediate developers.",
            "type": "book",
            "title": "Effective TypeScript",
            "url": "https://effectivetypescript.com/"
          },
          {
            "type": "article",
            "description": "Free book covering TypeScript in depth. Excellent resource for understanding internals.",
            "title": "TypeScript Deep Dive",
            "url": "https://basarat.gitbook.io/typescript/"
          },
          {
            "url": "https://react-typescript-cheatsheet.netlify.app/",
            "description": "Essential patterns for using TypeScript with React. Community-maintained.",
            "title": "React TypeScript Cheatsheet",
            "type": "docs"
          }
        ],
        "value": "typescript"
      },
      {
        "mentorExplanation": "Python is wonderfully versatile - you can build web apps, automate tasks, process data, or even do machine learning! The language emphasizes readability: 'code is read more often than it's written.' Focus on writing 'Pythonic' code - use list comprehensions, understand the Zen of Python ('import this'), leverage the amazing standard library (it has so much built-in!). Python's philosophy is 'there should be one obvious way to do it,' which is refreshing. Learn about decorators (they're powerful for adding functionality), context managers (the 'with' statement), and when you're ready, async/await in Python. The ecosystem is massive: Django/Flask for web, Pandas/NumPy for data, FastAPI for modern APIs. Start with the fundamentals, then specialize based on your interests. Python's gentle learning curve makes it great for beginners, but there's depth for experts too!",
        "label": "Python",
        "recommendations": [
          "Build a data processing pipeline",
          "Learn Pythonic idioms and best practices",
          "Master list comprehensions",
          "Understand decorators and context managers",
          "Learn async Python"
        ],
        "scoreWeight": 0.8,
        "resources": [
          {
            "url": "https://realpython.com/",
            "title": "Real Python",
            "type": "article",
            "description": "High-quality Python tutorials on everything from basics to advanced topics. Excellent explanations and practical examples."
          },
          {
            "type": "docs",
            "description": "Start here for fundamentals. Official docs are well-written and comprehensive.",
            "title": "Python Official Tutorial",
            "url": "https://docs.python.org/3/tutorial/"
          },
          {
            "url": "https://automatetheboringstuff.com/",
            "description": "Free book teaching Python through practical automation tasks. Perfect for beginners!",
            "type": "book",
            "title": "Automate the Boring Stuff"
          },
          {
            "url": "https://python-patterns.guide/",
            "type": "article",
            "description": "Learn design patterns in Python context. From basic to advanced patterns with clear examples.",
            "title": "Python Design Patterns"
          }
        ],
        "value": "python"
      },
      {
        "value": "java",
        "scoreWeight": 0.8,
        "resources": [
          {
            "type": "docs",
            "title": "Spring Boot Official Guides",
            "description": "Official Spring Boot tutorials. Learn by building real applications step by step.",
            "url": "https://spring.io/guides"
          },
          {
            "url": "https://github.com/iluwatar/java-design-patterns",
            "type": "github",
            "description": "Comprehensive collection of design patterns implemented in Java. Over 200 patterns with explanations!",
            "title": "Java Design Patterns"
          },
          {
            "url": "https://www.baeldung.com/",
            "title": "Baeldung",
            "description": "High-quality Java and Spring tutorials. Great for learning specific concepts with practical examples.",
            "type": "article"
          }
        ],
        "recommendations": [
          "Study design patterns in Java",
          "Build a Spring Boot application",
          "Master Java streams and lambdas",
          "Understand JVM internals",
          "Learn dependency injection",
          "Build microservices"
        ],
        "label": "Java",
        "mentorExplanation": "Java has staying power - it's been enterprise-grade for decades! Here's what makes Java valuable: strong OOP principles, robust type system, and massive ecosystem. Modern Java (8+) is quite different from old Java - lambdas, streams, and Optional make code much more expressive. The JVM is incredibly mature and performant. Spring Boot is basically the standard for Java backend development - learn it well! Focus on understanding dependency injection (core to Spring), learn the Streams API (powerful functional programming), and understand how the JVM works (garbage collection, memory management). Java's verbosity is decreasing with each version. The ecosystem is battle-tested - when you need a library, it exists and it's probably maintained. Java teaches discipline: explicit typing, proper OOP, design patterns. These principles transfer to other languages. Great for building scalable, maintainable systems!"
      },
      {
        "recommendations": [
          "Optimize database queries",
          "Design normalized schemas",
          "Learn indexing strategies",
          "Master JOINs and subqueries",
          "Understand transactions and ACID"
        ],
        "label": "SQL/Databases",
        "mentorExplanation": "SQL is fundamental for data persistence and one of those skills that never goes out of style! Here's the thing: databases are more than just storage - they're the backbone of most applications. Start with understanding relational concepts: tables, relationships, normalization. Then master SQL queries - SELECT, JOIN, GROUP BY, subqueries. The real magic happens when you understand query optimization: indexes, execution plans, and query performance. Learn about ACID properties and transactions - crucial for data integrity. Different databases (PostgreSQL, MySQL, SQL Server) have quirks, but core SQL concepts transfer. NoSQL is popular, but don't skip SQL - it's still dominant in the industry. A developer who truly understands databases becomes invaluable. Your backend code is only as good as your database design!",
        "value": "sql",
        "scoreWeight": 0.75,
        "resources": [
          {
            "url": "https://use-the-index-luke.com/",
            "type": "article",
            "description": "Free guide to database performance for developers. Practical and SQL-agnostic.",
            "title": "Use The Index, Luke"
          },
          {
            "title": "PostgreSQL Tutorial",
            "type": "docs",
            "description": "Comprehensive PostgreSQL tutorials from basics to advanced. Well-structured.",
            "url": "https://www.postgresqltutorial.com/"
          },
          {
            "title": "Mode SQL Tutorial",
            "type": "course",
            "description": "Interactive SQL tutorial with real data. Great for beginners and intermediate learners.",
            "url": "https://mode.com/sql-tutorial/"
          }
        ]
      },
      {
        "label": "Cloud (AWS/Azure/GCP)",
        "recommendations": [
          "Learn to deploy staging/production apps",
          "Master infrastructure as code",
          "Learn serverless architectures",
          "Understand cloud cost optimization",
          "Build multi-region deployments"
        ],
        "mentorExplanation": "Cloud platforms are absolutely essential for modern deployment - this skill is highly valued! Here's my advice: start with one platform and go deep before branching out. AWS has the largest market share, Azure is strong in enterprise, GCP excels in data/ML. Focus on core services first: compute (EC2/VMs), storage (S3/Blob), databases, and networking. Then learn about managed services - they save so much time! Infrastructure as Code (Terraform, CloudFormation) is crucial - treating infrastructure like code is a game-changer. Understand the shared responsibility model and cloud security basics. Learn about serverless (Lambda/Functions) - it's changing how we build. Cost optimization is important - cloud bills can spiral! Certifications are valuable here - they provide structured learning paths. Cloud knowledge makes you incredibly employable and enables you to build scalable systems. The cloud is not just hosting - it's a completely different way of architecting applications!",
        "value": "cloud",
        "scoreWeight": 0.9,
        "resources": [
          {
            "description": "Comprehensive cloud learning platform with hands-on labs for AWS, Azure, GCP.",
            "type": "course",
            "title": "A Cloud Guru",
            "url": "https://acloudguru.com/"
          },
          {
            "description": "Learn Infrastructure as Code with Terraform. Essential cloud skill.",
            "type": "docs",
            "title": "Terraform Tutorial",
            "url": "https://developer.hashicorp.com/terraform/tutorials"
          },
          {
            "url": "https://dvassallo.gumroad.com/l/aws-good-parts",
            "type": "book",
            "title": "The Good Parts of AWS",
            "description": "Practical guide focusing on the most useful AWS services. Cuts through the complexity."
          }
        ]
      },
      {
        "label": "Docker/Kubernetes",
        "recommendations": [
          "Containerize applications",
          "Learn container orchestration",
          "Master Docker Compose",
          "Understand Kubernetes basics",
          "Learn deployment strategies",
          "Build CI/CD pipelines with containers"
        ],
        "mentorExplanation": "Containers revolutionized software deployment - this is a must-have modern skill! Docker solves the 'works on my machine' problem by packaging your app with all its dependencies. Start by understanding what containers are (not VMs!), then learn Docker basics: images, containers, Dockerfile, volumes. Docker Compose is essential for multi-container apps - it's your local development powerhouse. Once you're comfortable with Docker, learn about container registries and image optimization (smaller images = faster deployments). Kubernetes is the next level - it orchestrates containers at scale. Start with basic concepts: pods, services, deployments. Don't rush into Kubernetes - get really comfortable with Docker first! Understanding containers makes you more DevOps-savvy and helps you build consistent, reproducible environments. Every modern development team uses containers - this skill is incredibly valuable!",
        "value": "docker",
        "scoreWeight": 0.85,
        "resources": [
          {
            "url": "https://docs.docker.com/get-started/",
            "type": "docs",
            "description": "Start here for Docker fundamentals. Official docs with hands-on examples.",
            "title": "Docker Official Tutorial"
          },
          {
            "url": "https://kubernetes.io/docs/tutorials/kubernetes-basics/",
            "title": "Kubernetes Basics",
            "description": "Official Kubernetes tutorial. Interactive learning with a real cluster.",
            "type": "docs"
          }
        ]
      },
      {
        "mentorExplanation": "Vue is intuitive and powerful. The Composition API in Vue 3 brings it closer to React hooks while maintaining Vue's simplicity.",
        "label": "Vue.js",
        "recommendations": [
          "Try to build a Vue 3 application",
          "Master Composition API"
        ],
        "resources": [
          {
            "url": "https://vuejs.org/guide/introduction.html",
            "type": "docs",
            "title": "Vue.js Official Guide"
          },
          {
            "url": "https://vuejs.org/guide/extras/composition-api-faq.html",
            "type": "docs",
            "title": "Vue 3 Composition API"
          }
        ],
        "scoreWeight": 0.8,
        "value": "vue"
      },
      {
        "resources": [
          {
            "url": "https://angular.io/tutorial",
            "type": "docs",
            "title": "Angular Official Tutorial"
          },
          {
            "type": "docs",
            "title": "RxJS Documentation",
            "url": "https://rxjs.dev/guide/overview"
          },
          {
            "type": "course",
            "title": "Angular University",
            "url": "https://angular-university.io/"
          }
        ],
        "scoreWeight": 0.8,
        "value": "angular",
        "mentorExplanation": "Angular is a complete framework with strong opinions. Excellent for large enterprise applications with complex requirements.",
        "recommendations": [
          "Build an Angular app",
          "Master RxJS observables"
        ],
        "label": "Angular"
      },
      {
        "label": "MongoDB/NoSQL",
        "recommendations": [
          "Design NoSQL data models",
          "Learn aggregation pipelines"
        ],
        "mentorExplanation": "NoSQL databases like MongoDB offer flexibility for certain use cases. Understanding when to use SQL vs NoSQL is a valuable skill.",
        "value": "mongodb",
        "resources": [
          {
            "type": "docs",
            "title": "Data Model Design",
            "url": "https://www.mongodb.com/docs/manual/core/data-modeling-introduction/"
          }
        ],
        "scoreWeight": 0.75
      },
      {
        "mentorExplanation": "GraphQL provides a flexible alternative to REST, particularly powerful for complex data requirements. It's gaining adoption rapidly!",
        "label": "GraphQL",
        "recommendations": [
          "Start building a GraphQL API",
          "Master schema design"
        ],
        "scoreWeight": 0.85,
        "resources": [
          {
            "type": "course",
            "title": "Apollo GraphQL",
            "url": "https://www.apollographql.com/tutorials/"
          }
        ],
        "value": "graphql"
      },
      {
        "value": "react-native",
        "resources": [
          {
            "description": "Best starting point for React Native development. Covers setup to deployment.",
            "title": "Expo Documentation",
            "type": "docs",
            "url": "https://docs.expo.dev/"
          },
          {
            "url": "https://reactnative.dev/docs/getting-started",
            "type": "docs",
            "description": "Official docs with guides and component reference.",
            "title": "React Native Documentation"
          },
          {
            "url": "https://www.youtube.com/@wcandillon",
            "description": "Best resource for advanced React Native animations and Reanimated.",
            "title": "William Candillon YouTube",
            "type": "video"
          },
          {
            "title": "React Navigation Docs",
            "type": "docs",
            "description": "The standard navigation library for React Native apps.",
            "url": "https://reactnavigation.org/docs/getting-started"
          }
        ],
        "scoreWeight": 0.82,
        "recommendations": [
          "Build a cross-platform mobile app",
          "Master Expo workflow",
          "Understand native bridge concepts",
          "Learn mobile UX patterns",
          "Handle offline-first data"
        ],
        "label": "React Native / Mobile",
        "mentorExplanation": "Mobile development opens a huge user base! React Native lets you use your React knowledge on iOS and Android. Expo makes getting started easy - use it! Understand the bridge between JS and native code (it matters for performance). Learn about mobile-specific concerns: offline handling, push notifications, app store deployment. Platform differences between iOS and Android will bite you - test on both! Navigation is different from the web (react-navigation is the go-to). Performance matters more on mobile - optimize list rendering, image loading, and animations."
      },
      {
        "resources": [
          {
            "type": "docs",
            "title": "Next.js Official Docs",
            "description": "Outstanding docs with interactive examples. Covers App Router in depth.",
            "url": "https://nextjs.org/docs"
          },
          {
            "url": "https://nextjs.org/learn",
            "title": "Next.js Learn Course",
            "description": "Free official interactive course. Build a real dashboard app step by step.",
            "type": "course"
          },
          {
            "url": "https://www.patterns.dev/posts/react-server-components/",
            "type": "article",
            "title": "Server Components Deep Dive",
            "description": "Comprehensive look at React Server Components and the mental model shift."
          },
          {
            "type": "video",
            "description": "Practical Next.js and full-stack patterns explained clearly.",
            "title": "Theo (t3.gg) YouTube",
            "url": "https://www.youtube.com/@t3dotgg"
          }
        ],
        "scoreWeight": 0.85,
        "value": "nextjs",
        "mentorExplanation": "Next.js changed full-stack React development forever. Server Components are the biggest shift - they reduce client-side JavaScript dramatically. Understand rendering strategies: when to use SSR (dynamic, personalized), SSG (mostly-static content), ISR (revalidate on a schedule), and streaming. The App Router is powerful but has a learning curve - learn the file-system routing conventions early. Server Actions simplify data mutations without separate API routes. Master image optimization and font loading - they directly impact Core Web Vitals. Next.js is opinionated for good reason; trust the conventions.",
        "label": "Next.js / Meta-frameworks",
        "recommendations": [
          "Learn to master App Router and Server Components",
          "Understand SSR vs SSG vs ISR trade-offs",
          "Learn edge runtime patterns",
          "Optimize Core Web Vitals",
          "Build full-stack apps with server actions"
        ]
      },
      {
        "mentorExplanation": "Rust is the most loved language for a reason - it gives you C-level performance with memory safety guarantees at compile time. The ownership system is the hardest part to learn, but once it clicks, it fundamentally changes how you think about memory in ALL languages. The borrow checker is your friend, not your enemy! Start with 'The Rust Book' (free, excellent). Build something small - a CLI tool is perfect. Rust is invaluable for performance-critical code, system tools, and WebAssembly. Even if you don't use Rust daily, learning it makes you a better developer in any language.",
        "label": "Rust / Systems Languages",
        "recommendations": [
          "Learn ownership and borrowing",
          "Build a CLI tool in Rust",
          "Understand memory safety guarantees",
          "Explore Rust for WebAssembly",
          "Compare with C++ trade-offs"
        ],
        "scoreWeight": 0.9,
        "resources": [
          {
            "url": "https://github.com/rust-lang/rustlings",
            "description": "Small exercises to learn Rust. Interactive and hands-on.",
            "title": "Rustlings",
            "type": "github"
          },
          {
            "url": "https://doc.rust-lang.org/rust-by-example/",
            "description": "Learn Rust through annotated examples.",
            "title": "Rust by Example",
            "type": "docs"
          }
        ],
        "value": "rust"
      },
      {
        "mentorExplanation": "AI/ML is reshaping software. You don't need to be a researcher to add AI to your projects - LLM APIs (OpenAI, Anthropic) let you build powerful features with a few API calls. Start there! Understand prompt engineering - it's the fastest way to get value. For ML fundamentals: learn linear algebra basics, understand gradient descent conceptually, then pick PyTorch (more pythonic, dominant in research). RAG (Retrieval Augmented Generation) is the most practical pattern for LLM apps right now. Learn embeddings and vector databases. The field moves incredibly fast - prioritize fundamentals over specific tools.",
        "label": "ML/AI (PyTorch, TensorFlow, LLM APIs)",
        "recommendations": [
          "Learn ML fundamentals and math basics",
          "Fine-tune a pre-trained model",
          "Build an LLM-powered application",
          "Study prompt engineering",
          "Understand RAG architectures"
        ],
        "resources": [
          {
            "type": "course",
            "title": "fast.ai Practical Deep Learning",
            "description": "Top-down, code-first approach to deep learning. Free and excellent.",
            "url": "https://course.fast.ai/"
          },
          {
            "url": "https://www.youtube.com/@AndrejKarpathy",
            "type": "video",
            "description": "Deep neural network intuition from OpenAI's former director of AI.",
            "title": "Andrej Karpathy YouTube"
          },
          {
            "url": "https://python.langchain.com/docs/get_started/introduction",
            "type": "docs",
            "title": "LangChain Docs",
            "description": "Build LLM-powered applications. Great practical starting point."
          },
          {
            "url": "https://huggingface.co/learn/nlp-course/chapter1/1",
            "title": "Hugging Face Course",
            "type": "course",
            "description": "Free NLP and transformer course. Learn fine-tuning and model deployment."
          },
          {
            "type": "book",
            "title": "ML Engineering Guide",
            "description": "Production ML systems from training to deployment.",
            "url": "https://www.mlebook.com/"
          }
        ],
        "scoreWeight": 0.88,
        "value": "ml-ai"
      },
      {
        "resources": [
          {
            "title": "A Tour of Go",
            "description": "Interactive introduction to Go. Best place to start!",
            "type": "docs",
            "url": "https://go.dev/tour/"
          },
          {
            "description": "Hands-on introduction with annotated example programs.",
            "type": "docs",
            "title": "Go by Example",
            "url": "https://gobyexample.com/"
          },
          {
            "description": "Official guide to writing clear, idiomatic Go code.",
            "type": "docs",
            "title": "Effective Go",
            "url": "https://go.dev/doc/effective_go"
          },
          {
            "description": "TDD approach to learning Go. Free and practical.",
            "title": "Learn Go with Tests",
            "type": "book",
            "url": "https://quii.gitbook.io/learn-go-with-tests/"
          }
        ],
        "scoreWeight": 0.83,
        "value": "go",
        "mentorExplanation": "Go is designed for simplicity and efficiency - perfect for backend services and cloud infrastructure! Its concurrency model with goroutines is incredibly elegant. Start with 'A Tour of Go' (free, interactive). Go forces you to handle errors explicitly, which makes code more robust. The standard library is extensive - you can build a lot without dependencies. Go compiles to a single binary, making deployment dead simple. The language is intentionally small - you can learn most of it in a weekend, but mastering it takes practice. Great for microservices, APIs, and DevOps tools.",
        "label": "Go (Golang)",
        "recommendations": [
          "Build microservices in Go",
          "Learn goroutines and channels",
          "Master the Go standard library",
          "Build CLI tools",
          "Understand Go interfaces"
        ]
      },
      {
        "mentorExplanation": "C# and .NET have evolved dramatically - it's now cross-platform, fast, and modern! .NET Core changed everything. LINQ is incredibly powerful for data manipulation. Learn async/await deeply - C# has one of the best async implementations. ASP.NET Core is solid for web APIs. Entity Framework makes database work smooth. The ecosystem is mature with excellent tooling (Visual Studio, Rider). Blazor brings C# to the frontend if you're interested. Great for enterprise applications, games (Unity), and desktop apps. Microsoft's investment in .NET is huge!",
        "recommendations": [
          "Build ASP.NET Core applications",
          "Master LINQ and async patterns",
          "Learn Entity Framework",
          "Understand dependency injection",
          "Explore Blazor"
        ],
        "label": "C# / .NET",
        "scoreWeight": 0.82,
        "resources": [
          {
            "type": "docs",
            "title": "C# Programming Guide",
            "description": "Official Microsoft documentation.",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"
          },
          {
            "url": "https://dotnet.microsoft.com/learn",
            "title": ".NET Tutorial",
            "type": "course",
            "description": "Official learning path for .NET."
          },
          {
            "title": "ASP.NET Core Fundamentals",
            "description": "Modern web development with .NET.",
            "type": "docs",
            "url": "https://learn.microsoft.com/en-us/aspnet/core/"
          }
        ],
        "value": "csharp"
      },
      {
        "mentorExplanation": "Redis is much more than a cache - it's an in-memory data structure store! Understanding caching is crucial for performance. Learn the different eviction policies, when to cache (and when not to), and cache invalidation strategies (the hardest problem in computer science, they say!). Redis has powerful data structures: sorted sets, hashes, streams. Use it for caching, session storage, real-time analytics, pub/sub messaging, and rate limiting. Master Redis and you'll dramatically improve application performance.",
        "recommendations": [
          "Implement caching strategies",
          "Learn Redis data structures",
          "Master cache invalidation patterns",
          "Use Redis for pub/sub",
          "Optimize application performance"
        ],
        "label": "Redis / Caching",
        "resources": [
          {
            "url": "https://university.redis.com/",
            "type": "course",
            "description": "Free official courses on Redis.",
            "title": "Redis University"
          },
          {
            "url": "https://redis.io/docs/",
            "type": "docs",
            "title": "Redis Documentation",
            "description": "Comprehensive official docs."
          }
        ],
        "scoreWeight": 0.77,
        "value": "redis"
      },
      {
        "recommendations": [
          "Build native iOS apps",
          "Learn SwiftUI",
          "Master UIKit fundamentals",
          "Understand iOS design patterns",
          "Learn Combine framework"
        ],
        "label": "Swift / iOS Development",
        "mentorExplanation": "Swift is Apple's modern language for iOS/macOS development - clean syntax and powerful features! SwiftUI is the future of Apple UI development - declarative and reactive. But learn UIKit too; it's still widely used. iOS development has its quirks: the Apple ecosystem, App Store review process, provisioning profiles. Swift optionals force you to handle null safety. The iOS market is lucrative - users spend more on apps. Great for mobile developers wanting to target iOS specifically.",
        "value": "swift",
        "scoreWeight": 0.8,
        "resources": [
          {
            "description": "Free comprehensive SwiftUI course by Paul Hudson.",
            "title": "100 Days of SwiftUI",
            "type": "course",
            "url": "https://www.hackingwithswift.com/100/swiftui"
          },
          {
            "url": "https://docs.swift.org/swift-book/",
            "description": "Official Swift book from Apple.",
            "title": "Swift Programming Language",
            "type": "docs"
          },
          {
            "url": "https://developer.apple.com/tutorials/app-dev-training",
            "description": "Official Apple tutorials.",
            "type": "docs",
            "title": "iOS App Dev Tutorials"
          }
        ]
      },
      {
        "mentorExplanation": "Kotlin is now Google's preferred language for Android - it's Java but better! More concise, null-safe by default, and has modern features. Jetpack Compose is transforming Android UI development (similar to React/SwiftUI). Coroutines make async code clean. Android has massive market share globally. Kotlin Multiplatform is interesting - share code between platforms. The Android ecosystem is vibrant and open. Great career path with huge demand!",
        "label": "Kotlin / Android Development",
        "recommendations": [
          "Build Android apps",
          "Learn Jetpack Compose",
          "Master coroutines",
          "Understand Android architecture",
          "Learn Kotlin multiplatform"
        ],
        "scoreWeight": 0.8,
        "resources": [
          {
            "url": "https://developer.android.com/courses/android-basics-compose/course",
            "title": "Android Basics with Compose",
            "type": "course",
            "description": "Official modern Android course."
          },
          {
            "description": "Official Kotlin docs.",
            "type": "docs",
            "title": "Kotlin Documentation",
            "url": "https://kotlinlang.org/docs/home.html"
          },
          {
            "type": "docs",
            "title": "Kotlin Koans",
            "description": "Interactive Kotlin exercises.",
            "url": "https://play.kotlinlang.org/koans/"
          }
        ],
        "value": "kotlin"
      },
      {
        "scoreWeight": 0.75,
        "resources": [
          {
            "url": "https://bootcamp.laravel.com/",
            "description": "Official Laravel learning path.",
            "type": "course",
            "title": "Laravel Bootcamp"
          },
          {
            "url": "https://phptherightway.com/",
            "type": "docs",
            "title": "PHP: The Right Way",
            "description": "Best practices for modern PHP."
          },
          {
            "url": "https://laracasts.com/",
            "description": "Premium video tutorials for Laravel and PHP.",
            "title": "Laracasts",
            "type": "course"
          }
        ],
        "value": "php",
        "mentorExplanation": "Modern PHP (8+) is completely different from old PHP - it's fast, typed, and has a great ecosystem! Laravel is one of the most elegant frameworks out there. The community is strong, documentation is excellent. Learn modern PHP features: typed properties, attributes, fibers. Laravel's ecosystem is rich: Livewire, Inertia, Vapor. PHP powers a huge portion of the web (WordPress, etc.). Don't dismiss it because of old stereotypes - modern PHP is productive and powerful!",
        "recommendations": [
          "Learn modern PHP features",
          "Master Laravel framework",
          "Build RESTful APIs",
          "Understand Composer",
          "Learn Laravel Eloquent ORM"
        ],
        "label": "PHP / Laravel"
      },
      {
        "mentorExplanation": "Ruby prioritizes developer happiness - the code reads like English! Rails popularized convention over configuration and remains incredibly productive. The 'Rails way' is opinionated, which means faster development. Ruby's meta-programming is powerful but use it wisely. The community values testing, good documentation, and clean code. Rails is mature and battle-tested. Great for startups and MVPs - you can build fast! Though not as trendy as it once was, Rails is still powering many successful companies.",
        "recommendations": [
          "Build Rails applications",
          "Learn Ruby idioms",
          "Master ActiveRecord",
          "Understand convention over configuration",
          "Build RESTful services"
        ],
        "label": "Ruby / Ruby on Rails",
        "resources": [
          {
            "type": "docs",
            "title": "Ruby on Rails Guides",
            "description": "Official comprehensive Rails guides.",
            "url": "https://guides.rubyonrails.org/"
          },
          {
            "title": "The Odin Project Ruby Path",
            "description": "Free full-stack Ruby course.",
            "type": "course",
            "url": "https://www.theodinproject.com/paths/full-stack-ruby-on-rails"
          }
        ],
        "scoreWeight": 0.75,
        "value": "ruby"
      },
      {
        "mentorExplanation": "Elixir brings functional programming to the powerful Erlang VM - built for concurrency and fault tolerance! Phoenix is incredibly fast and Phoenix LiveView is game-changing (real-time features without writing JavaScript). The 'Let it crash' philosophy is mind-bending at first. Pattern matching is elegant. Great for real-time systems, chat apps, and high-concurrency scenarios. The community is welcoming and thoughtful. Learning Elixir teaches you functional programming principles that apply everywhere!",
        "recommendations": [
          "Learn functional programming concepts",
          "Build Phoenix applications",
          "Master OTP patterns",
          "Understand concurrency model",
          "Build real-time features with LiveView"
        ],
        "label": "Elixir / Phoenix",
        "resources": [
          {
            "url": "https://elixirschool.com/",
            "description": "Free comprehensive Elixir lessons.",
            "type": "docs",
            "title": "Elixir School"
          },
          {
            "description": "Official Phoenix documentation.",
            "type": "docs",
            "title": "Phoenix Framework Guides",
            "url": "https://hexdocs.pm/phoenix/overview.html"
          },
          {
            "title": "Programming Elixir",
            "type": "book",
            "description": "Excellent book by Dave Thomas.",
            "url": "https://pragprog.com/titles/elixir16/programming-elixir-1-6/"
          }
        ],
        "scoreWeight": 0.85,
        "value": "elixir"
      },
      {
        "resources": [
          {
            "title": "Terraform Tutorials",
            "description": "Official HashiCorp learning path.",
            "type": "docs",
            "url": "https://developer.hashicorp.com/terraform/tutorials"
          },
          {
            "description": "Community best practices guide.",
            "type": "docs",
            "title": "Terraform Best Practices",
            "url": "https://www.terraform-best-practices.com/"
          }
        ],
        "scoreWeight": 0.84,
        "value": "terraform",
        "mentorExplanation": "Infrastructure as Code is essential for modern DevOps - Terraform is the industry standard! Treating infrastructure like code enables version control, code review, and automation. Learn about state management (crucial!), modules for reusability, and workspaces. Terraform is cloud-agnostic, which is powerful. Start with simple resources, then build complex modules. Understanding IaC makes you valuable in any DevOps context. The declarative approach is elegant - you describe what you want, Terraform figures out how.",
        "label": "Terraform / Infrastructure as Code",
        "recommendations": [
          "Master IaC concepts",
          "Learn Terraform state management",
          "Build reusable modules",
          "Understand cloud provisioning",
          "Implement GitOps workflows"
        ]
      },
      {
        "mentorExplanation": "CI/CD is fundamental to modern software delivery - automate all the things! Jenkins is widely used (though GitHub Actions and GitLab CI are gaining ground). Learn pipeline-as-code (Jenkinsfile), understand stages and steps, and master deployment strategies (blue-green, canary). CI/CD isn't just about automation; it's about rapid, reliable feedback. Start simple: build, test, deploy. Then add complexity. Good CI/CD makes teams faster and more confident. This skill is valuable across all development roles!",
        "label": "Jenkins / CI/CD",
        "recommendations": [
          "Build CI/CD pipelines",
          "Master pipeline as code",
          "Learn deployment automation",
          "Implement testing automation",
          "Understand GitOps principles"
        ],
        "resources": [
          {
            "url": "https://www.jenkins.io/doc/",
            "title": "Jenkins Documentation",
            "description": "Official Jenkins docs.",
            "type": "docs"
          },
          {
            "url": "https://www.atlassian.com/continuous-delivery",
            "type": "article",
            "description": "Comprehensive CI/CD guide.",
            "title": "CI/CD Best Practices"
          },
          {
            "type": "docs",
            "description": "Modern CI/CD alternative.",
            "title": "GitHub Actions Tutorial",
            "url": "https://docs.github.com/en/actions"
          }
        ],
        "scoreWeight": 0.78,
        "value": "jenkins"
      },
      {
        "scoreWeight": 0.76,
        "resources": [
          {
            "url": "https://tailwindcss.com/docs",
            "description": "Excellent searchable documentation.",
            "title": "Tailwind CSS Docs",
            "type": "docs"
          },
          {
            "title": "Tailwind UI",
            "description": "Premium components (worth studying even if not buying).",
            "type": "docs",
            "url": "https://tailwindui.com/"
          },
          {
            "url": "https://www.youtube.com/c/TailwindLabs",
            "title": "Build Anything with Tailwind",
            "type": "video",
            "description": "Official YouTube channel with tips."
          }
        ],
        "value": "tailwind",
        "mentorExplanation": "Tailwind CSS changed how we write CSS - utility-first is incredibly productive once you embrace it! At first, the long class names feel wrong, but you'll never want to name things again. You build faster, maintain easier, and the consistency is automatic. Learn the design system (spacing, colors), responsive utilities, and how to extract components when needed. JIT mode gives you arbitrary values. Tailwind is taking over - especially in React/Next.js ecosystems. The constraint of utilities actually increases creativity!",
        "recommendations": [
          "Master utility-first approach",
          "Learn responsive design patterns",
          "Build custom design systems",
          "Optimize for production",
          "Learn JIT mode"
        ],
        "label": "Tailwind CSS / Utility-First CSS"
      },
      {
        "mentorExplanation": "Flutter lets you build beautiful native apps for mobile, web, and desktop from a single codebase! The widget system is elegant - everything's a widget. Dart is easy to learn if you know JavaScript or Java. Flutter's hot reload is incredibly productive. Learn state management early (Riverpod is popular). Performance is generally excellent. The community is growing fast. Great choice for cross-platform development - you can reach every platform with one codebase. Google's backing gives it staying power.",
        "recommendations": [
          "Build cross-platform apps",
          "Master widget composition",
          "Learn state management (Bloc, Riverpod)",
          "Understand Flutter architecture",
          "Build for iOS and Android"
        ],
        "label": "Flutter / Dart",
        "resources": [
          {
            "url": "https://docs.flutter.dev/",
            "title": "Flutter Documentation",
            "description": "Comprehensive official docs with codelabs.",
            "type": "docs"
          },
          {
            "description": "Complete widget reference.",
            "title": "Flutter Widget Catalog",
            "type": "docs",
            "url": "https://docs.flutter.dev/development/ui/widgets"
          }
        ],
        "scoreWeight": 0.81,
        "value": "flutter"
      },
      {
        "mentorExplanation": "Svelte is refreshingly different - it's a compiler, not a runtime framework! This means smaller bundle sizes and great performance. The reactive syntax is intuitive - just assignments trigger updates. SvelteKit is the full-stack framework. Svelte is gaining traction fast - developers love it for its simplicity and performance. Less boilerplate than React, more intuitive than Vue. Great for projects where bundle size matters or you want a fresh approach. The community is enthusiastic and growing!",
        "recommendations": [
          "Learn reactive programming in Svelte",
          "Build SvelteKit apps",
          "Master stores and context",
          "Understand compilation approach",
          "Build performant UIs"
        ],
        "label": "Svelte / SvelteKit",
        "scoreWeight": 0.79,
        "resources": [
          {
            "url": "https://svelte.dev/tutorial",
            "description": "Interactive official tutorial. Best way to start!",
            "type": "docs",
            "title": "Svelte Tutorial"
          },
          {
            "url": "https://kit.svelte.dev/docs/introduction",
            "title": "SvelteKit Docs",
            "description": "Full-stack Svelte framework.",
            "type": "docs"
          },
          {
            "description": "Community recipes and resources.",
            "title": "Svelte Society",
            "type": "docs",
            "url": "https://sveltesociety.dev/"
          }
        ],
        "value": "svelte"
      },
      {
        "resources": [
          {
            "url": "https://cryptozombies.io/",
            "title": "CryptoZombies",
            "description": "Learn Solidity through building a game. Fun and interactive!",
            "type": "course"
          },
          {
            "description": "Official Solidity docs.",
            "title": "Solidity Documentation",
            "type": "docs",
            "url": "https://docs.soliditylang.org/"
          },
          {
            "title": "Smart Contract Security",
            "type": "book",
            "description": "Free book on Ethereum development.",
            "url": "https://github.com/ethereumbook/ethereumbook"
          }
        ],
        "scoreWeight": 0.82,
        "value": "solidity",
        "mentorExplanation": "Web3 and blockchain are creating new paradigms! Solidity is for writing Ethereum smart contracts. Security is CRITICAL - bugs in smart contracts can cost millions. Understand gas optimization, common vulnerabilities (reentrancy, etc.), and testing thoroughly. The field is evolving rapidly. Start with blockchain fundamentals before diving into Solidity. Whether Web3 is the future or hype is debated, but the underlying concepts (decentralization, cryptography) are valuable to understand.",
        "label": "Solidity / Web3",
        "recommendations": [
          "Learn blockchain fundamentals",
          "Build smart contracts",
          "Master contract security",
          "Understand gas optimization",
          "Learn Web3.js or Ethers.js"
        ]
      },
      {
        "scoreWeight": 0.8,
        "resources": [
          {
            "url": "https://fastapi.tiangolo.com/",
            "title": "FastAPI Documentation",
            "description": "Excellent docs with tutorials.",
            "type": "docs"
          },
          {
            "url": "https://github.com/zhanymkanov/fastapi-best-practices",
            "title": "FastAPI Best Practices",
            "type": "github",
            "description": "Community best practices."
          },
          {
            "description": "Full-stack project template.",
            "type": "github",
            "title": "Full Stack FastAPI",
            "url": "https://github.com/tiangolo/full-stack-fastapi-postgresql"
          }
        ],
        "value": "fastapi",
        "mentorExplanation": "FastAPI is the modern way to build Python APIs - fast, intuitive, and production-ready! It uses type hints for validation and auto-generates beautiful API docs. Async support makes it performant. Pydantic models provide data validation. Coming from Flask or Django? FastAPI feels fresh and modern. The developer experience is excellent - auto-complete everywhere! Great for microservices, ML model APIs, or any backend API. It's gaining adoption rapidly!",
        "label": "FastAPI / Modern Python Web",
        "recommendations": [
          "Build async Python APIs",
          "Master Pydantic models",
          "Learn auto-generated docs",
          "Understand async/await in Python",
          "Implement authentication"
        ]
      },
      {
        "scoreWeight": 0.77,
        "resources": [
          {
            "title": "Prisma Documentation",
            "type": "docs",
            "description": "Comprehensive official docs.",
            "url": "https://www.prisma.io/docs"
          },
          {
            "title": "Prisma Tutorial",
            "type": "course",
            "description": "Get started with Prisma.",
            "url": "https://www.prisma.io/docs/getting-started"
          },
          {
            "url": "https://www.prisma.io/docs/guides/performance-and-optimization",
            "title": "Prisma Best Practices",
            "type": "docs",
            "description": "Performance and optimization guide."
          }
        ],
        "value": "prisma",
        "mentorExplanation": "Prisma brings type-safety to database access - it's changing how we work with databases in TypeScript! The schema is declarative and migration system is smooth. Prisma Client is auto-generated and fully typed. Great developer experience with auto-complete. Works with PostgreSQL, MySQL, SQLite, SQL Server, MongoDB. Compared to traditional ORMs (TypeORM, Sequelize), Prisma feels more modern. The query API is intuitive. Database work becomes safer and more productive!",
        "label": "Prisma / Modern ORMs",
        "recommendations": [
          "Master Prisma schema",
          "Learn migrations",
          "Optimize database queries",
          "Understand type-safe database access",
          "Build with Prisma Client"
        ]
      },
      {
        "scoreWeight": 0.72,
        "resources": [
          {
            "title": "Figma Tutorial",
            "description": "Official Figma learning resources.",
            "type": "docs",
            "url": "https://help.figma.com/hc/en-us/categories/360002051613"
          },
          {
            "type": "book",
            "description": "Design for developers. Excellent resource!",
            "title": "Refactoring UI",
            "url": "https://www.refactoringui.com/"
          }
        ],
        "value": "figma",
        "mentorExplanation": "Understanding design makes you a more complete developer! Figma is the industry-standard design tool. Learn to read design specs, understand spacing and typography, use design tokens. Auto-layout is powerful for responsive designs. Good developers who understand design are incredibly valuable. You don't need to be a designer, but understanding design thinking and tools bridges the developer-designer gap. This makes you more effective and collaborative!",
        "label": "Figma / Design Tools",
        "recommendations": [
          "Learn UI/UX principles",
          "Master component design",
          "Understand design systems",
          "Learn prototyping",
          "Collaborate with designers effectively"
        ]
      }
    ],
    "hint": "Select the technologies you use regularly or have significant experience with",
    "type": "tech-stack",
    "title": "Which technologies do you currently work with? (Select all that apply)"
  },
  {
    "id": "330679bb-4fe0-4766-9844-bf652869b0cb",
    "hint": "Good documentation is a gift to your future self and your teammates",
    "options": [
      {
        "value": "advocate",
        "scoreWeight": 1,
        "resources": [
          {
            "url": "https://www.writethedocs.org/guide/writing/beginners-guide-to-docs/",
            "title": "Building Docs Culture",
            "type": "docs"
          },
          {
            "url": "https://www.writethedocs.org/videos/",
            "type": "video",
            "title": "Speaking About Docs"
          }
        ],
        "label": "I advocate for and maintain documentation standards",
        "recommendations": [
          "Build documentation culture",
          "Create documentation automation",
          "Speak about documentation"
        ],
        "isCorrect": true,
        "mentorExplanation": "Building documentation culture is rare and valuable. You understand that docs multiply team productivity. The teams that document well move faster, not slower. Keep advocating - this is leadership."
      },
      {
        "value": "basic",
        "scoreWeight": 0.35,
        "resources": [
          {
            "url": "https://adr.github.io/",
            "type": "docs",
            "title": "Architecture Decision Records"
          },
          {
            "title": "API Documentation Guide",
            "type": "docs",
            "url": "https://idratherbewriting.com/learnapidoc/"
          }
        ],
        "isCommonMistake": true,
        "label": "I document when required",
        "recommendations": [
          "Create README files for projects",
          "Document complex logic",
          "Learn about ADRs"
        ],
        "mentorExplanation": "Waiting to be required means you're treating docs as overhead. Shift the mindset: write docs because they make your code better. Explaining your code forces clarity. Start documenting decisions - why you chose this approach over that one."
      },
      {
        "resources": [
          {
            "url": "https://www.markdownguide.org/",
            "title": "Markdown Guide",
            "type": "docs"
          },
          {
            "title": "Docusaurus",
            "description": "Documentation site generator",
            "type": "docs",
            "url": "https://docusaurus.io/"
          }
        ],
        "scoreWeight": 0.8,
        "value": "thorough",
        "mentorExplanation": "ADRs are underused and powerful. They capture context that disappears otherwise - why you made this trade-off, what you considered, what you learned. Six months later when someone questions the decision, the ADR tells the story. Solid practice.",
        "recommendations": [
          "Create documentation templates",
          "Train team on documentation",
          "Automate documentation generation"
        ],
        "yearOneRecommendations": [
          "Establish team documentation standards",
          "Create comprehensive API documentation"
        ],
        "isCorrect": true,
        "label": "I write thorough documentation including ADRs"
      },
      {
        "value": "minimal",
        "scoreWeight": 0.15,
        "resources": [
          {
            "url": "https://www.writethedocs.org/guide/",
            "title": "Write the Docs Guide",
            "type": "docs"
          },
          {
            "type": "article",
            "title": "Code Documentation Best Practices",
            "url": "https://stackoverflow.blog/2021/12/23/best-practices-for-writing-code-comments/"
          },
          {
            "type": "github",
            "title": "README Template",
            "url": "https://github.com/othneildrew/Best-README-Template"
          }
        ],
        "label": "I write minimal or no documentation",
        "recommendations": [
          "Learn documentation best practices",
          "Start with inline code comments",
          "Write README files"
        ],
        "mentorExplanation": "The code is never enough. Three months from now, you won't remember why you did something that way. Start small: write why, not what. Explain complex logic before you forget the reasoning. Document decisions and trade-offs - that context evaporates fast."
      },
      {
        "mentorExplanation": "Regular documentation means you get it: code shows how, docs show why. Keep this habit and help standardize it across your team. Document for the developer who inherits this code in a year - that might be you.",
        "label": "I regularly document my code and decisions",
        "recommendations": [
          "Establish documentation standards",
          "Create technical guides",
          "Share documentation practices"
        ],
        "isCorrect": true,
        "scoreWeight": 0.6,
        "resources": [
          {
            "type": "course",
            "title": "Technical Writing Courses",
            "url": "https://developers.google.com/tech-writing"
          },
          {
            "title": "Docs as Code",
            "type": "docs",
            "url": "https://www.writethedocs.org/guide/docs-as-code/"
          }
        ],
        "value": "regular"
      }
    ],
    "type": "multiple-choice",
    "title": "How comfortable are you with documenting your code and technical decisions?",
    "allowOther": true,
    "category": "Communication"
  },
  {
    "id": "38367578-2634-4c19-9cc4-60326ef18581",
    "options": [
      {
        "scoreWeight": 0.6,
        "resources": [
          {
            "title": "Conventional Commits",
            "type": "docs",
            "url": "https://www.conventionalcommits.org/"
          },
          {
            "url": "https://githooks.com/",
            "type": "docs",
            "title": "Git Hooks Tutorial"
          },
          {
            "title": "GitFlow vs Trunk-Based",
            "type": "video",
            "url": "https://www.youtube.com/watch?v=gW6dFpTMk8s"
          }
        ],
        "value": "workflows",
        "mentorExplanation": "Understanding workflows means you think beyond your local changes. You know how your team collaborates and why. Good commit messages tell a story - treat them as documentation. Git hooks automate quality checks.",
        "recommendations": [
          "Learn advanced Git commands and try to use them in the appropriate time",
          "Study commit message best practices",
          "Master Git hooks"
        ],
        "isCorrect": true,
        "label": "I understand Git workflows (GitFlow, trunk-based) and use them effectively"
      },
      {
        "resources": [
          {
            "title": "Git Rebase Explained",
            "type": "video",
            "url": "https://www.youtube.com/watch?v=f1wnYdLEpgI"
          },
          {
            "url": "https://www.atlassian.com/git/tutorials/advanced-overview",
            "type": "docs",
            "title": "Advanced Git"
          },
          {
            "title": "Oh Shit, Git!",
            "type": "article",
            "description": "How to fix common Git mistakes",
            "url": "https://ohshitgit.com/"
          }
        ],
        "scoreWeight": 0.35,
        "value": "branching",
        "mentorExplanation": "Branches enable parallel work without stepping on toes. Now learn the powerful stuff: rebase for clean history, cherry-pick for selective merges, reflog for when you think you've lost work (you haven't - Git rarely loses anything).",
        "label": "I use branches and can resolve simple merge conflicts",
        "recommendations": [
          "Learn Git rebase",
          "Study cherry-picking",
          "Master conflict resolution"
        ]
      },
      {
        "value": "expert",
        "resources": [
          {
            "url": "https://jwiegley.github.io/git-from-the-bottom-up/",
            "title": "Git from the Bottom Up",
            "type": "article"
          },
          {
            "title": "Advanced Git Techniques",
            "type": "video",
            "url": "https://www.youtube.com/watch?v=qsTthZi23VE"
          }
        ],
        "scoreWeight": 1,
        "label": "I understand Git internals and can solve complex repository issues",
        "recommendations": [
          "Share Git expertise through content",
          "Create custom Git tools",
          "Mentor teams on Git strategies"
        ],
        "isCorrect": true,
        "mentorExplanation": "You understand Git's object model - commits, trees, blobs. You can fix corrupted repos, untangle complex histories, optimize large repositories. This depth is rare. Share it - write about tricky Git problems you've solved, build tools, teach others."
      },
      {
        "recommendations": [
          "Learn branching strategies",
          "Study Git workflows",
          "Practice merge conflict resolution"
        ],
        "label": "I use basic commands (add, commit, push, pull)",
        "mentorExplanation": "Basic commands get you started. Git's real power is in branching - think of branches as save points in a game. Learn to merge and resolve conflicts. Understand that Git is designed for collaboration, not just version control.",
        "value": "basic-commands",
        "resources": [
          {
            "description": "Free comprehensive Git guide",
            "type": "book",
            "title": "Pro Git Book",
            "url": "https://git-scm.com/book/en/v2"
          },
          {
            "title": "Learn Git Branching",
            "description": "Interactive Git tutorial",
            "type": "article",
            "url": "https://learngitbranching.js.org/"
          },
          {
            "url": "https://www.atlassian.com/git/tutorials/comparing-workflows",
            "type": "docs",
            "title": "Git Workflows"
          }
        ],
        "scoreWeight": 0.15
      },
      {
        "label": "I use advanced features (rebase, bisect, reflog) and teach others",
        "recommendations": [
          "Establish team Git standards",
          "Automate with Git hooks"
        ],
        "isCorrect": true,
        "mentorExplanation": "Git power user. Bisect finds which commit broke things (binary search through history). Reflog recovers 'lost' commits. Rebase rewrites history cleanly. These tools separate competent from expert. Many developers fear Git - help them master it.",
        "value": "advanced",
        "resources": [
          {
            "url": "https://www.metaltoad.com/blog/beginners-guide-git-bisect-process-elimination",
            "type": "article",
            "title": "Git Bisect Guide"
          },
          {
            "url": "https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain",
            "type": "docs",
            "title": "Git Internals"
          },
          {
            "url": "https://www.youtube.com/watch?v=duqBHik7nRo",
            "title": "Building Better Teams with Git",
            "type": "video"
          }
        ],
        "scoreWeight": 0.8
      }
    ],
    "hint": "Git is more than commits - it's about collaboration, history, and workflow",
    "type": "multiple-choice",
    "title": "How would you rate your Git and version control skills?",
    "category": "Version Control & Git",
    "followUpQuestion": "",
    "allowOther": true
  },
  {
    "id": "3956fae6-6c8f-4d27-84df-f0bb0e39e8c8",
    "type": "multiple-choice",
    "title": "Which best describes your experience with system design and architecture?",
    "hint": "Think about designing scalable, maintainable systems, not just writing code",
    "options": [
      {
        "resources": [
          {
            "url": "https://adr.github.io/",
            "type": "docs",
            "title": "Architecture Decision Records"
          },
          {
            "title": "System Design Interviews",
            "type": "video",
            "url": "https://www.youtube.com/c/SystemDesignInterview"
          }
        ],
        "scoreWeight": 0.82,
        "value": "design",
        "mentorExplanation": "You're designing at the component level, which is solid. Next step: understand the system-level implications. How does your component fit into the larger picture? What happens at scale? Every design decision has trade-offs - start documenting them.",
        "label": "I design features and components",
        "recommendations": [
          "I suggest studying scalability patterns to strengthen your problem solving and debugging skills",
          "Try to participate in designing larger system architectures when there is the opportunity or for your personal project",
          "Learn about trade-offs"
        ],
        "isCorrect": true,
        "yearOneRecommendations": [
          "Lead architectural decisions for a feature",
          "Present design proposals"
        ]
      },
      {
        "value": "learning",
        "scoreWeight": 0.42,
        "resources": [
          {
            "url": "https://www.youtube.com/c/SystemDesignInterview",
            "title": "System Design Interview",
            "type": "video"
          }
        ],
        "label": "Learning through project involvement",
        "recommendations": [
          "You could take a system design course",
          "Practice designing small systems - could work if you're working for a smaller company or personel project",
          "Study real-world architectures"
        ],
        "mentorExplanation": "Hands-on learning is effective, but study the patterns behind what you're building. Why this database? Why this architecture? Understanding the 'why' makes you dangerous - you can apply it to new problems."
      },
      {
        "mentorExplanation": "Distributed systems expertise is rare. You understand CAP theorem isn't theoretical - it's every day trade-offs. Share this knowledge; most developers never work at this level. Write, speak, mentor. Your experience is valuable.",
        "recommendations": [
          "Share your architecture knowledge with your fellow devs - maybe in a tech talk"
        ],
        "isCorrect": true,
        "label": "I design complex distributed systems and set architectural direction",
        "scoreWeight": 1,
        "resources": [
          {
            "title": "Papers We Love",
            "description": "Computer science papers",
            "type": "article",
            "url": "https://paperswelove.org/"
          }
        ],
        "value": "expert"
      },
      {
        "mentorExplanation": "Even small tasks involve design choices. Start thinking architecturally: why this approach over that one? What if this needed to handle 10x traffic? Ask these questions; they'll change how you code.",
        "label": "No experience, I work on assigned tasks",
        "recommendations": [
          "Start studying basic software architecture patterns",
          "Learn about system design fundamentals",
          "Read about design principles - see the provided resources as a guide"
        ],
        "resources": [
          {
            "url": "https://github.com/donnemartin/system-design-primer",
            "title": "System Design Primer",
            "type": "github",
            "description": "Comprehensive system design guide"
          },
          {
            "title": "Design Patterns Explained",
            "type": "article",
            "url": "https://refactoring.guru/design-patterns"
          }
        ],
        "scoreWeight": 0.25,
        "value": "none"
      },
      {
        "label": "I only have experience with monolithic architectures",
        "recommendations": [
          "Spend time learning microservices patterns",
          "Study distributed systems concepts",
          "Understand service boundaries",
          "Learn API design"
        ],
        "mentorExplanation": "Monoliths get a bad rap but they're often the right choice - simple, fast to develop, easy to debug. Learn microservices so you understand the trade-offs, not because you need to use them everywhere. Many 'microservices' should have stayed monoliths.",
        "value": "monolith-only",
        "scoreWeight": 0.7,
        "resources": [
          {
            "type": "article",
            "title": "Monolith vs Microservices",
            "url": "https://martinfowler.com/articles/microservices.html"
          }
        ]
      },
      {
        "value": "architect",
        "scoreWeight": 0.92,
        "resources": [
          {
            "title": "Distributed Systems",
            "type": "course",
            "url": "https://www.distributed-systems.net/"
          },
          {
            "url": "https://martinfowler.com/",
            "title": "Martin Fowler's Blog",
            "description": "Architecture insights",
            "type": "article"
          }
        ],
        "label": "I design and architect systems",
        "recommendations": [
          "Mentor others in architecture - you coulld share with your team",
          "Try to always document architectural decisions",
          "Study distributed systems"
        ],
        "isCorrect": true,
        "mentorExplanation": "System-level thinking is your strength. You're balancing requirements, constraints, and trade-offs. Keep learning patterns, but also teach your process - how you think through design problems is more valuable than the solutions themselves."
      },
      {
        "value": "copy-paste",
        "isCommonMistake": true,
        "resources": [
          {
            "url": "https://github.com/kamranahmedse/design-patterns-for-humans",
            "description": "Simple design pattern explanations",
            "title": "Design Patterns for Humans",
            "type": "github"
          },
          {
            "url": "https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design",
            "title": "SOLID Principles",
            "type": "article"
          },
          {
            "title": "Refactoring Guru",
            "type": "docs",
            "description": "Design patterns and refactoring",
            "url": "https://refactoring.guru/"
          }
        ],
        "scoreWeight": 0.1,
        "recommendations": [
          "Think about learning fundamental design principles",
          "Always understand before implementing as much as possible",
          "Go deeper into why solutions work",
          "Build foundational knowledge"
        ],
        "label": "I mostly copy solutions from Stack Overflow without understanding design",
        "mentorExplanation": "Copying code without understanding is like copying someone's homework - you miss the learning. Before implementing a solution, understand the problem it solves. Why does this work? What would break it? That understanding is what separates developers from coders."
      },
      {
        "resources": [
          {
            "type": "article",
            "title": "YAGNI Principle",
            "url": "https://martinfowler.com/bliki/Yagni.html"
          },
          {
            "url": "https://www.infoq.com/presentations/Simple-Made-Easy/",
            "type": "video",
            "description": "Classic Rich Hickey talk",
            "title": "Simple Made Easy"
          }
        ],
        "scoreWeight": 0.4,
        "isCommonMistake": true,
        "value": "over-engineer",
        "mentorExplanation": "Complexity is easy; simplicity is hard. Build for today's requirements, not imagined future ones. Every abstraction layer you add is cognitive overhead for everyone. YAGNI (You Aren't Gonna Need It) isn't about being lazy - it's about being pragmatic.",
        "label": "I tend to over-engineer solutions with unnecessary complexity",
        "recommendations": [
          "Practice YAGNI principle",
          "Start simple, evolve as needed",
          "Learn when to add/remove abstraction",
          "Focus on solving actual problems"
        ]
      }
    ],
    "followUpQuestion": "",
    "category": "Problem Solving & Debugging",
    "allowOther": true
  },
  {
    "id": "3bf9aa2c-9065-4a9b-b022-49e7a44ef015",
    "allowOther": true,
    "followUpQuestion": "",
    "category": "Problem Solving & Debugging",
    "type": "multiple-choice",
    "title": "How comfortable are you with debugging complex issues?",
    "options": [
      {
        "mentorExplanation": "You're thinking systematically, which is the right foundation. The next step is building deeper mental models - when you understand how the system works underneath, debugging becomes pattern recognition. Keep pushing into the harder bugs; that's where the real learning happens.",
        "isCorrect": true,
        "recommendations": [
          "Learn advanced debugging patterns",
          "Study memory profiling",
          "Practice debugging production issues"
        ],
        "label": "I can solve most issues with research and systematic debugging",
        "resources": [
          {
            "url": "https://www.youtube.com/watch?v=_Wp68Y9cc_U",
            "title": "Advanced Debugging Techniques",
            "type": "video"
          },
          {
            "title": "Memory Profiling",
            "type": "docs",
            "url": "https://developer.chrome.com/docs/devtools/memory-problems/"
          },
          {
            "url": "https://github.com/goldbergyoni/nodebestpractices#6-going-to-production-practices",
            "title": "Production Debugging",
            "type": "github"
          }
        ],
        "scoreWeight": 0.7,
        "value": "intermediate"
      },
      {
        "mentorExplanation": "Async code trips everyone up at first. The trick is understanding that async stack traces work differently - DevTools can show them if you enable async stack tracing. Also, get really comfortable with the event loop; once you see how promises queue up, async bugs make way more sense.",
        "label": "I use logging extensively but struggle with complex async issues",
        "recommendations": [
          "Learn async debugging techniques if you haven't yet",
          "Master promise rejection handling",
          "Use async stack traces - look it up",
          "Learn event loop debugging"
        ],
        "resources": [
          {
            "url": "https://developer.chrome.com/blog/async-call-stack/",
            "type": "article",
            "title": "Async Debugging in Chrome"
          },
          {
            "url": "https://www.youtube.com/watch?v=8aGhZQkoFbQ",
            "title": "Understanding the Event Loop",
            "description": "Classic event loop explanation",
            "type": "video"
          },
          {
            "type": "article",
            "title": "Debugging Promises",
            "url": "https://javascript.info/promise-error-handling"
          }
        ],
        "scoreWeight": 0.55,
        "value": "use-logging"
      },
      {
        "resources": [
          {
            "title": "Writing Technical Posts",
            "type": "article",
            "url": "https://www.freecodecamp.org/news/how-to-write-a-great-technical-blog-post-414c414b67f6/"
          },
          {
            "type": "article",
            "title": "System-Level Debugging",
            "url": "https://jvns.ca/blog/2021/04/03/what-problems-do-people-solve-with-strace/"
          }
        ],
        "scoreWeight": 1,
        "value": "expert",
        "mentorExplanation": "This level of debugging skill is rare and valuable. You've built the intuition that lets you jump between layers - from application code down to network packets. Share what you know; most developers never learn to think across the full stack like this.",
        "label": "I excel at debugging across all levels (code, network, system)",
        "recommendations": [
          "You may want to try creating debugging workshops",
          "Write technical blog posts - it's really good for networking and sharing knowledge",
          "Build internal debugging tools"
        ],
        "isCorrect": true
      },
      {
        "mentorExplanation": "Console.log works, but you're missing out on huge time savings. The debugger lets you pause execution and inspect everything at that moment - way faster than littering code with logs. Spend an hour learning DevTools breakpoints and you'll never look back.",
        "recommendations": [
          "Learn to use Chrome DevTools debugger and get the most of it",
          "Practice reading stack traces",
          "Study systematic debugging approaches - very helpful in most debugging cases"
        ],
        "label": "I mostly use console.log and get stuck often",
        "isCommonMistake": true,
        "scoreWeight": 0.1,
        "resources": [
          {
            "type": "docs",
            "description": "Master browser debugging",
            "title": "Chrome DevTools Tutorial",
            "url": "https://developer.chrome.com/docs/devtools/"
          },
          {
            "url": "https://javascript.info/debugging-chrome",
            "type": "article",
            "title": "Debugging JavaScript"
          },
          {
            "url": "https://code.visualstudio.com/docs/editor/debugging",
            "type": "docs",
            "title": "VS Code Debugging"
          }
        ],
        "value": "console-only"
      },
      {
        "value": "reproduce-first",
        "resources": [],
        "scoreWeight": 0.82,
        "isCorrect": true,
        "recommendations": [
          "Document reproduction steps",
          "Create automated tests from bugs",
          "Build debugging test suites",
          "Share reproduction techniques"
        ],
        "label": "I focus on reproducing issues reliably before fixing them",
        "mentorExplanation": "This is the right instinct. A bug you can reproduce consistently is already halfway fixed. The developers who skip this step end up with bugs that resurface later. Bonus points if you turn your reproduction steps into a test case before fixing."
      },
      {
        "resources": [
          {
            "url": "https://blog.regehr.org/archives/199",
            "type": "article",
            "description": "Systematic debugging strategies",
            "title": "Debugging Techniques"
          },
          {
            "url": "https://developer.chrome.com/blog/async-call-stack/",
            "title": "Async Debugging",
            "type": "article"
          },
          {
            "title": "Problem Solving Patterns",
            "type": "article",
            "url": "https://www.freecodecamp.org/news/how-to-think-like-a-programmer-lessons-in-problem-solving-d1d8bf1de7d2/"
          }
        ],
        "scoreWeight": 0.4,
        "value": "basic-tools",
        "mentorExplanation": "Breakpoints are good, but debugging is more about strategy than tools. When you hit a complex bug, narrow down where it's happening first (binary search: is it in this half of the code or that half?). Then zoom in. Most developers go too deep too fast.",
        "label": "I use debugger breakpoints but struggle with complex issues",
        "recommendations": [
          "Learn to trace through async code and try to apply it in your everyday work",
          "Practice binary search debugging",
          "Study error patterns"
        ]
      },
      {
        "value": "struggle-alone",
        "isCommonMistake": true,
        "resources": [
          {
            "url": "https://en.wikipedia.org/wiki/Rubber_duck_debugging",
            "description": "Explain problems out loud to solve them",
            "type": "article",
            "title": "Rubber Duck Debugging"
          },
          {
            "url": "https://stackoverflow.com/help/how-to-ask",
            "title": "How to Ask Good Questions",
            "type": "docs",
            "description": "Get better help by asking better questions"
          }
        ],
        "scoreWeight": 0.25,
        "recommendations": [
          "Learn when to ask for help - you might not do it as much as you should or do it too much:)",
          "Practice rubber duck debugging",
          "Set time limits for independent debugging",
          "Build debugging documentation habits"
        ],
        "label": "I struggle with issues alone for extended periods",
        "mentorExplanation": "Independence is good, but there's a difference between persistence and stubbornness. If you've been stuck for an hour, you're probably missing context. Talk it through with someone (or a rubber duck). The act of explaining often surfaces the issue, and fresh eyes catch things you've gone blind to."
      },
      {
        "mentorExplanation": "Strong debugging chops. You know when to use the profiler versus the network tab versus stepping through code. This skill multiplies when you teach it - showing junior devs your process makes them way more effective and takes pressure off you.",
        "recommendations": [
          "Mentor other developers in your team in debugging",
          "Document debugging strategies",
          "Create debugging tools"
        ],
        "isCorrect": true,
        "label": "I independently solve complex issues using multiple techniques",
        "resources": [],
        "scoreWeight": 0.92,
        "value": "advanced"
      }
    ],
    "hint": "Think about your systematic approach, tool usage, and problem isolation skills"
  },
  {
    "id": "3fb989a1-894a-405c-8096-f4660087cf42",
    "title": "How would you describe your approach to experimenting with solutions and implementing fixes?",
    "type": "multiple-choice",
    "options": [
      {
        "label": "I rarely experiment with different solutions. I'm worried about breaking things and need exact examples to follow.",
        "recommendations": [
          "Set up a safe development environment",
          "Learn to use Git properly to safely experiment",
          "Practice making small changes and testing",
          "Pair with someone while experimenting"
        ],
        "mentorExplanation": "Fear of breaking things is common but limiting! Use Git branches - you can always undo. Start with small experiments in isolated components. Breaking things in development is how you learn.",
        "value": "experiment1",
        "resources": [
          {
            "title": "Git Branches Tutorial",
            "type": "course",
            "description": "Safe experimentation with Git",
            "url": "https://learngitbranching.js.org/"
          },
          {
            "description": "Safe dev environment",
            "type": "docs",
            "title": "Local Development Setup",
            "url": "https://create-react-app.dev/docs/getting-started"
          }
        ],
        "scoreWeight": 0.1
      },
      {
        "value": "experiment2",
        "scoreWeight": 0.2,
        "resources": [
          {
            "url": "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction",
            "description": "Understanding API documentation",
            "type": "docs",
            "title": "Reading API Docs"
          }
        ],
        "label": "I sometimes try different solutions but often stick to familiar approaches. I need clear examples to implement.",
        "recommendations": [
          "Practice implementing from documentation",
          "Try 2-3 approaches before choosing one",
          "Build confidence with version control",
          "Learn to read API documentation effectively"
        ],
        "mentorExplanation": "Start building experimentation muscles! Before copying code, try implementing from docs first. Spend 20 minutes experimenting, then look for examples. You'll be surprised how much you can figure out."
      },
      {
        "resources": [
          {
            "title": "Project-Based Learning",
            "type": "github",
            "description": "Build to learn",
            "url": "https://github.com/practical-tutorials/project-based-learning"
          },
          {
            "description": "Practice problems",
            "title": "Exercism",
            "type": "course",
            "url": "https://exercism.org/"
          }
        ],
        "scoreWeight": 0.3,
        "value": "experiment3",
        "mentorExplanation": "You're building confidence! Challenge yourself to implement before searching. Read docs, try an approach, debug it. Examples are learning aids, not crutches.",
        "label": "I experiment with solutions but prefer having examples nearby. I can implement from docs with some guidance.",
        "recommendations": [
          "Practice implementing features from scratch",
          "Study multiple implementation approaches",
          "Build small projects without tutorials",
          "Learn to adapt examples to different contexts"
        ]
      },
      {
        "label": "I often experiment with different approaches. I can implement from documentation for simpler problems.",
        "recommendations": [
          "Tackle more complex implementation challenges - don't be afraid to risk it. You can ask for help if totally blocked",
          "Practice debugging your experiments",
          "Study design patterns and apply them",
          "Build features using only official docs"
        ],
        "mentorExplanation": "Good experimentation habit! Push boundaries - try complex features, experiment with architectures. Your willingness to try things is becoming a strength. Keep building that muscle.",
        "value": "experiment4",
        "resources": [
          {
            "type": "docs",
            "description": "Learning from docs",
            "title": "React Docs Beta",
            "url": "https://react.dev/"
          }
        ],
        "scoreWeight": 0.4
      },
      {
        "resources": [
          {
            "url": "https://web.dev/performance/",
            "title": "Web Performance",
            "description": "Performance optimization",
            "type": "docs"
          },
          {
            "url": "https://docs.github.com/en/discussions",
            "title": "GitHub Discussions",
            "type": "docs",
            "description": "Community problem solving"
          }
        ],
        "scoreWeight": 0.5,
        "value": "experiment5",
        "mentorExplanation": "Strong intermediate capability! You have healthy experimentation habits. Now tackle problems without existing solutions. Read RFCs, specs, source code. Trust your ability to figure things out.",
        "recommendations": [
          "Solve problems without Stack Overflow or AI:)",
          "Experiment with performance optimizations",
          "Try alternative libraries and approaches if time allows or do it on your free time",
          "Practice researching from primary sources"
        ],
        "label": "I regularly experiment with solutions and am comfortable trying different approaches. I can implement most features from documentation."
      },
      {
        "value": "experiment6",
        "scoreWeight": 0.6,
        "resources": [
          {
            "description": "Documentation community",
            "type": "docs",
            "title": "Write the Docs",
            "url": "https://www.writethedocs.org/"
          },
          {
            "title": "Dev.to",
            "type": "article",
            "description": "Share your experiments",
            "url": "https://dev.to/"
          },
          {
            "description": "From How comfortable are you with debugging complex issues? - I excel at debugging across all levels (code, network, system)",
            "title": "Writing Technical Posts",
            "type": "article",
            "url": "https://www.freecodecamp.org/news/how-to-write-a-great-technical-blog-post-414c414b67f6/"
          }
        ],
        "label": "I confidently experiment without fear of breaking things. I solve problems using documentation and source code even without online examples.",
        "recommendations": [
          "Contribute solutions to help others if possible",
          "Experiment with cutting-edge features",
          "Build proof-of-concepts for new approaches",
          "Document your experimental process"
        ],
        "mentorExplanation": "Advanced! You solve novel problems by going to primary sources. Share your experiments - blog about approaches, contribute examples to docs. Your experimentation helps others tackle similar challenges."
      },
      {
        "label": "I excel at experimental problem-solving. I regularly implement solutions from specs, and source code without existing examples.",
        "recommendations": [
          "Keep improving your ability to test ideas quickly so you can confirm what works and what doesn’t.",
          "Document your solutions so others can reuse them when there are no examples available.",
          "Strengthen your understanding of core patterns so you can build solutions faster from scratch."
        ],
        "mentorExplanation": "Excellent! You're comfortable in uncharted territory. Share your process - how you approach unknowns, evaluate experiments, decide when to pivot. This mindset is invaluable for teams tackling novel problems.",
        "value": "experiment7",
        "resources": [
          {
            "description": "Document experiments",
            "title": "Architecture Decision Records",
            "type": "docs",
            "url": "https://adr.github.io/"
          },
          {
            "title": "IETF RFCs",
            "description": "Technical specifications",
            "type": "docs",
            "url": "https://www.ietf.org/standards/rfcs/"
          }
        ],
        "scoreWeight": 0.7
      },
      {
        "recommendations": [
          "Keep documenting your experiments so others can understand and reuse your solutions.",
          "Focus on making your contributions to libraries stable, simple, and easy to adopt.",
          "Share your problem-solving approach so the team can learn how to handle complex or new situations."
        ],
        "label": "I have expert-level experimentation skills. I solve complex problems by implementing from specs, contributing to libraries, and creating novel solutions.",
        "mentorExplanation": "Senior/expert level! You create solutions where none exist. Build organizational capability - establish experimentation frameworks, create proof-of-concept processes, mentor fearless experimentation.",
        "value": "experiment8",
        "scoreWeight": 0.8,
        "resources": [
          {
            "url": "https://opensource.guide/how-to-contribute/",
            "type": "docs",
            "title": "Contributing to Open Source",
            "description": "OSS contribution guide"
          },
          {
            "url": "https://paperswelove.org/",
            "type": "article",
            "title": "Research Papers",
            "description": "Academic computer science"
          }
        ]
      },
      {
        "mentorExplanation": "Outstanding! Your experiments push boundaries. Amplify impact - contribute to TC39 proposals, create influential libraries, publish papers. Your work shapes how others approach problems.",
        "label": "I have mastery-level experimentation skills. I innovate solutions, contribute to specifications, and solve problems requiring original research.",
        "recommendations": [
          "You might be able to contribute to language/framework evolution",
          "Mentor next-generation problem solvers like our junior devs or the students"
        ],
        "resources": [
          {
            "description": "Shape JavaScript",
            "type": "github",
            "title": "TC39 Contributing",
            "url": "https://github.com/tc39/how-we-work"
          },
          {
            "title": "ACM Queue",
            "description": "Research publication",
            "type": "article",
            "url": "https://queue.acm.org/"
          }
        ],
        "scoreWeight": 0.9,
        "value": "experiment9"
      },
      {
        "value": "experiment10",
        "resources": [
          {
            "url": "https://research.google/",
            "type": "article",
            "description": "Cutting-edge research",
            "title": "Google Research"
          },
          {
            "url": "https://www.csail.mit.edu/",
            "description": "Computer science research",
            "title": "MIT CSAIL",
            "type": "article"
          }
        ],
        "scoreWeight": 1,
        "recommendations": [
          "Focus on making your experimental solutions stable and easy for others to use in real projects.",
          "Share your findings clearly so the team can learn from your experiments and avoid repeating work.",
          "Validate new ideas with real-world use to make sure they bring practical value, not just technical novelty."
        ],
        "label": "I have strong experimentation and innovation skills. I create new solutions and improve existing approaches.",
        "mentorExplanation": "Exceptional! Your experiments become standards. You solve problems that define new categories. Focus on generational impact - create frameworks used by millions, establish new paradigms, invest in education."
      }
    ],
    "hint": "Consider: willingness to try different approaches, experimenting without fear of breaking things, implementing from documentation, solving problems not on Stack Overflow",
    "followUpQuestion": "",
    "category": "Problem Solving & Debugging"
  },
  {
    "id": "41fe2c4f-ee6a-440a-be55-e8cdaea27ac5",
    "allowOther": true,
    "category": "Communication",
    "options": [
      {
        "recommendations": [
          "Document decision-making processes",
          "Facilitate technical discussions",
          "Use RFCs for big decisions"
        ],
        "isCorrect": true,
        "label": "I discuss openly and seek consensus",
        "mentorExplanation": "Open discussion works because everyone's input gets heard and weighed. The consensus process builds buy-in - people support decisions they helped shape. Document the reasoning; future-you will appreciate knowing why that choice was made.",
        "value": "discuss",
        "resources": [
          {
            "description": "Example RFC process",
            "title": "RFC Process",
            "type": "github",
            "url": "https://github.com/rust-lang/rfcs"
          },
          {
            "type": "docs",
            "title": "Architecture Decision Records",
            "url": "https://adr.github.io/"
          },
          {
            "url": "https://www.youtube.com/watch?v=jsNnlu0B1-0",
            "type": "video",
            "title": "Technical Discussions"
          }
        ],
        "scoreWeight": 0.7
      },
      {
        "mentorExplanation": "Experience matters, but junior doesn't mean wrong. You might see something they missed. Frame it as questions if that's easier: 'What about X approach?' or 'Have we considered Y?' That's how you learn and sometimes you'll be right.",
        "label": "I usually defer to more senior developers",
        "recommendations": [
          "Build confidence in your opinions",
          "Prepare data to support your views",
          "Ask clarifying questions"
        ],
        "resources": [
          {
            "type": "article",
            "title": "Disagree and Commit",
            "url": "https://en.wikipedia.org/wiki/Disagree_and_commit"
          },
          {
            "url": "https://www.youtube.com/watch?v=jsNnlu0B1-0",
            "type": "video",
            "title": "Technical Decision Making"
          },
          {
            "url": "https://charity.wtf/2019/01/04/engineering-management-the-pendulum-or-the-ladder/",
            "title": "Building Technical Confidence",
            "type": "article"
          }
        ],
        "scoreWeight": 0.55,
        "isCommonMistake": true,
        "value": "defer"
      },
      {
        "resources": [],
        "scoreWeight": 0.92,
        "value": "data-driven",
        "mentorExplanation": "This is the engineering approach - let data decide. Quick POCs settle debates fast and everyone learns something regardless of the outcome. 'Let's test both and measure' beats endless debate every time.",
        "label": "I resolve disagreements with data, experiments, and proof-of-concepts",
        "isCorrect": true,
        "recommendations": [
          "Teach data-driven decision making",
          "Build experimentation culture",
          "Create decision frameworks",
          "Document outcomes"
        ]
      },
      {
        "value": "avoid",
        "resources": [],
        "scoreWeight": 0.1,
        "label": "I tend to avoid confrontation and stay quiet",
        "recommendations": [
          "Practice assertive communication",
          "Learn conflict resolution skills",
          "Prepare your points beforehand"
        ],
        "mentorExplanation": "Staying quiet means missing opportunities to improve the work. Your different perspective has value. Start small - share one concern as a question. Most technical disagreements aren't personal; they're about finding the best solution."
      },
      {
        "scoreWeight": 0.82,
        "resources": [
          {
            "url": "https://www.atlassian.com/team-playbook/plays",
            "type": "docs",
            "title": "Facilitation Skills"
          }
        ],
        "value": "facilitate",
        "mentorExplanation": "Facilitating disagreements is leadership - you're helping people talk through problems productively. Good facilitators summarize positions, find common ground, and keep discussions on track. Teams need this skill badly.",
        "label": "I facilitate productive discussions and help find balanced solutions",
        "recommendations": [
          "Mentor others in communication",
          "Create decision frameworks",
          "Document patterns"
        ],
        "isCorrect": true
      },
      {
        "value": "stubborn",
        "isCommonMistake": true,
        "scoreWeight": 0.4,
        "resources": [
          {
            "title": "Disagree Better",
            "type": "video",
            "url": "https://www.youtube.com/watch?v=kgk0q7OyC6Y"
          }
        ],
        "recommendations": [
          "Practice intellectual humility",
          "Seek contrary evidence",
          "Learn disagreement frameworks",
          "Focus on outcomes over ego"
        ],
        "label": "I strongly defend my ideas and rarely change my mind",
        "mentorExplanation": "Being right feels good, but being effective matters more. The best engineers change their minds when shown better evidence. Try this: actively look for reasons your idea might be wrong before defending it. Ego is expensive."
      },
      {
        "mentorExplanation": "Leading technical decisions means balancing many inputs and driving to resolution. You're not dictating; you're synthesizing viewpoints and making the call when needed. Document the rationale - decisions made with incomplete information need context for future readers.",
        "recommendations": [
          "Establish decision-making processes",
          "Coach others in healthy disagreement",
          "Scale your influence"
        ],
        "isCorrect": true,
        "label": "I lead technical discussions and help teams make informed decisions",
        "scoreWeight": 1,
        "resources": [
          {
            "title": "Staff Engineer's Path",
            "type": "book",
            "url": "https://www.oreilly.com/library/view/the-staff-engineers/9781098118723/"
          },
          {
            "url": "https://www.youtube.com/watch?v=jsNnlu0B1-0",
            "title": "Technical Decision Making",
            "type": "video"
          },
          {
            "title": "Leading Without Authority",
            "type": "article",
            "url": "https://charity.wtf/2020/09/06/if-management-isnt-a-promotion-then-engineering-isnt-a-demotion/"
          }
        ],
        "value": "lead"
      },
      {
        "mentorExplanation": "This pattern kills team trust and makes problems worse. If you disagree, say so in the room with your reasoning. 'Disagree and commit' means voicing concerns, then supporting the decision once made. Silent resentment helps no one.",
        "recommendations": [
          "Practice direct communication",
          "Learn to disagree constructively",
          "Build trust with team",
          "Address concerns openly"
        ],
        "label": "I agree publicly but express concerns privately or ignore decisions",
        "isCommonMistake": true,
        "scoreWeight": 0.25,
        "resources": [
          {
            "title": "Disagree and Commit",
            "type": "article",
            "url": "https://en.wikipedia.org/wiki/Disagree_and_commit"
          },
          {
            "url": "https://www.radicalcandor.com/",
            "title": "Radical Candor",
            "type": "book",
            "description": "Direct and kind communication"
          }
        ],
        "value": "passive-aggressive"
      }
    ],
    "hint": "Healthy disagreement drives better solutions. It's about the best outcome, not being right.",
    "title": "How do you handle technical disagreements with team members?",
    "type": "multiple-choice"
  },
  {
    "id": "45cfd434-ca62-428d-bfec-b8449de9b8a6",
    "type": "multiple-choice",
    "title": "How do you typically approach solving a new technical problem?",
    "options": [
      {
        "value": "systematic",
        "resources": [
          {
            "url": "https://www.interaction-design.org/literature/article/5-stages-in-the-design-thinking-process",
            "title": "Design Thinking Process",
            "type": "article"
          },
          {
            "url": "https://www.youtube.com/watch?v=JMjozqJS44M",
            "title": "Rapid Prototyping",
            "type": "video"
          }
        ],
        "scoreWeight": 0.8,
        "label": "I use systematic approaches: break down, research, prototype, iterate",
        "isCorrect": true,
        "recommendations": [
          "Have you heard of advanced problem-solving patterns? I suggest learning about it",
          "Study design patterns",
          "Mentor others in problem-solving"
        ],
        "mentorExplanation": "Systematic problem-solving: break it down, research similar problems, prototype quickly, iterate. That's professional engineering. Your process is as valuable as your code. Teach others - many developers skip straight to coding and waste time."
      },
      {
        "isCommonMistake": true,
        "resources": [],
        "scoreWeight": 0.35,
        "value": "google-copy",
        "mentorExplanation": "Searching is smart. Blindly copying code you don't understand is not. What happens when you hit a similar problem and Stack Overflow doesn't have the exact answer? Understand WHY solutions work. Build mental models, not code collections.",
        "recommendations": [
          "Always understand before copying",
          "Build problem-solving skills",
          "Learn underlying concepts"
        ],
        "label": "Search for solutions and adapt code I find"
      },
      {
        "recommendations": [
          "Share problem-solving frameworks with your fellow devs or our students",
          "Mentor in technical decision-making if you have the capacity",
          "Write about your process"
        ],
        "isCorrect": true,
        "label": "I consider trade-offs, constraints, and impact before proposing solutions",
        "mentorExplanation": "Engineering, not just coding. You consider trade-offs (speed vs maintainability), constraints (time, resources, existing tech), impact (users, team, business). There's no perfect solution, only appropriate ones. This thinking is leadership.",
        "value": "holistic",
        "scoreWeight": 1,
        "resources": [
          {
            "url": "https://adr.github.io/",
            "type": "docs",
            "title": "Architecture Decision Records"
          }
        ]
      },
      {
        "value": "trial-error",
        "resources": [
          {
            "title": "How to Think Like a Programmer",
            "type": "article",
            "url": "https://www.freecodecamp.org/news/how-to-think-like-a-programmer-lessons-in-problem-solving-d1d8bf1de7d2/"
          },
          {
            "type": "video",
            "title": "Problem Solving Techniques",
            "url": "https://www.youtube.com/watch?v=azcrPFhaY9k"
          }
        ],
        "scoreWeight": 0.15,
        "isCommonMistake": true,
        "label": "Trial and error until something works",
        "recommendations": [
          "Learn systematic problem-solving and apply it to your daily work",
          "Study debugging strategies",
          "Practice breaking down problems"
        ],
        "mentorExplanation": "Random trial and error is slow and frustrating. Learn systematic approaches: understand the problem, break it down, form hypotheses, test them methodically. Rubber duck debugging (explaining the problem out loud) often reveals the solution."
      },
      {
        "resources": [
          {
            "url": "https://www.youtube.com/watch?v=rL8X2mlNHPM",
            "type": "video",
            "title": "Algorithmic Thinking"
          },
          {
            "type": "article",
            "title": "Problem Decomposition",
            "url": "https://www.freecodecamp.org/news/how-to-think-like-a-programmer-lessons-in-problem-solving-d1d8bf1de7d2/"
          }
        ],
        "scoreWeight": 0.6,
        "value": "understand-first",
        "mentorExplanation": "Understanding the problem is half the battle. 'Weeks of coding can save hours of planning.' Write down the problem, identify constraints, consider edge cases before touching code. Many bugs come from solving the wrong problem.",
        "isCorrect": true,
        "recommendations": [
          "Learn design thinking",
          "Practice problem decomposition",
          "Study algorithmic thinking"
        ],
        "label": "I try to understand the problem fully before coding"
      }
    ],
    "hint": "Your problem-solving process matters as much as the solution",
    "allowOther": true,
    "followUpQuestion": "",
    "category": "Problem Solving & Debugging"
  },
  {
    "id": "508d2420-afc9-4d59-a189-78e0bf2e00f0",
    "options": [
      {
        "label": "I sometimes miss or forget review comments",
        "recommendations": [
          "Create a checklist from review comments before starting fixes - check off each one as you address it",
          "Use GitHub's 'resolve conversation' feature only after actually implementing the feedback",
          "If you don't understand a comment, reply immediately asking for clarification rather than guessing",
          "Set aside focused time to address all feedback at once instead of doing it piecemeal"
        ],
        "mentorExplanation": "It's easy to feel overwhelmed by code review feedback, especially when there's a lot of it. The key is treating reviews as a checklist, not a judgment. Go through each comment methodically - address it, mark it resolved, or ask for clarification if you don't understand. Missing comments frustrates reviewers and delays your work. Build a simple system to track them.",
        "value": "struggle",
        "scoreWeight": 0.15,
        "resources": [
          {
            "description": "Practical guide to receiving and acting on feedback",
            "title": "How to Handle Code Review Feedback",
            "type": "article",
            "url": "https://www.freecodecamp.org/news/code-review-tips/"
          },
          {
            "description": "How to receive feedback constructively",
            "type": "video",
            "title": "The Art of Receiving Feedback",
            "url": "https://www.youtube.com/watch?v=FQNbaKkYk_Q"
          },
          {
            "url": "https://github.com/mgreiler/code-review-checklist",
            "title": "Code Review Checklist",
            "description": "Common review points to check before submitting",
            "type": "github"
          }
        ]
      },
      {
        "mentorExplanation": "Asking for clarification is good - it shows you care about getting it right! The growth opportunity is learning to anticipate feedback before you get it. Start reviewing your own code as if you're a reviewer: Is this function too long? Are variable names clear? Is there error handling? The better your self-review, the less back-and-forth in reviews.",
        "label": "I address all feedback but sometimes need clarification",
        "recommendations": [
          "Before requesting review, do a self-review - read your code with fresh eyes and fix obvious issues",
          "Keep a personal list of feedback patterns you receive often and proactively fix those in future PRs",
          "When you need clarification, suggest a specific approach in your question to show you're thinking it through",
          "After addressing feedback, add a comment explaining your changes so reviewers can verify easily"
        ],
        "scoreWeight": 0.35,
        "resources": [
          {
            "description": "How to handle reviews from a developer's perspective",
            "title": "Google's Code Review Developer Guide",
            "type": "docs",
            "url": "https://google.github.io/eng-practices/review/developer/"
          },
          {
            "title": "Effective Pull Requests",
            "type": "article",
            "description": "How to make PRs easier to review",
            "url": "https://www.atlassian.com/blog/git/written-unwritten-guide-pull-requests"
          }
        ],
        "value": "basic"
      },
      {
        "value": "competent",
        "scoreWeight": 0.6,
        "resources": [
          {
            "title": "Thoughtful Code Review",
            "type": "article",
            "description": "Google's guide to respectful and constructive code reviews",
            "url": "https://testing.googleblog.com/2019/11/code-health-respectful-reviews-useful.html"
          },
          {
            "type": "article",
            "title": "How to Make Your Code Reviewer Fall in Love",
            "description": "Practical tips for better code reviews",
            "url": "https://mtlynch.io/code-review-love/"
          },
          {
            "url": "https://medium.com/@sandya.sankarram/unlearning-toxic-behaviors-in-a-code-review-culture-b7c295452a3c",
            "title": "Unlearning Toxic Behaviors in Code Review",
            "type": "article",
            "description": "Building healthy review culture"
          }
        ],
        "isCorrect": true,
        "recommendations": [
          "Keep a running doc of common feedback you've received - review it before starting new work",
          "When you disagree with feedback, explain your reasoning thoughtfully - 'I chose X because Y' - to start a productive discussion",
          "Look for patterns in your mistakes - if you often forget error handling, make it part of your pre-review checklist",
          "Thank reviewers for catching issues - it builds positive relationships and encourages thorough reviews"
        ],
        "label": "I proactively address feedback and learn from patterns",
        "mentorExplanation": "You're turning feedback into learning! When you see the same suggestion repeatedly, you internalize it and stop making that mistake. This is how you level up. The next step is engaging in discussion when you disagree respectfully - sometimes your approach is valid, and explaining your reasoning helps both you and the reviewer learn."
      },
      {
        "label": "I anticipate feedback, pre-emptively address issues, and engage in constructive discussion",
        "isCorrect": true,
        "recommendations": [
          "Document your self-review process so others can learn from your approach",
          "When you see junior developers struggling with feedback, offer to pair with them on addressing it",
          "Suggest team-wide patterns or linting rules for feedback that comes up repeatedly across the team",
          "Write thoughtful PR descriptions that pre-emptively explain decisions reviewers might question"
        ],
        "mentorExplanation": "You've internalized good practices to the point where your first draft already addresses most feedback. When discussions arise, you engage thoughtfully - sometimes accepting feedback, sometimes explaining valid alternatives. This is mature collaboration. Your next level is helping others develop this same approach through mentoring or documenting standards.",
        "value": "strong",
        "resources": [
          {
            "url": "https://www.youtube.com/watch?v=PJjmw9TRB7s",
            "title": "Building Effective Code Review Culture",
            "description": "Creating team standards and positive review culture",
            "type": "video"
          },
          {
            "title": "Engineering Practices Documentation",
            "description": "Google's comprehensive engineering practices",
            "type": "docs",
            "url": "https://google.github.io/eng-practices/"
          }
        ],
        "scoreWeight": 0.8
      },
      {
        "value": "expert",
        "resources": [
          {
            "url": "https://google.github.io/eng-practices/review/",
            "type": "docs",
            "description": "Comprehensive guide from Google Engineering",
            "title": "Code Review Best Practices"
          },
          {
            "url": "https://www.youtube.com/watch?v=NZR64EF3OpA",
            "description": "Influencing team culture through example",
            "title": "Leading Without Authority",
            "type": "video"
          }
        ],
        "scoreWeight": 0.95,
        "recommendations": [
          "Create team documentation about effective code review - both giving and receiving feedback",
          "Run workshops or lunch-and-learns on self-review techniques and how to engage with feedback constructively",
          "Establish review guidelines that balance thoroughness with velocity - help the team review efficiently",
          "Collect metrics on review quality and cycle time to continuously improve the process"
        ],
        "isCorrect": true,
        "label": "I conduct thorough self-review and mentor others on review best practices",
        "mentorExplanation": "You're not just receiving feedback well - you're raising the bar for the whole team. Your thorough self-review means reviewers spend time on architecture and design rather than catching bugs. Your mentoring spreads these practices. This is leadership. Keep documenting what works - your review philosophy becomes team culture."
      }
    ],
    "hint": "Code review is a learning opportunity, not criticism. How you respond shows growth mindset.",
    "type": "multiple-choice",
    "title": "How do you handle and incorporate code review feedback?",
    "category": "Precision & Attention to Detail",
    "followUpQuestion": "",
    "allowOther": true
  },
  {
    "id": "649c89e2-fff9-4697-8763-4ba7182ecfcf",
    "allowOther": true,
    "followUpQuestion": "",
    "category": "Collaboration",
    "type": "multiple-choice",
    "title": "How comfortable are you providing constructive feedback to teammates?",
    "hint": "Giving feedback well is a skill - it helps your team improve and builds trust",
    "options": [
      {
        "label": "I avoid giving critical feedback",
        "recommendations": [
          "Start with code review comments - they're written and asynchronous, which is less intimidating than face-to-face",
          "Use the 'feedback sandwich' initially: mention something good, suggest one improvement, end positive",
          "Focus feedback on specific, actionable changes - not vague statements like 'this could be better'",
          "Remember that withholding feedback prevents growth - your teammates want to improve"
        ],
        "mentorExplanation": "Avoiding feedback might feel polite, but it actually deprives your teammates of growth opportunities. Feedback isn't about being critical - it's about helping someone improve. Start small: in code reviews, point out one thing that could be better and explain why. Use 'I' language: 'I found this function hard to understand' instead of 'This is confusing.' Focus on the code, not the person.",
        "value": "struggle",
        "resources": [
          {
            "description": "Practical guide to giving feedback effectively",
            "title": "How to Give Constructive Feedback",
            "type": "video",
            "url": "https://www.youtube.com/watch?v=wtl5UrrgU8c"
          },
          {
            "title": "Radical Candor",
            "description": "Framework for caring personally while challenging directly",
            "type": "article",
            "url": "https://www.radicalcandor.com/"
          },
          {
            "url": "https://mtlynch.io/human-code-reviews-1/",
            "title": "Giving Better Code Review Feedback",
            "description": "How to review code like a human",
            "type": "article"
          }
        ],
        "scoreWeight": 0.15
      },
      {
        "label": "I provide feedback when asked",
        "recommendations": [
          "Practice giving unsolicited but constructive feedback once a week - start with small, easy-to-fix issues",
          "When you notice a problem, suggest a specific solution rather than just pointing out what's wrong",
          "Learn to read social cues - some people want detailed feedback, others want high-level guidance",
          "Balance critical feedback with positive observations - notice what people do well too"
        ],
        "mentorExplanation": "Giving feedback when asked is good - you're responsive! The next level is being proactive. When you see something that could be improved, speak up (kindly). Waiting to be asked means issues linger longer. The key is delivery: 'I noticed X, have you considered Y?' rather than 'You're doing X wrong.' Make it collaborative, not critical.",
        "value": "basic",
        "resources": [
          {
            "title": "The Art of Feedback",
            "description": "Framework for delivering effective feedback",
            "type": "article",
            "url": "https://larahogan.me/blog/feedback-equation/"
          },
          {
            "url": "https://www.penguinrandomhouse.com/books/313485/thanks-for-the-feedback-by-douglas-stone-and-sheila-heen/",
            "description": "Science and art of receiving and giving feedback",
            "type": "book",
            "title": "Thanks for the Feedback"
          },
          {
            "description": "Google's guide to reviewing code",
            "type": "docs",
            "title": "Code Review Best Practices",
            "url": "https://google.github.io/eng-practices/review/reviewer/"
          }
        ],
        "scoreWeight": 0.35
      },
      {
        "mentorExplanation": "You've found the balance: being direct while staying respectful. Your feedback is specific and actionable, not vague criticism. The next challenge is difficult conversations - giving feedback when emotions are high, or when someone is defensive. This requires even more skill: acknowledging their perspective, staying calm, focusing on impact rather than intent.",
        "isCorrect": true,
        "recommendations": [
          "Prepare for difficult feedback conversations - write down key points and practice framing them constructively",
          "Learn the SBI model: describe the Situation, the Behavior you observed, and the Impact it had",
          "When someone gets defensive, acknowledge their feelings before continuing the conversation",
          "Follow up after giving feedback - check in a week later to see how they're doing with the changes"
        ],
        "label": "I proactively give actionable, respectful feedback",
        "resources": [
          {
            "url": "https://www.vitalsmarts.com/crucial-conversations-book/",
            "type": "book",
            "title": "Crucial Conversations",
            "description": "Tools for talking when stakes are high"
          },
          {
            "description": "How to care personally and challenge directly",
            "title": "Radical Candor - The Full Picture",
            "type": "video",
            "url": "https://www.youtube.com/watch?v=yj9GLeNCgm4"
          },
          {
            "url": "https://hbr.org/2019/03/the-feedback-fallacy",
            "title": "The Feedback Fallacy",
            "description": "Rethinking how we give feedback (Harvard Business Review)",
            "type": "article"
          }
        ],
        "scoreWeight": 0.6,
        "value": "competent"
      },
      {
        "mentorExplanation": "You handle emotionally charged conversations with skill. You know how to deliver hard feedback in a way that maintains relationships and motivates change. This is rare and valuable. Your next level is building systems: helping your team create a culture where feedback flows naturally in all directions, not just top-down. Teach others these skills.",
        "isCorrect": true,
        "recommendations": [
          "Create opportunities for peer feedback - regular retrospectives, 360 reviews, or feedback sessions",
          "Model receiving feedback well - show the team that you actively seek and value their input",
          "Document feedback frameworks that work for your team - make good practices repeatable",
          "Mentor others specifically on giving difficult feedback - share your approach and thinking"
        ],
        "label": "I excel at difficult conversations and help others grow",
        "scoreWeight": 0.8,
        "resources": [
          {
            "url": "https://hbr.org/2021/05/building-a-feedback-rich-culture",
            "description": "Creating organizational feedback systems",
            "title": "Building a Feedback Culture",
            "type": "article"
          },
          {
            "description": "How to discuss what matters most",
            "type": "video",
            "title": "Difficult Conversations",
            "url": "https://www.youtube.com/watch?v=KMZnN3IEpFI"
          },
          {
            "type": "book",
            "description": "Secrets of highly successful groups",
            "title": "The Culture Code",
            "url": "https://danielcoyle.com/the-culture-code/"
          }
        ],
        "value": "strong"
      },
      {
        "mentorExplanation": "You're shaping how the entire team communicates. You've built systems where feedback is normal, expected, and valued - not feared. You train others to give feedback well, which multiplies your impact. This is leadership at its best. Keep sharing what works: the frameworks, the language, the mindsets that make feedback constructive rather than destructive.",
        "label": "I establish feedback culture and train others on giving feedback",
        "recommendations": [
          "Run regular workshops on feedback skills - make it part of onboarding and ongoing development",
          "Establish team norms around feedback - when, how, and in what format feedback should be given",
          "Collect data on feedback effectiveness - are people improving? Are relationships stronger?",
          "Share your feedback philosophy externally - write blog posts, give talks, help the broader community"
        ],
        "isCorrect": true,
        "scoreWeight": 0.95,
        "resources": [
          {
            "url": "https://www.ddorganizations.com/book",
            "description": "Building deliberately developmental organizations",
            "title": "An Everyone Culture",
            "type": "book"
          },
          {
            "url": "https://www.youtube.com/watch?v=4yODalLQ2lM",
            "title": "Kim Scott on Radical Candor",
            "description": "Full framework for building feedback culture",
            "type": "video"
          },
          {
            "title": "Project Aristotle - Psychological Safety",
            "description": "Google's research on team effectiveness and feedback",
            "type": "article",
            "url": "https://rework.withgoogle.com/print/guides/5721312655835136/"
          }
        ],
        "value": "expert"
      }
    ]
  },
  {
    "id": "66815188-14b6-4bfe-8210-c6785cc4cb62",
    "title": "How do you approach debugging issues in production environments?",
    "type": "multiple-choice",
    "options": [
      {
        "label": "I restart services and hope the problem goes away",
        "recommendations": [
          "Don't be afraid to spend time learning structured logging and apply it",
          "Study observability basics as it will help you debug faster",
          "Practice reading error logs"
        ],
        "mentorExplanation": "Restarting without understanding is dangerous - the problem will come back, maybe worse! Learn to investigate first. Add proper logging to understand what's happening. A restart is sometimes necessary, but always investigate the cause.",
        "value": "restart-hope",
        "resources": [],
        "scoreWeight": 0.15,
        "isCommonMistake": true
      },
      {
        "mentorExplanation": "Logs are great but fragmented across services they're hard to reason about! Learn about correlation IDs (trace a request across multiple services) and distributed tracing tools (Jaeger, Datadog APM). They connect the dots automatically.",
        "recommendations": [
          "Learn, understand and apply distributed tracing",
          "Practice timeline reconstruction from logs"
        ],
        "label": "I look at logs but struggle to connect events to root causes",
        "scoreWeight": 0.35,
        "resources": [
          {
            "url": "https://opentelemetry.io/docs/concepts/observability-primer/",
            "type": "docs",
            "title": "Distributed Tracing Guide"
          }
        ],
        "value": "logs-only"
      },
      {
        "recommendations": [
          "Look up the term \"chaos engineering\" ",
          "Learn advanced APM features"
        ],
        "isCorrect": true,
        "label": "I use logs, metrics, and traces systematically to isolate issues",
        "mentorExplanation": "Excellent! The three pillars - logs, metrics, traces - give you the full picture. Now build runbooks for common issues so your whole team can handle them. And study how to PREVENT production issues with chaos engineering.",
        "value": "systematic",
        "resources": [
          {
            "url": "https://principlesofchaos.org/",
            "title": "Chaos Engineering",
            "type": "docs"
          }
        ],
        "scoreWeight": 0.6
      },
      {
        "label": "I perform thorough post-mortems and implement preventive measures",
        "recommendations": [
          "Lead blameless post-mortems",
          "Build observability culture",
          "Design for debuggability from the start"
        ],
        "isCorrect": true,
        "mentorExplanation": "Excellent production engineering mindset! Post-mortems with preventive follow-through turn outages into improvements. Blameless culture is key - when people fear blame, they hide problems. You're building antifragile systems!",
        "value": "advanced",
        "resources": [
          {
            "type": "book",
            "title": "Google SRE Post-Mortem Culture",
            "url": "https://sre.google/sre-book/postmortem-culture/"
          }
        ],
        "scoreWeight": 0.8
      },
      {
        "isCorrect": true,
        "recommendations": [
          "Implement SLOs and error budgets",
          "Build internal observability tooling which will potentially be a useful tool for you and your team",
          "Train teams on incident response"
        ],
        "label": "I design systems with observability built-in and lead incident response culture",
        "mentorExplanation": "You're an SRE-level production expert! Observability-first design and strong incident culture are hallmarks of high-performing engineering organizations. Your expertise here directly impacts system reliability and user experience.",
        "value": "expert",
        "resources": [
          {
            "url": "https://sre.google/sre-book/service-level-objectives/",
            "type": "book",
            "title": "SLOs and Error Budgets"
          },
          {
            "url": "https://opentelemetry.io/",
            "type": "docs",
            "title": "OpenTelemetry"
          }
        ],
        "scoreWeight": 1
      }
    ],
    "hint": "Production bugs are harder - no breakpoints, real user data, and time pressure",
    "followUpQuestion": "",
    "category": "Problem Solving & Debugging",
    "allowOther": true
  },
  {
    "id": "6b3281b5-1898-4e38-8cc0-28b0d731b07a",
    "options": [
      {
        "value": "struggle",
        "resources": [
          {
            "description": "Introduction to testing principles",
            "type": "article",
            "title": "Testing Your Code",
            "url": "https://www.freecodecamp.org/news/testing-react-hooks/"
          },
          {
            "title": "Error Handling Best Practices",
            "description": "How to handle errors properly",
            "type": "article",
            "url": "https://www.joyent.com/node-js/production/design/errors"
          },
          {
            "url": "https://www.youtube.com/watch?v=MJUJ4wbFm_A",
            "type": "video",
            "title": "Development Environments",
            "description": "Setting up dev, staging, and production"
          }
        ],
        "scoreWeight": 0.15,
        "label": "I fix issues after deployment",
        "recommendations": [
          "Create a pre-deployment checklist: did I test it? Does it handle errors? Did I check the logs?",
          "Test your changes in a staging or development environment before production",
          "Learn to read application logs - they tell you what's breaking and why",
          "Add basic error handling - wrap risky operations in try/catch and log meaningful error messages"
        ],
        "mentorExplanation": "Debugging in production is stressful and expensive. The goal is to catch issues before users see them. Start simple: test your changes locally before deploying. Click through the feature. Try edge cases. Does it work with empty data? With lots of data? With bad data? These 5 minutes of testing save hours of firefighting later."
      },
      {
        "resources": [
          {
            "type": "docs",
            "title": "Jest Testing Framework",
            "description": "Learn to write automated tests",
            "url": "https://jestjs.io/docs/getting-started"
          },
          {
            "url": "https://github.com/goldbergyoni/javascript-testing-best-practices",
            "title": "Testing Best Practices",
            "type": "github",
            "description": "Comprehensive testing guide"
          },
          {
            "type": "article",
            "description": "Principles of robust code",
            "title": "Defensive Programming",
            "url": "https://en.wikipedia.org/wiki/Defensive_programming"
          }
        ],
        "scoreWeight": 0.35,
        "value": "basic",
        "mentorExplanation": "Local testing and checklists are great foundations! The next step is thinking about what happens in production that doesn't happen locally. Production has real users, real data, concurrent requests, network issues. Start adding defensive programming: validate inputs, handle missing data gracefully, add logging to track what's happening.",
        "recommendations": [
          "Write automated tests for critical paths - don't rely on manual testing alone",
          "Practice defensive programming - validate all inputs and handle edge cases explicitly",
          "Add logging at key points so you can debug issues when they happen in production",
          "Learn about different types of tests: unit tests for logic, integration tests for workflows"
        ],
        "label": "I test locally and follow the checklist"
      },
      {
        "label": "I use staging environments, monitoring, and rollback plans",
        "recommendations": [
          "Implement feature flags so you can enable features gradually and disable them if problems arise",
          "Set up automated alerts for errors and performance issues - don't wait for users to report problems",
          "Practice rollback procedures in staging so they're smooth under pressure",
          "Add health check endpoints to your services so monitoring tools can verify they're working"
        ],
        "isCorrect": true,
        "mentorExplanation": "You're thinking about production safety systematically! Staging environments catch integration issues, monitoring shows when things break, rollback plans reduce downtime. The next level is proactive reliability: feature flags for gradual rollouts, automated alerts for anomalies, chaos testing to find weaknesses before users do.",
        "value": "competent",
        "scoreWeight": 0.6,
        "resources": [
          {
            "type": "article",
            "title": "Feature Flags Best Practices",
            "description": "Using feature flags effectively",
            "url": "https://launchdarkly.com/blog/what-are-feature-flags/"
          },
          {
            "description": "Error tracking and monitoring",
            "type": "docs",
            "title": "Application Monitoring with Sentry",
            "url": "https://docs.sentry.io/"
          },
          {
            "type": "docs",
            "title": "The Twelve-Factor App",
            "description": "Methodology for building production apps",
            "url": "https://12factor.net/"
          }
        ]
      },
      {
        "label": "I implement feature flags, canary deployments, and comprehensive observability",
        "recommendations": [
          "Analyze production incidents to find patterns - turn each issue into a preventive measure",
          "Build circuit breakers and retry logic into your services - make them resilient to downstream failures",
          "Document your deployment and rollback procedures so the whole team can execute them confidently",
          "Practice chaos engineering - intentionally introduce failures to verify your systems can handle them"
        ],
        "isCorrect": true,
        "mentorExplanation": "You've built production systems with mature reliability practices. Feature flags let you control blast radius, canary deployments catch issues early, observability shows exactly what's happening. The expert level is about continuous improvement: using production data to prevent issues, building resilience into the architecture itself, teaching others these practices.",
        "value": "strong",
        "scoreWeight": 0.8,
        "resources": [
          {
            "title": "Site Reliability Engineering",
            "type": "book",
            "description": "Google's SRE book (free) - the definitive guide",
            "url": "https://sre.google/books/"
          },
          {
            "url": "https://principlesofchaos.org/",
            "title": "Chaos Engineering",
            "description": "Building confidence in system behavior",
            "type": "docs"
          },
          {
            "url": "https://www.honeycomb.io/what-is-observability",
            "title": "Observability Engineering",
            "type": "article",
            "description": "Understanding complex systems in production"
          }
        ]
      },
      {
        "mentorExplanation": "You're building systems that stay running even during deployments and failures. Zero-downtime deployments, automated failover, disaster recovery - this is what separates good systems from great ones. Your expertise is valuable not just in code, but in teaching others to think about reliability from the start. Document your approaches - they become organizational standards.",
        "label": "I design zero-downtime deployments and disaster recovery systems",
        "recommendations": [
          "Write post-incident reviews for every outage - focus on process improvements, not blame",
          "Build runbooks for common scenarios - what to do when X breaks, how to verify Y is healthy",
          "Establish SLOs (Service Level Objectives) and error budgets - make reliability measurable"
        ],
        "isCorrect": true,
        "resources": [
          {
            "url": "https://sre.google/workbook/table-of-contents/",
            "type": "book",
            "title": "Site Reliability Engineering Workbook",
            "description": "Practical SRE implementation (free from Google)"
          },
          {
            "url": "https://www.oreilly.com/library/view/database-reliability-engineering/9781491925935/",
            "type": "book",
            "description": "Managing data systems in production",
            "title": "Database Reliability Engineering"
          },
          {
            "type": "docs",
            "title": "AWS Well-Architected Framework",
            "description": "Operational excellence and reliability patterns",
            "url": "https://aws.amazon.com/architecture/well-architected/"
          }
        ],
        "scoreWeight": 0.95,
        "value": "expert"
      }
    ],
    "hint": "Production-ready means your code is tested, monitored, and handles failures gracefully",
    "type": "multiple-choice",
    "title": "How do you ensure your code is production-ready?",
    "category": "Precision & Attention to Detail",
    "followUpQuestion": "",
    "allowOther": true
  },
  {
    "id": "6ba15a35-5d3d-44af-9d2d-fcfae7175aae",
    "followUpQuestion": "",
    "category": "Data Structures & Algorithms",
    "allowOther": true,
    "type": "checkbox",
    "title": "Which data structures do you understand well enough to implement and use in real code?",
    "hint": "Knowing the right structure to use is a core engineering competency",
    "options": [
      {
        "scoreWeight": 0.1,
        "resources": [
          {
            "title": "Two Pointer Technique",
            "type": "video",
            "url": "https://www.youtube.com/watch?v=On03HWe2tZM"
          }
        ],
        "value": "arrays-strings",
        "mentorExplanation": "Arrays are the foundation of everything! Two-pointer and sliding window patterns solve a huge class of problems efficiently. If you're comfortable here, you have the base.",
        "recommendations": [
          "Master two-pointer and sliding window techniques - very useful to know and helps evaluate performance",
          "Practice string manipulation problems"
        ],
        "label": "Arrays and Strings"
      },
      {
        "mentorExplanation": "Hash maps are possibly the most useful data structure in everyday coding! Any time you need fast lookup, counting, or grouping - reach for a hash map. Master this and you'll solve 40% of LeetCode problems efficiently.",
        "recommendations": [
          "Learn about collision handling",
          "Know when O(1) lookup is critical",
          "Practice frequency counting patterns"
        ],
        "label": "Hash Maps / Hash Tables",
        "resources": [
          {
            "url": "https://www.youtube.com/watch?v=KyUTuwz_b7Q",
            "title": "Hash Table Internals",
            "type": "video"
          },
          {
            "title": "Hash Map Patterns",
            "type": "article",
            "url": "https://neetcode.io/"
          }
        ],
        "scoreWeight": 0.12,
        "value": "hash-maps"
      },
      {
        "mentorExplanation": "Linked lists teach pointer/reference thinking that applies everywhere. Fast/slow pointers solve cycle detection elegantly. They're less common in production but critical for interviews and understanding memory.",
        "label": "Linked Lists",
        "recommendations": [
          "Master fast/slow pointer technique",
          "Practice reversal patterns",
          "Understand when arrays beat linked lists"
        ],
        "scoreWeight": 0.1,
        "resources": [
          {
            "url": "https://www.youtube.com/watch?v=gBTe7lFR3vc",
            "title": "Fast & Slow Pointers",
            "type": "video"
          }
        ],
        "value": "linked-lists"
      },
      {
        "mentorExplanation": "Stacks and queues are everywhere - undo/redo, browser history, BFS traversal. The monotonic stack pattern is underrated and solves hard problems elegantly. Once you see it, you see it everywhere.",
        "label": "Stacks and Queues",
        "recommendations": [
          "Master monotonic stack patterns",
          "Understand BFS with queues",
          "Practice expression evaluation"
        ],
        "resources": [
          {
            "url": "https://www.youtube.com/watch?v=Dq_ObZwTY_Q",
            "type": "video",
            "title": "Monotonic Stack Pattern"
          }
        ],
        "scoreWeight": 0.12,
        "value": "stacks-queues"
      },
      {
        "recommendations": [
          "Master DFS recursion",
          "Practice tree traversals",
          "Understand BST invariants"
        ],
        "label": "Trees (Binary Trees, BSTs)",
        "mentorExplanation": "Trees are one of the most important structures! DFS recursion on trees is the template for a huge number of problems. Master the three traversals (pre/in/post-order) and you can solve most tree problems. BSTs appear in databases and file systems constantly.",
        "value": "trees",
        "scoreWeight": 0.14,
        "resources": [
          {
            "url": "https://www.youtube.com/watch?v=fAAZixBzIAI",
            "type": "video",
            "title": "Tree Recursion Mastery"
          }
        ]
      },
      {
        "mentorExplanation": "Heaps are the secret weapon for 'find the K largest/smallest' problems. They give you O(log n) insertion and O(1) access to the min/max. Task schedulers and graph algorithms (Dijkstra) use them heavily.",
        "recommendations": [
          "Practice Top-K problems on leetcode or codewars",
          "Understand heap invariants",
          "Know when to use min vs max heap"
        ],
        "label": "Heaps / Priority Queues",
        "scoreWeight": 0.13,
        "resources": [
          {
            "type": "video",
            "title": "Heap Data Structure",
            "url": "https://www.youtube.com/watch?v=t0Cq6tVNRBA"
          }
        ],
        "value": "heaps"
      },
      {
        "resources": [
          {
            "url": "https://www.youtube.com/watch?v=tWVWeAqZ0WU",
            "type": "video",
            "title": "Graph Algorithms Course"
          },
          {
            "type": "video",
            "title": "Union-Find Explained",
            "url": "https://www.youtube.com/watch?v=ayW5B2W9hfo"
          }
        ],
        "scoreWeight": 0.15,
        "value": "graphs",
        "mentorExplanation": "Graphs model almost every real-world problem: social networks, maps, dependency resolution, web crawling. BFS for shortest path in unweighted graphs, DFS for connectivity. Once you can model a problem as a graph, you have powerful algorithms at your disposal.",
        "recommendations": [
          "Read about BFS(Breadth-First Search) for shortest path and try to apply it",
          "Practice union-find",
          "Study Dijkstra and Bellman-Ford"
        ],
        "label": "Graphs (BFS, DFS, shortest path)"
      },
      {
        "value": "tries",
        "resources": [
          {
            "title": "Trie Data Structure",
            "type": "video",
            "url": "https://www.youtube.com/watch?v=oobqoCJlHA0"
          }
        ],
        "scoreWeight": 0.12,
        "recommendations": [
          "Build an autocomplete system",
          "Implement or use a spell checker",
          "Study when tries beat hash maps"
        ],
        "label": "Tries / Prefix Trees",
        "mentorExplanation": "Tries are specialized but incredibly powerful for string problems: autocomplete, spell check, IP routing. They can search by prefix in O(m) time where m is the prefix length - hash maps can't do that. Understanding tries shows you think about the right tool for the job."
      },
      {
        "mentorExplanation": "DP is the hardest interview topic but incredibly rewarding! The key insight: DP is just recursion + caching. Start by writing the recursive solution, add memoization, and you have top-down DP. Classic patterns (knapsack, Fibonacci, coin change) repeat across many problems. Recognize the pattern and the solution follows.",
        "recommendations": [
          "Start with memoization before tabulation",
          "Master 1D then 2D DP",
          "Study classic DP problems (knapsack, LCS, LIS)"
        ],
        "label": "Dynamic Programming patterns",
        "resources": [
          {
            "description": "freeCodeCamp's comprehensive DP course",
            "type": "video",
            "title": "DP for Beginners",
            "url": "https://www.youtube.com/watch?v=oBt53YbR9Kk"
          }
        ],
        "scoreWeight": 0.16,
        "value": "dp-patterns"
      }
    ]
  },
  {
    "id": "71fa4b35-93c3-4016-8ea1-87871c0cb5af",
    "followUpQuestion": "",
    "category": "Collaboration",
    "allowOther": true,
    "type": "multiple-choice",
    "title": "How comfortable are you with pair programming and collaborative coding?",
    "hint": "Pairing is a superpower - two minds catch bugs one mind misses, and knowledge spreads fast",
    "options": [
      {
        "label": "I actively advocate for pairing and lead pairing sessions",
        "recommendations": [
          "Set up a regular pairing schedule so knowledge is shared consistently across the team.",
          "Run short retrospectives after pairing sessions to improve how they are done.",
          "Help others learn how to run effective pairing sessions and keep them productive."
        ],
        "isCorrect": true,
        "mentorExplanation": "Advocating for pairing takes courage - it challenges the solo-coder identity many developers hold. You're making the case with concrete results: fewer bugs, faster onboarding, shared knowledge. Keep showing the wins.",
        "value": "advocate",
        "resources": [
          {
            "title": "Building a Pairing Culture",
            "type": "article",
            "url": "https://www.thoughtworks.com/insights/blog/pair-programming-considered-extremely-beneficial"
          }
        ],
        "scoreWeight": 0.8
      },
      {
        "mentorExplanation": "Solo work has its place, but pairing on hard problems often cuts debugging time in half. Try driver-navigator: one codes, one navigates with fresh eyes. You'll catch bugs before they're written.",
        "label": "I pair occasionally but prefer working alone",
        "recommendations": [
          "Schedule regular pairing sessions so collaboration becomes a normal part of work.",
          "Use the driver–navigator format to keep sessions structured and productive.",
          "Pair on the most difficult problems to share knowledge and improve problem-solving together."
        ],
        "resources": [
          {
            "title": "When to Pair Program",
            "type": "article",
            "url": "https://www.thoughtworks.com/insights/blog/pair-programming-considered-extremely-beneficial"
          }
        ],
        "scoreWeight": 0.35,
        "value": "occasional"
      },
      {
        "label": "I use pairing strategically to spread knowledge, onboard, and solve hardest problems",
        "recommendations": [
          "Run mob programming sessions",
          "Document pairing effectiveness"
        ],
        "isCorrect": true,
        "mentorExplanation": "Strategic pairing - knowing when, who, and how to pair. Use it for onboarding (new person drives, experienced navigates). Hard problems (two brains better than one). Knowledge transfer (rotate pairs deliberately). This is leadership.",
        "value": "expert",
        "scoreWeight": 1,
        "resources": [
          {
            "url": "https://github.com/willemlarsen/mobprogrammingrpg",
            "type": "github",
            "title": "Mob Programming RPG"
          },
          {
            "type": "article",
            "title": "Strategic Pairing Guide",
            "url": "https://www.martinfowler.com/articles/on-pair-programming.html"
          }
        ]
      },
      {
        "scoreWeight": 0.15,
        "resources": [
          {
            "type": "article",
            "title": "Guide to Pair Programming",
            "url": "https://www.martinfowler.com/articles/on-pair-programming.html"
          }
        ],
        "value": "uncomfortable",
        "mentorExplanation": "Feeling vulnerable while someone watches you code is normal. But pairing isn't performance - it's thinking together. Your mistakes are valuable; they show your thought process. Start small: pair on a bug fix with someone you trust.",
        "label": "I'm uncomfortable having others watch me code",
        "recommendations": [
          "Start with low-stakes pairing sessions",
          "Practice thinking out loud",
          "Reframe pairing as a learning opportunity"
        ]
      },
      {
        "isCorrect": true,
        "recommendations": [
          "Keep pairing regularly to maintain strong collaboration habits.",
          "Try different pairing styles (like driver–navigator) to see what works best for different tasks.",
          "Use pairing on harder problems to learn faster and improve shared understanding."
        ],
        "label": "I pair comfortably and find it productive",
        "mentorExplanation": "Pairing is one of the fastest knowledge-transfer tools. Use it strategically: pair on hard problems, rotate partners to spread knowledge, pair experienced with junior developers. Make it intentional, not random.",
        "value": "comfortable",
        "scoreWeight": 0.6,
        "resources": [
          {
            "title": "Mob Programming",
            "type": "docs",
            "url": "https://mobprogramming.org/"
          },
          {
            "url": "https://martinfowler.com/articles/on-pair-programming.html#KnowledgeSharing",
            "title": "Knowledge Sharing Through Pairing",
            "type": "article"
          }
        ]
      }
    ]
  },
  {
    "id": "72f9c279-5437-4a56-bfd5-0d12c69efbfd",
    "allowOther": true,
    "category": "Problem Solving & Debugging",
    "followUpQuestion": "",
    "hint": "Premature optimization is bad, but ignoring performance is worse. Balance is key.",
    "options": [
      {
        "label": "I proactively optimize and set performance budgets",
        "recommendations": [
          "Try to build and establish performance culture. Check the resource on how to do this in the resources page",
          "Use a performance monitoring tool or build your own:)",
          "Share optimization knowledge"
        ],
        "isCorrect": true,
        "mentorExplanation": "Performance budgets prevent regressions before they ship. You're treating performance as a feature, not an afterthought. Keep sharing wins - when the team sees load time cut in half, performance becomes valued.",
        "value": "proactive",
        "resources": [
          {
            "title": "Building Performance Culture",
            "type": "video",
            "url": "https://www.youtube.com/watch?v=FEs2jgZBaQA"
          },
          {
            "type": "docs",
            "title": "Performance Monitoring",
            "url": "https://web.dev/vitals/"
          },
          {
            "title": "High Performance Browser Networking",
            "type": "book",
            "url": "https://hpbn.co/"
          }
        ],
        "scoreWeight": 0.8
      },
      {
        "mentorExplanation": "Performance impacts real users. Slow apps lose customers - Amazon found 100ms latency costs 1% of sales. You don't need to micro-optimize, but learn to spot issues: O(n²) loops, unnecessary re-renders, huge bundles. DevTools show where time actually goes.",
        "recommendations": [
          "Learn performance fundamentals",
          "Study common bottlenecks",
          "Use browser DevTools"
        ],
        "label": "I don't usually think about performance until there's a problem",
        "isCommonMistake": true,
        "resources": [
          {
            "type": "docs",
            "title": "Web Performance Fundamentals",
            "url": "https://web.dev/learn-web-vitals/"
          },
          {
            "type": "docs",
            "title": "Chrome DevTools Performance",
            "url": "https://developer.chrome.com/docs/devtools/performance/"
          },
          {
            "url": "https://web.dev/why-speed-matters/",
            "type": "article",
            "title": "Why Performance Matters"
          }
        ],
        "scoreWeight": 0.15,
        "value": "dont-think"
      },
      {
        "label": "I architect systems for performance and lead optimization initiatives",
        "isCorrect": true,
        "recommendations": [
          "Speak about performance - you could share during one tech talk or tech upskill",
          "Always scale performance practices"
        ],
        "mentorExplanation": "You architect with performance in mind from the start. Your decisions - caching layers, CDN strategy, database indexes - impact millions of requests. Performance engineering is underrepresented in content. Share what you know.",
        "value": "expert",
        "scoreWeight": 1,
        "resources": [
          {
            "type": "book",
            "title": "Designing for Performance",
            "url": "https://designingforperformance.com/"
          }
        ]
      },
      {
        "scoreWeight": 0.35,
        "resources": [
          {
            "type": "docs",
            "title": "Web Performance Metrics",
            "url": "https://web.dev/metrics/"
          },
          {
            "type": "article",
            "title": "Performance Budgets",
            "url": "https://web.dev/performance-budgets-101/"
          },
          {
            "type": "docs",
            "title": "Lighthouse Guide",
            "url": "https://developer.chrome.com/docs/lighthouse/overview/"
          }
        ],
        "value": "reactive",
        "mentorExplanation": "Reactive optimization means users already suffered through slowness. Shift left: measure in dev, set budgets, catch regressions in CI. Lighthouse scores in pull requests prevent problems before deployment. 'If you can't measure it, you can't improve it.'",
        "label": "I optimize when users complain or metrics show issues",
        "recommendations": [
          "Learn to measure performance. There are some tools that can be used for this",
          "Study optimization patterns",
          "Set performance budgets"
        ]
      },
      {
        "mentorExplanation": "You measure before optimizing - that's the right approach. Profiling reveals the actual bottleneck, not what you assume. Next: code splitting, lazy loading, memoization, HTTP caching. Small improvements compound.",
        "label": "I consider performance while coding and use profiling tools",
        "recommendations": [
          "Learn and master advanced optimisation techniques",
          "Learn about caching strategies",
          "Study render optimization"
        ],
        "isCorrect": true,
        "resources": [
          {
            "type": "video",
            "title": "Web Performance Optimization",
            "url": "https://www.youtube.com/watch?v=AQqFZ5t8uNc"
          },
          {
            "title": "React Performance",
            "type": "article",
            "url": "https://kentcdodds.com/blog/fix-the-slow-render-before-you-fix-the-re-render"
          }
        ],
        "scoreWeight": 0.6,
        "value": "conscious"
      }
    ],
    "title": "How do you approach performance optimization in your applications?",
    "type": "multiple-choice"
  },
  {
    "id": "78fc194b-1b57-4397-9653-c09dfc4ab46e",
    "category": "Technical Knowledge & Understanding",
    "followUpQuestion": "",
    "hint": "Consider: understanding conversations with technical terms, knowing what technologies do, recognizing categories (e.g., Python is a language, not a database)",
    "options": [
      {
        "resources": [
          {
            "description": "Web technology terms",
            "title": "MDN Web Docs Glossary",
            "type": "docs",
            "url": "https://developer.mozilla.org/en-US/docs/Glossary"
          },
          {
            "url": "https://www.codecademy.com/resources/docs",
            "type": "docs",
            "description": "Programming glossary",
            "title": "Codecademy Glossary"
          }
        ],
        "scoreWeight": 0.1,
        "value": "vocab1",
        "mentorExplanation": "Building your technical vocabulary is foundational! Don't be embarrassed to ask 'what does that mean?' Create a running list of terms you encounter and look them up. This gets easier quickly.",
        "label": "I frequently don't understand technical terms in conversations and often confuse what different technologies are for.",
        "recommendations": [
          "Create a personal glossary to record new technical terms as you learn them.",
          "Use MDN Web Docs to learn how web technologies work in simple detail.",
          "Watch beginner-friendly videos to understand new concepts before going deeper.",
          "Ask questions whenever you see unfamiliar terms or ideas."
        ]
      },
      {
        "recommendations": [
          "Read tech articles regularly",
          "Follow technology newsletters",
          "Study technology landscape maps"
        ],
        "label": "I understand basic terms but often encounter unfamiliar concepts. I sometimes confuse technology categories.",
        "mentorExplanation": "You're building awareness! Exposure helps - read tech blogs, follow developers on social media. When you hear a new term, take 2 minutes to understand it.",
        "value": "vocab2",
        "scoreWeight": 0.2,
        "resources": [
          {
            "url": "https://javascriptweekly.com/",
            "title": "JavaScript Weekly",
            "type": "article",
            "description": "Stay current"
          },
          {
            "url": "https://web.dev/",
            "type": "docs",
            "title": "Web.dev",
            "description": "Modern web development"
          }
        ]
      },
      {
        "mentorExplanation": "Common for frontend specialists! Broaden gradually - understand APIs, databases, deployment. You don't need to code it all, but knowing what they are helps collaboration.",
        "label": "I understand common frontend terms but struggle with backend, DevOps, or infrastructure concepts.",
        "recommendations": [
          "Study simple full-stack architecture diagrams to see how systems connect.",
          "Learn the basics of backend and DevOps to understand how systems run and deploy.",
          "Understand how the frontend connects to and depends on the rest of the system."
        ],
        "resources": [
          {
            "title": "Full Stack Open",
            "type": "course",
            "description": "Full-stack fundamentals",
            "url": "https://fullstackopen.com/"
          },
          {
            "url": "https://roadmap.sh/",
            "type": "docs",
            "title": "Roadmap.sh",
            "description": "Developer roadmaps"
          }
        ],
        "scoreWeight": 0.3,
        "value": "vocab3"
      },
      {
        "value": "vocab4",
        "resources": [
          {
            "url": "https://github.com/donnemartin/system-design-primer",
            "description": "Broad tech concepts",
            "type": "github",
            "title": "System Design Primer"
          }
        ],
        "scoreWeight": 0.4,
        "label": "I understand most frontend and basic full-stack terms. I occasionally encounter unfamiliar specialized concepts.",
        "recommendations": [
          "Build a habit of looking up unfamiliar terms right away and adding them to a personal glossary.",
          "Spend time learning common full-stack and backend concepts so new terms feel easier to connect.",
          "Ask clarifying questions early when something is unclear, especially in technical discussions."
        ],
        "mentorExplanation": "Solid foundation! Continue expanding horizontally - learn enough about databases, cloud, security to have informed conversations. Specialization is good, but breadth helps you design better solutions."
      },
      {
        "value": "vocab5",
        "scoreWeight": 0.5,
        "resources": [
          {
            "url": "https://martinfowler.com/",
            "title": "Martin Fowler's Blog",
            "description": "Software architecture",
            "type": "article"
          },
          {
            "url": "http://highscalability.com/",
            "title": "High Scalability",
            "type": "article",
            "description": "Architecture case studies"
          }
        ],
        "label": "I understand technical conversations across web development. I know what most common technologies do and their categories.",
        "recommendations": [
          "Go deeper into the tools and frameworks you use every day to understand how they really work.",
          "Learn basic performance and security concepts to write safer and faster code.",
          "Study common software architecture patterns to understand how large systems are structured."
        ],
        "mentorExplanation": "Well-rounded intermediate knowledge! Now go deeper on your stack and broader on architecture. Understanding tradeoffs between technologies matters more than knowing all of them."
      },
      {
        "value": "vocab6",
        "scoreWeight": 0.6,
        "resources": [
          {
            "type": "article",
            "description": "Technology trends",
            "title": "ThoughtWorks Tech Radar",
            "url": "https://www.thoughtworks.com/radar"
          },
          {
            "url": "https://www.infoq.com/",
            "type": "article",
            "description": "Software architecture news",
            "title": "InfoQ"
          }
        ],
        "label": "I have strong knowledge of web technologies and infrastructure. I can explain most technologies and suggest alternatives.",
        "recommendations": [
          "Go deeper into tradeoffs by comparing technologies in real use cases, not just features.",
          "Practice explaining complex topics in simple terms so others can understand them easily.",
          "Strengthen your decisions by validating them with real-world constraints like cost, scale, and performance."
        ],
        "mentorExplanation": "Advanced knowledge! You can evaluate technologies effectively. Focus on understanding 'why' technologies emerged and what problems they solve. This helps you predict trends and make smart bets."
      },
      {
        "recommendations": [
          "Stay up to date by regularly exploring new tools, frameworks, and industry trends.",
          "Share your knowledge by mentoring others and explaining complex systems in simple terms.",
          "Keep challenging your understanding by working on unfamiliar or complex system problems."
        ],
        "label": "I have comprehensive knowledge across frontend, backend, and infrastructure. I rarely encounter unfamiliar concepts.",
        "mentorExplanation": "Excellent breadth! You can make informed architectural decisions. Focus on depth in strategic areas and staying ahead of industry shifts. Your knowledge helps teams avoid costly mistakes.",
        "value": "vocab7",
        "scoreWeight": 0.7,
        "resources": [
          {
            "description": "Computer science papers",
            "title": "Papers We Love",
            "type": "article",
            "url": "https://paperswelove.org/"
          },
          {
            "type": "article",
            "description": "Practitioner research",
            "title": "ACM Queue",
            "url": "https://queue.acm.org/"
          }
        ]
      },
      {
        "value": "vocab8",
        "scoreWeight": 0.8,
        "resources": [
          {
            "url": "https://research.google/pubs/",
            "description": "Research at scale",
            "type": "article",
            "title": "Google Research Publications"
          },
          {
            "title": "Distributed Systems Course",
            "description": "Advanced concepts",
            "type": "course",
            "url": "https://www.distributedsystemscourse.com/"
          }
        ],
        "recommendations": [
          "Keep learning new tools and trends so your knowledge stays current.",
          "Share your knowledge by explaining complex topics in simple ways to others.",
          "Challenge yourself with hard system design problems to keep growing."
        ],
        "label": "I have strong expertise in web technologies, infrastructure, and computer science fundamentals. I can confidently discuss advanced topics.",
        "mentorExplanation": "Senior/expert level! You understand the entire stack deeply. Use this to guide architectural decisions, evaluate build vs buy, and set technical direction. Your expertise is a strategic asset."
      },
      {
        "label": "I have mastery-level understanding of technologies across the stack. I contribute to technical standards and discussions.",
        "recommendations": [
          "Keep improving your impact by making sure technical standards are clear, simple, and easy to follow.",
          "Actively include others in discussions so standards work well for the whole team, not just experts.",
          "Regularly review and update standards to match new tools, needs, and real project results."
        ],
        "mentorExplanation": "Outstanding mastery! You shape how others think about technology. Consider contributing to open source, standards bodies, or influential blogs. Your insights can influence thousands of developers.",
        "value": "vocab9",
        "scoreWeight": 0.9,
        "resources": [
          {
            "url": "https://www.w3.org/groups/wg/",
            "type": "docs",
            "description": "Web standards",
            "title": "W3C Working Groups"
          },
          {
            "type": "github",
            "title": "TC39 Proposals",
            "description": "JavaScript evolution",
            "url": "https://github.com/tc39/proposals"
          }
        ]
      },
      {
        "resources": [
          {
            "url": "https://www.ietf.org/",
            "description": "Internet standards",
            "type": "docs",
            "title": "IETF"
          },
          {
            "description": "Computing research",
            "type": "docs",
            "title": "ACM",
            "url": "https://www.acm.org/"
          }
        ],
        "scoreWeight": 1,
        "value": "vocab10",
        "mentorExplanation": "Exceptional! You're at the forefront of the industry. Your work defines best practices. Focus on maximum impact - create frameworks, write books, lead standards. Invest in the next generation of developers.",
        "label": "I have strong expertise in web technologies and computer science. I contribute to improving best practices and standards.",
        "recommendations": [
          "Focus on making your improvements practical so they can be easily used by teams.",
          "Share your ideas through clear examples and documentation so others can apply them.",
          "Keep validating your contributions by seeing how they work in real projects and improving them over time."
        ]
      }
    ],
    "type": "multiple-choice",
    "title": "How would you describe your familiarity with technical terminology and understanding of what different technologies are used for?"
  },
  {
    "id": "82050a3d-9935-4164-acb4-58229220ca06",
    "allowOther": true,
    "category": "Data Structures & Algorithms",
    "followUpQuestion": "",
    "hint": "Understanding Big-O helps you write efficient code and avoid performance bottlenecks",
    "options": [
      {
        "recommendations": [
          "Start with Big-O basics - learn to recognize O(1), O(n), and O(n²) patterns in your code",
          "Practice identifying the complexity of simple loops and functions you write daily",
          "When your code feels slow, count how many times loops run with different input sizes",
          "Watch beginner-friendly videos that explain complexity with visual examples"
        ],
        "label": "I'm not familiar with algorithm complexity analysis",
        "mentorExplanation": "Algorithm complexity might sound intimidating, but it's really about understanding how your code scales. When you write a loop, does it run 10 times or 10,000 times? That's the question Big-O answers. Start by recognizing patterns: one loop is O(n), nested loops are O(n²). This awareness will make you a better developer.",
        "value": "struggle",
        "resources": [
          {
            "url": "https://www.bigocheatsheet.com/",
            "type": "docs",
            "title": "Big-O Cheat Sheet",
            "description": "Visual reference for common algorithm complexities"
          },
          {
            "type": "article",
            "title": "Introduction to Big O Notation",
            "description": "Beginner-friendly explanation with practical examples",
            "url": "https://www.freecodecamp.org/news/big-o-notation-why-it-matters-and-why-it-doesnt-1674cfa8a23c/"
          },
          {
            "description": "Quick visual introduction to algorithm complexity",
            "type": "video",
            "title": "Big-O Notation in 100 Seconds",
            "url": "https://www.youtube.com/watch?v=g2o22C3CRfU"
          }
        ],
        "scoreWeight": 0.15
      },
      {
        "value": "basic",
        "scoreWeight": 0.35,
        "resources": [
          {
            "url": "https://www.freecodecamp.org/news/time-complexity-of-algorithms/",
            "description": "Practical guide with real code examples",
            "title": "A Coffee-break Introduction to Time Complexity",
            "type": "article"
          },
          {
            "description": "See complexity analysis on real algorithms",
            "title": "JavaScript Algorithms and Data Structures",
            "type": "github",
            "url": "https://github.com/trekhleb/javascript-algorithms"
          }
        ],
        "label": "I've heard of Big-O but don't actively consider it",
        "recommendations": [
          "Before writing nested loops, estimate how many iterations will run with 100, 1000, or 10000 items",
          "When code reviews mention performance, look up the Big-O complexity being discussed",
          "Practice analyzing one function per week - count loops and identify the dominant operation",
          "Keep a mental note: array.find() in a loop might be O(n²), consider using a Map instead"
        ],
        "mentorExplanation": "You know Big-O exists, but it's not part of your daily thinking yet. Start making it a habit: before writing a loop, ask 'how many times will this run?' If you're looping through an array inside another loop, that's O(n²) - fine for small data, slow for large datasets. Awareness is the first step to writing faster code."
      },
      {
        "value": "competent",
        "scoreWeight": 0.6,
        "resources": [
          {
            "type": "video",
            "description": "Full course on data structures with complexity analysis",
            "title": "Data Structures Easy to Advanced",
            "url": "https://www.youtube.com/watch?v=RBSGKlAvoiM"
          },
          {
            "url": "https://www.interviewcake.com/article/python/big-o-notation-time-and-space-complexity",
            "type": "article",
            "title": "Complexity Analysis Reference",
            "description": "Practical guide to analyzing time and space complexity"
          },
          {
            "url": "https://visualgo.net/",
            "title": "Algorithms Visualized",
            "type": "docs",
            "description": "Interactive visualizations of algorithms and their complexity"
          }
        ],
        "label": "I understand basic complexity (O(n), O(n²)) and can spot inefficient code",
        "isCorrect": true,
        "recommendations": [
          "Learn the complexity of built-in methods - array.sort() is O(n log n), array.includes() is O(n)",
          "Practice refactoring O(n²) code to O(n) using hash maps or sets for lookups",
          "When reviewing code, identify the bottleneck - the part that runs most often or with largest data",
          "Study common data structures: hash maps for O(1) lookups, heaps for O(log n) min/max operations"
        ],
        "mentorExplanation": "Good foundation! You can identify obvious inefficiencies. Now level up: learn when O(n log n) sorting beats O(n²), understand hash table lookups are O(1), and recognize that 'it depends on the data structure' is often the right answer. Real optimization comes from choosing the right data structure, not just writing faster loops."
      },
      {
        "label": "I can identify Big-O complexity and optimize critical paths",
        "recommendations": [
          "Profile production code to find actual bottlenecks - intuition can be wrong about what's slow",
          "Document complexity in code reviews for critical paths so others understand the trade-offs",
          "Learn amortized analysis - some O(n) operations are fine if they happen rarely",
          "Mentor others on complexity - teaching solidifies your understanding and spreads best practices"
        ],
        "isCorrect": true,
        "mentorExplanation": "You're proactive about performance. You know when to optimize and when to keep code simple. The next level is space-time trade-offs: using more memory for faster execution, or vice versa. Also consider average vs worst-case complexity - a hash table is O(1) average but O(n) worst-case. Production code needs both perspectives.",
        "value": "strong",
        "resources": [
          {
            "url": "https://www.algorist.com/",
            "type": "book",
            "description": "Classic reference for algorithm analysis and optimization",
            "title": "Algorithm Design Manual"
          },
          {
            "url": "https://web.dev/fast/",
            "type": "docs",
            "title": "Performance Optimization Techniques",
            "description": "Web performance optimization with complexity considerations"
          },
          {
            "title": "Chrome DevTools Performance",
            "type": "docs",
            "description": "Profile and optimize runtime performance",
            "url": "https://developer.chrome.com/docs/devtools/performance/"
          }
        ],
        "scoreWeight": 0.8
      },
      {
        "mentorExplanation": "You understand that real-world performance is more than Big-O. Cache locality, database indexes, network latency - all matter. You make architectural decisions based on expected data size and access patterns. You know when premature optimization is bad and when ignoring performance is worse. This is senior-level thinking - share it widely.",
        "label": "I analyze complexity for production systems and can balance trade-offs",
        "isCorrect": true,
        "recommendations": [
          "Write technical blog posts about performance decisions - why you chose one approach over another",
          "Establish performance budgets and monitoring for critical paths in your systems",
          "Review system architecture for complexity bottlenecks - sometimes the algorithm is fine but the architecture isn't",
          "Teach others to think in terms of trade-offs, not absolutes - help build a performance-aware culture"
        ],
        "resources": [
          {
            "description": "Learn to design large-scale systems with performance in mind",
            "type": "github",
            "title": "System Design Primer",
            "url": "https://github.com/donnemartin/system-design-primer"
          },
          {
            "url": "https://hpbn.co/",
            "title": "High Performance Browser Networking",
            "type": "book",
            "description": "Understanding network performance and optimization"
          }
        ],
        "scoreWeight": 0.95,
        "value": "expert"
      }
    ],
    "type": "multiple-choice",
    "title": "How comfortable are you with analyzing and optimizing algorithm complexity?"
  },
  {
    "id": "8d9d30d6-c749-4561-8578-2f2987c9a753",
    "category": "Precision & Attention to Detail",
    "followUpQuestion": "",
    "options": [
      {
        "mentorExplanation": "Building attention to detail is a learnable skill! Start with a review checklist: Does it compile? Did I test it? Are variable names clear? Run automated tools to catch common issues. Review your own work before asking others.",
        "label": "My work frequently contains errors. I often overlook details and inconsistencies.",
        "recommendations": [
          "Create personal checklists for common errors",
          "Use linters and automated tools",
          "Practice reviewing code before submitting",
          "Ask for code review feedback on detail issues"
        ],
        "scoreWeight": 0.1,
        "resources": [
          {
            "type": "docs",
            "title": "ESLint Setup",
            "description": "Automated error detection",
            "url": "https://eslint.org/docs/latest/use/getting-started"
          },
          {
            "url": "https://github.com/mgreiler/code-review-checklist",
            "description": "Quality checklist",
            "type": "github",
            "title": "Code Review Checklist"
          }
        ],
        "value": "quality1"
      },
      {
        "label": "I produce work with noticeable errors regularly. I miss some details during review.",
        "recommendations": [
          "Slow down and review methodically",
          "Test your changes thoroughly",
          "Learn common error patterns",
          "Use TypeScript for type safety"
        ],
        "mentorExplanation": "Quality improves with deliberate practice! Before marking work complete, test it yourself. Click through features. Try edge cases. Read your code as if you didn't write it. Slow down to speed up.",
        "value": "quality2",
        "scoreWeight": 0.2,
        "resources": [
          {
            "url": "https://www.typescriptlang.org/docs/",
            "type": "docs",
            "title": "TypeScript Handbook",
            "description": "Type safety"
          },
          {
            "url": "https://testingjavascript.com/",
            "description": "Testing fundamentals",
            "title": "Testing JavaScript",
            "type": "course"
          }
        ]
      },
      {
        "mentorExplanation": "You're improving! Build a habit: after writing code, walk away for 5 minutes, then review fresh. Look for: inconsistent naming, missing error handling, untested paths. Pattern recognition develops over time.",
        "recommendations": [
          "Develop a consistent review process",
          "Learn to spot common error patterns",
          "Use debugging tools proactively",
          "Practice self-review techniques"
        ],
        "label": "My work has occasional errors. I catch some details but miss smaller inconsistencies.",
        "resources": [
          {
            "description": "Code quality principles - we have it in the Onja Library",
            "type": "book",
            "title": "Clean Code",
            "url": "https://www.oreilly.com/library/view/clean-code-a/9780136083238/"
          },
          {
            "description": "Google code review guide",
            "title": "Self-Review Guide",
            "type": "docs",
            "url": "https://google.github.io/eng-practices/review/developer/"
          }
        ],
        "scoreWeight": 0.3,
        "value": "quality3"
      },
      {
        "scoreWeight": 0.4,
        "resources": [
          {
            "type": "docs",
            "description": "Testing framework",
            "title": "Jest Testing",
            "url": "https://jestjs.io/docs/getting-started"
          },
          {
            "url": "https://refactoring.com/",
            "type": "book",
            "description": "Improving code quality - I think we also have this book in the Onja Library. Not sure though",
            "title": "Refactoring"
          }
        ],
        "value": "quality4",
        "mentorExplanation": "Good foundation! Level up by anticipating issues before they occur. Think: 'What could break?' Test those cases. Review for consistency across the codebase. Quality is about prevention, not just detection.",
        "recommendations": [
          "Slow down a bit during review to catch small details before they become issues.",
          "Use simple checklists or self-review steps to reduce missed edge cases.",
          "Start building stronger habits around testing and validation to increase consistency."
        ],
        "label": "I generally produce quality work with minor errors. I catch most issues but occasionally miss details."
      },
      {
        "resources": [
          {
            "url": "https://google.github.io/eng-practices/",
            "title": "Google Engineering Practices documentation (Testing + Code Review guides)",
            "type": "github",
            "description": "Practical, real-world standards for catching issues early and improving review quality."
          },
          {
            "type": "book",
            "title": "The Pragmatic Programmer",
            "description": "Professional practices",
            "url": "https://pragprog.com/titles/tpp20/"
          }
        ],
        "scoreWeight": 0.5,
        "value": "quality5",
        "mentorExplanation": "Strong intermediate quality! Your work is reliable. Now help others reach this level - share your review process, create quality guidelines, build automated checks. Quality culture starts with individuals.",
        "recommendations": [
          "Add a final structured review step (checklist or tests) to further reduce the few remaining errors.",
          "Look for patterns in the rare mistakes you miss and proactively prevent them in future work.",
          "Start helping others improve their review habits by sharing your own self-review approach."
        ],
        "label": "I consistently produce high-quality work with few errors. I catch most details during self-review."
      },
      {
        "label": "I produce error-free work consistently. I have strong attention to detail and rarely miss issues.",
        "recommendations": [
          "Start improving system-level thinking so your quality extends beyond individual tasks to larger designs.",
          "Focus on anticipating edge cases earlier in planning, not just catching them during execution.",
          "Share your attention-to-detail practices with others to help raise team-wide quality standards."
        ],
        "mentorExplanation": "Advanced quality mindset! You prevent issues, not just catch them. Share this - create linting rules, write style guides, build CI/CD checks. Your attention to detail becomes team capability.",
        "value": "quality6",
        "resources": [
          {
            "description": "Automated quality",
            "title": "Continuous Integration",
            "type": "article",
            "url": "https://www.martinfowler.com/articles/continuousIntegration.html"
          },
          {
            "description": "Code quality platform",
            "title": "SonarQube",
            "type": "docs",
            "url": "https://www.sonarsource.com/products/sonarqube/"
          }
        ],
        "scoreWeight": 0.6
      },
      {
        "mentorExplanation": "Excellent! Your eye for detail is a competitive advantage. Scale it - build quality into processes, create automated checks, establish team standards. Quality leadership means everyone produces better work.",
        "label": "I excel at producing flawless work. I catch subtle issues others miss and maintain exceptional standards.",
        "recommendations": [
          "Shift more focus from perfect execution to improving system design and overall architecture.",
          "Work on identifying and preventing entire categories of issues earlier, not just catching subtle ones during review.",
          "Share your approach and help raise the quality bar for the wider team."
        ],
        "resources": [
          {
            "url": "https://sre.google/books/",
            "title": "Site Reliability Engineering",
            "description": "Quality at scale",
            "type": "book"
          },
          {
            "title": "Quality Engineering",
            "description": "Quality practices",
            "type": "article",
            "url": "https://www.ministryoftesting.com/"
          }
        ],
        "scoreWeight": 0.7,
        "value": "quality7"
      },
      {
        "mentorExplanation": "Senior/expert level! Your precision sets the bar. Build systems - quality dashboards, automated testing pipelines, code review guidelines. Your standards become organizational standards.",
        "recommendations": [
          "Focus more on system design and how the whole product is built, not just your own work.",
          "Try to prevent issues earlier by improving design and working methods, not just fixing them later.",
          "Help others improve their work by sharing how you maintain high quality."
        ],
        "label": "I have expert-level precision. I consistently deliver perfect work and establish quality standards for others.",
        "resources": [
          {
            "url": "https://testing.googleblog.com/",
            "title": "Google Testing Blog",
            "description": "Testing at scale",
            "type": "article"
          }
        ],
        "scoreWeight": 0.8,
        "value": "quality8"
      },
      {
        "label": "I have mastery-level precision and build quality frameworks and tools to support my own work.",
        "recommendations": [
          "Focus on applying your frameworks across different teams and contexts, not just building them.",
          "Improve how your tools scale and stay useful as the organization grows.",
          "Spend more time helping others adopt and use your quality practices effectively."
        ],
        "mentorExplanation": "Outstanding! You define what quality means. Your frameworks, tools, and practices are adopted widely. Share through open source, conference talks, influential writing. Shape industry standards.",
        "value": "quality9",
        "scoreWeight": 0.9,
        "resources": [
          {
            "description": "Advanced testing",
            "title": "Test Automation University",
            "type": "course",
            "url": "https://testautomationu.applitools.com/"
          },
          {
            "url": "https://principlesofchaos.org/",
            "type": "docs",
            "title": "Chaos Engineering",
            "description": "System resilience"
          }
        ]
      },
      {
        "value": "quality10",
        "scoreWeight": 1,
        "resources": [],
        "label": "I have world-class precision standards and consistently deliver flawless, high-quality work",
        "recommendations": [
          "Focus more on improving how systems are designed so quality is built in from the start, not just delivered at the end.",
          "Look for opportunities to scale your impact by improving processes and tools, not only individual work.",
          "Share your approach with others to help raise the overall quality bar across the team or organization"
        ],
        "mentorExplanation": "Exceptional! Your work defines modern quality standards. Tools you create, practices you pioneer, frameworks you build - used by millions. Focus on generational impact in quality engineering."
      }
    ],
    "hint": "Consider: error frequency, catching small inconsistencies, reviewing your own work thoroughly, producing consistent quality output",
    "title": "How would you describe the quality of your work and your attention to detail?",
    "type": "multiple-choice"
  },
  {
    "id": "954952ac-1f80-401c-a4a4-416c51a21a79",
    "category": "Version Control & Git",
    "followUpQuestion": "",
    "allowOther": true,
    "hint": "As codebases grow, repo structure and branching strategy become critical engineering decisions",
    "options": [
      {
        "recommendations": [
          "Learn about monorepo vs polyrepo trade-offs",
          "Study how large companies structure code",
          "Explore tools like Nx or Turborepo"
        ],
        "label": "I only work in single-repository projects",
        "mentorExplanation": "Single repos are fine for smaller projects! But understanding the alternatives prepares you for larger organizations. Monorepos (one repo for everything) are used by Google, Meta, and many others - they have real advantages for code sharing and atomic changes across packages.",
        "value": "single-repo",
        "resources": [
          {
            "url": "https://monorepo.tools/",
            "title": "Monorepo vs Polyrepo",
            "type": "docs"
          },
          {
            "url": "https://www.youtube.com/watch?v=W71BTkUbdqE",
            "type": "video",
            "title": "Google Monorepo"
          },
          {
            "url": "https://nx.dev/",
            "type": "docs",
            "title": "Nx Monorepo Tool"
          }
        ],
        "scoreWeight": 0.15
      },
      {
        "mentorExplanation": "Polyrepo dependency hell is a real pain - you update a shared library and now 12 repos need updates! Monorepos solve this but have their own tradeoffs. Learn semantic versioning thoroughly and explore tools like Changesets to manage releases.",
        "label": "I work with multiple repos but find dependency management challenging",
        "recommendations": [
          "Learn semantic versioning deeply",
          "Go deeper into package management strategies",
          "Explore monorepo tools as a solution"
        ],
        "scoreWeight": 0.35,
        "resources": [
          {
            "type": "docs",
            "title": "Semantic Versioning",
            "url": "https://semver.org/"
          },
          {
            "url": "https://github.com/changesets/changesets",
            "title": "Changesets",
            "type": "github"
          },
          {
            "title": "Turborepo",
            "type": "docs",
            "url": "https://turbo.build/repo"
          }
        ],
        "isCommonMistake": true,
        "value": "basic-multi-repo"
      },
      {
        "label": "I have experience with monorepos and understand their trade-offs",
        "isCorrect": true,
        "recommendations": [
          "Learn advanced monorepo tooling",
          "Study caching and build optimization",
          "Understand affected-change detection"
        ],
        "mentorExplanation": "Excellent! Monorepo experience is valuable. Focus next on performance at scale: caching build outputs, affected-change detection (only build what changed), and CI optimization. This is where monorepos win or lose.",
        "value": "monorepo-experience",
        "resources": [
          {
            "url": "https://nx.dev/concepts/affected",
            "title": "Nx Affected Builds",
            "type": "docs"
          },
          {
            "type": "docs",
            "title": "Remote Caching",
            "url": "https://turbo.build/repo/docs/core-concepts/remote-caching"
          }
        ],
        "scoreWeight": 0.6
      },
      {
        "mentorExplanation": "Excellent! Repository architecture has huge impact on team velocity. Your experience evaluating trade-offs (monorepo vs polyrepo, trunk-based vs feature branches) is high-level thinking. Share these decisions and their reasoning with your organization.",
        "label": "I design repository architecture and branching strategies for teams",
        "recommendations": [
          "Document your architectural decisions",
          "Share repo strategy knowledge",
          "Evaluate emerging tooling"
        ],
        "isCorrect": true,
        "resources": [
          {
            "title": "Trunk Based Development",
            "type": "docs",
            "url": "https://trunkbaseddevelopment.com/"
          },
          {
            "type": "docs",
            "title": "Repository Patterns",
            "url": "https://www.atlassian.com/git/tutorials/comparing-workflows"
          },
          {
            "url": "https://www.thoughtworks.com/insights/blog/code-organization-strategies",
            "title": "Engineering Org Structure",
            "type": "article"
          }
        ],
        "scoreWeight": 0.8,
        "value": "architect"
      },
      {
        "mentorExplanation": "You have rare expertise in large-scale codebase management! The decisions you make affect hundreds of developers' daily workflows. Share this - conference talks and blog posts on real monorepo war stories are incredibly valuable to the community.",
        "label": "I have deep expertise in large-scale codebase management and toolchain design",
        "recommendations": [
          "Contribute to monorepo tooling",
          "Write case studies on your decisions",
          "You could give a talk on scaling codebases"
        ],
        "isCorrect": true,
        "resources": [
          {
            "title": "Contributing to Nx",
            "type": "github",
            "url": "https://github.com/nrwl/nx/blob/master/CONTRIBUTING.md"
          },
          {
            "url": "https://platformengineering.org/",
            "title": "Engineering Platform Design",
            "type": "docs"
          }
        ],
        "scoreWeight": 1,
        "value": "expert"
      }
    ],
    "title": "How experienced are you with repository strategy and large codebase management?",
    "type": "multiple-choice"
  },
  {
    "id": "99f46af2-89d3-41e8-8b66-b0128df80c79",
    "allowOther": true,
    "followUpQuestion": "",
    "category": "Data Structures & Algorithms",
    "type": "multiple-choice",
    "title": "How comfortable are you with data structures and algorithms?",
    "hint": "Understanding DS&A helps you choose the right tool and optimize performance",
    "options": [
      {
        "mentorExplanation": "You can choose the right structure for the job - hash map vs array, when to use a set, etc. Next level: study classic algorithms (binary search, graph traversal, dynamic programming). They show up more than you'd think in real work.",
        "isCorrect": true,
        "recommendations": [
          "Study advanced algorithms",
          "Practice solving medium problems",
          "Learn dynamic programming"
        ],
        "label": "I understand complexity and use appropriate structures for tasks",
        "scoreWeight": 0.6,
        "resources": [
          {
            "url": "https://seanprashad.com/leetcode-patterns/",
            "type": "article",
            "title": "LeetCode Patterns"
          },
          {
            "type": "article",
            "title": "NeetCode",
            "url": "https://neetcode.io/"
          }
        ],
        "value": "intermediate"
      },
      {
        "label": "I know basic arrays and loops",
        "recommendations": [
          "Study common data structures",
          "Learn Big O notation",
          "Practice on platforms like LeetCode"
        ],
        "mentorExplanation": "Arrays and loops get you started. Next: learn when to reach for hash maps, sets, or queues. Understanding Big O helps you spot performance issues before they happen. These fundamentals matter in real code, not just interviews.",
        "value": "basics-only",
        "scoreWeight": 0.15,
        "resources": [
          {
            "type": "github",
            "title": "JavaScript Algorithms",
            "url": "https://github.com/trekhleb/javascript-algorithms"
          },
          {
            "url": "https://www.bigocheatsheet.com/",
            "type": "docs",
            "title": "Big O Cheat Sheet"
          },
          {
            "title": "FreeCodeCamp DS&A",
            "type": "video",
            "url": "https://www.youtube.com/watch?v=8hly31xKli0"
          }
        ]
      },
      {
        "value": "expert",
        "scoreWeight": 1,
        "resources": [
          {
            "url": "https://cses.fi/book/book.pdf",
            "type": "book",
            "title": "Competitive Programmer's Handbook"
          }
        ],
        "label": "I solve complex algorithmic problems and can teach others",
        "isCorrect": true,
        "recommendations": [
          "Participate in competitions",
          "Help your colleagues",
          "Share knowledge through content"
        ],
        "mentorExplanation": "Deep algorithmic knowledge is rare. You can design efficient solutions and explain the trade-offs. Share this - write about complex problems you've solved, mentor teammates on optimization, create learning resources."
      },
      {
        "value": "some-knowledge",
        "isCommonMistake": true,
        "resources": [
          {
            "type": "article",
            "title": "Big O Notation Explained",
            "url": "https://www.freecodecamp.org/news/big-o-notation-why-it-matters-and-why-it-doesnt-1674cfa8a23c/"
          },
          {
            "type": "video",
            "title": "Algorithm Complexity",
            "url": "https://www.youtube.com/watch?v=D6xkbGLQesk"
          }
        ],
        "scoreWeight": 0.35,
        "recommendations": [
          "Learn Big O notation deeply",
          "Study algorithm complexity",
          "Practice problem-solving"
        ],
        "label": "I know some structures (maps, sets) but don't understand complexity",
        "mentorExplanation": "Knowing which structures exist is good, but understanding their performance characteristics is critical. That nested loop in a loop? That's O(n²) - fine for 100 items, disaster for 10,000. Learn to analyze your code's complexity."
      },
      {
        "mentorExplanation": "Strong algorithmic skills. You can implement sorting, searching, and optimize performance-critical code. You make trade-offs between time and space complexity consciously. Keep practicing - these skills compound.",
        "label": "I can implement common algorithms and optimize code performance",
        "isCorrect": true,
        "recommendations": [
          "Study advanced DS&A",
          "Learn system optimization",
          "Practice hard problems"
        ],
        "resources": [
          {
            "title": "Competitive Programming",
            "type": "docs",
            "url": "https://cp-algorithms.com/"
          }
        ],
        "scoreWeight": 0.8,
        "value": "advanced"
      }
    ]
  },
  {
    "id": "a6b69082-e1f2-4c9f-9ebb-7caecbb29ea4",
    "category": "Independence & Autonomy",
    "followUpQuestion": "",
    "options": [
      {
        "value": "autonomy1",
        "scoreWeight": 0.1,
        "resources": [
          {
            "url": "https://gettingthingsdone.com/",
            "description": "Task management basics",
            "type": "article",
            "title": "Getting Things Done"
          },
          {
            "title": "Breaking Down Tasks",
            "type": "docs",
            "description": "Task decomposition",
            "url": "https://www.atlassian.com/agile/project-management/user-stories"
          }
        ],
        "label": "I need constant direction and struggle to continue without being told what to do next. I can't figure out missing parts of tasks.",
        "recommendations": [
          "Break tasks into smaller, concrete steps",
          "Create checklists before starting work",
          "Practice asking \"what would I try first?\" before asking",
          "Document what you know vs what you need to clarify"
        ],
        "mentorExplanation": "Building independence starts with structure! Before asking for next steps, spend 5 minutes thinking through options. Make a list: what do I know? What's unclear? What could I try? This builds decision-making muscles."
      },
      {
        "recommendations": [
          "Practice making small decisions without approval",
          "Study similar completed work for patterns",
          "Try solving before asking, even if unsure",
          "Keep notes of how others approach unclear tasks"
        ],
        "label": "I frequently need guidance on what to do next. I struggle to identify or fill gaps in task descriptions independently.",
        "mentorExplanation": "Start building confidence in small decisions! When stuck, try something for 15-30 minutes first. Document your attempt - even wrong paths teach you. Ask 'what would success look like?' to identify gaps.",
        "value": "autonomy2",
        "scoreWeight": 0.2,
        "resources": [
          {
            "url": "https://fs.blog/mental-models/",
            "type": "article",
            "title": "Decision Making",
            "description": "Mental models"
          }
        ]
      },
      {
        "mentorExplanation": "You're developing! When things are vague, document assumptions: 'I think this means X, will confirm.' Look at similar existing work. Propose an approach rather than asking what to do.",
        "label": "I can continue with clear tasks but need direction when requirements are vague. I sometimes identify missing parts.",
        "recommendations": [
          "Practice clarifying requirements yourself first",
          "Look at existing similar features for patterns",
          "Make documented assumptions when unclear",
          "Build confidence proposing approaches"
        ],
        "resources": [
          {
            "type": "article",
            "description": "Understanding requirements",
            "title": "User Story Mapping",
            "url": "https://www.jpattonassociates.com/user-story-mapping/"
          },
          {
            "url": "https://www.thoughtworks.com/insights/blog/testing-your-assumptions",
            "type": "article",
            "title": "Assumption Testing",
            "description": "Making smart assumptions"
          }
        ],
        "scoreWeight": 0.3,
        "value": "autonomy3"
      },
      {
        "label": "I can usually decide next steps but sometimes need guidance. I identify some gaps but not all edge cases.",
        "recommendations": [
          "Practice thinking through edge cases",
          "Review completed work to spot patterns",
          "Build confidence in your judgment",
          "Document your decision-making process"
        ],
        "mentorExplanation": "Good progress! Build edge-case thinking: 'What if user does X? What breaks if Y happens?' Study production issues to see what you miss. Your judgment is developing - trust it more.",
        "value": "autonomy4",
        "resources": [
          {
            "url": "https://www.hillelwayne.com/post/divide-by-zero/",
            "title": "Edge Case Thinking",
            "type": "article",
            "description": "Thinking about edge cases"
          },
          {
            "description": "Holistic problem analysis",
            "title": "Systems Thinking",
            "type": "article",
            "url": "https://thesystemsthinker.com/"
          }
        ],
        "scoreWeight": 0.4
      },
      {
        "mentorExplanation": "Strong intermediate autonomy! You're reliable. Now tackle increasingly ambiguous work. Share your process - how do you identify gaps? How do you decide? Teaching others sharpens your own thinking.",
        "label": "I usually work independently and identify most gaps in requirements. I decide next steps confidently most of the time.",
        "recommendations": [
          "Take on more ambiguous projects",
          "Help others on breaking down tasks",
          "Document your approach for the team  or other developers / write a blog post about it",
          "Practice leading technical discussions"
        ],
        "scoreWeight": 0.5,
        "resources": [
          {
            "url": "https://leaddev.com/",
            "type": "article",
            "description": "Leading through influence",
            "title": "Technical Leadership"
          },
          {
            "description": "Document decisions",
            "type": "docs",
            "title": "Writing ADRs",
            "url": "https://adr.github.io/"
          }
        ],
        "value": "autonomy5"
      },
      {
        "value": "autonomy6",
        "resources": [
          {
            "type": "article",
            "title": "Product Thinking",
            "description": "Outcome-oriented thinking",
            "url": "https://www.svpg.com/product-vs-feature-teams/"
          },
          {
            "url": "https://staffeng.com/",
            "title": "Staff Engineer",
            "type": "article",
            "description": "Technical leadership"
          }
        ],
        "scoreWeight": 0.6,
        "label": "I work independently, identify gaps, and propose solutions. I confidently decide next steps and fill in missing requirements.",
        "recommendations": [
          "Try to start taking ownership of entire features",
          "Lead ambiguous projects when there is the opportunity",
          "Help define requirements with your senior devs, not just implement",
          "Guide others on independent work"
        ],
        "mentorExplanation": "Advanced autonomy! You don't just execute - you shape work. Start influencing what gets built. Challenge requirements, suggest better approaches, identify risks early. You're ready for ownership."
      },
      {
        "mentorExplanation": "Excellent! You see around corners - identifying issues before they're problems. This is senior-level autonomy. Focus on multiplying impact - build processes, mentor others, shape strategy.",
        "recommendations": [
          "Own problem spaces, not just tasks",
          "Drive architectural decisions",
          "Shape product direction"
        ],
        "label": "I excel at independent work, proactively identify gaps and risks, and suggest improvements before being asked.",
        "resources": [
          {
            "type": "book",
            "title": "An Elegant Puzzle",
            "description": "Engineering management",
            "url": "https://lethain.com/elegant-puzzle/"
          }
        ],
        "scoreWeight": 0.7,
        "value": "autonomy7"
      },
      {
        "recommendations": [
          "Lead projects that involve people from different teams"
        ],
        "label": "I have expert-level autonomy. I identify problems before they're assigned, define solutions, and drive initiatives independently.",
        "mentorExplanation": "Senior/expert level! You create work, not just complete it. You see what needs to exist. Focus on organizational leverage - build systems that make everyone more autonomous.",
        "value": "autonomy8",
        "scoreWeight": 0.8,
        "resources": []
      },
      {
        "resources": [
          {
            "type": "book",
            "title": "Accelerate",
            "description": "High-performing teams",
            "url": "https://itrevolution.com/book/accelerate/"
          },
          {
            "url": "https://www.git-tower.com/blog/version-control-best-practices/",
            "title": "Engineering Culture",
            "description": "Building engineering culture",
            "type": "article"
          }
        ],
        "scoreWeight": 0.9,
        "value": "autonomy9",
        "mentorExplanation": "Outstanding! You operate at strategic levels. Your autonomy enables organizational autonomy. Share your approach - write about decision-making, build frameworks, develop future leaders.",
        "label": "I have mastery-level independence. I define problems, create solutions, and drive organizational change autonomously.",
        "recommendations": [
          "Help decide how the company builds and uses technology",
          "Help create how engineers work together and what standards they follow"
        ]
      },
      {
        "scoreWeight": 1,
        "resources": [
          {
            "type": "docs",
            "description": "Leading communities",
            "title": "Open Source Leadership",
            "url": "https://opensource.guide/leadership-and-governance/"
          }
        ],
        "value": "autonomy10",
        "mentorExplanation": "Exceptional! Your autonomy shapes industries. You identify what should exist and make it real. Focus on generational impact - create tools, standards, and practices that outlive any single project.",
        "recommendations": [
          "Take the lead in starting and driving important projects in your industry",
          "Focus on creating something that inspires people and brings them together, not just a product"
        ],
        "label": "I have world-class autonomy and self-direction. I identify industry-level problems and drive solutions that benefit thousands."
      }
    ],
    "hint": "Consider: continuing independently, deciding next steps, identifying gaps in task descriptions, confidence taking on tasks, filling in missing requirements",
    "title": "How would you describe your ability to work independently and figure out what to do next without constant direction?",
    "type": "multiple-choice"
  },
  {
    "id": "a6d52d6b-e4da-48f7-8cf9-015006428bd8",
    "category": "Independence & Autonomy",
    "followUpQuestion": "",
    "options": [
      {
        "value": "help1",
        "resources": [
          {
            "url": "https://stackoverflow.com/help/how-to-ask",
            "type": "docs",
            "description": "Asking effective questions",
            "title": "How to Ask Questions"
          },
          {
            "url": "https://rubberduckdebugging.com/",
            "type": "article",
            "title": "Rubber Duck Debugging",
            "description": "Self-help technique"
          }
        ],
        "scoreWeight": 0.1,
        "recommendations": [
          "Commit to trying for at least 15 minutes before asking",
          "Build a research checklist (docs, Stack Overflow, etc.)",
          "Track and mention what you tried before asking"
        ],
        "label": "I ask for help very frequently, even when information is available. I give up quickly when stuck.",
        "mentorExplanation": "Building independence means building tolerance for struggle! Set a 15-minute rule: try that long before asking. Document what you tried - this builds problem-solving skills and helps others help you better."
      },
      {
        "recommendations": [
          "Create a \"before I ask\" checklist",
          "Practice Googling your questions first",
          "Read documentation before asking",
          "Try at least 2 approaches before seeking help"
        ],
        "label": "I ask for help frequently and give up somewhat easily. I don't always check available resources first.",
        "mentorExplanation": "Before asking, complete this checklist: Did I Google it? Check docs? Try two approaches? This builds self-sufficiency. Each time you find answers yourself, it gets easier next time.",
        "value": "help2",
        "scoreWeight": 0.2,
        "resources": [
          {
            "url": "https://missing.csail.mit.edu/",
            "title": "Research Skills",
            "description": "Missing CS semester",
            "type": "course"
          }
        ]
      },
      {
        "value": "help3",
        "resources": [
          {
            "url": "https://teachingcommons.stanford.edu/teaching-guides/foundations-course-design/learning-activities/growth-mindset-and-enhanced-learning",
            "title": "Growth Mindset",
            "type": "article",
            "description": "Embracing challenges"
          }
        ],
        "scoreWeight": 0.3,
        "label": "I try to solve problems myself but ask for help more than needed. I persist for a while but give up before trying all options.",
        "recommendations": [
          "Extend your struggle time to 30-45 minutes",
          "Check the docs and search thoroughly before asking for help",
          "Try different or less obvious solutions before asking for help",
          "Write down solutions you find so you can use them again later"
        ],
        "mentorExplanation": "You're developing! Push your struggle tolerance. Before asking, ensure you've checked: official docs, Stack Overflow, GitHub issues, similar code. The answer's often there - finding it yourself builds capability."
      },
      {
        "value": "help4",
        "scoreWeight": 0.4,
        "resources": [
          {
            "url": "https://jamesclear.com/deliberate-practice-theory",
            "type": "article",
            "title": "Deliberate Practice",
            "description": "Skill building"
          },
          {
            "url": "https://stackexchange.com/",
            "description": "Community learning",
            "title": "StackExchange Network",
            "type": "docs"
          }
        ],
        "label": "I research independently before asking but still ask more than I need to. I persist through challenges but not always fully.",
        "recommendations": [
          "Join community forums to learn from others",
          "Answer questions to reinforce learning",
          "Build confidence in your solutions",
          "Track when you solve things yourself and appreciate yourself"
        ],
        "mentorExplanation": "Good foundation! Build confidence - track problems you solve independently. You'll see you can figure out more than you think. When you do ask, you'll ask better questions."
      },
      {
        "recommendations": [
          "Document your problem-solving process",
          "Tackle increasingly complex problems",
          "Build expertise in persistence strategies"
        ],
        "label": "I ask for help only when genuinely stuck after researching. I persist through most challenges without giving up.",
        "mentorExplanation": "Strong intermediate! You have healthy help-seeking balance. Now help others develop this - share your research process, explain how you persist. Teaching reinforces your own skills.",
        "value": "help5",
        "scoreWeight": 0.5,
        "resources": []
      },
      {
        "resources": [
          {
            "title": "Technical Writing",
            "description": "Document solutions",
            "type": "course",
            "url": "https://developers.google.com/tech-writing"
          },
          {
            "description": "Team learning",
            "title": "Building Learning Organizations",
            "type": "article",
            "url": "https://hbr.org/2008/03/is-yours-a-learning-organization"
          }
        ],
        "scoreWeight": 0.6,
        "value": "help6",
        "mentorExplanation": "Advanced self-sufficiency! You're a resource others can learn from. Document your problem-solving approaches. Help build a team culture of healthy persistence and smart help-seeking.",
        "recommendations": [
          "Share your research strategies with your colleagues - you can use one of our slack channels for this",
          "Contribute solutions to documentation"
        ],
        "label": "I rarely ask for help, researching thoroughly first. I persist through difficult problems and exhaust options before asking."
      },
      {
        "label": "I solve nearly all problems independently. I only ask when collaborating with experts on complex edge cases.",
        "recommendations": [
          "Run sessions where the team works together to solve problems",
          "Write simple guides to help the team fix common issues",
          "Create a shared place where the team stores useful information",
          "Set clear rules for when to ask for help or escalate an issue"
        ],
        "mentorExplanation": "Excellent! Your independence is a strength. Share it - create troubleshooting guides, define when to ask for help vs persist. Your approach helps the whole team become more self-sufficient.",
        "value": "help7",
        "scoreWeight": 0.7,
        "resources": [
          {
            "url": "https://www.writethedocs.org/guide/",
            "title": "Documentation Best Practices",
            "description": "Creating guides",
            "type": "docs"
          }
        ]
      },
      {
        "value": "help8",
        "resources": [
          {
            "type": "book",
            "description": "Developing others",
            "title": "The Coaching Habit",
            "url": "https://boxofcrayons.com/the-coaching-habit-book/"
          }
        ],
        "scoreWeight": 0.8,
        "recommendations": [
          "Increase your impact by building systems that help many people",
          "Create tools and guides so people can help themselves without asking you",
          "Help create a team where people regularly learn and share knowledge",
          "Help teams work more independently without needing constant help from others"
        ],
        "label": "I have expert-level self-sufficiency. I solve complex problems independently and help others build their independence.",
        "mentorExplanation": "Senior/expert level! You multiply team capability. Build systems that make everyone more independent - comprehensive docs, debugging tools, clear escalation paths. Your impact extends through others."
      },
      {
        "recommendations": [
          "Build systems and resources that help people learn easily",
          "Help make good ways of working standard across the company",
          "Help teams become able to work on their own without much help",
          "Help shape how the whole industry works or sets its rules"
        ],
        "label": "I have mastery-level independence. I solve novel problems and build systems that enable organizational self-sufficiency.",
        "mentorExplanation": "Outstanding! You create independence at scale. Your tools, docs, and systems let thousands solve problems themselves. Share widely - blog posts, conference talks, open source. Shape how teams work.",
        "value": "help9",
        "scoreWeight": 0.9,
        "resources": [
          {
            "title": "Developer Experience",
            "type": "article",
            "description": "Enabling developers",
            "url": "https://developerexperience.io/"
          },
          {
            "url": "https://platformengineering.org/",
            "description": "Self-service infrastructure",
            "type": "docs",
            "title": "Platform Engineering"
          }
        ]
      },
      {
        "resources": [
          {
            "title": "Open Source Economics",
            "type": "docs",
            "description": "Global collaboration",
            "url": "https://opensource.org/"
          }
        ],
        "scoreWeight": 1,
        "value": "help10",
        "mentorExplanation": "Exceptional! Your work enables millions to solve problems independently. Tools you create, standards you establish, practices you pioneer - these have generational impact. Focus on maximum leverage and legacy.",
        "label": "I have world-class self-sufficiency. I solve unprecedented problems and create frameworks that enable independence globally.",
        "recommendations": [
          "Build tools that significantly change how things are done",
          "Help set the best ways of working that are used worldwide",
          "Help create efforts that encourage people or teams to work independently"
        ]
      }
    ],
    "hint": "Consider: frequency of asking for help when info is available, effort to research independently, asking only when stuck, persistence vs giving up",
    "title": "How would you describe your approach to seeking help and persisting through challenges?",
    "type": "multiple-choice"
  },
  {
    "id": "c072811f-f8b9-4476-8d48-24eaeb750800",
    "allowOther": true,
    "followUpQuestion": "",
    "category": "Technical Skills",
    "title": "What's your experience with CI/CD pipelines and DevOps practices?",
    "type": "multiple-choice",
    "hint": "DevOps bridges development and operations - automate testing, deployment, monitoring",
    "options": [
      {
        "resources": [
          {
            "url": "https://developer.hashicorp.com/terraform/tutorials",
            "title": "Terraform Tutorial",
            "type": "docs"
          },
          {
            "title": "Deployment Strategies",
            "type": "video",
            "url": "https://www.youtube.com/watch?v=AWVTKBUnoIg"
          }
        ],
        "scoreWeight": 0.6,
        "value": "configure",
        "mentorExplanation": "You understand the development pipeline end-to-end. Next level: infrastructure as code (Terraform treats infra like code), deployment strategies (blue-green eliminates downtime), observability (logs and metrics show what's actually happening in prod).",
        "recommendations": [
          "I recommend learning infrastructure as code",
          "Spend time to study deployment strategies",
          "Also go deep into monitoring and logging"
        ],
        "isCorrect": true,
        "label": "I can configure and maintain CI/CD pipelines"
      },
      {
        "value": "use-existing",
        "resources": [
          {
            "url": "https://www.jenkins.io/doc/tutorials/",
            "type": "docs",
            "title": "Jenkins Tutorial"
          }
        ],
        "scoreWeight": 0.32,
        "label": "I use existing CI/CD pipelines but don't configure them",
        "recommendations": [
          "Learn more about pipeline configuration",
          "Study different CI/CD tools which will help you understand the configuration",
          "Try to create your own pipeline for your personal project"
        ],
        "mentorExplanation": "Using pipelines is fine, but understanding how they work helps when they break (and they will). Knowing how builds, tests, and deployments connect helps you debug faster. Set up a GitHub Action for a side project - it's simpler than you think."
      },
      {
        "resources": [
          {
            "type": "docs",
            "title": "Platform Engineering",
            "url": "https://platformengineering.org/"
          },
          {
            "url": "https://sre.google/books/",
            "type": "book",
            "description": "Free Google SRE books",
            "title": "Site Reliability Engineering"
          }
        ],
        "scoreWeight": 1,
        "value": "expert",
        "mentorExplanation": "Platform engineering - building internal developer platforms that let teams ship independently. Your work multiplies everyone's productivity. This expertise is in high demand. Share it - write, speak, build tools.",
        "recommendations": [
          "Would be great for you to share DevOps knowledge with our fellow developers - probably during tech talk:)"
        ],
        "isCorrect": true,
        "label": "I architect complete DevOps solutions and lead platform engineering"
      },
      {
        "scoreWeight": 0.8,
        "resources": [
          {
            "url": "https://kubernetes.io/docs/tutorials/",
            "type": "docs",
            "title": "Kubernetes Tutorial"
          }
        ],
        "value": "advanced",
        "mentorExplanation": "You bridge dev and ops effectively. Infrastructure as code, blue-green deployments, rollback strategies - you're enabling safe, fast shipping. Many developers fear this stuff. Share your knowledge, make deployments less scary.",
        "isCorrect": true,
        "recommendations": [
          "Study Kubernetes",
          "Learn observability",
          "Advocate for DevOps practices"
        ],
        "label": "I design deployment strategies and implement infrastructure as code"
      },
      {
        "value": "no-experience",
        "scoreWeight": 0.15,
        "resources": [
          {
            "title": "CI/CD Explained",
            "type": "video",
            "url": "https://www.youtube.com/watch?v=scEDHsr3APg"
          },
          {
            "title": "GitHub Actions Tutorial",
            "type": "docs",
            "url": "https://docs.github.com/en/actions/quickstart"
          },
          {
            "type": "article",
            "title": "CI/CD Best Practices",
            "url": "https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment"
          }
        ],
        "label": "Little to no experience with CI/CD",
        "recommendations": [
          "You can spend some time learning some CI/CD basics",
          "Spend some time studyong deployment strategies",
          "Set up a simple pipeline"
        ],
        "mentorExplanation": "CI/CD isn't just 'operations stuff' - it changes how you develop. Automated tests on every commit catch bugs early. Push-button deploys eliminate manual errors. Start simple: run tests automatically. The confidence boost is immediate."
      }
    ]
  },
  {
    "id": "c33403f3-e850-4e08-ab82-50391a4aa1b3",
    "followUpQuestion": "",
    "category": "Technical Knowledge & Understanding",
    "type": "multiple-choice",
    "title": "How would you describe your ability to debug issues and implement new solutions without existing examples?",
    "hint": "Consider: identifying root causes, implementing without examples, judging when to use technologies, troubleshooting systematically",
    "options": [
      {
        "mentorExplanation": "Debugging improves with practice! Error messages help. Read them slowly. Learn DevTools. Isolate problems systematically.",
        "label": "I struggle to identify problems without help. I need detailed examples and feel lost without them.",
        "recommendations": [
          "Learn browser DevTools basics",
          "Practice reading error messages",
          "Learn console.log and breakpoints"
        ],
        "scoreWeight": 0.1,
        "resources": [
          {
            "title": "Chrome DevTools",
            "type": "docs",
            "description": "Browser debugging",
            "url": "https://developer.chrome.com/docs/devtools/"
          }
        ],
        "value": "debug1"
      },
      {
        "mentorExplanation": "Building awareness! Form hypotheses, test them. Learn debugger - step through code, watch variables.",
        "label": "I debug simple issues with guidance. I rely on examples and struggle implementing without references.",
        "recommendations": [
          "Practice forming a guess, testing it, and then checking the result before moving on.",
          "Learn how to read error messages and stack traces to find problems faster.",
          "Use the debugger more often instead of only relying on console.log."
        ],
        "resources": [
          {
            "url": "https://code.visualstudio.com/docs/editor/debugging",
            "title": "VS Code Debugging",
            "description": "IDE debugger",
            "type": "docs"
          }
        ],
        "scoreWeight": 0.2,
        "value": "debug2"
      },
      {
        "label": "I find and fix common bugs. I adapt examples but feel uncomfortable without starting references.",
        "recommendations": [
          "Build features from scratch to understand how all parts work together.",
          "Compare different solutions before choosing one to learn tradeoffs.",
          "Read official documentation, not only Stack Overflow or AI, to get correct and complete understanding."
        ],
        "mentorExplanation": "Good! Try 30 minutes before searching. Read official docs. Understanding 'why' lets you decide without examples.",
        "value": "debug3",
        "resources": [
          {
            "url": "https://react.dev/learn/react-developer-tools",
            "description": "Debug React apps",
            "type": "docs",
            "title": "React DevTools"
          }
        ],
        "scoreWeight": 0.3
      },
      {
        "value": "debug4",
        "scoreWeight": 0.4,
        "resources": [
          {
            "url": "https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html",
            "type": "article",
            "description": "Architectural thinking",
            "title": "Clean Architecture"
          }
        ],
        "label": "I debug most issues given time. I implement simpler features independently but prefer examples for complex ones.",
        "recommendations": [
          "Practice breaking complex problems into smaller parts before jumping to a solution.",
          "Build more complex features step by step without relying on examples.",
          "Improve your debugging by predicting the cause of issues before checking logs or code."
        ],
        "mentorExplanation": "Solid intermediate! For complex features, try architectural thinking: components, communication, data flow."
      },
      {
        "mentorExplanation": "Strong intermediate! Think systems. Study monitoring, logging, error tracking. Think maintainability and testability.",
        "recommendations": [
          "Identify performance bottlenecks proactively",
          "Study debugging at scale",
          "Mentor debugging techniques"
        ],
        "label": "I debug complex issues systematically. I implement most features independently and judge different approaches.",
        "resources": [
          {
            "description": "Production monitoring",
            "title": "Sentry Docs",
            "type": "docs",
            "url": "https://docs.sentry.io/"
          }
        ],
        "scoreWeight": 0.5,
        "value": "debug5"
      },
      {
        "value": "debug6",
        "scoreWeight": 0.6,
        "resources": [
          {
            "title": "Distributed Tracing",
            "description": "Debug distributed systems",
            "type": "docs",
            "url": "https://opentelemetry.io/"
          }
        ],
        "label": "I quickly identify root causes. I confidently implement solutions and evaluate technology choices independently.",
        "recommendations": [
          "Keep checking your solutions with real results like performance, reliability, and maintainability.",
          "Share your decision process so others can understand how you choose technologies and approaches.",
          "Look for ways to improve systems over time, not just fix the immediate problem."
        ],
        "mentorExplanation": "Advanced! Focus on scale and prevention. Design debuggable systems. Study observability - metrics, logs, traces."
      },
      {
        "value": "debug7",
        "resources": [
          {
            "type": "book",
            "title": "SRE Books",
            "description": "Reliability approach",
            "url": "https://sre.google/books/"
          }
        ],
        "scoreWeight": 0.7,
        "label": "I excel at debugging obscure issues. I architect solutions with edge cases and explain decisions clearly.",
        "recommendations": [
          "Keep documenting edge cases and solutions so the team can reuse your learnings.",
          "Validate your architectural decisions with real-world constraints like scale, performance, and cost.",
          "Share your debugging approach so others can learn how to handle complex issues."
        ],
        "mentorExplanation": "Excellent! Scale your knowledge: build runbooks, create tooling, set standards. Share through docs and talks."
      },
      {
        "mentorExplanation": "Outstanding! Prevent bug categories through architecture. Lead initiatives. Build tooling. Your expertise shapes how others debug.",
        "recommendations": [
          "Keep adding logging and monitoring so issues can be found faster in real environments.",
          "Share your debugging patterns so others can apply the same approach in their work.",
          "Focus on preventing issues early by thinking about edge cases during design."
        ],
        "label": "I can solve most debugging problems. I design systems that are easy to debug and rarely get blocked.",
        "resources": [
          {
            "type": "article",
            "title": "V8 Blog",
            "description": "JS engine internals",
            "url": "https://v8.dev/blog"
          }
        ],
        "scoreWeight": 0.8,
        "value": "debug8"
      },
      {
        "mentorExplanation": "Exceptional! Don't just use tools, improve them. Develop techniques. Contribute to tools millions use. Share expertise.",
        "recommendations": [
          "Document your debugging approaches so others can reuse and learn from them.",
          "Focus on improving team-wide debugging practices, not just individual fixes.",
          "Keep testing and refining your methods using real production issues."
        ],
        "label": "I have strong debugging skills across the stack. I improve how debugging is done and help make tools better.",
        "scoreWeight": 0.9,
        "resources": [
          {
            "description": "Build debugging tools",
            "title": "DevTools Protocol",
            "type": "docs",
            "url": "https://chromedevtools.github.io/devtools-protocol/"
          }
        ],
        "value": "debug9"
      },
      {
        "value": "debug10",
        "scoreWeight": 1,
        "resources": [
          {
            "url": "https://www.w3.org/",
            "description": "Web standards",
            "type": "docs",
            "title": "W3C"
          }
        ],
        "recommendations": [
          "Make your tools and methods easy for others to understand and adopt.",
          "Test your approaches in real systems to make sure they solve real problems.",
          "Share your debugging methods through clear examples, guides, or documentation."
        ],
        "label": "I have expert debugging skills across all layers of the system. I create tools and methods that help improve debugging practices.",
        "mentorExplanation": "Extraordinary! Your work influences worldwide debugging. At this pinnacle, legacy matters. Lead OSS, found companies, write definitive works."
      }
    ]
  },
  {
    "id": "d058d558-5275-43da-9909-6b7e58387cdf",
    "type": "scale",
    "title": "How would you rate your proficiency in your primary programming language(s)?",
    "hint": "Consider: syntax mastery, best practices, design patterns, advanced features",
    "min": 1,
    "max": 10,
    "category": "Technical Skills"
  },
  {
    "id": "dc0e2c70-4c8d-448a-8663-e32f860ed300",
    "category": "Learning & Growth",
    "followUpQuestion": "",
    "allowOther": true,
    "hint": "Consider your learning initiative, methods, and knowledge sharing",
    "options": [
      {
        "isCorrect": true,
        "recommendations": [
          "Start a peer learning group",
          "Organize study sessions",
          "Practice mob programming",
          "Facilitate knowledge sharing"
        ],
        "label": "I learn best through pair programming and collaboration",
        "mentorExplanation": "Collaborative learning works because you get real-time feedback and see how others think through problems. The social accountability helps too - you actually show up and do the work. Try mob programming sometime; it's surprisingly effective for complex problems.",
        "value": "peer-learning",
        "resources": [
          {
            "title": "Pair Programming Guide",
            "type": "article",
            "url": "https://martinfowler.com/articles/on-pair-programming.html"
          },
          {
            "url": "https://www.youtube.com/watch?v=dVqUcNKVbYg",
            "title": "Mob Programming",
            "type": "video"
          }
        ],
        "scoreWeight": 0.65
      },
      {
        "value": "reactive",
        "resources": [
          {
            "type": "article",
            "description": "Effective learning technique",
            "title": "Spaced Repetition",
            "url": "https://ncase.me/remember/"
          },
          {
            "type": "github",
            "title": "Developer Learning Path",
            "url": "https://github.com/kamranahmedse/developer-roadmap"
          }
        ],
        "scoreWeight": 0.25,
        "isCommonMistake": true,
        "label": "I learn when I encounter a problem that needs solving",
        "recommendations": [
          "Complement just-in-time learning with structured study",
          "Build foundational knowledge"
        ],
        "mentorExplanation": "Just-in-time learning feels efficient but leaves gaps in your foundation. You end up relearning the same concepts in different contexts. Spend some time on fundamentals - understanding how things work makes future problems easier to solve."
      },
      {
        "label": "I learn by teaching and creating educational content",
        "isCorrect": true,
        "recommendations": [
          "Scale your teaching impact",
          "Create comprehensive courses - you might want to help the coding course designers:)"
        ],
        "mentorExplanation": "Teaching forces you to understand at a deeper level - you can't hand-wave over the parts you don't fully get. Plus you're helping others while you learn. Write, speak, create videos - pick what works for you and keep doing it.",
        "value": "teach-to-learn",
        "resources": [
          {
            "title": "Feynman Technique",
            "type": "article",
            "description": "Learn by teaching",
            "url": "https://fs.blog/feynman-technique/"
          },
          {
            "type": "course",
            "title": "Creating Technical Content",
            "url": "https://developers.google.com/tech-writing"
          }
        ],
        "scoreWeight": 0.87
      },
      {
        "label": "I learn the basics through tutorials when needed",
        "recommendations": [
          "Go deeper than tutorials",
          "Build projects from scratch",
          "Read official documentation"
        ],
        "mentorExplanation": "Tutorials get you started, but they're training wheels. At some point you need to fall a few times to really learn. Pick a small project and build it without following along - the struggle is where learning actually happens.",
        "value": "basics",
        "scoreWeight": 0.35,
        "resources": [
          {
            "title": "Project-Based Learning",
            "type": "github",
            "url": "https://github.com/practical-tutorials/project-based-learning"
          }
        ]
      },
      {
        "recommendations": [
          "Apply what you learn in theory directly to small real projects or features.",
          "Reflect on results to see what works in practice versus what only works in theory.",
          "Share practical examples so others can see how theory connects to real work."
        ],
        "isCorrect": true,
        "label": "I balance theoretical study with practical application",
        "mentorExplanation": "This is the sweet spot. Theory gives you the mental models to understand why things work; practice cements it. People who skip theory hit walls; people who skip practice never ship. You're doing both.",
        "value": "theory-practice",
        "resources": [
          {
            "type": "github",
            "title": "Computer Science Fundamentals",
            "description": "Free CS education",
            "url": "https://github.com/ossu/computer-science"
          },
          {
            "title": "Applying CS Theory",
            "description": "Theory to hardware",
            "type": "video",
            "url": "https://www.youtube.com/c/BenEater"
          }
        ],
        "scoreWeight": 0.8
      },
      {
        "resources": [
          {
            "type": "docs",
            "title": "Developer Roadmaps",
            "description": "Structured learning paths",
            "url": "https://roadmap.sh/"
          }
        ],
        "scoreWeight": 0.08,
        "value": "wait",
        "mentorExplanation": "Waiting for permission to learn puts your growth in someone else's hands. The developers who advance fastest are the ones who explore on their own time. Start small - even 30 minutes a day adds up fast.",
        "label": "I wait for formal training or assignments",
        "recommendations": [
          "Take initiative in learning",
          "Set personal learning goals",
          "Start a small personal project"
        ]
      },
      {
        "value": "experiment",
        "resources": [
          {
            "title": "Build a Home Lab",
            "type": "article",
            "description": "Safe environment for experiments",
            "url": "https://www.reddit.com/r/homelab/"
          }
        ],
        "scoreWeight": 0.73,
        "recommendations": [
          "Document your experiments",
          "Share learnings from failures",
          "Build lab environments"
        ],
        "isCorrect": true,
        "label": "I learn by experimenting and breaking things in safe environments",
        "mentorExplanation": "Breaking things is underrated as a learning method. When something fails, you learn way more than when it just works. Keep a lab environment where you can safely destroy stuff. Document what breaks and why - future you will thank you."
      },
      {
        "label": "I follow many tutorials but struggle to build without them",
        "recommendations": [
          "Break free from tutorial dependency",
          "Build projects from scratch",
          "Learn to read documentation",
          "Start with small original ideas"
        ],
        "mentorExplanation": "Tutorial hell is real - you watch someone build, think you understand, then freeze when facing a blank editor. The fix: stop mid-tutorial and build the rest yourself. Use docs, not more tutorials. The discomfort means you're actually learning.",
        "value": "tutorial-hell",
        "scoreWeight": 0.17,
        "resources": [
          {
            "url": "https://github.com/practical-tutorials/project-based-learning",
            "title": "Learn by Building",
            "type": "github"
          }
        ],
        "isCommonMistake": true
      },
      {
        "scoreWeight": 0.93,
        "resources": [
          {
            "url": "https://github.com/aredridel/how-to-read-code",
            "type": "github",
            "title": "Reading Code Effectively"
          },
          {
            "type": "course",
            "title": "Creating Technical Content",
            "url": "https://developers.google.com/tech-writing"
          }
        ],
        "value": "deep-dive",
        "mentorExplanation": "Reading source code separates good developers from great ones. You're learning from the best implementations, not just using APIs. This depth shows up in how you solve problems. Keep sharing what you find - most developers never go this deep.",
        "label": "I deeply research topics, read source code, and experiment extensively",
        "recommendations": [
          "Focus on turning your research into practical solutions you can apply in real projects.",
          "Summarize key findings so others can quickly learn from your deep research.",
          "Balance exploration with delivery so experimentation leads to usable improvements."
        ],
        "isCorrect": true
      },
      {
        "label": "I follow structured courses and build practice projects",
        "isCorrect": true,
        "recommendations": [
          "Apply what you learn in courses directly to real or slightly larger projects.",
          "Try building projects without step-by-step guidance to strengthen problem-solving skills.",
          "Review what you built to understand what worked well and what you can improve"
        ],
        "mentorExplanation": "Structured courses give you a solid path through the fundamentals. The practice projects are what make it stick. Try teaching someone else what you learned - that's when you discover what you actually understand versus what you just memorized.",
        "value": "structured",
        "scoreWeight": 0.55,
        "resources": [
          {
            "url": "https://fs.blog/feynman-technique/",
            "title": "Teach to Learn",
            "type": "article",
            "description": "Feynman Technique"
          }
        ]
      },
      {
        "isCorrect": true,
        "recommendations": [
          "Focus on turning your research into simple, practical guidance others can easily follow.",
          "Share your knowledge in clear examples so the community can apply it in real work.",
          "Keep validating best practices in real projects to make sure they stay useful and relevant."
        ],
        "label": "I research deeply, contribute to communities, and help establish best practices",
        "mentorExplanation": "You're operating at the community level, which amplifies your impact. When you establish best practices and contribute back, you're shaping how thousands of developers work. This is leadership through teaching. Keep it up.",
        "value": "expert",
        "resources": [
          {
            "url": "https://speaking.io/",
            "type": "docs",
            "title": "Conference Speaking Guide"
          },
          {
            "type": "article",
            "title": "Building Developer Communities",
            "url": "https://www.commonroom.io/blog/developer-community/"
          }
        ],
        "scoreWeight": 1
      },
      {
        "scoreWeight": 0.45,
        "resources": [
          {
            "url": "https://www.indiehackers.com/group/build-in-public",
            "title": "Building in Public",
            "type": "article"
          },
          {
            "type": "docs",
            "title": "Open Source Guide",
            "url": "https://opensource.guide/how-to-contribute/"
          },
          {
            "title": "First Timers Only",
            "type": "docs",
            "url": "https://www.firsttimersonly.com/"
          }
        ],
        "value": "proactive",
        "mentorExplanation": "Side projects are your laboratory - you learn without constraints or deadlines. The best ones scratch your own itch. Share what you build; even failed projects teach valuable lessons when you write about what didn't work and why.",
        "yearOneRecommendations": [
          "Complete 2-3 substantial side projects",
          "Present learnings to the team"
        ],
        "recommendations": [
          "Share knowledge with your team",
          "Contribute to open source",
          "Create technical content"
        ],
        "isCorrect": true,
        "label": "I proactively explore new tech and build meaningful side projects"
      }
    ],
    "type": "multiple-choice",
    "title": "How do you approach learning a new technology or framework?"
  },
  {
    "id": "dda705c8-c3da-4ce9-bf8b-ddd3c1f03cac",
    "category": "Problem Solving & Debugging",
    "followUpQuestion": "",
    "options": [
      {
        "recommendations": [
          "Learn to read error messages carefully",
          "Practice breaking problems into smaller pieces",
          "Use browser DevTools to inspect behavior",
          "Ask for help narrowing down the problem area"
        ],
        "label": "I often get blocked and struggle to identify where the problem is. I have difficulty finding relevant information online.",
        "mentorExplanation": "Getting blocked is frustrating but normal when learning! Start with error messages - they point to problem areas. Learn to add console.logs to trace execution. Copy exact error messages to Google.",
        "value": "research1",
        "scoreWeight": 0.1,
        "resources": [
          {
            "type": "article",
            "description": "Debugging fundamentals",
            "title": "How to Debug",
            "url": "https://jvns.ca/blog/2019/06/23/a-few-debugging-resources/"
          },
          {
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors",
            "description": "Understanding JS errors",
            "type": "docs",
            "title": "Reading Error Messages"
          }
        ]
      },
      {
        "recommendations": [
          "Learn effective Google search techniques",
          "Practice reading Stack Overflow answers",
          "Study how to isolate problems",
          "Build vocabulary of technical terms"
        ],
        "label": "I frequently get stuck and need help. I can sometimes find relevant information but struggle with search keywords.",
        "mentorExplanation": "Searching is a skill! Include framework names in searches ('React useState not updating'). Look for recent answers. Read multiple solutions to understand patterns.",
        "value": "research2",
        "scoreWeight": 0.2,
        "resources": [
          {
            "url": "https://support.google.com/websearch/answer/2466433",
            "title": "Google Search Tips",
            "description": "Advanced search",
            "type": "docs"
          },
          {
            "url": "https://stackoverflow.com/help/searching",
            "description": "Effective searching",
            "type": "docs",
            "title": "How to Search Stack Overflow"
          }
        ]
      },
      {
        "scoreWeight": 0.3,
        "resources": [
          {
            "type": "docs",
            "title": "Chrome DevTools Debugging",
            "description": "Using breakpoints",
            "url": "https://developer.chrome.com/docs/devtools/javascript/"
          },
          {
            "title": "The Art of Googling",
            "type": "article",
            "description": "Search strategies",
            "url": "https://www.freecodecamp.org/news/how-to-google-like-a-pro-10-tips-for-effective-googling/"
          }
        ],
        "value": "research3",
        "mentorExplanation": "You're getting closer! Use the debugger to step through code and see exactly where behavior diverges from expectations. This narrows problems from 'somewhere in this feature' to 'this specific line'.",
        "recommendations": [
          "Practice systematic debugging",
          "Learn to use debugger breakpoints",
          "Study your project's architecture",
          "Improve search query formulation"
        ],
        "label": "I get blocked regularly but can usually find something relevant. I can identify the general area but not the specific issue."
      },
      {
        "recommendations": [
          "Study debugging methodologies",
          "Learn to read source code of libraries",
          "Practice hypothesis-driven debugging",
          "Build mental models of your tech stack"
        ],
        "label": "I sometimes get blocked but can usually identify the problem area. I find relevant solutions with some trial and error.",
        "mentorExplanation": "Solid progress! Form hypotheses about causes, then test them. Keep a log of what you tried and what happened. Pattern recognition develops with practice - you'll start seeing familiar issues.",
        "value": "research4",
        "scoreWeight": 0.4,
        "resources": [
          {
            "description": "Systematic debugging",
            "title": "Debugging Guide",
            "type": "article",
            "url": "https://www.theodinproject.com/lessons/foundations-javascript-developer-tools"
          }
        ]
      },
      {
        "label": "I can usually identify problem areas and find solutions independently. I use effective keywords most of the time.",
        "recommendations": [
          "Search official documentation first",
          "Learn advanced debugging techniques",
          "Study common problem patterns",
          "Practice reading stack traces deeply"
        ],
        "mentorExplanation": "Strong intermediate! Go deeper - understand why solutions work, not just that they work. Read documentation and source code when Stack Overflow isn't enough. Build confidence in unfamiliar territory.",
        "value": "research5",
        "resources": [
          {
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
            "description": "Deep reference",
            "type": "docs",
            "title": "MDN JavaScript Guide"
          }
        ],
        "scoreWeight": 0.5
      },
      {
        "scoreWeight": 0.6,
        "resources": [
          {
            "description": "Chrome performance tools",
            "type": "docs",
            "title": "Performance Profiling",
            "url": "https://developer.chrome.com/docs/devtools/performance/"
          },
          {
            "type": "docs",
            "title": "GitHub Issue Search",
            "description": "Finding known issues",
            "url": "https://docs.github.com/en/search-github/searching-on-github/searching-issues-and-pull-requests"
          }
        ],
        "value": "research6",
        "mentorExplanation": "Advanced capability! You've built strong research skills. Start helping others - answer Stack Overflow questions, write blog posts about tricky bugs you solved. Teaching reinforces your knowledge.",
        "recommendations": [
          "Contribute answers to help others",
          "Study advanced debugging tools",
          "Learn performance profiling",
          "Read GitHub issues of libraries you use"
        ],
        "label": "I efficiently identify specific problem areas and find solutions quickly. I know what to search for and where to look."
      },
      {
        "value": "research7",
        "resources": [
          {
            "title": "Writing Technical Docs",
            "description": "Documentation best practices",
            "type": "docs",
            "url": "https://www.writethedocs.org/guide/"
          },
          {
            "url": "https://chromedevtools.github.io/devtools-protocol/",
            "description": "Create debugging tools",
            "title": "Building Dev Tools",
            "type": "docs"
          }
        ],
        "scoreWeight": 0.7,
        "recommendations": [
          "Solve problems not documented online",
          "Contribute to documentation if you have the capacity",
          "Build debugging utilities so you can reuse them in the future",
          "Help others with problem-solving if possible"
        ],
        "label": "I quickly pinpoint problems and find solutions even for complex issues. I search official docs, source code, and GitHub issues effectively.",
        "mentorExplanation": "Excellent! You go beyond Stack Overflow to primary sources. Share your expertise - write debugging guides, create tools, establish team practices. Your skills help everyone solve problems faster."
      },
      {
        "resources": [
          {
            "description": "JavaScript specifications",
            "type": "github",
            "title": "TC39 Proposals",
            "url": "https://github.com/tc39/proposals"
          },
          {
            "url": "https://web-platform-tests.org/",
            "description": "Browser standards",
            "title": "Web Platform Tests",
            "type": "docs"
          }
        ],
        "scoreWeight": 0.8,
        "value": "research8",
        "mentorExplanation": "Senior/expert level! You solve problems few others can. Create resources - runbooks for common issues, debugging playbooks, search strategies. Your approach to problems is a team asset.",
        "recommendations": [
          "Document novel problems and solutions",
          "You could try to lead some debugging workshops",
          "Establish team debugging standards"
        ],
        "label": "I excel at identifying root causes quickly. I solve problems without existing online solutions by reading specs and source code."
      },
      {
        "mentorExplanation": "Outstanding! You identify problems that require spec-level understanding. Share widely - blog posts, conference talks, open source contributions. Influence how the community approaches problems.",
        "recommendations": [
          "Contribute to language/framework specifications",
          "Publish research on debugging techniques",
          "Develop new debugging methodologies - it's always a good feeling to have one that you personally developed"
        ],
        "label": "I have mastery-level problem identification skills. I solve deep technical issues by understanding specifications and implementations.",
        "scoreWeight": 0.9,
        "resources": [
          {
            "title": "ECMA-262 Spec",
            "type": "docs",
            "description": "JavaScript specification",
            "url": "https://tc39.es/ecma262/"
          },
          {
            "url": "https://www.w3.org/standards/",
            "type": "docs",
            "description": "Web standards",
            "title": "W3C Standards"
          }
        ],
        "value": "research9"
      },
      {
        "recommendations": [
          "Contribute to browser/language development",
          "Write about definitive debugging guides"
        ],
        "label": "I have world-class expertise in problem identification and research. I solve problems that require contributing to specifications or tools.",
        "mentorExplanation": "Exceptional! You solve problems at the edges of what's possible. Your work defines how problems are approached industry-wide. Focus on maximum leverage - tools, standards, education that help millions.",
        "value": "research10",
        "scoreWeight": 1,
        "resources": [
          {
            "type": "docs",
            "description": "JavaScript engine development",
            "title": "V8 Development",
            "url": "https://v8.dev/docs"
          },
          {
            "url": "https://www.chromium.org/developers/",
            "description": "Browser development",
            "title": "Chromium Development",
            "type": "docs"
          }
        ]
      }
    ],
    "hint": "Consider: narrowing down problem areas, searching effectively (Google, Stack Overflow), finding solutions in existing codebase, using correct keywords",
    "title": "How would you describe your ability to identify problems and find solutions through research?",
    "type": "multiple-choice"
  },
  {
    "id": "e02865f4-995d-4b11-ad57-1cca8afddf06",
    "type": "multiple-choice",
    "title": "How do you approach estimating technical work and managing scope?",
    "hint": "Accurate estimation and scope management are critical professional skills often overlooked in technical training",
    "options": [
      {
        "label": "I avoid giving estimates - I never know how long things take",
        "recommendations": [
          "Learn estimation techniques",
          "Practice breaking tasks into small pieces",
          "Track your actual time vs estimates"
        ],
        "mentorExplanation": "Avoiding estimates leaves your team and stakeholders unable to plan! Estimation IS hard, but it's a skill you can develop. Start small: break work into tasks under 2 hours. Estimate those. Track actual vs estimate. Over time you'll develop calibration. The goal isn't perfection - it's a reasonable range with stated assumptions.",
        "value": "avoid",
        "resources": [
          {
            "type": "article",
            "title": "Evidence-Based Scheduling",
            "url": "https://www.joelonsoftware.com/2007/10/26/evidence-based-scheduling/"
          }
        ],
        "scoreWeight": 0.15
      },
      {
        "mentorExplanation": "Optimism bias in estimation is extremely common! We estimate in ideal conditions but work in reality (meetings, blockers, unclear requirements). Apply a multiplier: if you think it's 2 days, estimate 3-4. Track your actuals for a month - most developers discover they underestimate by 2-3x consistently.",
        "label": "I give estimates but consistently underestimate",
        "recommendations": [
          "Add buffer for unknowns",
          "Learn about Hofstadter's Law",
          "Track estimates vs actuals"
        ],
        "scoreWeight": 0.32,
        "resources": [
          {
            "url": "https://en.wikipedia.org/wiki/Hofstadter%27s_law",
            "type": "article",
            "title": "Hofstadter's Law"
          }
        ],
        "isCommonMistake": true,
        "value": "optimistic"
      },
      {
        "recommendations": [
          "Learn story point techniques",
          "Practice risk-adjusted estimation",
          "Study scope management"
        ],
        "isCorrect": true,
        "label": "I give reasonable estimates and communicate when scope changes",
        "mentorExplanation": "Good estimation and communication about scope changes is valuable! Most problems come from silent scope creep. Your habit of flagging changes early is exactly right. Next: get better at identifying hidden complexity before it bites you.",
        "value": "decent",
        "scoreWeight": 0.6,
        "resources": [
          {
            "type": "video",
            "title": "Risk-Adjusted Estimation",
            "url": "https://www.youtube.com/watch?v=uFfNYlLJjPM"
          }
        ]
      },
      {
        "resources": [
          {
            "url": "https://basecamp.com/shapeup",
            "description": "Free book on project scoping",
            "type": "book",
            "title": "Shape Up (Basecamp Method)"
          },
          {
            "url": "https://www.youtube.com/watch?v=aBLtMsDKe7Y",
            "title": "Probabilistic Forecasting",
            "type": "video"
          },
          {
            "title": "Team Estimation",
            "type": "docs",
            "url": "https://scrumguides.org/scrum-guide.html"
          }
        ],
        "scoreWeight": 0.8,
        "value": "skilled",
        "mentorExplanation": "Excellent! Risk identification before you start is the hallmark of experience. Your ability to say 'This looks like 3 days but there are 2 unknowns that could make it a week' is incredibly valuable. Share this skill - help your team estimate better.",
        "label": "I decompose work accurately, identify risks early, and adjust plans proactively",
        "recommendations": [
          "Mentor teammates on estimation",
          "Establish estimation processes",
          "Use data to improve team forecasting"
        ],
        "isCorrect": true
      },
      {
        "scoreWeight": 1,
        "resources": [
          {
            "type": "docs",
            "title": "Kanban Metrics",
            "url": "https://www.actionableagile.com/"
          }
        ],
        "value": "expert",
        "mentorExplanation": "You're an expert at predictable delivery! Organizational shipping reliability is one of the highest-value skills. Your combination of technical understanding and planning expertise makes you a force multiplier for the entire engineering organization.",
        "label": "I lead project planning and help the organization ship predictably",
        "recommendations": [
          "Build forecasting models from team data",
          "Establish definition of ready/done",
          "Create planning playbooks"
        ],
        "isCorrect": true
      }
    ],
    "category": "Communication",
    "allowOther": true
  },
  {
    "id": "e08dc088-7fea-442b-9e2a-913c1d1bc683",
    "allowOther": true,
    "category": "Technical Knowledge & Understanding",
    "followUpQuestion": "",
    "hint": "Backend development involves APIs, databases, authentication, and server-side logic",
    "options": [
      {
        "value": "struggle",
        "resources": [
          {
            "description": "Build your first Node.js/Express API in 90 minutes",
            "title": "Node.js Crash Course",
            "type": "video",
            "url": "https://www.youtube.com/watch?v=fBNz5xF-Kx4"
          },
          {
            "type": "docs",
            "title": "REST API Tutorial",
            "description": "Learn REST API concepts with examples",
            "url": "https://www.restapitutorial.com/"
          },
          {
            "title": "The Odin Project - Backend Path",
            "description": "Free comprehensive backend course",
            "type": "course",
            "url": "https://www.theodinproject.com/paths/full-stack-javascript"
          }
        ],
        "scoreWeight": 0.15,
        "label": "I'm still learning backend fundamentals",
        "recommendations": [
          "Build a simple REST API with Express or Flask - start with 3-4 endpoints for a todo app or similar",
          "Learn to test your API with Postman or curl before connecting a frontend",
          "Understand HTTP methods (GET, POST, PUT, DELETE) and status codes (200, 404, 500)",
          "Set up a basic database and practice CRUD operations - create, read, update, delete"
        ],
        "mentorExplanation": "Backend development can feel abstract at first - you can't 'see' what's happening like with frontend. Start by understanding the request-response cycle: a client sends a request, your server processes it, and sends back a response. Build a simple REST API that handles GET and POST requests. Once you see data flowing, everything else (authentication, databases, etc.) builds on that foundation."
      },
      {
        "resources": [
          {
            "description": "100+ backend best practices with examples",
            "title": "Node.js Best Practices",
            "type": "github",
            "url": "https://github.com/goldbergyoni/nodebestpractices"
          },
          {
            "url": "https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/",
            "description": "How to design clean, maintainable APIs",
            "type": "article",
            "title": "REST API Design Best Practices"
          },
          {
            "type": "video",
            "title": "SQL for Developers",
            "description": "SQL fundamentals and best practices",
            "url": "https://www.youtube.com/watch?v=HXV3zeQKqGY"
          }
        ],
        "scoreWeight": 0.35,
        "value": "basic",
        "mentorExplanation": "You can get data in and out - that's the foundation! Now level up by thinking about what happens when things go wrong. What if the database is slow? What if a user sends bad data? What if 1000 requests hit at once? Backend is about handling the unexpected. Add error handling, input validation, and basic logging to your APIs.",
        "label": "I can build basic APIs and database queries",
        "recommendations": [
          "Add proper error handling to your APIs - return meaningful error messages and status codes",
          "Learn input validation - never trust client data, always validate before processing",
          "Implement basic authentication - understand JWTs or session-based auth at a practical level",
          "Practice writing database queries efficiently - learn about indexes and avoid N+1 query problems"
        ]
      },
      {
        "resources": [
          {
            "url": "https://github.com/donnemartin/system-design-primer",
            "type": "github",
            "description": "Learn to design large-scale systems",
            "title": "System Design Primer"
          },
          {
            "type": "article",
            "description": "Components of modern web applications",
            "title": "Web Architecture 101",
            "url": "https://medium.com/storyblocks-engineering/web-architecture-101-a3224e126947"
          }
        ],
        "scoreWeight": 0.6,
        "value": "competent",
        "mentorExplanation": "You're thinking beyond single-server applications. Understanding distributed systems - load balancing, caching, message queues - shows architectural maturity. The next challenge is operationalizing this knowledge: monitoring, logging, graceful degradation. When your service is deployed, how do you know it's healthy? How do you debug issues in production?",
        "recommendations": [
          "Implement structured logging and monitoring - logs should tell a story when debugging production issues",
          "Learn to use caching strategically - Redis for session data, CDN for static assets, database query caching",
          "Practice writing idempotent APIs - operations that can safely be retried without causing problems",
          "Understand database transactions and when to use them - consistency matters in distributed systems"
        ],
        "isCorrect": true,
        "label": "I design scalable services and understand distributed systems concepts"
      },
      {
        "value": "strong",
        "scoreWeight": 0.8,
        "resources": [
          {
            "url": "https://microservices.io/patterns/index.html",
            "type": "docs",
            "description": "Catalog of microservice architecture patterns",
            "title": "Microservices Patterns"
          },
          {
            "title": "Site Reliability Engineering",
            "type": "book",
            "description": "Google's approach to production systems (free book)",
            "url": "https://sre.google/books/"
          },
          {
            "title": "High Scalability Blog",
            "type": "article",
            "description": "Real-world architecture case studies",
            "url": "http://highscalability.com/"
          }
        ],
        "label": "I architect microservices, optimize performance, and handle production issues",
        "isCorrect": true,
        "recommendations": [
          "Document architectural decisions - write ADRs (Architecture Decision Records) explaining why you chose an approach",
          "Build observability into systems from the start - metrics, traces, and logs should tell the complete story",
          "Practice chaos engineering on non-critical systems - intentionally break things to see how they fail",
          "Mentor others on production debugging - teach them how to read logs, traces, and metrics effectively"
        ],
        "mentorExplanation": "You're comfortable with production systems and their complexities. You know that microservices bring both power and complexity - service boundaries, network calls, distributed transactions. The expertise level is about knowing trade-offs: when to use microservices vs monolith, SQL vs NoSQL, synchronous vs asynchronous. Share this decision-making process with others."
      },
      {
        "label": "I design system architecture and mentor on backend best practices",
        "isCorrect": true,
        "recommendations": [
          "Write technical blog posts or internal docs about architectural patterns and when to use them",
          "Establish engineering standards and practices - create runbooks, playbooks, and decision frameworks",
          "Run architecture review sessions where the team discusses and learns from design decisions",
          "Stay current with backend trends but evaluate them critically - not every new technology solves real problems"
        ],
        "mentorExplanation": "You make architectural decisions that affect the entire organization. You understand that technology choices are business decisions - they impact cost, scalability, hiring, and time-to-market. Your expertise is valuable not just in code, but in teaching others to think systematically about backend architecture. Document your decision-making process - it becomes organizational knowledge.",
        "value": "expert",
        "resources": [
          {
            "type": "book",
            "description": "Learn from real-world system designs (free)",
            "title": "The Architecture of Open Source Applications",
            "url": "https://aosabook.org/"
          },
          {
            "type": "article",
            "title": "InfoQ - Architecture & Design",
            "description": "Current trends and case studies in architecture",
            "url": "https://www.infoq.com/architecture-design/"
          }
        ],
        "scoreWeight": 0.95
      }
    ],
    "type": "multiple-choice",
    "title": "How would you describe your ability to solve technical problems and apply your knowledge in backend development?"
  },
  {
    "id": "e0d51655-1cb4-43f2-85d2-edc1bac181a2",
    "category": "Learning & Growth",
    "followUpQuestion": "",
    "allowOther": true,
    "hint": "The best developers continuously learn through multiple channels",
    "options": [
      {
        "label": "Build side projects",
        "recommendations": [
          "Share your projects publicly so others can learn from your work and give feedback.",
          "Try new technologies in small experiments before using them in bigger projects.",
          "Focus on building projects that solve real, practical problems instead of only learning exercises."
        ],
        "mentorExplanation": "Side projects let you experiment without consequences. Try risky things, fail fast, learn what works. Building in public adds accountability and networking. Your side project might become your next job.",
        "value": "practice",
        "scoreWeight": 0.2,
        "resources": [
          {
            "type": "github",
            "title": "Project Ideas",
            "url": "https://github.com/florinpop17/app-ideas"
          },
          {
            "url": "https://www.indiehackers.com/group/build-in-public",
            "type": "article",
            "title": "Build in Public"
          }
        ]
      },
      {
        "mentorExplanation": "Open source shows you production codebases and gets you feedback from experienced developers. Start small - docs, typos, good-first-issues. Even small PRs build confidence and reputation.",
        "recommendations": [
          "Start by reading documentation before jumping into implementation.",
          "Try fixing small bugs or issues in tools you already use to understand them better.",
          "Build a portfolio of projects to show your skills and track your progress."
        ],
        "label": "Contribute to open source",
        "resources": [
          {
            "url": "https://github.com/firstcontributions/first-contributions",
            "title": "First Contributions",
            "type": "github"
          },
          {
            "url": "https://opensource.guide/",
            "type": "docs",
            "title": "Open Source Guide"
          }
        ],
        "scoreWeight": 0.25,
        "value": "opensource"
      },
      {
        "scoreWeight": 0.2,
        "resources": [
          {
            "type": "docs",
            "title": "MDN Web Docs",
            "url": "https://developer.mozilla.org/"
          },
          {
            "url": "https://github.com/tc39/proposals",
            "type": "github",
            "title": "TC39 Proposals",
            "description": "JavaScript proposals"
          },
          {
            "type": "docs",
            "title": "IETF RFCs",
            "url": "https://www.ietf.org/standards/rfcs/"
          }
        ],
        "value": "documentation",
        "mentorExplanation": "Docs are the source of truth everyone skips. Reading them catches nuances blog posts miss. RFCs show you where technology is heading before it ships. Make this a habit.",
        "recommendations": [
          "Read changelogs to stay updated on what is new or changed in the tools you use.",
          "Focus on understanding the core concepts before learning advanced features.",
          "Contribute to documentation to improve clarity for others and reinforce your own understanding."
        ],
        "label": "Read official documentation and RFCs"
      },
      {
        "value": "conferences",
        "scoreWeight": 0.2,
        "resources": [
          {
            "url": "https://www.meetup.com/",
            "title": "Meetup.com",
            "type": "article"
          },
          {
            "url": "https://speaking.io/",
            "type": "docs",
            "title": "Conference Talk Ideas"
          }
        ],
        "recommendations": [
          "Connect with other developers to learn different ways of solving problems.",
          "Speak at local meetups to practice explaining your work and ideas.",
          "Share what you learn with your team so everyone can grow together."
        ],
        "label": "Attend conferences or meetups - online or onsite",
        "mentorExplanation": "Conferences expose you to new ideas and people working on different problems. The hallway track (conversations between talks) is often more valuable than the talks. Virtual events count too."
      },
      {
        "value": "books",
        "scoreWeight": 0.18,
        "resources": [
          {
            "type": "github",
            "title": "Developer Reading List",
            "url": "https://github.com/mr-mig/every-programmer-should-know"
          }
        ],
        "label": "Read programming and software engineering books",
        "recommendations": [
          "Read classics and new releases",
          "Discuss with reading groups",
          "Apply concepts immediately"
        ],
        "mentorExplanation": "Books go deeper than articles. Classic books (Clean Code, Pragmatic Programmer) stay relevant for decades. Take notes, highlight, discuss with others. One good book beats a hundred blog posts."
      },
      {
        "value": "blogs",
        "scoreWeight": 0.15,
        "resources": [
          {
            "type": "github",
            "title": "Developer Blog List",
            "url": "https://github.com/kilimchoi/engineering-blogs"
          },
          {
            "title": "Dev.to Community",
            "type": "article",
            "url": "https://dev.to/"
          }
        ],
        "label": "Read tech blogs and articles regularly",
        "recommendations": [
          "Create a curated reading list",
          "Share interesting articles with team"
        ],
        "mentorExplanation": "Blogs keep you current on trends and techniques. Don't just consume - take notes, try examples, share what resonates. Build a curated list of quality sources; most content is noise."
      },
      {
        "mentorExplanation": "Pairing transfers knowledge faster than any other method. You absorb techniques unconsciously by watching someone work. It's also the best way to learn a new codebase or technology quickly.",
        "recommendations": [
          "Set up regular pair programming sessions to learn from others and share knowledge.",
          "Take a few minutes after each session to reflect on what you learned and what can be improved."
        ],
        "label": "Pair program or mob code with colleagues",
        "resources": [
          {
            "type": "article",
            "title": "Pair Programming Guide",
            "url": "https://www.martinfowler.com/articles/on-pair-programming.html"
          }
        ],
        "scoreWeight": 0.22,
        "value": "pair-learning"
      },
      {
        "recommendations": [
          "Finish course projects to practice what you learn in a structured way.",
          "Apply course concepts to real work tasks to reinforce your understanding.",
          "Use a mix of free and paid courses to get different perspectives and learning depth."
        ],
        "label": "Take online courses",
        "mentorExplanation": "Courses structure your learning and fill knowledge gaps. The key is finishing what you start and building something with it. Passive watching teaches less than active doing.",
        "value": "courses",
        "resources": [
          {
            "url": "https://www.freecodecamp.org/",
            "title": "freeCodeCamp",
            "type": "course"
          }
        ],
        "scoreWeight": 0.18
      },
      {
        "value": "youtube",
        "scoreWeight": 0.15,
        "resources": [
          {
            "url": "https://www.youtube.com/@Fireship",
            "title": "Fireship",
            "type": "video"
          },
          {
            "type": "video",
            "title": "Traversy Media",
            "url": "https://www.youtube.com/@TraversyMedia"
          },
          {
            "type": "video",
            "title": "The Primeagen",
            "url": "https://www.youtube.com/@ThePrimeagen"
          }
        ],
        "label": "Watch technical videos and tutorials",
        "recommendations": [
          "Follow trusted learning channels to stay consistent with quality content.",
          "Build projects while following tutorials to practice hands-on skills.",
          "Take clear notes so you can review and reuse what you learn later."
        ],
        "mentorExplanation": "Videos work for visual learning, but watch actively - pause, try things, build along. Speed up playback to 1.5-2x and take notes. Don't just collect videos to watch later; actually watch them."
      },
      {
        "value": "newsletters",
        "scoreWeight": 0.13,
        "resources": [
          {
            "type": "article",
            "title": "JavaScript Weekly",
            "url": "https://javascriptweekly.com/"
          },
          {
            "url": "https://nodeweekly.com/",
            "title": "Node Weekly",
            "type": "article"
          }
        ],
        "label": "Subscribe to tech newsletters",
        "recommendations": [
          "Curate your subscriptions",
          "Archive and review weekly",
          "Share interesting finds"
        ],
        "mentorExplanation": "Newsletters deliver curated content without the social media noise. But don't just hoard them - read and act. Unsubscribe from ones you skip consistently. Quality over quantity."
      },
      {
        "mentorExplanation": "Papers contain bleeding-edge ideas before they hit blogs. Start with classics - MapReduce, Dynamo, Attention Is All You Need. Papers With Code links papers to implementations, making them practical.",
        "label": "Read academic papers and research",
        "recommendations": [
          "Use Papers With Code for practical papers",
          "Join paper reading groups",
          "Implement algorithms from papers"
        ],
        "resources": [
          {
            "title": "Papers With Code",
            "type": "article",
            "url": "https://paperswithcode.com/"
          },
          {
            "url": "https://blog.acolyer.org/",
            "title": "The Morning Paper",
            "type": "article",
            "description": "CS paper summaries"
          }
        ],
        "scoreWeight": 0.23,
        "value": "research-papers"
      },
      {
        "label": "Listen to tech podcasts",
        "recommendations": [
          "Take notes on key insights",
          "Explore topics mentioned",
          "Share episodes with team"
        ],
        "mentorExplanation": "Podcasts fill dead time - commutes, workouts, chores. But listen actively; take notes on interesting points and follow up. Passive listening is entertainment, not learning.",
        "value": "podcasts",
        "resources": [
          {
            "url": "https://softwareengineeringdaily.com/",
            "title": "Software Engineering Daily",
            "type": "article"
          },
          {
            "type": "article",
            "title": "Syntax.fm",
            "url": "https://syntax.fm/"
          },
          {
            "url": "https://javascriptjabber.com/",
            "type": "article",
            "title": "JavaScript Jabber"
          }
        ],
        "scoreWeight": 0.12
      },
      {
        "scoreWeight": 0.12,
        "resources": [
          {
            "url": "https://www.linkedin.com/",
            "title": "Engage on LinkedIn",
            "type": "article"
          }
        ],
        "value": "twitter",
        "mentorExplanation": "Social media can be noisy but following the right people gives industry pulse. Engage, don't just lurk - comment, share, discuss. Build relationships, not just follower counts.",
        "label": "Follow developers and tech leaders on social media",
        "recommendations": [
          "Engage in discussions",
          "Share your insights",
          "Build your network"
        ]
      },
      {
        "value": "none",
        "scoreWeight": 0,
        "resources": [
          {
            "url": "https://dev.to/",
            "title": "Developer Communities",
            "type": "article"
          }
        ],
        "label": "I don't actively follow trends",
        "recommendations": [
          "Subscribe to tech newsletters",
          "Join developer communities",
          "Start small - follow 3-5 good sources"
        ],
        "mentorExplanation": "Tech moves fast. Not learning means falling behind. Start small: pick ONE thing from this list. Even 15 minutes daily compounds over time. What you learned a year ago is already outdated in some areas."
      }
    ],
    "type": "checkbox",
    "title": "How do you stay current with industry trends and best practices? (Select all that apply)"
  },
  {
    "id": "e1051181-51ed-455a-80ba-a45cf62bf63e",
    "hint": "Consider: solving problems without exact examples, explaining how things work, frequency of getting stuck, ability to adapt solutions",
    "options": [
      {
        "scoreWeight": 0.1,
        "resources": [
          {
            "url": "https://www.freecodecamp.org/",
            "description": "Structured learning path",
            "type": "course",
            "title": "freeCodeCamp"
          },
          {
            "url": "https://developer.mozilla.org/en-US/docs/Learn",
            "description": "Beginner documentation",
            "type": "docs",
            "title": "MDN Learn"
          }
        ],
        "value": "level1",
        "mentorExplanation": "You're at the beginning - focus on understanding fundamentals. When you copy code, understand each line. Keep a learning journal. Don't be discouraged - getting stuck is part of learning.",
        "label": "I need very similar examples to solve problems and get stuck very often. I struggle to explain how things work.",
        "recommendations": [
          "Start with tutorial projects to build foundational understanding",
          "Practice explaining code out loud",
          "Break down existing code to understand how each part works",
          "Join beginner-friendly coding communities"
        ]
      },
      {
        "label": "I can follow tutorials but struggle when slightly different. I get stuck often and search frequently.",
        "recommendations": [
          "Modify tutorial code with variations",
          "Try solving before searching",
          "Read documentation regularly"
        ],
        "mentorExplanation": "You're making progress! Focus on WHY solutions work. Take time to understand each part. Build a personal knowledge base.",
        "value": "level2",
        "resources": [
          {
            "url": "https://www.frontendmentor.io/",
            "type": "course",
            "description": "Real-world projects",
            "title": "Frontend Mentor"
          }
        ],
        "scoreWeight": 0.2
      },
      {
        "mentorExplanation": "Good progress! Before searching, spend 15-20 minutes trying approaches. Read library source code. Focus on understanding tradeoffs.",
        "label": "I adapt examples to my situation but need external references regularly. I get stuck moderately often.",
        "recommendations": [
          "Challenge yourself to solve before searching",
          "Deep dive into framework documentation",
          "Practice explaining code"
        ],
        "resources": [
          {
            "url": "https://www.patterns.dev/",
            "description": "Modern web patterns",
            "title": "Patterns.dev",
            "type": "docs"
          }
        ],
        "scoreWeight": 0.3,
        "value": "level3"
      },
      {
        "recommendations": [
          "Learn advanced features of the frameworks you use to understand how they work under the hood.",
          "Build more complex personal projects to practice handling real-world challenges and system design.",
          "Try solving the same problem in different ways to understand tradeoffs and improve your thinking."
        ],
        "label": "I solve simpler tasks alone but need references for complex problems. I understand basics but not all details.",
        "mentorExplanation": "Intermediate territory! Focus on WHY things work. Study tool internals. Read about performance and security.",
        "value": "level4",
        "resources": [
          {
            "title": "Epic React",
            "type": "course",
            "description": "Advanced React",
            "url": "https://epicreact.dev/"
          }
        ],
        "scoreWeight": 0.4
      },
      {
        "value": "level5",
        "resources": [
          {
            "type": "github",
            "title": "System Design Primer",
            "description": "Design fundamentals",
            "url": "https://github.com/donnemartin/system-design-primer"
          }
        ],
        "scoreWeight": 0.5,
        "label": "I handle most standard tasks independently. I understand how things work but occasionally need documentation.",
        "recommendations": [
          "Try solving tasks on your own before checking documentation.",
          "Learn how key parts of the system work so you can figure things out more easily.",
          "Understand how your work fits into the bigger system to handle harder tasks with more confidence."
        ],
        "mentorExplanation": "Solidly intermediate! Expand impact and deepen expertise. Think architecture, not just implementation."
      },
      {
        "label": "I solve complex problems independently and explain how tech works. Rarely stuck except on specific edge cases.",
        "recommendations": [
          "Keep documenting edge cases so they become easier for the whole team to handle.",
          "Share your explanations of how systems work to help others learn and align.",
          "Focus on improving how you prevent edge-case issues during design, not just fixing them later."
        ],
        "mentorExplanation": "Strong intermediate to advanced! Focus on breadth and leadership. Share knowledge. Study performance and accessibility.",
        "value": "level6",
        "resources": [
          {
            "url": "https://hpbn.co/",
            "type": "book",
            "title": "High Performance Browser Networking",
            "description": "Web performance"
          }
        ],
        "scoreWeight": 0.6
      },
      {
        "recommendations": [
          "Share your architectural reasoning so others understand the “why,” not just the solution.",
          "Keep validating your designs with real system constraints like scale, cost, and performance.",
          "Help raise team capability by mentoring others on how to think through complex system design."
        ],
        "label": "Deep understanding, architect complex solutions. Understand not just how but why. Getting stuck is rare.",
        "mentorExplanation": "Advanced level! You understand 'why' behind decisions. Focus on impact and leadership. Study large-scale systems.",
        "value": "level7",
        "scoreWeight": 0.7,
        "resources": []
      },
      {
        "label": "I solve almost any problem independently with full understanding. I design robust solutions with edge cases.",
        "recommendations": [
          "Lead architectural decisions by making sure choices are clear, well explained, and agreed on by the team.",
          "Evaluate new technologies by testing them in real use cases before adopting them widely.",
          "Try to suggest or build tools and frameworks that are simple, well documented, and easy for the team to use."
        ],
        "mentorExplanation": "Senior/expert level! Focus on strategic impact. Build teams that scale. Influence stack decisions.",
        "value": "level8",
        "scoreWeight": 0.8,
        "resources": [
          {
            "url": "https://www.oreilly.com/library/view/the-managers-path/9781491973882/",
            "title": "The Manager's Path",
            "type": "book",
            "description": "Technical leadership"
          }
        ]
      },
      {
        "mentorExplanation": "Outstanding mastery! You define best practices. Extend impact beyond code - shape standards, influence frameworks.",
        "recommendations": [
          "Share your solutions and thinking so others can learn and reuse your approaches.",
          "Focus on making your innovations practical and easy for the team to adopt.",
          "Keep challenging yourself with new or unfamiliar problems to continue growing."
        ],
        "label": "I have strong expertise and often create new solutions. I rarely face problems I cannot solve.",
        "resources": [],
        "scoreWeight": 0.9,
        "value": "level9"
      },
      {
        "mentorExplanation": "Exceptional! You create technology. Focus on legacy - problems that benefit millions. Create frameworks, write books, teach.",
        "label": "I have expert knowledge across the stack. I build new solutions and help improve how software is built.",
        "recommendations": [
          "Focus on making your solutions practical so they can be used by real teams.",
          "Share your work clearly so others can understand and reuse it.",
          "Keep testing your ideas in real projects to make sure they create real value."
        ],
        "scoreWeight": 1,
        "resources": [
          {
            "description": "JavaScript specification",
            "type": "docs",
            "title": "TC39",
            "url": "https://tc39.es/"
          }
        ],
        "value": "level10"
      }
    ],
    "type": "multiple-choice",
    "title": "How would you describe your ability to solve technical problems and apply your knowledge in frontend development?",
    "category": "Technical Knowledge & Understanding",
    "followUpQuestion": ""
  },
  {
    "id": "fc3566aa-9b66-406c-bae1-bb84427a0dbe",
    "type": "multiple-choice",
    "title": "How often do you participate in code reviews?",
    "hint": "Quality code reviews are about learning together, not just catching bugs",
    "options": [
      {
        "scoreWeight": 0.68,
        "resources": [
          {
            "title": "Mentoring Through Code Reviews",
            "type": "article",
            "url": "https://blog.pragmaticengineer.com/good-code-reviews-better-code-reviews/"
          },
          {
            "url": "https://www.kevinlondon.com/2015/05/05/code-review-best-practices.html",
            "title": "Code Review Standards",
            "type": "article"
          }
        ],
        "value": "regularly",
        "mentorExplanation": "Regular reviews mean you're seeing how the codebase evolves, not just your corner of it. Use reviews to teach - when you explain why something matters, that's mentoring. The comments you leave shape how people code.",
        "recommendations": [
          "Mentor juniors through code reviews",
          "Establish review standards",
          "Share patterns you see"
        ],
        "isCorrect": true,
        "label": "Regularly as part of my workflow"
      },
      {
        "label": "I review code but mostly approve without deep analysis",
        "recommendations": [
          "Learn what to look for in code reviews",
          "Practice giving constructive feedback",
          "Take time to understand context"
        ],
        "mentorExplanation": "Rubber-stamping reviews is worse than not reviewing - it gives false confidence. Actually pull the code and run it. Ask questions when you don't understand. It's fine to say 'I need more time to review this properly' instead of a quick LGTM.",
        "value": "passive",
        "scoreWeight": 0.28,
        "resources": [
          {
            "url": "https://github.com/mgreiler/code-review-checklist",
            "title": "Code Review Checklist",
            "type": "github"
          },
          {
            "url": "https://mtlynch.io/human-code-reviews-1/",
            "type": "article",
            "title": "Giving Constructive Feedback"
          }
        ],
        "isCommonMistake": true
      },
      {
        "isCorrect": true,
        "recommendations": [
          "Create comprehensive guidelines",
          "Train team on effective reviews",
          "Measure and improve review metrics"
        ],
        "label": "I lead code review processes and set standards for the team",
        "mentorExplanation": "When you set the review culture, you're shaping how the whole team thinks about quality. Good review standards mean everyone gets better, not just individuals. Keep making it a learning experience, not a gate to pass through.",
        "value": "lead",
        "resources": [
          {
            "title": "Review Process Guide",
            "type": "github",
            "url": "https://github.com/thoughtbot/guides/tree/main/code-review"
          }
        ],
        "scoreWeight": 1
      },
      {
        "scoreWeight": 0.15,
        "resources": [
          {
            "type": "docs",
            "description": "Google's code review guide",
            "title": "Code Review Best Practices",
            "url": "https://google.github.io/eng-practices/review/"
          },
          {
            "url": "https://www.freecodecamp.org/news/code-review-tips/",
            "title": "How to Review Code",
            "type": "article"
          },
          {
            "title": "Effective Code Reviews",
            "type": "video",
            "url": "https://www.youtube.com/watch?v=a9_0UUUNt-Y"
          }
        ],
        "value": "rarely",
        "mentorExplanation": "You're missing one of the best learning opportunities - seeing how experienced developers write code and think through problems. Volunteer to review; you don't have to be an expert to ask good questions. That's how you learn.",
        "label": "Rarely or never",
        "recommendations": [
          "Start reviewing pull requests regularly",
          "Learn code review best practices",
          "Ask to be added as a reviewer"
        ]
      },
      {
        "isCorrect": true,
        "recommendations": [
          "Document common patterns",
          "Create team review guidelines",
          "Host code review workshops"
        ],
        "label": "I actively seek out PRs to review and provide detailed feedback",
        "mentorExplanation": "Proactive reviewing means you care about the codebase, not just your part of it. The detailed feedback you give makes everyone better. Consider documenting the patterns you see repeatedly - that becomes team knowledge, not just review comments.",
        "value": "proactive",
        "resources": [
          {
            "type": "video",
            "title": "Advanced Code Review",
            "url": "https://www.youtube.com/watch?v=PJjmw9TRB7s"
          },
          {
            "url": "https://github.com/features/code-review/",
            "title": "Team Code Review Process",
            "type": "docs"
          }
        ],
        "scoreWeight": 0.83
      },
      {
        "recommendations": [
          "Volunteer for more code reviews",
          "Review across different areas",
          "Provide constructive feedback"
        ],
        "label": "Occasionally when asked",
        "mentorExplanation": "Occasional reviews are better than none, but you're reactive instead of proactive. Make it a habit - review something every day or two. You stay connected to what's changing and build better working relationships with teammates.",
        "value": "sometimes",
        "scoreWeight": 0.42,
        "resources": [
          {
            "url": "https://testing.googleblog.com/2017/06/code-health-too-many-comments-on-your.html",
            "title": "Thoughtful Code Reviews",
            "type": "article"
          }
        ]
      }
    ],
    "category": "Collaboration",
    "allowOther": true
  }
]

// ─────────────────────────────────────────────────────────────────────────────
// SCORE LEVELS
// ─────────────────────────────────────────────────────────────────────────────
export const SCORE_LEVELS = {
  BEGINNER: { min: 0, max: 3.9, label: 'Beginner', color: 'text-red-600', description: 'Starting to learn and build foundational skills' },
  JUNIOR: { min: 4, max: 5.9, label: 'Junior', color: 'text-orange-600', description: 'Building foundations and learning core concepts' },
  INTERMEDIATE: { min: 6, max: 7.9, label: 'Intermediate', color: 'text-yellow-600', description: 'Solid fundamentals with growing independence' },
  UPPER_INTERMEDIATE: { min: 8, max: 10, label: 'Upper Intermediate', color: 'text-green-600', description: 'Strong skills with deep technical knowledge' },
};

export const getSkillLevel = (score: number): typeof SCORE_LEVELS[keyof typeof SCORE_LEVELS] => {
  if (score < 4) return SCORE_LEVELS.BEGINNER;
  if (score < 6) return SCORE_LEVELS.JUNIOR;
  if (score < 8) return SCORE_LEVELS.INTERMEDIATE;
  return SCORE_LEVELS.UPPER_INTERMEDIATE;
};