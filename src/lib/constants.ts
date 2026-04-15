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
    "id": "d058d558-5275-43da-9909-6b7e58387cdf",
    "title": "How would you rate your proficiency in your primary programming language(s)?",
    "category": "Technical Skills",
    "type": "scale",
    "min": 1,
    "max": 10,
    "hint": "Consider: syntax mastery, best practices, design patterns, advanced features"
  },
  {
    "id": "22665e92-a8b4-4308-b093-851cd0ac467f",
    "title": "Which technologies do you currently work with? (Select all that apply)",
    "category": "Technical Skills",
    "type": "tech-stack",
    "followUpQuestion": "How many years of experience do you have with each?",
    "hint": "Select the technologies you use regularly or have significant experience with",
    "allowOther": true,
    "options": [
      {
        "value": "react",
        "label": "React",
        "recommendations": [
          "Build a full-stack React application",
          "Master React hooks and performance optimization",
          "Learn state management patterns",
          "Practice component composition",
          "Optimize rendering performance",
          "Build accessible React apps"
        ],
        "scoreWeight": 0.8,
        "mentorExplanation": "React is incredibly powerful for building modern user interfaces! Here's the thing - React is actually pretty simple at its core (it's just JavaScript), but the ecosystem can feel overwhelming. Focus on mastering hooks first - useState, useEffect, and custom hooks will take you far. Then, understand how React renders and re-renders - this knowledge prevents performance issues. Remember: React is declarative, which means you describe what the UI should look like, and React figures out how to make it happen. This mindset shift is crucial! Build small projects to practice, then gradually tackle state management (Context, Redux, Zustand). The best way to learn React is by building - start with something simple like a todo app, then level up to something more complex.",
        "resources": [
          {
            "title": "Epic React by Kent C. Dodds",
            "url": "https://epicreact.dev",
            "type": "course",
            "description": "Comprehensive React course from beginner to advanced. Best structured learning path for React."
          },
          {
            "title": "React Official Docs",
            "url": "https://react.dev",
            "type": "docs",
            "description": "Completely revamped docs with interactive examples. Start here for fundamentals."
          },
          {
            "title": "Full Stack Open",
            "url": "https://fullstackopen.com/",
            "type": "course",
            "description": "Free university-level course covering React, Node.js, and full-stack development."
          },
          {
            "title": "React Patterns",
            "url": "https://www.patterns.dev/posts/reactjs/",
            "type": "article",
            "description": "Modern React patterns and best practices. Great for intermediate developers."
          },
          {
            "title": "JavaScript to Know for React",
            "url": "https://kentcdodds.com/blog/javascript-to-know-for-react",
            "type": "article",
            "description": "Essential JavaScript concepts before diving deep into React."
          }
        ]
      },
      {
        "value": "nodejs",
        "label": "Node.js",
        "recommendations": [
          "Create a REST API with Express",
          "Master async/await and the event loop",
          "Learn streams and buffers",
          "Build real-time applications",
          "Understand middleware patterns",
          "Optimize Node.js performance"
        ],
        "scoreWeight": 0.8,
        "mentorExplanation": "Node.js brings JavaScript to the backend, which is powerful because you can use one language across your entire stack! But here's what trips people up: Node.js is single-threaded with an event loop, which means it handles concurrency differently than languages like Java or Python. You need to understand async/await deeply - it's not just syntax, it's about thinking in asynchronous patterns. Learn about streams (they're super efficient for handling large data), middleware patterns (especially in Express), and error handling (unhandled promise rejections can crash your server!). Node.js shines for I/O-heavy operations like APIs and real-time apps. Start by building a REST API, then graduate to WebSockets or GraphQL. The ecosystem (npm) is massive - both a blessing and a curse. Choose packages wisely!",
        "resources": [
          {
            "title": "Node.js Design Patterns (3rd Edition)",
            "url": "https://www.nodejsdesignpatterns.com/",
            "type": "book",
            "description": "Deep dive into Node.js patterns, async programming, and best practices. Industry standard."
          },
          {
            "title": "Node.js Best Practices",
            "url": "https://github.com/goldbergyoni/nodebestpractices",
            "type": "github",
            "description": "Comprehensive collection of 100+ best practices. Updated regularly."
          },
          {
            "title": "Learn Node.js",
            "url": "https://nodejs.dev/learn",
            "type": "docs",
            "description": "Official learning resources with hands-on examples."
          },
          {
            "title": "Node.js: The Complete Guide",
            "url": "https://www.udemy.com/course/nodejs-the-complete-guide/",
            "type": "course",
            "description": "Comprehensive course covering APIs, authentication, and deployment."
          },
          {
            "title": "Stream Handbook",
            "url": "https://github.com/substack/stream-handbook",
            "type": "github",
            "description": "Essential guide to Node.js streams - crucial for efficient data handling."
          }
        ]
      },
      {
        "value": "typescript",
        "label": "TypeScript",
        "recommendations": [
          "Convert a JavaScript project to TypeScript",
          "Master advanced types and generics",
          "Learn utility types",
          "Understand type inference",
          "Practice type narrowing",
          "Build type-safe APIs"
        ],
        "scoreWeight": 0.9,
        "mentorExplanation": "TypeScript is a game-changer! At first it might feel like extra work, but once you experience catching bugs at compile time instead of runtime, you'll never want to go back. Here's my advice: start gradually. Don't try to make everything perfectly typed immediately - use 'any' sparingly at first, then tighten types as you learn. Focus on understanding type inference (TypeScript is smart - let it infer types when obvious), learn the utility types (Partial, Pick, Omit, etc. - they're incredibly useful), and practice type narrowing with type guards. The real power comes when you use generics - they let you write reusable, type-safe code. TypeScript isn't just about avoiding errors; it's about making your code self-documenting and enabling better autocomplete. This makes you faster! The investment pays off quickly.",
        "resources": [
          {
            "title": "Total TypeScript by Matt Pocock",
            "url": "https://www.totaltypescript.com/",
            "type": "course",
            "description": "Excellent interactive TypeScript course from beginner to advanced. Matt explains complex concepts clearly."
          },
          {
            "title": "TypeScript Handbook",
            "url": "https://www.typescriptlang.org/docs/handbook/intro.html",
            "type": "docs",
            "description": "Comprehensive official documentation. Best reference for TypeScript features."
          },
          {
            "title": "Type Challenges",
            "url": "https://github.com/type-challenges/type-challenges",
            "type": "github",
            "description": "Practice TypeScript types with challenges from easy to extreme. Learn by doing!"
          },
          {
            "title": "Effective TypeScript",
            "url": "https://effectivetypescript.com/",
            "type": "book",
            "description": "62 specific ways to improve your TypeScript. Great for intermediate developers."
          },
          {
            "title": "TypeScript Deep Dive",
            "url": "https://basarat.gitbook.io/typescript/",
            "type": "article",
            "description": "Free book covering TypeScript in depth. Excellent resource for understanding internals."
          },
          {
            "title": "React TypeScript Cheatsheet",
            "url": "https://react-typescript-cheatsheet.netlify.app/",
            "type": "docs",
            "description": "Essential patterns for using TypeScript with React. Community-maintained."
          }
        ]
      },
      {
        "value": "python",
        "label": "Python",
        "recommendations": [
          "Build a data processing pipeline",
          "Learn Pythonic idioms and best practices",
          "Master list comprehensions",
          "Understand decorators and context managers",
          "Learn async Python",
          "Build CLI tools"
        ],
        "scoreWeight": 0.8,
        "mentorExplanation": "Python is wonderfully versatile - you can build web apps, automate tasks, process data, or even do machine learning! The language emphasizes readability: 'code is read more often than it's written.' Focus on writing 'Pythonic' code - use list comprehensions, understand the Zen of Python ('import this'), leverage the amazing standard library (it has so much built-in!). Python's philosophy is 'there should be one obvious way to do it,' which is refreshing. Learn about decorators (they're powerful for adding functionality), context managers (the 'with' statement), and when you're ready, async/await in Python. The ecosystem is massive: Django/Flask for web, Pandas/NumPy for data, FastAPI for modern APIs. Start with the fundamentals, then specialize based on your interests. Python's gentle learning curve makes it great for beginners, but there's depth for experts too!",
        "resources": [
          {
            "title": "Fluent Python (2nd Edition)",
            "url": "https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/",
            "type": "book",
            "description": "The best book for writing Pythonic code. From intermediate to advanced. Must-read for serious Python developers!"
          },
          {
            "title": "Real Python",
            "url": "https://realpython.com/",
            "type": "article",
            "description": "High-quality Python tutorials on everything from basics to advanced topics. Excellent explanations and practical examples."
          },
          {
            "title": "Python Official Tutorial",
            "url": "https://docs.python.org/3/tutorial/",
            "type": "docs",
            "description": "Start here for fundamentals. Official docs are well-written and comprehensive."
          },
          {
            "title": "Automate the Boring Stuff",
            "url": "https://automatetheboringstuff.com/",
            "type": "book",
            "description": "Free book teaching Python through practical automation tasks. Perfect for beginners!"
          },
          {
            "title": "Python Design Patterns",
            "url": "https://python-patterns.guide/",
            "type": "article",
            "description": "Learn design patterns in Python context. From basic to advanced patterns with clear examples."
          }
        ]
      },
      {
        "value": "java",
        "label": "Java",
        "recommendations": [
          "Study design patterns in Java",
          "Build a Spring Boot application",
          "Master Java streams and lambdas",
          "Understand JVM internals",
          "Learn dependency injection",
          "Build microservices"
        ],
        "scoreWeight": 0.8,
        "mentorExplanation": "Java has staying power - it's been enterprise-grade for decades! Here's what makes Java valuable: strong OOP principles, robust type system, and massive ecosystem. Modern Java (8+) is quite different from old Java - lambdas, streams, and Optional make code much more expressive. The JVM is incredibly mature and performant. Spring Boot is basically the standard for Java backend development - learn it well! Focus on understanding dependency injection (core to Spring), learn the Streams API (powerful functional programming), and understand how the JVM works (garbage collection, memory management). Java's verbosity is decreasing with each version. The ecosystem is battle-tested - when you need a library, it exists and it's probably maintained. Java teaches discipline: explicit typing, proper OOP, design patterns. These principles transfer to other languages. Great for building scalable, maintainable systems!",
        "resources": [
          {
            "title": "Effective Java (3rd Edition)",
            "url": "https://www.oreilly.com/library/view/effective-java/9780134686097/",
            "type": "book",
            "description": "The definitive guide to Java best practices. Essential reading for every Java developer."
          },
          {
            "title": "Spring Boot Official Guides",
            "url": "https://spring.io/guides",
            "type": "docs",
            "description": "Official Spring Boot tutorials. Learn by building real applications step by step."
          },
          {
            "title": "Java Design Patterns",
            "url": "https://github.com/iluwatar/java-design-patterns",
            "type": "github",
            "description": "Comprehensive collection of design patterns implemented in Java. Over 200 patterns with explanations!"
          },
          {
            "title": "Java Programming Masterclass",
            "url": "https://www.udemy.com/course/java-the-complete-java-developer-course/",
            "type": "course",
            "description": "Comprehensive Java course from basics to advanced. Updated for modern Java versions."
          },
          {
            "title": "Baeldung",
            "url": "https://www.baeldung.com/",
            "type": "article",
            "description": "High-quality Java and Spring tutorials. Great for learning specific concepts with practical examples."
          }
        ]
      },
      {
        "value": "sql",
        "label": "SQL/Databases",
        "recommendations": [
          "Optimize database queries",
          "Design normalized schemas",
          "Learn indexing strategies",
          "Master JOINs and subqueries",
          "Understand transactions and ACID"
        ],
        "scoreWeight": 0.75,
        "mentorExplanation": "SQL is fundamental for data persistence and one of those skills that never goes out of style! Here's the thing: databases are more than just storage - they're the backbone of most applications. Start with understanding relational concepts: tables, relationships, normalization. Then master SQL queries - SELECT, JOIN, GROUP BY, subqueries. The real magic happens when you understand query optimization: indexes, execution plans, and query performance. Learn about ACID properties and transactions - crucial for data integrity. Different databases (PostgreSQL, MySQL, SQL Server) have quirks, but core SQL concepts transfer. NoSQL is popular, but don't skip SQL - it's still dominant in the industry. A developer who truly understands databases becomes invaluable. Your backend code is only as good as your database design!",
        "resources": [
          {
            "title": "SQL Performance Explained",
            "url": "https://sql-performance-explained.com/",
            "type": "book",
            "description": "Excellent book on database performance and indexing. Clear explanations of complex concepts."
          },
          {
            "title": "Use The Index, Luke",
            "url": "https://use-the-index-luke.com/",
            "type": "article",
            "description": "Free guide to database performance for developers. Practical and SQL-agnostic."
          },
          {
            "title": "PostgreSQL Tutorial",
            "url": "https://www.postgresqltutorial.com/",
            "type": "docs",
            "description": "Comprehensive PostgreSQL tutorials from basics to advanced. Well-structured."
          },
          {
            "title": "Mode SQL Tutorial",
            "url": "https://mode.com/sql-tutorial/",
            "type": "course",
            "description": "Interactive SQL tutorial with real data. Great for beginners and intermediate learners."
          },
          {
            "title": "Database Design Course",
            "url": "https://www.udemy.com/course/database-design/",
            "type": "course",
            "description": "Learn database design principles, normalization, and ER diagrams."
          }
        ]
      },
      {
        "value": "cloud",
        "label": "Cloud (AWS/Azure/GCP)",
        "recommendations": [
          "Get cloud certification",
          "Deploy production apps",
          "Master infrastructure as code",
          "Learn serverless architectures",
          "Understand cloud cost optimization",
          "Build multi-region deployments"
        ],
        "scoreWeight": 0.9,
        "mentorExplanation": "Cloud platforms are absolutely essential for modern deployment - this skill is highly valued! Here's my advice: start with one platform and go deep before branching out. AWS has the largest market share, Azure is strong in enterprise, GCP excels in data/ML. Focus on core services first: compute (EC2/VMs), storage (S3/Blob), databases, and networking. Then learn about managed services - they save so much time! Infrastructure as Code (Terraform, CloudFormation) is crucial - treating infrastructure like code is a game-changer. Understand the shared responsibility model and cloud security basics. Learn about serverless (Lambda/Functions) - it's changing how we build. Cost optimization is important - cloud bills can spiral! Certifications are valuable here - they provide structured learning paths. Cloud knowledge makes you incredibly employable and enables you to build scalable systems. The cloud is not just hosting - it's a completely different way of architecting applications!",
        "resources": [
          {
            "title": "AWS Certified Solutions Architect Path",
            "url": "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
            "type": "course",
            "description": "Official AWS certification. Excellent structured learning path covering core AWS services."
          },
          {
            "title": "A Cloud Guru",
            "url": "https://acloudguru.com/",
            "type": "course",
            "description": "Comprehensive cloud learning platform with hands-on labs for AWS, Azure, GCP."
          },
          {
            "title": "Cloud Architecture Patterns",
            "url": "https://learn.microsoft.com/en-us/azure/architecture/patterns/",
            "type": "docs",
            "description": "Microsoft's cloud design patterns. Applicable across all cloud providers."
          },
          {
            "title": "Terraform Tutorial",
            "url": "https://developer.hashicorp.com/terraform/tutorials",
            "type": "docs",
            "description": "Learn Infrastructure as Code with Terraform. Essential cloud skill."
          },
          {
            "title": "The Good Parts of AWS",
            "url": "https://dvassallo.gumroad.com/l/aws-good-parts",
            "type": "book",
            "description": "Practical guide focusing on the most useful AWS services. Cuts through the complexity."
          }
        ]
      },
      {
        "value": "docker",
        "label": "Docker/Kubernetes",
        "recommendations": [
          "Containerize applications",
          "Learn container orchestration",
          "Master Docker Compose",
          "Understand Kubernetes basics",
          "Learn deployment strategies",
          "Build CI/CD pipelines with containers"
        ],
        "scoreWeight": 0.85,
        "mentorExplanation": "Containers revolutionized software deployment - this is a must-have modern skill! Docker solves the 'works on my machine' problem by packaging your app with all its dependencies. Start by understanding what containers are (not VMs!), then learn Docker basics: images, containers, Dockerfile, volumes. Docker Compose is essential for multi-container apps - it's your local development powerhouse. Once you're comfortable with Docker, learn about container registries and image optimization (smaller images = faster deployments). Kubernetes is the next level - it orchestrates containers at scale. Start with basic concepts: pods, services, deployments. Don't rush into Kubernetes - get really comfortable with Docker first! Understanding containers makes you more DevOps-savvy and helps you build consistent, reproducible environments. Every modern development team uses containers - this skill is incredibly valuable!",
        "resources": [
          {
            "title": "Docker Deep Dive",
            "url": "https://www.amazon.com/Docker-Deep-Dive-Nigel-Poulton/dp/1521822808",
            "type": "book",
            "description": "Comprehensive Docker book from basics to advanced. Clear explanations and practical examples."
          },
          {
            "title": "Docker Official Tutorial",
            "url": "https://docs.docker.com/get-started/",
            "type": "docs",
            "description": "Start here for Docker fundamentals. Official docs with hands-on examples."
          },
          {
            "title": "Kubernetes Basics",
            "url": "https://kubernetes.io/docs/tutorials/kubernetes-basics/",
            "type": "docs",
            "description": "Official Kubernetes tutorial. Interactive learning with a real cluster."
          },
          {
            "title": "Docker Mastery Course",
            "url": "https://www.udemy.com/course/docker-mastery/",
            "type": "course",
            "description": "Popular comprehensive Docker and Kubernetes course. Highly rated with hands-on projects."
          },
          {
            "title": "Play with Docker",
            "url": "https://labs.play-with-docker.com/",
            "type": "docs",
            "description": "Free browser-based Docker environment. Practice without installing anything!"
          }
        ]
      },
      {
        "value": "vue",
        "label": "Vue.js",
        "recommendations": [
          "Build a Vue 3 application",
          "Master Composition API"
        ],
        "scoreWeight": 0.8,
        "mentorExplanation": "Vue is intuitive and powerful. The Composition API in Vue 3 brings it closer to React hooks while maintaining Vue's simplicity.",
        "resources": [
          {
            "title": "Vue.js Official Guide",
            "url": "https://vuejs.org/guide/introduction.html",
            "type": "docs"
          },
          {
            "title": "Vue 3 Composition API",
            "url": "https://vuejs.org/guide/extras/composition-api-faq.html",
            "type": "docs"
          }
        ]
      },
      {
        "value": "angular",
        "label": "Angular",
        "recommendations": [
          "Build an Angular app",
          "Master RxJS observables"
        ],
        "scoreWeight": 0.8,
        "mentorExplanation": "Angular is a complete framework with strong opinions. Excellent for large enterprise applications with complex requirements.",
        "resources": [
          {
            "title": "Angular Official Tutorial",
            "url": "https://angular.io/tutorial",
            "type": "docs"
          },
          {
            "title": "RxJS Documentation",
            "url": "https://rxjs.dev/guide/overview",
            "type": "docs"
          },
          {
            "title": "Angular University",
            "url": "https://angular-university.io/",
            "type": "course"
          }
        ]
      },
      {
        "value": "mongodb",
        "label": "MongoDB/NoSQL",
        "recommendations": [
          "Design NoSQL data models",
          "Learn aggregation pipelines"
        ],
        "scoreWeight": 0.75,
        "mentorExplanation": "NoSQL databases like MongoDB offer flexibility for certain use cases. Understanding when to use SQL vs NoSQL is a valuable skill.",
        "resources": [
          {
            "title": "MongoDB University",
            "url": "https://university.mongodb.com/",
            "type": "course"
          },
          {
            "title": "Data Model Design",
            "url": "https://www.mongodb.com/docs/manual/core/data-modeling-introduction/",
            "type": "docs"
          },
          {
            "title": "NoSQL Distilled",
            "url": "https://martinfowler.com/books/nosql.html",
            "type": "book"
          }
        ]
      },
      {
        "value": "graphql",
        "label": "GraphQL",
        "recommendations": [
          "Build a GraphQL API",
          "Master schema design"
        ],
        "scoreWeight": 0.85,
        "mentorExplanation": "GraphQL provides a flexible alternative to REST, particularly powerful for complex data requirements. It's gaining adoption rapidly!",
        "resources": [
          {
            "title": "Apollo GraphQL",
            "url": "https://www.apollographql.com/tutorials/",
            "type": "course"
          }
        ]
      },
      {
        "value": "react-native",
        "label": "React Native / Mobile",
        "recommendations": [
          "Build a cross-platform mobile app",
          "Master Expo workflow",
          "Understand native bridge concepts",
          "Learn mobile UX patterns",
          "Handle offline-first data"
        ],
        "scoreWeight": 0.82,
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
            "url": "https://reactnative.dev/docs/getting-started",
            "type": "docs",
            "description": "Official docs with guides and component reference."
          },
          {
            "title": "React Native Express",
            "url": "https://www.reactnativeexpress.com/",
            "type": "article",
            "description": "Concise interactive guide to React Native fundamentals."
          },
          {
            "title": "William Candillon YouTube",
            "url": "https://www.youtube.com/@wcandillon",
            "type": "video",
            "description": "Best resource for advanced React Native animations and Reanimated."
          },
          {
            "title": "React Navigation Docs",
            "url": "https://reactnavigation.org/docs/getting-started",
            "type": "docs",
            "description": "The standard navigation library for React Native apps."
          }
        ]
      },
      {
        "value": "nextjs",
        "label": "Next.js / Meta-frameworks",
        "recommendations": [
          "Master App Router and Server Components",
          "Understand SSR vs SSG vs ISR trade-offs",
          "Learn edge runtime patterns",
          "Optimize Core Web Vitals",
          "Build full-stack apps with server actions"
        ],
        "scoreWeight": 0.85,
        "mentorExplanation": "Next.js changed full-stack React development forever. Server Components are the biggest shift - they reduce client-side JavaScript dramatically. Understand rendering strategies: when to use SSR (dynamic, personalized), SSG (mostly-static content), ISR (revalidate on a schedule), and streaming. The App Router is powerful but has a learning curve - learn the file-system routing conventions early. Server Actions simplify data mutations without separate API routes. Master image optimization and font loading - they directly impact Core Web Vitals. Next.js is opinionated for good reason; trust the conventions.",
        "resources": [
          {
            "title": "Next.js Official Docs",
            "url": "https://nextjs.org/docs",
            "type": "docs",
            "description": "Outstanding docs with interactive examples. Covers App Router in depth."
          },
          {
            "title": "Next.js Learn Course",
            "url": "https://nextjs.org/learn",
            "type": "course",
            "description": "Free official interactive course. Build a real dashboard app step by step."
          },
          {
            "title": "Server Components Deep Dive",
            "url": "https://www.patterns.dev/posts/react-server-components/",
            "type": "article",
            "description": "Comprehensive look at React Server Components and the mental model shift."
          },
          {
            "title": "Theo (t3.gg) YouTube",
            "url": "https://www.youtube.com/@t3dotgg",
            "type": "video",
            "description": "Practical Next.js and full-stack patterns explained clearly."
          }
        ]
      },
      {
        "value": "rust",
        "label": "Rust / Systems Languages",
        "recommendations": [
          "Learn ownership and borrowing",
          "Build a CLI tool in Rust",
          "Understand memory safety guarantees",
          "Explore Rust for WebAssembly",
          "Compare with C++ trade-offs"
        ],
        "scoreWeight": 0.9,
        "mentorExplanation": "Rust is the most loved language for a reason - it gives you C-level performance with memory safety guarantees at compile time. The ownership system is the hardest part to learn, but once it clicks, it fundamentally changes how you think about memory in ALL languages. The borrow checker is your friend, not your enemy! Start with 'The Rust Book' (free, excellent). Build something small - a CLI tool is perfect. Rust is invaluable for performance-critical code, system tools, and WebAssembly. Even if you don't use Rust daily, learning it makes you a better developer in any language.",
        "resources": [
          {
            "title": "The Rust Programming Language",
            "url": "https://doc.rust-lang.org/book/",
            "type": "book",
            "description": "Free official book. Best way to learn Rust. Clear, thorough, and well-structured."
          },
          {
            "title": "Rustlings",
            "url": "https://github.com/rust-lang/rustlings",
            "type": "github",
            "description": "Small exercises to learn Rust. Interactive and hands-on."
          },
          {
            "title": "Rust by Example",
            "url": "https://doc.rust-lang.org/rust-by-example/",
            "type": "docs",
            "description": "Learn Rust through annotated examples."
          },
          {
            "title": "Zero To Production In Rust",
            "url": "https://www.zero2prod.com/",
            "type": "book",
            "description": "Building a production email newsletter in Rust. Excellent real-world project."
          }
        ]
      },
      {
        "value": "ml-ai",
        "label": "ML/AI (PyTorch, TensorFlow, LLM APIs)",
        "recommendations": [
          "Learn ML fundamentals and math basics",
          "Fine-tune a pre-trained model",
          "Build an LLM-powered application",
          "Study prompt engineering",
          "Understand RAG architectures"
        ],
        "scoreWeight": 0.88,
        "mentorExplanation": "AI/ML is reshaping software. You don't need to be a researcher to add AI to your projects - LLM APIs (OpenAI, Anthropic) let you build powerful features with a few API calls. Start there! Understand prompt engineering - it's the fastest way to get value. For ML fundamentals: learn linear algebra basics, understand gradient descent conceptually, then pick PyTorch (more pythonic, dominant in research). RAG (Retrieval Augmented Generation) is the most practical pattern for LLM apps right now. Learn embeddings and vector databases. The field moves incredibly fast - prioritize fundamentals over specific tools.",
        "resources": [
          {
            "title": "fast.ai Practical Deep Learning",
            "url": "https://course.fast.ai/",
            "type": "course",
            "description": "Top-down, code-first approach to deep learning. Free and excellent."
          },
          {
            "title": "Andrej Karpathy YouTube",
            "url": "https://www.youtube.com/@AndrejKarpathy",
            "type": "video",
            "description": "Deep neural network intuition from OpenAI's former director of AI."
          },
          {
            "title": "LangChain Docs",
            "url": "https://python.langchain.com/docs/get_started/introduction",
            "type": "docs",
            "description": "Build LLM-powered applications. Great practical starting point."
          },
          {
            "title": "Hugging Face Course",
            "url": "https://huggingface.co/learn/nlp-course/chapter1/1",
            "type": "course",
            "description": "Free NLP and transformer course. Learn fine-tuning and model deployment."
          },
          {
            "title": "ML Engineering Guide",
            "url": "https://www.mlebook.com/",
            "type": "book",
            "description": "Production ML systems from training to deployment."
          }
        ]
      },
      {
        "value": "go",
        "label": "Go (Golang)",
        "recommendations": [
          "Build microservices in Go",
          "Learn goroutines and channels",
          "Master the Go standard library",
          "Build CLI tools",
          "Understand Go interfaces"
        ],
        "scoreWeight": 0.83,
        "mentorExplanation": "Go is designed for simplicity and efficiency - perfect for backend services and cloud infrastructure! Its concurrency model with goroutines is incredibly elegant. Start with 'A Tour of Go' (free, interactive). Go forces you to handle errors explicitly, which makes code more robust. The standard library is extensive - you can build a lot without dependencies. Go compiles to a single binary, making deployment dead simple. The language is intentionally small - you can learn most of it in a weekend, but mastering it takes practice. Great for microservices, APIs, and DevOps tools.",
        "resources": [
          {
            "title": "A Tour of Go",
            "url": "https://go.dev/tour/",
            "type": "docs",
            "description": "Interactive introduction to Go. Best place to start!"
          },
          {
            "title": "Go by Example",
            "url": "https://gobyexample.com/",
            "type": "docs",
            "description": "Hands-on introduction with annotated example programs."
          },
          {
            "title": "Effective Go",
            "url": "https://go.dev/doc/effective_go",
            "type": "docs",
            "description": "Official guide to writing clear, idiomatic Go code."
          },
          {
            "title": "Learn Go with Tests",
            "url": "https://quii.gitbook.io/learn-go-with-tests/",
            "type": "book",
            "description": "TDD approach to learning Go. Free and practical."
          }
        ]
      },
      {
        "value": "csharp",
        "label": "C# / .NET",
        "recommendations": [
          "Build ASP.NET Core applications",
          "Master LINQ and async patterns",
          "Learn Entity Framework",
          "Understand dependency injection",
          "Explore Blazor"
        ],
        "scoreWeight": 0.82,
        "mentorExplanation": "C# and .NET have evolved dramatically - it's now cross-platform, fast, and modern! .NET Core changed everything. LINQ is incredibly powerful for data manipulation. Learn async/await deeply - C# has one of the best async implementations. ASP.NET Core is solid for web APIs. Entity Framework makes database work smooth. The ecosystem is mature with excellent tooling (Visual Studio, Rider). Blazor brings C# to the frontend if you're interested. Great for enterprise applications, games (Unity), and desktop apps. Microsoft's investment in .NET is huge!",
        "resources": [
          {
            "title": "C# Programming Guide",
            "url": "https://learn.microsoft.com/en-us/dotnet/csharp/",
            "type": "docs",
            "description": "Official Microsoft documentation."
          },
          {
            "title": ".NET Tutorial",
            "url": "https://dotnet.microsoft.com/learn",
            "type": "course",
            "description": "Official learning path for .NET."
          },
          {
            "title": "ASP.NET Core Fundamentals",
            "url": "https://learn.microsoft.com/en-us/aspnet/core/",
            "type": "docs",
            "description": "Modern web development with .NET."
          }
        ]
      },
      {
        "value": "redis",
        "label": "Redis / Caching",
        "recommendations": [
          "Implement caching strategies",
          "Learn Redis data structures",
          "Master cache invalidation patterns",
          "Use Redis for pub/sub",
          "Optimize application performance"
        ],
        "scoreWeight": 0.77,
        "mentorExplanation": "Redis is much more than a cache - it's an in-memory data structure store! Understanding caching is crucial for performance. Learn the different eviction policies, when to cache (and when not to), and cache invalidation strategies (the hardest problem in computer science, they say!). Redis has powerful data structures: sorted sets, hashes, streams. Use it for caching, session storage, real-time analytics, pub/sub messaging, and rate limiting. Master Redis and you'll dramatically improve application performance.",
        "resources": [
          {
            "title": "Redis University",
            "url": "https://university.redis.com/",
            "type": "course",
            "description": "Free official courses on Redis."
          },
          {
            "title": "Redis Documentation",
            "url": "https://redis.io/docs/",
            "type": "docs",
            "description": "Comprehensive official docs."
          },
          {
            "title": "Caching Best Practices",
            "url": "https://aws.amazon.com/caching/best-practices/",
            "type": "article",
            "description": "When and how to cache effectively."
          }
        ]
      },
      {
        "value": "swift",
        "label": "Swift / iOS Development",
        "recommendations": [
          "Build native iOS apps",
          "Learn SwiftUI",
          "Master UIKit fundamentals",
          "Understand iOS design patterns",
          "Learn Combine framework"
        ],
        "scoreWeight": 0.8,
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
            "url": "https://developer.apple.com/tutorials/app-dev-training",
            "type": "docs",
            "description": "Official Apple tutorials."
          }
        ]
      },
      {
        "value": "kotlin",
        "label": "Kotlin / Android Development",
        "recommendations": [
          "Build Android apps",
          "Learn Jetpack Compose",
          "Master coroutines",
          "Understand Android architecture",
          "Learn Kotlin multiplatform"
        ],
        "scoreWeight": 0.8,
        "mentorExplanation": "Kotlin is now Google's preferred language for Android - it's Java but better! More concise, null-safe by default, and has modern features. Jetpack Compose is transforming Android UI development (similar to React/SwiftUI). Coroutines make async code clean. Android has massive market share globally. Kotlin Multiplatform is interesting - share code between platforms. The Android ecosystem is vibrant and open. Great career path with huge demand!",
        "resources": [
          {
            "title": "Android Basics with Compose",
            "url": "https://developer.android.com/courses/android-basics-compose/course",
            "type": "course",
            "description": "Official modern Android course."
          },
          {
            "title": "Kotlin Documentation",
            "url": "https://kotlinlang.org/docs/home.html",
            "type": "docs",
            "description": "Official Kotlin docs."
          },
          {
            "title": "Kotlin Koans",
            "url": "https://play.kotlinlang.org/koans/",
            "type": "docs",
            "description": "Interactive Kotlin exercises."
          }
        ]
      },
      {
        "value": "php",
        "label": "PHP / Laravel",
        "recommendations": [
          "Learn modern PHP features",
          "Master Laravel framework",
          "Build RESTful APIs",
          "Understand Composer",
          "Learn Laravel Eloquent ORM"
        ],
        "scoreWeight": 0.75,
        "mentorExplanation": "Modern PHP (8+) is completely different from old PHP - it's fast, typed, and has a great ecosystem! Laravel is one of the most elegant frameworks out there. The community is strong, documentation is excellent. Learn modern PHP features: typed properties, attributes, fibers. Laravel's ecosystem is rich: Livewire, Inertia, Vapor. PHP powers a huge portion of the web (WordPress, etc.). Don't dismiss it because of old stereotypes - modern PHP is productive and powerful!",
        "resources": [
          {
            "title": "Laravel Bootcamp",
            "url": "https://bootcamp.laravel.com/",
            "type": "course",
            "description": "Official Laravel learning path."
          },
          {
            "title": "PHP: The Right Way",
            "url": "https://phptherightway.com/",
            "type": "docs",
            "description": "Best practices for modern PHP."
          },
          {
            "title": "Laracasts",
            "url": "https://laracasts.com/",
            "type": "course",
            "description": "Premium video tutorials for Laravel and PHP."
          }
        ]
      },
      {
        "value": "ruby",
        "label": "Ruby / Ruby on Rails",
        "recommendations": [
          "Build Rails applications",
          "Learn Ruby idioms",
          "Master ActiveRecord",
          "Understand convention over configuration",
          "Build RESTful services"
        ],
        "scoreWeight": 0.75,
        "mentorExplanation": "Ruby prioritizes developer happiness - the code reads like English! Rails popularized convention over configuration and remains incredibly productive. The 'Rails way' is opinionated, which means faster development. Ruby's meta-programming is powerful but use it wisely. The community values testing, good documentation, and clean code. Rails is mature and battle-tested. Great for startups and MVPs - you can build fast! Though not as trendy as it once was, Rails is still powering many successful companies.",
        "resources": [
          {
            "title": "Ruby on Rails Guides",
            "url": "https://guides.rubyonrails.org/",
            "type": "docs",
            "description": "Official comprehensive Rails guides."
          },
          {
            "title": "The Odin Project Ruby Path",
            "url": "https://www.theodinproject.com/paths/full-stack-ruby-on-rails",
            "type": "course",
            "description": "Free full-stack Ruby course."
          },
          {
            "title": "Eloquent Ruby",
            "url": "https://www.amazon.com/Eloquent-Ruby-Addison-Wesley-Professional/dp/0321584104",
            "type": "book",
            "description": "Write Ruby like a Rubyist."
          }
        ]
      },
      {
        "value": "elixir",
        "label": "Elixir / Phoenix",
        "recommendations": [
          "Learn functional programming concepts",
          "Build Phoenix applications",
          "Master OTP patterns",
          "Understand concurrency model",
          "Build real-time features with LiveView"
        ],
        "scoreWeight": 0.85,
        "mentorExplanation": "Elixir brings functional programming to the powerful Erlang VM - built for concurrency and fault tolerance! Phoenix is incredibly fast and Phoenix LiveView is game-changing (real-time features without writing JavaScript). The 'Let it crash' philosophy is mind-bending at first. Pattern matching is elegant. Great for real-time systems, chat apps, and high-concurrency scenarios. The community is welcoming and thoughtful. Learning Elixir teaches you functional programming principles that apply everywhere!",
        "resources": [
          {
            "title": "Elixir School",
            "url": "https://elixirschool.com/",
            "type": "docs",
            "description": "Free comprehensive Elixir lessons."
          },
          {
            "title": "Phoenix Framework Guides",
            "url": "https://hexdocs.pm/phoenix/overview.html",
            "type": "docs",
            "description": "Official Phoenix documentation."
          },
          {
            "title": "Programming Elixir",
            "url": "https://pragprog.com/titles/elixir16/programming-elixir-1-6/",
            "type": "book",
            "description": "Excellent book by Dave Thomas."
          }
        ]
      },
      {
        "value": "terraform",
        "label": "Terraform / Infrastructure as Code",
        "recommendations": [
          "Master IaC concepts",
          "Learn Terraform state management",
          "Build reusable modules",
          "Understand cloud provisioning",
          "Implement GitOps workflows"
        ],
        "scoreWeight": 0.84,
        "mentorExplanation": "Infrastructure as Code is essential for modern DevOps - Terraform is the industry standard! Treating infrastructure like code enables version control, code review, and automation. Learn about state management (crucial!), modules for reusability, and workspaces. Terraform is cloud-agnostic, which is powerful. Start with simple resources, then build complex modules. Understanding IaC makes you valuable in any DevOps context. The declarative approach is elegant - you describe what you want, Terraform figures out how.",
        "resources": [
          {
            "title": "Terraform Tutorials",
            "url": "https://developer.hashicorp.com/terraform/tutorials",
            "type": "docs",
            "description": "Official HashiCorp learning path."
          },
          {
            "title": "Terraform Best Practices",
            "url": "https://www.terraform-best-practices.com/",
            "type": "docs",
            "description": "Community best practices guide."
          },
          {
            "title": "Terraform Up & Running",
            "url": "https://www.terraformupandrunning.com/",
            "type": "book",
            "description": "Comprehensive book by Yevgeniy Brikman."
          }
        ]
      },
      {
        "value": "jenkins",
        "label": "Jenkins / CI/CD",
        "recommendations": [
          "Build CI/CD pipelines",
          "Master pipeline as code",
          "Learn deployment automation",
          "Implement testing automation",
          "Understand GitOps principles"
        ],
        "scoreWeight": 0.78,
        "mentorExplanation": "CI/CD is fundamental to modern software delivery - automate all the things! Jenkins is widely used (though GitHub Actions and GitLab CI are gaining ground). Learn pipeline-as-code (Jenkinsfile), understand stages and steps, and master deployment strategies (blue-green, canary). CI/CD isn't just about automation; it's about rapid, reliable feedback. Start simple: build, test, deploy. Then add complexity. Good CI/CD makes teams faster and more confident. This skill is valuable across all development roles!",
        "resources": [
          {
            "title": "Jenkins Documentation",
            "url": "https://www.jenkins.io/doc/",
            "type": "docs",
            "description": "Official Jenkins docs."
          },
          {
            "title": "CI/CD Best Practices",
            "url": "https://www.atlassian.com/continuous-delivery",
            "type": "article",
            "description": "Comprehensive CI/CD guide."
          },
          {
            "title": "GitHub Actions Tutorial",
            "url": "https://docs.github.com/en/actions",
            "type": "docs",
            "description": "Modern CI/CD alternative."
          }
        ]
      },
      {
        "value": "tailwind",
        "label": "Tailwind CSS / Utility-First CSS",
        "recommendations": [
          "Master utility-first approach",
          "Learn responsive design patterns",
          "Build custom design systems",
          "Optimize for production",
          "Learn JIT mode"
        ],
        "scoreWeight": 0.76,
        "mentorExplanation": "Tailwind CSS changed how we write CSS - utility-first is incredibly productive once you embrace it! At first, the long class names feel wrong, but you'll never want to name things again. You build faster, maintain easier, and the consistency is automatic. Learn the design system (spacing, colors), responsive utilities, and how to extract components when needed. JIT mode gives you arbitrary values. Tailwind is taking over - especially in React/Next.js ecosystems. The constraint of utilities actually increases creativity!",
        "resources": [
          {
            "title": "Tailwind CSS Docs",
            "url": "https://tailwindcss.com/docs",
            "type": "docs",
            "description": "Excellent searchable documentation."
          },
          {
            "title": "Tailwind UI",
            "url": "https://tailwindui.com/",
            "type": "docs",
            "description": "Premium components (worth studying even if not buying)."
          },
          {
            "title": "Build Anything with Tailwind",
            "url": "https://www.youtube.com/c/TailwindLabs",
            "type": "video",
            "description": "Official YouTube channel with tips."
          }
        ]
      },
      {
        "value": "flutter",
        "label": "Flutter / Dart",
        "recommendations": [
          "Build cross-platform apps",
          "Master widget composition",
          "Learn state management (Bloc, Riverpod)",
          "Understand Flutter architecture",
          "Build for iOS and Android"
        ],
        "scoreWeight": 0.81,
        "mentorExplanation": "Flutter lets you build beautiful native apps for mobile, web, and desktop from a single codebase! The widget system is elegant - everything's a widget. Dart is easy to learn if you know JavaScript or Java. Flutter's hot reload is incredibly productive. Learn state management early (Riverpod is popular). Performance is generally excellent. The community is growing fast. Great choice for cross-platform development - you can reach every platform with one codebase. Google's backing gives it staying power.",
        "resources": [
          {
            "title": "Flutter Documentation",
            "url": "https://docs.flutter.dev/",
            "type": "docs",
            "description": "Comprehensive official docs with codelabs."
          },
          {
            "title": "Flutter Widget Catalog",
            "url": "https://docs.flutter.dev/development/ui/widgets",
            "type": "docs",
            "description": "Complete widget reference."
          },
          {
            "title": "Flutter Course by Angela Yu",
            "url": "https://www.udemy.com/course/flutter-bootcamp-with-dart/",
            "type": "course",
            "description": "Popular comprehensive Flutter course."
          }
        ]
      },
      {
        "value": "svelte",
        "label": "Svelte / SvelteKit",
        "recommendations": [
          "Learn reactive programming in Svelte",
          "Build SvelteKit apps",
          "Master stores and context",
          "Understand compilation approach",
          "Build performant UIs"
        ],
        "scoreWeight": 0.79,
        "mentorExplanation": "Svelte is refreshingly different - it's a compiler, not a runtime framework! This means smaller bundle sizes and great performance. The reactive syntax is intuitive - just assignments trigger updates. SvelteKit is the full-stack framework. Svelte is gaining traction fast - developers love it for its simplicity and performance. Less boilerplate than React, more intuitive than Vue. Great for projects where bundle size matters or you want a fresh approach. The community is enthusiastic and growing!",
        "resources": [
          {
            "title": "Svelte Tutorial",
            "url": "https://svelte.dev/tutorial",
            "type": "docs",
            "description": "Interactive official tutorial. Best way to start!"
          },
          {
            "title": "SvelteKit Docs",
            "url": "https://kit.svelte.dev/docs/introduction",
            "type": "docs",
            "description": "Full-stack Svelte framework."
          },
          {
            "title": "Svelte Society",
            "url": "https://sveltesociety.dev/",
            "type": "docs",
            "description": "Community recipes and resources."
          }
        ]
      },
      {
        "value": "solidity",
        "label": "Solidity / Web3",
        "recommendations": [
          "Learn blockchain fundamentals",
          "Build smart contracts",
          "Master contract security",
          "Understand gas optimization",
          "Learn Web3.js or Ethers.js"
        ],
        "scoreWeight": 0.82,
        "mentorExplanation": "Web3 and blockchain are creating new paradigms! Solidity is for writing Ethereum smart contracts. Security is CRITICAL - bugs in smart contracts can cost millions. Understand gas optimization, common vulnerabilities (reentrancy, etc.), and testing thoroughly. The field is evolving rapidly. Start with blockchain fundamentals before diving into Solidity. Whether Web3 is the future or hype is debated, but the underlying concepts (decentralization, cryptography) are valuable to understand.",
        "resources": [
          {
            "title": "CryptoZombies",
            "url": "https://cryptozombies.io/",
            "type": "course",
            "description": "Learn Solidity through building a game. Fun and interactive!"
          },
          {
            "title": "Solidity Documentation",
            "url": "https://docs.soliditylang.org/",
            "type": "docs",
            "description": "Official Solidity docs."
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
        "value": "fastapi",
        "label": "FastAPI / Modern Python Web",
        "recommendations": [
          "Build async Python APIs",
          "Master Pydantic models",
          "Learn auto-generated docs",
          "Understand async/await in Python",
          "Implement authentication"
        ],
        "scoreWeight": 0.8,
        "mentorExplanation": "FastAPI is the modern way to build Python APIs - fast, intuitive, and production-ready! It uses type hints for validation and auto-generates beautiful API docs. Async support makes it performant. Pydantic models provide data validation. Coming from Flask or Django? FastAPI feels fresh and modern. The developer experience is excellent - auto-complete everywhere! Great for microservices, ML model APIs, or any backend API. It's gaining adoption rapidly!",
        "resources": [
          {
            "title": "FastAPI Documentation",
            "url": "https://fastapi.tiangolo.com/",
            "type": "docs",
            "description": "Excellent docs with tutorials."
          },
          {
            "title": "FastAPI Best Practices",
            "url": "https://github.com/zhanymkanov/fastapi-best-practices",
            "type": "github",
            "description": "Community best practices."
          },
          {
            "title": "Full Stack FastAPI",
            "url": "https://github.com/tiangolo/full-stack-fastapi-postgresql",
            "type": "github",
            "description": "Full-stack project template."
          }
        ]
      },
      {
        "value": "prisma",
        "label": "Prisma / Modern ORMs",
        "recommendations": [
          "Master Prisma schema",
          "Learn migrations",
          "Optimize database queries",
          "Understand type-safe database access",
          "Build with Prisma Client"
        ],
        "scoreWeight": 0.77,
        "mentorExplanation": "Prisma brings type-safety to database access - it's changing how we work with databases in TypeScript! The schema is declarative and migration system is smooth. Prisma Client is auto-generated and fully typed. Great developer experience with auto-complete. Works with PostgreSQL, MySQL, SQLite, SQL Server, MongoDB. Compared to traditional ORMs (TypeORM, Sequelize), Prisma feels more modern. The query API is intuitive. Database work becomes safer and more productive!",
        "resources": [
          {
            "title": "Prisma Documentation",
            "url": "https://www.prisma.io/docs",
            "type": "docs",
            "description": "Comprehensive official docs."
          },
          {
            "title": "Prisma Tutorial",
            "url": "https://www.prisma.io/docs/getting-started",
            "type": "course",
            "description": "Get started with Prisma."
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
        "value": "figma",
        "label": "Figma / Design Tools",
        "recommendations": [
          "Learn UI/UX principles",
          "Master component design",
          "Understand design systems",
          "Learn prototyping",
          "Collaborate with designers effectively"
        ],
        "scoreWeight": 0.72,
        "mentorExplanation": "Understanding design makes you a more complete developer! Figma is the industry-standard design tool. Learn to read design specs, understand spacing and typography, use design tokens. Auto-layout is powerful for responsive designs. Good developers who understand design are incredibly valuable. You don't need to be a designer, but understanding design thinking and tools bridges the developer-designer gap. This makes you more effective and collaborative!",
        "resources": [
          {
            "title": "Figma Tutorial",
            "url": "https://help.figma.com/hc/en-us/categories/360002051613",
            "type": "docs",
            "description": "Official Figma learning resources."
          },
          {
            "title": "UI/UX Fundamentals",
            "url": "https://www.coursera.org/learn/ui-ux-design",
            "type": "course",
            "description": "Learn design principles."
          },
          {
            "title": "Refactoring UI",
            "url": "https://www.refactoringui.com/",
            "type": "book",
            "description": "Design for developers. Excellent resource!"
          }
        ]
      }
    ]
  },
  {
    "id": "3bf9aa2c-9065-4a9b-b022-49e7a44ef015",
    "title": "How comfortable are you with debugging complex issues?",
    "category": "Problem Solving & Debugging",
    "type": "multiple-choice",
    "hint": "Think about your systematic approach, tool usage, and problem isolation skills",
    "allowOther": true,
    "options": [
      {
        "value": "intermediate",
        "label": "I can solve most issues with research and systematic debugging",
        "recommendations": [
          "Learn advanced debugging patterns",
          "Study memory profiling",
          "Practice debugging production issues"
        ],
        "scoreWeight": 0.7,
        "isCorrect": true,
        "mentorExplanation": "You're thinking systematically, which is the right foundation. The next step is building deeper mental models - when you understand how the system works underneath, debugging becomes pattern recognition. Keep pushing into the harder bugs; that's where the real learning happens.",
        "resources": [
          {
            "title": "Advanced Debugging Techniques",
            "url": "https://www.youtube.com/watch?v=_Wp68Y9cc_U",
            "type": "video"
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
        ]
      },
      {
        "value": "use-logging",
        "label": "I use logging extensively but struggle with complex async issues",
        "recommendations": [
          "Learn async debugging techniques",
          "Master promise rejection handling",
          "Use async stack traces",
          "Learn event loop debugging"
        ],
        "scoreWeight": 0.55,
        "mentorExplanation": "Async code trips everyone up at first. The trick is understanding that async stack traces work differently - DevTools can show them if you enable async stack tracing. Also, get really comfortable with the event loop; once you see how promises queue up, async bugs make way more sense.",
        "resources": [
          {
            "title": "Async Debugging in Chrome",
            "url": "https://developer.chrome.com/blog/async-call-stack/",
            "type": "article"
          },
          {
            "title": "Understanding the Event Loop",
            "url": "https://www.youtube.com/watch?v=8aGhZQkoFbQ",
            "type": "video",
            "description": "Classic event loop explanation"
          },
          {
            "title": "Debugging Promises",
            "url": "https://javascript.info/promise-error-handling",
            "type": "article"
          }
        ]
      },
      {
        "value": "expert",
        "label": "I excel at debugging across all levels (code, network, system)",
        "recommendations": [
          "Create debugging workshops",
          "Write technical blog posts",
          "Build internal debugging tools"
        ],
        "scoreWeight": 1,
        "isCorrect": true,
        "mentorExplanation": "This level of debugging skill is rare and valuable. You've built the intuition that lets you jump between layers - from application code down to network packets. Share what you know; most developers never learn to think across the full stack like this.",
        "resources": [
          {
            "title": "Writing Technical Posts",
            "url": "https://www.freecodecamp.org/news/how-to-write-a-great-technical-blog-post-414c414b67f6/",
            "type": "article"
          },
          {
            "title": "System-Level Debugging",
            "url": "https://jvns.ca/blog/2021/04/03/what-problems-do-people-solve-with-strace/",
            "type": "article"
          }
        ]
      },
      {
        "value": "console-only",
        "label": "I mostly use console.log and get stuck often",
        "recommendations": [
          "Learn to use Chrome DevTools debugger",
          "Practice reading stack traces",
          "Study systematic debugging approaches"
        ],
        "scoreWeight": 0.1,
        "isCommonMistake": true,
        "mentorExplanation": "Console.log works, but you're missing out on huge time savings. The debugger lets you pause execution and inspect everything at that moment - way faster than littering code with logs. Spend an hour learning DevTools breakpoints and you'll never look back.",
        "resources": [
          {
            "title": "Chrome DevTools Tutorial",
            "url": "https://developer.chrome.com/docs/devtools/",
            "type": "docs",
            "description": "Master browser debugging"
          },
          {
            "title": "Debugging JavaScript",
            "url": "https://javascript.info/debugging-chrome",
            "type": "article"
          },
          {
            "title": "VS Code Debugging",
            "url": "https://code.visualstudio.com/docs/editor/debugging",
            "type": "docs"
          }
        ]
      },
      {
        "value": "reproduce-first",
        "label": "I focus on reproducing issues reliably before fixing them",
        "recommendations": [
          "Document reproduction steps",
          "Create automated tests from bugs",
          "Build debugging test suites",
          "Share reproduction techniques"
        ],
        "scoreWeight": 0.82,
        "isCorrect": true,
        "mentorExplanation": "This is the right instinct. A bug you can reproduce consistently is already halfway fixed. The developers who skip this step end up with bugs that resurface later. Bonus points if you turn your reproduction steps into a test case before fixing.",
        "resources": []
      },
      {
        "value": "basic-tools",
        "label": "I use debugger breakpoints but struggle with complex issues",
        "recommendations": [
          "Learn to trace through async code",
          "Practice binary search debugging",
          "Study error patterns"
        ],
        "scoreWeight": 0.4,
        "mentorExplanation": "Breakpoints are good, but debugging is more about strategy than tools. When you hit a complex bug, narrow down where it's happening first (binary search: is it in this half of the code or that half?). Then zoom in. Most developers go too deep too fast.",
        "resources": [
          {
            "title": "Debugging Techniques",
            "url": "https://blog.regehr.org/archives/199",
            "type": "article",
            "description": "Systematic debugging strategies"
          },
          {
            "title": "Async Debugging",
            "url": "https://developer.chrome.com/blog/async-call-stack/",
            "type": "article"
          },
          {
            "title": "Problem Solving Patterns",
            "url": "https://www.freecodecamp.org/news/how-to-think-like-a-programmer-lessons-in-problem-solving-d1d8bf1de7d2/",
            "type": "article"
          }
        ]
      },
      {
        "value": "struggle-alone",
        "label": "I struggle with issues alone for extended periods",
        "recommendations": [
          "Learn when to ask for help",
          "Practice rubber duck debugging",
          "Set time limits for independent debugging",
          "Build debugging documentation habits"
        ],
        "scoreWeight": 0.25,
        "isCommonMistake": true,
        "mentorExplanation": "Independence is good, but there's a difference between persistence and stubbornness. If you've been stuck for an hour, you're probably missing context. Talk it through with someone (or a rubber duck). The act of explaining often surfaces the issue, and fresh eyes catch things you've gone blind to.",
        "resources": [
          {
            "title": "Rubber Duck Debugging",
            "url": "https://en.wikipedia.org/wiki/Rubber_duck_debugging",
            "type": "article",
            "description": "Explain problems out loud to solve them"
          },
          {
            "title": "How to Ask Good Questions",
            "url": "https://stackoverflow.com/help/how-to-ask",
            "type": "docs",
            "description": "Get better help by asking better questions"
          }
        ]
      },
      {
        "value": "advanced",
        "label": "I independently solve complex issues using multiple techniques",
        "recommendations": [
          "Mentor others in debugging",
          "Document debugging strategies",
          "Create debugging tools"
        ],
        "scoreWeight": 0.92,
        "isCorrect": true,
        "mentorExplanation": "Strong debugging chops. You know when to use the profiler versus the network tab versus stepping through code. This skill multiplies when you teach it - showing junior devs your process makes them way more effective and takes pressure off you.",
        "resources": []
      }
    ]
  },
  {
    "id": "dc0e2c70-4c8d-448a-8663-e32f860ed300",
    "title": "How do you approach learning a new technology or framework?",
    "category": "Learning & Growth",
    "type": "multiple-choice",
    "hint": "Consider your learning initiative, methods, and knowledge sharing",
    "allowOther": true,
    "options": [
      {
        "value": "peer-learning",
        "label": "I learn best through pair programming and collaboration",
        "recommendations": [
          "Start a peer learning group",
          "Organize study sessions",
          "Practice mob programming",
          "Facilitate knowledge sharing"
        ],
        "scoreWeight": 0.65,
        "isCorrect": true,
        "mentorExplanation": "Collaborative learning works because you get real-time feedback and see how others think through problems. The social accountability helps too - you actually show up and do the work. Try mob programming sometime; it's surprisingly effective for complex problems.",
        "resources": [
          {
            "title": "Pair Programming Guide",
            "url": "https://martinfowler.com/articles/on-pair-programming.html",
            "type": "article"
          },
          {
            "title": "Mob Programming",
            "url": "https://www.youtube.com/watch?v=dVqUcNKVbYg",
            "type": "video"
          }
        ]
      },
      {
        "value": "reactive",
        "label": "I learn when I encounter a problem that needs solving",
        "recommendations": [
          "Complement just-in-time learning with structured study",
          "Build foundational knowledge"
        ],
        "scoreWeight": 0.25,
        "isCommonMistake": true,
        "mentorExplanation": "Just-in-time learning feels efficient but leaves gaps in your foundation. You end up relearning the same concepts in different contexts. Spend some time on fundamentals - understanding how things work makes future problems easier to solve.",
        "resources": [
          {
            "title": "Spaced Repetition",
            "url": "https://ncase.me/remember/",
            "type": "article",
            "description": "Effective learning technique"
          },
          {
            "title": "Developer Learning Path",
            "url": "https://github.com/kamranahmedse/developer-roadmap",
            "type": "github"
          }
        ]
      },
      {
        "value": "teach-to-learn",
        "label": "I learn by teaching and creating educational content",
        "recommendations": [
          "Scale your teaching impact",
          "Create comprehensive courses",
          "Start a tech blog or YouTube channel",
          "Mentor formally"
        ],
        "scoreWeight": 0.87,
        "isCorrect": true,
        "mentorExplanation": "Teaching forces you to understand at a deeper level - you can't hand-wave over the parts you don't fully get. Plus you're helping others while you learn. Write, speak, create videos - pick what works for you and keep doing it.",
        "resources": [
          {
            "title": "Feynman Technique",
            "url": "https://fs.blog/feynman-technique/",
            "type": "article",
            "description": "Learn by teaching"
          },
          {
            "title": "Creating Technical Content",
            "url": "https://developers.google.com/tech-writing",
            "type": "course"
          }
        ]
      },
      {
        "value": "basics",
        "label": "I learn the basics through tutorials when needed",
        "recommendations": [
          "Go deeper than tutorials",
          "Build projects from scratch",
          "Read official documentation"
        ],
        "scoreWeight": 0.35,
        "mentorExplanation": "Tutorials get you started, but they're training wheels. At some point you need to fall a few times to really learn. Pick a small project and build it without following along - the struggle is where learning actually happens.",
        "resources": [
          {
            "title": "Project-Based Learning",
            "url": "https://github.com/practical-tutorials/project-based-learning",
            "type": "github"
          }
        ]
      },
      {
        "value": "theory-practice",
        "label": "I balance theoretical study with practical application",
        "recommendations": [
          "Continue the balance",
          "Teach the theory-practice connection",
          "Create learning frameworks",
          "Mentor using both approaches"
        ],
        "scoreWeight": 0.8,
        "isCorrect": true,
        "mentorExplanation": "This is the sweet spot. Theory gives you the mental models to understand why things work; practice cements it. People who skip theory hit walls; people who skip practice never ship. You're doing both.",
        "resources": [
          {
            "title": "Computer Science Fundamentals",
            "url": "https://github.com/ossu/computer-science",
            "type": "github",
            "description": "Free CS education"
          },
          {
            "title": "Applying CS Theory",
            "url": "https://www.youtube.com/c/BenEater",
            "type": "video",
            "description": "Theory to hardware"
          }
        ]
      },
      {
        "value": "wait",
        "label": "I wait for formal training or assignments",
        "recommendations": [
          "Take initiative in learning",
          "Set personal learning goals",
          "Start a small personal project"
        ],
        "scoreWeight": 0.08,
        "mentorExplanation": "Waiting for permission to learn puts your growth in someone else's hands. The developers who advance fastest are the ones who explore on their own time. Start small - even 30 minutes a day adds up fast.",
        "resources": [
          {
            "title": "Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "type": "docs",
            "description": "Structured learning paths"
          }
        ]
      },
      {
        "value": "experiment",
        "label": "I learn by experimenting and breaking things in safe environments",
        "recommendations": [
          "Document your experiments",
          "Share learnings from failures",
          "Build lab environments",
          "Teach experimental mindset"
        ],
        "scoreWeight": 0.73,
        "isCorrect": true,
        "mentorExplanation": "Breaking things is underrated as a learning method. When something fails, you learn way more than when it just works. Keep a lab environment where you can safely destroy stuff. Document what breaks and why - future you will thank you.",
        "resources": [
          {
            "title": "Build a Home Lab",
            "url": "https://www.reddit.com/r/homelab/",
            "type": "article",
            "description": "Safe environment for experiments"
          }
        ]
      },
      {
        "value": "tutorial-hell",
        "label": "I follow many tutorials but struggle to build without them",
        "recommendations": [
          "Break free from tutorial dependency",
          "Build projects from scratch",
          "Learn to read documentation",
          "Start with small original ideas"
        ],
        "scoreWeight": 0.17,
        "isCommonMistake": true,
        "mentorExplanation": "Tutorial hell is real - you watch someone build, think you understand, then freeze when facing a blank editor. The fix: stop mid-tutorial and build the rest yourself. Use docs, not more tutorials. The discomfort means you're actually learning.",
        "resources": [
          {
            "title": "Learn by Building",
            "url": "https://github.com/practical-tutorials/project-based-learning",
            "type": "github"
          }
        ]
      },
      {
        "value": "deep-dive",
        "label": "I deeply research topics, read source code, and experiment extensively",
        "recommendations": [
          "Share your deep knowledge",
          "Mentor others",
          "Contribute to docs and libraries"
        ],
        "scoreWeight": 0.93,
        "isCorrect": true,
        "mentorExplanation": "Reading source code separates good developers from great ones. You're learning from the best implementations, not just using APIs. This depth shows up in how you solve problems. Keep sharing what you find - most developers never go this deep.",
        "resources": [
          {
            "title": "Reading Code Effectively",
            "url": "https://github.com/aredridel/how-to-read-code",
            "type": "github"
          },
          {
            "title": "Creating Technical Content",
            "url": "https://developers.google.com/tech-writing",
            "type": "course"
          }
        ]
      },
      {
        "value": "structured",
        "label": "I follow structured courses and build practice projects",
        "recommendations": [
          "Mix structured learning with exploration",
          "Share your learnings",
          "Teach others"
        ],
        "scoreWeight": 0.55,
        "isCorrect": true,
        "mentorExplanation": "Structured courses give you a solid path through the fundamentals. The practice projects are what make it stick. Try teaching someone else what you learned - that's when you discover what you actually understand versus what you just memorized.",
        "resources": [
          {
            "title": "Teach to Learn",
            "url": "https://fs.blog/feynman-technique/",
            "type": "article",
            "description": "Feynman Technique"
          }
        ]
      },
      {
        "value": "expert",
        "label": "I research deeply, contribute to communities, and help establish best practices",
        "recommendations": [
          "Become a subject matter expert",
          "Speak at conferences",
          "Write comprehensive guides"
        ],
        "scoreWeight": 1,
        "isCorrect": true,
        "mentorExplanation": "You're operating at the community level, which amplifies your impact. When you establish best practices and contribute back, you're shaping how thousands of developers work. This is leadership through teaching. Keep it up.",
        "resources": [
          {
            "title": "Conference Speaking Guide",
            "url": "https://speaking.io/",
            "type": "docs"
          },
          {
            "title": "Building Developer Communities",
            "url": "https://www.commonroom.io/blog/developer-community/",
            "type": "article"
          }
        ]
      },
      {
        "value": "proactive",
        "label": "I proactively explore new tech and build meaningful side projects",
        "recommendations": [
          "Share knowledge with your team",
          "Contribute to open source",
          "Create technical content"
        ],
        "scoreWeight": 0.45,
        "yearOneRecommendations": [
          "Complete 2-3 substantial side projects",
          "Present learnings to the team"
        ],
        "isCorrect": true,
        "mentorExplanation": "Side projects are your laboratory - you learn without constraints or deadlines. The best ones scratch your own itch. Share what you build; even failed projects teach valuable lessons when you write about what didn't work and why.",
        "resources": [
          {
            "title": "Building in Public",
            "url": "https://www.indiehackers.com/group/build-in-public",
            "type": "article"
          },
          {
            "title": "Open Source Guide",
            "url": "https://opensource.guide/how-to-contribute/",
            "type": "docs"
          },
          {
            "title": "First Timers Only",
            "url": "https://www.firsttimersonly.com/",
            "type": "docs"
          }
        ]
      }
    ]
  },
  {
    "id": "fc3566aa-9b66-406c-bae1-bb84427a0dbe",
    "title": "How often do you participate in code reviews?",
    "category": "Collaboration",
    "type": "multiple-choice",
    "hint": "Quality code reviews are about learning together, not just catching bugs",
    "allowOther": true,
    "options": [
      {
        "value": "regularly",
        "label": "Regularly as part of my workflow",
        "recommendations": [
          "Mentor juniors through code reviews",
          "Establish review standards",
          "Share patterns you see"
        ],
        "scoreWeight": 0.68,
        "isCorrect": true,
        "mentorExplanation": "Regular reviews mean you're seeing how the codebase evolves, not just your corner of it. Use reviews to teach - when you explain why something matters, that's mentoring. The comments you leave shape how people code.",
        "resources": [
          {
            "title": "Mentoring Through Code Reviews",
            "url": "https://blog.pragmaticengineer.com/good-code-reviews-better-code-reviews/",
            "type": "article"
          },
          {
            "title": "Code Review Standards",
            "url": "https://www.kevinlondon.com/2015/05/05/code-review-best-practices.html",
            "type": "article"
          }
        ]
      },
      {
        "value": "passive",
        "label": "I review code but mostly approve without deep analysis",
        "recommendations": [
          "Learn what to look for in code reviews",
          "Practice giving constructive feedback",
          "Take time to understand context"
        ],
        "scoreWeight": 0.28,
        "isCommonMistake": true,
        "mentorExplanation": "Rubber-stamping reviews is worse than not reviewing - it gives false confidence. Actually pull the code and run it. Ask questions when you don't understand. It's fine to say 'I need more time to review this properly' instead of a quick LGTM.",
        "resources": [
          {
            "title": "Code Review Checklist",
            "url": "https://github.com/mgreiler/code-review-checklist",
            "type": "github"
          },
          {
            "title": "Giving Constructive Feedback",
            "url": "https://mtlynch.io/human-code-reviews-1/",
            "type": "article"
          }
        ]
      },
      {
        "value": "lead",
        "label": "I lead code review processes and set standards for the team",
        "recommendations": [
          "Create comprehensive guidelines",
          "Train team on effective reviews",
          "Measure and improve review metrics"
        ],
        "scoreWeight": 1,
        "isCorrect": true,
        "mentorExplanation": "When you set the review culture, you're shaping how the whole team thinks about quality. Good review standards mean everyone gets better, not just individuals. Keep making it a learning experience, not a gate to pass through.",
        "resources": [
          {
            "title": "Review Process Guide",
            "url": "https://github.com/thoughtbot/guides/tree/main/code-review",
            "type": "github"
          }
        ]
      },
      {
        "value": "rarely",
        "label": "Rarely or never",
        "recommendations": [
          "Start reviewing pull requests regularly",
          "Learn code review best practices",
          "Ask to be added as a reviewer"
        ],
        "scoreWeight": 0.15,
        "mentorExplanation": "You're missing one of the best learning opportunities - seeing how experienced developers write code and think through problems. Volunteer to review; you don't have to be an expert to ask good questions. That's how you learn.",
        "resources": [
          {
            "title": "Code Review Best Practices",
            "url": "https://google.github.io/eng-practices/review/",
            "type": "docs",
            "description": "Google's code review guide"
          },
          {
            "title": "How to Review Code",
            "url": "https://www.freecodecamp.org/news/code-review-tips/",
            "type": "article"
          },
          {
            "title": "Effective Code Reviews",
            "url": "https://www.youtube.com/watch?v=a9_0UUUNt-Y",
            "type": "video"
          }
        ]
      },
      {
        "value": "proactive",
        "label": "I actively seek out PRs to review and provide detailed feedback",
        "recommendations": [
          "Document common patterns",
          "Create team review guidelines",
          "Host code review workshops"
        ],
        "scoreWeight": 0.83,
        "isCorrect": true,
        "mentorExplanation": "Proactive reviewing means you care about the codebase, not just your part of it. The detailed feedback you give makes everyone better. Consider documenting the patterns you see repeatedly - that becomes team knowledge, not just review comments.",
        "resources": [
          {
            "title": "Advanced Code Review",
            "url": "https://www.youtube.com/watch?v=PJjmw9TRB7s",
            "type": "video"
          },
          {
            "title": "Team Code Review Process",
            "url": "https://github.com/features/code-review/",
            "type": "docs"
          }
        ]
      },
      {
        "value": "sometimes",
        "label": "Occasionally when asked",
        "recommendations": [
          "Volunteer for more code reviews",
          "Review across different areas",
          "Provide constructive feedback"
        ],
        "scoreWeight": 0.42,
        "mentorExplanation": "Occasional reviews are better than none, but you're reactive instead of proactive. Make it a habit - review something every day or two. You stay connected to what's changing and build better working relationships with teammates.",
        "resources": [
          {
            "title": "Thoughtful Code Reviews",
            "url": "https://testing.googleblog.com/2017/06/code-health-too-many-comments-on-your.html",
            "type": "article"
          }
        ]
      }
    ]
  },
  {
    "id": "41fe2c4f-ee6a-440a-be55-e8cdaea27ac5",
    "title": "How do you handle technical disagreements with team members?",
    "category": "Communication",
    "type": "multiple-choice",
    "hint": "Healthy disagreement drives better solutions. It's about the best outcome, not being right.",
    "allowOther": true,
    "options": [
      {
        "value": "discuss",
        "label": "I discuss openly and seek consensus",
        "recommendations": [
          "Document decision-making processes",
          "Facilitate technical discussions",
          "Use RFCs for big decisions"
        ],
        "scoreWeight": 0.7,
        "isCorrect": true,
        "mentorExplanation": "Open discussion works because everyone's input gets heard and weighed. The consensus process builds buy-in - people support decisions they helped shape. Document the reasoning; future-you will appreciate knowing why that choice was made.",
        "resources": [
          {
            "title": "RFC Process",
            "url": "https://github.com/rust-lang/rfcs",
            "type": "github",
            "description": "Example RFC process"
          },
          {
            "title": "Architecture Decision Records",
            "url": "https://adr.github.io/",
            "type": "docs"
          },
          {
            "title": "Technical Discussions",
            "url": "https://www.youtube.com/watch?v=jsNnlu0B1-0",
            "type": "video"
          }
        ]
      },
      {
        "value": "defer",
        "label": "I usually defer to more senior developers",
        "recommendations": [
          "Build confidence in your opinions",
          "Prepare data to support your views",
          "Ask clarifying questions"
        ],
        "scoreWeight": 0.55,
        "isCommonMistake": true,
        "mentorExplanation": "Experience matters, but junior doesn't mean wrong. You might see something they missed. Frame it as questions if that's easier: 'What about X approach?' or 'Have we considered Y?' That's how you learn and sometimes you'll be right.",
        "resources": [
          {
            "title": "Disagree and Commit",
            "url": "https://en.wikipedia.org/wiki/Disagree_and_commit",
            "type": "article"
          },
          {
            "title": "Technical Decision Making",
            "url": "https://www.youtube.com/watch?v=jsNnlu0B1-0",
            "type": "video"
          },
          {
            "title": "Building Technical Confidence",
            "url": "https://charity.wtf/2019/01/04/engineering-management-the-pendulum-or-the-ladder/",
            "type": "article"
          }
        ]
      },
      {
        "value": "data-driven",
        "label": "I resolve disagreements with data, experiments, and proof-of-concepts",
        "recommendations": [
          "Teach data-driven decision making",
          "Build experimentation culture",
          "Create decision frameworks",
          "Document outcomes"
        ],
        "scoreWeight": 0.92,
        "isCorrect": true,
        "mentorExplanation": "This is the engineering approach - let data decide. Quick POCs settle debates fast and everyone learns something regardless of the outcome. 'Let's test both and measure' beats endless debate every time.",
        "resources": []
      },
      {
        "value": "avoid",
        "label": "I tend to avoid confrontation and stay quiet",
        "recommendations": [
          "Practice assertive communication",
          "Learn conflict resolution skills",
          "Prepare your points beforehand"
        ],
        "scoreWeight": 0.1,
        "mentorExplanation": "Staying quiet means missing opportunities to improve the work. Your different perspective has value. Start small - share one concern as a question. Most technical disagreements aren't personal; they're about finding the best solution.",
        "resources": []
      },
      {
        "value": "facilitate",
        "label": "I facilitate productive discussions and help find balanced solutions",
        "recommendations": [
          "Mentor others in communication",
          "Create decision frameworks",
          "Document patterns"
        ],
        "scoreWeight": 0.82,
        "isCorrect": true,
        "mentorExplanation": "Facilitating disagreements is leadership - you're helping people talk through problems productively. Good facilitators summarize positions, find common ground, and keep discussions on track. Teams need this skill badly.",
        "resources": [
          {
            "title": "Facilitation Skills",
            "url": "https://www.atlassian.com/team-playbook/plays",
            "type": "docs"
          }
        ]
      },
      {
        "value": "stubborn",
        "label": "I strongly defend my ideas and rarely change my mind",
        "recommendations": [
          "Practice intellectual humility",
          "Seek contrary evidence",
          "Learn disagreement frameworks",
          "Focus on outcomes over ego"
        ],
        "scoreWeight": 0.4,
        "isCommonMistake": true,
        "mentorExplanation": "Being right feels good, but being effective matters more. The best engineers change their minds when shown better evidence. Try this: actively look for reasons your idea might be wrong before defending it. Ego is expensive.",
        "resources": [
          {
            "title": "Disagree Better",
            "url": "https://www.youtube.com/watch?v=kgk0q7OyC6Y",
            "type": "video"
          }
        ]
      },
      {
        "value": "lead",
        "label": "I lead technical discussions and help teams make informed decisions",
        "recommendations": [
          "Establish decision-making processes",
          "Coach others in healthy disagreement",
          "Scale your influence"
        ],
        "scoreWeight": 1,
        "isCorrect": true,
        "mentorExplanation": "Leading technical decisions means balancing many inputs and driving to resolution. You're not dictating; you're synthesizing viewpoints and making the call when needed. Document the rationale - decisions made with incomplete information need context for future readers.",
        "resources": [
          {
            "title": "Staff Engineer's Path",
            "url": "https://www.oreilly.com/library/view/the-staff-engineers/9781098118723/",
            "type": "book"
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
        ]
      },
      {
        "value": "passive-aggressive",
        "label": "I agree publicly but express concerns privately or ignore decisions",
        "recommendations": [
          "Practice direct communication",
          "Learn to disagree constructively",
          "Build trust with team",
          "Address concerns openly"
        ],
        "scoreWeight": 0.25,
        "isCommonMistake": true,
        "mentorExplanation": "This pattern kills team trust and makes problems worse. If you disagree, say so in the room with your reasoning. 'Disagree and commit' means voicing concerns, then supporting the decision once made. Silent resentment helps no one.",
        "resources": [
          {
            "title": "Disagree and Commit",
            "url": "https://en.wikipedia.org/wiki/Disagree_and_commit",
            "type": "article"
          },
          {
            "title": "Radical Candor",
            "url": "https://www.radicalcandor.com/",
            "type": "book",
            "description": "Direct and kind communication"
          }
        ]
      }
    ]
  },
  {
    "id": "3956fae6-6c8f-4d27-84df-f0bb0e39e8c8",
    "title": "Which best describes your experience with system design and architecture?",
    "category": "Problem Solving & Debugging",
    "type": "multiple-choice",
    "hint": "Think about designing scalable, maintainable systems, not just writing code",
    "allowOther": true,
    "options": [
      {
        "value": "design",
        "label": "I design features and components",
        "recommendations": [
          "Study scalability patterns",
          "Design larger system architectures",
          "Learn about trade-offs"
        ],
        "scoreWeight": 0.82,
        "yearOneRecommendations": [
          "Lead architectural decisions for a feature",
          "Present design proposals"
        ],
        "isCorrect": true,
        "mentorExplanation": "You're designing at the component level, which is solid. Next step: understand the system-level implications. How does your component fit into the larger picture? What happens at scale? Every design decision has trade-offs - start documenting them.",
        "resources": [
          {
            "title": "Architecture Decision Records",
            "url": "https://adr.github.io/",
            "type": "docs"
          },
          {
            "title": "System Design Interviews",
            "url": "https://www.youtube.com/c/SystemDesignInterview",
            "type": "video"
          }
        ]
      },
      {
        "value": "learning",
        "label": "Learning through project involvement",
        "recommendations": [
          "Take a system design course",
          "Practice designing small systems",
          "Study real-world architectures"
        ],
        "scoreWeight": 0.42,
        "mentorExplanation": "Hands-on learning is effective, but study the patterns behind what you're building. Why this database? Why this architecture? Understanding the 'why' makes you dangerous - you can apply it to new problems.",
        "resources": [
          {
            "title": "Designing Data-Intensive Applications",
            "url": "https://dataintensive.net/",
            "type": "book",
            "description": "Essential system design book"
          },
          {
            "title": "System Design Interview",
            "url": "https://www.youtube.com/c/SystemDesignInterview",
            "type": "video"
          }
        ]
      },
      {
        "value": "expert",
        "label": "I design complex distributed systems and set architectural direction",
        "recommendations": [
          "Share architecture knowledge",
          "Lead organization-wide initiatives",
          "Speak at conferences"
        ],
        "scoreWeight": 1,
        "isCorrect": true,
        "mentorExplanation": "Distributed systems expertise is rare. You understand CAP theorem isn't theoretical - it's every day trade-offs. Share this knowledge; most developers never work at this level. Write, speak, mentor. Your experience is valuable.",
        "resources": [
          {
            "title": "Papers We Love",
            "url": "https://paperswelove.org/",
            "type": "article",
            "description": "Computer science papers"
          }
        ]
      },
      {
        "value": "none",
        "label": "No experience, I work on assigned tasks",
        "recommendations": [
          "Study basic software architecture patterns",
          "Learn about system design fundamentals",
          "Read about design principles"
        ],
        "scoreWeight": 0.25,
        "mentorExplanation": "Even small tasks involve design choices. Start thinking architecturally: why this approach over that one? What if this needed to handle 10x traffic? Ask these questions; they'll change how you code.",
        "resources": [
          {
            "title": "System Design Primer",
            "url": "https://github.com/donnemartin/system-design-primer",
            "type": "github",
            "description": "Comprehensive system design guide"
          },
          {
            "title": "Design Patterns Explained",
            "url": "https://refactoring.guru/design-patterns",
            "type": "article"
          }
        ]
      },
      {
        "value": "monolith-only",
        "label": "I only have experience with monolithic architectures",
        "recommendations": [
          "Learn microservices patterns",
          "Study distributed systems concepts",
          "Understand service boundaries",
          "Learn API design"
        ],
        "scoreWeight": 0.7,
        "mentorExplanation": "Monoliths get a bad rap but they're often the right choice - simple, fast to develop, easy to debug. Learn microservices so you understand the trade-offs, not because you need to use them everywhere. Many 'microservices' should have stayed monoliths.",
        "resources": [
          {
            "title": "Monolith vs Microservices",
            "url": "https://martinfowler.com/articles/microservices.html",
            "type": "article"
          }
        ]
      },
      {
        "value": "architect",
        "label": "I design and architect systems",
        "recommendations": [
          "Mentor others in architecture",
          "Document architectural decisions",
          "Study distributed systems"
        ],
        "scoreWeight": 0.92,
        "isCorrect": true,
        "mentorExplanation": "System-level thinking is your strength. You're balancing requirements, constraints, and trade-offs. Keep learning patterns, but also teach your process - how you think through design problems is more valuable than the solutions themselves.",
        "resources": [
          {
            "title": "Distributed Systems",
            "url": "https://www.distributed-systems.net/",
            "type": "course"
          },
          {
            "title": "Martin Fowler's Blog",
            "url": "https://martinfowler.com/",
            "type": "article",
            "description": "Architecture insights"
          }
        ]
      },
      {
        "value": "copy-paste",
        "label": "I mostly copy solutions from Stack Overflow without understanding design",
        "recommendations": [
          "Learn fundamental design principles",
          "Understand before implementing",
          "Study why solutions work",
          "Build foundational knowledge"
        ],
        "scoreWeight": 0.1,
        "isCommonMistake": true,
        "mentorExplanation": "Copying code without understanding is like copying someone's homework - you miss the learning. Before implementing a solution, understand the problem it solves. Why does this work? What would break it? That understanding is what separates developers from coders.",
        "resources": [
          {
            "title": "Design Patterns for Humans",
            "url": "https://github.com/kamranahmedse/design-patterns-for-humans",
            "type": "github",
            "description": "Simple design pattern explanations"
          },
          {
            "title": "SOLID Principles",
            "url": "https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design",
            "type": "article"
          },
          {
            "title": "Refactoring Guru",
            "url": "https://refactoring.guru/",
            "type": "docs",
            "description": "Design patterns and refactoring"
          }
        ]
      },
      {
        "value": "over-engineer",
        "label": "I tend to over-engineer solutions with unnecessary complexity",
        "recommendations": [
          "Practice YAGNI principle",
          "Start simple, evolve as needed",
          "Learn when to add abstraction",
          "Focus on solving actual problems"
        ],
        "scoreWeight": 0.4,
        "isCommonMistake": true,
        "mentorExplanation": "Complexity is easy; simplicity is hard. Build for today's requirements, not imagined future ones. Every abstraction layer you add is cognitive overhead for everyone. YAGNI (You Aren't Gonna Need It) isn't about being lazy - it's about being pragmatic.",
        "resources": [
          {
            "title": "YAGNI Principle",
            "url": "https://martinfowler.com/bliki/Yagni.html",
            "type": "article"
          },
          {
            "title": "Simple Made Easy",
            "url": "https://www.infoq.com/presentations/Simple-Made-Easy/",
            "type": "video",
            "description": "Classic Rich Hickey talk"
          }
        ]
      }
    ]
  },
  {
    "id": "e0d51655-1cb4-43f2-85d2-edc1bac181a2",
    "title": "How do you stay current with industry trends and best practices? (Select all that apply)",
    "category": "Learning & Growth",
    "type": "checkbox",
    "hint": "The best developers continuously learn through multiple channels",
    "allowOther": true,
    "options": [
      {
        "value": "practice",
        "label": "Build side projects",
        "recommendations": [
          "Share projects publicly",
          "Try new technologies",
          "Build to solve real problems"
        ],
        "scoreWeight": 0.2,
        "mentorExplanation": "Side projects let you experiment without consequences. Try risky things, fail fast, learn what works. Building in public adds accountability and networking. Your side project might become your next job.",
        "resources": [
          {
            "title": "Project Ideas",
            "url": "https://github.com/florinpop17/app-ideas",
            "type": "github"
          },
          {
            "title": "Build in Public",
            "url": "https://www.indiehackers.com/group/build-in-public",
            "type": "article"
          }
        ]
      },
      {
        "value": "opensource",
        "label": "Contribute to open source",
        "recommendations": [
          "Start with documentation",
          "Fix bugs in tools you use",
          "Build your portfolio"
        ],
        "scoreWeight": 0.25,
        "mentorExplanation": "Open source shows you production codebases and gets you feedback from experienced developers. Start small - docs, typos, good-first-issues. Even small PRs build confidence and reputation.",
        "resources": [
          {
            "title": "First Contributions",
            "url": "https://github.com/firstcontributions/first-contributions",
            "type": "github"
          },
          {
            "title": "Open Source Guide",
            "url": "https://opensource.guide/",
            "type": "docs"
          }
        ]
      },
      {
        "value": "documentation",
        "label": "Read official documentation and RFCs",
        "recommendations": [
          "Read change logs",
          "Understand core concepts",
          "Contribute to docs"
        ],
        "scoreWeight": 0.2,
        "mentorExplanation": "Docs are the source of truth everyone skips. Reading them catches nuances blog posts miss. RFCs show you where technology is heading before it ships. Make this a habit.",
        "resources": [
          {
            "title": "MDN Web Docs",
            "url": "https://developer.mozilla.org/",
            "type": "docs"
          },
          {
            "title": "TC39 Proposals",
            "url": "https://github.com/tc39/proposals",
            "type": "github",
            "description": "JavaScript proposals"
          },
          {
            "title": "IETF RFCs",
            "url": "https://www.ietf.org/standards/rfcs/",
            "type": "docs"
          }
        ]
      },
      {
        "value": "conferences",
        "label": "Attend conferences or meetups",
        "recommendations": [
          "Network with other developers",
          "Present at local meetups",
          "Share learnings with team"
        ],
        "scoreWeight": 0.2,
        "mentorExplanation": "Conferences expose you to new ideas and people working on different problems. The hallway track (conversations between talks) is often more valuable than the talks. Virtual events count too.",
        "resources": [
          {
            "title": "Meetup.com",
            "url": "https://www.meetup.com/",
            "type": "article"
          },
          {
            "title": "Conference Talk Ideas",
            "url": "https://speaking.io/",
            "type": "docs"
          }
        ]
      },
      {
        "value": "books",
        "label": "Read programming and software engineering books",
        "recommendations": [
          "Read classics and new releases",
          "Discuss with reading groups",
          "Apply concepts immediately"
        ],
        "scoreWeight": 0.18,
        "mentorExplanation": "Books go deeper than articles. Classic books (Clean Code, Pragmatic Programmer) stay relevant for decades. Take notes, highlight, discuss with others. One good book beats a hundred blog posts.",
        "resources": [
          {
            "title": "Developer Reading List",
            "url": "https://github.com/mr-mig/every-programmer-should-know",
            "type": "github"
          }
        ]
      },
      {
        "value": "blogs",
        "label": "Read tech blogs and articles regularly",
        "recommendations": [
          "Create a curated reading list",
          "Share interesting articles with team"
        ],
        "scoreWeight": 0.15,
        "mentorExplanation": "Blogs keep you current on trends and techniques. Don't just consume - take notes, try examples, share what resonates. Build a curated list of quality sources; most content is noise.",
        "resources": [
          {
            "title": "Developer Blog List",
            "url": "https://github.com/kilimchoi/engineering-blogs",
            "type": "github"
          },
          {
            "title": "Dev.to Community",
            "url": "https://dev.to/",
            "type": "article"
          }
        ]
      },
      {
        "value": "pair-learning",
        "label": "Pair program or mob code with colleagues",
        "recommendations": [
          "Schedule regular pairing sessions",
          "Rotate pairing partners",
          "Reflect after sessions"
        ],
        "scoreWeight": 0.22,
        "mentorExplanation": "Pairing transfers knowledge faster than any other method. You absorb techniques unconsciously by watching someone work. It's also the best way to learn a new codebase or technology quickly.",
        "resources": [
          {
            "title": "Pair Programming Guide",
            "url": "https://www.martinfowler.com/articles/on-pair-programming.html",
            "type": "article"
          }
        ]
      },
      {
        "value": "courses",
        "label": "Take online courses",
        "recommendations": [
          "Complete course projects",
          "Apply learnings to real work",
          "Mix free and paid courses"
        ],
        "scoreWeight": 0.18,
        "mentorExplanation": "Courses structure your learning and fill knowledge gaps. The key is finishing what you start and building something with it. Passive watching teaches less than active doing.",
        "resources": [
          {
            "title": "freeCodeCamp",
            "url": "https://www.freecodecamp.org/",
            "type": "course"
          }
        ]
      },
      {
        "value": "youtube",
        "label": "Watch technical videos and tutorials",
        "recommendations": [
          "Follow quality channels",
          "Build along with tutorials",
          "Take notes and reference later"
        ],
        "scoreWeight": 0.15,
        "mentorExplanation": "Videos work for visual learning, but watch actively - pause, try things, build along. Speed up playback to 1.5-2x and take notes. Don't just collect videos to watch later; actually watch them.",
        "resources": [
          {
            "title": "Fireship",
            "url": "https://www.youtube.com/@Fireship",
            "type": "video"
          },
          {
            "title": "Traversy Media",
            "url": "https://www.youtube.com/@TraversyMedia",
            "type": "video"
          },
          {
            "title": "The Primeagen",
            "url": "https://www.youtube.com/@ThePrimeagen",
            "type": "video"
          }
        ]
      },
      {
        "value": "newsletters",
        "label": "Subscribe to tech newsletters",
        "recommendations": [
          "Curate your subscriptions",
          "Archive and review weekly",
          "Share interesting finds"
        ],
        "scoreWeight": 0.13,
        "mentorExplanation": "Newsletters deliver curated content without the social media noise. But don't just hoard them - read and act. Unsubscribe from ones you skip consistently. Quality over quantity.",
        "resources": [
          {
            "title": "JavaScript Weekly",
            "url": "https://javascriptweekly.com/",
            "type": "article"
          },
          {
            "title": "Node Weekly",
            "url": "https://nodeweekly.com/",
            "type": "article"
          }
        ]
      },
      {
        "value": "research-papers",
        "label": "Read academic papers and research",
        "recommendations": [
          "Use Papers With Code for practical papers",
          "Join paper reading groups",
          "Implement algorithms from papers"
        ],
        "scoreWeight": 0.23,
        "mentorExplanation": "Papers contain bleeding-edge ideas before they hit blogs. Start with classics - MapReduce, Dynamo, Attention Is All You Need. Papers With Code links papers to implementations, making them practical.",
        "resources": [
          {
            "title": "Papers With Code",
            "url": "https://paperswithcode.com/",
            "type": "article"
          },
          {
            "title": "The Morning Paper",
            "url": "https://blog.acolyer.org/",
            "type": "article",
            "description": "CS paper summaries"
          }
        ]
      },
      {
        "value": "podcasts",
        "label": "Listen to tech podcasts",
        "recommendations": [
          "Take notes on key insights",
          "Explore topics mentioned",
          "Share episodes with team"
        ],
        "scoreWeight": 0.12,
        "mentorExplanation": "Podcasts fill dead time - commutes, workouts, chores. But listen actively; take notes on interesting points and follow up. Passive listening is entertainment, not learning.",
        "resources": [
          {
            "title": "Software Engineering Daily",
            "url": "https://softwareengineeringdaily.com/",
            "type": "article"
          },
          {
            "title": "Syntax.fm",
            "url": "https://syntax.fm/",
            "type": "article"
          },
          {
            "title": "JavaScript Jabber",
            "url": "https://javascriptjabber.com/",
            "type": "article"
          }
        ]
      },
      {
        "value": "twitter",
        "label": "Follow developers and tech leaders on social media",
        "recommendations": [
          "Engage in discussions",
          "Share your insights",
          "Build your network"
        ],
        "scoreWeight": 0.12,
        "mentorExplanation": "Social media can be noisy but following the right people gives industry pulse. Engage, don't just lurk - comment, share, discuss. Build relationships, not just follower counts.",
        "resources": [
          {
            "title": "Developer Twitter List",
            "url": "https://twitter.com/i/lists",
            "type": "article"
          },
          {
            "title": "Engage on LinkedIn",
            "url": "https://www.linkedin.com/",
            "type": "article"
          }
        ]
      },
      {
        "value": "none",
        "label": "I don't actively follow trends",
        "recommendations": [
          "Subscribe to tech newsletters",
          "Join developer communities",
          "Start small - follow 3-5 good sources"
        ],
        "scoreWeight": 0,
        "mentorExplanation": "Tech moves fast. Not learning means falling behind. Start small: pick ONE thing from this list. Even 15 minutes daily compounds over time. What you learned a year ago is already outdated in some areas.",
        "resources": [
          {
            "title": "Developer Communities",
            "url": "https://dev.to/",
            "type": "article"
          }
        ]
      }
    ]
  },
  {
    "id": "330679bb-4fe0-4766-9844-bf652869b0cb",
    "title": "How comfortable are you with documenting your code and technical decisions?",
    "category": "Communication",
    "type": "multiple-choice",
    "hint": "Good documentation is a gift to your future self and your teammates",
    "allowOther": true,
    "options": [
      {
        "value": "advocate",
        "label": "I advocate for and maintain documentation standards",
        "recommendations": [
          "Build documentation culture",
          "Create documentation automation",
          "Speak about documentation"
        ],
        "scoreWeight": 1,
        "isCorrect": true,
        "mentorExplanation": "Building documentation culture is rare and valuable. You understand that docs multiply team productivity. The teams that document well move faster, not slower. Keep advocating - this is leadership.",
        "resources": [
          {
            "title": "Building Docs Culture",
            "url": "https://www.writethedocs.org/guide/writing/beginners-guide-to-docs/",
            "type": "docs"
          },
          {
            "title": "Speaking About Docs",
            "url": "https://www.writethedocs.org/videos/",
            "type": "video"
          }
        ]
      },
      {
        "value": "basic",
        "label": "I document when required",
        "recommendations": [
          "Create README files for projects",
          "Document complex logic",
          "Learn about ADRs"
        ],
        "scoreWeight": 0.35,
        "isCommonMistake": true,
        "mentorExplanation": "Waiting to be required means you're treating docs as overhead. Shift the mindset: write docs because they make your code better. Explaining your code forces clarity. Start documenting decisions - why you chose this approach over that one.",
        "resources": [
          {
            "title": "Architecture Decision Records",
            "url": "https://adr.github.io/",
            "type": "docs"
          },
          {
            "title": "API Documentation Guide",
            "url": "https://idratherbewriting.com/learnapidoc/",
            "type": "docs"
          }
        ]
      },
      {
        "value": "thorough",
        "label": "I write thorough documentation including ADRs",
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
        "isCorrect": true,
        "mentorExplanation": "ADRs are underused and powerful. They capture context that disappears otherwise - why you made this trade-off, what you considered, what you learned. Six months later when someone questions the decision, the ADR tells the story. Solid practice.",
        "resources": [
          {
            "title": "Markdown Guide",
            "url": "https://www.markdownguide.org/",
            "type": "docs"
          },
          {
            "title": "Docusaurus",
            "url": "https://docusaurus.io/",
            "type": "docs",
            "description": "Documentation site generator"
          }
        ]
      },
      {
        "value": "minimal",
        "label": "I write minimal or no documentation",
        "recommendations": [
          "Learn documentation best practices",
          "Start with inline code comments",
          "Write README files"
        ],
        "scoreWeight": 0.15,
        "mentorExplanation": "The code is never enough. Three months from now, you won't remember why you did something that way. Start small: write why, not what. Explain complex logic before you forget the reasoning. Document decisions and trade-offs - that context evaporates fast.",
        "resources": [
          {
            "title": "Write the Docs Guide",
            "url": "https://www.writethedocs.org/guide/",
            "type": "docs"
          },
          {
            "title": "Code Documentation Best Practices",
            "url": "https://stackoverflow.blog/2021/12/23/best-practices-for-writing-code-comments/",
            "type": "article"
          },
          {
            "title": "README Template",
            "url": "https://github.com/othneildrew/Best-README-Template",
            "type": "github"
          }
        ]
      },
      {
        "value": "regular",
        "label": "I regularly document my code and decisions",
        "recommendations": [
          "Establish documentation standards",
          "Create technical guides",
          "Share documentation practices"
        ],
        "scoreWeight": 0.6,
        "isCorrect": true,
        "mentorExplanation": "Regular documentation means you get it: code shows how, docs show why. Keep this habit and help standardize it across your team. Document for the developer who inherits this code in a year - that might be you.",
        "resources": [
          {
            "title": "Technical Writing Courses",
            "url": "https://developers.google.com/tech-writing",
            "type": "course"
          },
          {
            "title": "Docs as Code",
            "url": "https://www.writethedocs.org/guide/docs-as-code/",
            "type": "docs"
          }
        ]
      }
    ]
  },
  {
    "id": "99f46af2-89d3-41e8-8b66-b0128df80c79",
    "title": "How comfortable are you with data structures and algorithms?",
    "category": "Data Structures & Algorithms",
    "type": "multiple-choice",
    "hint": "Understanding DS&A helps you choose the right tool and optimize performance",
    "allowOther": true,
    "options": [
      {
        "value": "intermediate",
        "label": "I understand complexity and use appropriate structures for tasks",
        "recommendations": [
          "Study advanced algorithms",
          "Practice solving medium problems",
          "Learn dynamic programming"
        ],
        "scoreWeight": 0.6,
        "isCorrect": true,
        "mentorExplanation": "You can choose the right structure for the job - hash map vs array, when to use a set, etc. Next level: study classic algorithms (binary search, graph traversal, dynamic programming). They show up more than you'd think in real work.",
        "resources": [
          {
            "title": "LeetCode Patterns",
            "url": "https://seanprashad.com/leetcode-patterns/",
            "type": "article"
          },
          {
            "title": "NeetCode",
            "url": "https://neetcode.io/",
            "type": "article"
          }
        ]
      },
      {
        "value": "basics-only",
        "label": "I know basic arrays and loops",
        "recommendations": [
          "Study common data structures",
          "Learn Big O notation",
          "Practice on platforms like LeetCode"
        ],
        "scoreWeight": 0.15,
        "mentorExplanation": "Arrays and loops get you started. Next: learn when to reach for hash maps, sets, or queues. Understanding Big O helps you spot performance issues before they happen. These fundamentals matter in real code, not just interviews.",
        "resources": [
          {
            "title": "JavaScript Algorithms",
            "url": "https://github.com/trekhleb/javascript-algorithms",
            "type": "github"
          },
          {
            "title": "Big O Cheat Sheet",
            "url": "https://www.bigocheatsheet.com/",
            "type": "docs"
          },
          {
            "title": "FreeCodeCamp DS&A",
            "url": "https://www.youtube.com/watch?v=8hly31xKli0",
            "type": "video"
          }
        ]
      },
      {
        "value": "expert",
        "label": "I solve complex algorithmic problems and can teach others",
        "recommendations": [
          "Participate in competitions",
          "Mentor others",
          "Share knowledge through content"
        ],
        "scoreWeight": 1,
        "isCorrect": true,
        "mentorExplanation": "Deep algorithmic knowledge is rare. You can design efficient solutions and explain the trade-offs. Share this - write about complex problems you've solved, mentor teammates on optimization, create learning resources.",
        "resources": [
          {
            "title": "Competitive Programmer's Handbook",
            "url": "https://cses.fi/book/book.pdf",
            "type": "book"
          }
        ]
      },
      {
        "value": "some-knowledge",
        "label": "I know some structures (maps, sets) but don't understand complexity",
        "recommendations": [
          "Learn Big O notation deeply",
          "Study algorithm complexity",
          "Practice problem-solving"
        ],
        "scoreWeight": 0.35,
        "isCommonMistake": true,
        "mentorExplanation": "Knowing which structures exist is good, but understanding their performance characteristics is critical. That nested loop in a loop? That's O(n²) - fine for 100 items, disaster for 10,000. Learn to analyze your code's complexity.",
        "resources": [
          {
            "title": "Big O Notation Explained",
            "url": "https://www.freecodecamp.org/news/big-o-notation-why-it-matters-and-why-it-doesnt-1674cfa8a23c/",
            "type": "article"
          },
          {
            "title": "Algorithm Complexity",
            "url": "https://www.youtube.com/watch?v=D6xkbGLQesk",
            "type": "video"
          }
        ]
      },
      {
        "value": "advanced",
        "label": "I can implement common algorithms and optimize code performance",
        "recommendations": [
          "Study advanced DS&A",
          "Learn system optimization",
          "Practice hard problems"
        ],
        "scoreWeight": 0.8,
        "isCorrect": true,
        "mentorExplanation": "Strong algorithmic skills. You can implement sorting, searching, and optimize performance-critical code. You make trade-offs between time and space complexity consciously. Keep practicing - these skills compound.",
        "resources": [
          {
            "title": "Competitive Programming",
            "url": "https://cp-algorithms.com/",
            "type": "docs"
          }
        ]
      }
    ]
  },
  {
    "id": "38367578-2634-4c19-9cc4-60326ef18581",
    "title": "How would you rate your Git and version control skills?",
    "category": "Version Control & Git",
    "type": "multiple-choice",
    "hint": "Git is more than commits - it's about collaboration, history, and workflow",
    "allowOther": true,
    "options": [
      {
        "value": "workflows",
        "label": "I understand Git workflows (GitFlow, trunk-based) and use them effectively",
        "recommendations": [
          "Learn advanced Git commands",
          "Study commit message best practices",
          "Master Git hooks"
        ],
        "scoreWeight": 0.6,
        "isCorrect": true,
        "mentorExplanation": "Understanding workflows means you think beyond your local changes. You know how your team collaborates and why. Good commit messages tell a story - treat them as documentation. Git hooks automate quality checks.",
        "resources": [
          {
            "title": "Conventional Commits",
            "url": "https://www.conventionalcommits.org/",
            "type": "docs"
          },
          {
            "title": "Git Hooks Tutorial",
            "url": "https://githooks.com/",
            "type": "docs"
          },
          {
            "title": "GitFlow vs Trunk-Based",
            "url": "https://www.youtube.com/watch?v=gW6dFpTMk8s",
            "type": "video"
          }
        ]
      },
      {
        "value": "branching",
        "label": "I use branches and can resolve simple merge conflicts",
        "recommendations": [
          "Learn Git rebase",
          "Study cherry-picking",
          "Master conflict resolution"
        ],
        "scoreWeight": 0.35,
        "mentorExplanation": "Branches enable parallel work without stepping on toes. Now learn the powerful stuff: rebase for clean history, cherry-pick for selective merges, reflog for when you think you've lost work (you haven't - Git rarely loses anything).",
        "resources": [
          {
            "title": "Git Rebase Explained",
            "url": "https://www.youtube.com/watch?v=f1wnYdLEpgI",
            "type": "video"
          },
          {
            "title": "Advanced Git",
            "url": "https://www.atlassian.com/git/tutorials/advanced-overview",
            "type": "docs"
          },
          {
            "title": "Oh Shit, Git!",
            "url": "https://ohshitgit.com/",
            "type": "article",
            "description": "How to fix common Git mistakes"
          }
        ]
      },
      {
        "value": "expert",
        "label": "I understand Git internals and can solve complex repository issues",
        "recommendations": [
          "Share Git expertise through content",
          "Create custom Git tools",
          "Mentor teams on Git strategies"
        ],
        "scoreWeight": 1,
        "isCorrect": true,
        "mentorExplanation": "You understand Git's object model - commits, trees, blobs. You can fix corrupted repos, untangle complex histories, optimize large repositories. This depth is rare. Share it - write about tricky Git problems you've solved, build tools, teach others.",
        "resources": [
          {
            "title": "Git from the Bottom Up",
            "url": "https://jwiegley.github.io/git-from-the-bottom-up/",
            "type": "article"
          },
          {
            "title": "Git Magic",
            "url": "http://www-cs-students.stanford.edu/~blynn/gitmagic/",
            "type": "book"
          },
          {
            "title": "Advanced Git Techniques",
            "url": "https://www.youtube.com/watch?v=qsTthZi23VE",
            "type": "video"
          }
        ]
      },
      {
        "value": "basic-commands",
        "label": "I use basic commands (add, commit, push, pull)",
        "recommendations": [
          "Learn branching strategies",
          "Study Git workflows",
          "Practice merge conflict resolution"
        ],
        "scoreWeight": 0.15,
        "mentorExplanation": "Basic commands get you started. Git's real power is in branching - think of branches as save points in a game. Learn to merge and resolve conflicts. Understand that Git is designed for collaboration, not just version control.",
        "resources": [
          {
            "title": "Pro Git Book",
            "url": "https://git-scm.com/book/en/v2",
            "type": "book",
            "description": "Free comprehensive Git guide"
          },
          {
            "title": "Learn Git Branching",
            "url": "https://learngitbranching.js.org/",
            "type": "article",
            "description": "Interactive Git tutorial"
          },
          {
            "title": "Git Workflows",
            "url": "https://www.atlassian.com/git/tutorials/comparing-workflows",
            "type": "docs"
          }
        ]
      },
      {
        "value": "advanced",
        "label": "I use advanced features (rebase, bisect, reflog) and teach others",
        "recommendations": [
          "Establish team Git standards",
          "Create Git workshops",
          "Automate with Git hooks"
        ],
        "scoreWeight": 0.8,
        "isCorrect": true,
        "mentorExplanation": "Git power user. Bisect finds which commit broke things (binary search through history). Reflog recovers 'lost' commits. Rebase rewrites history cleanly. These tools separate competent from expert. Many developers fear Git - help them master it.",
        "resources": [
          {
            "title": "Git Bisect Guide",
            "url": "https://www.metaltoad.com/blog/beginners-guide-git-bisect-process-elimination",
            "type": "article"
          },
          {
            "title": "Git Internals",
            "url": "https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain",
            "type": "docs"
          },
          {
            "title": "Building Better Teams with Git",
            "url": "https://www.youtube.com/watch?v=duqBHik7nRo",
            "type": "video"
          }
        ]
      }
    ]
  },
  {
    "id": "72f9c279-5437-4a56-bfd5-0d12c69efbfd",
    "title": "How do you approach performance optimization in your applications?",
    "category": "Problem Solving & Debugging",
    "type": "multiple-choice",
    "hint": "Premature optimization is bad, but ignoring performance is worse. Balance is key.",
    "allowOther": true,
    "options": [
      {
        "value": "proactive",
        "label": "I proactively optimize and set performance budgets",
        "recommendations": [
          "Establish performance culture",
          "Build performance monitoring",
          "Share optimization knowledge"
        ],
        "scoreWeight": 0.8,
        "isCorrect": true,
        "mentorExplanation": "Performance budgets prevent regressions before they ship. You're treating performance as a feature, not an afterthought. Keep sharing wins - when the team sees load time cut in half, performance becomes valued.",
        "resources": [
          {
            "title": "Building Performance Culture",
            "url": "https://www.youtube.com/watch?v=FEs2jgZBaQA",
            "type": "video"
          },
          {
            "title": "Performance Monitoring",
            "url": "https://web.dev/vitals/",
            "type": "docs"
          },
          {
            "title": "High Performance Browser Networking",
            "url": "https://hpbn.co/",
            "type": "book"
          }
        ]
      },
      {
        "value": "dont-think",
        "label": "I don't usually think about performance until there's a problem",
        "recommendations": [
          "Learn performance fundamentals",
          "Study common bottlenecks",
          "Use browser DevTools"
        ],
        "scoreWeight": 0.15,
        "isCommonMistake": true,
        "mentorExplanation": "Performance impacts real users. Slow apps lose customers - Amazon found 100ms latency costs 1% of sales. You don't need to micro-optimize, but learn to spot issues: O(n²) loops, unnecessary re-renders, huge bundles. DevTools show where time actually goes.",
        "resources": [
          {
            "title": "Web Performance Fundamentals",
            "url": "https://web.dev/learn-web-vitals/",
            "type": "docs"
          },
          {
            "title": "Chrome DevTools Performance",
            "url": "https://developer.chrome.com/docs/devtools/performance/",
            "type": "docs"
          },
          {
            "title": "Why Performance Matters",
            "url": "https://web.dev/why-speed-matters/",
            "type": "article"
          }
        ]
      },
      {
        "value": "expert",
        "label": "I architect systems for performance and lead optimization initiatives",
        "recommendations": [
          "Speak about performance",
          "Create performance tooling",
          "Scale performance practices"
        ],
        "scoreWeight": 1,
        "isCorrect": true,
        "mentorExplanation": "You architect with performance in mind from the start. Your decisions - caching layers, CDN strategy, database indexes - impact millions of requests. Performance engineering is underrepresented in content. Share what you know.",
        "resources": [
          {
            "title": "Designing for Performance",
            "url": "https://designingforperformance.com/",
            "type": "book"
          },
          {
            "title": "Performance at Scale",
            "url": "https://www.youtube.com/watch?v=VaNTXw5udmA",
            "type": "video"
          }
        ]
      },
      {
        "value": "reactive",
        "label": "I optimize when users complain or metrics show issues",
        "recommendations": [
          "Learn to measure performance",
          "Study optimization patterns",
          "Set performance budgets"
        ],
        "scoreWeight": 0.35,
        "mentorExplanation": "Reactive optimization means users already suffered through slowness. Shift left: measure in dev, set budgets, catch regressions in CI. Lighthouse scores in pull requests prevent problems before deployment. 'If you can't measure it, you can't improve it.'",
        "resources": [
          {
            "title": "Web Performance Metrics",
            "url": "https://web.dev/metrics/",
            "type": "docs"
          },
          {
            "title": "Performance Budgets",
            "url": "https://web.dev/performance-budgets-101/",
            "type": "article"
          },
          {
            "title": "Lighthouse Guide",
            "url": "https://developer.chrome.com/docs/lighthouse/overview/",
            "type": "docs"
          }
        ]
      },
      {
        "value": "conscious",
        "label": "I consider performance while coding and use profiling tools",
        "recommendations": [
          "Master advanced optimization techniques",
          "Learn caching strategies",
          "Study render optimization"
        ],
        "scoreWeight": 0.6,
        "isCorrect": true,
        "mentorExplanation": "You measure before optimizing - that's the right approach. Profiling reveals the actual bottleneck, not what you assume. Next: code splitting, lazy loading, memoization, HTTP caching. Small improvements compound.",
        "resources": [
          {
            "title": "Web Performance Optimization",
            "url": "https://www.youtube.com/watch?v=AQqFZ5t8uNc",
            "type": "video"
          },
          {
            "title": "React Performance",
            "url": "https://kentcdodds.com/blog/fix-the-slow-render-before-you-fix-the-re-render",
            "type": "article"
          }
        ]
      }
    ]
  },
  {
    "id": "c072811f-f8b9-4476-8d48-24eaeb750800",
    "title": "What's your experience with CI/CD pipelines and DevOps practices?",
    "category": "Technical Skills",
    "type": "multiple-choice",
    "hint": "DevOps bridges development and operations - automate testing, deployment, monitoring",
    "allowOther": true,
    "options": [
      {
        "value": "configure",
        "label": "I can configure and maintain CI/CD pipelines",
        "recommendations": [
          "Learn infrastructure as code",
          "Study deployment strategies",
          "Master monitoring and logging"
        ],
        "scoreWeight": 0.6,
        "isCorrect": true,
        "mentorExplanation": "You understand the development pipeline end-to-end. Next level: infrastructure as code (Terraform treats infra like code), deployment strategies (blue-green eliminates downtime), observability (logs and metrics show what's actually happening in prod).",
        "resources": [
          {
            "title": "Terraform Tutorial",
            "url": "https://developer.hashicorp.com/terraform/tutorials",
            "type": "docs"
          },
          {
            "title": "Deployment Strategies",
            "url": "https://www.youtube.com/watch?v=AWVTKBUnoIg",
            "type": "video"
          }
        ]
      },
      {
        "value": "use-existing",
        "label": "I use existing CI/CD pipelines but don't configure them",
        "recommendations": [
          "Learn pipeline configuration",
          "Study different CI/CD tools",
          "Create your own pipeline"
        ],
        "scoreWeight": 0.32,
        "mentorExplanation": "Using pipelines is fine, but understanding how they work helps when they break (and they will). Knowing how builds, tests, and deployments connect helps you debug faster. Set up a GitHub Action for a side project - it's simpler than you think.",
        "resources": [
          {
            "title": "Jenkins Tutorial",
            "url": "https://www.jenkins.io/doc/tutorials/",
            "type": "docs"
          },
          {
            "title": "CI/CD Pipeline Design",
            "url": "https://www.youtube.com/watch?v=WnhcAR1YgS8",
            "type": "video"
          }
        ]
      },
      {
        "value": "expert",
        "label": "I architect complete DevOps solutions and lead platform engineering",
        "recommendations": [
          "Share DevOps knowledge",
          "Build developer platforms",
          "Speak at conferences"
        ],
        "scoreWeight": 1,
        "isCorrect": true,
        "mentorExplanation": "Platform engineering - building internal developer platforms that let teams ship independently. Your work multiplies everyone's productivity. This expertise is in high demand. Share it - write, speak, build tools.",
        "resources": [
          {
            "title": "Platform Engineering",
            "url": "https://platformengineering.org/",
            "type": "docs"
          },
          {
            "title": "Site Reliability Engineering",
            "url": "https://sre.google/books/",
            "type": "book",
            "description": "Free Google SRE books"
          },
          {
            "title": "DevOps at Scale",
            "url": "https://www.youtube.com/watch?v=WnhcAR1YgS8",
            "type": "video"
          }
        ]
      },
      {
        "value": "advanced",
        "label": "I design deployment strategies and implement infrastructure as code",
        "recommendations": [
          "Study Kubernetes",
          "Learn observability",
          "Advocate for DevOps practices"
        ],
        "scoreWeight": 0.8,
        "isCorrect": true,
        "mentorExplanation": "You bridge dev and ops effectively. Infrastructure as code, blue-green deployments, rollback strategies - you're enabling safe, fast shipping. Many developers fear this stuff. Share your knowledge, make deployments less scary.",
        "resources": [
          {
            "title": "Kubernetes Tutorial",
            "url": "https://kubernetes.io/docs/tutorials/",
            "type": "docs"
          },
          {
            "title": "Cloud Native DevOps",
            "url": "https://www.youtube.com/watch?v=gH5cMLWwOxw",
            "type": "video"
          }
        ]
      },
      {
        "value": "no-experience",
        "label": "Little to no experience with CI/CD",
        "recommendations": [
          "Learn CI/CD basics",
          "Study deployment strategies",
          "Set up a simple pipeline"
        ],
        "scoreWeight": 0.15,
        "mentorExplanation": "CI/CD isn't just 'operations stuff' - it changes how you develop. Automated tests on every commit catch bugs early. Push-button deploys eliminate manual errors. Start simple: run tests automatically. The confidence boost is immediate.",
        "resources": [
          {
            "title": "CI/CD Explained",
            "url": "https://www.youtube.com/watch?v=scEDHsr3APg",
            "type": "video"
          },
          {
            "title": "GitHub Actions Tutorial",
            "url": "https://docs.github.com/en/actions/quickstart",
            "type": "docs"
          },
          {
            "title": "CI/CD Best Practices",
            "url": "https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment",
            "type": "article"
          }
        ]
      }
    ]
  },
  {
    "id": "45cfd434-ca62-428d-bfec-b8449de9b8a6",
    "title": "How do you typically approach solving a new technical problem?",
    "category": "Problem Solving & Debugging",
    "type": "multiple-choice",
    "hint": "Your problem-solving process matters as much as the solution",
    "allowOther": true,
    "options": [
      {
        "value": "systematic",
        "label": "I use systematic approaches: break down, research, prototype, iterate",
        "recommendations": [
          "Learn advanced problem-solving patterns",
          "Study design patterns",
          "Mentor others in problem-solving"
        ],
        "scoreWeight": 0.8,
        "isCorrect": true,
        "mentorExplanation": "Systematic problem-solving: break it down, research similar problems, prototype quickly, iterate. That's professional engineering. Your process is as valuable as your code. Teach others - many developers skip straight to coding and waste time.",
        "resources": [
          {
            "title": "Design Thinking Process",
            "url": "https://www.interaction-design.org/literature/article/5-stages-in-the-design-thinking-process",
            "type": "article"
          },
          {
            "title": "Rapid Prototyping",
            "url": "https://www.youtube.com/watch?v=JMjozqJS44M",
            "type": "video"
          }
        ]
      },
      {
        "value": "google-copy",
        "label": "Search for solutions and adapt code I find",
        "recommendations": [
          "Understand before copying",
          "Build problem-solving skills",
          "Learn underlying concepts"
        ],
        "scoreWeight": 0.35,
        "isCommonMistake": true,
        "mentorExplanation": "Searching is smart. Blindly copying code you don't understand is not. What happens when you hit a similar problem and Stack Overflow doesn't have the exact answer? Understand WHY solutions work. Build mental models, not code collections.",
        "resources": []
      },
      {
        "value": "holistic",
        "label": "I consider trade-offs, constraints, and impact before proposing solutions",
        "recommendations": [
          "Share problem-solving frameworks",
          "Mentor in technical decision-making",
          "Write about your process"
        ],
        "scoreWeight": 1,
        "isCorrect": true,
        "mentorExplanation": "Engineering, not just coding. You consider trade-offs (speed vs maintainability), constraints (time, resources, existing tech), impact (users, team, business). There's no perfect solution, only appropriate ones. This thinking is leadership.",
        "resources": [
          {
            "title": "Technical Decision Making",
            "url": "https://www.youtube.com/watch?v=jsNnlu0B1-0",
            "type": "video"
          },
          {
            "title": "Architecture Decision Records",
            "url": "https://adr.github.io/",
            "type": "docs"
          }
        ]
      },
      {
        "value": "trial-error",
        "label": "Trial and error until something works",
        "recommendations": [
          "Learn systematic problem-solving",
          "Study debugging strategies",
          "Practice breaking down problems"
        ],
        "scoreWeight": 0.15,
        "isCommonMistake": true,
        "mentorExplanation": "Random trial and error is slow and frustrating. Learn systematic approaches: understand the problem, break it down, form hypotheses, test them methodically. Rubber duck debugging (explaining the problem out loud) often reveals the solution.",
        "resources": [
          {
            "title": "How to Think Like a Programmer",
            "url": "https://www.freecodecamp.org/news/how-to-think-like-a-programmer-lessons-in-problem-solving-d1d8bf1de7d2/",
            "type": "article"
          },
          {
            "title": "Problem Solving Techniques",
            "url": "https://www.youtube.com/watch?v=azcrPFhaY9k",
            "type": "video"
          }
        ]
      },
      {
        "value": "understand-first",
        "label": "I try to understand the problem fully before coding",
        "recommendations": [
          "Learn design thinking",
          "Practice problem decomposition",
          "Study algorithmic thinking"
        ],
        "scoreWeight": 0.6,
        "isCorrect": true,
        "mentorExplanation": "Understanding the problem is half the battle. 'Weeks of coding can save hours of planning.' Write down the problem, identify constraints, consider edge cases before touching code. Many bugs come from solving the wrong problem.",
        "resources": [
          {
            "title": "How to Solve It",
            "url": "https://www.amazon.com/How-Solve-Mathematical-Princeton-Science/dp/069116407X",
            "type": "book",
            "description": "Classic problem-solving book"
          },
          {
            "title": "Algorithmic Thinking",
            "url": "https://www.youtube.com/watch?v=rL8X2mlNHPM",
            "type": "video"
          },
          {
            "title": "Problem Decomposition",
            "url": "https://www.freecodecamp.org/news/how-to-think-like-a-programmer-lessons-in-problem-solving-d1d8bf1de7d2/",
            "type": "article"
          }
        ]
      }
    ]
  },
  {
    "id": "71fa4b35-93c3-4016-8ea1-87871c0cb5af",
    "title": "How comfortable are you with pair programming and collaborative coding?",
    "category": "Collaboration",
    "type": "multiple-choice",
    "hint": "Pairing is a superpower - two minds catch bugs one mind misses, and knowledge spreads fast",
    "allowOther": true,
    "options": [
      {
        "value": "advocate",
        "label": "I actively advocate for pairing and lead pairing sessions",
        "recommendations": [
          "Create a team pairing schedule",
          "Run pairing retrospectives",
          "Mentor others on facilitating effective sessions"
        ],
        "scoreWeight": 0.8,
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
        "label": "I pair occasionally but prefer working alone",
        "recommendations": [
          "Schedule regular pairing sessions",
          "Try driver-navigator format",
          "Pair on the hardest problems"
        ],
        "scoreWeight": 0.35,
        "mentorExplanation": "Solo work has its place, but pairing on hard problems often cuts debugging time in half. Try driver-navigator: one codes, one navigates with fresh eyes. You'll catch bugs before they're written.",
        "resources": [
          {
            "title": "When to Pair Program",
            "url": "https://www.thoughtworks.com/insights/blog/pair-programming-considered-extremely-beneficial",
            "type": "article"
          }
        ]
      },
      {
        "value": "expert",
        "label": "I use pairing strategically to spread knowledge, onboard, and solve hardest problems",
        "recommendations": [
          "Run mob programming sessions",
          "Document pairing effectiveness",
          "Create pairing training for new hires"
        ],
        "scoreWeight": 1,
        "isCorrect": true,
        "mentorExplanation": "Strategic pairing - knowing when, who, and how to pair. Use it for onboarding (new person drives, experienced navigates). Hard problems (two brains better than one). Knowledge transfer (rotate pairs deliberately). This is leadership.",
        "resources": [
          {
            "title": "Mob Programming RPG",
            "url": "https://github.com/willemlarsen/mobprogrammingrpg",
            "type": "github"
          },
          {
            "title": "Strategic Pairing Guide",
            "url": "https://www.martinfowler.com/articles/on-pair-programming.html",
            "type": "article"
          }
        ]
      },
      {
        "value": "uncomfortable",
        "label": "I'm uncomfortable having others watch me code",
        "recommendations": [
          "Start with low-stakes pairing sessions",
          "Practice thinking out loud",
          "Reframe pairing as a learning opportunity"
        ],
        "scoreWeight": 0.15,
        "mentorExplanation": "Feeling vulnerable while someone watches you code is normal. But pairing isn't performance - it's thinking together. Your mistakes are valuable; they show your thought process. Start small: pair on a bug fix with someone you trust.",
        "resources": [
          {
            "title": "Guide to Pair Programming",
            "url": "https://www.martinfowler.com/articles/on-pair-programming.html",
            "type": "article"
          },
          {
            "title": "Thinking Out Loud",
            "url": "https://www.youtube.com/watch?v=1MiSHkBB5ps",
            "type": "video"
          }
        ]
      },
      {
        "value": "comfortable",
        "label": "I pair comfortably and find it productive",
        "recommendations": [
          "Learn mob programming",
          "Mentor less experienced developers through pairing",
          "Establish pairing norms for your team"
        ],
        "scoreWeight": 0.6,
        "isCorrect": true,
        "mentorExplanation": "Pairing is one of the fastest knowledge-transfer tools. Use it strategically: pair on hard problems, rotate partners to spread knowledge, pair experienced with junior developers. Make it intentional, not random.",
        "resources": [
          {
            "title": "Mob Programming",
            "url": "https://mobprogramming.org/",
            "type": "docs"
          },
          {
            "title": "Knowledge Sharing Through Pairing",
            "url": "https://martinfowler.com/articles/on-pair-programming.html#KnowledgeSharing",
            "type": "article"
          }
        ]
      }
    ]
  },
  {
    "id": "06e82c17-1a15-42ba-894d-24d9dedfad52",
    "title": "How well do you communicate technical concepts to non-technical stakeholders?",
    "category": "Communication",
    "type": "multiple-choice",
    "hint": "Translating complexity into clear business impact is a key senior developer skill",
    "allowOther": true,
    "options": [
      {
        "value": "competent",
        "label": "I adapt my language for the audience and convey technical trade-offs clearly",
        "recommendations": [
          "Level up to persuasive communication",
          "Learn to write compelling technical proposals",
          "Practice presenting to executives"
        ],
        "scoreWeight": 0.6,
        "isCorrect": true,
        "mentorExplanation": "Adapting language to your audience shows empathy. Next level: persuasion. When you need budget for tech debt, can you frame it as risk reduction? When proposing a new architecture, can you quantify the business impact? Frame technical work in business terms.",
        "resources": []
      },
      {
        "value": "basic",
        "label": "I can explain basics but lose non-technical people on complex topics",
        "recommendations": [
          "Practice structured storytelling",
          "Focus on business impact over technical details",
          "Use before/after scenarios"
        ],
        "scoreWeight": 0.35,
        "mentorExplanation": "Non-technical stakeholders care about outcomes, not implementation. Don't say 'We need to refactor the database layer.' Say 'This 2-week investment will cut customer-facing errors by 80%.' Lead with impact, not technical details.",
        "resources": [
          {
            "title": "Executive Communication",
            "url": "https://www.youtube.com/watch?v=Unzc731iCUY",
            "type": "video"
          }
        ]
      },
      {
        "value": "expert",
        "label": "I shape technical vision at an organizational level through compelling communication",
        "recommendations": [
          "Publish thought leadership content",
          "Speak at industry conferences",
          "Mentor leaders on technical communication"
        ],
        "scoreWeight": 1,
        "isCorrect": true,
        "mentorExplanation": "You shape organizational direction through communication. Your technical vision becomes company strategy because you translate it into business value. This is rare. Share this skill - write, speak publicly, mentor others.",
        "resources": [
          {
            "title": "CTO Communication Patterns",
            "url": "https://ctohb.com/",
            "type": "book"
          }
        ]
      },
      {
        "value": "struggle",
        "label": "I struggle to explain technical concepts in plain language",
        "recommendations": [
          "Practice the \"explain it to a 5-year-old\" technique",
          "Use analogies and visual aids",
          "Study technical writing basics"
        ],
        "scoreWeight": 0.15,
        "mentorExplanation": "Bridging technical and business worlds is one of the most valuable skills you can develop. Practice the Feynman Technique: explain concepts using simple language. If your audience needs a dictionary to understand you, you've lost them. Use analogies.",
        "resources": [
          {
            "title": "Feynman Technique",
            "url": "https://fs.blog/feynman-technique/",
            "type": "article"
          },
          {
            "title": "Technical Communication for Engineers",
            "url": "https://developers.google.com/tech-writing",
            "type": "course"
          }
        ]
      },
      {
        "value": "strong",
        "label": "I regularly present technical strategy to leadership and align it with business goals",
        "recommendations": [
          "Mentor engineers on stakeholder communication",
          "Develop your personal communication style",
          "Create communication guidelines for your team"
        ],
        "scoreWeight": 0.8,
        "isCorrect": true,
        "mentorExplanation": "You bridge technical-business effectively. This skill drives careers to staff/principal level. Help your team develop it - pair junior engineers with stakeholder communication opportunities. Make communication a core competency.",
        "resources": [
          {
            "title": "Staff Engineer Communication",
            "url": "https://staffeng.com/guides/staff-archetypes/",
            "type": "article"
          },
          {
            "title": "Engineering Manager Communication",
            "url": "https://leaddev.com/communication",
            "type": "article"
          }
        ]
      }
    ]
  },
  {
    "id": "6ba15a35-5d3d-44af-9d2d-fcfae7175aae",
    "title": "Which data structures do you understand well enough to implement and use in real code?",
    "category": "Data Structures & Algorithms",
    "type": "checkbox",
    "hint": "Knowing the right structure to use is a core engineering competency",
    "allowOther": true,
    "options": [
      {
        "value": "arrays-strings",
        "label": "Arrays and Strings",
        "recommendations": [
          "Master two-pointer and sliding window techniques",
          "Practice string manipulation problems"
        ],
        "scoreWeight": 0.1,
        "mentorExplanation": "Arrays are the foundation of everything! Two-pointer and sliding window patterns solve a huge class of problems efficiently. If you're comfortable here, you have the base.",
        "resources": [
          {
            "title": "Two Pointer Technique",
            "url": "https://www.youtube.com/watch?v=On03HWe2tZM",
            "type": "video"
          }
        ]
      },
      {
        "value": "hash-maps",
        "label": "Hash Maps / Hash Tables",
        "recommendations": [
          "Understand collision handling",
          "Know when O(1) lookup is critical",
          "Practice frequency counting patterns"
        ],
        "scoreWeight": 0.12,
        "mentorExplanation": "Hash maps are possibly the most useful data structure in everyday coding! Any time you need fast lookup, counting, or grouping - reach for a hash map. Master this and you'll solve 40% of LeetCode problems efficiently.",
        "resources": [
          {
            "title": "Hash Table Internals",
            "url": "https://www.youtube.com/watch?v=KyUTuwz_b7Q",
            "type": "video"
          },
          {
            "title": "Hash Map Patterns",
            "url": "https://neetcode.io/",
            "type": "article"
          }
        ]
      },
      {
        "value": "linked-lists",
        "label": "Linked Lists",
        "recommendations": [
          "Master fast/slow pointer technique",
          "Practice reversal patterns",
          "Understand when arrays beat linked lists"
        ],
        "scoreWeight": 0.1,
        "mentorExplanation": "Linked lists teach pointer/reference thinking that applies everywhere. Fast/slow pointers solve cycle detection elegantly. They're less common in production but critical for interviews and understanding memory.",
        "resources": [
          {
            "title": "Fast & Slow Pointers",
            "url": "https://www.youtube.com/watch?v=gBTe7lFR3vc",
            "type": "video"
          }
        ]
      },
      {
        "value": "stacks-queues",
        "label": "Stacks and Queues",
        "recommendations": [
          "Master monotonic stack patterns",
          "Understand BFS with queues",
          "Practice expression evaluation"
        ],
        "scoreWeight": 0.12,
        "mentorExplanation": "Stacks and queues are everywhere - undo/redo, browser history, BFS traversal. The monotonic stack pattern is underrated and solves hard problems elegantly. Once you see it, you see it everywhere.",
        "resources": [
          {
            "title": "Monotonic Stack Pattern",
            "url": "https://www.youtube.com/watch?v=Dq_ObZwTY_Q",
            "type": "video"
          }
        ]
      },
      {
        "value": "trees",
        "label": "Trees (Binary Trees, BSTs)",
        "recommendations": [
          "Master DFS recursion",
          "Practice tree traversals",
          "Understand BST invariants"
        ],
        "scoreWeight": 0.14,
        "mentorExplanation": "Trees are one of the most important structures! DFS recursion on trees is the template for a huge number of problems. Master the three traversals (pre/in/post-order) and you can solve most tree problems. BSTs appear in databases and file systems constantly.",
        "resources": [
          {
            "title": "Tree Recursion Mastery",
            "url": "https://www.youtube.com/watch?v=fAAZixBzIAI",
            "type": "video"
          }
        ]
      },
      {
        "value": "heaps",
        "label": "Heaps / Priority Queues",
        "recommendations": [
          "Practice Top-K problems",
          "Understand heap invariants",
          "Know when to use min vs max heap"
        ],
        "scoreWeight": 0.13,
        "mentorExplanation": "Heaps are the secret weapon for 'find the K largest/smallest' problems. They give you O(log n) insertion and O(1) access to the min/max. Task schedulers and graph algorithms (Dijkstra) use them heavily.",
        "resources": [
          {
            "title": "Heap Data Structure",
            "url": "https://www.youtube.com/watch?v=t0Cq6tVNRBA",
            "type": "video"
          },
          {
            "title": "Top-K Pattern",
            "url": "https://neetcode.io/problems/kth-largest-element-in-a-stream",
            "type": "article"
          }
        ]
      },
      {
        "value": "graphs",
        "label": "Graphs (BFS, DFS, shortest path)",
        "recommendations": [
          "Master BFS for shortest path",
          "Practice union-find",
          "Study Dijkstra and Bellman-Ford"
        ],
        "scoreWeight": 0.15,
        "mentorExplanation": "Graphs model almost every real-world problem: social networks, maps, dependency resolution, web crawling. BFS for shortest path in unweighted graphs, DFS for connectivity. Once you can model a problem as a graph, you have powerful algorithms at your disposal.",
        "resources": [
          {
            "title": "Graph Algorithms Course",
            "url": "https://www.youtube.com/watch?v=tWVWeAqZ0WU",
            "type": "video"
          },
          {
            "title": "Union-Find Explained",
            "url": "https://www.youtube.com/watch?v=ayW5B2W9hfo",
            "type": "video"
          }
        ]
      },
      {
        "value": "tries",
        "label": "Tries / Prefix Trees",
        "recommendations": [
          "Build an autocomplete system",
          "Implement a spell checker",
          "Study when tries beat hash maps"
        ],
        "scoreWeight": 0.12,
        "mentorExplanation": "Tries are specialized but incredibly powerful for string problems: autocomplete, spell check, IP routing. They can search by prefix in O(m) time where m is the prefix length - hash maps can't do that. Understanding tries shows you think about the right tool for the job.",
        "resources": [
          {
            "title": "Trie Data Structure",
            "url": "https://www.youtube.com/watch?v=oobqoCJlHA0",
            "type": "video"
          }
        ]
      },
      {
        "value": "dp-patterns",
        "label": "Dynamic Programming patterns",
        "recommendations": [
          "Start with memoization before tabulation",
          "Master 1D then 2D DP",
          "Study classic DP problems (knapsack, LCS, LIS)"
        ],
        "scoreWeight": 0.16,
        "mentorExplanation": "DP is the hardest interview topic but incredibly rewarding! The key insight: DP is just recursion + caching. Start by writing the recursive solution, add memoization, and you have top-down DP. Classic patterns (knapsack, Fibonacci, coin change) repeat across many problems. Recognize the pattern and the solution follows.",
        "resources": [
          {
            "title": "DP for Beginners",
            "url": "https://www.youtube.com/watch?v=oBt53YbR9Kk",
            "type": "video",
            "description": "freeCodeCamp's comprehensive DP course"
          }
        ]
      }
    ]
  },
  {
    "id": "954952ac-1f80-401c-a4a4-416c51a21a79",
    "title": "How experienced are you with repository strategy and large codebase management?",
    "category": "Version Control & Git",
    "type": "multiple-choice",
    "hint": "As codebases grow, repo structure and branching strategy become critical engineering decisions",
    "allowOther": true,
    "options": [
      {
        "value": "single-repo",
        "label": "I only work in single-repository projects",
        "recommendations": [
          "Learn about monorepo vs polyrepo trade-offs",
          "Study how large companies structure code",
          "Explore tools like Nx or Turborepo"
        ],
        "scoreWeight": 0.15,
        "mentorExplanation": "Single repos are fine for smaller projects! But understanding the alternatives prepares you for larger organizations. Monorepos (one repo for everything) are used by Google, Meta, and many others - they have real advantages for code sharing and atomic changes across packages.",
        "resources": [
          {
            "title": "Monorepo vs Polyrepo",
            "url": "https://monorepo.tools/",
            "type": "docs"
          },
          {
            "title": "Google Monorepo",
            "url": "https://www.youtube.com/watch?v=W71BTkUbdqE",
            "type": "video"
          },
          {
            "title": "Nx Monorepo Tool",
            "url": "https://nx.dev/",
            "type": "docs"
          }
        ]
      },
      {
        "value": "basic-multi-repo",
        "label": "I work with multiple repos but find dependency management challenging",
        "recommendations": [
          "Learn semantic versioning deeply",
          "Study package management strategies",
          "Explore monorepo tools as a solution"
        ],
        "scoreWeight": 0.35,
        "isCommonMistake": true,
        "mentorExplanation": "Polyrepo dependency hell is a real pain - you update a shared library and now 12 repos need updates! Monorepos solve this but have their own tradeoffs. Learn semantic versioning thoroughly and explore tools like Changesets to manage releases.",
        "resources": [
          {
            "title": "Semantic Versioning",
            "url": "https://semver.org/",
            "type": "docs"
          },
          {
            "title": "Changesets",
            "url": "https://github.com/changesets/changesets",
            "type": "github"
          },
          {
            "title": "Turborepo",
            "url": "https://turbo.build/repo",
            "type": "docs"
          }
        ]
      },
      {
        "value": "monorepo-experience",
        "label": "I have experience with monorepos and understand their trade-offs",
        "recommendations": [
          "Learn advanced monorepo tooling",
          "Study caching and build optimization",
          "Understand affected-change detection"
        ],
        "scoreWeight": 0.6,
        "isCorrect": true,
        "mentorExplanation": "Excellent! Monorepo experience is valuable. Focus next on performance at scale: caching build outputs, affected-change detection (only build what changed), and CI optimization. This is where monorepos win or lose.",
        "resources": [
          {
            "title": "Nx Affected Builds",
            "url": "https://nx.dev/concepts/affected",
            "type": "docs"
          },
          {
            "title": "Remote Caching",
            "url": "https://turbo.build/repo/docs/core-concepts/remote-caching",
            "type": "docs"
          },
          {
            "title": "Monorepo at Scale",
            "url": "https://www.youtube.com/watch?v=hqI_OZwqq0I",
            "type": "video"
          }
        ]
      },
      {
        "value": "architect",
        "label": "I design repository architecture and branching strategies for teams",
        "recommendations": [
          "Document your architectural decisions",
          "Share repo strategy knowledge",
          "Evaluate emerging tooling"
        ],
        "scoreWeight": 0.8,
        "isCorrect": true,
        "mentorExplanation": "Excellent! Repository architecture has huge impact on team velocity. Your experience evaluating trade-offs (monorepo vs polyrepo, trunk-based vs feature branches) is high-level thinking. Share these decisions and their reasoning with your organization.",
        "resources": [
          {
            "title": "Trunk Based Development",
            "url": "https://trunkbaseddevelopment.com/",
            "type": "docs"
          },
          {
            "title": "Repository Patterns",
            "url": "https://www.atlassian.com/git/tutorials/comparing-workflows",
            "type": "docs"
          },
          {
            "title": "Engineering Org Structure",
            "url": "https://www.thoughtworks.com/insights/blog/code-organization-strategies",
            "type": "article"
          }
        ]
      },
      {
        "value": "expert",
        "label": "I have deep expertise in large-scale codebase management and toolchain design",
        "recommendations": [
          "Contribute to monorepo tooling",
          "Write case studies on your decisions",
          "Speak about scaling codebases"
        ],
        "scoreWeight": 1,
        "isCorrect": true,
        "mentorExplanation": "You have rare expertise in large-scale codebase management! The decisions you make affect hundreds of developers' daily workflows. Share this - conference talks and blog posts on real monorepo war stories are incredibly valuable to the community.",
        "resources": [
          {
            "title": "Contributing to Nx",
            "url": "https://github.com/nrwl/nx/blob/master/CONTRIBUTING.md",
            "type": "github"
          },
          {
            "title": "Large Scale Refactoring",
            "url": "https://www.youtube.com/watch?v=WCJ5ZfZBMvc",
            "type": "video"
          },
          {
            "title": "Engineering Platform Design",
            "url": "https://platformengineering.org/",
            "type": "docs"
          }
        ]
      }
    ]
  },
  {
    "id": "66815188-14b6-4bfe-8210-c6785cc4cb62",
    "title": "How do you approach debugging issues in production environments?",
    "category": "Problem Solving & Debugging",
    "type": "multiple-choice",
    "hint": "Production bugs are harder - no breakpoints, real user data, and time pressure",
    "allowOther": true,
    "options": [
      {
        "value": "restart-hope",
        "label": "I restart services and hope the problem goes away",
        "recommendations": [
          "Learn structured logging",
          "Study observability basics",
          "Practice reading error logs"
        ],
        "scoreWeight": 0.15,
        "isCommonMistake": true,
        "mentorExplanation": "Restarting without understanding is dangerous - the problem will come back, maybe worse! Learn to investigate first. Add proper logging to understand what's happening. A restart is sometimes necessary, but always investigate the cause.",
        "resources": [
          {
            "title": "Production Debugging",
            "url": "https://www.youtube.com/watch?v=x9xBd3yvMtI",
            "type": "video"
          }
        ]
      },
      {
        "value": "logs-only",
        "label": "I look at logs but struggle to connect events to root causes",
        "recommendations": [
          "Learn distributed tracing",
          "Study correlation IDs",
          "Practice timeline reconstruction from logs"
        ],
        "scoreWeight": 0.35,
        "mentorExplanation": "Logs are great but fragmented across services they're hard to reason about! Learn about correlation IDs (trace a request across multiple services) and distributed tracing tools (Jaeger, Datadog APM). They connect the dots automatically.",
        "resources": [
          {
            "title": "Distributed Tracing Guide",
            "url": "https://opentelemetry.io/docs/concepts/observability-primer/",
            "type": "docs"
          }
        ]
      },
      {
        "value": "systematic",
        "label": "I use logs, metrics, and traces systematically to isolate issues",
        "recommendations": [
          "Build runbooks for common issues",
          "Study chaos engineering",
          "Learn advanced APM features"
        ],
        "scoreWeight": 0.6,
        "isCorrect": true,
        "mentorExplanation": "Excellent! The three pillars - logs, metrics, traces - give you the full picture. Now build runbooks for common issues so your whole team can handle them. And study how to PREVENT production issues with chaos engineering.",
        "resources": [
          {
            "title": "Chaos Engineering",
            "url": "https://principlesofchaos.org/",
            "type": "docs"
          }
        ]
      },
      {
        "value": "advanced",
        "label": "I perform thorough post-mortems and implement preventive measures",
        "recommendations": [
          "Lead blameless post-mortems",
          "Build observability culture",
          "Design for debuggability from the start"
        ],
        "scoreWeight": 0.8,
        "isCorrect": true,
        "mentorExplanation": "Excellent production engineering mindset! Post-mortems with preventive follow-through turn outages into improvements. Blameless culture is key - when people fear blame, they hide problems. You're building antifragile systems!",
        "resources": [
          {
            "title": "Google SRE Post-Mortem Culture",
            "url": "https://sre.google/sre-book/postmortem-culture/",
            "type": "book"
          }
        ]
      },
      {
        "value": "expert",
        "label": "I design systems with observability built-in and lead incident response culture",
        "recommendations": [
          "Implement SLOs and error budgets",
          "Build internal observability tooling",
          "Train teams on incident response"
        ],
        "scoreWeight": 1,
        "isCorrect": true,
        "mentorExplanation": "You're an SRE-level production expert! Observability-first design and strong incident culture are hallmarks of high-performing engineering organizations. Your expertise here directly impacts system reliability and user experience.",
        "resources": [
          {
            "title": "SLOs and Error Budgets",
            "url": "https://sre.google/sre-book/service-level-objectives/",
            "type": "book"
          },
          {
            "title": "OpenTelemetry",
            "url": "https://opentelemetry.io/",
            "type": "docs"
          }
        ]
      }
    ]
  },
  {
    "id": "df8802d9-548e-4f85-aa28-0b7d10981a7b",
    "title": "How actively do you mentor others or share knowledge within your team?",
    "category": "Learning & Growth",
    "type": "multiple-choice",
    "hint": "Teaching others is the fastest way to solidify your own understanding - it's not just altruism",
    "allowOther": true,
    "options": [
      {
        "value": "receiver",
        "label": "I'm still learning and mostly receive mentorship",
        "recommendations": [
          "Start sharing small learnings with peers",
          "Write brief notes on things you figure out",
          "Explain solutions you found to teammates"
        ],
        "scoreWeight": 0.15,
        "mentorExplanation": "You don't need to be an expert to mentor! Explaining what you just learned to a peer reinforces your own understanding (Feynman Technique). Start small: the next time you solve a tricky bug, write a quick Slack message explaining what you found. That IS mentorship.",
        "resources": [
          {
            "title": "Feynman Technique",
            "url": "https://fs.blog/feynman-technique/",
            "type": "article"
          },
          {
            "title": "Learning by Teaching",
            "url": "https://ideas.time.com/2011/11/30/the-protege-effect/",
            "type": "article"
          }
        ]
      },
      {
        "value": "informal",
        "label": "I help when asked but rarely proactively share knowledge",
        "recommendations": [
          "Share learnings in team channels",
          "Write internal wiki pages",
          "Present at team meetings"
        ],
        "scoreWeight": 0.35,
        "mentorExplanation": "Reactive help is good, but proactive sharing multiplies your impact! Did you learn something useful this week? Post it in Slack. Figured out a tricky config? Write a wiki page. Your knowledge becomes a team asset.",
        "resources": [
          {
            "title": "Internal Tech Talks",
            "url": "https://www.youtube.com/watch?v=OwxXFe7gAqA",
            "type": "video"
          }
        ]
      },
      {
        "value": "active",
        "label": "I actively mentor junior developers and share knowledge regularly",
        "recommendations": [
          "Create structured learning plans for mentees",
          "Run team knowledge-sharing sessions",
          "Document your mentoring approach"
        ],
        "scoreWeight": 0.6,
        "isCorrect": true,
        "mentorExplanation": "Excellent! Active mentorship multiplies team capability. Make it structured: create learning plans with goals and milestones for mentees. Track progress. The most effective mentors challenge and stretch their mentees, not just answer questions.",
        "resources": []
      },
      {
        "value": "program-builder",
        "label": "I build knowledge-sharing culture through talks, documentation, and structured programs",
        "recommendations": [
          "Create formal mentoring programs",
          "Build internal learning platforms",
          "Measure knowledge sharing effectiveness"
        ],
        "scoreWeight": 0.8,
        "isCorrect": true,
        "mentorExplanation": "You're building learning culture at scale! Systematic knowledge sharing - guilds, internal conferences, structured onboarding - compounds over time. Track impact: do engineers ramp up faster? Is there less bus factor? These metrics justify continued investment.",
        "resources": [
          {
            "title": "Engineering Guilds",
            "url": "https://engineering.atspotify.com/2014/03/spotify-engineering-culture-part-1/",
            "type": "video"
          },
          {
            "title": "Internal Developer Portals",
            "url": "https://backstage.io/",
            "type": "docs"
          }
        ]
      },
      {
        "value": "community",
        "label": "I mentor externally, create content, and contribute to the broader developer community",
        "recommendations": [
          "Scale external impact through open source",
          "Build mentorship programs",
          "Create free educational resources"
        ],
        "scoreWeight": 1,
        "isCorrect": true,
        "mentorExplanation": "You're giving back to the community at the highest level! External mentoring, content creation, and open source contributions help developers you'll never meet. This is how you create lasting impact beyond your immediate organization.",
        "resources": [
          {
            "title": "ADPList Mentoring",
            "url": "https://adplist.org/",
            "type": "docs",
            "description": "Platform for free tech mentoring"
          },
          {
            "title": "Open Source Mentorship",
            "url": "https://summerofcode.withgoogle.com/",
            "type": "docs"
          }
        ]
      }
    ]
  },
  {
    "id": "e02865f4-995d-4b11-ad57-1cca8afddf06",
    "title": "How do you approach estimating technical work and managing scope?",
    "category": "Communication",
    "type": "multiple-choice",
    "hint": "Accurate estimation and scope management are critical professional skills often overlooked in technical training",
    "allowOther": true,
    "options": [
      {
        "value": "avoid",
        "label": "I avoid giving estimates - I never know how long things take",
        "recommendations": [
          "Learn estimation techniques",
          "Practice breaking tasks into small pieces",
          "Track your actual time vs estimates"
        ],
        "scoreWeight": 0.15,
        "mentorExplanation": "Avoiding estimates leaves your team and stakeholders unable to plan! Estimation IS hard, but it's a skill you can develop. Start small: break work into tasks under 2 hours. Estimate those. Track actual vs estimate. Over time you'll develop calibration. The goal isn't perfection - it's a reasonable range with stated assumptions.",
        "resources": [
          {
            "title": "Evidence-Based Scheduling",
            "url": "https://www.joelonsoftware.com/2007/10/26/evidence-based-scheduling/",
            "type": "article"
          }
        ]
      },
      {
        "value": "optimistic",
        "label": "I give estimates but consistently underestimate",
        "recommendations": [
          "Add buffer for unknowns",
          "Learn about Hofstadter's Law",
          "Track estimates vs actuals"
        ],
        "scoreWeight": 0.32,
        "isCommonMistake": true,
        "mentorExplanation": "Optimism bias in estimation is extremely common! We estimate in ideal conditions but work in reality (meetings, blockers, unclear requirements). Apply a multiplier: if you think it's 2 days, estimate 3-4. Track your actuals for a month - most developers discover they underestimate by 2-3x consistently.",
        "resources": [
          {
            "title": "Hofstadter's Law",
            "url": "https://en.wikipedia.org/wiki/Hofstadter%27s_law",
            "type": "article"
          }
        ]
      },
      {
        "value": "decent",
        "label": "I give reasonable estimates and communicate when scope changes",
        "recommendations": [
          "Learn story point techniques",
          "Practice risk-adjusted estimation",
          "Study scope management"
        ],
        "scoreWeight": 0.6,
        "isCorrect": true,
        "mentorExplanation": "Good estimation and communication about scope changes is valuable! Most problems come from silent scope creep. Your habit of flagging changes early is exactly right. Next: get better at identifying hidden complexity before it bites you.",
        "resources": [
          {
            "title": "Risk-Adjusted Estimation",
            "url": "https://www.youtube.com/watch?v=uFfNYlLJjPM",
            "type": "video"
          }
        ]
      },
      {
        "value": "skilled",
        "label": "I decompose work accurately, identify risks early, and adjust plans proactively",
        "recommendations": [
          "Mentor teammates on estimation",
          "Establish estimation processes",
          "Use data to improve team forecasting"
        ],
        "scoreWeight": 0.8,
        "isCorrect": true,
        "mentorExplanation": "Excellent! Risk identification before you start is the hallmark of experience. Your ability to say 'This looks like 3 days but there are 2 unknowns that could make it a week' is incredibly valuable. Share this skill - help your team estimate better.",
        "resources": [
          {
            "title": "Shape Up (Basecamp Method)",
            "url": "https://basecamp.com/shapeup",
            "type": "book",
            "description": "Free book on project scoping"
          },
          {
            "title": "Probabilistic Forecasting",
            "url": "https://www.youtube.com/watch?v=aBLtMsDKe7Y",
            "type": "video"
          },
          {
            "title": "Team Estimation",
            "url": "https://scrumguides.org/scrum-guide.html",
            "type": "docs"
          }
        ]
      },
      {
        "value": "expert",
        "label": "I lead project planning and help the organization ship predictably",
        "recommendations": [
          "Build forecasting models from team data",
          "Establish definition of ready/done",
          "Create planning playbooks"
        ],
        "scoreWeight": 1,
        "isCorrect": true,
        "mentorExplanation": "You're an expert at predictable delivery! Organizational shipping reliability is one of the highest-value skills. Your combination of technical understanding and planning expertise makes you a force multiplier for the entire engineering organization.",
        "resources": [
          {
            "title": "Kanban Metrics",
            "url": "https://www.actionableagile.com/",
            "type": "docs"
          }
        ]
      }
    ]
  },
  {
    "id": "e1051181-51ed-455a-80ba-a45cf62bf63e",
    "title": "How would you describe your ability to solve technical problems and apply your knowledge in frontend development?",
    "category": "Technical Knowledge & Understanding",
    "type": "multiple-choice",
    "hint": "Consider: solving problems without exact examples, explaining how things work, frequency of getting stuck, ability to adapt solutions",
    "options": [
      {
        "value": "level1",
        "label": "I need very similar examples to solve problems and get stuck very often. I struggle to explain how things work.",
        "recommendations": [
          "Start with tutorial projects to build foundational understanding",
          "Practice explaining code out loud",
          "Break down existing code to understand how each part works",
          "Join beginner-friendly coding communities"
        ],
        "scoreWeight": 0.1,
        "mentorExplanation": "You're at the beginning - focus on understanding fundamentals. When you copy code, understand each line. Keep a learning journal. Don't be discouraged - getting stuck is part of learning.",
        "resources": [
          {
            "title": "freeCodeCamp",
            "url": "https://www.freecodecamp.org/",
            "type": "course",
            "description": "Structured learning path"
          },
          {
            "title": "MDN Learn",
            "url": "https://developer.mozilla.org/en-US/docs/Learn",
            "type": "docs",
            "description": "Beginner documentation"
          }
        ]
      },
      {
        "value": "level2",
        "label": "I can follow tutorials but struggle when slightly different. I get stuck often and search frequently.",
        "recommendations": [
          "Modify tutorial code with variations",
          "Try solving before searching",
          "Read documentation regularly"
        ],
        "scoreWeight": 0.2,
        "mentorExplanation": "You're making progress! Focus on WHY solutions work. Take time to understand each part. Build a personal knowledge base.",
        "resources": [
          {
            "title": "Frontend Mentor",
            "url": "https://www.frontendmentor.io/",
            "type": "course",
            "description": "Real-world projects"
          }
        ]
      },
      {
        "value": "level3",
        "label": "I adapt examples to my situation but need external references regularly. I get stuck moderately often.",
        "recommendations": [
          "Challenge yourself to solve before searching",
          "Deep dive into framework documentation",
          "Practice explaining code"
        ],
        "scoreWeight": 0.3,
        "mentorExplanation": "Good progress! Before searching, spend 15-20 minutes trying approaches. Read library source code. Focus on understanding tradeoffs.",
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
        "value": "level4",
        "label": "I solve simpler tasks alone but need references for complex problems. I understand basics but not all details.",
        "recommendations": [
          "Study advanced framework concepts",
          "Build complex personal projects",
          "Solve problems multiple ways"
        ],
        "scoreWeight": 0.4,
        "mentorExplanation": "Intermediate territory! Focus on WHY things work. Study tool internals. Read about performance and security.",
        "resources": [
          {
            "title": "Epic React",
            "url": "https://epicreact.dev/",
            "type": "course",
            "description": "Advanced React"
          }
        ]
      },
      {
        "value": "level5",
        "label": "I handle most standard tasks independently. I understand how things work but occasionally need documentation.",
        "recommendations": [
          "Take on complex features",
          "Mentor junior developers",
          "Study system design patterns"
        ],
        "scoreWeight": 0.5,
        "mentorExplanation": "Solidly intermediate! Expand impact and deepen expertise. Think architecture, not just implementation.",
        "resources": [
          {
            "title": "System Design Primer",
            "url": "https://github.com/donnemartin/system-design-primer",
            "type": "github",
            "description": "Design fundamentals"
          }
        ]
      },
      {
        "value": "level6",
        "label": "I solve complex problems independently and explain how tech works. Rarely stuck except on specific edge cases.",
        "recommendations": [
          "Explore cutting-edge technologies",
          "Write technical articles",
          "Lead technical initiatives"
        ],
        "scoreWeight": 0.6,
        "mentorExplanation": "Strong intermediate to advanced! Focus on breadth and leadership. Share knowledge. Study performance and accessibility.",
        "resources": [
          {
            "title": "High Performance Browser Networking",
            "url": "https://hpbn.co/",
            "type": "book",
            "description": "Web performance"
          }
        ]
      },
      {
        "value": "level7",
        "label": "Deep understanding, architect complex solutions. Understand not just how but why. Getting stuck is rare.",
        "recommendations": [
          "Focus on system architecture",
          "Mentor and guide team decisions",
          "Publish technical content"
        ],
        "scoreWeight": 0.7,
        "mentorExplanation": "Advanced level! You understand 'why' behind decisions. Focus on impact and leadership. Study large-scale systems.",
        "resources": [
          {
            "title": "Designing Data-Intensive Apps",
            "url": "https://dataintensive.net/",
            "type": "book",
            "description": "System design"
          }
        ]
      },
      {
        "value": "level8",
        "label": "I solve almost any problem independently with full understanding. I design robust solutions with edge cases.",
        "recommendations": [
          "Lead architectural decisions",
          "Evaluate emerging technologies",
          "Build team tools and frameworks"
        ],
        "scoreWeight": 0.8,
        "mentorExplanation": "Senior/expert level! Focus on strategic impact. Build teams that scale. Influence stack decisions.",
        "resources": [
          {
            "title": "The Manager's Path",
            "url": "https://www.oreilly.com/library/view/the-managers-path/9781491973882/",
            "type": "book",
            "description": "Technical leadership"
          }
        ]
      },
      {
        "value": "level9",
        "label": "Mastery-level understanding, innovate solutions. Rarely encounter unsolvable problems.",
        "recommendations": [
          "Drive organizational innovation",
          "Contribute significantly to open source",
          "Shape industry best practices"
        ],
        "scoreWeight": 0.9,
        "mentorExplanation": "Outstanding mastery! You define best practices. Extend impact beyond code - shape standards, influence frameworks.",
        "resources": [
          {
            "title": "Google Research",
            "url": "https://research.google/",
            "type": "article",
            "description": "Cutting-edge research"
          }
        ]
      },
      {
        "value": "level10",
        "label": "Expert-level across stack. I create novel solutions and contribute to advancing the field itself.",
        "recommendations": [
          "Lead R&D initiatives",
          "Publish papers or create influential OSS",
          "Speak at major conferences"
        ],
        "scoreWeight": 1,
        "mentorExplanation": "Exceptional! You create technology. Focus on legacy - problems that benefit millions. Create frameworks, write books, teach.",
        "resources": [
          {
            "title": "TC39",
            "url": "https://tc39.es/",
            "type": "docs",
            "description": "JavaScript specification"
          }
        ]
      }
    ]
  },
  {
    "id": "c33403f3-e850-4e08-ab82-50391a4aa1b3",
    "title": "How would you describe your ability to debug issues and implement new solutions without existing examples?",
    "category": "Technical Knowledge & Understanding",
    "type": "multiple-choice",
    "hint": "Consider: identifying root causes, implementing without examples, judging when to use technologies, troubleshooting systematically",
    "options": [
      {
        "value": "debug1",
        "label": "I struggle to identify problems without help. I need detailed examples and feel lost without them.",
        "recommendations": [
          "Learn browser DevTools basics",
          "Practice reading error messages",
          "Learn console.log and breakpoints"
        ],
        "scoreWeight": 0.1,
        "mentorExplanation": "Debugging improves with practice! Error messages help. Read them slowly. Learn DevTools. Isolate problems systematically.",
        "resources": [
          {
            "title": "Chrome DevTools",
            "url": "https://developer.chrome.com/docs/devtools/",
            "type": "docs",
            "description": "Browser debugging"
          }
        ]
      },
      {
        "value": "debug2",
        "label": "I debug simple issues with guidance. I rely on examples and struggle implementing without references.",
        "recommendations": [
          "Practice hypothesis-test-observe",
          "Learn to read stack traces",
          "Use debugger not just console.log"
        ],
        "scoreWeight": 0.2,
        "mentorExplanation": "Building awareness! Form hypotheses, test them. Learn debugger - step through code, watch variables.",
        "resources": [
          {
            "title": "VS Code Debugging",
            "url": "https://code.visualstudio.com/docs/editor/debugging",
            "type": "docs",
            "description": "IDE debugger"
          }
        ]
      },
      {
        "value": "debug3",
        "label": "I find and fix common bugs. I adapt examples but feel uncomfortable without starting references.",
        "recommendations": [
          "Implement features from scratch",
          "Study multiple solutions",
          "Read docs not just Stack Overflow"
        ],
        "scoreWeight": 0.3,
        "mentorExplanation": "Good! Try 30 minutes before searching. Read official docs. Understanding 'why' lets you decide without examples.",
        "resources": [
          {
            "title": "React DevTools",
            "url": "https://react.dev/learn/react-developer-tools",
            "type": "docs",
            "description": "Debug React apps"
          }
        ]
      },
      {
        "value": "debug4",
        "label": "I debug most issues given time. I implement simpler features independently but prefer examples for complex ones.",
        "recommendations": [
          "Challenge with complex bugs",
          "Learn advanced DevTools",
          "Practice system design first"
        ],
        "scoreWeight": 0.4,
        "mentorExplanation": "Solid intermediate! For complex features, try architectural thinking: components, communication, data flow.",
        "resources": [
          {
            "title": "Clean Architecture",
            "url": "https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html",
            "type": "article",
            "description": "Architectural thinking"
          }
        ]
      },
      {
        "value": "debug5",
        "label": "I debug complex issues systematically. I implement most features independently and judge different approaches.",
        "recommendations": [
          "Identify performance bottlenecks proactively",
          "Study debugging at scale",
          "Mentor debugging techniques"
        ],
        "scoreWeight": 0.5,
        "mentorExplanation": "Strong intermediate! Think systems. Study monitoring, logging, error tracking. Think maintainability and testability.",
        "resources": [
          {
            "title": "Sentry Docs",
            "url": "https://docs.sentry.io/",
            "type": "docs",
            "description": "Production monitoring"
          }
        ]
      },
      {
        "value": "debug6",
        "label": "I quickly identify root causes. I confidently implement solutions and evaluate technology choices independently.",
        "recommendations": [
          "Prevent issues through architecture",
          "Study distributed debugging",
          "Build team debugging tools"
        ],
        "scoreWeight": 0.6,
        "mentorExplanation": "Advanced! Focus on scale and prevention. Design debuggable systems. Study observability - metrics, logs, traces.",
        "resources": [
          {
            "title": "Distributed Tracing",
            "url": "https://opentelemetry.io/",
            "type": "docs",
            "description": "Debug distributed systems"
          }
        ]
      },
      {
        "value": "debug7",
        "label": "I excel at debugging obscure issues. I architect solutions with edge cases and explain decisions clearly.",
        "recommendations": [
          "Lead debugging workshops",
          "Develop debugging strategies",
          "Contribute to dev tools"
        ],
        "scoreWeight": 0.7,
        "mentorExplanation": "Excellent! Scale your knowledge: build runbooks, create tooling, set standards. Share through docs and talks.",
        "resources": [
          {
            "title": "SRE Books",
            "url": "https://sre.google/books/",
            "type": "book",
            "description": "Reliability approach"
          }
        ]
      },
      {
        "value": "debug8",
        "label": "I solve almost any debugging challenge. I design with built-in debuggability and rarely encounter blockers.",
        "recommendations": [
          "Establish org-wide best practices",
          "Build sophisticated debugging tools",
          "Consult on complex challenges"
        ],
        "scoreWeight": 0.8,
        "mentorExplanation": "Outstanding! Prevent bug categories through architecture. Lead initiatives. Build tooling. Your expertise shapes how others debug.",
        "resources": [
          {
            "title": "V8 Blog",
            "url": "https://v8.dev/blog",
            "type": "article",
            "description": "JS engine internals"
          }
        ]
      },
      {
        "value": "debug9",
        "label": "Mastery-level debugging across stack. I innovate debugging approaches and contribute to advancing tools.",
        "recommendations": [
          "Research new debugging methodologies",
          "Contribute to DevTools/frameworks",
          "Publish debugging research"
        ],
        "scoreWeight": 0.9,
        "mentorExplanation": "Exceptional! Don't just use tools, improve them. Develop techniques. Contribute to tools millions use. Share expertise.",
        "resources": [
          {
            "title": "DevTools Protocol",
            "url": "https://chromedevtools.github.io/devtools-protocol/",
            "type": "docs",
            "description": "Build debugging tools"
          }
        ]
      },
      {
        "value": "debug10",
        "label": "Expert-level debugging all layers. I create tools and methodologies used industry-wide.",
        "recommendations": [
          "Lead research in debugging",
          "Develop next-gen debugging tools",
          "Advise on debugging strategy"
        ],
        "scoreWeight": 1,
        "mentorExplanation": "Extraordinary! Your work influences worldwide debugging. At this pinnacle, legacy matters. Lead OSS, found companies, write definitive works.",
        "resources": [
          {
            "title": "W3C",
            "url": "https://www.w3.org/",
            "type": "docs",
            "description": "Web standards"
          }
        ]
      }
    ]
  },
  {
    "id": "78fc194b-1b57-4397-9653-c09dfc4ab46e",
    "title": "How would you describe your familiarity with technical terminology and understanding of what different technologies are used for?",
    "category": "Technical Knowledge & Understanding",
    "type": "multiple-choice",
    "hint": "Consider: understanding conversations with technical terms, knowing what technologies do, recognizing categories (e.g., Python is a language, not a database)",
    "options": [
      {
        "value": "vocab1",
        "label": "I frequently don't understand technical terms in conversations and often confuse what different technologies are for.",
        "recommendations": [
          "Build a personal tech glossary as you learn",
          "Use MDN Web Docs to understand web technologies",
          "Watch beginner-friendly tech overview videos",
          "Ask questions when unfamiliar terms come up"
        ],
        "scoreWeight": 0.1,
        "mentorExplanation": "Building your technical vocabulary is foundational! Don't be embarrassed to ask 'what does that mean?' Create a running list of terms you encounter and look them up. This gets easier quickly.",
        "resources": [
          {
            "title": "MDN Web Docs Glossary",
            "url": "https://developer.mozilla.org/en-US/docs/Glossary",
            "type": "docs",
            "description": "Web technology terms"
          },
          {
            "title": "Codecademy Glossary",
            "url": "https://www.codecademy.com/resources/docs",
            "type": "docs",
            "description": "Programming glossary"
          }
        ]
      },
      {
        "value": "vocab2",
        "label": "I understand basic terms but often encounter unfamiliar concepts. I sometimes confuse technology categories.",
        "recommendations": [
          "Read tech articles regularly",
          "Follow technology newsletters",
          "Study technology landscape maps"
        ],
        "scoreWeight": 0.2,
        "mentorExplanation": "You're building awareness! Exposure helps - read tech blogs, follow developers on social media. When you hear a new term, take 2 minutes to understand it.",
        "resources": [
          {
            "title": "JavaScript Weekly",
            "url": "https://javascriptweekly.com/",
            "type": "article",
            "description": "Stay current"
          },
          {
            "title": "Web.dev",
            "url": "https://web.dev/",
            "type": "docs",
            "description": "Modern web development"
          }
        ]
      },
      {
        "value": "vocab3",
        "label": "I understand common frontend terms but struggle with backend, DevOps, or infrastructure concepts.",
        "recommendations": [
          "Study full-stack architecture diagrams",
          "Learn basics of backend and DevOps",
          "Understand how frontend fits in larger systems"
        ],
        "scoreWeight": 0.3,
        "mentorExplanation": "Common for frontend specialists! Broaden gradually - understand APIs, databases, deployment. You don't need to code it all, but knowing what they are helps collaboration.",
        "resources": [
          {
            "title": "Full Stack Open",
            "url": "https://fullstackopen.com/",
            "type": "course",
            "description": "Full-stack fundamentals"
          },
          {
            "title": "Roadmap.sh",
            "url": "https://roadmap.sh/",
            "type": "docs",
            "description": "Developer roadmaps"
          }
        ]
      },
      {
        "value": "vocab4",
        "label": "I understand most frontend and basic full-stack terms. I occasionally encounter unfamiliar specialized concepts.",
        "recommendations": [
          "Explore adjacent specializations",
          "Read about emerging technologies",
          "Join technical discussions and ask questions"
        ],
        "scoreWeight": 0.4,
        "mentorExplanation": "Solid foundation! Continue expanding horizontally - learn enough about databases, cloud, security to have informed conversations. Specialization is good, but breadth helps you design better solutions.",
        "resources": [
          {
            "title": "System Design Primer",
            "url": "https://github.com/donnemartin/system-design-primer",
            "type": "github",
            "description": "Broad tech concepts"
          },
          {
            "title": "AWS Cloud Practitioner Essentials",
            "url": "https://aws.amazon.com/training/",
            "type": "course",
            "description": "Cloud basics"
          }
        ]
      },
      {
        "value": "vocab5",
        "label": "I understand technical conversations across web development. I know what most common technologies do and their categories.",
        "recommendations": [
          "Deep dive into technologies you use daily",
          "Explore performance and security concepts",
          "Study software architecture patterns"
        ],
        "scoreWeight": 0.5,
        "mentorExplanation": "Well-rounded intermediate knowledge! Now go deeper on your stack and broader on architecture. Understanding tradeoffs between technologies matters more than knowing all of them.",
        "resources": [
          {
            "title": "Martin Fowler's Blog",
            "url": "https://martinfowler.com/",
            "type": "article",
            "description": "Software architecture"
          },
          {
            "title": "High Scalability",
            "url": "http://highscalability.com/",
            "type": "article",
            "description": "Architecture case studies"
          }
        ]
      },
      {
        "value": "vocab6",
        "label": "I have strong knowledge of web technologies and infrastructure. I can explain most technologies and suggest alternatives.",
        "recommendations": [
          "Study emerging technologies and trends",
          "Understand historical context of tech evolution",
          "Share knowledge through writing or talks"
        ],
        "scoreWeight": 0.6,
        "mentorExplanation": "Advanced knowledge! You can evaluate technologies effectively. Focus on understanding 'why' technologies emerged and what problems they solve. This helps you predict trends and make smart bets.",
        "resources": [
          {
            "title": "ThoughtWorks Tech Radar",
            "url": "https://www.thoughtworks.com/radar",
            "type": "article",
            "description": "Technology trends"
          },
          {
            "title": "InfoQ",
            "url": "https://www.infoq.com/",
            "type": "article",
            "description": "Software architecture news"
          }
        ]
      },
      {
        "value": "vocab7",
        "label": "I have comprehensive knowledge across frontend, backend, and infrastructure. I rarely encounter unfamiliar concepts.",
        "recommendations": [
          "Explore cutting-edge research areas",
          "Contribute to technical discussions and RFCs",
          "Mentor others on technology choices"
        ],
        "scoreWeight": 0.7,
        "mentorExplanation": "Excellent breadth! You can make informed architectural decisions. Focus on depth in strategic areas and staying ahead of industry shifts. Your knowledge helps teams avoid costly mistakes.",
        "resources": [
          {
            "title": "Papers We Love",
            "url": "https://paperswelove.org/",
            "type": "article",
            "description": "Computer science papers"
          },
          {
            "title": "ACM Queue",
            "url": "https://queue.acm.org/",
            "type": "article",
            "description": "Practitioner research"
          }
        ]
      },
      {
        "value": "vocab8",
        "label": "I have expert-level knowledge of web technologies, infrastructure, and CS fundamentals. I can discuss advanced topics fluently.",
        "recommendations": [
          "Lead technology evaluation processes",
          "Publish technical content",
          "Influence organizational tech strategy"
        ],
        "scoreWeight": 0.8,
        "mentorExplanation": "Senior/expert level! You understand the entire stack deeply. Use this to guide architectural decisions, evaluate build vs buy, and set technical direction. Your expertise is a strategic asset.",
        "resources": [
          {
            "title": "Google Research Publications",
            "url": "https://research.google/pubs/",
            "type": "article",
            "description": "Research at scale"
          },
          {
            "title": "Distributed Systems Course",
            "url": "https://www.distributedsystemscourse.com/",
            "type": "course",
            "description": "Advanced concepts"
          }
        ]
      },
      {
        "value": "vocab9",
        "label": "I have mastery-level understanding of technologies across the stack. I contribute to technical standards and discussions.",
        "recommendations": [
          "Participate in standards organizations",
          "Speak at major conferences",
          "Publish influential technical writing"
        ],
        "scoreWeight": 0.9,
        "mentorExplanation": "Outstanding mastery! You shape how others think about technology. Consider contributing to open source, standards bodies, or influential blogs. Your insights can influence thousands of developers.",
        "resources": [
          {
            "title": "W3C Working Groups",
            "url": "https://www.w3.org/groups/wg/",
            "type": "docs",
            "description": "Web standards"
          },
          {
            "title": "TC39 Proposals",
            "url": "https://github.com/tc39/proposals",
            "type": "github",
            "description": "JavaScript evolution"
          }
        ]
      },
      {
        "value": "vocab10",
        "label": "I have world-class expertise in web technologies and computer science. I contribute to advancing the field itself.",
        "recommendations": [
          "Lead research initiatives",
          "Author definitive resources",
          "Shape industry direction"
        ],
        "scoreWeight": 1,
        "mentorExplanation": "Exceptional! You're at the forefront of the industry. Your work defines best practices. Focus on maximum impact - create frameworks, write books, lead standards. Invest in the next generation of developers.",
        "resources": [
          {
            "title": "IETF",
            "url": "https://www.ietf.org/",
            "type": "docs",
            "description": "Internet standards"
          },
          {
            "title": "ACM",
            "url": "https://www.acm.org/",
            "type": "docs",
            "description": "Computing research"
          }
        ]
      }
    ]
  },
  {
    "id": "31667769-f1c1-4a83-9d64-4db15e300363",
    "title": "How would you describe your ability to navigate solutions, understand your project's architecture, and identify technology alternatives?",
    "category": "Technical Knowledge & Understanding",
    "type": "multiple-choice",
    "hint": "Consider: finding solutions efficiently, understanding how your project works, knowing what libraries are used, identifying alternatives, recommending improvements",
    "options": [
      {
        "value": "nav1",
        "label": "I struggle to find solutions on my own and have minimal understanding of how our project works or what libraries we use.",
        "recommendations": [
          "Create a project architecture diagram",
          "Document libraries and their purposes",
          "Practice reading package.json and dependencies",
          "Ask teammates for codebase tours"
        ],
        "scoreWeight": 0.1,
        "mentorExplanation": "Start with your own project! List every library in package.json and understand its purpose. Draw how components connect. This foundation makes everything else easier.",
        "resources": [
          {
            "title": "Reading a Codebase",
            "url": "https://www.felienne.com/archives/6472",
            "type": "article",
            "description": "Navigating unfamiliar code"
          },
          {
            "title": "Understanding Dependencies",
            "url": "https://docs.npmjs.com/cli/v8/configuring-npm/package-json",
            "type": "docs",
            "description": "Package.json guide"
          }
        ]
      },
      {
        "value": "nav2",
        "label": "I can find basic solutions with guidance. I have surface-level understanding of our project but can't identify alternatives.",
        "recommendations": [
          "Study project README and documentation",
          "Trace feature implementations end-to-end",
          "Research why each library was chosen"
        ],
        "scoreWeight": 0.2,
        "mentorExplanation": "Building context! For each library, research 'why this one?' Look at alternatives. Understanding tradeoffs develops your judgment. Follow code paths from UI to data.",
        "resources": [
          {
            "title": "npm Trends",
            "url": "https://npmtrends.com/",
            "type": "docs",
            "description": "Compare libraries"
          },
          {
            "title": "Stack Overflow Developer Survey",
            "url": "https://survey.stackoverflow.co/",
            "type": "article",
            "description": "Popular technologies"
          }
        ]
      },
      {
        "value": "nav3",
        "label": "I can find solutions for common problems. I understand basic project structure but struggle with architecture decisions.",
        "recommendations": [
          "Study software architecture patterns",
          "Analyze how features are implemented",
          "Research alternative approaches to current solutions"
        ],
        "scoreWeight": 0.3,
        "mentorExplanation": "Good progress! Move from 'what' to 'why'. Why is state managed this way? Why this routing approach? Understanding architectural decisions prepares you to make them.",
        "resources": [
          {
            "title": "Patterns.dev",
            "url": "https://www.patterns.dev/",
            "type": "docs",
            "description": "Design patterns"
          },
          {
            "title": "React Architecture",
            "url": "https://kentcdodds.com/blog/",
            "type": "article",
            "description": "Frontend architecture"
          }
        ]
      },
      {
        "value": "nav4",
        "label": "I navigate solutions effectively for routine problems. I understand project structure and can point to some alternatives.",
        "recommendations": [
          "Compare alternative solutions before implementing",
          "Study similar projects' approaches",
          "Practice evaluating tradeoffs"
        ],
        "scoreWeight": 0.4,
        "mentorExplanation": "Solid intermediate! Build your decision-making muscle - before implementing, research 2-3 approaches. Understand pros/cons. This skill becomes invaluable at senior levels.",
        "resources": [
          {
            "title": "Architecture Decision Records",
            "url": "https://adr.github.io/",
            "type": "docs",
            "description": "Document decisions"
          },
          {
            "title": "Real World App Comparisons",
            "url": "https://github.com/gothinkster/realworld",
            "type": "github",
            "description": "Same app, different stacks"
          }
        ]
      },
      {
        "value": "nav5",
        "label": "I efficiently find solutions and understand how our project works. I can identify alternatives and explain tradeoffs.",
        "recommendations": [
          "Propose improvements to current architecture",
          "Evaluate emerging solutions in your domain",
          "Contribute to technical discussions"
        ],
        "scoreWeight": 0.5,
        "mentorExplanation": "Strong intermediate! You can make informed recommendations. Start proposing improvements - better state management, performance optimizations, updated dependencies. Build conviction through research.",
        "resources": [
          {
            "title": "Software Architecture Guide",
            "url": "https://martinfowler.com/architecture/",
            "type": "article",
            "description": "Architecture principles"
          },
          {
            "title": "State of JS",
            "url": "https://stateofjs.com/",
            "type": "article",
            "description": "Ecosystem trends"
          }
        ]
      },
      {
        "value": "nav6",
        "label": "I quickly find optimal solutions and deeply understand project architecture. I confidently recommend new technologies and improvements.",
        "recommendations": [
          "Lead technical spikes and evaluations",
          "Document architectural patterns for the team",
          "Mentor others on solution navigation"
        ],
        "scoreWeight": 0.6,
        "mentorExplanation": "Advanced capability! You're a technical decision-maker. Lead evaluations of new tools. Document architectural patterns. Your recommendations carry weight - use it wisely.",
        "resources": [
          {
            "title": "C4 Model",
            "url": "https://c4model.com/",
            "type": "docs",
            "description": "Architecture diagrams"
          },
          {
            "title": "Technology Radar",
            "url": "https://www.thoughtworks.com/radar/how-to-byor",
            "type": "article",
            "description": "Build your radar"
          }
        ]
      },
      {
        "value": "nav7",
        "label": "I excel at finding solutions across the stack and architecting features. I evaluate and introduce new technologies successfully.",
        "recommendations": [
          "Set standards for technology evaluation",
          "Build reusable patterns and libraries",
          "Influence technical roadmap"
        ],
        "scoreWeight": 0.7,
        "mentorExplanation": "Excellent! You drive technical direction. Focus on creating leverage - build internal tools, establish evaluation criteria, create runbooks. Scale your impact through systems and documentation.",
        "resources": [
          {
            "title": "Staff Engineer Archetypes",
            "url": "https://staffeng.com/guides/staff-archetypes",
            "type": "article",
            "description": "Technical leadership"
          },
          {
            "title": "Engineering Strategy",
            "url": "https://lethain.com/engineering-strategy/",
            "type": "article",
            "description": "Strategic thinking"
          }
        ]
      },
      {
        "value": "nav8",
        "label": "I have expert-level ability to evaluate technologies and architect complex systems. I lead major technical decisions.",
        "recommendations": [
          "Drive organization-wide technical initiatives",
          "Establish architectural review processes",
          "Publish architectural guidance"
        ],
        "scoreWeight": 0.8,
        "mentorExplanation": "Senior/expert level! Your decisions shape how teams work. Invest in processes - architectural reviews, tech radars, decision frameworks. Build organizational technical intelligence.",
        "resources": [
          {
            "title": "The Architecture of Open Source Applications",
            "url": "https://aosabook.org/",
            "type": "book",
            "description": "Learn from real systems"
          },
          {
            "title": "Software Architecture in Practice",
            "url": "https://www.oreilly.com/library/view/software-architecture-in/9780136885979/",
            "type": "book",
            "description": "Architectural thinking"
          }
        ]
      },
      {
        "value": "nav9",
        "label": "I have mastery-level expertise in solution architecture and technology evaluation. I shape technical strategy at scale.",
        "recommendations": [
          "Develop novel architectural patterns",
          "Contribute to open source architecture",
          "Advise on industry best practices"
        ],
        "scoreWeight": 0.9,
        "mentorExplanation": "Outstanding! You create architectural patterns others adopt. Share your expertise - speak at conferences, write influential posts, contribute to frameworks. Your insights benefit the entire industry.",
        "resources": [
          {
            "title": "Building Evolutionary Architectures",
            "url": "https://www.oreilly.com/library/view/building-evolutionary-architectures/9781492097532/",
            "type": "book",
            "description": "Modern architecture"
          },
          {
            "title": "Microservices Patterns",
            "url": "https://microservices.io/",
            "type": "docs",
            "description": "Distributed architecture"
          }
        ]
      },
      {
        "value": "nav10",
        "label": "I have world-class expertise in software architecture and technology strategy. I create frameworks and patterns used industry-wide.",
        "recommendations": [
          "Lead major open source projects",
          "Author definitive architectural guides",
          "Advise organizations on technology strategy"
        ],
        "scoreWeight": 1,
        "mentorExplanation": "Exceptional! You define how modern applications are built. Create lasting impact - build influential frameworks, write seminal books, establish new patterns. Invest deeply in the next generation.",
        "resources": [
          {
            "title": "Design of Design",
            "url": "https://www.amazon.com/Design-Essays-Computer-Scientist/dp/0201362988",
            "type": "book",
            "description": "Design philosophy"
          },
          {
            "title": "Designing Data-Intensive Applications",
            "url": "https://dataintensive.net/",
            "type": "book",
            "description": "Modern system design"
          }
        ]
      }
    ]
  },
  {
    "id": "dda705c8-c3da-4ce9-bf8b-ddd3c1f03cac",
    "title": "How would you describe your ability to identify problems and find solutions through research?",
    "category": "Problem Solving & Debugging",
    "type": "multiple-choice",
    "hint": "Consider: narrowing down problem areas, searching effectively (Google, Stack Overflow), finding solutions in existing codebase, using correct keywords",
    "options": [
      {
        "value": "research1",
        "label": "I often get blocked and struggle to identify where the problem is. I have difficulty finding relevant information online.",
        "recommendations": [
          "Learn to read error messages carefully",
          "Practice breaking problems into smaller pieces",
          "Use browser DevTools to inspect behavior",
          "Ask for help narrowing down the problem area"
        ],
        "scoreWeight": 0.1,
        "mentorExplanation": "Getting blocked is frustrating but normal when learning! Start with error messages - they point to problem areas. Learn to add console.logs to trace execution. Copy exact error messages to Google.",
        "resources": [
          {
            "title": "How to Debug",
            "url": "https://jvns.ca/blog/2019/06/23/a-few-debugging-resources/",
            "type": "article",
            "description": "Debugging fundamentals"
          },
          {
            "title": "Reading Error Messages",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors",
            "type": "docs",
            "description": "Understanding JS errors"
          }
        ]
      },
      {
        "value": "research2",
        "label": "I frequently get stuck and need help. I can sometimes find relevant information but struggle with search keywords.",
        "recommendations": [
          "Learn effective Google search techniques",
          "Practice reading Stack Overflow answers",
          "Study how to isolate problems",
          "Build vocabulary of technical terms"
        ],
        "scoreWeight": 0.2,
        "mentorExplanation": "Searching is a skill! Include framework names in searches ('React useState not updating'). Look for recent answers. Read multiple solutions to understand patterns.",
        "resources": [
          {
            "title": "Google Search Tips",
            "url": "https://support.google.com/websearch/answer/2466433",
            "type": "docs",
            "description": "Advanced search"
          },
          {
            "title": "How to Search Stack Overflow",
            "url": "https://stackoverflow.com/help/searching",
            "type": "docs",
            "description": "Effective searching"
          }
        ]
      },
      {
        "value": "research3",
        "label": "I get blocked regularly but can usually find something relevant. I can identify the general area but not the specific issue.",
        "recommendations": [
          "Practice systematic debugging",
          "Learn to use debugger breakpoints",
          "Study your project's architecture",
          "Improve search query formulation"
        ],
        "scoreWeight": 0.3,
        "mentorExplanation": "You're getting closer! Use the debugger to step through code and see exactly where behavior diverges from expectations. This narrows problems from 'somewhere in this feature' to 'this specific line'.",
        "resources": [
          {
            "title": "Chrome DevTools Debugging",
            "url": "https://developer.chrome.com/docs/devtools/javascript/",
            "type": "docs",
            "description": "Using breakpoints"
          },
          {
            "title": "The Art of Googling",
            "url": "https://www.freecodecamp.org/news/how-to-google-like-a-pro-10-tips-for-effective-googling/",
            "type": "article",
            "description": "Search strategies"
          }
        ]
      },
      {
        "value": "research4",
        "label": "I sometimes get blocked but can usually identify the problem area. I find relevant solutions with some trial and error.",
        "recommendations": [
          "Study debugging methodologies",
          "Learn to read source code of libraries",
          "Practice hypothesis-driven debugging",
          "Build mental models of your tech stack"
        ],
        "scoreWeight": 0.4,
        "mentorExplanation": "Solid progress! Form hypotheses about causes, then test them. Keep a log of what you tried and what happened. Pattern recognition develops with practice - you'll start seeing familiar issues.",
        "resources": [
          {
            "title": "Debugging Guide",
            "url": "https://www.theodinproject.com/lessons/foundations-javascript-developer-tools",
            "type": "article",
            "description": "Systematic debugging"
          },
          {
            "title": "Reading Library Source Code",
            "url": "https://kentcdodds.com/blog/how-to-read-source-code",
            "type": "article",
            "description": "Understanding dependencies"
          }
        ]
      },
      {
        "value": "research5",
        "label": "I can usually identify problem areas and find solutions independently. I use effective keywords most of the time.",
        "recommendations": [
          "Search official documentation first",
          "Learn advanced debugging techniques",
          "Study common problem patterns",
          "Practice reading stack traces deeply"
        ],
        "scoreWeight": 0.5,
        "mentorExplanation": "Strong intermediate! Go deeper - understand why solutions work, not just that they work. Read documentation and source code when Stack Overflow isn't enough. Build confidence in unfamiliar territory.",
        "resources": [
          {
            "title": "Beyond Console.log",
            "url": "https://medium.com/front-end-weekly/beyond-console-log-level-up-your-debugging-skills-2e2e4ba94f97",
            "type": "article",
            "description": "Advanced debugging"
          },
          {
            "title": "MDN JavaScript Guide",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
            "type": "docs",
            "description": "Deep reference"
          }
        ]
      },
      {
        "value": "research6",
        "label": "I efficiently identify specific problem areas and find solutions quickly. I know what to search for and where to look.",
        "recommendations": [
          "Contribute answers to help others",
          "Study advanced debugging tools",
          "Learn performance profiling",
          "Read GitHub issues of libraries you use"
        ],
        "scoreWeight": 0.6,
        "mentorExplanation": "Advanced capability! You've built strong research skills. Start helping others - answer Stack Overflow questions, write blog posts about tricky bugs you solved. Teaching reinforces your knowledge.",
        "resources": [
          {
            "title": "Performance Profiling",
            "url": "https://developer.chrome.com/docs/devtools/performance/",
            "type": "docs",
            "description": "Chrome performance tools"
          },
          {
            "title": "GitHub Issue Search",
            "url": "https://docs.github.com/en/search-github/searching-on-github/searching-issues-and-pull-requests",
            "type": "docs",
            "description": "Finding known issues"
          }
        ]
      },
      {
        "value": "research7",
        "label": "I quickly pinpoint problems and find solutions even for complex issues. I search official docs, source code, and GitHub issues effectively.",
        "recommendations": [
          "Solve problems not documented online",
          "Contribute to documentation",
          "Build debugging tools and utilities",
          "Mentor others on problem-solving"
        ],
        "scoreWeight": 0.7,
        "mentorExplanation": "Excellent! You go beyond Stack Overflow to primary sources. Share your expertise - write debugging guides, create tools, establish team practices. Your skills help everyone solve problems faster.",
        "resources": [
          {
            "title": "Writing Technical Docs",
            "url": "https://www.writethedocs.org/guide/",
            "type": "docs",
            "description": "Documentation best practices"
          },
          {
            "title": "Building Dev Tools",
            "url": "https://chromedevtools.github.io/devtools-protocol/",
            "type": "docs",
            "description": "Create debugging tools"
          }
        ]
      },
      {
        "value": "research8",
        "label": "I excel at identifying root causes quickly. I solve problems without existing online solutions by reading specs and source code.",
        "recommendations": [
          "Contribute to open source debugging efforts",
          "Document novel problems and solutions",
          "Lead debugging workshops",
          "Establish team debugging standards"
        ],
        "scoreWeight": 0.8,
        "mentorExplanation": "Senior/expert level! You solve problems few others can. Create resources - runbooks for common issues, debugging playbooks, search strategies. Your approach to problems is a team asset.",
        "resources": [
          {
            "title": "TC39 Proposals",
            "url": "https://github.com/tc39/proposals",
            "type": "github",
            "description": "JavaScript specifications"
          },
          {
            "title": "Web Platform Tests",
            "url": "https://web-platform-tests.org/",
            "type": "docs",
            "description": "Browser standards"
          }
        ]
      },
      {
        "value": "research9",
        "label": "I have mastery-level problem identification skills. I solve deep technical issues by understanding specifications and implementations.",
        "recommendations": [
          "Contribute to language/framework specifications",
          "Publish research on debugging techniques",
          "Speak at conferences about problem-solving",
          "Develop new debugging methodologies"
        ],
        "scoreWeight": 0.9,
        "mentorExplanation": "Outstanding! You identify problems that require spec-level understanding. Share widely - blog posts, conference talks, open source contributions. Influence how the community approaches problems.",
        "resources": [
          {
            "title": "ECMA-262 Spec",
            "url": "https://tc39.es/ecma262/",
            "type": "docs",
            "description": "JavaScript specification"
          },
          {
            "title": "W3C Standards",
            "url": "https://www.w3.org/standards/",
            "type": "docs",
            "description": "Web standards"
          }
        ]
      },
      {
        "value": "research10",
        "label": "I have world-class expertise in problem identification and research. I solve problems that require contributing to specifications or tools.",
        "recommendations": [
          "Lead research initiatives",
          "Contribute to browser/language development",
          "Author definitive debugging guides",
          "Shape industry problem-solving practices"
        ],
        "scoreWeight": 1,
        "mentorExplanation": "Exceptional! You solve problems at the edges of what's possible. Your work defines how problems are approached industry-wide. Focus on maximum leverage - tools, standards, education that help millions.",
        "resources": [
          {
            "title": "V8 Development",
            "url": "https://v8.dev/docs",
            "type": "docs",
            "description": "JavaScript engine development"
          },
          {
            "title": "Chromium Development",
            "url": "https://www.chromium.org/developers/",
            "type": "docs",
            "description": "Browser development"
          }
        ]
      }
    ]
  },
  {
    "id": "3fb989a1-894a-405c-8096-f4660087cf42",
    "title": "How would you describe your approach to experimenting with solutions and implementing fixes?",
    "category": "Problem Solving & Debugging",
    "type": "multiple-choice",
    "hint": "Consider: willingness to try different approaches, experimenting without fear of breaking things, implementing from documentation, solving problems not on Stack Overflow",
    "options": [
      {
        "value": "experiment1",
        "label": "I rarely experiment with different solutions. I'm worried about breaking things and need exact examples to follow.",
        "recommendations": [
          "Set up a safe development environment",
          "Learn to use Git to safely experiment",
          "Practice making small changes and testing",
          "Pair with someone while experimenting"
        ],
        "scoreWeight": 0.1,
        "mentorExplanation": "Fear of breaking things is common but limiting! Use Git branches - you can always undo. Start with small experiments in isolated components. Breaking things in development is how you learn.",
        "resources": [
          {
            "title": "Git Branches Tutorial",
            "url": "https://learngitbranching.js.org/",
            "type": "course",
            "description": "Safe experimentation with Git"
          },
          {
            "title": "Local Development Setup",
            "url": "https://create-react-app.dev/docs/getting-started",
            "type": "docs",
            "description": "Safe dev environment"
          }
        ]
      },
      {
        "value": "experiment2",
        "label": "I sometimes try different solutions but often stick to familiar approaches. I need clear examples to implement.",
        "recommendations": [
          "Practice implementing from documentation",
          "Try 2-3 approaches before choosing one",
          "Build confidence with version control",
          "Learn to read API documentation effectively"
        ],
        "scoreWeight": 0.2,
        "mentorExplanation": "Start building experimentation muscles! Before copying code, try implementing from docs first. Spend 20 minutes experimenting, then look for examples. You'll be surprised how much you can figure out.",
        "resources": [
          {
            "title": "Reading API Docs",
            "url": "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction",
            "type": "docs",
            "description": "Understanding API documentation"
          },
          {
            "title": "Trial and Error Learning",
            "url": "https://www.freecodecamp.org/news/how-to-learn-to-code-by-doing/",
            "type": "article",
            "description": "Learning through experimentation"
          }
        ]
      },
      {
        "value": "experiment3",
        "label": "I experiment with solutions but prefer having examples nearby. I can implement from docs with some guidance.",
        "recommendations": [
          "Practice implementing features from scratch",
          "Study multiple implementation approaches",
          "Build small projects without tutorials",
          "Learn to adapt examples to different contexts"
        ],
        "scoreWeight": 0.3,
        "mentorExplanation": "You're building confidence! Challenge yourself to implement before searching. Read docs, try an approach, debug it. Examples are learning aids, not crutches.",
        "resources": [
          {
            "title": "Project-Based Learning",
            "url": "https://github.com/practical-tutorials/project-based-learning",
            "type": "github",
            "description": "Build to learn"
          },
          {
            "title": "Exercism",
            "url": "https://exercism.org/",
            "type": "course",
            "description": "Practice problems"
          }
        ]
      },
      {
        "value": "experiment4",
        "label": "I often experiment with different approaches. I can implement from documentation for simpler problems.",
        "recommendations": [
          "Tackle more complex implementation challenges",
          "Practice debugging your experiments",
          "Study design patterns and apply them",
          "Build features using only official docs"
        ],
        "scoreWeight": 0.4,
        "mentorExplanation": "Good experimentation habit! Push boundaries - try complex features, experiment with architectures. Your willingness to try things is becoming a strength. Keep building that muscle.",
        "resources": [
          {
            "title": "JavaScript Design Patterns",
            "url": "https://www.patterns.dev/posts/classic-design-patterns",
            "type": "article",
            "description": "Implementation patterns"
          },
          {
            "title": "React Docs Beta",
            "url": "https://react.dev/",
            "type": "docs",
            "description": "Learning from docs"
          }
        ]
      },
      {
        "value": "experiment5",
        "label": "I regularly experiment with solutions and am comfortable trying different approaches. I can implement most features from documentation.",
        "recommendations": [
          "Solve problems without Stack Overflow",
          "Experiment with performance optimizations",
          "Try alternative libraries and approaches",
          "Practice researching from primary sources"
        ],
        "scoreWeight": 0.5,
        "mentorExplanation": "Strong intermediate capability! You have healthy experimentation habits. Now tackle problems without existing solutions. Read RFCs, specs, source code. Trust your ability to figure things out.",
        "resources": [
          {
            "title": "Web Performance",
            "url": "https://web.dev/performance/",
            "type": "docs",
            "description": "Performance optimization"
          },
          {
            "title": "GitHub Discussions",
            "url": "https://docs.github.com/en/discussions",
            "type": "docs",
            "description": "Community problem solving"
          }
        ]
      },
      {
        "value": "experiment6",
        "label": "I confidently experiment without fear of breaking things. I solve problems using documentation and source code even without online examples.",
        "recommendations": [
          "Contribute solutions to help others",
          "Experiment with cutting-edge features",
          "Build proof-of-concepts for new approaches",
          "Document your experimental process"
        ],
        "scoreWeight": 0.6,
        "mentorExplanation": "Advanced! You solve novel problems by going to primary sources. Share your experiments - blog about approaches, contribute examples to docs. Your experimentation helps others tackle similar challenges.",
        "resources": [
          {
            "title": "Write the Docs",
            "url": "https://www.writethedocs.org/",
            "type": "docs",
            "description": "Documentation community"
          },
          {
            "title": "Dev.to",
            "url": "https://dev.to/",
            "type": "article",
            "description": "Share your experiments"
          }
        ]
      },
      {
        "value": "experiment7",
        "label": "I excel at experimental problem-solving. I regularly implement solutions from specs, RFCs, and source code without existing examples.",
        "recommendations": [
          "Lead technical spikes and POCs",
          "Mentor others on experimentation",
          "Contribute to documentation with examples",
          "Build internal tools and libraries"
        ],
        "scoreWeight": 0.7,
        "mentorExplanation": "Excellent! You're comfortable in uncharted territory. Share your process - how you approach unknowns, evaluate experiments, decide when to pivot. This mindset is invaluable for teams tackling novel problems.",
        "resources": [
          {
            "title": "Architecture Decision Records",
            "url": "https://adr.github.io/",
            "type": "docs",
            "description": "Document experiments"
          },
          {
            "title": "IETF RFCs",
            "url": "https://www.ietf.org/standards/rfcs/",
            "type": "docs",
            "description": "Technical specifications"
          }
        ]
      },
      {
        "value": "experiment8",
        "label": "I have expert-level experimentation skills. I solve complex problems by implementing from specs, contributing to libraries, and creating novel solutions.",
        "recommendations": [
          "Lead innovation initiatives",
          "Contribute to framework development",
          "Publish original research and solutions",
          "Establish experimentation best practices"
        ],
        "scoreWeight": 0.8,
        "mentorExplanation": "Senior/expert level! You create solutions where none exist. Build organizational capability - establish experimentation frameworks, create proof-of-concept processes, mentor fearless experimentation.",
        "resources": [
          {
            "title": "Contributing to Open Source",
            "url": "https://opensource.guide/how-to-contribute/",
            "type": "docs",
            "description": "OSS contribution guide"
          },
          {
            "title": "Research Papers",
            "url": "https://paperswelove.org/",
            "type": "article",
            "description": "Academic computer science"
          }
        ]
      },
      {
        "value": "experiment9",
        "label": "I have mastery-level experimentation skills. I innovate solutions, contribute to specifications, and solve problems requiring original research.",
        "recommendations": [
          "Publish influential research",
          "Contribute to language/framework evolution",
          "Lead innovation at industry level",
          "Mentor next-generation problem solvers"
        ],
        "scoreWeight": 0.9,
        "mentorExplanation": "Outstanding! Your experiments push boundaries. Amplify impact - contribute to TC39 proposals, create influential libraries, publish papers. Your work shapes how others approach problems.",
        "resources": [
          {
            "title": "TC39 Contributing",
            "url": "https://github.com/tc39/how-we-work",
            "type": "github",
            "description": "Shape JavaScript"
          },
          {
            "title": "ACM Queue",
            "url": "https://queue.acm.org/",
            "type": "article",
            "description": "Research publication"
          }
        ]
      },
      {
        "value": "experiment10",
        "label": "I have world-class experimentation and innovation capabilities. I create groundbreaking solutions and advance the state of the art.",
        "recommendations": [
          "Lead major research initiatives",
          "Create revolutionary tools and frameworks",
          "Author seminal works on problem-solving",
          "Shape industry innovation practices"
        ],
        "scoreWeight": 1,
        "mentorExplanation": "Exceptional! Your experiments become standards. You solve problems that define new categories. Focus on generational impact - create frameworks used by millions, establish new paradigms, invest in education.",
        "resources": [
          {
            "title": "Google Research",
            "url": "https://research.google/",
            "type": "article",
            "description": "Cutting-edge research"
          },
          {
            "title": "MIT CSAIL",
            "url": "https://www.csail.mit.edu/",
            "type": "article",
            "description": "Computer science research"
          }
        ]
      }
    ]
  },
  {
    "id": "a6b69082-e1f2-4c9f-9ebb-7caecbb29ea4",
    "title": "How would you describe your ability to work independently and figure out what to do next without constant direction?",
    "category": "Independence & Autonomy",
    "type": "multiple-choice",
    "hint": "Consider: continuing independently, deciding next steps, identifying gaps in task descriptions, confidence taking on tasks, filling in missing requirements",
    "options": [
      {
        "value": "autonomy1",
        "label": "I need constant direction and struggle to continue without being told what to do next. I can't figure out missing parts of tasks.",
        "recommendations": [
          "Break tasks into smaller, concrete steps",
          "Create checklists before starting work",
          "Practice asking \"what would I try first?\" before asking",
          "Document what you know vs what you need to clarify"
        ],
        "scoreWeight": 0.1,
        "mentorExplanation": "Building independence starts with structure! Before asking for next steps, spend 5 minutes thinking through options. Make a list: what do I know? What's unclear? What could I try? This builds decision-making muscles.",
        "resources": [
          {
            "title": "Getting Things Done",
            "url": "https://gettingthingsdone.com/",
            "type": "article",
            "description": "Task management basics"
          },
          {
            "title": "Breaking Down Tasks",
            "url": "https://www.atlassian.com/agile/project-management/user-stories",
            "type": "docs",
            "description": "Task decomposition"
          }
        ]
      },
      {
        "value": "autonomy2",
        "label": "I frequently need guidance on what to do next. I struggle to identify or fill gaps in task descriptions independently.",
        "recommendations": [
          "Practice making small decisions without approval",
          "Study similar completed work for patterns",
          "Try solving before asking, even if unsure",
          "Keep notes of how others approach unclear tasks"
        ],
        "scoreWeight": 0.2,
        "mentorExplanation": "Start building confidence in small decisions! When stuck, try something for 15-30 minutes first. Document your attempt - even wrong paths teach you. Ask 'what would success look like?' to identify gaps.",
        "resources": [
          {
            "title": "Decision Making",
            "url": "https://fs.blog/mental-models/",
            "type": "article",
            "description": "Mental models"
          }
        ]
      },
      {
        "value": "autonomy3",
        "label": "I can continue with clear tasks but need direction when requirements are vague. I sometimes identify missing parts.",
        "recommendations": [
          "Practice clarifying requirements yourself first",
          "Look at existing similar features for patterns",
          "Make documented assumptions when unclear",
          "Build confidence proposing approaches"
        ],
        "scoreWeight": 0.3,
        "mentorExplanation": "You're developing! When things are vague, document assumptions: 'I think this means X, will confirm.' Look at similar existing work. Propose an approach rather than asking what to do.",
        "resources": [
          {
            "title": "User Story Mapping",
            "url": "https://www.jpattonassociates.com/user-story-mapping/",
            "type": "article",
            "description": "Understanding requirements"
          },
          {
            "title": "Assumption Testing",
            "url": "https://www.thoughtworks.com/insights/blog/testing-your-assumptions",
            "type": "article",
            "description": "Making smart assumptions"
          }
        ]
      },
      {
        "value": "autonomy4",
        "label": "I can usually decide next steps but sometimes need guidance. I identify some gaps but not all edge cases.",
        "recommendations": [
          "Practice thinking through edge cases",
          "Review completed work to spot patterns",
          "Build confidence in your judgment",
          "Document your decision-making process"
        ],
        "scoreWeight": 0.4,
        "mentorExplanation": "Good progress! Build edge-case thinking: 'What if user does X? What breaks if Y happens?' Study production issues to see what you miss. Your judgment is developing - trust it more.",
        "resources": [
          {
            "title": "Edge Case Thinking",
            "url": "https://www.hillelwayne.com/post/divide-by-zero/",
            "type": "article",
            "description": "Thinking about edge cases"
          },
          {
            "title": "Systems Thinking",
            "url": "https://thesystemsthinker.com/",
            "type": "article",
            "description": "Holistic problem analysis"
          }
        ]
      },
      {
        "value": "autonomy5",
        "label": "I usually work independently and identify most gaps in requirements. I decide next steps confidently most of the time.",
        "recommendations": [
          "Take on more ambiguous projects",
          "Mentor others on breaking down tasks",
          "Document your approach for the team",
          "Practice leading technical discussions"
        ],
        "scoreWeight": 0.5,
        "mentorExplanation": "Strong intermediate autonomy! You're reliable. Now tackle increasingly ambiguous work. Share your process - how do you identify gaps? How do you decide? Teaching others sharpens your own thinking.",
        "resources": [
          {
            "title": "Technical Leadership",
            "url": "https://leaddev.com/",
            "type": "article",
            "description": "Leading through influence"
          },
          {
            "title": "Writing ADRs",
            "url": "https://adr.github.io/",
            "type": "docs",
            "description": "Document decisions"
          }
        ]
      },
      {
        "value": "autonomy6",
        "label": "I work independently, identify gaps, and propose solutions. I confidently decide next steps and fill in missing requirements.",
        "recommendations": [
          "Take ownership of entire features",
          "Lead ambiguous projects",
          "Help define requirements, not just implement",
          "Guide others on independent work"
        ],
        "scoreWeight": 0.6,
        "mentorExplanation": "Advanced autonomy! You don't just execute - you shape work. Start influencing what gets built. Challenge requirements, suggest better approaches, identify risks early. You're ready for ownership.",
        "resources": [
          {
            "title": "Product Thinking",
            "url": "https://www.svpg.com/product-vs-feature-teams/",
            "type": "article",
            "description": "Outcome-oriented thinking"
          },
          {
            "title": "Staff Engineer",
            "url": "https://staffeng.com/",
            "type": "article",
            "description": "Technical leadership"
          }
        ]
      },
      {
        "value": "autonomy7",
        "label": "I excel at independent work, proactively identify gaps and risks, and suggest improvements before being asked.",
        "recommendations": [
          "Own problem spaces, not just tasks",
          "Drive architectural decisions",
          "Mentor team on autonomous work",
          "Shape product direction"
        ],
        "scoreWeight": 0.7,
        "mentorExplanation": "Excellent! You see around corners - identifying issues before they're problems. This is senior-level autonomy. Focus on multiplying impact - build processes, mentor others, shape strategy.",
        "resources": [
          {
            "title": "Multipliers",
            "url": "https://www.multipliersbooks.com/",
            "type": "book",
            "description": "Amplifying others"
          },
          {
            "title": "An Elegant Puzzle",
            "url": "https://lethain.com/elegant-puzzle/",
            "type": "book",
            "description": "Engineering management"
          }
        ]
      },
      {
        "value": "autonomy8",
        "label": "I have expert-level autonomy. I identify problems before they're assigned, define solutions, and drive initiatives independently.",
        "recommendations": [
          "Lead cross-functional initiatives",
          "Establish team working agreements",
          "Build organizational capabilities",
          "Drive technical strategy"
        ],
        "scoreWeight": 0.8,
        "mentorExplanation": "Senior/expert level! You create work, not just complete it. You see what needs to exist. Focus on organizational leverage - build systems that make everyone more autonomous.",
        "resources": [
          {
            "title": "The Manager's Path",
            "url": "https://www.oreilly.com/library/view/the-managers-path/9781491973882/",
            "type": "book",
            "description": "Technical leadership paths"
          },
          {
            "title": "Team Topologies",
            "url": "https://teamtopologies.com/",
            "type": "book",
            "description": "Organizational design"
          }
        ]
      },
      {
        "value": "autonomy9",
        "label": "I have mastery-level independence. I define problems, create solutions, and drive organizational change autonomously.",
        "recommendations": [
          "Shape company technical direction",
          "Build self-sufficient teams",
          "Establish engineering culture",
          "Influence industry practices"
        ],
        "scoreWeight": 0.9,
        "mentorExplanation": "Outstanding! You operate at strategic levels. Your autonomy enables organizational autonomy. Share your approach - write about decision-making, build frameworks, develop future leaders.",
        "resources": [
          {
            "title": "Accelerate",
            "url": "https://itrevolution.com/book/accelerate/",
            "type": "book",
            "description": "High-performing teams"
          },
          {
            "title": "Engineering Culture",
            "url": "https://www.git-tower.com/blog/version-control-best-practices/",
            "type": "article",
            "description": "Building engineering culture"
          }
        ]
      },
      {
        "value": "autonomy10",
        "label": "I have world-class autonomy and self-direction. I identify industry-level problems and drive solutions that benefit thousands.",
        "recommendations": [
          "Lead industry initiatives",
          "Create frameworks used widely",
          "Establish best practices",
          "Build movements, not just products"
        ],
        "scoreWeight": 1,
        "mentorExplanation": "Exceptional! Your autonomy shapes industries. You identify what should exist and make it real. Focus on generational impact - create tools, standards, and practices that outlive any single project.",
        "resources": [
          {
            "title": "The Phoenix Project",
            "url": "https://itrevolution.com/book/the-phoenix-project/",
            "type": "book",
            "description": "DevOps transformation"
          },
          {
            "title": "Open Source Leadership",
            "url": "https://opensource.guide/leadership-and-governance/",
            "type": "docs",
            "description": "Leading communities"
          }
        ]
      }
    ]
  },
  {
    "id": "a6d52d6b-e4da-48f7-8cf9-015006428bd8",
    "title": "How would you describe your approach to seeking help and persisting through challenges?",
    "category": "Independence & Autonomy",
    "type": "multiple-choice",
    "hint": "Consider: frequency of asking for help when info is available, effort to research independently, asking only when stuck, persistence vs giving up",
    "options": [
      {
        "value": "help1",
        "label": "I ask for help very frequently, even when information is available. I give up quickly when stuck.",
        "recommendations": [
          "Commit to trying for 15 minutes before asking",
          "Build a research checklist (docs, Stack Overflow, etc.)",
          "Track what you tried before asking",
          "Set a timer to build persistence"
        ],
        "scoreWeight": 0.1,
        "mentorExplanation": "Building independence means building tolerance for struggle! Set a 15-minute rule: try that long before asking. Document what you tried - this builds problem-solving skills and helps others help you better.",
        "resources": [
          {
            "title": "How to Ask Questions",
            "url": "https://stackoverflow.com/help/how-to-ask",
            "type": "docs",
            "description": "Asking effective questions"
          },
          {
            "title": "Rubber Duck Debugging",
            "url": "https://rubberduckdebugging.com/",
            "type": "article",
            "description": "Self-help technique"
          }
        ]
      },
      {
        "value": "help2",
        "label": "I ask for help frequently and give up somewhat easily. I don't always check available resources first.",
        "recommendations": [
          "Create a \"before I ask\" checklist",
          "Practice Googling your questions first",
          "Read documentation before asking",
          "Try at least 2 approaches before seeking help"
        ],
        "scoreWeight": 0.2,
        "mentorExplanation": "Before asking, complete this checklist: Did I Google it? Check docs? Try two approaches? This builds self-sufficiency. Each time you find answers yourself, it gets easier next time.",
        "resources": [
          {
            "title": "Research Skills",
            "url": "https://missing.csail.mit.edu/",
            "type": "course",
            "description": "Missing CS semester"
          }
        ]
      },
      {
        "value": "help3",
        "label": "I try to solve problems myself but ask for help more than needed. I persist for a while but give up before trying all options.",
        "recommendations": [
          "Extend your struggle time to 30-45 minutes",
          "Exhaust documentation and search results",
          "Try uncommon approaches before asking",
          "Keep a learning journal of solutions found"
        ],
        "scoreWeight": 0.3,
        "mentorExplanation": "You're developing! Push your struggle tolerance. Before asking, ensure you've checked: official docs, Stack Overflow, GitHub issues, similar code. The answer's often there - finding it yourself builds capability.",
        "resources": [
          {
            "title": "Deep Work",
            "url": "https://www.calnewport.com/books/deep-work/",
            "type": "book",
            "description": "Focus and persistence"
          },
          {
            "title": "Growth Mindset",
            "url": "https://www.mindsetworks.com/science/",
            "type": "article",
            "description": "Embracing challenges"
          }
        ]
      },
      {
        "value": "help4",
        "label": "I research independently before asking but still ask more than I need to. I persist through challenges but not always fully.",
        "recommendations": [
          "Join community forums to learn from others",
          "Answer questions to reinforce learning",
          "Build confidence in your solutions",
          "Track when you solve things yourself"
        ],
        "scoreWeight": 0.4,
        "mentorExplanation": "Good foundation! Build confidence - track problems you solve independently. You'll see you can figure out more than you think. When you do ask, you'll ask better questions.",
        "resources": [
          {
            "title": "Deliberate Practice",
            "url": "https://jamesclear.com/deliberate-practice-theory",
            "type": "article",
            "description": "Skill building"
          },
          {
            "title": "StackExchange Network",
            "url": "https://stackexchange.com/",
            "type": "docs",
            "description": "Community learning"
          }
        ]
      },
      {
        "value": "help5",
        "label": "I ask for help only when genuinely stuck after researching. I persist through most challenges without giving up.",
        "recommendations": [
          "Help others with their blockers",
          "Document your problem-solving process",
          "Tackle increasingly complex problems",
          "Build expertise in persistence strategies"
        ],
        "scoreWeight": 0.5,
        "mentorExplanation": "Strong intermediate! You have healthy help-seeking balance. Now help others develop this - share your research process, explain how you persist. Teaching reinforces your own skills.",
        "resources": [
          {
            "title": "Mentoring Guide",
            "url": "https://www.codementor.io/learn/mentorship",
            "type": "article",
            "description": "Helping others"
          }
        ]
      },
      {
        "value": "help6",
        "label": "I rarely ask for help, researching thoroughly first. I persist through difficult problems and exhaust options before asking.",
        "recommendations": [
          "Share your research strategies",
          "Mentor others on persistence",
          "Tackle expert-level problems",
          "Contribute solutions to documentation"
        ],
        "scoreWeight": 0.6,
        "mentorExplanation": "Advanced self-sufficiency! You're a resource others can learn from. Document your problem-solving approaches. Help build a team culture of healthy persistence and smart help-seeking.",
        "resources": [
          {
            "title": "Technical Writing",
            "url": "https://developers.google.com/tech-writing",
            "type": "course",
            "description": "Document solutions"
          },
          {
            "title": "Building Learning Organizations",
            "url": "https://hbr.org/2008/03/is-yours-a-learning-organization",
            "type": "article",
            "description": "Team learning"
          }
        ]
      },
      {
        "value": "help7",
        "label": "I solve nearly all problems independently. I only ask when collaborating with experts on complex edge cases.",
        "recommendations": [
          "Lead problem-solving workshops",
          "Create team troubleshooting guides",
          "Build knowledge bases",
          "Establish escalation criteria"
        ],
        "scoreWeight": 0.7,
        "mentorExplanation": "Excellent! Your independence is a strength. Share it - create troubleshooting guides, define when to ask for help vs persist. Your approach helps the whole team become more self-sufficient.",
        "resources": [
          {
            "title": "Documentation Best Practices",
            "url": "https://www.writethedocs.org/guide/",
            "type": "docs",
            "description": "Creating guides"
          }
        ]
      },
      {
        "value": "help8",
        "label": "I have expert-level self-sufficiency. I solve complex problems independently and help others build their independence.",
        "recommendations": [
          "Scale your impact through systems",
          "Build self-service tools and docs",
          "Establish team learning culture",
          "Reduce organizational dependencies"
        ],
        "scoreWeight": 0.8,
        "mentorExplanation": "Senior/expert level! You multiply team capability. Build systems that make everyone more independent - comprehensive docs, debugging tools, clear escalation paths. Your impact extends through others.",
        "resources": [
          {
            "title": "The Coaching Habit",
            "url": "https://boxofcrayons.com/the-coaching-habit-book/",
            "type": "book",
            "description": "Developing others"
          },
          {
            "title": "Scaling Teams",
            "url": "https://www.scalingteams.com/",
            "type": "book",
            "description": "Growing capabilities"
          }
        ]
      },
      {
        "value": "help9",
        "label": "I have mastery-level independence. I solve novel problems and build systems that enable organizational self-sufficiency.",
        "recommendations": [
          "Create learning infrastructure",
          "Establish best practices widely",
          "Build autonomous teams",
          "Influence industry standards"
        ],
        "scoreWeight": 0.9,
        "mentorExplanation": "Outstanding! You create independence at scale. Your tools, docs, and systems let thousands solve problems themselves. Share widely - blog posts, conference talks, open source. Shape how teams work.",
        "resources": [
          {
            "title": "Developer Experience",
            "url": "https://developerexperience.io/",
            "type": "article",
            "description": "Enabling developers"
          },
          {
            "title": "Platform Engineering",
            "url": "https://platformengineering.org/",
            "type": "docs",
            "description": "Self-service infrastructure"
          }
        ]
      },
      {
        "value": "help10",
        "label": "I have world-class self-sufficiency. I solve unprecedented problems and create frameworks that enable independence globally.",
        "recommendations": [
          "Lead industry-wide initiatives",
          "Create revolutionary tools",
          "Establish global best practices",
          "Build movements for self-sufficiency"
        ],
        "scoreWeight": 1,
        "mentorExplanation": "Exceptional! Your work enables millions to solve problems independently. Tools you create, standards you establish, practices you pioneer - these have generational impact. Focus on maximum leverage and legacy.",
        "resources": [
          {
            "title": "Open Source Economics",
            "url": "https://opensource.org/",
            "type": "docs",
            "description": "Global collaboration"
          },
          {
            "title": "Creative Selection",
            "url": "https://creativeselection.io/",
            "type": "book",
            "description": "Innovation at scale"
          }
        ]
      }
    ]
  },
  {
    "id": "8d9d30d6-c749-4561-8578-2f2987c9a753",
    "title": "How would you describe the quality of your work and your attention to detail?",
    "category": "Precision & Attention to Detail",
    "type": "multiple-choice",
    "hint": "Consider: error frequency, catching small inconsistencies, reviewing your own work thoroughly, producing consistent quality output",
    "options": [
      {
        "value": "quality1",
        "label": "My work frequently contains errors. I often overlook details and inconsistencies.",
        "recommendations": [
          "Create personal checklists for common errors",
          "Use linters and automated tools",
          "Practice reviewing code before submitting",
          "Ask for code review feedback on detail issues"
        ],
        "scoreWeight": 0.1,
        "mentorExplanation": "Building attention to detail is a learnable skill! Start with a review checklist: Does it compile? Did I test it? Are variable names clear? Run automated tools to catch common issues. Review your own work before asking others.",
        "resources": [
          {
            "title": "ESLint Setup",
            "url": "https://eslint.org/docs/latest/use/getting-started",
            "type": "docs",
            "description": "Automated error detection"
          },
          {
            "title": "Code Review Checklist",
            "url": "https://github.com/mgreiler/code-review-checklist",
            "type": "github",
            "description": "Quality checklist"
          }
        ]
      },
      {
        "value": "quality2",
        "label": "I produce work with noticeable errors regularly. I miss many details during review.",
        "recommendations": [
          "Slow down and review methodically",
          "Test your changes thoroughly",
          "Learn common error patterns",
          "Use TypeScript for type safety"
        ],
        "scoreWeight": 0.2,
        "mentorExplanation": "Quality improves with deliberate practice! Before marking work complete, test it yourself. Click through features. Try edge cases. Read your code as if you didn't write it. Slow down to speed up.",
        "resources": [
          {
            "title": "TypeScript Handbook",
            "url": "https://www.typescriptlang.org/docs/",
            "type": "docs",
            "description": "Type safety"
          },
          {
            "title": "Testing JavaScript",
            "url": "https://testingjavascript.com/",
            "type": "course",
            "description": "Testing fundamentals"
          }
        ]
      },
      {
        "value": "quality3",
        "label": "My work has occasional errors. I catch some details but miss smaller inconsistencies.",
        "recommendations": [
          "Develop a consistent review process",
          "Learn to spot common error patterns",
          "Use debugging tools proactively",
          "Practice self-review techniques"
        ],
        "scoreWeight": 0.3,
        "mentorExplanation": "You're improving! Build a habit: after writing code, walk away for 5 minutes, then review fresh. Look for: inconsistent naming, missing error handling, untested paths. Pattern recognition develops over time.",
        "resources": [
          {
            "title": "Clean Code",
            "url": "https://www.oreilly.com/library/view/clean-code-a/9780136083238/",
            "type": "book",
            "description": "Code quality principles"
          },
          {
            "title": "Self-Review Guide",
            "url": "https://google.github.io/eng-practices/review/developer/",
            "type": "docs",
            "description": "Google code review guide"
          }
        ]
      },
      {
        "value": "quality4",
        "label": "I generally produce quality work with minor errors. I catch most issues but occasionally miss details.",
        "recommendations": [
          "Establish thorough testing habits",
          "Review edge cases systematically",
          "Learn advanced debugging techniques",
          "Study quality work from senior developers"
        ],
        "scoreWeight": 0.4,
        "mentorExplanation": "Good foundation! Level up by anticipating issues before they occur. Think: 'What could break?' Test those cases. Review for consistency across the codebase. Quality is about prevention, not just detection.",
        "resources": [
          {
            "title": "Jest Testing",
            "url": "https://jestjs.io/docs/getting-started",
            "type": "docs",
            "description": "Testing framework"
          },
          {
            "title": "Refactoring",
            "url": "https://refactoring.com/",
            "type": "book",
            "description": "Improving code quality"
          }
        ]
      },
      {
        "value": "quality5",
        "label": "I consistently produce high-quality work with few errors. I catch most details during self-review.",
        "recommendations": [
          "Mentor others on quality practices",
          "Establish team quality standards",
          "Automate quality checks",
          "Review complex edge cases proactively"
        ],
        "scoreWeight": 0.5,
        "mentorExplanation": "Strong intermediate quality! Your work is reliable. Now help others reach this level - share your review process, create quality guidelines, build automated checks. Quality culture starts with individuals.",
        "resources": [
          {
            "title": "Code Quality Tools",
            "url": "https://github.com/collections/code-quality",
            "type": "github",
            "description": "Quality automation"
          },
          {
            "title": "The Pragmatic Programmer",
            "url": "https://pragprog.com/titles/tpp20/",
            "type": "book",
            "description": "Professional practices"
          }
        ]
      },
      {
        "value": "quality6",
        "label": "I produce error-free work consistently. I have strong attention to detail and rarely miss issues.",
        "recommendations": [
          "Review others' work to share standards",
          "Build quality tooling and processes",
          "Establish best practices for the team",
          "Focus on preventing entire error categories"
        ],
        "scoreWeight": 0.6,
        "mentorExplanation": "Advanced quality mindset! You prevent issues, not just catch them. Share this - create linting rules, write style guides, build CI/CD checks. Your attention to detail becomes team capability.",
        "resources": [
          {
            "title": "Continuous Integration",
            "url": "https://www.martinfowler.com/articles/continuousIntegration.html",
            "type": "article",
            "description": "Automated quality"
          },
          {
            "title": "SonarQube",
            "url": "https://www.sonarsource.com/products/sonarqube/",
            "type": "docs",
            "description": "Code quality platform"
          }
        ]
      },
      {
        "value": "quality7",
        "label": "I excel at producing flawless work. I catch subtle issues others miss and maintain exceptional standards.",
        "recommendations": [
          "Lead quality initiatives",
          "Create comprehensive quality frameworks",
          "Mentor team on detail orientation",
          "Drive quality culture change"
        ],
        "scoreWeight": 0.7,
        "mentorExplanation": "Excellent! Your eye for detail is a competitive advantage. Scale it - build quality into processes, create automated checks, establish team standards. Quality leadership means everyone produces better work.",
        "resources": [
          {
            "title": "Site Reliability Engineering",
            "url": "https://sre.google/books/",
            "type": "book",
            "description": "Quality at scale"
          },
          {
            "title": "Quality Engineering",
            "url": "https://www.ministryoftesting.com/",
            "type": "article",
            "description": "Quality practices"
          }
        ]
      },
      {
        "value": "quality8",
        "label": "I have expert-level precision. I consistently deliver perfect work and establish quality standards for others.",
        "recommendations": [
          "Build organizational quality systems",
          "Develop quality metrics and dashboards",
          "Create quality training programs",
          "Influence engineering culture"
        ],
        "scoreWeight": 0.8,
        "mentorExplanation": "Senior/expert level! Your precision sets the bar. Build systems - quality dashboards, automated testing pipelines, code review guidelines. Your standards become organizational standards.",
        "resources": [
          {
            "title": "Google Testing Blog",
            "url": "https://testing.googleblog.com/",
            "type": "article",
            "description": "Testing at scale"
          },
          {
            "title": "Quality Metrics",
            "url": "https://www.atlassian.com/engineering/software-quality",
            "type": "article",
            "description": "Measuring quality"
          }
        ]
      },
      {
        "value": "quality9",
        "label": "I have mastery-level precision. I create quality frameworks and tools that elevate entire organizations.",
        "recommendations": [
          "Lead industry quality initiatives",
          "Publish quality research and tools",
          "Establish best practices widely",
          "Build quality into engineering culture"
        ],
        "scoreWeight": 0.9,
        "mentorExplanation": "Outstanding! You define what quality means. Your frameworks, tools, and practices are adopted widely. Share through open source, conference talks, influential writing. Shape industry standards.",
        "resources": [
          {
            "title": "Test Automation University",
            "url": "https://testautomationu.applitools.com/",
            "type": "course",
            "description": "Advanced testing"
          },
          {
            "title": "Chaos Engineering",
            "url": "https://principlesofchaos.org/",
            "type": "docs",
            "description": "System resilience"
          }
        ]
      },
      {
        "value": "quality10",
        "label": "I have world-class precision standards. My quality frameworks and practices are used globally.",
        "recommendations": [
          "Create revolutionary quality tools",
          "Establish global quality standards",
          "Lead transformational initiatives",
          "Build quality movements"
        ],
        "scoreWeight": 1,
        "mentorExplanation": "Exceptional! Your work defines modern quality standards. Tools you create, practices you pioneer, frameworks you build - used by millions. Focus on generational impact in quality engineering.",
        "resources": [
          {
            "title": "NASA Software Engineering",
            "url": "https://standards.nasa.gov/",
            "type": "docs",
            "description": "Critical systems quality"
          },
          {
            "title": "Formal Methods",
            "url": "https://www.hillelwayne.com/post/making-illegal-states-unrepresentable/",
            "type": "article",
            "description": "Provable correctness"
          }
        ]
      }
    ]
  },
  {
    "id": "0c273934-629a-4a68-aa49-43cd66ef7fbc",
    "title": "How would you describe your ability to follow instructions and prevent bugs in your code?",
    "category": "Precision & Attention to Detail",
    "type": "multiple-choice",
    "hint": "Consider: following given instructions accurately, implementing feedback correctly, bug frequency in your contributions, speed of identifying and fixing your own errors",
    "options": [
      {
        "value": "bugs1",
        "label": "I frequently create bugs and often fail to follow instructions correctly. I need significant help fixing issues.",
        "recommendations": [
          "Read instructions completely before starting",
          "Take notes during discussions",
          "Test thoroughly before submitting",
          "Ask clarifying questions upfront"
        ],
        "scoreWeight": 0.1,
        "mentorExplanation": "Start with clarity! Before coding, list what you're asked to do. Confirm understanding. Test each requirement. When you get feedback, implement it exactly, then verify. Precision comes from process.",
        "resources": [
          {
            "title": "Requirement Analysis",
            "url": "https://www.atlassian.com/agile/project-management/requirements",
            "type": "docs",
            "description": "Understanding requirements"
          },
          {
            "title": "Bug Prevention",
            "url": "https://www.amazon.com/Code-Complete-Practical-Handbook-Construction/dp/0735619670",
            "type": "book",
            "description": "Writing solid code"
          }
        ]
      },
      {
        "value": "bugs2",
        "label": "I often create bugs and sometimes misunderstand instructions. I can fix issues with guidance.",
        "recommendations": [
          "Create acceptance criteria checklists",
          "Test against requirements systematically",
          "Learn common bug patterns to avoid",
          "Document implementation before coding"
        ],
        "scoreWeight": 0.2,
        "mentorExplanation": "Build systematic habits! For every task: 1) List requirements, 2) Plan approach, 3) Implement, 4) Test each requirement, 5) Review. This structure reduces bugs and ensures you deliver what's asked.",
        "resources": [
          {
            "title": "Acceptance Testing",
            "url": "https://www.agilealliance.org/glossary/acceptance/",
            "type": "article",
            "description": "Testing against requirements"
          },
          {
            "title": "Debugging Strategies",
            "url": "https://jvns.ca/blog/2019/06/23/a-few-debugging-resources/",
            "type": "article",
            "description": "Finding bugs"
          }
        ]
      },
      {
        "value": "bugs3",
        "label": "I occasionally create bugs and sometimes need clarification on instructions. I can usually fix issues myself.",
        "recommendations": [
          "Improve requirement understanding",
          "Test edge cases more thoroughly",
          "Learn defensive programming",
          "Practice reproducing and fixing bugs quickly"
        ],
        "scoreWeight": 0.3,
        "mentorExplanation": "You're developing! Reduce bugs by thinking: 'What could go wrong?' Test those cases. When you get instructions, repeat them back to confirm. When bugs appear, fix quickly and learn the pattern.",
        "resources": [
          {
            "title": "Defensive Programming",
            "url": "https://en.wikipedia.org/wiki/Defensive_programming",
            "type": "article",
            "description": "Preventing errors"
          },
          {
            "title": "Error Handling",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling",
            "type": "docs",
            "description": "Handling failures"
          }
        ]
      },
      {
        "value": "bugs4",
        "label": "I follow instructions well with occasional need for clarification. I create bugs sometimes but fix them independently.",
        "recommendations": [
          "Proactively clarify ambiguities",
          "Build comprehensive test coverage",
          "Learn from bugs to prevent recurrence",
          "Review your code for potential issues"
        ],
        "scoreWeight": 0.4,
        "mentorExplanation": "Good progress! When instructions are unclear, ask before implementing (saves time). After a bug, ask: 'How could I have prevented this?' Build that check into your process. Learn from every issue.",
        "resources": [
          {
            "title": "Test-Driven Development",
            "url": "https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530",
            "type": "book",
            "description": "TDD approach"
          },
          {
            "title": "Bug Tracking",
            "url": "https://linear.app/docs",
            "type": "docs",
            "description": "Issue management"
          }
        ]
      },
      {
        "value": "bugs5",
        "label": "I follow instructions accurately and rarely create bugs. I quickly identify and fix my own issues.",
        "recommendations": [
          "Share your bug prevention techniques",
          "Help others understand requirements",
          "Build testing best practices",
          "Document common pitfalls"
        ],
        "scoreWeight": 0.5,
        "mentorExplanation": "Strong intermediate! You're reliable - following instructions well and delivering quality. Now help others - share your approach, review their work, create guides for common issues. Multiply your impact.",
        "resources": [
          {
            "title": "Code Review Best Practices",
            "url": "https://google.github.io/eng-practices/review/",
            "type": "docs",
            "description": "Effective reviews"
          },
          {
            "title": "Quality Assurance",
            "url": "https://www.ministryoftesting.com/dojo/lessons/what-is-quality-assurance",
            "type": "article",
            "description": "QA practices"
          }
        ]
      },
      {
        "value": "bugs6",
        "label": "I consistently follow instructions precisely and rarely introduce bugs. I fix issues quickly when they occur.",
        "recommendations": [
          "Lead by example in code quality",
          "Create bug prevention processes",
          "Establish testing standards",
          "Mentor others on precision"
        ],
        "scoreWeight": 0.6,
        "mentorExplanation": "Advanced reliability! People trust your implementations. Build on this - create team standards for requirement clarification, testing protocols, bug prevention checklists. Your precision becomes team capability.",
        "resources": [
          {
            "title": "Static Analysis",
            "url": "https://github.com/analysis-tools-dev/static-analysis",
            "type": "github",
            "description": "Automated bug detection"
          },
          {
            "title": "Integration Testing",
            "url": "https://martinfowler.com/bliki/IntegrationTest.html",
            "type": "article",
            "description": "Testing interactions"
          }
        ]
      },
      {
        "value": "bugs7",
        "label": "I excel at precise implementation and almost never create bugs. I often exceed expectations in following directions.",
        "recommendations": [
          "Drive quality initiatives",
          "Build comprehensive testing frameworks",
          "Create requirement templates",
          "Establish team quality culture"
        ],
        "scoreWeight": 0.7,
        "mentorExplanation": "Excellent! You're a model of precision. Scale this - build requirement templates, create testing frameworks, establish review processes. Help the team achieve your level of reliability.",
        "resources": [
          {
            "title": "Behavior-Driven Development",
            "url": "https://cucumber.io/docs/bdd/",
            "type": "docs",
            "description": "BDD approach"
          },
          {
            "title": "Quality Gates",
            "url": "https://docs.sonarsource.com/sonarqube/latest/user-guide/quality-gates/",
            "type": "docs",
            "description": "Automated quality checks"
          }
        ]
      },
      {
        "value": "bugs8",
        "label": "I have expert-level precision in implementation. I virtually never create bugs and always implement feedback flawlessly.",
        "recommendations": [
          "Establish organizational quality standards",
          "Build prevention-focused systems",
          "Create quality training programs",
          "Drive cultural change around precision"
        ],
        "scoreWeight": 0.8,
        "mentorExplanation": "Senior/expert level! Your work is production-ready on first submission. Build systems - automated testing pipelines, quality metrics, requirement frameworks. Your precision sets organizational standards.",
        "resources": [
          {
            "title": "Release Engineering",
            "url": "https://sre.google/sre-book/release-engineering/",
            "type": "book",
            "description": "Production reliability"
          },
          {
            "title": "Quality Culture",
            "url": "https://www.scaledagileframework.com/built-in-quality/",
            "type": "article",
            "description": "Built-in quality"
          }
        ]
      },
      {
        "value": "bugs9",
        "label": "I have mastery-level precision. I create bug-free systems and help organizations achieve near-zero defect rates.",
        "recommendations": [
          "Lead industry quality transformations",
          "Publish on bug prevention",
          "Create widely-used quality tools",
          "Influence engineering practices broadly"
        ],
        "scoreWeight": 0.9,
        "mentorExplanation": "Outstanding! You achieve near-perfect implementation. Share this mastery - publish methodologies, create frameworks, speak at conferences. Influence how the industry thinks about quality and precision.",
        "resources": [
          {
            "title": "Lean Software Development",
            "url": "https://www.amazon.com/Implementing-Lean-Software-Development-Concept/dp/0321437381",
            "type": "book",
            "description": "Zero-defect thinking"
          },
          {
            "title": "Microsoft Research",
            "url": "https://www.microsoft.com/en-us/research/",
            "type": "article",
            "description": "Quality research"
          }
        ]
      },
      {
        "value": "bugs10",
        "label": "I have world-class precision standards. My bug prevention frameworks and quality practices are used globally.",
        "recommendations": [
          "Create revolutionary quality systems",
          "Establish global standards",
          "Lead critical systems development",
          "Shape industry quality practices"
        ],
        "scoreWeight": 1,
        "mentorExplanation": "Exceptional! Your precision enables mission-critical systems. Your frameworks prevent bugs at scale. Focus on maximum impact - create tools and standards that ensure quality for millions of users worldwide.",
        "resources": [
          {
            "title": "Safety-Critical Systems",
            "url": "https://www.amazon.com/Safety-Critical-Computer-Systems-Neil-Storey/dp/0201427877",
            "type": "book",
            "description": "Critical system quality"
          },
          {
            "title": "Formal Verification",
            "url": "https://www.amazon.com/Principles-Model-Checking-MIT-Press/dp/0262026499",
            "type": "book",
            "description": "Provable correctness"
          }
        ]
      }
    ]
  }
];


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