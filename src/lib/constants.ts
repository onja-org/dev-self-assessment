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
    "category": "Communication",
    "allowOther": true,
    "options": [
      {
        "resources": [],
        "mentorExplanation": "Adapting language to your audience shows empathy. Next level: persuasion. When you need budget for tech debt, can you frame it as risk reduction? When proposing a new architecture, can you quantify the business impact? Frame technical work in business terms.",
        "isCorrect": true,
        "label": "I adapt my language for the audience and convey technical trade-offs clearly",
        "scoreWeight": 0.6,
        "recommendations": [
          "Level up to persuasive communication",
          "Learn to write compelling technical proposals",
          "Practice presenting to executives"
        ],
        "value": "competent"
      },
      {
        "resources": [
          {
            "url": "https://www.youtube.com/watch?v=Unzc731iCUY",
            "type": "video",
            "title": "Executive Communication"
          }
        ],
        "label": "I can explain basics but lose non-technical people on complex topics",
        "mentorExplanation": "Non-technical stakeholders care about outcomes, not implementation. Don't say 'We need to refactor the database layer.' Say 'This 2-week investment will cut customer-facing errors by 80%.' Lead with impact, not technical details.",
        "scoreWeight": 0.35,
        "recommendations": [
          "Practice structured storytelling",
          "Focus on business impact over technical details",
          "Use before/after scenarios"
        ],
        "value": "basic"
      },
      {
        "value": "expert",
        "recommendations": [
          "Publish thought leadership content",
          "Speak at industry conferences",
          "Mentor leaders on technical communication"
        ],
        "scoreWeight": 1,
        "mentorExplanation": "You shape organizational direction through communication. Your technical vision becomes company strategy because you translate it into business value. This is rare. Share this skill - write, speak publicly, mentor others.",
        "label": "I shape technical vision at an organizational level through compelling communication",
        "isCorrect": true,
        "resources": [
          {
            "url": "https://ctohb.com/",
            "type": "book",
            "title": "CTO Communication Patterns"
          }
        ]
      },
      {
        "value": "struggle",
        "recommendations": [
          "Practice the \"explain it to a 5-year-old\" technique",
          "Use analogies and visual aids",
          "Study technical writing basics"
        ],
        "scoreWeight": 0.15,
        "label": "I struggle to explain technical concepts in plain language",
        "mentorExplanation": "Bridging technical and business worlds is one of the most valuable skills you can develop. Practice the Feynman Technique: explain concepts using simple language. If your audience needs a dictionary to understand you, you've lost them. Use analogies.",
        "resources": [
          {
            "title": "Feynman Technique",
            "url": "https://fs.blog/feynman-technique/",
            "type": "article"
          },
          {
            "url": "https://developers.google.com/tech-writing",
            "type": "course",
            "title": "Technical Communication for Engineers"
          }
        ]
      },
      {
        "scoreWeight": 0.8,
        "recommendations": [
          "Mentor engineers on stakeholder communication",
          "Develop your personal communication style",
          "Create communication guidelines for your team"
        ],
        "value": "strong",
        "resources": [
          {
            "url": "https://staffeng.com/guides/staff-archetypes/",
            "type": "article",
            "title": "Staff Engineer Communication"
          },
          {
            "title": "Engineering Manager Communication",
            "url": "https://leaddev.com/communication",
            "type": "article"
          }
        ],
        "mentorExplanation": "You bridge technical-business effectively. This skill drives careers to staff/principal level. Help your team develop it - pair junior engineers with stakeholder communication opportunities. Make communication a core competency.",
        "isCorrect": true,
        "label": "I regularly present technical strategy to leadership and align it with business goals"
      }
    ],
    "title": "How well do you communicate technical concepts to non-technical stakeholders?",
    "hint": "Translating complexity into clear business impact is a key senior developer skill"
  },
  {
    "id": "0c273934-629a-4a68-aa49-43cd66ef7fbc",
    "title": "How would you describe your ability to follow instructions and prevent bugs in your code?",
    "hint": "Consider: following given instructions accurately, implementing feedback correctly, bug frequency in your contributions, speed of identifying and fixing your own errors",
    "followUpQuestion": "",
    "options": [
      {
        "label": "I frequently create bugs and often fail to follow instructions correctly. I need significant help fixing issues.",
        "mentorExplanation": "Start with clarity! Before coding, list what you're asked to do. Confirm understanding. Test each requirement. When you get feedback, implement it exactly, then verify. Precision comes from process.",
        "resources": [],
        "recommendations": [
          "Read instructions completely before starting",
          "Take notes during discussions",
          "Test thoroughly before submitting",
          "Ask clarifying questions upfront"
        ],
        "value": "bugs1",
        "scoreWeight": 0.1
      },
      {
        "value": "bugs2",
        "recommendations": [
          "Create acceptance criteria checklists",
          "Test against requirements systematically",
          "Learn common bug patterns to avoid",
          "Document implementation before coding"
        ],
        "scoreWeight": 0.2,
        "label": "I often create bugs and sometimes misunderstand instructions. I can fix issues with guidance.",
        "mentorExplanation": "Build systematic habits! For every task: 1) List requirements, 2) Plan approach, 3) Implement, 4) Test each requirement, 5) Review. This structure reduces bugs and ensures you deliver what's asked.",
        "resources": [
          {
            "url": "https://jvns.ca/blog/2019/06/23/a-few-debugging-resources/",
            "type": "article",
            "description": "Finding bugs",
            "title": "Debugging Strategies"
          }
        ]
      },
      {
        "value": "bugs3",
        "recommendations": [
          "Improve requirement understanding",
          "Test edge cases more thoroughly",
          "Learn defensive programming",
          "Practice reproducing and fixing bugs quickly"
        ],
        "scoreWeight": 0.3,
        "mentorExplanation": "You're developing! Reduce bugs by thinking: 'What could go wrong?' Test those cases. When you get instructions, repeat them back to confirm. When bugs appear, fix quickly and learn the pattern.",
        "label": "I occasionally create bugs and sometimes need clarification on instructions. I can usually fix issues myself.",
        "resources": [
          {
            "type": "article",
            "url": "https://en.wikipedia.org/wiki/Defensive_programming",
            "description": "Preventing errors",
            "title": "Defensive Programming"
          },
          {
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling",
            "type": "docs",
            "description": "Handling failures",
            "title": "Error Handling"
          }
        ]
      },
      {
        "recommendations": [
          "Proactively clarify ambiguities",
          "Build comprehensive test coverage if test is a common practice in your team",
          "Learn from bugs to prevent recurrence",
          "Review your code for potential issues"
        ],
        "value": "bugs4",
        "scoreWeight": 0.4,
        "label": "I follow instructions well with occasional need for clarification. I create bugs sometimes but fix them independently.",
        "mentorExplanation": "Good progress! When instructions are unclear, ask before implementing (saves time). After a bug, ask: 'How could I have prevented this?' Build that check into your process. Learn from every issue.",
        "resources": [
          {
            "title": "Bug Tracking",
            "type": "docs",
            "url": "https://linear.app/docs",
            "description": "Issue management"
          }
        ]
      },
      {
        "recommendations": [
          "Start taking more ownership of design decisions, not just execution.",
          "Practice suggesting improvements or alternatives before implementing instructions.",
          "Look for opportunities to prevent issues earlier, not just fix them quickly."
        ],
        "value": "bugs5",
        "scoreWeight": 0.5,
        "label": "I follow instructions accurately and rarely create bugs. I quickly identify and fix my own issues.",
        "mentorExplanation": "Strong intermediate! You're reliable - following instructions well and delivering quality. Now help others - share your approach, review their work, create guides for common issues. Multiply your impact.",
        "resources": [
          {
            "url": "https://google.github.io/eng-practices/review/",
            "type": "docs",
            "description": "Effective reviews",
            "title": "Code Review Best Practices"
          }
        ]
      },
      {
        "recommendations": [
          "Start asking more questions about the “why” behind tasks to improve solutions, not just execute them.",
          "Practice suggesting improvements or alternative approaches before starting implementation.",
          "Take more ownership of outcomes, not just task completion and fixes."
        ],
        "value": "bugs6",
        "scoreWeight": 0.6,
        "label": "I consistently follow instructions precisely and rarely introduce bugs. I fix issues quickly when they occur.",
        "mentorExplanation": "Advanced reliability! People trust your implementations. Build on this - create team standards for requirement clarification, testing protocols, bug prevention checklists. Your precision becomes team capability.",
        "resources": [
          {
            "title": "Static Analysis",
            "type": "github",
            "url": "https://github.com/analysis-tools-dev/static-analysis",
            "description": "Automated bug detection"
          },
          {
            "description": "Testing interactions",
            "type": "article",
            "url": "https://martinfowler.com/bliki/IntegrationTest.html",
            "title": "Integration Testing"
          }
        ]
      },
      {
        "resources": [
          {
            "url": "https://cucumber.io/docs/bdd/",
            "type": "docs",
            "description": "BDD approach",
            "title": "Behavior-Driven Development"
          },
          {
            "type": "docs",
            "url": "https://docs.sonarsource.com/sonarqube/latest/user-guide/quality-gates/",
            "description": "Automated quality checks",
            "title": "Quality Gates"
          }
        ],
        "label": "I excel at precise implementation and almost never create bugs. I often exceed expectations in following directions.",
        "mentorExplanation": "Excellent! You're a model of precision. Scale this - build requirement templates, create testing frameworks, establish review processes. Help the team achieve your level of reliability.",
        "scoreWeight": 0.7,
        "value": "bugs7",
        "recommendations": [
          "Start getting more involved in design discussions, not just implementation, so you can help shape better solutions early.",
          "Practice questioning and improving requirements when needed, instead of only following them exactly.",
          "Take on more ownership by proposing alternative approaches and explaining trade-offs before you start building."
        ]
      },
      {
        "label": "I have very high precision in implementation. I rarely create bugs and consistently implement feedback correctly.",
        "mentorExplanation": "Senior/expert level! Your work is production-ready on first submission. Build systems - automated testing pipelines, quality metrics, requirement frameworks. Your precision sets organizational standards.",
        "resources": [
          {
            "description": "Production reliability",
            "type": "book",
            "url": "https://sre.google/sre-book/release-engineering/",
            "title": "Release Engineering"
          },
          {
            "description": "Built-in quality",
            "type": "article",
            "url": "https://www.scaledagileframework.com/built-in-quality/",
            "title": "Quality Culture"
          }
        ],
        "recommendations": [
          "Start focusing more on the “why” behind solutions, not just perfect execution, so you can influence better system design.",
          "Practice proposing improvements or alternatives before implementing feedback, instead of only executing it.",
          "Take on more end-to-end ownership of features, including design decisions and trade-offs, not just implementation."
        ],
        "value": "bugs8",
        "scoreWeight": 0.8
      },
      {
        "resources": [
          {
            "title": "Microsoft Research",
            "url": "https://www.microsoft.com/en-us/research/",
            "type": "article",
            "description": "Quality research"
          }
        ],
        "mentorExplanation": "Outstanding! You achieve near-perfect implementation. Share this mastery - publish methodologies, create frameworks, speak at conferences. Influence how the industry thinks about quality and precision.",
        "label": "I have strong attention to detail. I build reliable systems with very few bugs and help improve overall quality.",
        "scoreWeight": 0.9,
        "recommendations": [
          "Expand your impact beyond individual systems to how multiple systems work together and scale.",
          "Focus on preventing entire classes of issues early through better design and processes, not just fixing implementation bugs.",
          "Take more leadership in setting standards and helping others improve quality, not only delivering high-quality work yourself."
        ],
        "value": "bugs9"
      },
      {
        "resources": [],
        "mentorExplanation": "Exceptional! Your precision enables mission-critical systems. Your frameworks prevent bugs at scale. Focus on maximum impact - create tools and standards that ensure quality for millions of users worldwide.",
        "label": "I have world-class standards for quality, and I build practices that help prevent bugs and improve reliability.",
        "scoreWeight": 1,
        "recommendations": [
          "Evolve your frameworks to handle new systems and larger scale.",
          "Share and teach your practices so others can adopt them.",
          "Influence broader engineering strategy, not just quality."
        ],
        "value": "bugs10"
      }
    ],
    "category": "Precision & Attention to Detail",
    "type": "multiple-choice"
  },
  {
    "id": "22665e92-a8b4-4308-b093-851cd0ac467f",
    "options": [
      {
        "resources": [
          {
            "title": "Epic React by Kent C. Dodds",
            "description": "Comprehensive React course from beginner to advanced. Best structured learning path for React.",
            "url": "https://epicreact.dev",
            "type": "course"
          },
          {
            "type": "course",
            "url": "https://fullstackopen.com/",
            "description": "Free university-level course covering React, Node.js, and full-stack development.",
            "title": "Full Stack Open"
          },
          {
            "title": "React Patterns",
            "description": "Modern React patterns and best practices. Great for intermediate developers.",
            "type": "article",
            "url": "https://www.patterns.dev/posts/reactjs/"
          }
        ],
        "label": "React",
        "mentorExplanation": "React is incredibly powerful for building modern user interfaces! Here's the thing - React is actually pretty simple at its core (it's just JavaScript), but the ecosystem can feel overwhelming. Focus on mastering hooks first - useState, useEffect, and custom hooks will take you far. Then, understand how React renders and re-renders - this knowledge prevents performance issues. Remember: React is declarative, which means you describe what the UI should look like, and React figures out how to make it happen. This mindset shift is crucial! Build small projects to practice, then gradually tackle state management (Context, Redux, Zustand). The best way to learn React is by building - start with something simple like a todo app, then level up to something more complex.",
        "scoreWeight": 0.8,
        "value": "react",
        "recommendations": [
          "Build a full-stack React application",
          "Master React hooks and performance optimization",
          "Learn state management patterns",
          "Practice component composition",
          "Optimize rendering performance",
          "Build accessible React apps"
        ]
      },
      {
        "recommendations": [
          "Create a REST API with Express",
          "Master async/await and the event loop",
          "Learn streams and buffers",
          "Build real-time applications if you have time",
          "Understand middleware patterns",
          "Optimize Node.js performance"
        ],
        "value": "nodejs",
        "scoreWeight": 0.8,
        "label": "Node.js",
        "mentorExplanation": "Node.js brings JavaScript to the backend, which is powerful because you can use one language across your entire stack! But here's what trips people up: Node.js is single-threaded with an event loop, which means it handles concurrency differently than languages like Java or Python. You need to understand async/await deeply - it's not just syntax, it's about thinking in asynchronous patterns. Learn about streams (they're super efficient for handling large data), middleware patterns (especially in Express), and error handling (unhandled promise rejections can crash your server!). Node.js shines for I/O-heavy operations like APIs and real-time apps. Start by building a REST API, then graduate to WebSockets or GraphQL. The ecosystem (npm) is massive - both a blessing and a curse. Choose packages wisely!",
        "resources": [
          {
            "description": "Comprehensive collection of 100+ best practices. Updated regularly.",
            "type": "github",
            "url": "https://github.com/goldbergyoni/nodebestpractices",
            "title": "Node.js Best Practices"
          },
          {
            "title": "Learn Node.js",
            "description": "Official learning resources with hands-on examples.",
            "url": "https://nodejs.dev/learn",
            "type": "docs"
          },
          {
            "url": "https://www.udemy.com/course/nodejs-the-complete-guide/",
            "type": "course",
            "description": "Comprehensive course covering APIs, authentication, and deployment.",
            "title": "Node.js: The Complete Guide"
          }
        ]
      },
      {
        "mentorExplanation": "TypeScript is a game-changer! At first it might feel like extra work, but once you experience catching bugs at compile time instead of runtime, you'll never want to go back. Here's my advice: start gradually. Don't try to make everything perfectly typed immediately - use 'any' sparingly at first, then tighten types as you learn. Focus on understanding type inference (TypeScript is smart - let it infer types when obvious), learn the utility types (Partial, Pick, Omit, etc. - they're incredibly useful), and practice type narrowing with type guards. The real power comes when you use generics - they let you write reusable, type-safe code. TypeScript isn't just about avoiding errors; it's about making your code self-documenting and enabling better autocomplete. This makes you faster! The investment pays off quickly.",
        "label": "TypeScript",
        "resources": [
          {
            "title": "TypeScript Handbook",
            "type": "docs",
            "url": "https://www.typescriptlang.org/docs/handbook/intro.html",
            "description": "Comprehensive official documentation. Best reference for TypeScript features."
          },
          {
            "title": "Type Challenges",
            "description": "Practice TypeScript types with challenges from easy to extreme. Learn by doing!",
            "url": "https://github.com/type-challenges/type-challenges",
            "type": "github"
          },
          {
            "title": "Effective TypeScript",
            "description": "62 specific ways to improve your TypeScript. Great for intermediate developers.",
            "url": "https://effectivetypescript.com/",
            "type": "book"
          },
          {
            "title": "TypeScript Deep Dive",
            "description": "Free book covering TypeScript in depth. Excellent resource for understanding internals.",
            "type": "article",
            "url": "https://basarat.gitbook.io/typescript/"
          },
          {
            "title": "React TypeScript Cheatsheet",
            "type": "docs",
            "url": "https://react-typescript-cheatsheet.netlify.app/",
            "description": "Essential patterns for using TypeScript with React. Community-maintained."
          }
        ],
        "recommendations": [
          "Master advanced types and generics",
          "Learn utility types",
          "Understand type inference",
          "Practice type narrowing",
          "Build type-safe APIs"
        ],
        "value": "typescript",
        "scoreWeight": 0.9
      },
      {
        "resources": [
          {
            "title": "Real Python",
            "description": "High-quality Python tutorials on everything from basics to advanced topics. Excellent explanations and practical examples.",
            "url": "https://realpython.com/",
            "type": "article"
          },
          {
            "title": "Python Official Tutorial",
            "description": "Start here for fundamentals. Official docs are well-written and comprehensive.",
            "type": "docs",
            "url": "https://docs.python.org/3/tutorial/"
          },
          {
            "title": "Automate the Boring Stuff",
            "type": "book",
            "url": "https://automatetheboringstuff.com/",
            "description": "Free book teaching Python through practical automation tasks. Perfect for beginners!"
          },
          {
            "description": "Learn design patterns in Python context. From basic to advanced patterns with clear examples.",
            "url": "https://python-patterns.guide/",
            "type": "article",
            "title": "Python Design Patterns"
          }
        ],
        "label": "Python",
        "mentorExplanation": "Python is wonderfully versatile - you can build web apps, automate tasks, process data, or even do machine learning! The language emphasizes readability: 'code is read more often than it's written.' Focus on writing 'Pythonic' code - use list comprehensions, understand the Zen of Python ('import this'), leverage the amazing standard library (it has so much built-in!). Python's philosophy is 'there should be one obvious way to do it,' which is refreshing. Learn about decorators (they're powerful for adding functionality), context managers (the 'with' statement), and when you're ready, async/await in Python. The ecosystem is massive: Django/Flask for web, Pandas/NumPy for data, FastAPI for modern APIs. Start with the fundamentals, then specialize based on your interests. Python's gentle learning curve makes it great for beginners, but there's depth for experts too!",
        "scoreWeight": 0.8,
        "value": "python",
        "recommendations": [
          "Build a data processing pipeline",
          "Learn Pythonic idioms and best practices",
          "Master list comprehensions",
          "Understand decorators and context managers",
          "Learn async Python"
        ]
      },
      {
        "label": "Java",
        "mentorExplanation": "Java has staying power - it's been enterprise-grade for decades! Here's what makes Java valuable: strong OOP principles, robust type system, and massive ecosystem. Modern Java (8+) is quite different from old Java - lambdas, streams, and Optional make code much more expressive. The JVM is incredibly mature and performant. Spring Boot is basically the standard for Java backend development - learn it well! Focus on understanding dependency injection (core to Spring), learn the Streams API (powerful functional programming), and understand how the JVM works (garbage collection, memory management). Java's verbosity is decreasing with each version. The ecosystem is battle-tested - when you need a library, it exists and it's probably maintained. Java teaches discipline: explicit typing, proper OOP, design patterns. These principles transfer to other languages. Great for building scalable, maintainable systems!",
        "resources": [
          {
            "description": "Official Spring Boot tutorials. Learn by building real applications step by step.",
            "type": "docs",
            "url": "https://spring.io/guides",
            "title": "Spring Boot Official Guides"
          },
          {
            "title": "Java Design Patterns",
            "description": "Comprehensive collection of design patterns implemented in Java. Over 200 patterns with explanations!",
            "type": "github",
            "url": "https://github.com/iluwatar/java-design-patterns"
          },
          {
            "title": "Baeldung",
            "url": "https://www.baeldung.com/",
            "type": "article",
            "description": "High-quality Java and Spring tutorials. Great for learning specific concepts with practical examples."
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
        "value": "java",
        "scoreWeight": 0.8
      },
      {
        "mentorExplanation": "SQL is fundamental for data persistence and one of those skills that never goes out of style! Here's the thing: databases are more than just storage - they're the backbone of most applications. Start with understanding relational concepts: tables, relationships, normalization. Then master SQL queries - SELECT, JOIN, GROUP BY, subqueries. The real magic happens when you understand query optimization: indexes, execution plans, and query performance. Learn about ACID properties and transactions - crucial for data integrity. Different databases (PostgreSQL, MySQL, SQL Server) have quirks, but core SQL concepts transfer. NoSQL is popular, but don't skip SQL - it's still dominant in the industry. A developer who truly understands databases becomes invaluable. Your backend code is only as good as your database design!",
        "label": "SQL/Databases",
        "resources": [
          {
            "title": "Use The Index, Luke",
            "url": "https://use-the-index-luke.com/",
            "type": "article",
            "description": "Free guide to database performance for developers. Practical and SQL-agnostic."
          },
          {
            "type": "docs",
            "url": "https://www.postgresqltutorial.com/",
            "description": "Comprehensive PostgreSQL tutorials from basics to advanced. Well-structured.",
            "title": "PostgreSQL Tutorial"
          },
          {
            "title": "Mode SQL Tutorial",
            "description": "Interactive SQL tutorial with real data. Great for beginners and intermediate learners.",
            "url": "https://mode.com/sql-tutorial/",
            "type": "course"
          }
        ],
        "value": "sql",
        "recommendations": [
          "Optimize database queries",
          "Design normalized schemas",
          "Learn indexing strategies",
          "Master JOINs and subqueries",
          "Understand transactions and ACID"
        ],
        "scoreWeight": 0.75
      },
      {
        "scoreWeight": 0.9,
        "value": "cloud",
        "recommendations": [
          "Learn to deploy staging/production apps",
          "Master infrastructure as code",
          "Learn serverless architectures",
          "Understand cloud cost optimization",
          "Build multi-region deployments"
        ],
        "resources": [
          {
            "description": "Comprehensive cloud learning platform with hands-on labs for AWS, Azure, GCP.",
            "url": "https://acloudguru.com/",
            "type": "course",
            "title": "A Cloud Guru"
          },
          {
            "description": "Learn Infrastructure as Code with Terraform. Essential cloud skill.",
            "url": "https://developer.hashicorp.com/terraform/tutorials",
            "type": "docs",
            "title": "Terraform Tutorial"
          },
          {
            "title": "The Good Parts of AWS",
            "description": "Practical guide focusing on the most useful AWS services. Cuts through the complexity.",
            "type": "book",
            "url": "https://dvassallo.gumroad.com/l/aws-good-parts"
          }
        ],
        "label": "Cloud (AWS/Azure/GCP)",
        "mentorExplanation": "Cloud platforms are absolutely essential for modern deployment - this skill is highly valued! Here's my advice: start with one platform and go deep before branching out. AWS has the largest market share, Azure is strong in enterprise, GCP excels in data/ML. Focus on core services first: compute (EC2/VMs), storage (S3/Blob), databases, and networking. Then learn about managed services - they save so much time! Infrastructure as Code (Terraform, CloudFormation) is crucial - treating infrastructure like code is a game-changer. Understand the shared responsibility model and cloud security basics. Learn about serverless (Lambda/Functions) - it's changing how we build. Cost optimization is important - cloud bills can spiral! Certifications are valuable here - they provide structured learning paths. Cloud knowledge makes you incredibly employable and enables you to build scalable systems. The cloud is not just hosting - it's a completely different way of architecting applications!"
      },
      {
        "scoreWeight": 0.85,
        "recommendations": [
          "Containerize applications",
          "Learn container orchestration",
          "Master Docker Compose",
          "Understand Kubernetes basics",
          "Learn deployment strategies",
          "Build CI/CD pipelines with containers"
        ],
        "value": "docker",
        "resources": [
          {
            "description": "Start here for Docker fundamentals. Official docs with hands-on examples.",
            "type": "docs",
            "url": "https://docs.docker.com/get-started/",
            "title": "Docker Official Tutorial"
          },
          {
            "title": "Kubernetes Basics",
            "type": "docs",
            "url": "https://kubernetes.io/docs/tutorials/kubernetes-basics/",
            "description": "Official Kubernetes tutorial. Interactive learning with a real cluster."
          }
        ],
        "label": "Docker/Kubernetes",
        "mentorExplanation": "Containers revolutionized software deployment - this is a must-have modern skill! Docker solves the 'works on my machine' problem by packaging your app with all its dependencies. Start by understanding what containers are (not VMs!), then learn Docker basics: images, containers, Dockerfile, volumes. Docker Compose is essential for multi-container apps - it's your local development powerhouse. Once you're comfortable with Docker, learn about container registries and image optimization (smaller images = faster deployments). Kubernetes is the next level - it orchestrates containers at scale. Start with basic concepts: pods, services, deployments. Don't rush into Kubernetes - get really comfortable with Docker first! Understanding containers makes you more DevOps-savvy and helps you build consistent, reproducible environments. Every modern development team uses containers - this skill is incredibly valuable!"
      },
      {
        "scoreWeight": 0.8,
        "recommendations": [
          "Try to build a Vue 3 application",
          "Master Composition API"
        ],
        "value": "vue",
        "resources": [
          {
            "title": "Vue.js Official Guide",
            "url": "https://vuejs.org/guide/introduction.html",
            "type": "docs"
          },
          {
            "url": "https://vuejs.org/guide/extras/composition-api-faq.html",
            "type": "docs",
            "title": "Vue 3 Composition API"
          }
        ],
        "mentorExplanation": "Vue is intuitive and powerful. The Composition API in Vue 3 brings it closer to React hooks while maintaining Vue's simplicity.",
        "label": "Vue.js"
      },
      {
        "recommendations": [
          "Build an Angular app",
          "Master RxJS observables"
        ],
        "value": "angular",
        "scoreWeight": 0.8,
        "label": "Angular",
        "mentorExplanation": "Angular is a complete framework with strong opinions. Excellent for large enterprise applications with complex requirements.",
        "resources": [
          {
            "type": "docs",
            "url": "https://angular.io/tutorial",
            "title": "Angular Official Tutorial"
          },
          {
            "title": "RxJS Documentation",
            "type": "docs",
            "url": "https://rxjs.dev/guide/overview"
          },
          {
            "title": "Angular University",
            "url": "https://angular-university.io/",
            "type": "course"
          }
        ]
      },
      {
        "scoreWeight": 0.75,
        "recommendations": [
          "Design NoSQL data models",
          "Learn aggregation pipelines"
        ],
        "value": "mongodb",
        "resources": [
          {
            "title": "Data Model Design",
            "url": "https://www.mongodb.com/docs/manual/core/data-modeling-introduction/",
            "type": "docs"
          }
        ],
        "label": "MongoDB/NoSQL",
        "mentorExplanation": "NoSQL databases like MongoDB offer flexibility for certain use cases. Understanding when to use SQL vs NoSQL is a valuable skill."
      },
      {
        "label": "GraphQL",
        "mentorExplanation": "GraphQL provides a flexible alternative to REST, particularly powerful for complex data requirements. It's gaining adoption rapidly!",
        "resources": [
          {
            "title": "Apollo GraphQL",
            "type": "course",
            "url": "https://www.apollographql.com/tutorials/"
          }
        ],
        "value": "graphql",
        "recommendations": [
          "Start building a GraphQL API",
          "Master schema design"
        ],
        "scoreWeight": 0.85
      },
      {
        "recommendations": [
          "Build a cross-platform mobile app",
          "Master Expo workflow",
          "Understand native bridge concepts",
          "Learn mobile UX patterns",
          "Handle offline-first data"
        ],
        "value": "react-native",
        "scoreWeight": 0.82,
        "label": "React Native / Mobile",
        "mentorExplanation": "Mobile development opens a huge user base! React Native lets you use your React knowledge on iOS and Android. Expo makes getting started easy - use it! Understand the bridge between JS and native code (it matters for performance). Learn about mobile-specific concerns: offline handling, push notifications, app store deployment. Platform differences between iOS and Android will bite you - test on both! Navigation is different from the web (react-navigation is the go-to). Performance matters more on mobile - optimize list rendering, image loading, and animations.",
        "resources": [
          {
            "title": "Expo Documentation",
            "url": "https://docs.expo.dev/",
            "type": "docs",
            "description": "Best starting point for React Native development. Covers setup to deployment."
          },
          {
            "title": "React Native Documentation",
            "description": "Official docs with guides and component reference.",
            "url": "https://reactnative.dev/docs/getting-started",
            "type": "docs"
          },
          {
            "title": "William Candillon YouTube",
            "description": "Best resource for advanced React Native animations and Reanimated.",
            "url": "https://www.youtube.com/@wcandillon",
            "type": "video"
          },
          {
            "description": "The standard navigation library for React Native apps.",
            "type": "docs",
            "url": "https://reactnavigation.org/docs/getting-started",
            "title": "React Navigation Docs"
          }
        ]
      },
      {
        "scoreWeight": 0.85,
        "value": "nextjs",
        "recommendations": [
          "Learn to master App Router and Server Components",
          "Understand SSR vs SSG vs ISR trade-offs",
          "Learn edge runtime patterns",
          "Optimize Core Web Vitals",
          "Build full-stack apps with server actions"
        ],
        "resources": [
          {
            "title": "Next.js Official Docs",
            "description": "Outstanding docs with interactive examples. Covers App Router in depth.",
            "url": "https://nextjs.org/docs",
            "type": "docs"
          },
          {
            "url": "https://nextjs.org/learn",
            "type": "course",
            "description": "Free official interactive course. Build a real dashboard app step by step.",
            "title": "Next.js Learn Course"
          },
          {
            "url": "https://www.patterns.dev/posts/react-server-components/",
            "type": "article",
            "description": "Comprehensive look at React Server Components and the mental model shift.",
            "title": "Server Components Deep Dive"
          },
          {
            "description": "Practical Next.js and full-stack patterns explained clearly.",
            "type": "video",
            "url": "https://www.youtube.com/@t3dotgg",
            "title": "Theo (t3.gg) YouTube"
          }
        ],
        "mentorExplanation": "Next.js changed full-stack React development forever. Server Components are the biggest shift - they reduce client-side JavaScript dramatically. Understand rendering strategies: when to use SSR (dynamic, personalized), SSG (mostly-static content), ISR (revalidate on a schedule), and streaming. The App Router is powerful but has a learning curve - learn the file-system routing conventions early. Server Actions simplify data mutations without separate API routes. Master image optimization and font loading - they directly impact Core Web Vitals. Next.js is opinionated for good reason; trust the conventions.",
        "label": "Next.js / Meta-frameworks"
      },
      {
        "mentorExplanation": "Rust is the most loved language for a reason - it gives you C-level performance with memory safety guarantees at compile time. The ownership system is the hardest part to learn, but once it clicks, it fundamentally changes how you think about memory in ALL languages. The borrow checker is your friend, not your enemy! Start with 'The Rust Book' (free, excellent). Build something small - a CLI tool is perfect. Rust is invaluable for performance-critical code, system tools, and WebAssembly. Even if you don't use Rust daily, learning it makes you a better developer in any language.",
        "label": "Rust / Systems Languages",
        "resources": [
          {
            "type": "github",
            "url": "https://github.com/rust-lang/rustlings",
            "description": "Small exercises to learn Rust. Interactive and hands-on.",
            "title": "Rustlings"
          },
          {
            "title": "Rust by Example",
            "url": "https://doc.rust-lang.org/rust-by-example/",
            "type": "docs",
            "description": "Learn Rust through annotated examples."
          }
        ],
        "value": "rust",
        "recommendations": [
          "Learn ownership and borrowing",
          "Build a CLI tool in Rust",
          "Understand memory safety guarantees",
          "Explore Rust for WebAssembly",
          "Compare with C++ trade-offs"
        ],
        "scoreWeight": 0.9
      },
      {
        "resources": [
          {
            "type": "course",
            "url": "https://course.fast.ai/",
            "description": "Top-down, code-first approach to deep learning. Free and excellent.",
            "title": "fast.ai Practical Deep Learning"
          },
          {
            "title": "Andrej Karpathy YouTube",
            "description": "Deep neural network intuition from OpenAI's former director of AI.",
            "url": "https://www.youtube.com/@AndrejKarpathy",
            "type": "video"
          },
          {
            "title": "LangChain Docs",
            "description": "Build LLM-powered applications. Great practical starting point.",
            "url": "https://python.langchain.com/docs/get_started/introduction",
            "type": "docs"
          },
          {
            "title": "Hugging Face Course",
            "description": "Free NLP and transformer course. Learn fine-tuning and model deployment.",
            "url": "https://huggingface.co/learn/nlp-course/chapter1/1",
            "type": "course"
          },
          {
            "title": "ML Engineering Guide",
            "url": "https://www.mlebook.com/",
            "type": "book",
            "description": "Production ML systems from training to deployment."
          }
        ],
        "mentorExplanation": "AI/ML is reshaping software. You don't need to be a researcher to add AI to your projects - LLM APIs (OpenAI, Anthropic) let you build powerful features with a few API calls. Start there! Understand prompt engineering - it's the fastest way to get value. For ML fundamentals: learn linear algebra basics, understand gradient descent conceptually, then pick PyTorch (more pythonic, dominant in research). RAG (Retrieval Augmented Generation) is the most practical pattern for LLM apps right now. Learn embeddings and vector databases. The field moves incredibly fast - prioritize fundamentals over specific tools.",
        "label": "ML/AI (PyTorch, TensorFlow, LLM APIs)",
        "scoreWeight": 0.88,
        "recommendations": [
          "Learn ML fundamentals and math basics",
          "Fine-tune a pre-trained model",
          "Build an LLM-powered application",
          "Study prompt engineering",
          "Understand RAG architectures"
        ],
        "value": "ml-ai"
      },
      {
        "scoreWeight": 0.83,
        "value": "go",
        "recommendations": [
          "Build microservices in Go",
          "Learn goroutines and channels",
          "Master the Go standard library",
          "Build CLI tools",
          "Understand Go interfaces"
        ],
        "resources": [
          {
            "url": "https://go.dev/tour/",
            "type": "docs",
            "description": "Interactive introduction to Go. Best place to start!",
            "title": "A Tour of Go"
          },
          {
            "type": "docs",
            "url": "https://gobyexample.com/",
            "description": "Hands-on introduction with annotated example programs.",
            "title": "Go by Example"
          },
          {
            "description": "Official guide to writing clear, idiomatic Go code.",
            "url": "https://go.dev/doc/effective_go",
            "type": "docs",
            "title": "Effective Go"
          },
          {
            "description": "TDD approach to learning Go. Free and practical.",
            "url": "https://quii.gitbook.io/learn-go-with-tests/",
            "type": "book",
            "title": "Learn Go with Tests"
          }
        ],
        "mentorExplanation": "Go is designed for simplicity and efficiency - perfect for backend services and cloud infrastructure! Its concurrency model with goroutines is incredibly elegant. Start with 'A Tour of Go' (free, interactive). Go forces you to handle errors explicitly, which makes code more robust. The standard library is extensive - you can build a lot without dependencies. Go compiles to a single binary, making deployment dead simple. The language is intentionally small - you can learn most of it in a weekend, but mastering it takes practice. Great for microservices, APIs, and DevOps tools.",
        "label": "Go (Golang)"
      },
      {
        "mentorExplanation": "C# and .NET have evolved dramatically - it's now cross-platform, fast, and modern! .NET Core changed everything. LINQ is incredibly powerful for data manipulation. Learn async/await deeply - C# has one of the best async implementations. ASP.NET Core is solid for web APIs. Entity Framework makes database work smooth. The ecosystem is mature with excellent tooling (Visual Studio, Rider). Blazor brings C# to the frontend if you're interested. Great for enterprise applications, games (Unity), and desktop apps. Microsoft's investment in .NET is huge!",
        "label": "C# / .NET",
        "resources": [
          {
            "title": "C# Programming Guide",
            "type": "docs",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/",
            "description": "Official Microsoft documentation."
          },
          {
            "type": "course",
            "url": "https://dotnet.microsoft.com/learn",
            "description": "Official learning path for .NET.",
            "title": ".NET Tutorial"
          },
          {
            "description": "Modern web development with .NET.",
            "type": "docs",
            "url": "https://learn.microsoft.com/en-us/aspnet/core/",
            "title": "ASP.NET Core Fundamentals"
          }
        ],
        "value": "csharp",
        "recommendations": [
          "Build ASP.NET Core applications",
          "Master LINQ and async patterns",
          "Learn Entity Framework",
          "Understand dependency injection",
          "Explore Blazor"
        ],
        "scoreWeight": 0.82
      },
      {
        "label": "Redis / Caching",
        "mentorExplanation": "Redis is much more than a cache - it's an in-memory data structure store! Understanding caching is crucial for performance. Learn the different eviction policies, when to cache (and when not to), and cache invalidation strategies (the hardest problem in computer science, they say!). Redis has powerful data structures: sorted sets, hashes, streams. Use it for caching, session storage, real-time analytics, pub/sub messaging, and rate limiting. Master Redis and you'll dramatically improve application performance.",
        "resources": [
          {
            "title": "Redis University",
            "type": "course",
            "url": "https://university.redis.com/",
            "description": "Free official courses on Redis."
          },
          {
            "description": "Comprehensive official docs.",
            "url": "https://redis.io/docs/",
            "type": "docs",
            "title": "Redis Documentation"
          }
        ],
        "value": "redis",
        "recommendations": [
          "Implement caching strategies",
          "Learn Redis data structures",
          "Master cache invalidation patterns",
          "Use Redis for pub/sub",
          "Optimize application performance"
        ],
        "scoreWeight": 0.77
      },
      {
        "value": "swift",
        "recommendations": [
          "Build native iOS apps",
          "Learn SwiftUI",
          "Master UIKit fundamentals",
          "Understand iOS design patterns",
          "Learn Combine framework"
        ],
        "scoreWeight": 0.8,
        "label": "Swift / iOS Development",
        "mentorExplanation": "Swift is Apple's modern language for iOS/macOS development - clean syntax and powerful features! SwiftUI is the future of Apple UI development - declarative and reactive. But learn UIKit too; it's still widely used. iOS development has its quirks: the Apple ecosystem, App Store review process, provisioning profiles. Swift optionals force you to handle null safety. The iOS market is lucrative - users spend more on apps. Great for mobile developers wanting to target iOS specifically.",
        "resources": [
          {
            "title": "100 Days of SwiftUI",
            "url": "https://www.hackingwithswift.com/100/swiftui",
            "type": "course",
            "description": "Free comprehensive SwiftUI course by Paul Hudson."
          },
          {
            "title": "Swift Programming Language",
            "url": "https://docs.swift.org/swift-book/",
            "type": "docs",
            "description": "Official Swift book from Apple."
          },
          {
            "title": "iOS App Dev Tutorials",
            "description": "Official Apple tutorials.",
            "url": "https://developer.apple.com/tutorials/app-dev-training",
            "type": "docs"
          }
        ]
      },
      {
        "value": "kotlin",
        "recommendations": [
          "Build Android apps",
          "Learn Jetpack Compose",
          "Master coroutines",
          "Understand Android architecture",
          "Learn Kotlin multiplatform"
        ],
        "scoreWeight": 0.8,
        "label": "Kotlin / Android Development",
        "mentorExplanation": "Kotlin is now Google's preferred language for Android - it's Java but better! More concise, null-safe by default, and has modern features. Jetpack Compose is transforming Android UI development (similar to React/SwiftUI). Coroutines make async code clean. Android has massive market share globally. Kotlin Multiplatform is interesting - share code between platforms. The Android ecosystem is vibrant and open. Great career path with huge demand!",
        "resources": [
          {
            "title": "Android Basics with Compose",
            "description": "Official modern Android course.",
            "type": "course",
            "url": "https://developer.android.com/courses/android-basics-compose/course"
          },
          {
            "title": "Kotlin Documentation",
            "description": "Official Kotlin docs.",
            "url": "https://kotlinlang.org/docs/home.html",
            "type": "docs"
          },
          {
            "title": "Kotlin Koans",
            "type": "docs",
            "url": "https://play.kotlinlang.org/koans/",
            "description": "Interactive Kotlin exercises."
          }
        ]
      },
      {
        "label": "PHP / Laravel",
        "mentorExplanation": "Modern PHP (8+) is completely different from old PHP - it's fast, typed, and has a great ecosystem! Laravel is one of the most elegant frameworks out there. The community is strong, documentation is excellent. Learn modern PHP features: typed properties, attributes, fibers. Laravel's ecosystem is rich: Livewire, Inertia, Vapor. PHP powers a huge portion of the web (WordPress, etc.). Don't dismiss it because of old stereotypes - modern PHP is productive and powerful!",
        "resources": [
          {
            "title": "Laravel Bootcamp",
            "url": "https://bootcamp.laravel.com/",
            "type": "course",
            "description": "Official Laravel learning path."
          },
          {
            "type": "docs",
            "url": "https://phptherightway.com/",
            "description": "Best practices for modern PHP.",
            "title": "PHP: The Right Way"
          },
          {
            "title": "Laracasts",
            "description": "Premium video tutorials for Laravel and PHP.",
            "url": "https://laracasts.com/",
            "type": "course"
          }
        ],
        "recommendations": [
          "Learn modern PHP features",
          "Master Laravel framework",
          "Build RESTful APIs",
          "Understand Composer",
          "Learn Laravel Eloquent ORM"
        ],
        "value": "php",
        "scoreWeight": 0.75
      },
      {
        "value": "ruby",
        "recommendations": [
          "Build Rails applications",
          "Learn Ruby idioms",
          "Master ActiveRecord",
          "Understand convention over configuration",
          "Build RESTful services"
        ],
        "scoreWeight": 0.75,
        "mentorExplanation": "Ruby prioritizes developer happiness - the code reads like English! Rails popularized convention over configuration and remains incredibly productive. The 'Rails way' is opinionated, which means faster development. Ruby's meta-programming is powerful but use it wisely. The community values testing, good documentation, and clean code. Rails is mature and battle-tested. Great for startups and MVPs - you can build fast! Though not as trendy as it once was, Rails is still powering many successful companies.",
        "label": "Ruby / Ruby on Rails",
        "resources": [
          {
            "type": "docs",
            "url": "https://guides.rubyonrails.org/",
            "description": "Official comprehensive Rails guides.",
            "title": "Ruby on Rails Guides"
          },
          {
            "title": "The Odin Project Ruby Path",
            "type": "course",
            "url": "https://www.theodinproject.com/paths/full-stack-ruby-on-rails",
            "description": "Free full-stack Ruby course."
          }
        ]
      },
      {
        "resources": [
          {
            "title": "Elixir School",
            "url": "https://elixirschool.com/",
            "type": "docs",
            "description": "Free comprehensive Elixir lessons."
          },
          {
            "url": "https://hexdocs.pm/phoenix/overview.html",
            "type": "docs",
            "description": "Official Phoenix documentation.",
            "title": "Phoenix Framework Guides"
          },
          {
            "title": "Programming Elixir",
            "description": "Excellent book by Dave Thomas.",
            "url": "https://pragprog.com/titles/elixir16/programming-elixir-1-6/",
            "type": "book"
          }
        ],
        "mentorExplanation": "Elixir brings functional programming to the powerful Erlang VM - built for concurrency and fault tolerance! Phoenix is incredibly fast and Phoenix LiveView is game-changing (real-time features without writing JavaScript). The 'Let it crash' philosophy is mind-bending at first. Pattern matching is elegant. Great for real-time systems, chat apps, and high-concurrency scenarios. The community is welcoming and thoughtful. Learning Elixir teaches you functional programming principles that apply everywhere!",
        "label": "Elixir / Phoenix",
        "scoreWeight": 0.85,
        "recommendations": [
          "Learn functional programming concepts",
          "Build Phoenix applications",
          "Master OTP patterns",
          "Understand concurrency model",
          "Build real-time features with LiveView"
        ],
        "value": "elixir"
      },
      {
        "recommendations": [
          "Master IaC concepts",
          "Learn Terraform state management",
          "Build reusable modules",
          "Understand cloud provisioning",
          "Implement GitOps workflows"
        ],
        "value": "terraform",
        "scoreWeight": 0.84,
        "mentorExplanation": "Infrastructure as Code is essential for modern DevOps - Terraform is the industry standard! Treating infrastructure like code enables version control, code review, and automation. Learn about state management (crucial!), modules for reusability, and workspaces. Terraform is cloud-agnostic, which is powerful. Start with simple resources, then build complex modules. Understanding IaC makes you valuable in any DevOps context. The declarative approach is elegant - you describe what you want, Terraform figures out how.",
        "label": "Terraform / Infrastructure as Code",
        "resources": [
          {
            "title": "Terraform Tutorials",
            "description": "Official HashiCorp learning path.",
            "type": "docs",
            "url": "https://developer.hashicorp.com/terraform/tutorials"
          },
          {
            "type": "docs",
            "url": "https://www.terraform-best-practices.com/",
            "description": "Community best practices guide.",
            "title": "Terraform Best Practices"
          }
        ]
      },
      {
        "resources": [
          {
            "title": "Jenkins Documentation",
            "description": "Official Jenkins docs.",
            "url": "https://www.jenkins.io/doc/",
            "type": "docs"
          },
          {
            "title": "CI/CD Best Practices",
            "description": "Comprehensive CI/CD guide.",
            "url": "https://www.atlassian.com/continuous-delivery",
            "type": "article"
          },
          {
            "description": "Modern CI/CD alternative.",
            "type": "docs",
            "url": "https://docs.github.com/en/actions",
            "title": "GitHub Actions Tutorial"
          }
        ],
        "label": "Jenkins / CI/CD",
        "mentorExplanation": "CI/CD is fundamental to modern software delivery - automate all the things! Jenkins is widely used (though GitHub Actions and GitLab CI are gaining ground). Learn pipeline-as-code (Jenkinsfile), understand stages and steps, and master deployment strategies (blue-green, canary). CI/CD isn't just about automation; it's about rapid, reliable feedback. Start simple: build, test, deploy. Then add complexity. Good CI/CD makes teams faster and more confident. This skill is valuable across all development roles!",
        "scoreWeight": 0.78,
        "recommendations": [
          "Build CI/CD pipelines",
          "Master pipeline as code",
          "Learn deployment automation",
          "Implement testing automation",
          "Understand GitOps principles"
        ],
        "value": "jenkins"
      },
      {
        "mentorExplanation": "Tailwind CSS changed how we write CSS - utility-first is incredibly productive once you embrace it! At first, the long class names feel wrong, but you'll never want to name things again. You build faster, maintain easier, and the consistency is automatic. Learn the design system (spacing, colors), responsive utilities, and how to extract components when needed. JIT mode gives you arbitrary values. Tailwind is taking over - especially in React/Next.js ecosystems. The constraint of utilities actually increases creativity!",
        "label": "Tailwind CSS / Utility-First CSS",
        "resources": [
          {
            "title": "Tailwind CSS Docs",
            "description": "Excellent searchable documentation.",
            "url": "https://tailwindcss.com/docs",
            "type": "docs"
          },
          {
            "title": "Tailwind UI",
            "description": "Premium components (worth studying even if not buying).",
            "type": "docs",
            "url": "https://tailwindui.com/"
          },
          {
            "title": "Build Anything with Tailwind",
            "type": "video",
            "url": "https://www.youtube.com/c/TailwindLabs",
            "description": "Official YouTube channel with tips."
          }
        ],
        "recommendations": [
          "Master utility-first approach",
          "Learn responsive design patterns",
          "Build custom design systems",
          "Optimize for production",
          "Learn JIT mode"
        ],
        "value": "tailwind",
        "scoreWeight": 0.76
      },
      {
        "label": "Flutter / Dart",
        "mentorExplanation": "Flutter lets you build beautiful native apps for mobile, web, and desktop from a single codebase! The widget system is elegant - everything's a widget. Dart is easy to learn if you know JavaScript or Java. Flutter's hot reload is incredibly productive. Learn state management early (Riverpod is popular). Performance is generally excellent. The community is growing fast. Great choice for cross-platform development - you can reach every platform with one codebase. Google's backing gives it staying power.",
        "resources": [
          {
            "url": "https://docs.flutter.dev/",
            "type": "docs",
            "description": "Comprehensive official docs with codelabs.",
            "title": "Flutter Documentation"
          },
          {
            "description": "Complete widget reference.",
            "url": "https://docs.flutter.dev/development/ui/widgets",
            "type": "docs",
            "title": "Flutter Widget Catalog"
          }
        ],
        "value": "flutter",
        "recommendations": [
          "Build cross-platform apps",
          "Master widget composition",
          "Learn state management (Bloc, Riverpod)",
          "Understand Flutter architecture",
          "Build for iOS and Android"
        ],
        "scoreWeight": 0.81
      },
      {
        "mentorExplanation": "Svelte is refreshingly different - it's a compiler, not a runtime framework! This means smaller bundle sizes and great performance. The reactive syntax is intuitive - just assignments trigger updates. SvelteKit is the full-stack framework. Svelte is gaining traction fast - developers love it for its simplicity and performance. Less boilerplate than React, more intuitive than Vue. Great for projects where bundle size matters or you want a fresh approach. The community is enthusiastic and growing!",
        "label": "Svelte / SvelteKit",
        "resources": [
          {
            "description": "Interactive official tutorial. Best way to start!",
            "url": "https://svelte.dev/tutorial",
            "type": "docs",
            "title": "Svelte Tutorial"
          },
          {
            "title": "SvelteKit Docs",
            "description": "Full-stack Svelte framework.",
            "type": "docs",
            "url": "https://kit.svelte.dev/docs/introduction"
          },
          {
            "title": "Svelte Society",
            "url": "https://sveltesociety.dev/",
            "type": "docs",
            "description": "Community recipes and resources."
          }
        ],
        "recommendations": [
          "Learn reactive programming in Svelte",
          "Build SvelteKit apps",
          "Master stores and context",
          "Understand compilation approach",
          "Build performant UIs"
        ],
        "value": "svelte",
        "scoreWeight": 0.79
      },
      {
        "value": "solidity",
        "recommendations": [
          "Learn blockchain fundamentals",
          "Build smart contracts",
          "Master contract security",
          "Understand gas optimization",
          "Learn Web3.js or Ethers.js"
        ],
        "scoreWeight": 0.82,
        "label": "Solidity / Web3",
        "mentorExplanation": "Web3 and blockchain are creating new paradigms! Solidity is for writing Ethereum smart contracts. Security is CRITICAL - bugs in smart contracts can cost millions. Understand gas optimization, common vulnerabilities (reentrancy, etc.), and testing thoroughly. The field is evolving rapidly. Start with blockchain fundamentals before diving into Solidity. Whether Web3 is the future or hype is debated, but the underlying concepts (decentralization, cryptography) are valuable to understand.",
        "resources": [
          {
            "description": "Learn Solidity through building a game. Fun and interactive!",
            "url": "https://cryptozombies.io/",
            "type": "course",
            "title": "CryptoZombies"
          },
          {
            "description": "Official Solidity docs.",
            "type": "docs",
            "url": "https://docs.soliditylang.org/",
            "title": "Solidity Documentation"
          },
          {
            "title": "Smart Contract Security",
            "url": "https://github.com/ethereumbook/ethereumbook",
            "type": "book",
            "description": "Free book on Ethereum development."
          }
        ]
      },
      {
        "scoreWeight": 0.8,
        "recommendations": [
          "Build async Python APIs",
          "Master Pydantic models",
          "Learn auto-generated docs",
          "Understand async/await in Python",
          "Implement authentication"
        ],
        "value": "fastapi",
        "resources": [
          {
            "description": "Excellent docs with tutorials.",
            "type": "docs",
            "url": "https://fastapi.tiangolo.com/",
            "title": "FastAPI Documentation"
          },
          {
            "title": "FastAPI Best Practices",
            "type": "github",
            "url": "https://github.com/zhanymkanov/fastapi-best-practices",
            "description": "Community best practices."
          },
          {
            "title": "Full Stack FastAPI",
            "type": "github",
            "url": "https://github.com/tiangolo/full-stack-fastapi-postgresql",
            "description": "Full-stack project template."
          }
        ],
        "mentorExplanation": "FastAPI is the modern way to build Python APIs - fast, intuitive, and production-ready! It uses type hints for validation and auto-generates beautiful API docs. Async support makes it performant. Pydantic models provide data validation. Coming from Flask or Django? FastAPI feels fresh and modern. The developer experience is excellent - auto-complete everywhere! Great for microservices, ML model APIs, or any backend API. It's gaining adoption rapidly!",
        "label": "FastAPI / Modern Python Web"
      },
      {
        "value": "prisma",
        "recommendations": [
          "Master Prisma schema",
          "Learn migrations",
          "Optimize database queries",
          "Understand type-safe database access",
          "Build with Prisma Client"
        ],
        "scoreWeight": 0.77,
        "mentorExplanation": "Prisma brings type-safety to database access - it's changing how we work with databases in TypeScript! The schema is declarative and migration system is smooth. Prisma Client is auto-generated and fully typed. Great developer experience with auto-complete. Works with PostgreSQL, MySQL, SQLite, SQL Server, MongoDB. Compared to traditional ORMs (TypeORM, Sequelize), Prisma feels more modern. The query API is intuitive. Database work becomes safer and more productive!",
        "label": "Prisma / Modern ORMs",
        "resources": [
          {
            "title": "Prisma Documentation",
            "type": "docs",
            "url": "https://www.prisma.io/docs",
            "description": "Comprehensive official docs."
          },
          {
            "title": "Prisma Tutorial",
            "description": "Get started with Prisma.",
            "url": "https://www.prisma.io/docs/getting-started",
            "type": "course"
          },
          {
            "title": "Prisma Best Practices",
            "url": "https://www.prisma.io/docs/guides/performance-and-optimization",
            "type": "docs",
            "description": "Performance and optimization guide."
          }
        ]
      },
      {
        "recommendations": [
          "Learn UI/UX principles",
          "Master component design",
          "Understand design systems",
          "Learn prototyping",
          "Collaborate with designers effectively"
        ],
        "value": "figma",
        "scoreWeight": 0.72,
        "mentorExplanation": "Understanding design makes you a more complete developer! Figma is the industry-standard design tool. Learn to read design specs, understand spacing and typography, use design tokens. Auto-layout is powerful for responsive designs. Good developers who understand design are incredibly valuable. You don't need to be a designer, but understanding design thinking and tools bridges the developer-designer gap. This makes you more effective and collaborative!",
        "label": "Figma / Design Tools",
        "resources": [
          {
            "title": "Figma Tutorial",
            "description": "Official Figma learning resources.",
            "type": "docs",
            "url": "https://help.figma.com/hc/en-us/categories/360002051613"
          },
          {
            "description": "Design for developers. Excellent resource!",
            "type": "book",
            "url": "https://www.refactoringui.com/",
            "title": "Refactoring UI"
          }
        ]
      }
    ],
    "allowOther": true,
    "followUpQuestion": "How many years of experience do you have with each?",
    "type": "tech-stack",
    "category": "Technical Skills",
    "title": "Which technologies do you currently work with? (Select all that apply)",
    "hint": "Select the technologies you use regularly or have significant experience with"
  },
  {
    "id": "330679bb-4fe0-4766-9844-bf652869b0cb",
    "options": [
      {
        "value": "advocate",
        "recommendations": [
          "Build documentation culture",
          "Create documentation automation",
          "Speak about documentation"
        ],
        "scoreWeight": 1,
        "isCorrect": true,
        "label": "I advocate for and maintain documentation standards",
        "mentorExplanation": "Building documentation culture is rare and valuable. You understand that docs multiply team productivity. The teams that document well move faster, not slower. Keep advocating - this is leadership.",
        "resources": [
          {
            "title": "Building Docs Culture",
            "type": "docs",
            "url": "https://www.writethedocs.org/guide/writing/beginners-guide-to-docs/"
          },
          {
            "title": "Speaking About Docs",
            "url": "https://www.writethedocs.org/videos/",
            "type": "video"
          }
        ]
      },
      {
        "mentorExplanation": "Waiting to be required means you're treating docs as overhead. Shift the mindset: write docs because they make your code better. Explaining your code forces clarity. Start documenting decisions - why you chose this approach over that one.",
        "label": "I document when required",
        "resources": [
          {
            "url": "https://adr.github.io/",
            "type": "docs",
            "title": "Architecture Decision Records"
          },
          {
            "url": "https://idratherbewriting.com/learnapidoc/",
            "type": "docs",
            "title": "API Documentation Guide"
          }
        ],
        "recommendations": [
          "Create README files for projects",
          "Document complex logic",
          "Learn about ADRs"
        ],
        "value": "basic",
        "isCommonMistake": true,
        "scoreWeight": 0.35
      },
      {
        "value": "thorough",
        "recommendations": [
          "Create documentation templates",
          "Train team on documentation",
          "Automate documentation generation"
        ],
        "scoreWeight": 0.8,
        "yearOneRecommendations": [
          "Establish team documentation standards",
          "Create comprehensive API documentation"
        ],
        "mentorExplanation": "ADRs are underused and powerful. They capture context that disappears otherwise - why you made this trade-off, what you considered, what you learned. Six months later when someone questions the decision, the ADR tells the story. Solid practice.",
        "isCorrect": true,
        "label": "I write thorough documentation including ADRs",
        "resources": [
          {
            "url": "https://www.markdownguide.org/",
            "type": "docs",
            "title": "Markdown Guide"
          },
          {
            "type": "docs",
            "url": "https://docusaurus.io/",
            "description": "Documentation site generator",
            "title": "Docusaurus"
          }
        ]
      },
      {
        "resources": [
          {
            "title": "Write the Docs Guide",
            "type": "docs",
            "url": "https://www.writethedocs.org/guide/"
          },
          {
            "type": "article",
            "url": "https://stackoverflow.blog/2021/12/23/best-practices-for-writing-code-comments/",
            "title": "Code Documentation Best Practices"
          },
          {
            "title": "README Template",
            "type": "github",
            "url": "https://github.com/othneildrew/Best-README-Template"
          }
        ],
        "label": "I write minimal or no documentation",
        "mentorExplanation": "The code is never enough. Three months from now, you won't remember why you did something that way. Start small: write why, not what. Explain complex logic before you forget the reasoning. Document decisions and trade-offs - that context evaporates fast.",
        "scoreWeight": 0.15,
        "recommendations": [
          "Learn documentation best practices",
          "Start with inline code comments",
          "Write README files"
        ],
        "value": "minimal"
      },
      {
        "scoreWeight": 0.6,
        "recommendations": [
          "Establish documentation standards",
          "Create technical guides",
          "Share documentation practices"
        ],
        "value": "regular",
        "resources": [
          {
            "title": "Technical Writing Courses",
            "type": "course",
            "url": "https://developers.google.com/tech-writing"
          },
          {
            "url": "https://www.writethedocs.org/guide/docs-as-code/",
            "type": "docs",
            "title": "Docs as Code"
          }
        ],
        "mentorExplanation": "Regular documentation means you get it: code shows how, docs show why. Keep this habit and help standardize it across your team. Document for the developer who inherits this code in a year - that might be you.",
        "label": "I regularly document my code and decisions",
        "isCorrect": true
      }
    ],
    "allowOther": true,
    "category": "Communication",
    "type": "multiple-choice",
    "title": "How comfortable are you with documenting your code and technical decisions?",
    "hint": "Good documentation is a gift to your future self and your teammates"
  },
  {
    "id": "38367578-2634-4c19-9cc4-60326ef18581",
    "followUpQuestion": "",
    "allowOther": true,
    "options": [
      {
        "resources": [
          {
            "title": "Conventional Commits",
            "url": "https://www.conventionalcommits.org/",
            "type": "docs"
          },
          {
            "title": "Git Hooks Tutorial",
            "type": "docs",
            "url": "https://githooks.com/"
          },
          {
            "url": "https://www.youtube.com/watch?v=gW6dFpTMk8s",
            "type": "video",
            "title": "GitFlow vs Trunk-Based"
          }
        ],
        "isCorrect": true,
        "label": "I understand Git workflows (GitFlow, trunk-based) and use them effectively",
        "mentorExplanation": "Understanding workflows means you think beyond your local changes. You know how your team collaborates and why. Good commit messages tell a story - treat them as documentation. Git hooks automate quality checks.",
        "scoreWeight": 0.6,
        "value": "workflows",
        "recommendations": [
          "Learn advanced Git commands and try to use them in the appropriate time",
          "Study commit message best practices",
          "Master Git hooks"
        ]
      },
      {
        "recommendations": [
          "Learn Git rebase",
          "Study cherry-picking",
          "Master conflict resolution"
        ],
        "value": "branching",
        "scoreWeight": 0.35,
        "mentorExplanation": "Branches enable parallel work without stepping on toes. Now learn the powerful stuff: rebase for clean history, cherry-pick for selective merges, reflog for when you think you've lost work (you haven't - Git rarely loses anything).",
        "label": "I use branches and can resolve simple merge conflicts",
        "resources": [
          {
            "type": "video",
            "url": "https://www.youtube.com/watch?v=f1wnYdLEpgI",
            "title": "Git Rebase Explained"
          },
          {
            "title": "Advanced Git",
            "type": "docs",
            "url": "https://www.atlassian.com/git/tutorials/advanced-overview"
          },
          {
            "title": "Oh Shit, Git!",
            "description": "How to fix common Git mistakes",
            "type": "article",
            "url": "https://ohshitgit.com/"
          }
        ]
      },
      {
        "mentorExplanation": "You understand Git's object model - commits, trees, blobs. You can fix corrupted repos, untangle complex histories, optimize large repositories. This depth is rare. Share it - write about tricky Git problems you've solved, build tools, teach others.",
        "isCorrect": true,
        "label": "I understand Git internals and can solve complex repository issues",
        "resources": [
          {
            "type": "article",
            "url": "https://jwiegley.github.io/git-from-the-bottom-up/",
            "title": "Git from the Bottom Up"
          },
          {
            "type": "video",
            "url": "https://www.youtube.com/watch?v=qsTthZi23VE",
            "title": "Advanced Git Techniques"
          }
        ],
        "value": "expert",
        "recommendations": [
          "Share Git expertise through content",
          "Create custom Git tools",
          "Mentor teams on Git strategies"
        ],
        "scoreWeight": 1
      },
      {
        "scoreWeight": 0.15,
        "value": "basic-commands",
        "recommendations": [
          "Learn branching strategies",
          "Study Git workflows",
          "Practice merge conflict resolution"
        ],
        "resources": [
          {
            "title": "Pro Git Book",
            "description": "Free comprehensive Git guide",
            "url": "https://git-scm.com/book/en/v2",
            "type": "book"
          },
          {
            "title": "Learn Git Branching",
            "description": "Interactive Git tutorial",
            "url": "https://learngitbranching.js.org/",
            "type": "article"
          },
          {
            "title": "Git Workflows",
            "url": "https://www.atlassian.com/git/tutorials/comparing-workflows",
            "type": "docs"
          }
        ],
        "mentorExplanation": "Basic commands get you started. Git's real power is in branching - think of branches as save points in a game. Learn to merge and resolve conflicts. Understand that Git is designed for collaboration, not just version control.",
        "label": "I use basic commands (add, commit, push, pull)"
      },
      {
        "resources": [
          {
            "title": "Git Bisect Guide",
            "type": "article",
            "url": "https://www.metaltoad.com/blog/beginners-guide-git-bisect-process-elimination"
          },
          {
            "url": "https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain",
            "type": "docs",
            "title": "Git Internals"
          },
          {
            "url": "https://www.youtube.com/watch?v=duqBHik7nRo",
            "type": "video",
            "title": "Building Better Teams with Git"
          }
        ],
        "label": "I use advanced features (rebase, bisect, reflog) and teach others",
        "isCorrect": true,
        "mentorExplanation": "Git power user. Bisect finds which commit broke things (binary search through history). Reflog recovers 'lost' commits. Rebase rewrites history cleanly. These tools separate competent from expert. Many developers fear Git - help them master it.",
        "scoreWeight": 0.8,
        "recommendations": [
          "Establish team Git standards",
          "Automate with Git hooks"
        ],
        "value": "advanced"
      }
    ],
    "category": "Version Control & Git",
    "type": "multiple-choice",
    "title": "How would you rate your Git and version control skills?",
    "hint": "Git is more than commits - it's about collaboration, history, and workflow"
  },
  {
    "id": "3956fae6-6c8f-4d27-84df-f0bb0e39e8c8",
    "type": "multiple-choice",
    "category": "Problem Solving & Debugging",
    "options": [
      {
        "scoreWeight": 0.82,
        "value": "design",
        "recommendations": [
          "I suggest studying scalability patterns to strengthen your problem solving and debugging skills",
          "Try to participate in designing larger system architectures when there is the opportunity or for your personal project",
          "Learn about trade-offs"
        ],
        "resources": [
          {
            "title": "Architecture Decision Records",
            "type": "docs",
            "url": "https://adr.github.io/"
          },
          {
            "url": "https://www.youtube.com/c/SystemDesignInterview",
            "type": "video",
            "title": "System Design Interviews"
          }
        ],
        "label": "I design features and components",
        "isCorrect": true,
        "mentorExplanation": "You're designing at the component level, which is solid. Next step: understand the system-level implications. How does your component fit into the larger picture? What happens at scale? Every design decision has trade-offs - start documenting them.",
        "yearOneRecommendations": [
          "Lead architectural decisions for a feature",
          "Present design proposals"
        ]
      },
      {
        "resources": [
          {
            "title": "System Design Interview",
            "type": "video",
            "url": "https://www.youtube.com/c/SystemDesignInterview"
          }
        ],
        "mentorExplanation": "Hands-on learning is effective, but study the patterns behind what you're building. Why this database? Why this architecture? Understanding the 'why' makes you dangerous - you can apply it to new problems.",
        "label": "Learning through project involvement",
        "scoreWeight": 0.42,
        "recommendations": [
          "You could take a system design course",
          "Practice designing small systems - could work if you're working for a smaller company or personel project",
          "Study real-world architectures"
        ],
        "value": "learning"
      },
      {
        "resources": [
          {
            "title": "Papers We Love",
            "description": "Computer science papers",
            "url": "https://paperswelove.org/",
            "type": "article"
          }
        ],
        "isCorrect": true,
        "label": "I design complex distributed systems and set architectural direction",
        "mentorExplanation": "Distributed systems expertise is rare. You understand CAP theorem isn't theoretical - it's every day trade-offs. Share this knowledge; most developers never work at this level. Write, speak, mentor. Your experience is valuable.",
        "scoreWeight": 1,
        "value": "expert",
        "recommendations": [
          "Share your architecture knowledge with your fellow devs - maybe in a tech talk"
        ]
      },
      {
        "mentorExplanation": "Even small tasks involve design choices. Start thinking architecturally: why this approach over that one? What if this needed to handle 10x traffic? Ask these questions; they'll change how you code.",
        "label": "No experience, I work on assigned tasks",
        "resources": [
          {
            "title": "System Design Primer",
            "url": "https://github.com/donnemartin/system-design-primer",
            "type": "github",
            "description": "Comprehensive system design guide"
          },
          {
            "title": "Design Patterns Explained",
            "type": "article",
            "url": "https://refactoring.guru/design-patterns"
          }
        ],
        "value": "none",
        "recommendations": [
          "Start studying basic software architecture patterns",
          "Learn about system design fundamentals",
          "Read about design principles - see the provided resources as a guide"
        ],
        "scoreWeight": 0.25
      },
      {
        "resources": [
          {
            "url": "https://martinfowler.com/articles/microservices.html",
            "type": "article",
            "title": "Monolith vs Microservices"
          }
        ],
        "mentorExplanation": "Monoliths get a bad rap but they're often the right choice - simple, fast to develop, easy to debug. Learn microservices so you understand the trade-offs, not because you need to use them everywhere. Many 'microservices' should have stayed monoliths.",
        "label": "I only have experience with monolithic architectures",
        "scoreWeight": 0.7,
        "value": "monolith-only",
        "recommendations": [
          "Spend time learning microservices patterns",
          "Study distributed systems concepts",
          "Understand service boundaries",
          "Learn API design"
        ]
      },
      {
        "value": "architect",
        "recommendations": [
          "Mentor others in architecture - you coulld share with your team",
          "Try to always document architectural decisions",
          "Study distributed systems"
        ],
        "scoreWeight": 0.92,
        "isCorrect": true,
        "label": "I design and architect systems",
        "mentorExplanation": "System-level thinking is your strength. You're balancing requirements, constraints, and trade-offs. Keep learning patterns, but also teach your process - how you think through design problems is more valuable than the solutions themselves.",
        "resources": [
          {
            "title": "Distributed Systems",
            "url": "https://www.distributed-systems.net/",
            "type": "course"
          },
          {
            "description": "Architecture insights",
            "url": "https://martinfowler.com/",
            "type": "article",
            "title": "Martin Fowler's Blog"
          }
        ]
      },
      {
        "mentorExplanation": "Copying code without understanding is like copying someone's homework - you miss the learning. Before implementing a solution, understand the problem it solves. Why does this work? What would break it? That understanding is what separates developers from coders.",
        "label": "I mostly copy solutions from Stack Overflow without understanding design",
        "resources": [
          {
            "description": "Simple design pattern explanations",
            "url": "https://github.com/kamranahmedse/design-patterns-for-humans",
            "type": "github",
            "title": "Design Patterns for Humans"
          },
          {
            "title": "SOLID Principles",
            "url": "https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design",
            "type": "article"
          },
          {
            "type": "docs",
            "url": "https://refactoring.guru/",
            "description": "Design patterns and refactoring",
            "title": "Refactoring Guru"
          }
        ],
        "value": "copy-paste",
        "recommendations": [
          "Think about learning fundamental design principles",
          "Always understand before implementing as much as possible",
          "Go deeper into why solutions work",
          "Build foundational knowledge"
        ],
        "isCommonMistake": true,
        "scoreWeight": 0.1
      },
      {
        "resources": [
          {
            "title": "YAGNI Principle",
            "type": "article",
            "url": "https://martinfowler.com/bliki/Yagni.html"
          },
          {
            "title": "Simple Made Easy",
            "url": "https://www.infoq.com/presentations/Simple-Made-Easy/",
            "type": "video",
            "description": "Classic Rich Hickey talk"
          }
        ],
        "mentorExplanation": "Complexity is easy; simplicity is hard. Build for today's requirements, not imagined future ones. Every abstraction layer you add is cognitive overhead for everyone. YAGNI (You Aren't Gonna Need It) isn't about being lazy - it's about being pragmatic.",
        "label": "I tend to over-engineer solutions with unnecessary complexity",
        "scoreWeight": 0.4,
        "recommendations": [
          "Practice YAGNI principle",
          "Start simple, evolve as needed",
          "Learn when to add/remove abstraction",
          "Focus on solving actual problems"
        ],
        "value": "over-engineer",
        "isCommonMistake": true
      }
    ],
    "allowOther": true,
    "followUpQuestion": "",
    "title": "Which best describes your experience with system design and architecture?",
    "hint": "Think about designing scalable, maintainable systems, not just writing code"
  },
  {
    "id": "3bf9aa2c-9065-4a9b-b022-49e7a44ef015",
    "allowOther": true,
    "options": [
      {
        "label": "I can solve most issues with research and systematic debugging",
        "isCorrect": true,
        "mentorExplanation": "You're thinking systematically, which is the right foundation. The next step is building deeper mental models - when you understand how the system works underneath, debugging becomes pattern recognition. Keep pushing into the harder bugs; that's where the real learning happens.",
        "resources": [
          {
            "type": "video",
            "url": "https://www.youtube.com/watch?v=_Wp68Y9cc_U",
            "title": "Advanced Debugging Techniques"
          },
          {
            "title": "Memory Profiling",
            "url": "https://developer.chrome.com/docs/devtools/memory-problems/",
            "type": "docs"
          },
          {
            "title": "Production Debugging",
            "url": "https://github.com/goldbergyoni/nodebestpractices#6-going-to-production-practices",
            "type": "github"
          }
        ],
        "value": "intermediate",
        "recommendations": [
          "Learn advanced debugging patterns",
          "Study memory profiling",
          "Practice debugging production issues"
        ],
        "scoreWeight": 0.7
      },
      {
        "scoreWeight": 0.55,
        "recommendations": [
          "Learn async debugging techniques if you haven't yet",
          "Master promise rejection handling",
          "Use async stack traces - look it up",
          "Learn event loop debugging"
        ],
        "value": "use-logging",
        "resources": [
          {
            "title": "Async Debugging in Chrome",
            "url": "https://developer.chrome.com/blog/async-call-stack/",
            "type": "article"
          },
          {
            "description": "Classic event loop explanation",
            "url": "https://www.youtube.com/watch?v=8aGhZQkoFbQ",
            "type": "video",
            "title": "Understanding the Event Loop"
          },
          {
            "title": "Debugging Promises",
            "url": "https://javascript.info/promise-error-handling",
            "type": "article"
          }
        ],
        "mentorExplanation": "Async code trips everyone up at first. The trick is understanding that async stack traces work differently - DevTools can show them if you enable async stack tracing. Also, get really comfortable with the event loop; once you see how promises queue up, async bugs make way more sense.",
        "label": "I use logging extensively but struggle with complex async issues"
      },
      {
        "resources": [
          {
            "url": "https://www.freecodecamp.org/news/how-to-write-a-great-technical-blog-post-414c414b67f6/",
            "type": "article",
            "title": "Writing Technical Posts"
          },
          {
            "url": "https://jvns.ca/blog/2021/04/03/what-problems-do-people-solve-with-strace/",
            "type": "article",
            "title": "System-Level Debugging"
          }
        ],
        "label": "I excel at debugging across all levels (code, network, system)",
        "isCorrect": true,
        "mentorExplanation": "This level of debugging skill is rare and valuable. You've built the intuition that lets you jump between layers - from application code down to network packets. Share what you know; most developers never learn to think across the full stack like this.",
        "scoreWeight": 1,
        "value": "expert",
        "recommendations": [
          "You may want to try creating debugging workshops",
          "Write technical blog posts - it's really good for networking and sharing knowledge",
          "Build internal debugging tools"
        ]
      },
      {
        "scoreWeight": 0.1,
        "recommendations": [
          "Learn to use Chrome DevTools debugger and get the most of it",
          "Practice reading stack traces",
          "Study systematic debugging approaches - very helpful in most debugging cases"
        ],
        "value": "console-only",
        "isCommonMistake": true,
        "resources": [
          {
            "title": "Chrome DevTools Tutorial",
            "url": "https://developer.chrome.com/docs/devtools/",
            "type": "docs",
            "description": "Master browser debugging"
          },
          {
            "type": "article",
            "url": "https://javascript.info/debugging-chrome",
            "title": "Debugging JavaScript"
          },
          {
            "url": "https://code.visualstudio.com/docs/editor/debugging",
            "type": "docs",
            "title": "VS Code Debugging"
          }
        ],
        "mentorExplanation": "Console.log works, but you're missing out on huge time savings. The debugger lets you pause execution and inspect everything at that moment - way faster than littering code with logs. Spend an hour learning DevTools breakpoints and you'll never look back.",
        "label": "I mostly use console.log and get stuck often"
      },
      {
        "resources": [],
        "mentorExplanation": "This is the right instinct. A bug you can reproduce consistently is already halfway fixed. The developers who skip this step end up with bugs that resurface later. Bonus points if you turn your reproduction steps into a test case before fixing.",
        "label": "I focus on reproducing issues reliably before fixing them",
        "isCorrect": true,
        "scoreWeight": 0.82,
        "value": "reproduce-first",
        "recommendations": [
          "Document reproduction steps",
          "Create automated tests from bugs",
          "Build debugging test suites",
          "Share reproduction techniques"
        ]
      },
      {
        "scoreWeight": 0.4,
        "value": "basic-tools",
        "recommendations": [
          "Learn to trace through async code and try to apply it in your everyday work",
          "Practice binary search debugging",
          "Study error patterns"
        ],
        "resources": [
          {
            "description": "Systematic debugging strategies",
            "type": "article",
            "url": "https://blog.regehr.org/archives/199",
            "title": "Debugging Techniques"
          },
          {
            "title": "Async Debugging",
            "type": "article",
            "url": "https://developer.chrome.com/blog/async-call-stack/"
          },
          {
            "title": "Problem Solving Patterns",
            "url": "https://www.freecodecamp.org/news/how-to-think-like-a-programmer-lessons-in-problem-solving-d1d8bf1de7d2/",
            "type": "article"
          }
        ],
        "mentorExplanation": "Breakpoints are good, but debugging is more about strategy than tools. When you hit a complex bug, narrow down where it's happening first (binary search: is it in this half of the code or that half?). Then zoom in. Most developers go too deep too fast.",
        "label": "I use debugger breakpoints but struggle with complex issues"
      },
      {
        "scoreWeight": 0.25,
        "isCommonMistake": true,
        "recommendations": [
          "Learn when to ask for help - you might not do it as much as you should or do it too much:)",
          "Practice rubber duck debugging",
          "Set time limits for independent debugging",
          "Build debugging documentation habits"
        ],
        "value": "struggle-alone",
        "resources": [
          {
            "url": "https://en.wikipedia.org/wiki/Rubber_duck_debugging",
            "type": "article",
            "description": "Explain problems out loud to solve them",
            "title": "Rubber Duck Debugging"
          },
          {
            "url": "https://stackoverflow.com/help/how-to-ask",
            "type": "docs",
            "description": "Get better help by asking better questions",
            "title": "How to Ask Good Questions"
          }
        ],
        "label": "I struggle with issues alone for extended periods",
        "mentorExplanation": "Independence is good, but there's a difference between persistence and stubbornness. If you've been stuck for an hour, you're probably missing context. Talk it through with someone (or a rubber duck). The act of explaining often surfaces the issue, and fresh eyes catch things you've gone blind to."
      },
      {
        "scoreWeight": 0.92,
        "recommendations": [
          "Mentor other developers in your team in debugging",
          "Document debugging strategies",
          "Create debugging tools"
        ],
        "value": "advanced",
        "resources": [],
        "label": "I independently solve complex issues using multiple techniques",
        "isCorrect": true,
        "mentorExplanation": "Strong debugging chops. You know when to use the profiler versus the network tab versus stepping through code. This skill multiplies when you teach it - showing junior devs your process makes them way more effective and takes pressure off you."
      }
    ],
    "followUpQuestion": "",
    "type": "multiple-choice",
    "category": "Problem Solving & Debugging",
    "title": "How comfortable are you with debugging complex issues?",
    "hint": "Think about your systematic approach, tool usage, and problem isolation skills"
  },
  {
    "id": "3fb989a1-894a-405c-8096-f4660087cf42",
    "options": [
      {
        "recommendations": [
          "Set up a safe development environment",
          "Learn to use Git properly to safely experiment",
          "Practice making small changes and testing",
          "Pair with someone while experimenting"
        ],
        "value": "experiment1",
        "scoreWeight": 0.1,
        "label": "I rarely experiment with different solutions. I'm worried about breaking things and need exact examples to follow.",
        "mentorExplanation": "Fear of breaking things is common but limiting! Use Git branches - you can always undo. Start with small experiments in isolated components. Breaking things in development is how you learn.",
        "resources": [
          {
            "title": "Git Branches Tutorial",
            "type": "course",
            "url": "https://learngitbranching.js.org/",
            "description": "Safe experimentation with Git"
          },
          {
            "title": "Local Development Setup",
            "description": "Safe dev environment",
            "type": "docs",
            "url": "https://create-react-app.dev/docs/getting-started"
          }
        ]
      },
      {
        "value": "experiment2",
        "recommendations": [
          "Practice implementing from documentation",
          "Try 2-3 approaches before choosing one",
          "Build confidence with version control",
          "Learn to read API documentation effectively"
        ],
        "scoreWeight": 0.2,
        "mentorExplanation": "Start building experimentation muscles! Before copying code, try implementing from docs first. Spend 20 minutes experimenting, then look for examples. You'll be surprised how much you can figure out.",
        "label": "I sometimes try different solutions but often stick to familiar approaches. I need clear examples to implement.",
        "resources": [
          {
            "title": "Reading API Docs",
            "description": "Understanding API documentation",
            "url": "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction",
            "type": "docs"
          }
        ]
      },
      {
        "resources": [
          {
            "title": "Project-Based Learning",
            "url": "https://github.com/practical-tutorials/project-based-learning",
            "type": "github",
            "description": "Build to learn"
          },
          {
            "title": "Exercism",
            "description": "Practice problems",
            "type": "course",
            "url": "https://exercism.org/"
          }
        ],
        "mentorExplanation": "You're building confidence! Challenge yourself to implement before searching. Read docs, try an approach, debug it. Examples are learning aids, not crutches.",
        "label": "I experiment with solutions but prefer having examples nearby. I can implement from docs with some guidance.",
        "scoreWeight": 0.3,
        "recommendations": [
          "Practice implementing features from scratch",
          "Study multiple implementation approaches",
          "Build small projects without tutorials",
          "Learn to adapt examples to different contexts"
        ],
        "value": "experiment3"
      },
      {
        "label": "I often experiment with different approaches. I can implement from documentation for simpler problems.",
        "mentorExplanation": "Good experimentation habit! Push boundaries - try complex features, experiment with architectures. Your willingness to try things is becoming a strength. Keep building that muscle.",
        "resources": [
          {
            "title": "React Docs Beta",
            "url": "https://react.dev/",
            "type": "docs",
            "description": "Learning from docs"
          }
        ],
        "value": "experiment4",
        "recommendations": [
          "Tackle more complex implementation challenges - don't be afraid to risk it. You can ask for help if totally blocked",
          "Practice debugging your experiments",
          "Study design patterns and apply them",
          "Build features using only official docs"
        ],
        "scoreWeight": 0.4
      },
      {
        "resources": [
          {
            "title": "Web Performance",
            "description": "Performance optimization",
            "type": "docs",
            "url": "https://web.dev/performance/"
          },
          {
            "description": "Community problem solving",
            "type": "docs",
            "url": "https://docs.github.com/en/discussions",
            "title": "GitHub Discussions"
          }
        ],
        "mentorExplanation": "Strong intermediate capability! You have healthy experimentation habits. Now tackle problems without existing solutions. Read RFCs, specs, source code. Trust your ability to figure things out.",
        "label": "I regularly experiment with solutions and am comfortable trying different approaches. I can implement most features from documentation.",
        "scoreWeight": 0.5,
        "recommendations": [
          "Solve problems without Stack Overflow or AI:)",
          "Experiment with performance optimizations",
          "Try alternative libraries and approaches if time allows or do it on your free time",
          "Practice researching from primary sources"
        ],
        "value": "experiment5"
      },
      {
        "mentorExplanation": "Advanced! You solve novel problems by going to primary sources. Share your experiments - blog about approaches, contribute examples to docs. Your experimentation helps others tackle similar challenges.",
        "label": "I confidently experiment without fear of breaking things. I solve problems using documentation and source code even without online examples.",
        "resources": [
          {
            "title": "Write the Docs",
            "description": "Documentation community",
            "type": "docs",
            "url": "https://www.writethedocs.org/"
          },
          {
            "title": "Dev.to",
            "type": "article",
            "url": "https://dev.to/",
            "description": "Share your experiments"
          },
          {
            "title": "Writing Technical Posts",
            "description": "From How comfortable are you with debugging complex issues? - I excel at debugging across all levels (code, network, system)",
            "type": "article",
            "url": "https://www.freecodecamp.org/news/how-to-write-a-great-technical-blog-post-414c414b67f6/"
          }
        ],
        "recommendations": [
          "Contribute solutions to help others if possible",
          "Experiment with cutting-edge features",
          "Build proof-of-concepts for new approaches",
          "Document your experimental process"
        ],
        "value": "experiment6",
        "scoreWeight": 0.6
      },
      {
        "value": "experiment7",
        "recommendations": [
          "Keep improving your ability to test ideas quickly so you can confirm what works and what doesn’t.",
          "Document your solutions so others can reuse them when there are no examples available.",
          "Strengthen your understanding of core patterns so you can build solutions faster from scratch."
        ],
        "scoreWeight": 0.7,
        "mentorExplanation": "Excellent! You're comfortable in uncharted territory. Share your process - how you approach unknowns, evaluate experiments, decide when to pivot. This mindset is invaluable for teams tackling novel problems.",
        "label": "I excel at experimental problem-solving. I regularly implement solutions from specs, and source code without existing examples.",
        "resources": [
          {
            "title": "Architecture Decision Records",
            "description": "Document experiments",
            "type": "docs",
            "url": "https://adr.github.io/"
          },
          {
            "title": "IETF RFCs",
            "description": "Technical specifications",
            "type": "docs",
            "url": "https://www.ietf.org/standards/rfcs/"
          }
        ]
      },
      {
        "value": "experiment8",
        "recommendations": [
          "Keep documenting your experiments so others can understand and reuse your solutions.",
          "Focus on making your contributions to libraries stable, simple, and easy to adopt.",
          "Share your problem-solving approach so the team can learn how to handle complex or new situations."
        ],
        "scoreWeight": 0.8,
        "label": "I have expert-level experimentation skills. I solve complex problems by implementing from specs, contributing to libraries, and creating novel solutions.",
        "mentorExplanation": "Senior/expert level! You create solutions where none exist. Build organizational capability - establish experimentation frameworks, create proof-of-concept processes, mentor fearless experimentation.",
        "resources": [
          {
            "description": "OSS contribution guide",
            "type": "docs",
            "url": "https://opensource.guide/how-to-contribute/",
            "title": "Contributing to Open Source"
          },
          {
            "title": "Research Papers",
            "description": "Academic computer science",
            "type": "article",
            "url": "https://paperswelove.org/"
          }
        ]
      },
      {
        "resources": [
          {
            "title": "TC39 Contributing",
            "url": "https://github.com/tc39/how-we-work",
            "type": "github",
            "description": "Shape JavaScript"
          },
          {
            "title": "ACM Queue",
            "description": "Research publication",
            "url": "https://queue.acm.org/",
            "type": "article"
          }
        ],
        "label": "I have mastery-level experimentation skills. I innovate solutions, contribute to specifications, and solve problems requiring original research.",
        "mentorExplanation": "Outstanding! Your experiments push boundaries. Amplify impact - contribute to TC39 proposals, create influential libraries, publish papers. Your work shapes how others approach problems.",
        "scoreWeight": 0.9,
        "value": "experiment9",
        "recommendations": [
          "You might be able to contribute to language/framework evolution",
          "Mentor next-generation problem solvers like our junior devs or the students"
        ]
      },
      {
        "scoreWeight": 1,
        "recommendations": [
          "Focus on making your experimental solutions stable and easy for others to use in real projects.",
          "Share your findings clearly so the team can learn from your experiments and avoid repeating work.",
          "Validate new ideas with real-world use to make sure they bring practical value, not just technical novelty."
        ],
        "value": "experiment10",
        "resources": [
          {
            "title": "Google Research",
            "type": "article",
            "url": "https://research.google/",
            "description": "Cutting-edge research"
          },
          {
            "title": "MIT CSAIL",
            "url": "https://www.csail.mit.edu/",
            "type": "article",
            "description": "Computer science research"
          }
        ],
        "mentorExplanation": "Exceptional! Your experiments become standards. You solve problems that define new categories. Focus on generational impact - create frameworks used by millions, establish new paradigms, invest in education.",
        "label": "I have strong experimentation and innovation skills. I create new solutions and improve existing approaches."
      }
    ],
    "followUpQuestion": "",
    "type": "multiple-choice",
    "category": "Problem Solving & Debugging",
    "title": "How would you describe your approach to experimenting with solutions and implementing fixes?",
    "hint": "Consider: willingness to try different approaches, experimenting without fear of breaking things, implementing from documentation, solving problems not on Stack Overflow"
  },
  {
    "id": "41fe2c4f-ee6a-440a-be55-e8cdaea27ac5",
    "allowOther": true,
    "options": [
      {
        "label": "I discuss openly and seek consensus",
        "isCorrect": true,
        "mentorExplanation": "Open discussion works because everyone's input gets heard and weighed. The consensus process builds buy-in - people support decisions they helped shape. Document the reasoning; future-you will appreciate knowing why that choice was made.",
        "resources": [
          {
            "description": "Example RFC process",
            "type": "github",
            "url": "https://github.com/rust-lang/rfcs",
            "title": "RFC Process"
          },
          {
            "type": "docs",
            "url": "https://adr.github.io/",
            "title": "Architecture Decision Records"
          },
          {
            "title": "Technical Discussions",
            "url": "https://www.youtube.com/watch?v=jsNnlu0B1-0",
            "type": "video"
          }
        ],
        "recommendations": [
          "Document decision-making processes",
          "Facilitate technical discussions",
          "Use RFCs for big decisions"
        ],
        "value": "discuss",
        "scoreWeight": 0.7
      },
      {
        "scoreWeight": 0.55,
        "isCommonMistake": true,
        "value": "defer",
        "recommendations": [
          "Build confidence in your opinions",
          "Prepare data to support your views",
          "Ask clarifying questions"
        ],
        "resources": [
          {
            "title": "Disagree and Commit",
            "url": "https://en.wikipedia.org/wiki/Disagree_and_commit",
            "type": "article"
          },
          {
            "url": "https://www.youtube.com/watch?v=jsNnlu0B1-0",
            "type": "video",
            "title": "Technical Decision Making"
          },
          {
            "type": "article",
            "url": "https://charity.wtf/2019/01/04/engineering-management-the-pendulum-or-the-ladder/",
            "title": "Building Technical Confidence"
          }
        ],
        "label": "I usually defer to more senior developers",
        "mentorExplanation": "Experience matters, but junior doesn't mean wrong. You might see something they missed. Frame it as questions if that's easier: 'What about X approach?' or 'Have we considered Y?' That's how you learn and sometimes you'll be right."
      },
      {
        "resources": [],
        "isCorrect": true,
        "label": "I resolve disagreements with data, experiments, and proof-of-concepts",
        "mentorExplanation": "This is the engineering approach - let data decide. Quick POCs settle debates fast and everyone learns something regardless of the outcome. 'Let's test both and measure' beats endless debate every time.",
        "scoreWeight": 0.92,
        "recommendations": [
          "Teach data-driven decision making",
          "Build experimentation culture",
          "Create decision frameworks",
          "Document outcomes"
        ],
        "value": "data-driven"
      },
      {
        "recommendations": [
          "Practice assertive communication",
          "Learn conflict resolution skills",
          "Prepare your points beforehand"
        ],
        "value": "avoid",
        "scoreWeight": 0.1,
        "mentorExplanation": "Staying quiet means missing opportunities to improve the work. Your different perspective has value. Start small - share one concern as a question. Most technical disagreements aren't personal; they're about finding the best solution.",
        "label": "I tend to avoid confrontation and stay quiet",
        "resources": []
      },
      {
        "scoreWeight": 0.82,
        "value": "facilitate",
        "recommendations": [
          "Mentor others in communication",
          "Create decision frameworks",
          "Document patterns"
        ],
        "resources": [
          {
            "title": "Facilitation Skills",
            "type": "docs",
            "url": "https://www.atlassian.com/team-playbook/plays"
          }
        ],
        "isCorrect": true,
        "label": "I facilitate productive discussions and help find balanced solutions",
        "mentorExplanation": "Facilitating disagreements is leadership - you're helping people talk through problems productively. Good facilitators summarize positions, find common ground, and keep discussions on track. Teams need this skill badly."
      },
      {
        "resources": [
          {
            "title": "Disagree Better",
            "url": "https://www.youtube.com/watch?v=kgk0q7OyC6Y",
            "type": "video"
          }
        ],
        "mentorExplanation": "Being right feels good, but being effective matters more. The best engineers change their minds when shown better evidence. Try this: actively look for reasons your idea might be wrong before defending it. Ego is expensive.",
        "label": "I strongly defend my ideas and rarely change my mind",
        "scoreWeight": 0.4,
        "recommendations": [
          "Practice intellectual humility",
          "Seek contrary evidence",
          "Learn disagreement frameworks",
          "Focus on outcomes over ego"
        ],
        "value": "stubborn",
        "isCommonMistake": true
      },
      {
        "label": "I lead technical discussions and help teams make informed decisions",
        "isCorrect": true,
        "mentorExplanation": "Leading technical decisions means balancing many inputs and driving to resolution. You're not dictating; you're synthesizing viewpoints and making the call when needed. Document the rationale - decisions made with incomplete information need context for future readers.",
        "resources": [
          {
            "title": "Staff Engineer's Path",
            "type": "book",
            "url": "https://www.oreilly.com/library/view/the-staff-engineers/9781098118723/"
          },
          {
            "title": "Technical Decision Making",
            "url": "https://www.youtube.com/watch?v=jsNnlu0B1-0",
            "type": "video"
          },
          {
            "title": "Leading Without Authority",
            "url": "https://charity.wtf/2020/09/06/if-management-isnt-a-promotion-then-engineering-isnt-a-demotion/",
            "type": "article"
          }
        ],
        "recommendations": [
          "Establish decision-making processes",
          "Coach others in healthy disagreement",
          "Scale your influence"
        ],
        "value": "lead",
        "scoreWeight": 1
      },
      {
        "resources": [
          {
            "type": "article",
            "url": "https://en.wikipedia.org/wiki/Disagree_and_commit",
            "title": "Disagree and Commit"
          },
          {
            "description": "Direct and kind communication",
            "url": "https://www.radicalcandor.com/",
            "type": "book",
            "title": "Radical Candor"
          }
        ],
        "mentorExplanation": "This pattern kills team trust and makes problems worse. If you disagree, say so in the room with your reasoning. 'Disagree and commit' means voicing concerns, then supporting the decision once made. Silent resentment helps no one.",
        "label": "I agree publicly but express concerns privately or ignore decisions",
        "scoreWeight": 0.25,
        "value": "passive-aggressive",
        "recommendations": [
          "Practice direct communication",
          "Learn to disagree constructively",
          "Build trust with team",
          "Address concerns openly"
        ],
        "isCommonMistake": true
      }
    ],
    "category": "Communication",
    "type": "multiple-choice",
    "title": "How do you handle technical disagreements with team members?",
    "hint": "Healthy disagreement drives better solutions. It's about the best outcome, not being right."
  },
  {
    "id": "45cfd434-ca62-428d-bfec-b8449de9b8a6",
    "type": "multiple-choice",
    "category": "Problem Solving & Debugging",
    "allowOther": true,
    "options": [
      {
        "value": "systematic",
        "recommendations": [
          "Have you heard of advanced problem-solving patterns? I suggest learning about it",
          "Study design patterns",
          "Mentor others in problem-solving"
        ],
        "scoreWeight": 0.8,
        "mentorExplanation": "Systematic problem-solving: break it down, research similar problems, prototype quickly, iterate. That's professional engineering. Your process is as valuable as your code. Teach others - many developers skip straight to coding and waste time.",
        "isCorrect": true,
        "label": "I use systematic approaches: break down, research, prototype, iterate",
        "resources": [
          {
            "title": "Design Thinking Process",
            "type": "article",
            "url": "https://www.interaction-design.org/literature/article/5-stages-in-the-design-thinking-process"
          },
          {
            "title": "Rapid Prototyping",
            "url": "https://www.youtube.com/watch?v=JMjozqJS44M",
            "type": "video"
          }
        ]
      },
      {
        "resources": [],
        "label": "Search for solutions and adapt code I find",
        "mentorExplanation": "Searching is smart. Blindly copying code you don't understand is not. What happens when you hit a similar problem and Stack Overflow doesn't have the exact answer? Understand WHY solutions work. Build mental models, not code collections.",
        "scoreWeight": 0.35,
        "isCommonMistake": true,
        "recommendations": [
          "Always understand before copying",
          "Build problem-solving skills",
          "Learn underlying concepts"
        ],
        "value": "google-copy"
      },
      {
        "scoreWeight": 1,
        "recommendations": [
          "Share problem-solving frameworks with your fellow devs or our students",
          "Mentor in technical decision-making if you have the capacity",
          "Write about your process"
        ],
        "value": "holistic",
        "resources": [
          {
            "title": "Architecture Decision Records",
            "type": "docs",
            "url": "https://adr.github.io/"
          }
        ],
        "mentorExplanation": "Engineering, not just coding. You consider trade-offs (speed vs maintainability), constraints (time, resources, existing tech), impact (users, team, business). There's no perfect solution, only appropriate ones. This thinking is leadership.",
        "label": "I consider trade-offs, constraints, and impact before proposing solutions",
        "isCorrect": true
      },
      {
        "resources": [
          {
            "type": "article",
            "url": "https://www.freecodecamp.org/news/how-to-think-like-a-programmer-lessons-in-problem-solving-d1d8bf1de7d2/",
            "title": "How to Think Like a Programmer"
          },
          {
            "url": "https://www.youtube.com/watch?v=azcrPFhaY9k",
            "type": "video",
            "title": "Problem Solving Techniques"
          }
        ],
        "label": "Trial and error until something works",
        "mentorExplanation": "Random trial and error is slow and frustrating. Learn systematic approaches: understand the problem, break it down, form hypotheses, test them methodically. Rubber duck debugging (explaining the problem out loud) often reveals the solution.",
        "scoreWeight": 0.15,
        "isCommonMistake": true,
        "recommendations": [
          "Learn systematic problem-solving and apply it to your daily work",
          "Study debugging strategies",
          "Practice breaking down problems"
        ],
        "value": "trial-error"
      },
      {
        "scoreWeight": 0.6,
        "value": "understand-first",
        "recommendations": [
          "Learn design thinking",
          "Practice problem decomposition",
          "Study algorithmic thinking"
        ],
        "resources": [
          {
            "type": "video",
            "url": "https://www.youtube.com/watch?v=rL8X2mlNHPM",
            "title": "Algorithmic Thinking"
          },
          {
            "title": "Problem Decomposition",
            "url": "https://www.freecodecamp.org/news/how-to-think-like-a-programmer-lessons-in-problem-solving-d1d8bf1de7d2/",
            "type": "article"
          }
        ],
        "isCorrect": true,
        "label": "I try to understand the problem fully before coding",
        "mentorExplanation": "Understanding the problem is half the battle. 'Weeks of coding can save hours of planning.' Write down the problem, identify constraints, consider edge cases before touching code. Many bugs come from solving the wrong problem."
      }
    ],
    "followUpQuestion": "",
    "title": "How do you typically approach solving a new technical problem?",
    "hint": "Your problem-solving process matters as much as the solution"
  },
  {
    "id": "66815188-14b6-4bfe-8210-c6785cc4cb62",
    "followUpQuestion": "",
    "allowOther": true,
    "options": [
      {
        "label": "I restart services and hope the problem goes away",
        "mentorExplanation": "Restarting without understanding is dangerous - the problem will come back, maybe worse! Learn to investigate first. Add proper logging to understand what's happening. A restart is sometimes necessary, but always investigate the cause.",
        "resources": [],
        "isCommonMistake": true,
        "recommendations": [
          "Don't be afraid to spend time learning structured logging and apply it",
          "Study observability basics as it will help you debug faster",
          "Practice reading error logs"
        ],
        "value": "restart-hope",
        "scoreWeight": 0.15
      },
      {
        "recommendations": [
          "Learn, understand and apply distributed tracing",
          "Practice timeline reconstruction from logs"
        ],
        "value": "logs-only",
        "scoreWeight": 0.35,
        "mentorExplanation": "Logs are great but fragmented across services they're hard to reason about! Learn about correlation IDs (trace a request across multiple services) and distributed tracing tools (Jaeger, Datadog APM). They connect the dots automatically.",
        "label": "I look at logs but struggle to connect events to root causes",
        "resources": [
          {
            "title": "Distributed Tracing Guide",
            "type": "docs",
            "url": "https://opentelemetry.io/docs/concepts/observability-primer/"
          }
        ]
      },
      {
        "scoreWeight": 0.6,
        "value": "systematic",
        "recommendations": [
          "Look up the term \"chaos engineering\" ",
          "Learn advanced APM features"
        ],
        "resources": [
          {
            "title": "Chaos Engineering",
            "type": "docs",
            "url": "https://principlesofchaos.org/"
          }
        ],
        "label": "I use logs, metrics, and traces systematically to isolate issues",
        "isCorrect": true,
        "mentorExplanation": "Excellent! The three pillars - logs, metrics, traces - give you the full picture. Now build runbooks for common issues so your whole team can handle them. And study how to PREVENT production issues with chaos engineering."
      },
      {
        "scoreWeight": 0.8,
        "recommendations": [
          "Lead blameless post-mortems",
          "Build observability culture",
          "Design for debuggability from the start"
        ],
        "value": "advanced",
        "resources": [
          {
            "title": "Google SRE Post-Mortem Culture",
            "url": "https://sre.google/sre-book/postmortem-culture/",
            "type": "book"
          }
        ],
        "mentorExplanation": "Excellent production engineering mindset! Post-mortems with preventive follow-through turn outages into improvements. Blameless culture is key - when people fear blame, they hide problems. You're building antifragile systems!",
        "isCorrect": true,
        "label": "I perform thorough post-mortems and implement preventive measures"
      },
      {
        "resources": [
          {
            "type": "book",
            "url": "https://sre.google/sre-book/service-level-objectives/",
            "title": "SLOs and Error Budgets"
          },
          {
            "title": "OpenTelemetry",
            "type": "docs",
            "url": "https://opentelemetry.io/"
          }
        ],
        "isCorrect": true,
        "label": "I design systems with observability built-in and lead incident response culture",
        "mentorExplanation": "You're an SRE-level production expert! Observability-first design and strong incident culture are hallmarks of high-performing engineering organizations. Your expertise here directly impacts system reliability and user experience.",
        "scoreWeight": 1,
        "value": "expert",
        "recommendations": [
          "Implement SLOs and error budgets",
          "Build internal observability tooling which will potentially be a useful tool for you and your team",
          "Train teams on incident response"
        ]
      }
    ],
    "category": "Problem Solving & Debugging",
    "type": "multiple-choice",
    "title": "How do you approach debugging issues in production environments?",
    "hint": "Production bugs are harder - no breakpoints, real user data, and time pressure"
  },
  {
    "id": "6ba15a35-5d3d-44af-9d2d-fcfae7175aae",
    "title": "Which data structures do you understand well enough to implement and use in real code?",
    "hint": "Knowing the right structure to use is a core engineering competency",
    "followUpQuestion": "",
    "options": [
      {
        "scoreWeight": 0.1,
        "value": "arrays-strings",
        "recommendations": [
          "Master two-pointer and sliding window techniques - very useful to know and helps evaluate performance",
          "Practice string manipulation problems"
        ],
        "resources": [
          {
            "type": "video",
            "url": "https://www.youtube.com/watch?v=On03HWe2tZM",
            "title": "Two Pointer Technique"
          }
        ],
        "label": "Arrays and Strings",
        "mentorExplanation": "Arrays are the foundation of everything! Two-pointer and sliding window patterns solve a huge class of problems efficiently. If you're comfortable here, you have the base."
      },
      {
        "value": "hash-maps",
        "recommendations": [
          "Learn about collision handling",
          "Know when O(1) lookup is critical",
          "Practice frequency counting patterns"
        ],
        "scoreWeight": 0.12,
        "mentorExplanation": "Hash maps are possibly the most useful data structure in everyday coding! Any time you need fast lookup, counting, or grouping - reach for a hash map. Master this and you'll solve 40% of LeetCode problems efficiently.",
        "label": "Hash Maps / Hash Tables",
        "resources": [
          {
            "type": "video",
            "url": "https://www.youtube.com/watch?v=KyUTuwz_b7Q",
            "title": "Hash Table Internals"
          },
          {
            "url": "https://neetcode.io/",
            "type": "article",
            "title": "Hash Map Patterns"
          }
        ]
      },
      {
        "scoreWeight": 0.1,
        "recommendations": [
          "Master fast/slow pointer technique",
          "Practice reversal patterns",
          "Understand when arrays beat linked lists"
        ],
        "value": "linked-lists",
        "resources": [
          {
            "title": "Fast & Slow Pointers",
            "type": "video",
            "url": "https://www.youtube.com/watch?v=gBTe7lFR3vc"
          }
        ],
        "label": "Linked Lists",
        "mentorExplanation": "Linked lists teach pointer/reference thinking that applies everywhere. Fast/slow pointers solve cycle detection elegantly. They're less common in production but critical for interviews and understanding memory."
      },
      {
        "label": "Stacks and Queues",
        "mentorExplanation": "Stacks and queues are everywhere - undo/redo, browser history, BFS traversal. The monotonic stack pattern is underrated and solves hard problems elegantly. Once you see it, you see it everywhere.",
        "resources": [
          {
            "url": "https://www.youtube.com/watch?v=Dq_ObZwTY_Q",
            "type": "video",
            "title": "Monotonic Stack Pattern"
          }
        ],
        "recommendations": [
          "Master monotonic stack patterns",
          "Understand BFS with queues",
          "Practice expression evaluation"
        ],
        "value": "stacks-queues",
        "scoreWeight": 0.12
      },
      {
        "scoreWeight": 0.14,
        "value": "trees",
        "recommendations": [
          "Master DFS recursion",
          "Practice tree traversals",
          "Understand BST invariants"
        ],
        "resources": [
          {
            "title": "Tree Recursion Mastery",
            "type": "video",
            "url": "https://www.youtube.com/watch?v=fAAZixBzIAI"
          }
        ],
        "label": "Trees (Binary Trees, BSTs)",
        "mentorExplanation": "Trees are one of the most important structures! DFS recursion on trees is the template for a huge number of problems. Master the three traversals (pre/in/post-order) and you can solve most tree problems. BSTs appear in databases and file systems constantly."
      },
      {
        "value": "heaps",
        "recommendations": [
          "Practice Top-K problems on leetcode or codewars",
          "Understand heap invariants",
          "Know when to use min vs max heap"
        ],
        "scoreWeight": 0.13,
        "label": "Heaps / Priority Queues",
        "mentorExplanation": "Heaps are the secret weapon for 'find the K largest/smallest' problems. They give you O(log n) insertion and O(1) access to the min/max. Task schedulers and graph algorithms (Dijkstra) use them heavily.",
        "resources": [
          {
            "title": "Heap Data Structure",
            "url": "https://www.youtube.com/watch?v=t0Cq6tVNRBA",
            "type": "video"
          }
        ]
      },
      {
        "label": "Graphs (BFS, DFS, shortest path)",
        "mentorExplanation": "Graphs model almost every real-world problem: social networks, maps, dependency resolution, web crawling. BFS for shortest path in unweighted graphs, DFS for connectivity. Once you can model a problem as a graph, you have powerful algorithms at your disposal.",
        "resources": [
          {
            "url": "https://www.youtube.com/watch?v=tWVWeAqZ0WU",
            "type": "video",
            "title": "Graph Algorithms Course"
          },
          {
            "title": "Union-Find Explained",
            "type": "video",
            "url": "https://www.youtube.com/watch?v=ayW5B2W9hfo"
          }
        ],
        "value": "graphs",
        "recommendations": [
          "Read about BFS(Breadth-First Search) for shortest path and try to apply it",
          "Practice union-find",
          "Study Dijkstra and Bellman-Ford"
        ],
        "scoreWeight": 0.15
      },
      {
        "value": "tries",
        "recommendations": [
          "Build an autocomplete system",
          "Implement or use a spell checker",
          "Study when tries beat hash maps"
        ],
        "scoreWeight": 0.12,
        "mentorExplanation": "Tries are specialized but incredibly powerful for string problems: autocomplete, spell check, IP routing. They can search by prefix in O(m) time where m is the prefix length - hash maps can't do that. Understanding tries shows you think about the right tool for the job.",
        "label": "Tries / Prefix Trees",
        "resources": [
          {
            "title": "Trie Data Structure",
            "url": "https://www.youtube.com/watch?v=oobqoCJlHA0",
            "type": "video"
          }
        ]
      },
      {
        "recommendations": [
          "Start with memoization before tabulation",
          "Master 1D then 2D DP",
          "Study classic DP problems (knapsack, LCS, LIS)"
        ],
        "value": "dp-patterns",
        "scoreWeight": 0.16,
        "mentorExplanation": "DP is the hardest interview topic but incredibly rewarding! The key insight: DP is just recursion + caching. Start by writing the recursive solution, add memoization, and you have top-down DP. Classic patterns (knapsack, Fibonacci, coin change) repeat across many problems. Recognize the pattern and the solution follows.",
        "label": "Dynamic Programming patterns",
        "resources": [
          {
            "title": "DP for Beginners",
            "type": "video",
            "url": "https://www.youtube.com/watch?v=oBt53YbR9Kk",
            "description": "freeCodeCamp's comprehensive DP course"
          }
        ]
      }
    ],
    "allowOther": true,
    "category": "Data Structures & Algorithms",
    "type": "checkbox"
  },
  {
    "id": "71fa4b35-93c3-4016-8ea1-87871c0cb5af",
    "title": "How comfortable are you with pair programming and collaborative coding?",
    "hint": "Pairing is a superpower - two minds catch bugs one mind misses, and knowledge spreads fast",
    "options": [
      {
        "value": "advocate",
        "recommendations": [
          "Set up a regular pairing schedule so knowledge is shared consistently across the team.",
          "Run short retrospectives after pairing sessions to improve how they are done.",
          "Help others learn how to run effective pairing sessions and keep them productive."
        ],
        "scoreWeight": 0.8,
        "label": "I actively advocate for pairing and lead pairing sessions",
        "isCorrect": true,
        "mentorExplanation": "Advocating for pairing takes courage - it challenges the solo-coder identity many developers hold. You're making the case with concrete results: fewer bugs, faster onboarding, shared knowledge. Keep showing the wins.",
        "resources": [
          {
            "title": "Building a Pairing Culture",
            "url": "https://www.thoughtworks.com/insights/blog/pair-programming-considered-extremely-beneficial",
            "type": "article"
          }
        ]
      },
      {
        "value": "occasional",
        "recommendations": [
          "Schedule regular pairing sessions so collaboration becomes a normal part of work.",
          "Use the driver–navigator format to keep sessions structured and productive.",
          "Pair on the most difficult problems to share knowledge and improve problem-solving together."
        ],
        "scoreWeight": 0.35,
        "mentorExplanation": "Solo work has its place, but pairing on hard problems often cuts debugging time in half. Try driver-navigator: one codes, one navigates with fresh eyes. You'll catch bugs before they're written.",
        "label": "I pair occasionally but prefer working alone",
        "resources": [
          {
            "title": "When to Pair Program",
            "url": "https://www.thoughtworks.com/insights/blog/pair-programming-considered-extremely-beneficial",
            "type": "article"
          }
        ]
      },
      {
        "scoreWeight": 1,
        "recommendations": [
          "Run mob programming sessions",
          "Document pairing effectiveness"
        ],
        "value": "expert",
        "resources": [
          {
            "title": "Mob Programming RPG",
            "url": "https://github.com/willemlarsen/mobprogrammingrpg",
            "type": "github"
          },
          {
            "title": "Strategic Pairing Guide",
            "type": "article",
            "url": "https://www.martinfowler.com/articles/on-pair-programming.html"
          }
        ],
        "mentorExplanation": "Strategic pairing - knowing when, who, and how to pair. Use it for onboarding (new person drives, experienced navigates). Hard problems (two brains better than one). Knowledge transfer (rotate pairs deliberately). This is leadership.",
        "isCorrect": true,
        "label": "I use pairing strategically to spread knowledge, onboard, and solve hardest problems"
      },
      {
        "scoreWeight": 0.15,
        "recommendations": [
          "Start with low-stakes pairing sessions",
          "Practice thinking out loud",
          "Reframe pairing as a learning opportunity"
        ],
        "value": "uncomfortable",
        "resources": [
          {
            "type": "article",
            "url": "https://www.martinfowler.com/articles/on-pair-programming.html",
            "title": "Guide to Pair Programming"
          }
        ],
        "mentorExplanation": "Feeling vulnerable while someone watches you code is normal. But pairing isn't performance - it's thinking together. Your mistakes are valuable; they show your thought process. Start small: pair on a bug fix with someone you trust.",
        "label": "I'm uncomfortable having others watch me code"
      },
      {
        "value": "comfortable",
        "recommendations": [
          "Keep pairing regularly to maintain strong collaboration habits.",
          "Try different pairing styles (like driver–navigator) to see what works best for different tasks.",
          "Use pairing on harder problems to learn faster and improve shared understanding."
        ],
        "scoreWeight": 0.6,
        "isCorrect": true,
        "label": "I pair comfortably and find it productive",
        "mentorExplanation": "Pairing is one of the fastest knowledge-transfer tools. Use it strategically: pair on hard problems, rotate partners to spread knowledge, pair experienced with junior developers. Make it intentional, not random.",
        "resources": [
          {
            "url": "https://mobprogramming.org/",
            "type": "docs",
            "title": "Mob Programming"
          },
          {
            "title": "Knowledge Sharing Through Pairing",
            "type": "article",
            "url": "https://martinfowler.com/articles/on-pair-programming.html#KnowledgeSharing"
          }
        ]
      }
    ],
    "allowOther": true,
    "followUpQuestion": "",
    "type": "multiple-choice",
    "category": "Collaboration"
  },
  {
    "id": "72f9c279-5437-4a56-bfd5-0d12c69efbfd",
    "title": "How do you approach performance optimization in your applications?",
    "hint": "Premature optimization is bad, but ignoring performance is worse. Balance is key.",
    "followUpQuestion": "",
    "options": [
      {
        "value": "proactive",
        "recommendations": [
          "Try to build and establish performance culture. Check the resource on how to do this in the resources page",
          "Use a performance monitoring tool or build your own:)",
          "Share optimization knowledge"
        ],
        "scoreWeight": 0.8,
        "mentorExplanation": "Performance budgets prevent regressions before they ship. You're treating performance as a feature, not an afterthought. Keep sharing wins - when the team sees load time cut in half, performance becomes valued.",
        "label": "I proactively optimize and set performance budgets",
        "isCorrect": true,
        "resources": [
          {
            "title": "Building Performance Culture",
            "type": "video",
            "url": "https://www.youtube.com/watch?v=FEs2jgZBaQA"
          },
          {
            "url": "https://web.dev/vitals/",
            "type": "docs",
            "title": "Performance Monitoring"
          },
          {
            "url": "https://hpbn.co/",
            "type": "book",
            "title": "High Performance Browser Networking"
          }
        ]
      },
      {
        "value": "dont-think",
        "recommendations": [
          "Learn performance fundamentals",
          "Study common bottlenecks",
          "Use browser DevTools"
        ],
        "isCommonMistake": true,
        "scoreWeight": 0.15,
        "mentorExplanation": "Performance impacts real users. Slow apps lose customers - Amazon found 100ms latency costs 1% of sales. You don't need to micro-optimize, but learn to spot issues: O(n²) loops, unnecessary re-renders, huge bundles. DevTools show where time actually goes.",
        "label": "I don't usually think about performance until there's a problem",
        "resources": [
          {
            "type": "docs",
            "url": "https://web.dev/learn-web-vitals/",
            "title": "Web Performance Fundamentals"
          },
          {
            "type": "docs",
            "url": "https://developer.chrome.com/docs/devtools/performance/",
            "title": "Chrome DevTools Performance"
          },
          {
            "type": "article",
            "url": "https://web.dev/why-speed-matters/",
            "title": "Why Performance Matters"
          }
        ]
      },
      {
        "recommendations": [
          "Speak about performance - you could share during one tech talk or tech upskill",
          "Always scale performance practices"
        ],
        "value": "expert",
        "scoreWeight": 1,
        "mentorExplanation": "You architect with performance in mind from the start. Your decisions - caching layers, CDN strategy, database indexes - impact millions of requests. Performance engineering is underrepresented in content. Share what you know.",
        "label": "I architect systems for performance and lead optimization initiatives",
        "isCorrect": true,
        "resources": [
          {
            "url": "https://designingforperformance.com/",
            "type": "book",
            "title": "Designing for Performance"
          }
        ]
      },
      {
        "scoreWeight": 0.35,
        "value": "reactive",
        "recommendations": [
          "Learn to measure performance. There are some tools that can be used for this",
          "Study optimization patterns",
          "Set performance budgets"
        ],
        "resources": [
          {
            "title": "Web Performance Metrics",
            "type": "docs",
            "url": "https://web.dev/metrics/"
          },
          {
            "type": "article",
            "url": "https://web.dev/performance-budgets-101/",
            "title": "Performance Budgets"
          },
          {
            "title": "Lighthouse Guide",
            "type": "docs",
            "url": "https://developer.chrome.com/docs/lighthouse/overview/"
          }
        ],
        "label": "I optimize when users complain or metrics show issues",
        "mentorExplanation": "Reactive optimization means users already suffered through slowness. Shift left: measure in dev, set budgets, catch regressions in CI. Lighthouse scores in pull requests prevent problems before deployment. 'If you can't measure it, you can't improve it.'"
      },
      {
        "scoreWeight": 0.6,
        "value": "conscious",
        "recommendations": [
          "Learn and master advanced optimisation techniques",
          "Learn about caching strategies",
          "Study render optimization"
        ],
        "resources": [
          {
            "url": "https://www.youtube.com/watch?v=AQqFZ5t8uNc",
            "type": "video",
            "title": "Web Performance Optimization"
          },
          {
            "type": "article",
            "url": "https://kentcdodds.com/blog/fix-the-slow-render-before-you-fix-the-re-render",
            "title": "React Performance"
          }
        ],
        "mentorExplanation": "You measure before optimizing - that's the right approach. Profiling reveals the actual bottleneck, not what you assume. Next: code splitting, lazy loading, memoization, HTTP caching. Small improvements compound.",
        "label": "I consider performance while coding and use profiling tools",
        "isCorrect": true
      }
    ],
    "allowOther": true,
    "category": "Problem Solving & Debugging",
    "type": "multiple-choice"
  },
  {
    "id": "78fc194b-1b57-4397-9653-c09dfc4ab46e",
    "title": "How would you describe your familiarity with technical terminology and understanding of what different technologies are used for?",
    "hint": "Consider: understanding conversations with technical terms, knowing what technologies do, recognizing categories (e.g., Python is a language, not a database)",
    "category": "Technical Knowledge & Understanding",
    "type": "multiple-choice",
    "followUpQuestion": "",
    "options": [
      {
        "mentorExplanation": "Building your technical vocabulary is foundational! Don't be embarrassed to ask 'what does that mean?' Create a running list of terms you encounter and look them up. This gets easier quickly.",
        "label": "I frequently don't understand technical terms in conversations and often confuse what different technologies are for.",
        "resources": [
          {
            "title": "MDN Web Docs Glossary",
            "description": "Web technology terms",
            "type": "docs",
            "url": "https://developer.mozilla.org/en-US/docs/Glossary"
          },
          {
            "description": "Programming glossary",
            "type": "docs",
            "url": "https://www.codecademy.com/resources/docs",
            "title": "Codecademy Glossary"
          }
        ],
        "value": "vocab1",
        "recommendations": [
          "Create a personal glossary to record new technical terms as you learn them.",
          "Use MDN Web Docs to learn how web technologies work in simple detail.",
          "Watch beginner-friendly videos to understand new concepts before going deeper.",
          "Ask questions whenever you see unfamiliar terms or ideas."
        ],
        "scoreWeight": 0.1
      },
      {
        "scoreWeight": 0.2,
        "recommendations": [
          "Read tech articles regularly",
          "Follow technology newsletters",
          "Study technology landscape maps"
        ],
        "value": "vocab2",
        "resources": [
          {
            "title": "JavaScript Weekly",
            "url": "https://javascriptweekly.com/",
            "type": "article",
            "description": "Stay current"
          },
          {
            "title": "Web.dev",
            "type": "docs",
            "url": "https://web.dev/",
            "description": "Modern web development"
          }
        ],
        "mentorExplanation": "You're building awareness! Exposure helps - read tech blogs, follow developers on social media. When you hear a new term, take 2 minutes to understand it.",
        "label": "I understand basic terms but often encounter unfamiliar concepts. I sometimes confuse technology categories."
      },
      {
        "scoreWeight": 0.3,
        "value": "vocab3",
        "recommendations": [
          "Study simple full-stack architecture diagrams to see how systems connect.",
          "Learn the basics of backend and DevOps to understand how systems run and deploy.",
          "Understand how the frontend connects to and depends on the rest of the system."
        ],
        "resources": [
          {
            "description": "Full-stack fundamentals",
            "type": "course",
            "url": "https://fullstackopen.com/",
            "title": "Full Stack Open"
          },
          {
            "title": "Roadmap.sh",
            "description": "Developer roadmaps",
            "type": "docs",
            "url": "https://roadmap.sh/"
          }
        ],
        "label": "I understand common frontend terms but struggle with backend, DevOps, or infrastructure concepts.",
        "mentorExplanation": "Common for frontend specialists! Broaden gradually - understand APIs, databases, deployment. You don't need to code it all, but knowing what they are helps collaboration."
      },
      {
        "value": "vocab4",
        "recommendations": [
          "Build a habit of looking up unfamiliar terms right away and adding them to a personal glossary.",
          "Spend time learning common full-stack and backend concepts so new terms feel easier to connect.",
          "Ask clarifying questions early when something is unclear, especially in technical discussions."
        ],
        "scoreWeight": 0.4,
        "label": "I understand most frontend and basic full-stack terms. I occasionally encounter unfamiliar specialized concepts.",
        "mentorExplanation": "Solid foundation! Continue expanding horizontally - learn enough about databases, cloud, security to have informed conversations. Specialization is good, but breadth helps you design better solutions.",
        "resources": [
          {
            "title": "System Design Primer",
            "url": "https://github.com/donnemartin/system-design-primer",
            "type": "github",
            "description": "Broad tech concepts"
          }
        ]
      },
      {
        "mentorExplanation": "Well-rounded intermediate knowledge! Now go deeper on your stack and broader on architecture. Understanding tradeoffs between technologies matters more than knowing all of them.",
        "label": "I understand technical conversations across web development. I know what most common technologies do and their categories.",
        "resources": [
          {
            "title": "Martin Fowler's Blog",
            "description": "Software architecture",
            "type": "article",
            "url": "https://martinfowler.com/"
          },
          {
            "description": "Architecture case studies",
            "url": "http://highscalability.com/",
            "type": "article",
            "title": "High Scalability"
          }
        ],
        "recommendations": [
          "Go deeper into the tools and frameworks you use every day to understand how they really work.",
          "Learn basic performance and security concepts to write safer and faster code.",
          "Study common software architecture patterns to understand how large systems are structured."
        ],
        "value": "vocab5",
        "scoreWeight": 0.5
      },
      {
        "label": "I have strong knowledge of web technologies and infrastructure. I can explain most technologies and suggest alternatives.",
        "mentorExplanation": "Advanced knowledge! You can evaluate technologies effectively. Focus on understanding 'why' technologies emerged and what problems they solve. This helps you predict trends and make smart bets.",
        "resources": [
          {
            "title": "ThoughtWorks Tech Radar",
            "description": "Technology trends",
            "type": "article",
            "url": "https://www.thoughtworks.com/radar"
          },
          {
            "title": "InfoQ",
            "description": "Software architecture news",
            "type": "article",
            "url": "https://www.infoq.com/"
          }
        ],
        "value": "vocab6",
        "recommendations": [
          "Go deeper into tradeoffs by comparing technologies in real use cases, not just features.",
          "Practice explaining complex topics in simple terms so others can understand them easily.",
          "Strengthen your decisions by validating them with real-world constraints like cost, scale, and performance."
        ],
        "scoreWeight": 0.6
      },
      {
        "resources": [
          {
            "title": "Papers We Love",
            "url": "https://paperswelove.org/",
            "type": "article",
            "description": "Computer science papers"
          },
          {
            "title": "ACM Queue",
            "description": "Practitioner research",
            "type": "article",
            "url": "https://queue.acm.org/"
          }
        ],
        "mentorExplanation": "Excellent breadth! You can make informed architectural decisions. Focus on depth in strategic areas and staying ahead of industry shifts. Your knowledge helps teams avoid costly mistakes.",
        "label": "I have comprehensive knowledge across frontend, backend, and infrastructure. I rarely encounter unfamiliar concepts.",
        "scoreWeight": 0.7,
        "recommendations": [
          "Stay up to date by regularly exploring new tools, frameworks, and industry trends.",
          "Share your knowledge by mentoring others and explaining complex systems in simple terms.",
          "Keep challenging your understanding by working on unfamiliar or complex system problems."
        ],
        "value": "vocab7"
      },
      {
        "mentorExplanation": "Senior/expert level! You understand the entire stack deeply. Use this to guide architectural decisions, evaluate build vs buy, and set technical direction. Your expertise is a strategic asset.",
        "label": "I have strong expertise in web technologies, infrastructure, and computer science fundamentals. I can confidently discuss advanced topics.",
        "resources": [
          {
            "description": "Research at scale",
            "url": "https://research.google/pubs/",
            "type": "article",
            "title": "Google Research Publications"
          },
          {
            "title": "Distributed Systems Course",
            "url": "https://www.distributedsystemscourse.com/",
            "type": "course",
            "description": "Advanced concepts"
          }
        ],
        "value": "vocab8",
        "recommendations": [
          "Keep learning new tools and trends so your knowledge stays current.",
          "Share your knowledge by explaining complex topics in simple ways to others.",
          "Challenge yourself with hard system design problems to keep growing."
        ],
        "scoreWeight": 0.8
      },
      {
        "label": "I have mastery-level understanding of technologies across the stack. I contribute to technical standards and discussions.",
        "mentorExplanation": "Outstanding mastery! You shape how others think about technology. Consider contributing to open source, standards bodies, or influential blogs. Your insights can influence thousands of developers.",
        "resources": [
          {
            "title": "W3C Working Groups",
            "type": "docs",
            "url": "https://www.w3.org/groups/wg/",
            "description": "Web standards"
          },
          {
            "title": "TC39 Proposals",
            "description": "JavaScript evolution",
            "type": "github",
            "url": "https://github.com/tc39/proposals"
          }
        ],
        "recommendations": [
          "Keep improving your impact by making sure technical standards are clear, simple, and easy to follow.",
          "Actively include others in discussions so standards work well for the whole team, not just experts.",
          "Regularly review and update standards to match new tools, needs, and real project results."
        ],
        "value": "vocab9",
        "scoreWeight": 0.9
      },
      {
        "recommendations": [
          "Focus on making your improvements practical so they can be easily used by teams.",
          "Share your ideas through clear examples and documentation so others can apply them.",
          "Keep validating your contributions by seeing how they work in real projects and improving them over time."
        ],
        "value": "vocab10",
        "scoreWeight": 1,
        "label": "I have strong expertise in web technologies and computer science. I contribute to improving best practices and standards.",
        "mentorExplanation": "Exceptional! You're at the forefront of the industry. Your work defines best practices. Focus on maximum impact - create frameworks, write books, lead standards. Invest in the next generation of developers.",
        "resources": [
          {
            "title": "IETF",
            "url": "https://www.ietf.org/",
            "type": "docs",
            "description": "Internet standards"
          },
          {
            "url": "https://www.acm.org/",
            "type": "docs",
            "description": "Computing research",
            "title": "ACM"
          }
        ]
      }
    ]
  },
  {
    "id": "8d9d30d6-c749-4561-8578-2f2987c9a753",
    "title": "How would you describe the quality of your work and your attention to detail?",
    "hint": "Consider: error frequency, catching small inconsistencies, reviewing your own work thoroughly, producing consistent quality output",
    "category": "Precision & Attention to Detail",
    "type": "multiple-choice",
    "followUpQuestion": "",
    "options": [
      {
        "label": "My work frequently contains errors. I often overlook details and inconsistencies.",
        "mentorExplanation": "Building attention to detail is a learnable skill! Start with a review checklist: Does it compile? Did I test it? Are variable names clear? Run automated tools to catch common issues. Review your own work before asking others.",
        "resources": [
          {
            "description": "Automated error detection",
            "url": "https://eslint.org/docs/latest/use/getting-started",
            "type": "docs",
            "title": "ESLint Setup"
          },
          {
            "type": "github",
            "url": "https://github.com/mgreiler/code-review-checklist",
            "description": "Quality checklist",
            "title": "Code Review Checklist"
          }
        ],
        "recommendations": [
          "Create personal checklists for common errors",
          "Use linters and automated tools",
          "Practice reviewing code before submitting",
          "Ask for code review feedback on detail issues"
        ],
        "value": "quality1",
        "scoreWeight": 0.1
      },
      {
        "recommendations": [
          "Slow down and review methodically",
          "Test your changes thoroughly",
          "Learn common error patterns",
          "Use TypeScript for type safety"
        ],
        "value": "quality2",
        "scoreWeight": 0.2,
        "label": "I produce work with noticeable errors regularly. I miss some details during review.",
        "mentorExplanation": "Quality improves with deliberate practice! Before marking work complete, test it yourself. Click through features. Try edge cases. Read your code as if you didn't write it. Slow down to speed up.",
        "resources": [
          {
            "title": "TypeScript Handbook",
            "type": "docs",
            "url": "https://www.typescriptlang.org/docs/",
            "description": "Type safety"
          },
          {
            "title": "Testing JavaScript",
            "type": "course",
            "url": "https://testingjavascript.com/",
            "description": "Testing fundamentals"
          }
        ]
      },
      {
        "label": "My work has occasional errors. I catch some details but miss smaller inconsistencies.",
        "mentorExplanation": "You're improving! Build a habit: after writing code, walk away for 5 minutes, then review fresh. Look for: inconsistent naming, missing error handling, untested paths. Pattern recognition develops over time.",
        "resources": [
          {
            "title": "Clean Code",
            "description": "Code quality principles - we have it in the Onja Library",
            "type": "book",
            "url": "https://www.oreilly.com/library/view/clean-code-a/9780136083238/"
          },
          {
            "type": "docs",
            "url": "https://google.github.io/eng-practices/review/developer/",
            "description": "Google code review guide",
            "title": "Self-Review Guide"
          }
        ],
        "value": "quality3",
        "recommendations": [
          "Develop a consistent review process",
          "Learn to spot common error patterns",
          "Use debugging tools proactively",
          "Practice self-review techniques"
        ],
        "scoreWeight": 0.3
      },
      {
        "resources": [
          {
            "title": "Jest Testing",
            "description": "Testing framework",
            "type": "docs",
            "url": "https://jestjs.io/docs/getting-started"
          },
          {
            "title": "Refactoring",
            "url": "https://refactoring.com/",
            "type": "book",
            "description": "Improving code quality - I think we also have this book in the Onja Library. Not sure though"
          }
        ],
        "mentorExplanation": "Good foundation! Level up by anticipating issues before they occur. Think: 'What could break?' Test those cases. Review for consistency across the codebase. Quality is about prevention, not just detection.",
        "label": "I generally produce quality work with minor errors. I catch most issues but occasionally miss details.",
        "scoreWeight": 0.4,
        "value": "quality4",
        "recommendations": [
          "Slow down a bit during review to catch small details before they become issues.",
          "Use simple checklists or self-review steps to reduce missed edge cases.",
          "Start building stronger habits around testing and validation to increase consistency."
        ]
      },
      {
        "scoreWeight": 0.5,
        "value": "quality5",
        "recommendations": [
          "Add a final structured review step (checklist or tests) to further reduce the few remaining errors.",
          "Look for patterns in the rare mistakes you miss and proactively prevent them in future work.",
          "Start helping others improve their review habits by sharing your own self-review approach."
        ],
        "resources": [
          {
            "description": "Practical, real-world standards for catching issues early and improving review quality.",
            "url": "https://google.github.io/eng-practices/",
            "type": "github",
            "title": "Google Engineering Practices documentation (Testing + Code Review guides)"
          },
          {
            "title": "The Pragmatic Programmer",
            "type": "book",
            "url": "https://pragprog.com/titles/tpp20/",
            "description": "Professional practices"
          }
        ],
        "label": "I consistently produce high-quality work with few errors. I catch most details during self-review.",
        "mentorExplanation": "Strong intermediate quality! Your work is reliable. Now help others reach this level - share your review process, create quality guidelines, build automated checks. Quality culture starts with individuals."
      },
      {
        "scoreWeight": 0.6,
        "recommendations": [
          "Start improving system-level thinking so your quality extends beyond individual tasks to larger designs.",
          "Focus on anticipating edge cases earlier in planning, not just catching them during execution.",
          "Share your attention-to-detail practices with others to help raise team-wide quality standards."
        ],
        "value": "quality6",
        "resources": [
          {
            "description": "Automated quality",
            "type": "article",
            "url": "https://www.martinfowler.com/articles/continuousIntegration.html",
            "title": "Continuous Integration"
          },
          {
            "type": "docs",
            "url": "https://www.sonarsource.com/products/sonarqube/",
            "description": "Code quality platform",
            "title": "SonarQube"
          }
        ],
        "label": "I produce error-free work consistently. I have strong attention to detail and rarely miss issues.",
        "mentorExplanation": "Advanced quality mindset! You prevent issues, not just catch them. Share this - create linting rules, write style guides, build CI/CD checks. Your attention to detail becomes team capability."
      },
      {
        "label": "I excel at producing flawless work. I catch subtle issues others miss and maintain exceptional standards.",
        "mentorExplanation": "Excellent! Your eye for detail is a competitive advantage. Scale it - build quality into processes, create automated checks, establish team standards. Quality leadership means everyone produces better work.",
        "resources": [
          {
            "title": "Site Reliability Engineering",
            "description": "Quality at scale",
            "type": "book",
            "url": "https://sre.google/books/"
          },
          {
            "description": "Quality practices",
            "type": "article",
            "url": "https://www.ministryoftesting.com/",
            "title": "Quality Engineering"
          }
        ],
        "recommendations": [
          "Shift more focus from perfect execution to improving system design and overall architecture.",
          "Work on identifying and preventing entire categories of issues earlier, not just catching subtle ones during review.",
          "Share your approach and help raise the quality bar for the wider team."
        ],
        "value": "quality7",
        "scoreWeight": 0.7
      },
      {
        "recommendations": [
          "Focus more on system design and how the whole product is built, not just your own work.",
          "Try to prevent issues earlier by improving design and working methods, not just fixing them later.",
          "Help others improve their work by sharing how you maintain high quality."
        ],
        "value": "quality8",
        "scoreWeight": 0.8,
        "mentorExplanation": "Senior/expert level! Your precision sets the bar. Build systems - quality dashboards, automated testing pipelines, code review guidelines. Your standards become organizational standards.",
        "label": "I have expert-level precision. I consistently deliver perfect work and establish quality standards for others.",
        "resources": [
          {
            "type": "article",
            "url": "https://testing.googleblog.com/",
            "description": "Testing at scale",
            "title": "Google Testing Blog"
          }
        ]
      },
      {
        "label": "I have mastery-level precision and build quality frameworks and tools to support my own work.",
        "mentorExplanation": "Outstanding! You define what quality means. Your frameworks, tools, and practices are adopted widely. Share through open source, conference talks, influential writing. Shape industry standards.",
        "resources": [
          {
            "title": "Test Automation University",
            "type": "course",
            "url": "https://testautomationu.applitools.com/",
            "description": "Advanced testing"
          },
          {
            "title": "Chaos Engineering",
            "type": "docs",
            "url": "https://principlesofchaos.org/",
            "description": "System resilience"
          }
        ],
        "value": "quality9",
        "recommendations": [
          "Focus on applying your frameworks across different teams and contexts, not just building them.",
          "Improve how your tools scale and stay useful as the organization grows.",
          "Spend more time helping others adopt and use your quality practices effectively."
        ],
        "scoreWeight": 0.9
      },
      {
        "mentorExplanation": "Exceptional! Your work defines modern quality standards. Tools you create, practices you pioneer, frameworks you build - used by millions. Focus on generational impact in quality engineering.",
        "label": "I have world-class precision standards and consistently deliver flawless, high-quality work",
        "resources": [],
        "value": "quality10",
        "recommendations": [
          "Focus more on improving how systems are designed so quality is built in from the start, not just delivered at the end.",
          "Look for opportunities to scale your impact by improving processes and tools, not only individual work.",
          "Share your approach with others to help raise the overall quality bar across the team or organization"
        ],
        "scoreWeight": 1
      }
    ]
  },
  {
    "id": "954952ac-1f80-401c-a4a4-416c51a21a79",
    "title": "How experienced are you with repository strategy and large codebase management?",
    "hint": "As codebases grow, repo structure and branching strategy become critical engineering decisions",
    "category": "Version Control & Git",
    "type": "multiple-choice",
    "followUpQuestion": "",
    "options": [
      {
        "recommendations": [
          "Learn about monorepo vs polyrepo trade-offs",
          "Study how large companies structure code",
          "Explore tools like Nx or Turborepo"
        ],
        "value": "single-repo",
        "scoreWeight": 0.15,
        "mentorExplanation": "Single repos are fine for smaller projects! But understanding the alternatives prepares you for larger organizations. Monorepos (one repo for everything) are used by Google, Meta, and many others - they have real advantages for code sharing and atomic changes across packages.",
        "label": "I only work in single-repository projects",
        "resources": [
          {
            "title": "Monorepo vs Polyrepo",
            "url": "https://monorepo.tools/",
            "type": "docs"
          },
          {
            "url": "https://www.youtube.com/watch?v=W71BTkUbdqE",
            "type": "video",
            "title": "Google Monorepo"
          },
          {
            "type": "docs",
            "url": "https://nx.dev/",
            "title": "Nx Monorepo Tool"
          }
        ]
      },
      {
        "resources": [
          {
            "url": "https://semver.org/",
            "type": "docs",
            "title": "Semantic Versioning"
          },
          {
            "type": "github",
            "url": "https://github.com/changesets/changesets",
            "title": "Changesets"
          },
          {
            "title": "Turborepo",
            "type": "docs",
            "url": "https://turbo.build/repo"
          }
        ],
        "label": "I work with multiple repos but find dependency management challenging",
        "mentorExplanation": "Polyrepo dependency hell is a real pain - you update a shared library and now 12 repos need updates! Monorepos solve this but have their own tradeoffs. Learn semantic versioning thoroughly and explore tools like Changesets to manage releases.",
        "scoreWeight": 0.35,
        "isCommonMistake": true,
        "value": "basic-multi-repo",
        "recommendations": [
          "Learn semantic versioning deeply",
          "Go deeper into package management strategies",
          "Explore monorepo tools as a solution"
        ]
      },
      {
        "scoreWeight": 0.6,
        "recommendations": [
          "Learn advanced monorepo tooling",
          "Study caching and build optimization",
          "Understand affected-change detection"
        ],
        "value": "monorepo-experience",
        "resources": [
          {
            "type": "docs",
            "url": "https://nx.dev/concepts/affected",
            "title": "Nx Affected Builds"
          },
          {
            "type": "docs",
            "url": "https://turbo.build/repo/docs/core-concepts/remote-caching",
            "title": "Remote Caching"
          }
        ],
        "label": "I have experience with monorepos and understand their trade-offs",
        "isCorrect": true,
        "mentorExplanation": "Excellent! Monorepo experience is valuable. Focus next on performance at scale: caching build outputs, affected-change detection (only build what changed), and CI optimization. This is where monorepos win or lose."
      },
      {
        "value": "architect",
        "recommendations": [
          "Document your architectural decisions",
          "Share repo strategy knowledge",
          "Evaluate emerging tooling"
        ],
        "scoreWeight": 0.8,
        "label": "I design repository architecture and branching strategies for teams",
        "isCorrect": true,
        "mentorExplanation": "Excellent! Repository architecture has huge impact on team velocity. Your experience evaluating trade-offs (monorepo vs polyrepo, trunk-based vs feature branches) is high-level thinking. Share these decisions and their reasoning with your organization.",
        "resources": [
          {
            "url": "https://trunkbaseddevelopment.com/",
            "type": "docs",
            "title": "Trunk Based Development"
          },
          {
            "type": "docs",
            "url": "https://www.atlassian.com/git/tutorials/comparing-workflows",
            "title": "Repository Patterns"
          },
          {
            "url": "https://www.thoughtworks.com/insights/blog/code-organization-strategies",
            "type": "article",
            "title": "Engineering Org Structure"
          }
        ]
      },
      {
        "isCorrect": true,
        "label": "I have deep expertise in large-scale codebase management and toolchain design",
        "mentorExplanation": "You have rare expertise in large-scale codebase management! The decisions you make affect hundreds of developers' daily workflows. Share this - conference talks and blog posts on real monorepo war stories are incredibly valuable to the community.",
        "resources": [
          {
            "type": "github",
            "url": "https://github.com/nrwl/nx/blob/master/CONTRIBUTING.md",
            "title": "Contributing to Nx"
          },
          {
            "title": "Engineering Platform Design",
            "url": "https://platformengineering.org/",
            "type": "docs"
          }
        ],
        "value": "expert",
        "recommendations": [
          "Contribute to monorepo tooling",
          "Write case studies on your decisions",
          "You could give a talk on scaling codebases"
        ],
        "scoreWeight": 1
      }
    ],
    "allowOther": true
  },
  {
    "id": "99f46af2-89d3-41e8-8b66-b0128df80c79",
    "title": "How comfortable are you with data structures and algorithms?",
    "hint": "Understanding DS&A helps you choose the right tool and optimize performance",
    "options": [
      {
        "label": "I understand complexity and use appropriate structures for tasks",
        "isCorrect": true,
        "mentorExplanation": "You can choose the right structure for the job - hash map vs array, when to use a set, etc. Next level: study classic algorithms (binary search, graph traversal, dynamic programming). They show up more than you'd think in real work.",
        "resources": [
          {
            "url": "https://seanprashad.com/leetcode-patterns/",
            "type": "article",
            "title": "LeetCode Patterns"
          },
          {
            "title": "NeetCode",
            "url": "https://neetcode.io/",
            "type": "article"
          }
        ],
        "recommendations": [
          "Study advanced algorithms",
          "Practice solving medium problems",
          "Learn dynamic programming"
        ],
        "value": "intermediate",
        "scoreWeight": 0.6
      },
      {
        "resources": [
          {
            "title": "JavaScript Algorithms",
            "type": "github",
            "url": "https://github.com/trekhleb/javascript-algorithms"
          },
          {
            "title": "Big O Cheat Sheet",
            "url": "https://www.bigocheatsheet.com/",
            "type": "docs"
          },
          {
            "url": "https://www.youtube.com/watch?v=8hly31xKli0",
            "type": "video",
            "title": "FreeCodeCamp DS&A"
          }
        ],
        "mentorExplanation": "Arrays and loops get you started. Next: learn when to reach for hash maps, sets, or queues. Understanding Big O helps you spot performance issues before they happen. These fundamentals matter in real code, not just interviews.",
        "label": "I know basic arrays and loops",
        "scoreWeight": 0.15,
        "value": "basics-only",
        "recommendations": [
          "Study common data structures",
          "Learn Big O notation",
          "Practice on platforms like LeetCode"
        ]
      },
      {
        "resources": [
          {
            "url": "https://cses.fi/book/book.pdf",
            "type": "book",
            "title": "Competitive Programmer's Handbook"
          }
        ],
        "label": "I solve complex algorithmic problems and can teach others",
        "isCorrect": true,
        "mentorExplanation": "Deep algorithmic knowledge is rare. You can design efficient solutions and explain the trade-offs. Share this - write about complex problems you've solved, mentor teammates on optimization, create learning resources.",
        "scoreWeight": 1,
        "recommendations": [
          "Participate in competitions",
          "Help your colleagues",
          "Share knowledge through content"
        ],
        "value": "expert"
      },
      {
        "isCommonMistake": true,
        "recommendations": [
          "Learn Big O notation deeply",
          "Study algorithm complexity",
          "Practice problem-solving"
        ],
        "value": "some-knowledge",
        "scoreWeight": 0.35,
        "label": "I know some structures (maps, sets) but don't understand complexity",
        "mentorExplanation": "Knowing which structures exist is good, but understanding their performance characteristics is critical. That nested loop in a loop? That's O(n²) - fine for 100 items, disaster for 10,000. Learn to analyze your code's complexity.",
        "resources": [
          {
            "url": "https://www.freecodecamp.org/news/big-o-notation-why-it-matters-and-why-it-doesnt-1674cfa8a23c/",
            "type": "article",
            "title": "Big O Notation Explained"
          },
          {
            "title": "Algorithm Complexity",
            "type": "video",
            "url": "https://www.youtube.com/watch?v=D6xkbGLQesk"
          }
        ]
      },
      {
        "scoreWeight": 0.8,
        "recommendations": [
          "Study advanced DS&A",
          "Learn system optimization",
          "Practice hard problems"
        ],
        "value": "advanced",
        "resources": [
          {
            "url": "https://cp-algorithms.com/",
            "type": "docs",
            "title": "Competitive Programming"
          }
        ],
        "label": "I can implement common algorithms and optimize code performance",
        "isCorrect": true,
        "mentorExplanation": "Strong algorithmic skills. You can implement sorting, searching, and optimize performance-critical code. You make trade-offs between time and space complexity consciously. Keep practicing - these skills compound."
      }
    ],
    "allowOther": true,
    "followUpQuestion": "",
    "type": "multiple-choice",
    "category": "Data Structures & Algorithms"
  },
  {
    "id": "a6b69082-e1f2-4c9f-9ebb-7caecbb29ea4",
    "category": "Independence & Autonomy",
    "type": "multiple-choice",
    "followUpQuestion": "",
    "options": [
      {
        "recommendations": [
          "Break tasks into smaller, concrete steps",
          "Create checklists before starting work",
          "Practice asking \"what would I try first?\" before asking",
          "Document what you know vs what you need to clarify"
        ],
        "value": "autonomy1",
        "scoreWeight": 0.1,
        "label": "I need constant direction and struggle to continue without being told what to do next. I can't figure out missing parts of tasks.",
        "mentorExplanation": "Building independence starts with structure! Before asking for next steps, spend 5 minutes thinking through options. Make a list: what do I know? What's unclear? What could I try? This builds decision-making muscles.",
        "resources": [
          {
            "type": "article",
            "url": "https://gettingthingsdone.com/",
            "description": "Task management basics",
            "title": "Getting Things Done"
          },
          {
            "description": "Task decomposition",
            "type": "docs",
            "url": "https://www.atlassian.com/agile/project-management/user-stories",
            "title": "Breaking Down Tasks"
          }
        ]
      },
      {
        "resources": [
          {
            "title": "Decision Making",
            "type": "article",
            "url": "https://fs.blog/mental-models/",
            "description": "Mental models"
          }
        ],
        "label": "I frequently need guidance on what to do next. I struggle to identify or fill gaps in task descriptions independently.",
        "mentorExplanation": "Start building confidence in small decisions! When stuck, try something for 15-30 minutes first. Document your attempt - even wrong paths teach you. Ask 'what would success look like?' to identify gaps.",
        "scoreWeight": 0.2,
        "value": "autonomy2",
        "recommendations": [
          "Practice making small decisions without approval",
          "Study similar completed work for patterns",
          "Try solving before asking, even if unsure",
          "Keep notes of how others approach unclear tasks"
        ]
      },
      {
        "resources": [
          {
            "description": "Understanding requirements",
            "url": "https://www.jpattonassociates.com/user-story-mapping/",
            "type": "article",
            "title": "User Story Mapping"
          },
          {
            "title": "Assumption Testing",
            "type": "article",
            "url": "https://www.thoughtworks.com/insights/blog/testing-your-assumptions",
            "description": "Making smart assumptions"
          }
        ],
        "mentorExplanation": "You're developing! When things are vague, document assumptions: 'I think this means X, will confirm.' Look at similar existing work. Propose an approach rather than asking what to do.",
        "label": "I can continue with clear tasks but need direction when requirements are vague. I sometimes identify missing parts.",
        "scoreWeight": 0.3,
        "recommendations": [
          "Practice clarifying requirements yourself first",
          "Look at existing similar features for patterns",
          "Make documented assumptions when unclear",
          "Build confidence proposing approaches"
        ],
        "value": "autonomy3"
      },
      {
        "label": "I can usually decide next steps but sometimes need guidance. I identify some gaps but not all edge cases.",
        "mentorExplanation": "Good progress! Build edge-case thinking: 'What if user does X? What breaks if Y happens?' Study production issues to see what you miss. Your judgment is developing - trust it more.",
        "resources": [
          {
            "description": "Thinking about edge cases",
            "type": "article",
            "url": "https://www.hillelwayne.com/post/divide-by-zero/",
            "title": "Edge Case Thinking"
          },
          {
            "title": "Systems Thinking",
            "url": "https://thesystemsthinker.com/",
            "type": "article",
            "description": "Holistic problem analysis"
          }
        ],
        "value": "autonomy4",
        "recommendations": [
          "Practice thinking through edge cases",
          "Review completed work to spot patterns",
          "Build confidence in your judgment",
          "Document your decision-making process"
        ],
        "scoreWeight": 0.4
      },
      {
        "scoreWeight": 0.5,
        "value": "autonomy5",
        "recommendations": [
          "Take on more ambiguous projects",
          "Help others on breaking down tasks",
          "Document your approach for the team  or other developers / write a blog post about it",
          "Practice leading technical discussions"
        ],
        "resources": [
          {
            "title": "Technical Leadership",
            "description": "Leading through influence",
            "type": "article",
            "url": "https://leaddev.com/"
          },
          {
            "title": "Writing ADRs",
            "description": "Document decisions",
            "url": "https://adr.github.io/",
            "type": "docs"
          }
        ],
        "label": "I usually work independently and identify most gaps in requirements. I decide next steps confidently most of the time.",
        "mentorExplanation": "Strong intermediate autonomy! You're reliable. Now tackle increasingly ambiguous work. Share your process - how do you identify gaps? How do you decide? Teaching others sharpens your own thinking."
      },
      {
        "recommendations": [
          "Try to start taking ownership of entire features",
          "Lead ambiguous projects when there is the opportunity",
          "Help define requirements with your senior devs, not just implement",
          "Guide others on independent work"
        ],
        "value": "autonomy6",
        "scoreWeight": 0.6,
        "label": "I work independently, identify gaps, and propose solutions. I confidently decide next steps and fill in missing requirements.",
        "mentorExplanation": "Advanced autonomy! You don't just execute - you shape work. Start influencing what gets built. Challenge requirements, suggest better approaches, identify risks early. You're ready for ownership.",
        "resources": [
          {
            "title": "Product Thinking",
            "url": "https://www.svpg.com/product-vs-feature-teams/",
            "type": "article",
            "description": "Outcome-oriented thinking"
          },
          {
            "type": "article",
            "url": "https://staffeng.com/",
            "description": "Technical leadership",
            "title": "Staff Engineer"
          }
        ]
      },
      {
        "scoreWeight": 0.7,
        "value": "autonomy7",
        "recommendations": [
          "Own problem spaces, not just tasks",
          "Drive architectural decisions",
          "Shape product direction"
        ],
        "resources": [
          {
            "description": "Engineering management",
            "type": "book",
            "url": "https://lethain.com/elegant-puzzle/",
            "title": "An Elegant Puzzle"
          }
        ],
        "label": "I excel at independent work, proactively identify gaps and risks, and suggest improvements before being asked.",
        "mentorExplanation": "Excellent! You see around corners - identifying issues before they're problems. This is senior-level autonomy. Focus on multiplying impact - build processes, mentor others, shape strategy."
      },
      {
        "resources": [],
        "mentorExplanation": "Senior/expert level! You create work, not just complete it. You see what needs to exist. Focus on organizational leverage - build systems that make everyone more autonomous.",
        "label": "I have expert-level autonomy. I identify problems before they're assigned, define solutions, and drive initiatives independently.",
        "scoreWeight": 0.8,
        "value": "autonomy8",
        "recommendations": [
          "Lead projects that involve people from different teams"
        ]
      },
      {
        "scoreWeight": 0.9,
        "recommendations": [
          "Help decide how the company builds and uses technology",
          "Help create how engineers work together and what standards they follow"
        ],
        "value": "autonomy9",
        "resources": [
          {
            "description": "High-performing teams",
            "type": "book",
            "url": "https://itrevolution.com/book/accelerate/",
            "title": "Accelerate"
          },
          {
            "title": "Engineering Culture",
            "type": "article",
            "url": "https://www.git-tower.com/blog/version-control-best-practices/",
            "description": "Building engineering culture"
          }
        ],
        "label": "I have mastery-level independence. I define problems, create solutions, and drive organizational change autonomously.",
        "mentorExplanation": "Outstanding! You operate at strategic levels. Your autonomy enables organizational autonomy. Share your approach - write about decision-making, build frameworks, develop future leaders."
      },
      {
        "mentorExplanation": "Exceptional! Your autonomy shapes industries. You identify what should exist and make it real. Focus on generational impact - create tools, standards, and practices that outlive any single project.",
        "label": "I have world-class autonomy and self-direction. I identify industry-level problems and drive solutions that benefit thousands.",
        "resources": [
          {
            "type": "docs",
            "url": "https://opensource.guide/leadership-and-governance/",
            "description": "Leading communities",
            "title": "Open Source Leadership"
          }
        ],
        "value": "autonomy10",
        "recommendations": [
          "Take the lead in starting and driving important projects in your industry",
          "Focus on creating something that inspires people and brings them together, not just a product"
        ],
        "scoreWeight": 1
      }
    ],
    "title": "How would you describe your ability to work independently and figure out what to do next without constant direction?",
    "hint": "Consider: continuing independently, deciding next steps, identifying gaps in task descriptions, confidence taking on tasks, filling in missing requirements"
  },
  {
    "id": "a6d52d6b-e4da-48f7-8cf9-015006428bd8",
    "title": "How would you describe your approach to seeking help and persisting through challenges?",
    "hint": "Consider: frequency of asking for help when info is available, effort to research independently, asking only when stuck, persistence vs giving up",
    "type": "multiple-choice",
    "category": "Independence & Autonomy",
    "options": [
      {
        "resources": [
          {
            "title": "How to Ask Questions",
            "type": "docs",
            "url": "https://stackoverflow.com/help/how-to-ask",
            "description": "Asking effective questions"
          },
          {
            "description": "Self-help technique",
            "url": "https://rubberduckdebugging.com/",
            "type": "article",
            "title": "Rubber Duck Debugging"
          }
        ],
        "label": "I ask for help very frequently, even when information is available. I give up quickly when stuck.",
        "mentorExplanation": "Building independence means building tolerance for struggle! Set a 15-minute rule: try that long before asking. Document what you tried - this builds problem-solving skills and helps others help you better.",
        "scoreWeight": 0.1,
        "recommendations": [
          "Commit to trying for at least 15 minutes before asking",
          "Build a research checklist (docs, Stack Overflow, etc.)",
          "Track and mention what you tried before asking"
        ],
        "value": "help1"
      },
      {
        "mentorExplanation": "Before asking, complete this checklist: Did I Google it? Check docs? Try two approaches? This builds self-sufficiency. Each time you find answers yourself, it gets easier next time.",
        "label": "I ask for help frequently and give up somewhat easily. I don't always check available resources first.",
        "resources": [
          {
            "title": "Research Skills",
            "description": "Missing CS semester",
            "url": "https://missing.csail.mit.edu/",
            "type": "course"
          }
        ],
        "recommendations": [
          "Create a \"before I ask\" checklist",
          "Practice Googling your questions first",
          "Read documentation before asking",
          "Try at least 2 approaches before seeking help"
        ],
        "value": "help2",
        "scoreWeight": 0.2
      },
      {
        "scoreWeight": 0.3,
        "value": "help3",
        "recommendations": [
          "Extend your struggle time to 30-45 minutes",
          "Check the docs and search thoroughly before asking for help",
          "Try different or less obvious solutions before asking for help",
          "Write down solutions you find so you can use them again later"
        ],
        "resources": [
          {
            "title": "Growth Mindset",
            "type": "article",
            "url": "https://teachingcommons.stanford.edu/teaching-guides/foundations-course-design/learning-activities/growth-mindset-and-enhanced-learning",
            "description": "Embracing challenges"
          }
        ],
        "label": "I try to solve problems myself but ask for help more than needed. I persist for a while but give up before trying all options.",
        "mentorExplanation": "You're developing! Push your struggle tolerance. Before asking, ensure you've checked: official docs, Stack Overflow, GitHub issues, similar code. The answer's often there - finding it yourself builds capability."
      },
      {
        "scoreWeight": 0.4,
        "recommendations": [
          "Join community forums to learn from others",
          "Answer questions to reinforce learning",
          "Build confidence in your solutions",
          "Track when you solve things yourself and appreciate yourself"
        ],
        "value": "help4",
        "resources": [
          {
            "url": "https://jamesclear.com/deliberate-practice-theory",
            "type": "article",
            "description": "Skill building",
            "title": "Deliberate Practice"
          },
          {
            "description": "Community learning",
            "url": "https://stackexchange.com/",
            "type": "docs",
            "title": "StackExchange Network"
          }
        ],
        "label": "I research independently before asking but still ask more than I need to. I persist through challenges but not always fully.",
        "mentorExplanation": "Good foundation! Build confidence - track problems you solve independently. You'll see you can figure out more than you think. When you do ask, you'll ask better questions."
      },
      {
        "recommendations": [
          "Document your problem-solving process",
          "Tackle increasingly complex problems",
          "Build expertise in persistence strategies"
        ],
        "value": "help5",
        "scoreWeight": 0.5,
        "mentorExplanation": "Strong intermediate! You have healthy help-seeking balance. Now help others develop this - share your research process, explain how you persist. Teaching reinforces your own skills.",
        "label": "I ask for help only when genuinely stuck after researching. I persist through most challenges without giving up.",
        "resources": []
      },
      {
        "resources": [
          {
            "title": "Technical Writing",
            "url": "https://developers.google.com/tech-writing",
            "type": "course",
            "description": "Document solutions"
          },
          {
            "description": "Team learning",
            "url": "https://hbr.org/2008/03/is-yours-a-learning-organization",
            "type": "article",
            "title": "Building Learning Organizations"
          }
        ],
        "mentorExplanation": "Advanced self-sufficiency! You're a resource others can learn from. Document your problem-solving approaches. Help build a team culture of healthy persistence and smart help-seeking.",
        "label": "I rarely ask for help, researching thoroughly first. I persist through difficult problems and exhaust options before asking.",
        "scoreWeight": 0.6,
        "value": "help6",
        "recommendations": [
          "Share your research strategies with your colleagues - you can use one of our slack channels for this",
          "Contribute solutions to documentation"
        ]
      },
      {
        "mentorExplanation": "Excellent! Your independence is a strength. Share it - create troubleshooting guides, define when to ask for help vs persist. Your approach helps the whole team become more self-sufficient.",
        "label": "I solve nearly all problems independently. I only ask when collaborating with experts on complex edge cases.",
        "resources": [
          {
            "description": "Creating guides",
            "type": "docs",
            "url": "https://www.writethedocs.org/guide/",
            "title": "Documentation Best Practices"
          }
        ],
        "value": "help7",
        "recommendations": [
          "Run sessions where the team works together to solve problems",
          "Write simple guides to help the team fix common issues",
          "Create a shared place where the team stores useful information",
          "Set clear rules for when to ask for help or escalate an issue"
        ],
        "scoreWeight": 0.7
      },
      {
        "scoreWeight": 0.8,
        "recommendations": [
          "Increase your impact by building systems that help many people",
          "Create tools and guides so people can help themselves without asking you",
          "Help create a team where people regularly learn and share knowledge",
          "Help teams work more independently without needing constant help from others"
        ],
        "value": "help8",
        "resources": [
          {
            "title": "The Coaching Habit",
            "url": "https://boxofcrayons.com/the-coaching-habit-book/",
            "type": "book",
            "description": "Developing others"
          }
        ],
        "label": "I have expert-level self-sufficiency. I solve complex problems independently and help others build their independence.",
        "mentorExplanation": "Senior/expert level! You multiply team capability. Build systems that make everyone more independent - comprehensive docs, debugging tools, clear escalation paths. Your impact extends through others."
      },
      {
        "label": "I have mastery-level independence. I solve novel problems and build systems that enable organizational self-sufficiency.",
        "mentorExplanation": "Outstanding! You create independence at scale. Your tools, docs, and systems let thousands solve problems themselves. Share widely - blog posts, conference talks, open source. Shape how teams work.",
        "resources": [
          {
            "type": "article",
            "url": "https://developerexperience.io/",
            "description": "Enabling developers",
            "title": "Developer Experience"
          },
          {
            "title": "Platform Engineering",
            "url": "https://platformengineering.org/",
            "type": "docs",
            "description": "Self-service infrastructure"
          }
        ],
        "value": "help9",
        "recommendations": [
          "Build systems and resources that help people learn easily",
          "Help make good ways of working standard across the company",
          "Help teams become able to work on their own without much help",
          "Help shape how the whole industry works or sets its rules"
        ],
        "scoreWeight": 0.9
      },
      {
        "label": "I have world-class self-sufficiency. I solve unprecedented problems and create frameworks that enable independence globally.",
        "mentorExplanation": "Exceptional! Your work enables millions to solve problems independently. Tools you create, standards you establish, practices you pioneer - these have generational impact. Focus on maximum leverage and legacy.",
        "resources": [
          {
            "description": "Global collaboration",
            "type": "docs",
            "url": "https://opensource.org/",
            "title": "Open Source Economics"
          }
        ],
        "recommendations": [
          "Build tools that significantly change how things are done",
          "Help set the best ways of working that are used worldwide",
          "Help create efforts that encourage people or teams to work independently"
        ],
        "value": "help10",
        "scoreWeight": 1
      }
    ],
    "followUpQuestion": ""
  },
  {
    "id": "c072811f-f8b9-4476-8d48-24eaeb750800",
    "title": "What's your experience with CI/CD pipelines and DevOps practices?",
    "hint": "DevOps bridges development and operations - automate testing, deployment, monitoring",
    "type": "multiple-choice",
    "category": "Technical Skills",
    "allowOther": true,
    "options": [
      {
        "scoreWeight": 0.6,
        "recommendations": [
          "I recommend learning infrastructure as code",
          "Spend time to study deployment strategies",
          "Also go deep into monitoring and logging"
        ],
        "value": "configure",
        "resources": [
          {
            "title": "Terraform Tutorial",
            "url": "https://developer.hashicorp.com/terraform/tutorials",
            "type": "docs"
          },
          {
            "title": "Deployment Strategies",
            "type": "video",
            "url": "https://www.youtube.com/watch?v=AWVTKBUnoIg"
          }
        ],
        "mentorExplanation": "You understand the development pipeline end-to-end. Next level: infrastructure as code (Terraform treats infra like code), deployment strategies (blue-green eliminates downtime), observability (logs and metrics show what's actually happening in prod).",
        "isCorrect": true,
        "label": "I can configure and maintain CI/CD pipelines"
      },
      {
        "resources": [
          {
            "title": "Jenkins Tutorial",
            "type": "docs",
            "url": "https://www.jenkins.io/doc/tutorials/"
          }
        ],
        "mentorExplanation": "Using pipelines is fine, but understanding how they work helps when they break (and they will). Knowing how builds, tests, and deployments connect helps you debug faster. Set up a GitHub Action for a side project - it's simpler than you think.",
        "label": "I use existing CI/CD pipelines but don't configure them",
        "scoreWeight": 0.32,
        "value": "use-existing",
        "recommendations": [
          "Learn more about pipeline configuration",
          "Study different CI/CD tools which will help you understand the configuration",
          "Try to create your own pipeline for your personal project"
        ]
      },
      {
        "recommendations": [
          "Would be great for you to share DevOps knowledge with our fellow developers - probably during tech talk:)"
        ],
        "value": "expert",
        "scoreWeight": 1,
        "mentorExplanation": "Platform engineering - building internal developer platforms that let teams ship independently. Your work multiplies everyone's productivity. This expertise is in high demand. Share it - write, speak, build tools.",
        "label": "I architect complete DevOps solutions and lead platform engineering",
        "isCorrect": true,
        "resources": [
          {
            "title": "Platform Engineering",
            "url": "https://platformengineering.org/",
            "type": "docs"
          },
          {
            "title": "Site Reliability Engineering",
            "description": "Free Google SRE books",
            "type": "book",
            "url": "https://sre.google/books/"
          }
        ]
      },
      {
        "value": "advanced",
        "recommendations": [
          "Study Kubernetes",
          "Learn observability",
          "Advocate for DevOps practices"
        ],
        "scoreWeight": 0.8,
        "isCorrect": true,
        "label": "I design deployment strategies and implement infrastructure as code",
        "mentorExplanation": "You bridge dev and ops effectively. Infrastructure as code, blue-green deployments, rollback strategies - you're enabling safe, fast shipping. Many developers fear this stuff. Share your knowledge, make deployments less scary.",
        "resources": [
          {
            "type": "docs",
            "url": "https://kubernetes.io/docs/tutorials/",
            "title": "Kubernetes Tutorial"
          }
        ]
      },
      {
        "scoreWeight": 0.15,
        "value": "no-experience",
        "recommendations": [
          "You can spend some time learning some CI/CD basics",
          "Spend some time studyong deployment strategies",
          "Set up a simple pipeline"
        ],
        "resources": [
          {
            "url": "https://www.youtube.com/watch?v=scEDHsr3APg",
            "type": "video",
            "title": "CI/CD Explained"
          },
          {
            "type": "docs",
            "url": "https://docs.github.com/en/actions/quickstart",
            "title": "GitHub Actions Tutorial"
          },
          {
            "title": "CI/CD Best Practices",
            "type": "article",
            "url": "https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment"
          }
        ],
        "mentorExplanation": "CI/CD isn't just 'operations stuff' - it changes how you develop. Automated tests on every commit catch bugs early. Push-button deploys eliminate manual errors. Start simple: run tests automatically. The confidence boost is immediate.",
        "label": "Little to no experience with CI/CD"
      }
    ],
    "followUpQuestion": ""
  },
  {
    "id": "c33403f3-e850-4e08-ab82-50391a4aa1b3",
    "title": "How would you describe your ability to debug issues and implement new solutions without existing examples?",
    "hint": "Consider: identifying root causes, implementing without examples, judging when to use technologies, troubleshooting systematically",
    "category": "Technical Knowledge & Understanding",
    "type": "multiple-choice",
    "followUpQuestion": "",
    "options": [
      {
        "resources": [
          {
            "type": "docs",
            "url": "https://developer.chrome.com/docs/devtools/",
            "description": "Browser debugging",
            "title": "Chrome DevTools"
          }
        ],
        "mentorExplanation": "Debugging improves with practice! Error messages help. Read them slowly. Learn DevTools. Isolate problems systematically.",
        "label": "I struggle to identify problems without help. I need detailed examples and feel lost without them.",
        "scoreWeight": 0.1,
        "recommendations": [
          "Learn browser DevTools basics",
          "Practice reading error messages",
          "Learn console.log and breakpoints"
        ],
        "value": "debug1"
      },
      {
        "mentorExplanation": "Building awareness! Form hypotheses, test them. Learn debugger - step through code, watch variables.",
        "label": "I debug simple issues with guidance. I rely on examples and struggle implementing without references.",
        "resources": [
          {
            "title": "VS Code Debugging",
            "description": "IDE debugger",
            "type": "docs",
            "url": "https://code.visualstudio.com/docs/editor/debugging"
          }
        ],
        "recommendations": [
          "Practice forming a guess, testing it, and then checking the result before moving on.",
          "Learn how to read error messages and stack traces to find problems faster.",
          "Use the debugger more often instead of only relying on console.log."
        ],
        "value": "debug2",
        "scoreWeight": 0.2
      },
      {
        "recommendations": [
          "Build features from scratch to understand how all parts work together.",
          "Compare different solutions before choosing one to learn tradeoffs.",
          "Read official documentation, not only Stack Overflow or AI, to get correct and complete understanding."
        ],
        "value": "debug3",
        "scoreWeight": 0.3,
        "label": "I find and fix common bugs. I adapt examples but feel uncomfortable without starting references.",
        "mentorExplanation": "Good! Try 30 minutes before searching. Read official docs. Understanding 'why' lets you decide without examples.",
        "resources": [
          {
            "title": "React DevTools",
            "description": "Debug React apps",
            "type": "docs",
            "url": "https://react.dev/learn/react-developer-tools"
          }
        ]
      },
      {
        "resources": [
          {
            "type": "article",
            "url": "https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html",
            "description": "Architectural thinking",
            "title": "Clean Architecture"
          }
        ],
        "mentorExplanation": "Solid intermediate! For complex features, try architectural thinking: components, communication, data flow.",
        "label": "I debug most issues given time. I implement simpler features independently but prefer examples for complex ones.",
        "scoreWeight": 0.4,
        "value": "debug4",
        "recommendations": [
          "Practice breaking complex problems into smaller parts before jumping to a solution.",
          "Build more complex features step by step without relying on examples.",
          "Improve your debugging by predicting the cause of issues before checking logs or code."
        ]
      },
      {
        "scoreWeight": 0.5,
        "value": "debug5",
        "recommendations": [
          "Identify performance bottlenecks proactively",
          "Study debugging at scale",
          "Mentor debugging techniques"
        ],
        "resources": [
          {
            "type": "docs",
            "url": "https://docs.sentry.io/",
            "description": "Production monitoring",
            "title": "Sentry Docs"
          }
        ],
        "label": "I debug complex issues systematically. I implement most features independently and judge different approaches.",
        "mentorExplanation": "Strong intermediate! Think systems. Study monitoring, logging, error tracking. Think maintainability and testability."
      },
      {
        "resources": [
          {
            "title": "Distributed Tracing",
            "type": "docs",
            "url": "https://opentelemetry.io/",
            "description": "Debug distributed systems"
          }
        ],
        "label": "I quickly identify root causes. I confidently implement solutions and evaluate technology choices independently.",
        "mentorExplanation": "Advanced! Focus on scale and prevention. Design debuggable systems. Study observability - metrics, logs, traces.",
        "scoreWeight": 0.6,
        "value": "debug6",
        "recommendations": [
          "Keep checking your solutions with real results like performance, reliability, and maintainability.",
          "Share your decision process so others can understand how you choose technologies and approaches.",
          "Look for ways to improve systems over time, not just fix the immediate problem."
        ]
      },
      {
        "resources": [
          {
            "title": "SRE Books",
            "description": "Reliability approach",
            "url": "https://sre.google/books/",
            "type": "book"
          }
        ],
        "mentorExplanation": "Excellent! Scale your knowledge: build runbooks, create tooling, set standards. Share through docs and talks.",
        "label": "I excel at debugging obscure issues. I architect solutions with edge cases and explain decisions clearly.",
        "scoreWeight": 0.7,
        "value": "debug7",
        "recommendations": [
          "Keep documenting edge cases and solutions so the team can reuse your learnings.",
          "Validate your architectural decisions with real-world constraints like scale, performance, and cost.",
          "Share your debugging approach so others can learn how to handle complex issues."
        ]
      },
      {
        "scoreWeight": 0.8,
        "recommendations": [
          "Keep adding logging and monitoring so issues can be found faster in real environments.",
          "Share your debugging patterns so others can apply the same approach in their work.",
          "Focus on preventing issues early by thinking about edge cases during design."
        ],
        "value": "debug8",
        "resources": [
          {
            "title": "V8 Blog",
            "description": "JS engine internals",
            "type": "article",
            "url": "https://v8.dev/blog"
          }
        ],
        "label": "I can solve most debugging problems. I design systems that are easy to debug and rarely get blocked.",
        "mentorExplanation": "Outstanding! Prevent bug categories through architecture. Lead initiatives. Build tooling. Your expertise shapes how others debug."
      },
      {
        "scoreWeight": 0.9,
        "recommendations": [
          "Document your debugging approaches so others can reuse and learn from them.",
          "Focus on improving team-wide debugging practices, not just individual fixes.",
          "Keep testing and refining your methods using real production issues."
        ],
        "value": "debug9",
        "resources": [
          {
            "title": "DevTools Protocol",
            "description": "Build debugging tools",
            "type": "docs",
            "url": "https://chromedevtools.github.io/devtools-protocol/"
          }
        ],
        "label": "I have strong debugging skills across the stack. I improve how debugging is done and help make tools better.",
        "mentorExplanation": "Exceptional! Don't just use tools, improve them. Develop techniques. Contribute to tools millions use. Share expertise."
      },
      {
        "value": "debug10",
        "recommendations": [
          "Make your tools and methods easy for others to understand and adopt.",
          "Test your approaches in real systems to make sure they solve real problems.",
          "Share your debugging methods through clear examples, guides, or documentation."
        ],
        "scoreWeight": 1,
        "label": "I have expert debugging skills across all layers of the system. I create tools and methods that help improve debugging practices.",
        "mentorExplanation": "Extraordinary! Your work influences worldwide debugging. At this pinnacle, legacy matters. Lead OSS, found companies, write definitive works.",
        "resources": [
          {
            "type": "docs",
            "url": "https://www.w3.org/",
            "description": "Web standards",
            "title": "W3C"
          }
        ]
      }
    ]
  },
  {
    "id": "d058d558-5275-43da-9909-6b7e58387cdf",
    "type": "scale",
    "category": "Technical Skills",
    "min": 1,
    "title": "How would you rate your proficiency in your primary programming language(s)?",
    "hint": "Consider: syntax mastery, best practices, design patterns, advanced features",
    "max": 10
  },
  {
    "id": "dc0e2c70-4c8d-448a-8663-e32f860ed300",
    "title": "How do you approach learning a new technology or framework?",
    "hint": "Consider your learning initiative, methods, and knowledge sharing",
    "followUpQuestion": "",
    "options": [
      {
        "mentorExplanation": "Collaborative learning works because you get real-time feedback and see how others think through problems. The social accountability helps too - you actually show up and do the work. Try mob programming sometime; it's surprisingly effective for complex problems.",
        "isCorrect": true,
        "label": "I learn best through pair programming and collaboration",
        "resources": [
          {
            "url": "https://martinfowler.com/articles/on-pair-programming.html",
            "type": "article",
            "title": "Pair Programming Guide"
          },
          {
            "type": "video",
            "url": "https://www.youtube.com/watch?v=dVqUcNKVbYg",
            "title": "Mob Programming"
          }
        ],
        "recommendations": [
          "Start a peer learning group",
          "Organize study sessions",
          "Practice mob programming",
          "Facilitate knowledge sharing"
        ],
        "value": "peer-learning",
        "scoreWeight": 0.65
      },
      {
        "resources": [
          {
            "title": "Spaced Repetition",
            "type": "article",
            "url": "https://ncase.me/remember/",
            "description": "Effective learning technique"
          },
          {
            "title": "Developer Learning Path",
            "url": "https://github.com/kamranahmedse/developer-roadmap",
            "type": "github"
          }
        ],
        "label": "I learn when I encounter a problem that needs solving",
        "mentorExplanation": "Just-in-time learning feels efficient but leaves gaps in your foundation. You end up relearning the same concepts in different contexts. Spend some time on fundamentals - understanding how things work makes future problems easier to solve.",
        "scoreWeight": 0.25,
        "isCommonMistake": true,
        "value": "reactive",
        "recommendations": [
          "Complement just-in-time learning with structured study",
          "Build foundational knowledge"
        ]
      },
      {
        "recommendations": [
          "Scale your teaching impact",
          "Create comprehensive courses - you might want to help the coding course designers:)"
        ],
        "value": "teach-to-learn",
        "scoreWeight": 0.87,
        "mentorExplanation": "Teaching forces you to understand at a deeper level - you can't hand-wave over the parts you don't fully get. Plus you're helping others while you learn. Write, speak, create videos - pick what works for you and keep doing it.",
        "label": "I learn by teaching and creating educational content",
        "isCorrect": true,
        "resources": [
          {
            "description": "Learn by teaching",
            "type": "article",
            "url": "https://fs.blog/feynman-technique/",
            "title": "Feynman Technique"
          },
          {
            "url": "https://developers.google.com/tech-writing",
            "type": "course",
            "title": "Creating Technical Content"
          }
        ]
      },
      {
        "scoreWeight": 0.35,
        "recommendations": [
          "Go deeper than tutorials",
          "Build projects from scratch",
          "Read official documentation"
        ],
        "value": "basics",
        "resources": [
          {
            "type": "github",
            "url": "https://github.com/practical-tutorials/project-based-learning",
            "title": "Project-Based Learning"
          }
        ],
        "mentorExplanation": "Tutorials get you started, but they're training wheels. At some point you need to fall a few times to really learn. Pick a small project and build it without following along - the struggle is where learning actually happens.",
        "label": "I learn the basics through tutorials when needed"
      },
      {
        "scoreWeight": 0.8,
        "recommendations": [
          "Apply what you learn in theory directly to small real projects or features.",
          "Reflect on results to see what works in practice versus what only works in theory.",
          "Share practical examples so others can see how theory connects to real work."
        ],
        "value": "theory-practice",
        "resources": [
          {
            "title": "Computer Science Fundamentals",
            "type": "github",
            "url": "https://github.com/ossu/computer-science",
            "description": "Free CS education"
          },
          {
            "description": "Theory to hardware",
            "type": "video",
            "url": "https://www.youtube.com/c/BenEater",
            "title": "Applying CS Theory"
          }
        ],
        "label": "I balance theoretical study with practical application",
        "isCorrect": true,
        "mentorExplanation": "This is the sweet spot. Theory gives you the mental models to understand why things work; practice cements it. People who skip theory hit walls; people who skip practice never ship. You're doing both."
      },
      {
        "resources": [
          {
            "title": "Developer Roadmaps",
            "description": "Structured learning paths",
            "url": "https://roadmap.sh/",
            "type": "docs"
          }
        ],
        "mentorExplanation": "Waiting for permission to learn puts your growth in someone else's hands. The developers who advance fastest are the ones who explore on their own time. Start small - even 30 minutes a day adds up fast.",
        "label": "I wait for formal training or assignments",
        "scoreWeight": 0.08,
        "recommendations": [
          "Take initiative in learning",
          "Set personal learning goals",
          "Start a small personal project"
        ],
        "value": "wait"
      },
      {
        "scoreWeight": 0.73,
        "recommendations": [
          "Document your experiments",
          "Share learnings from failures",
          "Build lab environments"
        ],
        "value": "experiment",
        "resources": [
          {
            "description": "Safe environment for experiments",
            "url": "https://www.reddit.com/r/homelab/",
            "type": "article",
            "title": "Build a Home Lab"
          }
        ],
        "isCorrect": true,
        "label": "I learn by experimenting and breaking things in safe environments",
        "mentorExplanation": "Breaking things is underrated as a learning method. When something fails, you learn way more than when it just works. Keep a lab environment where you can safely destroy stuff. Document what breaks and why - future you will thank you."
      },
      {
        "mentorExplanation": "Tutorial hell is real - you watch someone build, think you understand, then freeze when facing a blank editor. The fix: stop mid-tutorial and build the rest yourself. Use docs, not more tutorials. The discomfort means you're actually learning.",
        "label": "I follow many tutorials but struggle to build without them",
        "resources": [
          {
            "title": "Learn by Building",
            "type": "github",
            "url": "https://github.com/practical-tutorials/project-based-learning"
          }
        ],
        "value": "tutorial-hell",
        "recommendations": [
          "Break free from tutorial dependency",
          "Build projects from scratch",
          "Learn to read documentation",
          "Start with small original ideas"
        ],
        "isCommonMistake": true,
        "scoreWeight": 0.17
      },
      {
        "mentorExplanation": "Reading source code separates good developers from great ones. You're learning from the best implementations, not just using APIs. This depth shows up in how you solve problems. Keep sharing what you find - most developers never go this deep.",
        "isCorrect": true,
        "label": "I deeply research topics, read source code, and experiment extensively",
        "resources": [
          {
            "title": "Reading Code Effectively",
            "url": "https://github.com/aredridel/how-to-read-code",
            "type": "github"
          },
          {
            "title": "Creating Technical Content",
            "type": "course",
            "url": "https://developers.google.com/tech-writing"
          }
        ],
        "recommendations": [
          "Focus on turning your research into practical solutions you can apply in real projects.",
          "Summarize key findings so others can quickly learn from your deep research.",
          "Balance exploration with delivery so experimentation leads to usable improvements."
        ],
        "value": "deep-dive",
        "scoreWeight": 0.93
      },
      {
        "isCorrect": true,
        "label": "I follow structured courses and build practice projects",
        "mentorExplanation": "Structured courses give you a solid path through the fundamentals. The practice projects are what make it stick. Try teaching someone else what you learned - that's when you discover what you actually understand versus what you just memorized.",
        "resources": [
          {
            "title": "Teach to Learn",
            "url": "https://fs.blog/feynman-technique/",
            "type": "article",
            "description": "Feynman Technique"
          }
        ],
        "recommendations": [
          "Apply what you learn in courses directly to real or slightly larger projects.",
          "Try building projects without step-by-step guidance to strengthen problem-solving skills.",
          "Review what you built to understand what worked well and what you can improve"
        ],
        "value": "structured",
        "scoreWeight": 0.55
      },
      {
        "scoreWeight": 1,
        "value": "expert",
        "recommendations": [
          "Focus on turning your research into simple, practical guidance others can easily follow.",
          "Share your knowledge in clear examples so the community can apply it in real work.",
          "Keep validating best practices in real projects to make sure they stay useful and relevant."
        ],
        "resources": [
          {
            "title": "Conference Speaking Guide",
            "type": "docs",
            "url": "https://speaking.io/"
          },
          {
            "title": "Building Developer Communities",
            "url": "https://www.commonroom.io/blog/developer-community/",
            "type": "article"
          }
        ],
        "isCorrect": true,
        "label": "I research deeply, contribute to communities, and help establish best practices",
        "mentorExplanation": "You're operating at the community level, which amplifies your impact. When you establish best practices and contribute back, you're shaping how thousands of developers work. This is leadership through teaching. Keep it up."
      },
      {
        "value": "proactive",
        "recommendations": [
          "Share knowledge with your team",
          "Contribute to open source",
          "Create technical content"
        ],
        "scoreWeight": 0.45,
        "label": "I proactively explore new tech and build meaningful side projects",
        "isCorrect": true,
        "mentorExplanation": "Side projects are your laboratory - you learn without constraints or deadlines. The best ones scratch your own itch. Share what you build; even failed projects teach valuable lessons when you write about what didn't work and why.",
        "yearOneRecommendations": [
          "Complete 2-3 substantial side projects",
          "Present learnings to the team"
        ],
        "resources": [
          {
            "type": "article",
            "url": "https://www.indiehackers.com/group/build-in-public",
            "title": "Building in Public"
          },
          {
            "title": "Open Source Guide",
            "url": "https://opensource.guide/how-to-contribute/",
            "type": "docs"
          },
          {
            "url": "https://www.firsttimersonly.com/",
            "type": "docs",
            "title": "First Timers Only"
          }
        ]
      }
    ],
    "allowOther": true,
    "category": "Learning & Growth",
    "type": "multiple-choice"
  },
  {
    "id": "dda705c8-c3da-4ce9-bf8b-ddd3c1f03cac",
    "title": "How would you describe your ability to identify problems and find solutions through research?",
    "hint": "Consider: narrowing down problem areas, searching effectively (Google, Stack Overflow), finding solutions in existing codebase, using correct keywords",
    "options": [
      {
        "scoreWeight": 0.1,
        "value": "research1",
        "recommendations": [
          "Learn to read error messages carefully",
          "Practice breaking problems into smaller pieces",
          "Use browser DevTools to inspect behavior",
          "Ask for help narrowing down the problem area"
        ],
        "resources": [
          {
            "description": "Debugging fundamentals",
            "type": "article",
            "url": "https://jvns.ca/blog/2019/06/23/a-few-debugging-resources/",
            "title": "How to Debug"
          },
          {
            "description": "Understanding JS errors",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors",
            "type": "docs",
            "title": "Reading Error Messages"
          }
        ],
        "mentorExplanation": "Getting blocked is frustrating but normal when learning! Start with error messages - they point to problem areas. Learn to add console.logs to trace execution. Copy exact error messages to Google.",
        "label": "I often get blocked and struggle to identify where the problem is. I have difficulty finding relevant information online."
      },
      {
        "resources": [
          {
            "type": "docs",
            "url": "https://support.google.com/websearch/answer/2466433",
            "description": "Advanced search",
            "title": "Google Search Tips"
          },
          {
            "url": "https://stackoverflow.com/help/searching",
            "type": "docs",
            "description": "Effective searching",
            "title": "How to Search Stack Overflow"
          }
        ],
        "mentorExplanation": "Searching is a skill! Include framework names in searches ('React useState not updating'). Look for recent answers. Read multiple solutions to understand patterns.",
        "label": "I frequently get stuck and need help. I can sometimes find relevant information but struggle with search keywords.",
        "scoreWeight": 0.2,
        "recommendations": [
          "Learn effective Google search techniques",
          "Practice reading Stack Overflow answers",
          "Study how to isolate problems",
          "Build vocabulary of technical terms"
        ],
        "value": "research2"
      },
      {
        "mentorExplanation": "You're getting closer! Use the debugger to step through code and see exactly where behavior diverges from expectations. This narrows problems from 'somewhere in this feature' to 'this specific line'.",
        "label": "I get blocked regularly but can usually find something relevant. I can identify the general area but not the specific issue.",
        "resources": [
          {
            "url": "https://developer.chrome.com/docs/devtools/javascript/",
            "type": "docs",
            "description": "Using breakpoints",
            "title": "Chrome DevTools Debugging"
          },
          {
            "title": "The Art of Googling",
            "url": "https://www.freecodecamp.org/news/how-to-google-like-a-pro-10-tips-for-effective-googling/",
            "type": "article",
            "description": "Search strategies"
          }
        ],
        "recommendations": [
          "Practice systematic debugging",
          "Learn to use debugger breakpoints",
          "Study your project's architecture",
          "Improve search query formulation"
        ],
        "value": "research3",
        "scoreWeight": 0.3
      },
      {
        "resources": [
          {
            "url": "https://www.theodinproject.com/lessons/foundations-javascript-developer-tools",
            "type": "article",
            "description": "Systematic debugging",
            "title": "Debugging Guide"
          }
        ],
        "label": "I sometimes get blocked but can usually identify the problem area. I find relevant solutions with some trial and error.",
        "mentorExplanation": "Solid progress! Form hypotheses about causes, then test them. Keep a log of what you tried and what happened. Pattern recognition develops with practice - you'll start seeing familiar issues.",
        "scoreWeight": 0.4,
        "value": "research4",
        "recommendations": [
          "Study debugging methodologies",
          "Learn to read source code of libraries",
          "Practice hypothesis-driven debugging",
          "Build mental models of your tech stack"
        ]
      },
      {
        "scoreWeight": 0.5,
        "recommendations": [
          "Search official documentation first",
          "Learn advanced debugging techniques",
          "Study common problem patterns",
          "Practice reading stack traces deeply"
        ],
        "value": "research5",
        "resources": [
          {
            "title": "MDN JavaScript Guide",
            "description": "Deep reference",
            "type": "docs",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          }
        ],
        "mentorExplanation": "Strong intermediate! Go deeper - understand why solutions work, not just that they work. Read documentation and source code when Stack Overflow isn't enough. Build confidence in unfamiliar territory.",
        "label": "I can usually identify problem areas and find solutions independently. I use effective keywords most of the time."
      },
      {
        "resources": [
          {
            "url": "https://developer.chrome.com/docs/devtools/performance/",
            "type": "docs",
            "description": "Chrome performance tools",
            "title": "Performance Profiling"
          },
          {
            "title": "GitHub Issue Search",
            "type": "docs",
            "url": "https://docs.github.com/en/search-github/searching-on-github/searching-issues-and-pull-requests",
            "description": "Finding known issues"
          }
        ],
        "label": "I efficiently identify specific problem areas and find solutions quickly. I know what to search for and where to look.",
        "mentorExplanation": "Advanced capability! You've built strong research skills. Start helping others - answer Stack Overflow questions, write blog posts about tricky bugs you solved. Teaching reinforces your knowledge.",
        "scoreWeight": 0.6,
        "recommendations": [
          "Contribute answers to help others",
          "Study advanced debugging tools",
          "Learn performance profiling",
          "Read GitHub issues of libraries you use"
        ],
        "value": "research6"
      },
      {
        "scoreWeight": 0.7,
        "value": "research7",
        "recommendations": [
          "Solve problems not documented online",
          "Contribute to documentation if you have the capacity",
          "Build debugging utilities so you can reuse them in the future",
          "Help others with problem-solving if possible"
        ],
        "resources": [
          {
            "description": "Documentation best practices",
            "type": "docs",
            "url": "https://www.writethedocs.org/guide/",
            "title": "Writing Technical Docs"
          },
          {
            "url": "https://chromedevtools.github.io/devtools-protocol/",
            "type": "docs",
            "description": "Create debugging tools",
            "title": "Building Dev Tools"
          }
        ],
        "mentorExplanation": "Excellent! You go beyond Stack Overflow to primary sources. Share your expertise - write debugging guides, create tools, establish team practices. Your skills help everyone solve problems faster.",
        "label": "I quickly pinpoint problems and find solutions even for complex issues. I search official docs, source code, and GitHub issues effectively."
      },
      {
        "scoreWeight": 0.8,
        "value": "research8",
        "recommendations": [
          "Document novel problems and solutions",
          "You could try to lead some debugging workshops",
          "Establish team debugging standards"
        ],
        "resources": [
          {
            "type": "github",
            "url": "https://github.com/tc39/proposals",
            "description": "JavaScript specifications",
            "title": "TC39 Proposals"
          },
          {
            "title": "Web Platform Tests",
            "description": "Browser standards",
            "url": "https://web-platform-tests.org/",
            "type": "docs"
          }
        ],
        "mentorExplanation": "Senior/expert level! You solve problems few others can. Create resources - runbooks for common issues, debugging playbooks, search strategies. Your approach to problems is a team asset.",
        "label": "I excel at identifying root causes quickly. I solve problems without existing online solutions by reading specs and source code."
      },
      {
        "value": "research9",
        "recommendations": [
          "Contribute to language/framework specifications",
          "Publish research on debugging techniques",
          "Develop new debugging methodologies - it's always a good feeling to have one that you personally developed"
        ],
        "scoreWeight": 0.9,
        "label": "I have mastery-level problem identification skills. I solve deep technical issues by understanding specifications and implementations.",
        "mentorExplanation": "Outstanding! You identify problems that require spec-level understanding. Share widely - blog posts, conference talks, open source contributions. Influence how the community approaches problems.",
        "resources": [
          {
            "title": "ECMA-262 Spec",
            "description": "JavaScript specification",
            "type": "docs",
            "url": "https://tc39.es/ecma262/"
          },
          {
            "title": "W3C Standards",
            "description": "Web standards",
            "url": "https://www.w3.org/standards/",
            "type": "docs"
          }
        ]
      },
      {
        "mentorExplanation": "Exceptional! You solve problems at the edges of what's possible. Your work defines how problems are approached industry-wide. Focus on maximum leverage - tools, standards, education that help millions.",
        "label": "I have world-class expertise in problem identification and research. I solve problems that require contributing to specifications or tools.",
        "resources": [
          {
            "description": "JavaScript engine development",
            "url": "https://v8.dev/docs",
            "type": "docs",
            "title": "V8 Development"
          },
          {
            "title": "Chromium Development",
            "url": "https://www.chromium.org/developers/",
            "type": "docs",
            "description": "Browser development"
          }
        ],
        "value": "research10",
        "recommendations": [
          "Contribute to browser/language development",
          "Write about definitive debugging guides"
        ],
        "scoreWeight": 1
      }
    ],
    "followUpQuestion": "",
    "type": "multiple-choice",
    "category": "Problem Solving & Debugging"
  },
  {
    "id": "e02865f4-995d-4b11-ad57-1cca8afddf06",
    "options": [
      {
        "mentorExplanation": "Avoiding estimates leaves your team and stakeholders unable to plan! Estimation IS hard, but it's a skill you can develop. Start small: break work into tasks under 2 hours. Estimate those. Track actual vs estimate. Over time you'll develop calibration. The goal isn't perfection - it's a reasonable range with stated assumptions.",
        "label": "I avoid giving estimates - I never know how long things take",
        "resources": [
          {
            "title": "Evidence-Based Scheduling",
            "url": "https://www.joelonsoftware.com/2007/10/26/evidence-based-scheduling/",
            "type": "article"
          }
        ],
        "recommendations": [
          "Learn estimation techniques",
          "Practice breaking tasks into small pieces",
          "Track your actual time vs estimates"
        ],
        "value": "avoid",
        "scoreWeight": 0.15
      },
      {
        "scoreWeight": 0.32,
        "recommendations": [
          "Add buffer for unknowns",
          "Learn about Hofstadter's Law",
          "Track estimates vs actuals"
        ],
        "value": "optimistic",
        "isCommonMistake": true,
        "resources": [
          {
            "type": "article",
            "url": "https://en.wikipedia.org/wiki/Hofstadter%27s_law",
            "title": "Hofstadter's Law"
          }
        ],
        "mentorExplanation": "Optimism bias in estimation is extremely common! We estimate in ideal conditions but work in reality (meetings, blockers, unclear requirements). Apply a multiplier: if you think it's 2 days, estimate 3-4. Track your actuals for a month - most developers discover they underestimate by 2-3x consistently.",
        "label": "I give estimates but consistently underestimate"
      },
      {
        "scoreWeight": 0.6,
        "value": "decent",
        "recommendations": [
          "Learn story point techniques",
          "Practice risk-adjusted estimation",
          "Study scope management"
        ],
        "resources": [
          {
            "title": "Risk-Adjusted Estimation",
            "url": "https://www.youtube.com/watch?v=uFfNYlLJjPM",
            "type": "video"
          }
        ],
        "isCorrect": true,
        "label": "I give reasonable estimates and communicate when scope changes",
        "mentorExplanation": "Good estimation and communication about scope changes is valuable! Most problems come from silent scope creep. Your habit of flagging changes early is exactly right. Next: get better at identifying hidden complexity before it bites you."
      },
      {
        "scoreWeight": 0.8,
        "recommendations": [
          "Mentor teammates on estimation",
          "Establish estimation processes",
          "Use data to improve team forecasting"
        ],
        "value": "skilled",
        "resources": [
          {
            "title": "Shape Up (Basecamp Method)",
            "description": "Free book on project scoping",
            "url": "https://basecamp.com/shapeup",
            "type": "book"
          },
          {
            "title": "Probabilistic Forecasting",
            "url": "https://www.youtube.com/watch?v=aBLtMsDKe7Y",
            "type": "video"
          },
          {
            "url": "https://scrumguides.org/scrum-guide.html",
            "type": "docs",
            "title": "Team Estimation"
          }
        ],
        "isCorrect": true,
        "label": "I decompose work accurately, identify risks early, and adjust plans proactively",
        "mentorExplanation": "Excellent! Risk identification before you start is the hallmark of experience. Your ability to say 'This looks like 3 days but there are 2 unknowns that could make it a week' is incredibly valuable. Share this skill - help your team estimate better."
      },
      {
        "resources": [
          {
            "title": "Kanban Metrics",
            "url": "https://www.actionableagile.com/",
            "type": "docs"
          }
        ],
        "mentorExplanation": "You're an expert at predictable delivery! Organizational shipping reliability is one of the highest-value skills. Your combination of technical understanding and planning expertise makes you a force multiplier for the entire engineering organization.",
        "label": "I lead project planning and help the organization ship predictably",
        "isCorrect": true,
        "scoreWeight": 1,
        "value": "expert",
        "recommendations": [
          "Build forecasting models from team data",
          "Establish definition of ready/done",
          "Create planning playbooks"
        ]
      }
    ],
    "allowOther": true,
    "category": "Communication",
    "type": "multiple-choice",
    "title": "How do you approach estimating technical work and managing scope?",
    "hint": "Accurate estimation and scope management are critical professional skills often overlooked in technical training"
  },
  {
    "id": "e0d51655-1cb4-43f2-85d2-edc1bac181a2",
    "category": "Learning & Growth",
    "type": "checkbox",
    "followUpQuestion": "",
    "allowOther": true,
    "options": [
      {
        "scoreWeight": 0.2,
        "recommendations": [
          "Share your projects publicly so others can learn from your work and give feedback.",
          "Try new technologies in small experiments before using them in bigger projects.",
          "Focus on building projects that solve real, practical problems instead of only learning exercises."
        ],
        "value": "practice",
        "resources": [
          {
            "type": "github",
            "url": "https://github.com/florinpop17/app-ideas",
            "title": "Project Ideas"
          },
          {
            "url": "https://www.indiehackers.com/group/build-in-public",
            "type": "article",
            "title": "Build in Public"
          }
        ],
        "mentorExplanation": "Side projects let you experiment without consequences. Try risky things, fail fast, learn what works. Building in public adds accountability and networking. Your side project might become your next job.",
        "label": "Build side projects"
      },
      {
        "recommendations": [
          "Start by reading documentation before jumping into implementation.",
          "Try fixing small bugs or issues in tools you already use to understand them better.",
          "Build a portfolio of projects to show your skills and track your progress."
        ],
        "value": "opensource",
        "scoreWeight": 0.25,
        "mentorExplanation": "Open source shows you production codebases and gets you feedback from experienced developers. Start small - docs, typos, good-first-issues. Even small PRs build confidence and reputation.",
        "label": "Contribute to open source",
        "resources": [
          {
            "type": "github",
            "url": "https://github.com/firstcontributions/first-contributions",
            "title": "First Contributions"
          },
          {
            "url": "https://opensource.guide/",
            "type": "docs",
            "title": "Open Source Guide"
          }
        ]
      },
      {
        "resources": [
          {
            "type": "docs",
            "url": "https://developer.mozilla.org/",
            "title": "MDN Web Docs"
          },
          {
            "type": "github",
            "url": "https://github.com/tc39/proposals",
            "description": "JavaScript proposals",
            "title": "TC39 Proposals"
          },
          {
            "type": "docs",
            "url": "https://www.ietf.org/standards/rfcs/",
            "title": "IETF RFCs"
          }
        ],
        "label": "Read official documentation and RFCs",
        "mentorExplanation": "Docs are the source of truth everyone skips. Reading them catches nuances blog posts miss. RFCs show you where technology is heading before it ships. Make this a habit.",
        "scoreWeight": 0.2,
        "recommendations": [
          "Read changelogs to stay updated on what is new or changed in the tools you use.",
          "Focus on understanding the core concepts before learning advanced features.",
          "Contribute to documentation to improve clarity for others and reinforce your own understanding."
        ],
        "value": "documentation"
      },
      {
        "resources": [
          {
            "title": "Meetup.com",
            "type": "article",
            "url": "https://www.meetup.com/"
          },
          {
            "type": "docs",
            "url": "https://speaking.io/",
            "title": "Conference Talk Ideas"
          }
        ],
        "label": "Attend conferences or meetups - online or onsite",
        "mentorExplanation": "Conferences expose you to new ideas and people working on different problems. The hallway track (conversations between talks) is often more valuable than the talks. Virtual events count too.",
        "scoreWeight": 0.2,
        "value": "conferences",
        "recommendations": [
          "Connect with other developers to learn different ways of solving problems.",
          "Speak at local meetups to practice explaining your work and ideas.",
          "Share what you learn with your team so everyone can grow together."
        ]
      },
      {
        "value": "books",
        "recommendations": [
          "Read classics and new releases",
          "Discuss with reading groups",
          "Apply concepts immediately"
        ],
        "scoreWeight": 0.18,
        "label": "Read programming and software engineering books",
        "mentorExplanation": "Books go deeper than articles. Classic books (Clean Code, Pragmatic Programmer) stay relevant for decades. Take notes, highlight, discuss with others. One good book beats a hundred blog posts.",
        "resources": [
          {
            "url": "https://github.com/mr-mig/every-programmer-should-know",
            "type": "github",
            "title": "Developer Reading List"
          }
        ]
      },
      {
        "resources": [
          {
            "title": "Developer Blog List",
            "type": "github",
            "url": "https://github.com/kilimchoi/engineering-blogs"
          },
          {
            "type": "article",
            "url": "https://dev.to/",
            "title": "Dev.to Community"
          }
        ],
        "mentorExplanation": "Blogs keep you current on trends and techniques. Don't just consume - take notes, try examples, share what resonates. Build a curated list of quality sources; most content is noise.",
        "label": "Read tech blogs and articles regularly",
        "scoreWeight": 0.15,
        "value": "blogs",
        "recommendations": [
          "Create a curated reading list",
          "Share interesting articles with team"
        ]
      },
      {
        "label": "Pair program or mob code with colleagues",
        "mentorExplanation": "Pairing transfers knowledge faster than any other method. You absorb techniques unconsciously by watching someone work. It's also the best way to learn a new codebase or technology quickly.",
        "resources": [
          {
            "title": "Pair Programming Guide",
            "url": "https://www.martinfowler.com/articles/on-pair-programming.html",
            "type": "article"
          }
        ],
        "value": "pair-learning",
        "recommendations": [
          "Set up regular pair programming sessions to learn from others and share knowledge.",
          "Take a few minutes after each session to reflect on what you learned and what can be improved."
        ],
        "scoreWeight": 0.22
      },
      {
        "resources": [
          {
            "title": "freeCodeCamp",
            "type": "course",
            "url": "https://www.freecodecamp.org/"
          }
        ],
        "mentorExplanation": "Courses structure your learning and fill knowledge gaps. The key is finishing what you start and building something with it. Passive watching teaches less than active doing.",
        "label": "Take online courses",
        "scoreWeight": 0.18,
        "recommendations": [
          "Finish course projects to practice what you learn in a structured way.",
          "Apply course concepts to real work tasks to reinforce your understanding.",
          "Use a mix of free and paid courses to get different perspectives and learning depth."
        ],
        "value": "courses"
      },
      {
        "resources": [
          {
            "title": "Fireship",
            "url": "https://www.youtube.com/@Fireship",
            "type": "video"
          },
          {
            "url": "https://www.youtube.com/@TraversyMedia",
            "type": "video",
            "title": "Traversy Media"
          },
          {
            "title": "The Primeagen",
            "type": "video",
            "url": "https://www.youtube.com/@ThePrimeagen"
          }
        ],
        "mentorExplanation": "Videos work for visual learning, but watch actively - pause, try things, build along. Speed up playback to 1.5-2x and take notes. Don't just collect videos to watch later; actually watch them.",
        "label": "Watch technical videos and tutorials",
        "scoreWeight": 0.15,
        "value": "youtube",
        "recommendations": [
          "Follow trusted learning channels to stay consistent with quality content.",
          "Build projects while following tutorials to practice hands-on skills.",
          "Take clear notes so you can review and reuse what you learn later."
        ]
      },
      {
        "label": "Subscribe to tech newsletters",
        "mentorExplanation": "Newsletters deliver curated content without the social media noise. But don't just hoard them - read and act. Unsubscribe from ones you skip consistently. Quality over quantity.",
        "resources": [
          {
            "title": "JavaScript Weekly",
            "url": "https://javascriptweekly.com/",
            "type": "article"
          },
          {
            "type": "article",
            "url": "https://nodeweekly.com/",
            "title": "Node Weekly"
          }
        ],
        "recommendations": [
          "Curate your subscriptions",
          "Archive and review weekly",
          "Share interesting finds"
        ],
        "value": "newsletters",
        "scoreWeight": 0.13
      },
      {
        "resources": [
          {
            "type": "article",
            "url": "https://paperswithcode.com/",
            "title": "Papers With Code"
          },
          {
            "title": "The Morning Paper",
            "description": "CS paper summaries",
            "url": "https://blog.acolyer.org/",
            "type": "article"
          }
        ],
        "mentorExplanation": "Papers contain bleeding-edge ideas before they hit blogs. Start with classics - MapReduce, Dynamo, Attention Is All You Need. Papers With Code links papers to implementations, making them practical.",
        "label": "Read academic papers and research",
        "scoreWeight": 0.23,
        "value": "research-papers",
        "recommendations": [
          "Use Papers With Code for practical papers",
          "Join paper reading groups",
          "Implement algorithms from papers"
        ]
      },
      {
        "resources": [
          {
            "type": "article",
            "url": "https://softwareengineeringdaily.com/",
            "title": "Software Engineering Daily"
          },
          {
            "url": "https://syntax.fm/",
            "type": "article",
            "title": "Syntax.fm"
          },
          {
            "type": "article",
            "url": "https://javascriptjabber.com/",
            "title": "JavaScript Jabber"
          }
        ],
        "label": "Listen to tech podcasts",
        "mentorExplanation": "Podcasts fill dead time - commutes, workouts, chores. But listen actively; take notes on interesting points and follow up. Passive listening is entertainment, not learning.",
        "scoreWeight": 0.12,
        "recommendations": [
          "Take notes on key insights",
          "Explore topics mentioned",
          "Share episodes with team"
        ],
        "value": "podcasts"
      },
      {
        "mentorExplanation": "Social media can be noisy but following the right people gives industry pulse. Engage, don't just lurk - comment, share, discuss. Build relationships, not just follower counts.",
        "label": "Follow developers and tech leaders on social media",
        "resources": [
          {
            "title": "Engage on LinkedIn",
            "type": "article",
            "url": "https://www.linkedin.com/"
          }
        ],
        "value": "twitter",
        "recommendations": [
          "Engage in discussions",
          "Share your insights",
          "Build your network"
        ],
        "scoreWeight": 0.12
      },
      {
        "recommendations": [
          "Subscribe to tech newsletters",
          "Join developer communities",
          "Start small - follow 3-5 good sources"
        ],
        "value": "none",
        "scoreWeight": 0,
        "mentorExplanation": "Tech moves fast. Not learning means falling behind. Start small: pick ONE thing from this list. Even 15 minutes daily compounds over time. What you learned a year ago is already outdated in some areas.",
        "label": "I don't actively follow trends",
        "resources": [
          {
            "title": "Developer Communities",
            "type": "article",
            "url": "https://dev.to/"
          }
        ]
      }
    ],
    "title": "How do you stay current with industry trends and best practices? (Select all that apply)",
    "hint": "The best developers continuously learn through multiple channels"
  },
  {
    "id": "e1051181-51ed-455a-80ba-a45cf62bf63e",
    "title": "How would you describe your ability to solve technical problems and apply your knowledge in frontend development?",
    "hint": "Consider: solving problems without exact examples, explaining how things work, frequency of getting stuck, ability to adapt solutions",
    "type": "multiple-choice",
    "category": "Technical Knowledge & Understanding",
    "options": [
      {
        "recommendations": [
          "Start with tutorial projects to build foundational understanding",
          "Practice explaining code out loud",
          "Break down existing code to understand how each part works",
          "Join beginner-friendly coding communities"
        ],
        "value": "level1",
        "scoreWeight": 0.1,
        "mentorExplanation": "You're at the beginning - focus on understanding fundamentals. When you copy code, understand each line. Keep a learning journal. Don't be discouraged - getting stuck is part of learning.",
        "label": "I need very similar examples to solve problems and get stuck very often. I struggle to explain how things work.",
        "resources": [
          {
            "title": "freeCodeCamp",
            "description": "Structured learning path",
            "type": "course",
            "url": "https://www.freecodecamp.org/"
          },
          {
            "title": "MDN Learn",
            "description": "Beginner documentation",
            "url": "https://developer.mozilla.org/en-US/docs/Learn",
            "type": "docs"
          }
        ]
      },
      {
        "scoreWeight": 0.2,
        "value": "level2",
        "recommendations": [
          "Modify tutorial code with variations",
          "Try solving before searching",
          "Read documentation regularly"
        ],
        "resources": [
          {
            "title": "Frontend Mentor",
            "description": "Real-world projects",
            "type": "course",
            "url": "https://www.frontendmentor.io/"
          }
        ],
        "label": "I can follow tutorials but struggle when slightly different. I get stuck often and search frequently.",
        "mentorExplanation": "You're making progress! Focus on WHY solutions work. Take time to understand each part. Build a personal knowledge base."
      },
      {
        "recommendations": [
          "Challenge yourself to solve before searching",
          "Deep dive into framework documentation",
          "Practice explaining code"
        ],
        "value": "level3",
        "scoreWeight": 0.3,
        "mentorExplanation": "Good progress! Before searching, spend 15-20 minutes trying approaches. Read library source code. Focus on understanding tradeoffs.",
        "label": "I adapt examples to my situation but need external references regularly. I get stuck moderately often.",
        "resources": [
          {
            "title": "Patterns.dev",
            "url": "https://www.patterns.dev/",
            "type": "docs",
            "description": "Modern web patterns"
          }
        ]
      },
      {
        "recommendations": [
          "Learn advanced features of the frameworks you use to understand how they work under the hood.",
          "Build more complex personal projects to practice handling real-world challenges and system design.",
          "Try solving the same problem in different ways to understand tradeoffs and improve your thinking."
        ],
        "value": "level4",
        "scoreWeight": 0.4,
        "mentorExplanation": "Intermediate territory! Focus on WHY things work. Study tool internals. Read about performance and security.",
        "label": "I solve simpler tasks alone but need references for complex problems. I understand basics but not all details.",
        "resources": [
          {
            "url": "https://epicreact.dev/",
            "type": "course",
            "description": "Advanced React",
            "title": "Epic React"
          }
        ]
      },
      {
        "label": "I handle most standard tasks independently. I understand how things work but occasionally need documentation.",
        "mentorExplanation": "Solidly intermediate! Expand impact and deepen expertise. Think architecture, not just implementation.",
        "resources": [
          {
            "description": "Design fundamentals",
            "type": "github",
            "url": "https://github.com/donnemartin/system-design-primer",
            "title": "System Design Primer"
          }
        ],
        "recommendations": [
          "Try solving tasks on your own before checking documentation.",
          "Learn how key parts of the system work so you can figure things out more easily.",
          "Understand how your work fits into the bigger system to handle harder tasks with more confidence."
        ],
        "value": "level5",
        "scoreWeight": 0.5
      },
      {
        "scoreWeight": 0.6,
        "value": "level6",
        "recommendations": [
          "Keep documenting edge cases so they become easier for the whole team to handle.",
          "Share your explanations of how systems work to help others learn and align.",
          "Focus on improving how you prevent edge-case issues during design, not just fixing them later."
        ],
        "resources": [
          {
            "description": "Web performance",
            "type": "book",
            "url": "https://hpbn.co/",
            "title": "High Performance Browser Networking"
          }
        ],
        "mentorExplanation": "Strong intermediate to advanced! Focus on breadth and leadership. Share knowledge. Study performance and accessibility.",
        "label": "I solve complex problems independently and explain how tech works. Rarely stuck except on specific edge cases."
      },
      {
        "label": "Deep understanding, architect complex solutions. Understand not just how but why. Getting stuck is rare.",
        "mentorExplanation": "Advanced level! You understand 'why' behind decisions. Focus on impact and leadership. Study large-scale systems.",
        "resources": [],
        "recommendations": [
          "Share your architectural reasoning so others understand the “why,” not just the solution.",
          "Keep validating your designs with real system constraints like scale, cost, and performance.",
          "Help raise team capability by mentoring others on how to think through complex system design."
        ],
        "value": "level7",
        "scoreWeight": 0.7
      },
      {
        "recommendations": [
          "Lead architectural decisions by making sure choices are clear, well explained, and agreed on by the team.",
          "Evaluate new technologies by testing them in real use cases before adopting them widely.",
          "Try to suggest or build tools and frameworks that are simple, well documented, and easy for the team to use."
        ],
        "value": "level8",
        "scoreWeight": 0.8,
        "label": "I solve almost any problem independently with full understanding. I design robust solutions with edge cases.",
        "mentorExplanation": "Senior/expert level! Focus on strategic impact. Build teams that scale. Influence stack decisions.",
        "resources": [
          {
            "description": "Technical leadership",
            "type": "book",
            "url": "https://www.oreilly.com/library/view/the-managers-path/9781491973882/",
            "title": "The Manager's Path"
          }
        ]
      },
      {
        "recommendations": [
          "Share your solutions and thinking so others can learn and reuse your approaches.",
          "Focus on making your innovations practical and easy for the team to adopt.",
          "Keep challenging yourself with new or unfamiliar problems to continue growing."
        ],
        "value": "level9",
        "scoreWeight": 0.9,
        "label": "I have strong expertise and often create new solutions. I rarely face problems I cannot solve.",
        "mentorExplanation": "Outstanding mastery! You define best practices. Extend impact beyond code - shape standards, influence frameworks.",
        "resources": []
      },
      {
        "value": "level10",
        "recommendations": [
          "Focus on making your solutions practical so they can be used by real teams.",
          "Share your work clearly so others can understand and reuse it.",
          "Keep testing your ideas in real projects to make sure they create real value."
        ],
        "scoreWeight": 1,
        "mentorExplanation": "Exceptional! You create technology. Focus on legacy - problems that benefit millions. Create frameworks, write books, teach.",
        "label": "I have expert knowledge across the stack. I build new solutions and help improve how software is built.",
        "resources": [
          {
            "title": "TC39",
            "url": "https://tc39.es/",
            "type": "docs",
            "description": "JavaScript specification"
          }
        ]
      }
    ],
    "followUpQuestion": ""
  },
  {
    "id": "fc3566aa-9b66-406c-bae1-bb84427a0dbe",
    "title": "How often do you participate in code reviews?",
    "hint": "Quality code reviews are about learning together, not just catching bugs",
    "category": "Collaboration",
    "type": "multiple-choice",
    "allowOther": true,
    "options": [
      {
        "mentorExplanation": "Regular reviews mean you're seeing how the codebase evolves, not just your corner of it. Use reviews to teach - when you explain why something matters, that's mentoring. The comments you leave shape how people code.",
        "label": "Regularly as part of my workflow",
        "isCorrect": true,
        "resources": [
          {
            "type": "article",
            "url": "https://blog.pragmaticengineer.com/good-code-reviews-better-code-reviews/",
            "title": "Mentoring Through Code Reviews"
          },
          {
            "url": "https://www.kevinlondon.com/2015/05/05/code-review-best-practices.html",
            "type": "article",
            "title": "Code Review Standards"
          }
        ],
        "recommendations": [
          "Mentor juniors through code reviews",
          "Establish review standards",
          "Share patterns you see"
        ],
        "value": "regularly",
        "scoreWeight": 0.68
      },
      {
        "scoreWeight": 0.28,
        "isCommonMistake": true,
        "recommendations": [
          "Learn what to look for in code reviews",
          "Practice giving constructive feedback",
          "Take time to understand context"
        ],
        "value": "passive",
        "resources": [
          {
            "title": "Code Review Checklist",
            "type": "github",
            "url": "https://github.com/mgreiler/code-review-checklist"
          },
          {
            "title": "Giving Constructive Feedback",
            "url": "https://mtlynch.io/human-code-reviews-1/",
            "type": "article"
          }
        ],
        "label": "I review code but mostly approve without deep analysis",
        "mentorExplanation": "Rubber-stamping reviews is worse than not reviewing - it gives false confidence. Actually pull the code and run it. Ask questions when you don't understand. It's fine to say 'I need more time to review this properly' instead of a quick LGTM."
      },
      {
        "label": "I lead code review processes and set standards for the team",
        "isCorrect": true,
        "mentorExplanation": "When you set the review culture, you're shaping how the whole team thinks about quality. Good review standards mean everyone gets better, not just individuals. Keep making it a learning experience, not a gate to pass through.",
        "resources": [
          {
            "url": "https://github.com/thoughtbot/guides/tree/main/code-review",
            "type": "github",
            "title": "Review Process Guide"
          }
        ],
        "recommendations": [
          "Create comprehensive guidelines",
          "Train team on effective reviews",
          "Measure and improve review metrics"
        ],
        "value": "lead",
        "scoreWeight": 1
      },
      {
        "value": "rarely",
        "recommendations": [
          "Start reviewing pull requests regularly",
          "Learn code review best practices",
          "Ask to be added as a reviewer"
        ],
        "scoreWeight": 0.15,
        "mentorExplanation": "You're missing one of the best learning opportunities - seeing how experienced developers write code and think through problems. Volunteer to review; you don't have to be an expert to ask good questions. That's how you learn.",
        "label": "Rarely or never",
        "resources": [
          {
            "title": "Code Review Best Practices",
            "description": "Google's code review guide",
            "type": "docs",
            "url": "https://google.github.io/eng-practices/review/"
          },
          {
            "title": "How to Review Code",
            "url": "https://www.freecodecamp.org/news/code-review-tips/",
            "type": "article"
          },
          {
            "type": "video",
            "url": "https://www.youtube.com/watch?v=a9_0UUUNt-Y",
            "title": "Effective Code Reviews"
          }
        ]
      },
      {
        "recommendations": [
          "Document common patterns",
          "Create team review guidelines",
          "Host code review workshops"
        ],
        "value": "proactive",
        "scoreWeight": 0.83,
        "isCorrect": true,
        "label": "I actively seek out PRs to review and provide detailed feedback",
        "mentorExplanation": "Proactive reviewing means you care about the codebase, not just your part of it. The detailed feedback you give makes everyone better. Consider documenting the patterns you see repeatedly - that becomes team knowledge, not just review comments.",
        "resources": [
          {
            "title": "Advanced Code Review",
            "url": "https://www.youtube.com/watch?v=PJjmw9TRB7s",
            "type": "video"
          },
          {
            "type": "docs",
            "url": "https://github.com/features/code-review/",
            "title": "Team Code Review Process"
          }
        ]
      },
      {
        "scoreWeight": 0.42,
        "value": "sometimes",
        "recommendations": [
          "Volunteer for more code reviews",
          "Review across different areas",
          "Provide constructive feedback"
        ],
        "resources": [
          {
            "title": "Thoughtful Code Reviews",
            "type": "article",
            "url": "https://testing.googleblog.com/2017/06/code-health-too-many-comments-on-your.html"
          }
        ],
        "mentorExplanation": "Occasional reviews are better than none, but you're reactive instead of proactive. Make it a habit - review something every day or two. You stay connected to what's changing and build better working relationships with teammates.",
        "label": "Occasionally when asked"
      }
    ]
  },
  {
    "id": uuidv4(),
    "type": "multiple-choice",
    "category": "Data Structures & Algorithms",
    "title": "How comfortable are you with analyzing and optimizing algorithm complexity?",
    "hint": "Understanding Big-O helps you write efficient code and avoid performance bottlenecks",
    "allowOther": true,
    "followUpQuestion": "",
    "options": [
      {
        "value": "struggle",
        "label": "I'm not familiar with algorithm complexity analysis",
        "scoreWeight": 0.15,
        "mentorExplanation": "Algorithm complexity might sound intimidating, but it's really about understanding how your code scales. When you write a loop, does it run 10 times or 10,000 times? That's the question Big-O answers. Start by recognizing patterns: one loop is O(n), nested loops are O(n²). This awareness will make you a better developer.",
        "recommendations": [
          "Start with Big-O basics - learn to recognize O(1), O(n), and O(n²) patterns in your code",
          "Practice identifying the complexity of simple loops and functions you write daily",
          "When your code feels slow, count how many times loops run with different input sizes",
          "Watch beginner-friendly videos that explain complexity with visual examples"
        ],
        "resources": [
          {
            "title": "Big-O Cheat Sheet",
            "url": "https://www.bigocheatsheet.com/",
            "type": "docs",
            "description": "Visual reference for common algorithm complexities"
          },
          {
            "title": "Introduction to Big O Notation",
            "url": "https://www.freecodecamp.org/news/big-o-notation-why-it-matters-and-why-it-doesnt-1674cfa8a23c/",
            "type": "article",
            "description": "Beginner-friendly explanation with practical examples"
          },
          {
            "title": "Big-O Notation in 100 Seconds",
            "url": "https://www.youtube.com/watch?v=g2o22C3CRfU",
            "type": "video",
            "description": "Quick visual introduction to algorithm complexity"
          }
        ]
      },
      {
        "value": "basic",
        "label": "I've heard of Big-O but don't actively consider it",
        "scoreWeight": 0.35,
        "mentorExplanation": "You know Big-O exists, but it's not part of your daily thinking yet. Start making it a habit: before writing a loop, ask 'how many times will this run?' If you're looping through an array inside another loop, that's O(n²) - fine for small data, slow for large datasets. Awareness is the first step to writing faster code.",
        "recommendations": [
          "Before writing nested loops, estimate how many iterations will run with 100, 1000, or 10000 items",
          "When code reviews mention performance, look up the Big-O complexity being discussed",
          "Practice analyzing one function per week - count loops and identify the dominant operation",
          "Keep a mental note: array.find() in a loop might be O(n²), consider using a Map instead"
        ],
        "resources": [
          {
            "title": "A Coffee-break Introduction to Time Complexity",
            "url": "https://www.freecodecamp.org/news/time-complexity-of-algorithms/",
            "type": "article",
            "description": "Practical guide with real code examples"
          },
          {
            "title": "Big O Notation - Full Course",
            "url": "https://www.youtube.com/watch?v=Mo4vesaut8g",
            "type": "video",
            "description": "Comprehensive introduction with visual demonstrations"
          },
          {
            "title": "JavaScript Algorithms and Data Structures",
            "url": "https://github.com/trekhleb/javascript-algorithms",
            "type": "github",
            "description": "See complexity analysis on real algorithms"
          }
        ]
      },
      {
        "value": "competent",
        "label": "I understand basic complexity (O(n), O(n²)) and can spot inefficient code",
        "scoreWeight": 0.6,
        "isCorrect": true,
        "mentorExplanation": "Good foundation! You can identify obvious inefficiencies. Now level up: learn when O(n log n) sorting beats O(n²), understand hash table lookups are O(1), and recognize that 'it depends on the data structure' is often the right answer. Real optimization comes from choosing the right data structure, not just writing faster loops.",
        "recommendations": [
          "Learn the complexity of built-in methods - array.sort() is O(n log n), array.includes() is O(n)",
          "Practice refactoring O(n²) code to O(n) using hash maps or sets for lookups",
          "When reviewing code, identify the bottleneck - the part that runs most often or with largest data",
          "Study common data structures: hash maps for O(1) lookups, heaps for O(log n) min/max operations"
        ],
        "resources": [
          {
            "title": "Data Structures Easy to Advanced",
            "url": "https://www.youtube.com/watch?v=RBSGKlAvoiM",
            "type": "video",
            "description": "Full course on data structures with complexity analysis"
          },
          {
            "title": "Complexity Analysis Reference",
            "url": "https://www.interviewcake.com/article/python/big-o-notation-time-and-space-complexity",
            "type": "article",
            "description": "Practical guide to analyzing time and space complexity"
          },
          {
            "title": "Algorithms Visualized",
            "url": "https://visualgo.net/",
            "type": "docs",
            "description": "Interactive visualizations of algorithms and their complexity"
          }
        ]
      },
      {
        "value": "strong",
        "label": "I can identify Big-O complexity and optimize critical paths",
        "scoreWeight": 0.8,
        "isCorrect": true,
        "mentorExplanation": "You're proactive about performance. You know when to optimize and when to keep code simple. The next level is space-time trade-offs: using more memory for faster execution, or vice versa. Also consider average vs worst-case complexity - a hash table is O(1) average but O(n) worst-case. Production code needs both perspectives.",
        "recommendations": [
          "Profile production code to find actual bottlenecks - intuition can be wrong about what's slow",
          "Document complexity in code reviews for critical paths so others understand the trade-offs",
          "Learn amortized analysis - some O(n) operations are fine if they happen rarely",
          "Mentor others on complexity - teaching solidifies your understanding and spreads best practices"
        ],
        "resources": [
          {
            "title": "Algorithm Design Manual",
            "url": "https://www.algorist.com/",
            "type": "book",
            "description": "Classic reference for algorithm analysis and optimization"
          },
          {
            "title": "Performance Optimization Techniques",
            "url": "https://web.dev/fast/",
            "type": "docs",
            "description": "Web performance optimization with complexity considerations"
          },
          {
            "title": "Chrome DevTools Performance",
            "url": "https://developer.chrome.com/docs/devtools/performance/",
            "type": "docs",
            "description": "Profile and optimize runtime performance"
          }
        ]
      },
      {
        "value": "expert",
        "label": "I analyze complexity for production systems and can balance trade-offs",
        "scoreWeight": 0.95,
        "isCorrect": true,
        "mentorExplanation": "You understand that real-world performance is more than Big-O. Cache locality, database indexes, network latency - all matter. You make architectural decisions based on expected data size and access patterns. You know when premature optimization is bad and when ignoring performance is worse. This is senior-level thinking - share it widely.",
        "recommendations": [
          "Write technical blog posts about performance decisions - why you chose one approach over another",
          "Establish performance budgets and monitoring for critical paths in your systems",
          "Review system architecture for complexity bottlenecks - sometimes the algorithm is fine but the architecture isn't",
          "Teach others to think in terms of trade-offs, not absolutes - help build a performance-aware culture"
        ],
        "resources": [
          {
            "title": "Designing Data-Intensive Applications",
            "url": "https://dataintensive.net/",
            "type": "book",
            "description": "Deep dive into distributed systems performance and scalability"
          },
          {
            "title": "System Design Primer",
            "url": "https://github.com/donnemartin/system-design-primer",
            "type": "github",
            "description": "Learn to design large-scale systems with performance in mind"
          },
          {
            "title": "High Performance Browser Networking",
            "url": "https://hpbn.co/",
            "type": "book",
            "description": "Understanding network performance and optimization"
          }
        ]
      }
    ]
  },
  {
    "id": uuidv4(),
    "type": "multiple-choice",
    "category": "Precision & Attention to Detail",
    "title": "How do you handle and incorporate code review feedback?",
    "hint": "Code review is a learning opportunity, not criticism. How you respond shows growth mindset.",
    "allowOther": true,
    "followUpQuestion": "",
    "options": [
      {
        "value": "struggle",
        "label": "I sometimes miss or forget review comments",
        "scoreWeight": 0.15,
        "mentorExplanation": "It's easy to feel overwhelmed by code review feedback, especially when there's a lot of it. The key is treating reviews as a checklist, not a judgment. Go through each comment methodically - address it, mark it resolved, or ask for clarification if you don't understand. Missing comments frustrates reviewers and delays your work. Build a simple system to track them.",
        "recommendations": [
          "Create a checklist from review comments before starting fixes - check off each one as you address it",
          "Use GitHub's 'resolve conversation' feature only after actually implementing the feedback",
          "If you don't understand a comment, reply immediately asking for clarification rather than guessing",
          "Set aside focused time to address all feedback at once instead of doing it piecemeal"
        ],
        "resources": [
          {
            "title": "How to Handle Code Review Feedback",
            "url": "https://www.freecodecamp.org/news/code-review-tips/",
            "type": "article",
            "description": "Practical guide to receiving and acting on feedback"
          },
          {
            "title": "The Art of Receiving Feedback",
            "url": "https://www.youtube.com/watch?v=FQNbaKkYk_Q",
            "type": "video",
            "description": "How to receive feedback constructively"
          },
          {
            "title": "Code Review Checklist",
            "url": "https://github.com/mgreiler/code-review-checklist",
            "type": "github",
            "description": "Common review points to check before submitting"
          }
        ]
      },
      {
        "value": "basic",
        "label": "I address all feedback but sometimes need clarification",
        "scoreWeight": 0.35,
        "mentorExplanation": "Asking for clarification is good - it shows you care about getting it right! The growth opportunity is learning to anticipate feedback before you get it. Start reviewing your own code as if you're a reviewer: Is this function too long? Are variable names clear? Is there error handling? The better your self-review, the less back-and-forth in reviews.",
        "recommendations": [
          "Before requesting review, do a self-review - read your code with fresh eyes and fix obvious issues",
          "Keep a personal list of feedback patterns you receive often and proactively fix those in future PRs",
          "When you need clarification, suggest a specific approach in your question to show you're thinking it through",
          "After addressing feedback, add a comment explaining your changes so reviewers can verify easily"
        ],
        "resources": [
          {
            "title": "Google's Code Review Developer Guide",
            "url": "https://google.github.io/eng-practices/review/developer/",
            "type": "docs",
            "description": "How to handle reviews from a developer's perspective"
          },
          {
            "title": "Self Code Review Checklist",
            "url": "https://blog.codacy.com/self-code-review-checklist/",
            "type": "article",
            "description": "What to check before requesting review"
          },
          {
            "title": "Effective Pull Requests",
            "url": "https://www.atlassian.com/blog/git/written-unwritten-guide-pull-requests",
            "type": "article",
            "description": "How to make PRs easier to review"
          }
        ]
      },
      {
        "value": "competent",
        "label": "I proactively address feedback and learn from patterns",
        "scoreWeight": 0.6,
        "isCorrect": true,
        "mentorExplanation": "You're turning feedback into learning! When you see the same suggestion repeatedly, you internalize it and stop making that mistake. This is how you level up. The next step is engaging in discussion when you disagree respectfully - sometimes your approach is valid, and explaining your reasoning helps both you and the reviewer learn.",
        "recommendations": [
          "Keep a running doc of common feedback you've received - review it before starting new work",
          "When you disagree with feedback, explain your reasoning thoughtfully - 'I chose X because Y' - to start a productive discussion",
          "Look for patterns in your mistakes - if you often forget error handling, make it part of your pre-review checklist",
          "Thank reviewers for catching issues - it builds positive relationships and encourages thorough reviews"
        ],
        "resources": [
          {
            "title": "Thoughtful Code Review",
            "url": "https://testing.googleblog.com/2019/11/code-health-respectful-reviews-useful.html",
            "type": "article",
            "description": "Google's guide to respectful and constructive code reviews"
          },
          {
            "title": "How to Make Your Code Reviewer Fall in Love",
            "url": "https://mtlynch.io/code-review-love/",
            "type": "article",
            "description": "Practical tips for better code reviews"
          },
          {
            "title": "Unlearning Toxic Behaviors in Code Review",
            "url": "https://medium.com/@sandya.sankarram/unlearning-toxic-behaviors-in-a-code-review-culture-b7c295452a3c",
            "type": "article",
            "description": "Building healthy review culture"
          }
        ]
      },
      {
        "value": "strong",
        "label": "I anticipate feedback, pre-emptively address issues, and engage in constructive discussion",
        "scoreWeight": 0.8,
        "isCorrect": true,
        "mentorExplanation": "You've internalized good practices to the point where your first draft already addresses most feedback. When discussions arise, you engage thoughtfully - sometimes accepting feedback, sometimes explaining valid alternatives. This is mature collaboration. Your next level is helping others develop this same approach through mentoring or documenting standards.",
        "recommendations": [
          "Document your self-review process so others can learn from your approach",
          "When you see junior developers struggling with feedback, offer to pair with them on addressing it",
          "Suggest team-wide patterns or linting rules for feedback that comes up repeatedly across the team",
          "Write thoughtful PR descriptions that pre-emptively explain decisions reviewers might question"
        ],
        "resources": [
          {
            "title": "The Art of Giving and Receiving Code Reviews",
            "url": "https://www.alexandra-hill.com/2018/06/25/the-art-of-giving-and-receiving-code-reviews/",
            "type": "article",
            "description": "Advanced collaboration through code review"
          },
          {
            "title": "Building Effective Code Review Culture",
            "url": "https://www.youtube.com/watch?v=PJjmw9TRB7s",
            "type": "video",
            "description": "Creating team standards and positive review culture"
          },
          {
            "title": "Engineering Practices Documentation",
            "url": "https://google.github.io/eng-practices/",
            "type": "docs",
            "description": "Google's comprehensive engineering practices"
          }
        ]
      },
      {
        "value": "expert",
        "label": "I conduct thorough self-review and mentor others on review best practices",
        "scoreWeight": 0.95,
        "isCorrect": true,
        "mentorExplanation": "You're not just receiving feedback well - you're raising the bar for the whole team. Your thorough self-review means reviewers spend time on architecture and design rather than catching bugs. Your mentoring spreads these practices. This is leadership. Keep documenting what works - your review philosophy becomes team culture.",
        "recommendations": [
          "Create team documentation about effective code review - both giving and receiving feedback",
          "Run workshops or lunch-and-learns on self-review techniques and how to engage with feedback constructively",
          "Establish review guidelines that balance thoroughness with velocity - help the team review efficiently",
          "Collect metrics on review quality and cycle time to continuously improve the process"
        ],
        "resources": [
          {
            "title": "Code Review Best Practices",
            "url": "https://google.github.io/eng-practices/review/",
            "type": "docs",
            "description": "Comprehensive guide from Google Engineering"
          },
          {
            "title": "Leading Without Authority",
            "url": "https://www.youtube.com/watch?v=NZR64EF3OpA",
            "type": "video",
            "description": "Influencing team culture through example"
          },
          {
            "title": "Building High-Performing Teams",
            "url": "https://rework.withgoogle.com/guides/understanding-team-effectiveness/",
            "type": "article",
            "description": "Google's research on team effectiveness"
          }
        ]
      }
    ]
  },
  {
    "id": uuidv4(),
    "type": "multiple-choice",
    "category": "Technical Knowledge & Understanding",
    "title": "How would you describe your ability to solve technical problems and apply your knowledge in backend development?",
    "hint": "Backend development involves APIs, databases, authentication, and server-side logic",
    "allowOther": true,
    "followUpQuestion": "",
    "options": [
      {
        "value": "struggle",
        "label": "I'm still learning backend fundamentals",
        "scoreWeight": 0.15,
        "mentorExplanation": "Backend development can feel abstract at first - you can't 'see' what's happening like with frontend. Start by understanding the request-response cycle: a client sends a request, your server processes it, and sends back a response. Build a simple REST API that handles GET and POST requests. Once you see data flowing, everything else (authentication, databases, etc.) builds on that foundation.",
        "recommendations": [
          "Build a simple REST API with Express or Flask - start with 3-4 endpoints for a todo app or similar",
          "Learn to test your API with Postman or curl before connecting a frontend",
          "Understand HTTP methods (GET, POST, PUT, DELETE) and status codes (200, 404, 500)",
          "Set up a basic database and practice CRUD operations - create, read, update, delete"
        ],
        "resources": [
          {
            "title": "Node.js Crash Course",
            "url": "https://www.youtube.com/watch?v=fBNz5xF-Kx4",
            "type": "video",
            "description": "Build your first Node.js/Express API in 90 minutes"
          },
          {
            "title": "REST API Tutorial",
            "url": "https://www.restapitutorial.com/",
            "type": "docs",
            "description": "Learn REST API concepts with examples"
          },
          {
            "title": "The Odin Project - Backend Path",
            "url": "https://www.theodinproject.com/paths/full-stack-javascript",
            "type": "course",
            "description": "Free comprehensive backend course"
          }
        ]
      },
      {
        "value": "basic",
        "label": "I can build basic APIs and database queries",
        "scoreWeight": 0.35,
        "mentorExplanation": "You can get data in and out - that's the foundation! Now level up by thinking about what happens when things go wrong. What if the database is slow? What if a user sends bad data? What if 1000 requests hit at once? Backend is about handling the unexpected. Add error handling, input validation, and basic logging to your APIs.",
        "recommendations": [
          "Add proper error handling to your APIs - return meaningful error messages and status codes",
          "Learn input validation - never trust client data, always validate before processing",
          "Implement basic authentication - understand JWTs or session-based auth at a practical level",
          "Practice writing database queries efficiently - learn about indexes and avoid N+1 query problems"
        ],
        "resources": [
          {
            "title": "Node.js Best Practices",
            "url": "https://github.com/goldbergyoni/nodebestpractices",
            "type": "github",
            "description": "100+ backend best practices with examples"
          },
          {
            "title": "REST API Design Best Practices",
            "url": "https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/",
            "type": "article",
            "description": "How to design clean, maintainable APIs"
          },
          {
            "title": "SQL for Developers",
            "url": "https://www.youtube.com/watch?v=HXV3zeQKqGY",
            "type": "video",
            "description": "SQL fundamentals and best practices"
          }
        ]
      },
      {
        "value": "competent",
        "label": "I design scalable services and understand distributed systems concepts",
        "scoreWeight": 0.6,
        "isCorrect": true,
        "mentorExplanation": "You're thinking beyond single-server applications. Understanding distributed systems - load balancing, caching, message queues - shows architectural maturity. The next challenge is operationalizing this knowledge: monitoring, logging, graceful degradation. When your service is deployed, how do you know it's healthy? How do you debug issues in production?",
        "recommendations": [
          "Implement structured logging and monitoring - logs should tell a story when debugging production issues",
          "Learn to use caching strategically - Redis for session data, CDN for static assets, database query caching",
          "Practice writing idempotent APIs - operations that can safely be retried without causing problems",
          "Understand database transactions and when to use them - consistency matters in distributed systems"
        ],
        "resources": [
          {
            "title": "Designing Data-Intensive Applications",
            "url": "https://dataintensive.net/",
            "type": "book",
            "description": "The definitive guide to distributed systems design"
          },
          {
            "title": "System Design Primer",
            "url": "https://github.com/donnemartin/system-design-primer",
            "type": "github",
            "description": "Learn to design large-scale systems"
          },
          {
            "title": "Web Architecture 101",
            "url": "https://medium.com/storyblocks-engineering/web-architecture-101-a3224e126947",
            "type": "article",
            "description": "Components of modern web applications"
          }
        ]
      },
      {
        "value": "strong",
        "label": "I architect microservices, optimize performance, and handle production issues",
        "scoreWeight": 0.8,
        "isCorrect": true,
        "mentorExplanation": "You're comfortable with production systems and their complexities. You know that microservices bring both power and complexity - service boundaries, network calls, distributed transactions. The expertise level is about knowing trade-offs: when to use microservices vs monolith, SQL vs NoSQL, synchronous vs asynchronous. Share this decision-making process with others.",
        "recommendations": [
          "Document architectural decisions - write ADRs (Architecture Decision Records) explaining why you chose an approach",
          "Build observability into systems from the start - metrics, traces, and logs should tell the complete story",
          "Practice chaos engineering on non-critical systems - intentionally break things to see how they fail",
          "Mentor others on production debugging - teach them how to read logs, traces, and metrics effectively"
        ],
        "resources": [
          {
            "title": "Microservices Patterns",
            "url": "https://microservices.io/patterns/index.html",
            "type": "docs",
            "description": "Catalog of microservice architecture patterns"
          },
          {
            "title": "Site Reliability Engineering",
            "url": "https://sre.google/books/",
            "type": "book",
            "description": "Google's approach to production systems (free book)"
          },
          {
            "title": "High Scalability Blog",
            "url": "http://highscalability.com/",
            "type": "article",
            "description": "Real-world architecture case studies"
          }
        ]
      },
      {
        "value": "expert",
        "label": "I design system architecture and mentor on backend best practices",
        "scoreWeight": 0.95,
        "isCorrect": true,
        "mentorExplanation": "You make architectural decisions that affect the entire organization. You understand that technology choices are business decisions - they impact cost, scalability, hiring, and time-to-market. Your expertise is valuable not just in code, but in teaching others to think systematically about backend architecture. Document your decision-making process - it becomes organizational knowledge.",
        "recommendations": [
          "Write technical blog posts or internal docs about architectural patterns and when to use them",
          "Establish engineering standards and practices - create runbooks, playbooks, and decision frameworks",
          "Run architecture review sessions where the team discusses and learns from design decisions",
          "Stay current with backend trends but evaluate them critically - not every new technology solves real problems"
        ],
        "resources": [
          {
            "title": "Staff Engineer: Leadership Beyond the Management Track",
            "url": "https://staffeng.com/book",
            "type": "book",
            "description": "Technical leadership and architecture"
          },
          {
            "title": "The Architecture of Open Source Applications",
            "url": "https://aosabook.org/",
            "type": "book",
            "description": "Learn from real-world system designs (free)"
          },
          {
            "title": "InfoQ - Architecture & Design",
            "url": "https://www.infoq.com/architecture-design/",
            "type": "article",
            "description": "Current trends and case studies in architecture"
          }
        ]
      }
    ]
  },
  {
    "id": uuidv4(),
    "type": "multiple-choice",
    "category": "Collaboration",
    "title": "How comfortable are you providing constructive feedback to teammates?",
    "hint": "Giving feedback well is a skill - it helps your team improve and builds trust",
    "allowOther": true,
    "followUpQuestion": "",
    "options": [
      {
        "value": "struggle",
        "label": "I avoid giving critical feedback",
        "scoreWeight": 0.15,
        "mentorExplanation": "Avoiding feedback might feel polite, but it actually deprives your teammates of growth opportunities. Feedback isn't about being critical - it's about helping someone improve. Start small: in code reviews, point out one thing that could be better and explain why. Use 'I' language: 'I found this function hard to understand' instead of 'This is confusing.' Focus on the code, not the person.",
        "recommendations": [
          "Start with code review comments - they're written and asynchronous, which is less intimidating than face-to-face",
          "Use the 'feedback sandwich' initially: mention something good, suggest one improvement, end positive",
          "Focus feedback on specific, actionable changes - not vague statements like 'this could be better'",
          "Remember that withholding feedback prevents growth - your teammates want to improve"
        ],
        "resources": [
          {
            "title": "How to Give Constructive Feedback",
            "url": "https://www.youtube.com/watch?v=wtl5UrrgU8c",
            "type": "video",
            "description": "Practical guide to giving feedback effectively"
          },
          {
            "title": "Radical Candor",
            "url": "https://www.radicalcandor.com/",
            "type": "article",
            "description": "Framework for caring personally while challenging directly"
          },
          {
            "title": "Giving Better Code Review Feedback",
            "url": "https://mtlynch.io/human-code-reviews-1/",
            "type": "article",
            "description": "How to review code like a human"
          }
        ]
      },
      {
        "value": "basic",
        "label": "I provide feedback when asked",
        "scoreWeight": 0.35,
        "mentorExplanation": "Giving feedback when asked is good - you're responsive! The next level is being proactive. When you see something that could be improved, speak up (kindly). Waiting to be asked means issues linger longer. The key is delivery: 'I noticed X, have you considered Y?' rather than 'You're doing X wrong.' Make it collaborative, not critical.",
        "recommendations": [
          "Practice giving unsolicited but constructive feedback once a week - start with small, easy-to-fix issues",
          "When you notice a problem, suggest a specific solution rather than just pointing out what's wrong",
          "Learn to read social cues - some people want detailed feedback, others want high-level guidance",
          "Balance critical feedback with positive observations - notice what people do well too"
        ],
        "resources": [
          {
            "title": "The Art of Feedback",
            "url": "https://larahogan.me/blog/feedback-equation/",
            "type": "article",
            "description": "Framework for delivering effective feedback"
          },
          {
            "title": "Thanks for the Feedback",
            "url": "https://www.penguinrandomhouse.com/books/313485/thanks-for-the-feedback-by-douglas-stone-and-sheila-heen/",
            "type": "book",
            "description": "Science and art of receiving and giving feedback"
          },
          {
            "title": "Code Review Best Practices",
            "url": "https://google.github.io/eng-practices/review/reviewer/",
            "type": "docs",
            "description": "Google's guide to reviewing code"
          }
        ]
      },
      {
        "value": "competent",
        "label": "I proactively give actionable, respectful feedback",
        "scoreWeight": 0.6,
        "isCorrect": true,
        "mentorExplanation": "You've found the balance: being direct while staying respectful. Your feedback is specific and actionable, not vague criticism. The next challenge is difficult conversations - giving feedback when emotions are high, or when someone is defensive. This requires even more skill: acknowledging their perspective, staying calm, focusing on impact rather than intent.",
        "recommendations": [
          "Prepare for difficult feedback conversations - write down key points and practice framing them constructively",
          "Learn the SBI model: describe the Situation, the Behavior you observed, and the Impact it had",
          "When someone gets defensive, acknowledge their feelings before continuing the conversation",
          "Follow up after giving feedback - check in a week later to see how they're doing with the changes"
        ],
        "resources": [
          {
            "title": "Crucial Conversations",
            "url": "https://www.vitalsmarts.com/crucial-conversations-book/",
            "type": "book",
            "description": "Tools for talking when stakes are high"
          },
          {
            "title": "Radical Candor - The Full Picture",
            "url": "https://www.youtube.com/watch?v=yj9GLeNCgm4",
            "type": "video",
            "description": "How to care personally and challenge directly"
          },
          {
            "title": "The Feedback Fallacy",
            "url": "https://hbr.org/2019/03/the-feedback-fallacy",
            "type": "article",
            "description": "Rethinking how we give feedback (Harvard Business Review)"
          }
        ]
      },
      {
        "value": "strong",
        "label": "I excel at difficult conversations and help others grow",
        "scoreWeight": 0.8,
        "isCorrect": true,
        "mentorExplanation": "You handle emotionally charged conversations with skill. You know how to deliver hard feedback in a way that maintains relationships and motivates change. This is rare and valuable. Your next level is building systems: helping your team create a culture where feedback flows naturally in all directions, not just top-down. Teach others these skills.",
        "recommendations": [
          "Create opportunities for peer feedback - regular retrospectives, 360 reviews, or feedback sessions",
          "Model receiving feedback well - show the team that you actively seek and value their input",
          "Document feedback frameworks that work for your team - make good practices repeatable",
          "Mentor others specifically on giving difficult feedback - share your approach and thinking"
        ],
        "resources": [
          {
            "title": "Building a Feedback Culture",
            "url": "https://hbr.org/2021/05/building-a-feedback-rich-culture",
            "type": "article",
            "description": "Creating organizational feedback systems"
          },
          {
            "title": "Difficult Conversations",
            "url": "https://www.youtube.com/watch?v=KMZnN3IEpFI",
            "type": "video",
            "description": "How to discuss what matters most"
          },
          {
            "title": "The Culture Code",
            "url": "https://danielcoyle.com/the-culture-code/",
            "type": "book",
            "description": "Secrets of highly successful groups"
          }
        ]
      },
      {
        "value": "expert",
        "label": "I establish feedback culture and train others on giving feedback",
        "scoreWeight": 0.95,
        "isCorrect": true,
        "mentorExplanation": "You're shaping how the entire team communicates. You've built systems where feedback is normal, expected, and valued - not feared. You train others to give feedback well, which multiplies your impact. This is leadership at its best. Keep sharing what works: the frameworks, the language, the mindsets that make feedback constructive rather than destructive.",
        "recommendations": [
          "Run regular workshops on feedback skills - make it part of onboarding and ongoing development",
          "Establish team norms around feedback - when, how, and in what format feedback should be given",
          "Collect data on feedback effectiveness - are people improving? Are relationships stronger?",
          "Share your feedback philosophy externally - write blog posts, give talks, help the broader community"
        ],
        "resources": [
          {
            "title": "An Everyone Culture",
            "url": "https://www.ddorganizations.com/book",
            "type": "book",
            "description": "Building deliberately developmental organizations"
          },
          {
            "title": "Kim Scott on Radical Candor",
            "url": "https://www.youtube.com/watch?v=4yODalLQ2lM",
            "type": "video",
            "description": "Full framework for building feedback culture"
          },
          {
            "title": "Project Aristotle - Psychological Safety",
            "url": "https://rework.withgoogle.com/print/guides/5721312655835136/",
            "type": "article",
            "description": "Google's research on team effectiveness and feedback"
          }
        ]
      }
    ]
  },
  {
    "id": uuidv4(),
    "type": "multiple-choice",
    "category": "Precision & Attention to Detail",
    "title": "How do you ensure your code is production-ready?",
    "hint": "Production-ready means your code is tested, monitored, and handles failures gracefully",
    "allowOther": true,
    "followUpQuestion": "",
    "options": [
      {
        "value": "struggle",
        "label": "I fix issues after deployment",
        "scoreWeight": 0.15,
        "mentorExplanation": "Debugging in production is stressful and expensive. The goal is to catch issues before users see them. Start simple: test your changes locally before deploying. Click through the feature. Try edge cases. Does it work with empty data? With lots of data? With bad data? These 5 minutes of testing save hours of firefighting later.",
        "recommendations": [
          "Create a pre-deployment checklist: did I test it? Does it handle errors? Did I check the logs?",
          "Test your changes in a staging or development environment before production",
          "Learn to read application logs - they tell you what's breaking and why",
          "Add basic error handling - wrap risky operations in try/catch and log meaningful error messages"
        ],
        "resources": [
          {
            "title": "Testing Your Code",
            "url": "https://www.freecodecamp.org/news/testing-react-hooks/",
            "type": "article",
            "description": "Introduction to testing principles"
          },
          {
            "title": "Error Handling Best Practices",
            "url": "https://www.joyent.com/node-js/production/design/errors",
            "type": "article",
            "description": "How to handle errors properly"
          },
          {
            "title": "Development Environments",
            "url": "https://www.youtube.com/watch?v=MJUJ4wbFm_A",
            "type": "video",
            "description": "Setting up dev, staging, and production"
          }
        ]
      },
      {
        "value": "basic",
        "label": "I test locally and follow the checklist",
        "scoreWeight": 0.35,
        "mentorExplanation": "Local testing and checklists are great foundations! The next step is thinking about what happens in production that doesn't happen locally. Production has real users, real data, concurrent requests, network issues. Start adding defensive programming: validate inputs, handle missing data gracefully, add logging to track what's happening.",
        "recommendations": [
          "Write automated tests for critical paths - don't rely on manual testing alone",
          "Practice defensive programming - validate all inputs and handle edge cases explicitly",
          "Add logging at key points so you can debug issues when they happen in production",
          "Learn about different types of tests: unit tests for logic, integration tests for workflows"
        ],
        "resources": [
          {
            "title": "Jest Testing Framework",
            "url": "https://jestjs.io/docs/getting-started",
            "type": "docs",
            "description": "Learn to write automated tests"
          },
          {
            "title": "Testing Best Practices",
            "url": "https://github.com/goldbergyoni/javascript-testing-best-practices",
            "type": "github",
            "description": "Comprehensive testing guide"
          },
          {
            "title": "Defensive Programming",
            "url": "https://en.wikipedia.org/wiki/Defensive_programming",
            "type": "article",
            "description": "Principles of robust code"
          }
        ]
      },
      {
        "value": "competent",
        "label": "I use staging environments, monitoring, and rollback plans",
        "scoreWeight": 0.6,
        "isCorrect": true,
        "mentorExplanation": "You're thinking about production safety systematically! Staging environments catch integration issues, monitoring shows when things break, rollback plans reduce downtime. The next level is proactive reliability: feature flags for gradual rollouts, automated alerts for anomalies, chaos testing to find weaknesses before users do.",
        "recommendations": [
          "Implement feature flags so you can enable features gradually and disable them if problems arise",
          "Set up automated alerts for errors and performance issues - don't wait for users to report problems",
          "Practice rollback procedures in staging so they're smooth under pressure",
          "Add health check endpoints to your services so monitoring tools can verify they're working"
        ],
        "resources": [
          {
            "title": "Feature Flags Best Practices",
            "url": "https://launchdarkly.com/blog/what-are-feature-flags/",
            "type": "article",
            "description": "Using feature flags effectively"
          },
          {
            "title": "Application Monitoring with Sentry",
            "url": "https://docs.sentry.io/",
            "type": "docs",
            "description": "Error tracking and monitoring"
          },
          {
            "title": "The Twelve-Factor App",
            "url": "https://12factor.net/",
            "type": "docs",
            "description": "Methodology for building production apps"
          }
        ]
      },
      {
        "value": "strong",
        "label": "I implement feature flags, canary deployments, and comprehensive observability",
        "scoreWeight": 0.8,
        "isCorrect": true,
        "mentorExplanation": "You've built production systems with mature reliability practices. Feature flags let you control blast radius, canary deployments catch issues early, observability shows exactly what's happening. The expert level is about continuous improvement: using production data to prevent issues, building resilience into the architecture itself, teaching others these practices.",
        "recommendations": [
          "Analyze production incidents to find patterns - turn each issue into a preventive measure",
          "Build circuit breakers and retry logic into your services - make them resilient to downstream failures",
          "Document your deployment and rollback procedures so the whole team can execute them confidently",
          "Practice chaos engineering - intentionally introduce failures to verify your systems can handle them"
        ],
        "resources": [
          {
            "title": "Site Reliability Engineering",
            "url": "https://sre.google/books/",
            "type": "book",
            "description": "Google's SRE book (free) - the definitive guide"
          },
          {
            "title": "Chaos Engineering",
            "url": "https://principlesofchaos.org/",
            "type": "docs",
            "description": "Building confidence in system behavior"
          },
          {
            "title": "Observability Engineering",
            "url": "https://www.honeycomb.io/what-is-observability",
            "type": "article",
            "description": "Understanding complex systems in production"
          }
        ]
      },
      {
        "value": "expert",
        "label": "I design zero-downtime deployments and disaster recovery systems",
        "scoreWeight": 0.95,
        "isCorrect": true,
        "mentorExplanation": "You're building systems that stay running even during deployments and failures. Zero-downtime deployments, automated failover, disaster recovery - this is what separates good systems from great ones. Your expertise is valuable not just in code, but in teaching others to think about reliability from the start. Document your approaches - they become organizational standards.",
        "recommendations": [
          "Write post-incident reviews for every outage - focus on process improvements, not blame",
          "Build runbooks for common scenarios - what to do when X breaks, how to verify Y is healthy",
          "Establish SLOs (Service Level Objectives) and error budgets - make reliability measurable",
          "Train the team on production operations - everyone should understand how to deploy and troubleshoot"
        ],
        "resources": [
          {
            "title": "Site Reliability Engineering Workbook",
            "url": "https://sre.google/workbook/table-of-contents/",
            "type": "book",
            "description": "Practical SRE implementation (free from Google)"
          },
          {
            "title": "Designing Data-Intensive Applications",
            "url": "https://dataintensive.net/",
            "type": "book",
            "description": "Building reliable, scalable systems"
          },
          {
            "title": "Database Reliability Engineering",
            "url": "https://www.oreilly.com/library/view/database-reliability-engineering/9781491925935/",
            "type": "book",
            "description": "Managing data systems in production"
          },
          {
            "title": "AWS Well-Architected Framework",
            "url": "https://aws.amazon.com/architecture/well-architected/",
            "type": "docs",
            "description": "Operational excellence and reliability patterns"
          }
        ]
      }
    ]
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