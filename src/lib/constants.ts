import { Question } from '@/types';

export const APP_NAME = 'Developer Self-Assessment';

export const CATEGORIES = {
  TECHNICAL_SKILLS: 'Technical Skills',
  PROBLEM_SOLVING: 'Problem Solving',
  COLLABORATION: 'Collaboration',
  COMMUNICATION: 'Communication',
  LEARNING: 'Learning & Growth',
  CORE_CONCEPTS: 'Core Programming Concepts',
  CODE_QUALITY: 'Code Quality & Best Practices',
  VERSION_CONTROL: 'Version Control & Git',
  ALGORITHMS: 'Data Structures & Algorithms',
  DEBUGGING: 'Debugging & Problem Analysis',
} as const;

export const QUESTIONS: Question[] = [
  // Question 1: Programming Language Proficiency (Scale)
  {
    id: 'q1',
    title: 'How would you rate your proficiency in your primary programming language(s)?',
    category: CATEGORIES.TECHNICAL_SKILLS,
    type: 'scale',
    min: 1,
    max: 10,
    hint: 'Consider: syntax mastery, best practices, design patterns, advanced features',
  },

  // Question 2: Tech Stack (Enhanced with 12 options)
  {
    id: 'q2',
    title: 'Which technologies do you currently work with? (Select all that apply)',
    category: CATEGORIES.TECHNICAL_SKILLS,
    type: 'tech-stack',
    followUpQuestion: 'How many years of experience do you have with each?',
    hint: 'Select the technologies you use regularly or have significant experience with',
    options: [
      { 
        value: 'react', 
        label: 'React', 
        recommendations: ['Build a full-stack React application', 'Master React hooks and performance optimization', 'Learn state management patterns', 'Practice component composition', 'Optimize rendering performance', 'Build accessible React apps'], 
        scoreWeight: 0.8,
        mentorExplanation: 'React is incredibly powerful for building modern user interfaces! Here\'s the thing - React is actually pretty simple at its core (it\'s just JavaScript), but the ecosystem can feel overwhelming. Focus on mastering hooks first - useState, useEffect, and custom hooks will take you far. Then, understand how React renders and re-renders - this knowledge prevents performance issues. Remember: React is declarative, which means you describe what the UI should look like, and React figures out how to make it happen. This mindset shift is crucial! Build small projects to practice, then gradually tackle state management (Context, Redux, Zustand). The best way to learn React is by building - start with something simple like a todo app, then level up to something more complex.',
        resources: [
          { title: 'Epic React by Kent C. Dodds', url: 'https://epicreact.dev', type: 'course', description: 'Comprehensive React course from beginner to advanced. Best structured learning path for React.' },
          { title: 'React Official Docs', url: 'https://react.dev', type: 'docs', description: 'Completely revamped docs with interactive examples. Start here for fundamentals.' },
          { title: 'Full Stack Open', url: 'https://fullstackopen.com/', type: 'course', description: 'Free university-level course covering React, Node.js, and full-stack development.' },
          { title: 'React Patterns', url: 'https://www.patterns.dev/posts/reactjs/', type: 'article', description: 'Modern React patterns and best practices. Great for intermediate developers.' },
          { title: 'JavaScript to Know for React', url: 'https://kentcdodds.com/blog/javascript-to-know-for-react', type: 'article', description: 'Essential JavaScript concepts before diving deep into React.' },
        ]
      },
      { 
        value: 'nodejs', 
        label: 'Node.js', 
        recommendations: ['Create a REST API with Express', 'Master async/await and the event loop', 'Learn streams and buffers', 'Build real-time applications', 'Understand middleware patterns', 'Optimize Node.js performance'], 
        scoreWeight: 0.8,
        mentorExplanation: 'Node.js brings JavaScript to the backend, which is powerful because you can use one language across your entire stack! But here\'s what trips people up: Node.js is single-threaded with an event loop, which means it handles concurrency differently than languages like Java or Python. You need to understand async/await deeply - it\'s not just syntax, it\'s about thinking in asynchronous patterns. Learn about streams (they\'re super efficient for handling large data), middleware patterns (especially in Express), and error handling (unhandled promise rejections can crash your server!). Node.js shines for I/O-heavy operations like APIs and real-time apps. Start by building a REST API, then graduate to WebSockets or GraphQL. The ecosystem (npm) is massive - both a blessing and a curse. Choose packages wisely!',
        resources: [
          { title: 'Node.js Design Patterns (3rd Edition)', url: 'https://www.nodejsdesignpatterns.com/', type: 'book', description: 'Deep dive into Node.js patterns, async programming, and best practices. Industry standard.' },
          { title: 'Node.js Best Practices', url: 'https://github.com/goldbergyoni/nodebestpractices', type: 'github', description: 'Comprehensive collection of 100+ best practices. Updated regularly.' },
          { title: 'Learn Node.js', url: 'https://nodejs.dev/learn', type: 'docs', description: 'Official learning resources with hands-on examples.' },
          { title: 'Node.js: The Complete Guide', url: 'https://www.udemy.com/course/nodejs-the-complete-guide/', type: 'course', description: 'Comprehensive course covering APIs, authentication, and deployment.' },
          { title: 'Stream Handbook', url: 'https://github.com/substack/stream-handbook', type: 'github', description: 'Essential guide to Node.js streams - crucial for efficient data handling.' },
        ]
      },
      { 
        value: 'typescript', 
        label: 'TypeScript', 
        recommendations: ['Convert a JavaScript project to TypeScript', 'Master advanced types and generics', 'Learn utility types', 'Understand type inference', 'Practice type narrowing', 'Build type-safe APIs'], 
        scoreWeight: 0.9,
        mentorExplanation: 'TypeScript is a game-changer! At first it might feel like extra work, but once you experience catching bugs at compile time instead of runtime, you\'ll never want to go back. Here\'s my advice: start gradually. Don\'t try to make everything perfectly typed immediately - use "any" sparingly at first, then tighten types as you learn. Focus on understanding type inference (TypeScript is smart - let it infer types when obvious), learn the utility types (Partial, Pick, Omit, etc. - they\'re incredibly useful), and practice type narrowing with type guards. The real power comes when you use generics - they let you write reusable, type-safe code. TypeScript isn\'t just about avoiding errors; it\'s about making your code self-documenting and enabling better autocomplete. This makes you faster! The investment pays off quickly.',
        resources: [
          { title: 'Total TypeScript by Matt Pocock', url: 'https://www.totaltypescript.com/', type: 'course', description: 'Excellent interactive TypeScript course from beginner to advanced. Matt explains complex concepts clearly.' },
          { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', type: 'docs', description: 'Comprehensive official documentation. Best reference for TypeScript features.' },
          { title: 'Type Challenges', url: 'https://github.com/type-challenges/type-challenges', type: 'github', description: 'Practice TypeScript types with challenges from easy to extreme. Learn by doing!' },
          { title: 'Effective TypeScript', url: 'https://effectivetypescript.com/', type: 'book', description: '62 specific ways to improve your TypeScript. Great for intermediate developers.' },
          { title: 'TypeScript Deep Dive', url: 'https://basarat.gitbook.io/typescript/', type: 'article', description: 'Free book covering TypeScript in depth. Excellent resource for understanding internals.' },
          { title: 'React TypeScript Cheatsheet', url: 'https://react-typescript-cheatsheet.netlify.app/', type: 'docs', description: 'Essential patterns for using TypeScript with React. Community-maintained.' },
        ]
      },
      { 
        value: 'python', 
        label: 'Python', 
        recommendations: ['Build a data processing pipeline', 'Learn Pythonic idioms and best practices', 'Master list comprehensions', 'Understand decorators and context managers', 'Learn async Python', 'Build CLI tools'], 
        scoreWeight: 0.8,
        mentorExplanation: 'Python is wonderfully versatile - you can build web apps, automate tasks, process data, or even do machine learning! The language emphasizes readability: "code is read more often than it\'s written." Focus on writing "Pythonic" code - use list comprehensions, understand the Zen of Python ("import this"), leverage the amazing standard library (it has so much built-in!). Python\'s philosophy is "there should be one obvious way to do it," which is refreshing. Learn about decorators (they\'re powerful for adding functionality), context managers (the "with" statement), and when you\'re ready, async/await in Python. The ecosystem is massive: Django/Flask for web, Pandas/NumPy for data, FastAPI for modern APIs. Start with the fundamentals, then specialize based on your interests. Python\'s gentle learning curve makes it great for beginners, but there\'s depth for experts too!',
        resources: [
          { title: 'Fluent Python (2nd Edition)', url: 'https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/', type: 'book', description: 'The best book for writing Pythonic code. From intermediate to advanced. Must-read for serious Python developers!' },
          { title: 'Real Python', url: 'https://realpython.com/', type: 'article', description: 'High-quality Python tutorials on everything from basics to advanced topics. Excellent explanations and practical examples.' },
          { title: 'Python Official Tutorial', url: 'https://docs.python.org/3/tutorial/', type: 'docs', description: 'Start here for fundamentals. Official docs are well-written and comprehensive.' },
          { title: 'Automate the Boring Stuff', url: 'https://automatetheboringstuff.com/', type: 'book', description: 'Free book teaching Python through practical automation tasks. Perfect for beginners!' },
          { title: 'Python Design Patterns', url: 'https://python-patterns.guide/', type: 'article', description: 'Learn design patterns in Python context. From basic to advanced patterns with clear examples.' },
        ]
      },
      { 
        value: 'java', 
        label: 'Java', 
        recommendations: ['Study design patterns in Java', 'Build a Spring Boot application', 'Master Java streams and lambdas', 'Understand JVM internals', 'Learn dependency injection', 'Build microservices'], 
        scoreWeight: 0.8,
        mentorExplanation: 'Java has staying power - it\'s been enterprise-grade for decades! Here\'s what makes Java valuable: strong OOP principles, robust type system, and massive ecosystem. Modern Java (8+) is quite different from old Java - lambdas, streams, and Optional make code much more expressive. The JVM is incredibly mature and performant. Spring Boot is basically the standard for Java backend development - learn it well! Focus on understanding dependency injection (core to Spring), learn the Streams API (powerful functional programming), and understand how the JVM works (garbage collection, memory management). Java\'s verbosity is decreasing with each version. The ecosystem is battle-tested - when you need a library, it exists and it\'s probably maintained. Java teaches discipline: explicit typing, proper OOP, design patterns. These principles transfer to other languages. Great for building scalable, maintainable systems!',
        resources: [
          { title: 'Effective Java (3rd Edition)', url: 'https://www.oreilly.com/library/view/effective-java/9780134686097/', type: 'book', description: 'The definitive guide to Java best practices. Essential reading for every Java developer.' },
          { title: 'Spring Boot Official Guides', url: 'https://spring.io/guides', type: 'docs', description: 'Official Spring Boot tutorials. Learn by building real applications step by step.' },
          { title: 'Java Design Patterns', url: 'https://github.com/iluwatar/java-design-patterns', type: 'github', description: 'Comprehensive collection of design patterns implemented in Java. Over 200 patterns with explanations!' },
          { title: 'Java Programming Masterclass', url: 'https://www.udemy.com/course/java-the-complete-java-developer-course/', type: 'course', description: 'Comprehensive Java course from basics to advanced. Updated for modern Java versions.' },
          { title: 'Baeldung', url: 'https://www.baeldung.com/', type: 'article', description: 'High-quality Java and Spring tutorials. Great for learning specific concepts with practical examples.' },
        ]
      },
      { 
        value: 'sql', 
        label: 'SQL/Databases', 
        recommendations: ['Optimize database queries', 'Design normalized schemas', 'Learn indexing strategies', 'Master JOINs and subqueries', 'Understand transactions and ACID'], 
        scoreWeight: 0.75,
        mentorExplanation: 'SQL is fundamental for data persistence and one of those skills that never goes out of style! Here\'s the thing: databases are more than just storage - they\'re the backbone of most applications. Start with understanding relational concepts: tables, relationships, normalization. Then master SQL queries - SELECT, JOIN, GROUP BY, subqueries. The real magic happens when you understand query optimization: indexes, execution plans, and query performance. Learn about ACID properties and transactions - crucial for data integrity. Different databases (PostgreSQL, MySQL, SQL Server) have quirks, but core SQL concepts transfer. NoSQL is popular, but don\'t skip SQL - it\'s still dominant in the industry. A developer who truly understands databases becomes invaluable. Your backend code is only as good as your database design!',
        resources: [
          { title: 'SQL Performance Explained', url: 'https://sql-performance-explained.com/', type: 'book', description: 'Excellent book on database performance and indexing. Clear explanations of complex concepts.' },
          { title: 'Use The Index, Luke', url: 'https://use-the-index-luke.com/', type: 'article', description: 'Free guide to database performance for developers. Practical and SQL-agnostic.' },
          { title: 'PostgreSQL Tutorial', url: 'https://www.postgresqltutorial.com/', type: 'docs', description: 'Comprehensive PostgreSQL tutorials from basics to advanced. Well-structured.' },
          { title: 'Mode SQL Tutorial', url: 'https://mode.com/sql-tutorial/', type: 'course', description: 'Interactive SQL tutorial with real data. Great for beginners and intermediate learners.' },
          { title: 'Database Design Course', url: 'https://www.udemy.com/course/database-design/', type: 'course', description: 'Learn database design principles, normalization, and ER diagrams.' },
        ]
      },
      { 
        value: 'cloud', 
        label: 'Cloud (AWS/Azure/GCP)', 
        recommendations: ['Get cloud certification', 'Deploy production apps', 'Master infrastructure as code', 'Learn serverless architectures', 'Understand cloud cost optimization', 'Build multi-region deployments'], 
        scoreWeight: 0.9,
        mentorExplanation: 'Cloud platforms are absolutely essential for modern deployment - this skill is highly valued! Here\'s my advice: start with one platform and go deep before branching out. AWS has the largest market share, Azure is strong in enterprise, GCP excels in data/ML. Focus on core services first: compute (EC2/VMs), storage (S3/Blob), databases, and networking. Then learn about managed services - they save so much time! Infrastructure as Code (Terraform, CloudFormation) is crucial - treating infrastructure like code is a game-changer. Understand the shared responsibility model and cloud security basics. Learn about serverless (Lambda/Functions) - it\'s changing how we build. Cost optimization is important - cloud bills can spiral! Certifications are valuable here - they provide structured learning paths. Cloud knowledge makes you incredibly employable and enables you to build scalable systems. The cloud is not just hosting - it\'s a completely different way of architecting applications!',
        resources: [
          { title: 'AWS Certified Solutions Architect Path', url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/', type: 'course', description: 'Official AWS certification. Excellent structured learning path covering core AWS services.' },
          { title: 'A Cloud Guru', url: 'https://acloudguru.com/', type: 'course', description: 'Comprehensive cloud learning platform with hands-on labs for AWS, Azure, GCP.' },
          { title: 'Cloud Architecture Patterns', url: 'https://learn.microsoft.com/en-us/azure/architecture/patterns/', type: 'docs', description: 'Microsoft\'s cloud design patterns. Applicable across all cloud providers.' },
          { title: 'Terraform Tutorial', url: 'https://developer.hashicorp.com/terraform/tutorials', type: 'docs', description: 'Learn Infrastructure as Code with Terraform. Essential cloud skill.' },
          { title: 'The Good Parts of AWS', url: 'https://dvassallo.gumroad.com/l/aws-good-parts', type: 'book', description: 'Practical guide focusing on the most useful AWS services. Cuts through the complexity.' },
        ]
      },
      { 
        value: 'docker', 
        label: 'Docker/Kubernetes', 
        recommendations: ['Containerize applications', 'Learn container orchestration', 'Master Docker Compose', 'Understand Kubernetes basics', 'Learn deployment strategies', 'Build CI/CD pipelines with containers'], 
        scoreWeight: 0.85,
        mentorExplanation: 'Containers revolutionized software deployment - this is a must-have modern skill! Docker solves the "works on my machine" problem by packaging your app with all its dependencies. Start by understanding what containers are (not VMs!), then learn Docker basics: images, containers, Dockerfile, volumes. Docker Compose is essential for multi-container apps - it\'s your local development powerhouse. Once you\'re comfortable with Docker, learn about container registries and image optimization (smaller images = faster deployments). Kubernetes is the next level - it orchestrates containers at scale. Start with basic concepts: pods, services, deployments. Don\'t rush into Kubernetes - get really comfortable with Docker first! Understanding containers makes you more DevOps-savvy and helps you build consistent, reproducible environments. Every modern development team uses containers - this skill is incredibly valuable!',
        resources: [
          { title: 'Docker Deep Dive', url: 'https://www.amazon.com/Docker-Deep-Dive-Nigel-Poulton/dp/1521822808', type: 'book', description: 'Comprehensive Docker book from basics to advanced. Clear explanations and practical examples.' },
          { title: 'Docker Official Tutorial', url: 'https://docs.docker.com/get-started/', type: 'docs', description: 'Start here for Docker fundamentals. Official docs with hands-on examples.' },
          { title: 'Kubernetes Basics', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/', type: 'docs', description: 'Official Kubernetes tutorial. Interactive learning with a real cluster.' },
          { title: 'Docker Mastery Course', url: 'https://www.udemy.com/course/docker-mastery/', type: 'course', description: 'Popular comprehensive Docker and Kubernetes course. Highly rated with hands-on projects.' },
          { title: 'Play with Docker', url: 'https://labs.play-with-docker.com/', type: 'docs', description: 'Free browser-based Docker environment. Practice without installing anything!' },
        ]
      },
      {
        value: 'vue',
        label: 'Vue.js',
        recommendations: ['Build a Vue 3 application', 'Master Composition API'],
        scoreWeight: 0.8,
        mentorExplanation: 'Vue is intuitive and powerful. The Composition API in Vue 3 brings it closer to React hooks while maintaining Vue\'s simplicity.',
        resources: [
          { title: 'Vue.js Official Guide', url: 'https://vuejs.org/guide/introduction.html', type: 'docs' },
          { title: 'Vue Mastery', url: 'https://www.vuemastery.com/', type: 'course' },
          { title: 'Vue 3 Composition API', url: 'https://vuejs.org/guide/extras/composition-api-faq.html', type: 'docs' },
        ]
      },
      {
        value: 'angular',
        label: 'Angular',
        recommendations: ['Build an Angular app', 'Master RxJS observables'],
        scoreWeight: 0.8,
        mentorExplanation: 'Angular is a complete framework with strong opinions. Excellent for large enterprise applications with complex requirements.',
        resources: [
          { title: 'Angular Official Tutorial', url: 'https://angular.io/tutorial', type: 'docs' },
          { title: 'RxJS Documentation', url: 'https://rxjs.dev/guide/overview', type: 'docs' },
          { title: 'Angular University', url: 'https://angular-university.io/', type: 'course' },
        ]
      },
      {
        value: 'mongodb',
        label: 'MongoDB/NoSQL',
        recommendations: ['Design NoSQL data models', 'Learn aggregation pipelines'],
        scoreWeight: 0.75,
        mentorExplanation: 'NoSQL databases like MongoDB offer flexibility for certain use cases. Understanding when to use SQL vs NoSQL is a valuable skill.',
        resources: [
          { title: 'MongoDB University', url: 'https://university.mongodb.com/', type: 'course' },
          { title: 'Data Model Design', url: 'https://www.mongodb.com/docs/manual/core/data-modeling-introduction/', type: 'docs' },
          { title: 'NoSQL Distilled', url: 'https://martinfowler.com/books/nosql.html', type: 'book' },
        ]
      },
      {
        value: 'graphql',
        label: 'GraphQL',
        recommendations: ['Build a GraphQL API', 'Master schema design'],
        scoreWeight: 0.85,
        mentorExplanation: 'GraphQL provides a flexible alternative to REST, particularly powerful for complex data requirements. It\'s gaining adoption rapidly!',
        resources: [
          { title: 'GraphQL Official Tutorial', url: 'https://graphql.org/learn/', type: 'docs' },
          { title: 'Apollo GraphQL', url: 'https://www.apollographql.com/tutorials/', type: 'course' },
          { title: 'How to GraphQL', url: 'https://www.howtographql.com/', type: 'article' },
        ]
      },
    ],
  },

  // Question 3: Debugging (Enhanced with mentor guidance)
  {
    id: 'q3',
    title: 'How comfortable are you with debugging complex issues?',
    category: CATEGORIES.DEBUGGING,
    type: 'multiple-choice',
    hint: 'Think about your systematic approach, tool usage, and problem isolation skills',
    options: [
      { 
        value: 'console-only', 
        label: 'I mostly use console.log and get stuck often', 
        recommendations: ['Learn to use Chrome DevTools debugger', 'Practice reading stack traces', 'Study systematic debugging approaches'], 
        scoreWeight: 0.15,
        isCommonMistake: true,
        mentorExplanation: 'Console logging has its place, but it\'s like trying to fix a car with only a flashlight. Let me help you level up! Learning proper debugging tools will 10x your efficiency. Start with browser DevTools - they\'re incredibly powerful.',
        resources: [
          { title: 'Chrome DevTools Tutorial', url: 'https://developer.chrome.com/docs/devtools/', type: 'docs', description: 'Master browser debugging' },
          { title: 'Debugging JavaScript', url: 'https://javascript.info/debugging-chrome', type: 'article' },
          { title: 'VS Code Debugging', url: 'https://code.visualstudio.com/docs/editor/debugging', type: 'docs' },
        ]
      },
      { 
        value: 'basic-tools', 
        label: 'I use debugger breakpoints but struggle with complex issues', 
        recommendations: ['Learn to trace through async code', 'Practice binary search debugging', 'Study error patterns'], 
        scoreWeight: 0.35,
        mentorExplanation: 'Good start! You\'ve got the basics. Now let\'s sharpen your systematic approach. Break big problems into smaller pieces - that\'s the secret. Use breakpoints strategically, not everywhere.',
        resources: [
          { title: 'Debugging Techniques', url: 'https://blog.regehr.org/archives/199', type: 'article', description: 'Systematic debugging strategies' },
          { title: 'Async Debugging', url: 'https://developer.chrome.com/blog/async-call-stack/', type: 'article' },
          { title: 'Problem Solving Patterns', url: 'https://www.freecodecamp.org/news/how-to-think-like-a-programmer-lessons-in-problem-solving-d1d8bf1de7d2/', type: 'article' },
        ]
      },
      { 
        value: 'intermediate', 
        label: 'I can solve most issues with research and systematic debugging', 
        recommendations: ['Learn advanced debugging patterns', 'Study memory profiling', 'Practice debugging production issues'], 
        scoreWeight: 0.6,
        isCorrect: true,
        mentorExplanation: 'Solid debugging skills! You\'re thinking systematically, which is exactly right. Keep building your mental models of how systems work - that intuition is gold.',
        resources: [
          { title: 'Advanced Debugging Techniques', url: 'https://www.youtube.com/watch?v=_Wp68Y9cc_U', type: 'video' },
          { title: 'Memory Profiling', url: 'https://developer.chrome.com/docs/devtools/memory-problems/', type: 'docs' },
          { title: 'Production Debugging', url: 'https://github.com/goldbergyoni/nodebestpractices#6-going-to-production-practices', type: 'github' },
        ]
      },
      { 
        value: 'advanced', 
        label: 'I independently solve complex issues using multiple techniques', 
        recommendations: ['Mentor others in debugging', 'Document debugging strategies', 'Create debugging tools'], 
        scoreWeight: 0.8,
        isCorrect: true,
        mentorExplanation: 'Excellent! You have a strong debugging toolkit. Now share this knowledge - teach others your systematic approach. Your debugging skills are a superpower!',
        resources: [
          { title: 'Building Custom Debuggers', url: 'https://blog.repl.it/clui', type: 'article' },
          { title: 'Advanced Node Debugging', url: 'https://nodejs.org/en/docs/guides/debugging-getting-started/', type: 'docs' },
          { title: 'Performance Profiling', url: 'https://web.dev/chrome-devtools-performance/', type: 'article' },
        ]
      },
      { 
        value: 'expert', 
        label: 'I excel at debugging across all levels (code, network, system)', 
        recommendations: ['Create debugging workshops', 'Write technical blog posts', 'Build internal debugging tools'], 
        scoreWeight: 1.0,
        isCorrect: true,
        mentorExplanation: 'You\'re a debugging wizard! Consider sharing your expertise through talks, blog posts, or internal workshops. The community needs this knowledge!',
        resources: [
          { title: 'Writing Technical Posts', url: 'https://www.freecodecamp.org/news/how-to-write-a-great-technical-blog-post-414c414b67f6/', type: 'article' },
          { title: 'System-Level Debugging', url: 'https://jvns.ca/blog/2021/04/03/what-problems-do-people-solve-with-strace/', type: 'article' },
          { title: 'Creating Dev Tools', url: 'https://developer.chrome.com/docs/extensions/mv3/devtools/', type: 'docs' },
        ]
      },
    ],
  },

  // Question 4: Learning Approach (Enhanced with 7 options)
  {
    id: 'q4',
    title: 'How do you approach learning a new technology or framework?',
    category: CATEGORIES.LEARNING,
    type: 'multiple-choice',
    hint: 'Consider your learning initiative, methods, and knowledge sharing',
    options: [
      { 
        value: 'wait', 
        label: 'I wait for formal training or assignments', 
        recommendations: ['Take initiative in learning', 'Set personal learning goals', 'Start a small personal project'], 
        scoreWeight: 0.2,
        mentorExplanation: 'Waiting for assignments limits your growth. The best developers are curious self-learners. Start small - pick one thing this week to explore on your own! Even 30 minutes a day makes a difference.',
        resources: [
          { title: 'Learning How to Learn', url: 'https://www.coursera.org/learn/learning-how-to-learn', type: 'course', description: 'Master effective learning techniques' },
          { title: 'How to Learn Programming', url: 'https://www.freecodecamp.org/news/how-to-learn-programming/', type: 'article' },
          { title: 'Developer Roadmaps', url: 'https://roadmap.sh/', type: 'docs', description: 'Structured learning paths' },
        ]
      },
      { 
        value: 'reactive', 
        label: 'I learn when I encounter a problem that needs solving', 
        recommendations: ['Complement just-in-time learning with structured study', 'Build foundational knowledge'], 
        scoreWeight: 0.35,
        isCommonMistake: true,
        mentorExplanation: 'Just-in-time learning works, but it leaves gaps. Balance it with structured learning to build strong fundamentals. You\'ll solve problems faster with a solid base.',
        resources: [
          { title: 'Deliberate Practice', url: 'https://fs.blog/deliberate-practice-guide/', type: 'article' },
          { title: 'Spaced Repetition', url: 'https://ncase.me/remember/', type: 'article', description: 'Effective learning technique' },
          { title: 'Developer Learning Path', url: 'https://github.com/kamranahmedse/developer-roadmap', type: 'github' },
        ]
      },
      { 
        value: 'basics', 
        label: 'I learn the basics through tutorials when needed', 
        recommendations: ['Go deeper than tutorials', 'Build projects from scratch', 'Read official documentation'], 
        scoreWeight: 0.45,
        mentorExplanation: 'Tutorials are a good start, but they can create "tutorial hell." Try building something without a tutorial next time - that\'s where real learning happens! Struggle is part of learning.',
        resources: [
          { title: 'Escaping Tutorial Hell', url: 'https://www.freecodecamp.org/news/how-to-escape-tutorial-purgatory-as-a-new-developer-or-at-any-time-in-your-career/', type: 'article' },
          { title: 'Project-Based Learning', url: 'https://github.com/practical-tutorials/project-based-learning', type: 'github' },
          { title: 'Reading Documentation Effectively', url: 'https://documentation.divio.com/', type: 'article' },
        ]
      },
      { 
        value: 'structured', 
        label: 'I follow structured courses and build practice projects', 
        recommendations: ['Mix structured learning with exploration', 'Share your learnings', 'Teach others'], 
        scoreWeight: 0.6,
        isCorrect: true,
        mentorExplanation: 'Great approach! Structured learning builds solid foundations. Now amplify it by teaching others - explaining concepts solidifies your understanding like nothing else.',
        resources: [
          { title: 'Learning in Public', url: 'https://www.swyx.io/learn-in-public/', type: 'article', description: 'Accelerate learning by sharing' },
          { title: 'Tech Blog Writing Guide', url: 'https://www.freecodecamp.org/news/developer-blog-guide/', type: 'article' },
          { title: 'Teach to Learn', url: 'https://fs.blog/feynman-technique/', type: 'article', description: 'Feynman Technique' },
        ]
      },
      { 
        value: 'proactive', 
        label: 'I proactively explore new tech and build meaningful side projects', 
        recommendations: ['Share knowledge with your team', 'Contribute to open source', 'Create technical content'], 
        scoreWeight: 0.75, 
        yearOneRecommendations: ['Complete 2-3 substantial side projects', 'Present learnings to the team'],
        isCorrect: true,
        mentorExplanation: 'Excellent! You\'re a self-driven learner. Your side projects are your laboratory. Now maximize impact by sharing what you discover - blog posts, talks, or mentoring!',
        resources: [
          { title: 'Building in Public', url: 'https://www.indiehackers.com/group/build-in-public', type: 'article' },
          { title: 'Open Source Guide', url: 'https://opensource.guide/how-to-contribute/', type: 'docs' },
          { title: 'First Timers Only', url: 'https://www.firsttimersonly.com/', type: 'docs' },
        ]
      },
      { 
        value: 'deep-dive', 
        label: 'I deeply research topics, read source code, and experiment extensively', 
        recommendations: ['Share your deep knowledge', 'Mentor others', 'Contribute to docs and libraries'], 
        scoreWeight: 0.88,
        isCorrect: true,
        mentorExplanation: 'You\'re diving deep - that\'s how experts are made! Reading source code is underrated and incredibly valuable. Keep this up and share your insights!',
        resources: [
          { title: 'Reading Code Effectively', url: 'https://github.com/aredridel/how-to-read-code', type: 'github' },
          { title: 'Speaking at Meetups', url: 'https://www.freecodecamp.org/news/speaking-at-your-first-tech-conference/', type: 'article' },
          { title: 'Creating Technical Content', url: 'https://developers.google.com/tech-writing', type: 'course' },
        ]
      },
      { 
        value: 'expert', 
        label: 'I research deeply, contribute to communities, and help establish best practices', 
        recommendations: ['Become a subject matter expert', 'Speak at conferences', 'Write comprehensive guides'], 
        scoreWeight: 1.0,
        isCorrect: true,
        mentorExplanation: 'You\'re at the expert level! Your contributions shape the community. Consider mentoring developers and leading technical initiatives. Your knowledge multiplies when shared!',
        resources: [
          { title: 'Conference Speaking Guide', url: 'https://speaking.io/', type: 'docs' },
          { title: 'Technical Writing for Developers', url: 'https://www.manning.com/books/docs-for-developers', type: 'book' },
          { title: 'Building Developer Communities', url: 'https://www.commonroom.io/blog/developer-community/', type: 'article' },
        ]
      },
    ],
  },

  // Question 5: Code Reviews (Enhanced with 6 options)
  {
    id: 'q5',
    title: 'How often do you participate in code reviews?',
    category: CATEGORIES.COLLABORATION,
    type: 'multiple-choice',
    hint: 'Quality code reviews are about learning together, not just catching bugs',
    options: [
      { 
        value: 'rarely', 
        label: 'Rarely or never', 
        recommendations: ['Start reviewing pull requests regularly', 'Learn code review best practices', 'Ask to be added as a reviewer'], 
        scoreWeight: 0.15,
        mentorExplanation: 'Code reviews are one of the best learning opportunities! Don\'t wait to be asked - volunteer to review. You\'ll learn different approaches and improve your own code in the process.',
        resources: [
          { title: 'Code Review Best Practices', url: 'https://google.github.io/eng-practices/review/', type: 'docs', description: 'Google\'s code review guide' },
          { title: 'How to Review Code', url: 'https://www.freecodecamp.org/news/code-review-tips/', type: 'article' },
          { title: 'Effective Code Reviews', url: 'https://www.youtube.com/watch?v=a9_0UUUNt-Y', type: 'video' },
        ]
      },
      { 
        value: 'passive', 
        label: 'I review code but mostly approve without deep analysis', 
        recommendations: ['Learn what to look for in code reviews', 'Practice giving constructive feedback', 'Take time to understand context'], 
        scoreWeight: 0.28,
        isCommonMistake: true,
        mentorExplanation: 'Rubber-stamp reviews help no one. Take your time, run the code if needed, and ask questions. Good reviews make everyone better! It\'s okay to say "I need more time to review this properly."',
        resources: [
          { title: 'What to Look for in Code Review', url: 'https://leanpub.com/whattolookforinacodereview', type: 'book' },
          { title: 'Code Review Checklist', url: 'https://github.com/mgreiler/code-review-checklist', type: 'github' },
          { title: 'Giving Constructive Feedback', url: 'https://mtlynch.io/human-code-reviews-1/', type: 'article' },
        ]
      },
      { 
        value: 'sometimes', 
        label: 'Occasionally when asked', 
        recommendations: ['Volunteer for more code reviews', 'Review across different areas', 'Provide constructive feedback'], 
        scoreWeight: 0.42,
        mentorExplanation: 'You\'re participating, which is good! Make it a habit - review at least one PR daily. It keeps you connected to the codebase and builds relationships with teammates.',
        resources: [
          { title: 'Code Review Etiquette', url: 'https://www.alexandra-hill.com/2018/06/25/the-art-of-giving-and-receiving-code-reviews/', type: 'article' },
          { title: 'Thoughtful Code Reviews', url: 'https://testing.googleblog.com/2017/06/code-health-too-many-comments-on-your.html', type: 'article' },
          { title: 'Review Small PRs', url: 'https://smallbusinessprogramming.com/optimal-pull-request-size/', type: 'article' },
        ]
      },
      { 
        value: 'regularly', 
        label: 'Regularly as part of my workflow', 
        recommendations: ['Mentor juniors through code reviews', 'Establish review standards', 'Share patterns you see'], 
        scoreWeight: 0.68,
        isCorrect: true,
        mentorExplanation: 'Excellent! Regular reviews show commitment to code quality. Use reviews as teaching moments - explain the "why" behind your suggestions. That\'s where real mentoring happens.',
        resources: [
          { title: 'Mentoring Through Code Reviews', url: 'https://blog.pragmaticengineer.com/good-code-reviews-better-code-reviews/', type: 'article' },
          { title: 'Code Review Standards', url: 'https://www.kevinlondon.com/2015/05/05/code-review-best-practices.html', type: 'article' },
          { title: 'Teaching Through Reviews', url: 'https://kickstarter.engineering/a-guide-to-mindful-communication-in-code-reviews-48aab5282e5e', type: 'article' },
        ]
      },
      { 
        value: 'proactive', 
        label: 'I actively seek out PRs to review and provide detailed feedback', 
        recommendations: ['Document common patterns', 'Create team review guidelines', 'Host code review workshops'], 
        scoreWeight: 0.83,
        isCorrect: true,
        mentorExplanation: 'You\'re making a real impact! Your proactive reviews improve team quality. Consider documenting recurring feedback as team guidelines - automate what you can, focus on what matters.',
        resources: [
          { title: 'Building Review Culture', url: 'https://www.netlify.com/blog/2020/03/05/feedback-ladders-how-we-encode-code-reviews-at-netlify/', type: 'article' },
          { title: 'Advanced Code Review', url: 'https://www.youtube.com/watch?v=PJjmw9TRB7s', type: 'video' },
          { title: 'Team Code Review Process', url: 'https://github.com/features/code-review/', type: 'docs' },
        ]
      },
      { 
        value: 'lead', 
        label: 'I lead code review processes and set standards for the team', 
        recommendations: ['Create comprehensive guidelines', 'Train team on effective reviews', 'Measure and improve review metrics'], 
        scoreWeight: 1.0,
        isCorrect: true,
        mentorExplanation: 'You\'re a code review leader! Your standards raise the whole team\'s quality. Keep refining the process and making it a positive learning experience for everyone.',
        resources: [
          { title: 'Code Review Culture', url: 'https://www.pullrequest.com/blog/code-review-best-practices/', type: 'article' },
          { title: 'Review Process Guide', url: 'https://github.com/thoughtbot/guides/tree/main/code-review', type: 'github' },
          { title: 'Measuring Code Reviews', url: 'https://linearb.io/blog/code-review-metrics', type: 'article' },
        ]
      },
    ],
  },

  // Question 6: Testing (Enhanced with 7 options)
  {
    id: 'q6',
    title: 'How confident are you in writing automated tests?',
    category: CATEGORIES.CODE_QUALITY,
    type: 'multiple-choice',
    hint: 'Tests are your safety net - they give you confidence to refactor and iterate',
    options: [
      { 
        value: 'no-tests', 
        label: 'I rarely or never write tests', 
        recommendations: ['Learn unit testing fundamentals', 'Start with simple test cases', 'Understand the testing pyramid'], 
        scoreWeight: 0.15,
        mentorExplanation: 'Tests might seem like extra work, but they\'re actually time-savers! They catch bugs early and give you confidence to refactor. Start small - even one test is better than none. Think of tests as documentation that proves your code works.',
        resources: [
          { title: 'Testing JavaScript', url: 'https://testingjavascript.com/', type: 'course', description: 'Comprehensive testing course' },
          { title: 'Unit Testing Basics', url: 'https://www.freecodecamp.org/news/unit-testing-basics/', type: 'article' },
          { title: 'Testing Best Practices', url: 'https://github.com/goldbergyoni/javascript-testing-best-practices', type: 'github' },
        ]
      },
      { 
        value: 'when-asked', 
        label: 'I write tests only when specifically asked', 
        recommendations: ['Make testing a habit', 'Learn TDD basics', 'Understand value of tests'], 
        scoreWeight: 0.25,
        isCommonMistake: true,
        mentorExplanation: 'Testing should be part of "done," not an afterthought. Try writing tests as you code - it actually helps you design better APIs. Tests are your first client!',
        resources: [
          { title: 'Test-Driven Development', url: 'https://testdriven.io/blog/modern-tdd/', type: 'article' },
          { title: 'Testing Mindset', url: 'https://kentcdodds.com/blog/write-tests', type: 'article' },
          { title: 'Jest Tutorial', url: 'https://jestjs.io/docs/tutorial-react', type: 'docs' },
        ]
      },
      { 
        value: 'basic', 
        label: 'I write basic unit tests for my code', 
        recommendations: ['Learn integration testing', 'Improve test coverage', 'Practice writing better assertions'], 
        scoreWeight: 0.42,
        mentorExplanation: 'Good start! Unit tests are important, but don\'t stop there. Integration tests catch issues that unit tests miss. Aim for testing behavior, not implementation details.',
        resources: [
          { title: 'Integration Testing', url: 'https://kentcdodds.com/blog/write-tests', type: 'article' },
          { title: 'Testing Library', url: 'https://testing-library.com/docs/', type: 'docs', description: 'User-centric testing' },
          { title: 'Test Coverage Guide', url: 'https://martinfowler.com/bliki/TestCoverage.html', type: 'article' },
        ]
      },
      { 
        value: 'comprehensive', 
        label: 'I write comprehensive tests (unit, integration)', 
        recommendations: ['Learn TDD methodology', 'Set up CI/CD pipelines', 'Practice E2E testing'], 
        scoreWeight: 0.68, 
        yearOneRecommendations: ['Achieve 80%+ code coverage', 'Implement E2E testing'],
        isCorrect: true,
        mentorExplanation: 'Excellent testing habits! You understand the value of different test types. Next level: try TDD - write the test first. It changes how you think about design!',
        resources: [
          { title: 'Test-Driven Development', url: 'https://www.youtube.com/watch?v=Jv2uxzhPFl4', type: 'video' },
          { title: 'E2E Testing with Cypress', url: 'https://www.cypress.io/', type: 'docs' },
          { title: 'CI/CD Best Practices', url: 'https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment', type: 'article' },
        ]
      },
      { 
        value: 'tdd', 
        label: 'I practice TDD and write test-first code', 
        recommendations: ['Advocate for testing', 'Mentor others in TDD', 'Share testing patterns'], 
        scoreWeight: 0.85,
        isCorrect: true,
        mentorExplanation: 'You\'re practicing TDD - that\'s advanced! The red-green-refactor cycle is powerful. Share your approach with the team, but remember: TDD is a tool, not a religion. Use it wisely.',
        resources: [
          { title: 'Growing Object-Oriented Software', url: 'http://www.growing-object-oriented-software.com/', type: 'book' },
          { title: 'TDD Best Practices', url: 'https://kentcdodds.com/blog/common-mistakes-with-react-testing-library', type: 'article' },
          { title: 'Testing Workshops', url: 'https://testingjavascript.com/', type: 'course' },
        ]
      },
      { 
        value: 'advanced', 
        label: 'I advocate for testing and help establish testing standards', 
        recommendations: ['Lead testing initiatives', 'Create testing workshops', 'Build testing infrastructure'], 
        scoreWeight: 0.92,
        isCorrect: true,
        mentorExplanation: 'You\'re a testing champion! Your advocacy improves team quality. Keep making testing easier and more valuable - that\'s how you build testing culture.',
        resources: [
          { title: 'Building Testing Culture', url: 'https://martinfowler.com/articles/testing-culture.html', type: 'article' },
          { title: 'Testing Strategy', url: 'https://martinfowler.com/bliki/TestPyramid.html', type: 'article' },
          { title: 'Advanced Testing Patterns', url: 'https://testingjavascript.com/', type: 'course' },
        ]
      },
      { 
        value: 'expert', 
        label: 'I implement comprehensive testing strategies across the organization', 
        recommendations: ['Speak about testing at conferences', 'Write about testing practices', 'Build testing tools'], 
        scoreWeight: 1.0,
        isCorrect: true,
        mentorExplanation: 'You\'re a testing expert! Your organizational impact is huge. Consider sharing your knowledge through talks, blog posts, or building tools that make testing easier for everyone.',
        resources: [
          { title: 'Test Automation University', url: 'https://testautomationu.applitools.com/', type: 'course' },
          { title: 'Testing at Scale', url: 'https://www.youtube.com/watch?v=4bpJZNhsZ_g', type: 'video' },
          { title: 'Writing About Testing', url: 'https://kentcdodds.com/blog/', type: 'article' },
        ]
      },
    ],
  },

  // Question 7: Technical Disagreements
  {
    id: 'q7',
    title: 'How do you handle technical disagreements with team members?',
    category: CATEGORIES.COMMUNICATION,
    type: 'multiple-choice',
    hint: 'Healthy disagreement drives better solutions. It\'s about the best outcome, not being right.',
    options: [
      { 
        value: 'avoid', 
        label: 'I tend to avoid confrontation and stay quiet', 
        recommendations: ['Practice assertive communication', 'Learn conflict resolution skills', 'Prepare your points beforehand'], 
        scoreWeight: 0.25,
        mentorExplanation: 'Your perspective matters! Avoiding disagreement means missing opportunities to improve. Start small - try sharing one concern in your next meeting. Frame it as a question if that helps: "What about...?"',
        resources: [
          { title: 'Assertive Communication', url: 'https://www.mindtools.com/CommSkll/AssertiveCommunication.htm', type: 'article' },
          { title: 'Crucial Conversations', url: 'https://www.amazon.com/Crucial-Conversations-Talking-Stakes-Second/dp/1469266822', type: 'book' },
          { title: 'Speaking Up at Work', url: 'https://hbr.org/2016/01/how-to-speak-up-when-its-your-turn', type: 'article' },
        ]
      },
      { 
        value: 'defer', 
        label: 'I usually defer to more senior developers', 
        recommendations: ['Build confidence in your opinions', 'Prepare data to support your views', 'Ask clarifying questions'], 
        scoreWeight: 0.42,
        isCommonMistake: true,
        mentorExplanation: 'Experience matters, but so does fresh perspective! Senior doesn\'t always mean right. Challenge ideas respectfully - bring data, ask "why", propose alternatives. That\'s how you grow!',
        resources: [
          { title: 'Disagree and Commit', url: 'https://en.wikipedia.org/wiki/Disagree_and_commit', type: 'article' },
          { title: 'Technical Decision Making', url: 'https://www.youtube.com/watch?v=jsNnlu0B1-0', type: 'video' },
          { title: 'Building Technical Confidence', url: 'https://charity.wtf/2019/01/04/engineering-management-the-pendulum-or-the-ladder/', type: 'article' },
        ]
      },
      { 
        value: 'discuss', 
        label: 'I discuss openly and seek consensus', 
        recommendations: ['Document decision-making processes', 'Facilitate technical discussions', 'Use RFCs for big decisions'], 
        scoreWeight: 0.72,
        isCorrect: true,
        mentorExplanation: 'Great approach! Open discussion and consensus-seeking create better solutions. Keep it constructive - focus on the problem, not personalities. "Strong opinions, loosely held" is a good mindset.',
        resources: [
          { title: 'RFC Process', url: 'https://github.com/rust-lang/rfcs', type: 'github', description: 'Example RFC process' },
          { title: 'Architecture Decision Records', url: 'https://adr.github.io/', type: 'docs' },
          { title: 'Technical Discussions', url: 'https://www.youtube.com/watch?v=jsNnlu0B1-0', type: 'video' },
        ]
      },
      { 
        value: 'facilitate', 
        label: 'I facilitate productive discussions and help find balanced solutions', 
        recommendations: ['Mentor others in communication', 'Create decision frameworks', 'Document patterns'], 
        scoreWeight: 0.87,
        isCorrect: true,
        mentorExplanation: 'You\'re a great technical communicator! Facilitating balanced solutions is a leadership skill. Keep building bridges between different viewpoints - that\'s invaluable.',
        resources: [
          { title: 'Facilitation Skills', url: 'https://www.atlassian.com/team-playbook/plays', type: 'docs' },
          { title: 'Technical Leadership', url: 'https://www.thestaffeng.com/', type: 'article' },
          { title: 'Decision Making Frameworks', url: 'https://untools.co/', type: 'docs' },
        ]
      },
      { 
        value: 'lead', 
        label: 'I lead technical discussions and help teams make informed decisions', 
        recommendations: ['Establish decision-making processes', 'Coach others in healthy disagreement', 'Scale your influence'], 
        scoreWeight: 1.0,
        isCorrect: true,
        mentorExplanation: 'You\'re a technical leader! Your ability to navigate disagreements and drive decisions is crucial. Keep fostering healthy debate culture - it makes teams stronger.',
        resources: [
          { title: 'Staff Engineer\'s Path', url: 'https://www.oreilly.com/library/view/the-staff-engineers/9781098118723/', type: 'book' },
          { title: 'Technical Decision Making', url: 'https://www.youtube.com/watch?v=jsNnlu0B1-0', type: 'video' },
          { title: 'Leading Without Authority', url: 'https://charity.wtf/2020/09/06/if-management-isnt-a-promotion-then-engineering-isnt-a-demotion/', type: 'article' },
        ]
      },
    ],
  },

  // Question 8: System Design
  {
    id: 'q8',
    title: 'Which best describes your experience with system design and architecture?',
    category: CATEGORIES.PROBLEM_SOLVING,
    type: 'multiple-choice',
    hint: 'Think about designing scalable, maintainable systems, not just writing code',
    options: [
      { 
        value: 'none', 
        label: 'No experience, I work on assigned tasks', 
        recommendations: ['Study basic software architecture patterns', 'Learn about system design fundamentals', 'Read about design principles'], 
        scoreWeight: 0.18,
        mentorExplanation: 'System design might seem advanced, but start thinking about it now! Even small tasks involve design choices. Why this pattern? What if we needed to scale it? Ask these questions!',
        resources: [
          { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', type: 'github', description: 'Comprehensive system design guide' },
          { title: 'Software Architecture Patterns', url: 'https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/', type: 'book' },
          { title: 'Design Patterns Explained', url: 'https://refactoring.guru/design-patterns', type: 'article' },
        ]
      },
      { 
        value: 'learning', 
        label: 'Learning through project involvement', 
        recommendations: ['Take a system design course', 'Practice designing small systems', 'Study real-world architectures'], 
        scoreWeight: 0.42,
        mentorExplanation: 'Learning by doing is great! Now complement it with studying proven patterns. Understanding WHY systems are designed certain ways is as important as HOW to build them.',
        resources: [
          { title: 'Designing Data-Intensive Applications', url: 'https://dataintensive.net/', type: 'book', description: 'Essential system design book' },
          { title: 'System Design Interview', url: 'https://www.youtube.com/c/SystemDesignInterview', type: 'video' },
          { title: 'Microservices Patterns', url: 'https://microservices.io/patterns/index.html', type: 'docs' },
        ]
      },
      { 
        value: 'design', 
        label: 'I design features and components', 
        recommendations: ['Study scalability patterns', 'Design larger system architectures', 'Learn about trade-offs'], 
        scoreWeight: 0.65, 
        yearOneRecommendations: ['Lead architectural decisions for a feature', 'Present design proposals'],
        isCorrect: true,
        mentorExplanation: 'Good! You\'re thinking about design. Next level: understand trade-offs. Every design choice has consequences - there\'s no "perfect" solution, only appropriate ones. Start documenting your design decisions and reasoning.',
        resources: [
          { title: 'Architecture Decision Records', url: 'https://adr.github.io/', type: 'docs' },
          { title: 'Clean Architecture', url: 'https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164', type: 'book' },
          { title: 'System Design Interviews', url: 'https://www.youtube.com/c/SystemDesignInterview', type: 'video' },
        ]
      },
      { 
        value: 'architect', 
        label: 'I design and architect systems', 
        recommendations: ['Mentor others in architecture', 'Document architectural decisions', 'Study distributed systems'], 
        scoreWeight: 0.85,
        isCorrect: true,
        mentorExplanation: 'You\'re an architect! Your system-level thinking is valuable. Keep studying emerging patterns, but also teach others your thought process - that\'s how you scale your impact.',
        resources: [
          { title: 'Fundamentals of Software Architecture', url: 'https://www.oreilly.com/library/view/fundamentals-of-software/9781492043447/', type: 'book' },
          { title: 'Distributed Systems', url: 'https://www.distributed-systems.net/', type: 'course' },
          { title: 'Martin Fowler\'s Blog', url: 'https://martinfowler.com/', type: 'article', description: 'Architecture insights' },
        ]
      },
      { 
        value: 'expert', 
        label: 'I design complex distributed systems and set architectural direction', 
        recommendations: ['Share architecture knowledge', 'Lead organization-wide initiatives', 'Speak at conferences'], 
        scoreWeight: 1.0,
        isCorrect: true,
        mentorExplanation: 'You\'re an architecture expert! Your experience with distributed systems is rare and valuable. Consider sharing through talks, blog posts, or mentoring - the industry needs this expertise!',
        resources: [
          { title: 'Designing Distributed Systems', url: 'https://www.amazon.com/Designing-Distributed-Systems-Patterns-Paradigms/dp/1491983647', type: 'book' },
          { title: 'Papers We Love', url: 'https://paperswelove.org/', type: 'article', description: 'Computer science papers' },
          { title: 'Architecture Weekly', url: 'https://www.architechtureweekly.com/', type: 'article' },
        ]
      },
    ],
  },

  // Question 9: Staying Current (Checkbox - Multiple Selection)
  {
    id: 'q9',
    title: 'How do you stay current with industry trends and best practices? (Select all that apply)',
    category: CATEGORIES.LEARNING,
    type: 'checkbox',
    hint: 'The best developers continuously learn through multiple channels',
    options: [
      { 
        value: 'blogs', 
        label: 'Read tech blogs and articles regularly', 
        recommendations: ['Create a curated reading list', 'Share interesting articles with team'], 
        scoreWeight: 0.15,
        mentorExplanation: 'Reading is great for staying informed! Pro tip: Don\'t just consume - take notes, try examples, share what you learn.',
        resources: [
          { title: 'Developer Blog List', url: 'https://github.com/kilimchoi/engineering-blogs', type: 'github' },
          { title: 'Hacker News', url: 'https://news.ycombinator.com/', type: 'article' },
          { title: 'Dev.to Community', url: 'https://dev.to/', type: 'article' },
        ]
      },
      { 
        value: 'courses', 
        label: 'Take online courses', 
        recommendations: ['Complete course projects', 'Apply learnings to real work', 'Mix free and paid courses'], 
        scoreWeight: 0.18,
        mentorExplanation: 'Structured courses build solid foundations. Remember: finish what you start, and always build something with what you learn!',
        resources: [
          { title: 'Frontend Masters', url: 'https://frontendmasters.com/', type: 'course' },
          { title: 'Pluralsight', url: 'https://www.pluralsight.com/', type: 'course' },
          { title: 'freeCodeCamp', url: 'https://www.freecodecamp.org/', type: 'course' },
        ]
      },
      { 
        value: 'podcasts', 
        label: 'Listen to tech podcasts', 
        recommendations: ['Take notes on key insights', 'Explore topics mentioned', 'Share episodes with team'], 
        scoreWeight: 0.12,
        mentorExplanation: 'Podcasts are great for learning during commutes! Listen actively - take notes, follow up on interesting topics.',
        resources: [
          { title: 'Software Engineering Daily', url: 'https://softwareengineeringdaily.com/', type: 'article' },
          { title: 'Syntax.fm', url: 'https://syntax.fm/', type: 'article' },
          { title: 'JavaScript Jabber', url: 'https://javascriptjabber.com/', type: 'article' },
        ]
      },
      { 
        value: 'conferences', 
        label: 'Attend conferences or meetups', 
        recommendations: ['Network with other developers', 'Present at local meetups', 'Share learnings with team'], 
        scoreWeight: 0.2,
        mentorExplanation: 'Conferences and meetups build community! Don\'t just attend - engage, ask questions, make connections. Virtual counts too!',
        resources: [
          { title: 'Meetup.com', url: 'https://www.meetup.com/', type: 'article' },
          { title: 'Conference Talk Ideas', url: 'https://speaking.io/', type: 'docs' },
          { title: 'Virtual Tech Events', url: 'https://www.eventbrite.com/d/online/tech/', type: 'article' },
        ]
      },
      { 
        value: 'opensource', 
        label: 'Contribute to open source', 
        recommendations: ['Start with documentation', 'Fix bugs in tools you use', 'Build your portfolio'], 
        scoreWeight: 0.25,
        mentorExplanation: 'Open source is learning on steroids! You\'ll see production codebases, get feedback from experienced developers, and build your reputation. Start small - even docs help!',
        resources: [
          { title: 'First Contributions', url: 'https://github.com/firstcontributions/first-contributions', type: 'github' },
          { title: 'Open Source Guide', url: 'https://opensource.guide/', type: 'docs' },
          { title: 'Good First Issues', url: 'https://goodfirstissue.dev/', type: 'article' },
        ]
      },
      { 
        value: 'practice', 
        label: 'Build side projects', 
        recommendations: ['Share projects publicly', 'Try new technologies', 'Build to solve real problems'], 
        scoreWeight: 0.2,
        mentorExplanation: 'Side projects are your laboratory! Build in public, experiment freely, fail fast. This is where you can try risky things without consequences.',
        resources: [
          { title: 'Project Ideas', url: 'https://github.com/florinpop17/app-ideas', type: 'github' },
          { title: 'Build in Public', url: 'https://www.indiehackers.com/group/build-in-public', type: 'article' },
          { title: 'Show Your Work', url: 'https://www.amazon.com/Show-Your-Work-Austin-Kleon/dp/076117897X', type: 'book' },
        ]
      },
      { 
        value: 'twitter', 
        label: 'Follow developers and tech leaders on social media', 
        recommendations: ['Engage in discussions', 'Share your insights', 'Build your network'], 
        scoreWeight: 0.12,
        mentorExplanation: 'Social media can be noisy, but following the right people gives you a pulse on the industry. Engage, don\'t just lurk!',
        resources: [
          { title: 'Developer Twitter List', url: 'https://twitter.com/i/lists', type: 'article' },
          { title: 'Tech Twitter Guide', url: 'https://dev.to/denicmarko/how-to-use-twitter-as-a-developer-4h45', type: 'article' },
          { title: 'Engage on LinkedIn', url: 'https://www.linkedin.com/', type: 'article' },
        ]
      },
      { 
        value: 'newsletters', 
        label: 'Subscribe to tech newsletters', 
        recommendations: ['Curate your subscriptions', 'Archive and review weekly', 'Share interesting finds'], 
        scoreWeight: 0.13,
        mentorExplanation: 'Newsletters deliver curated content to your inbox. Great for staying current without the noise! But don\'t just collect them - read and act.',
        resources: [
          { title: 'JavaScript Weekly', url: 'https://javascriptweekly.com/', type: 'article' },
          { title: 'Node Weekly', url: 'https://nodeweekly.com/', type: 'article' },
          { title: 'TLDR Newsletter', url: 'https://tldr.tech/', type: 'article' },
        ]
      },
      { 
        value: 'books', 
        label: 'Read programming and software engineering books', 
        recommendations: ['Read classics and new releases', 'Discuss with reading groups', 'Apply concepts immediately'], 
        scoreWeight: 0.18,
        mentorExplanation: 'Books offer deep knowledge that articles can\'t match. Mix timeless classics with current topics. Take notes, discuss with others!',
        resources: [
          { title: 'The Pragmatic Programmer', url: 'https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/', type: 'book' },
          { title: 'Clean Code', url: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882', type: 'book' },
          { title: 'Developer Reading List', url: 'https://github.com/mr-mig/every-programmer-should-know', type: 'github' },
        ]
      },
      { 
        value: 'youtube', 
        label: 'Watch technical videos and tutorials', 
        recommendations: ['Follow quality channels', 'Build along with tutorials', 'Take notes and reference later'], 
        scoreWeight: 0.15,
        mentorExplanation: 'Videos are great for visual learning! Watch at 1.5x-2x speed, pause to try things, and always build along. Passive watching doesn\'t teach as well as active doing.',
        resources: [
          { title: 'Fireship', url: 'https://www.youtube.com/@Fireship', type: 'video' },
          { title: 'Traversy Media', url: 'https://www.youtube.com/@TraversyMedia', type: 'video' },
          { title: 'The Primeagen', url: 'https://www.youtube.com/@ThePrimeagen', type: 'video' },
        ]
      },
      { 
        value: 'documentation', 
        label: 'Read official documentation and RFCs', 
        recommendations: ['Read change logs', 'Understand core concepts', 'Contribute to docs'], 
        scoreWeight: 0.2,
        mentorExplanation: 'Reading docs is underrated! Official documentation is the source of truth. Many developers skip it and miss important details. Make it a habit!',
        resources: [
          { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/', type: 'docs' },
          { title: 'TC39 Proposals', url: 'https://github.com/tc39/proposals', type: 'github', description: 'JavaScript proposals' },
          { title: 'IETF RFCs', url: 'https://www.ietf.org/standards/rfcs/', type: 'docs' },
        ]
      },
      { 
        value: 'none', 
        label: 'I don\'t actively follow trends', 
        recommendations: ['Subscribe to tech newsletters', 'Join developer communities', 'Start small - follow 3-5 good sources'], 
        scoreWeight: 0,
        mentorExplanation: 'The tech industry moves fast! Not staying current puts you behind. Start small - pick ONE thing from this list. Even 15 minutes a day of learning compounds over time. Your future self will thank you!',
        resources: [
          { title: 'Getting Started with Learning', url: 'https://www.freecodecamp.org/news/how-to-stay-up-to-date-on-programming/', type: 'article' },
          { title: 'Building Learning Habits', url: 'https://www.coursera.org/learn/learning-how-to-learn', type: 'course' },
          { title: 'Developer Communities', url: 'https://dev.to/', type: 'article' },
        ]
      },
    ],
  },

  // Question 10: Documentation
  {
    id: 'q10',
    title: 'How comfortable are you with documenting your code and technical decisions?',
    category: CATEGORIES.COMMUNICATION,
    type: 'multiple-choice',
    hint: 'Good documentation is a gift to your future self and your teammates',
    options: [
      { 
        value: 'minimal', 
        label: 'I write minimal or no documentation', 
        recommendations: ['Learn documentation best practices', 'Start with inline code comments', 'Write README files'], 
        scoreWeight: 0.18,
        mentorExplanation: 'Documentation might feel tedious, but it\'s an investment! Your future self (in 3 months) will thank you. Start small - explain the "why" behind complex code. Comments are for humans, not computers!',
        resources: [
          { title: 'Write the Docs Guide', url: 'https://www.writethedocs.org/guide/', type: 'docs' },
          { title: 'Code Documentation Best Practices', url: 'https://stackoverflow.blog/2021/12/23/best-practices-for-writing-code-comments/', type: 'article' },
          { title: 'README Template', url: 'https://github.com/othneildrew/Best-README-Template', type: 'github' },
        ]
      },
      { 
        value: 'basic', 
        label: 'I document when required', 
        recommendations: ['Create README files for projects', 'Document complex logic', 'Learn about ADRs'], 
        scoreWeight: 0.42,
        isCommonMistake: true,
        mentorExplanation: 'Documenting only when required means documentation is seen as a chore. Flip that mindset! Good docs are part of good code. They help you think clearly too. Document decisions, not just code.',
        resources: [
          { title: 'Architecture Decision Records', url: 'https://adr.github.io/', type: 'docs' },
          { title: 'Documenting Architecture', url: 'https://www.oreilly.com/library/view/documenting-software-architectures/9780132488617/', type: 'book' },
          { title: 'API Documentation Guide', url: 'https://idratherbewriting.com/learnapidoc/', type: 'docs' },
        ]
      },
      { 
        value: 'regular', 
        label: 'I regularly document my code and decisions', 
        recommendations: ['Establish documentation standards', 'Create technical guides', 'Share documentation practices'], 
        scoreWeight: 0.65,
        isCorrect: true,
        mentorExplanation: 'Great documentation habits! You understand that code tells you HOW, but documentation tells you WHY. Keep it up and help establish team standards.',
        resources: [
          { title: 'Technical Writing Courses', url: 'https://developers.google.com/tech-writing', type: 'course' },
          { title: 'Docs as Code', url: 'https://www.writethedocs.org/guide/docs-as-code/', type: 'docs' },
          { title: 'Documentation Patterns', url: 'https://documentation.divio.com/', type: 'article' },
        ]
      },
      { 
        value: 'thorough', 
        label: 'I write thorough documentation including ADRs', 
        recommendations: ['Create documentation templates', 'Train team on documentation', 'Automate documentation generation'], 
        scoreWeight: 0.82, 
        yearOneRecommendations: ['Establish team documentation standards', 'Create comprehensive API documentation'],
        isCorrect: true,
        mentorExplanation: 'Excellent! You understand documentation is a first-class citizen. ADRs are particularly valuable - they capture the "why" behind decisions. Share your documentation practices with the team!',
        resources: [
          { title: 'Markdown Guide', url: 'https://www.markdownguide.org/', type: 'docs' },
          { title: 'Docusaurus', url: 'https://docusaurus.io/', type: 'docs', description: 'Documentation site generator' },
          { title: 'Technical Writing for Developers', url: 'https://www.amazon.com/Docs-Developers-Engineers-Technical-Writing/dp/1484272161', type: 'book' },
        ]
      },
      { 
        value: 'advocate', 
        label: 'I advocate for and maintain documentation standards', 
        recommendations: ['Build documentation culture', 'Create documentation automation', 'Speak about documentation'], 
        scoreWeight: 1.0,
        isCorrect: true,
        mentorExplanation: 'You\'re a documentation champion! Good docs multiply team productivity. Keep advocating - documentation culture is as important as testing culture!',
        resources: [
          { title: 'Building Docs Culture', url: 'https://www.writethedocs.org/guide/writing/beginners-guide-to-docs/', type: 'docs' },
          { title: 'Documentation Systems', url: 'https://documentation.divio.com/', type: 'article' },
          { title: 'Speaking About Docs', url: 'https://www.writethedocs.org/videos/', type: 'video' },
        ]
      },
    ],
  },

  // NEW Question 11: Object-Oriented Programming
  {
    id: 'q11',
    title: 'How would you describe your understanding of Object-Oriented Programming (OOP) principles?',
    category: CATEGORIES.CORE_CONCEPTS,
    type: 'multiple-choice',
    hint: 'OOP is about modeling real-world concepts with encapsulation, inheritance, and polymorphism',
    options: [
      { 
        value: 'unfamiliar', 
        label: 'I\'m not familiar with OOP concepts', 
        recommendations: ['Learn OOP fundamentals', 'Study the four pillars of OOP', 'Practice with class-based projects'], 
        scoreWeight: 0.15,
        mentorExplanation: 'OOP is a fundamental programming paradigm! Even if you work with functional languages, understanding OOP helps you think about code organization. Start with the basics: classes, objects, encapsulation.',
        resources: [
          { title: 'Object-Oriented Programming in JavaScript', url: 'https://www.freecodecamp.org/news/object-oriented-javascript-for-beginners/', type: 'article' },
          { title: 'Head First Design Patterns', url: 'https://www.oreilly.com/library/view/head-first-design/9781492077992/', type: 'book' },
          { title: 'OOP Explained Simply', url: 'https://www.youtube.com/watch?v=pTB0EiLXUC8', type: 'video' },
        ]
      },
      { 
        value: 'basic', 
        label: 'I understand classes and objects but struggle with advanced concepts', 
        recommendations: ['Study inheritance and polymorphism', 'Learn design patterns', 'Practice SOLID principles'], 
        scoreWeight: 0.35,
        mentorExplanation: 'Good start! Classes and objects are the foundation. Now level up: learn when to use inheritance vs composition, understand polymorphism. These concepts help you write flexible code.',
        resources: [
          { title: 'SOLID Principles Explained', url: 'https://www.freecodecamp.org/news/solid-principles-explained-in-plain-english/', type: 'article' },
          { title: 'Design Patterns', url: 'https://refactoring.guru/design-patterns', type: 'article' },
          { title: 'Composition over Inheritance', url: 'https://www.youtube.com/watch?v=wfMtDGfHWpA', type: 'video' },
        ]
      },
      { 
        value: 'intermediate', 
        label: 'I can use inheritance, polymorphism, and encapsulation effectively', 
        recommendations: ['Master design patterns', 'Study SOLID principles deeply', 'Learn when to avoid OOP'], 
        scoreWeight: 0.6,
        isCorrect: true,
        mentorExplanation: 'Solid OOP skills! You understand the core concepts. Next: learn design patterns - they\'re proven solutions to common problems. Also important: knowing when NOT to use OOP!',
        resources: [
          { title: 'Design Patterns in Modern JavaScript', url: 'https://www.patterns.dev/', type: 'article' },
          { title: 'Clean Code', url: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882', type: 'book' },
          { title: 'SOLID Principles in Practice', url: 'https://www.youtube.com/watch?v=pTB0EiLXUC8', type: 'video' },
        ]
      },
      { 
        value: 'advanced', 
        label: 'I apply SOLID principles and design patterns appropriately', 
        recommendations: ['Study advanced patterns', 'Learn functional programming concepts', 'Mentor others in OOP'], 
        scoreWeight: 0.82,
        isCorrect: true,
        mentorExplanation: 'Excellent! You understand OOP deeply and apply principles wisely. Consider exploring functional programming too - the contrast will sharpen both skills. Teach others!',
        resources: [
          { title: 'Advanced Design Patterns', url: 'https://sourcemaking.com/design_patterns', type: 'article' },
          { title: 'Domain-Driven Design', url: 'https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215', type: 'book' },
          { title: 'Functional vs OOP', url: 'https://www.youtube.com/watch?v=JEq7Ehw-qk8', type: 'video' },
        ]
      },
      { 
        value: 'expert', 
        label: 'I architect complex systems using OOP and know its trade-offs vs other paradigms', 
        recommendations: ['Share OOP knowledge through writing/speaking', 'Mentor junior developers', 'Explore paradigm blending'], 
        scoreWeight: 1.0,
        isCorrect: true,
        mentorExplanation: 'You\'re an OOP expert! You understand not just HOW but WHEN to use OOP. Your grasp of trade-offs between paradigms is valuable - share it!',
        resources: [
          { title: 'Software Architecture Patterns', url: 'https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/', type: 'book' },
          { title: 'Gang of Four Design Patterns', url: 'https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612', type: 'book' },
          { title: 'Crafting Interpreters', url: 'https://craftinginterpreters.com/', type: 'book' },
        ]
      },
    ],
  },

  // NEW Question 12: Data Structures & Algorithms
  {
    id: 'q12',
    title: 'How comfortable are you with data structures and algorithms?',
    category: CATEGORIES.ALGORITHMS,
    type: 'multiple-choice',
    hint: 'Understanding DS&A helps you choose the right tool and optimize performance',
    options: [
      { 
        value: 'basics-only', 
        label: 'I know basic arrays and loops', 
        recommendations: ['Study common data structures', 'Learn Big O notation', 'Practice on platforms like LeetCode'], 
        scoreWeight: 0.2,
        mentorExplanation: 'Arrays and loops are the starting point! Next: learn when to use hash maps vs arrays, understand time/space complexity. These fundamentals matter in real work, not just interviews!',
        resources: [
          { title: 'JavaScript Algorithms', url: 'https://github.com/trekhleb/javascript-algorithms', type: 'github' },
          { title: 'Big O Cheat Sheet', url: 'https://www.bigocheatsheet.com/', type: 'docs' },
          { title: 'FreeCodeCamp DS&A', url: 'https://www.youtube.com/watch?v=8hly31xKli0', type: 'video' },
        ]
      },
      { 
        value: 'some-knowledge', 
        label: 'I know some structures (maps, sets) but don\'t understand complexity', 
        recommendations: ['Learn Big O notation deeply', 'Study algorithm complexity', 'Practice problem-solving'], 
        scoreWeight: 0.38,
        isCommonMistake: true,
        mentorExplanation: 'Knowing data structures is good, but understanding their complexity is crucial! A nested loop in a loop is O(n²) - that matters when n is large. Learn to analyze your code!',
        resources: [
          { title: 'Introduction to Algorithms', url: 'https://www.amazon.com/Introduction-Algorithms-3rd-MIT-Press/dp/0262033844', type: 'book' },
          { title: 'Big O Notation Explained', url: 'https://www.freecodecamp.org/news/big-o-notation-why-it-matters-and-why-it-doesnt-1674cfa8a23c/', type: 'article' },
          { title: 'Algorithm Complexity', url: 'https://www.youtube.com/watch?v=D6xkbGLQesk', type: 'video' },
        ]
      },
      { 
        value: 'intermediate', 
        label: 'I understand complexity and use appropriate structures for tasks', 
        recommendations: ['Study advanced algorithms', 'Practice solving medium problems', 'Learn dynamic programming'], 
        scoreWeight: 0.58,
        isCorrect: true,
        mentorExplanation: 'Great! You can choose the right structure for the job. Next level: study classic algorithms (sorting, searching, graph traversal). They appear more often than you think!',
        resources: [
          { title: 'Grokking Algorithms', url: 'https://www.manning.com/books/grokking-algorithms', type: 'book' },
          { title: 'LeetCode Patterns', url: 'https://seanprashad.com/leetcode-patterns/', type: 'article' },
          { title: 'NeetCode', url: 'https://neetcode.io/', type: 'article' },
        ]
      },
      { 
        value: 'advanced', 
        label: 'I can implement common algorithms and optimize code performance', 
        recommendations: ['Study advanced DS&A', 'Learn system optimization', 'Practice hard problems'], 
        scoreWeight: 0.78,
        isCorrect: true,
        mentorExplanation: 'Excellent algorithmic thinking! You can optimize code and make smart trade-offs. Keep practicing - these skills compound over time!',
        resources: [
          { title: 'Algorithm Design Manual', url: 'https://www.algorist.com/', type: 'book' },
          { title: 'LeetCode Hard Problems', url: 'https://leetcode.com/problemset/all/?difficulty=HARD', type: 'article' },
          { title: 'Competitive Programming', url: 'https://cp-algorithms.com/', type: 'docs' },
        ]
      },
      { 
        value: 'expert', 
        label: 'I solve complex algorithmic problems and can teach others', 
        recommendations: ['Participate in competitions', 'Mentor others', 'Share knowledge through content'], 
        scoreWeight: 1.0,
        isCorrect: true,
        mentorExplanation: 'You\'re an algorithms expert! This skill is rare and valuable. Share it - create tutorials, mentor others, help your team write more efficient code!',
        resources: [
          { title: 'Competitive Programmer\'s Handbook', url: 'https://cses.fi/book/book.pdf', type: 'book' },
          { title: 'TopCoder Tutorials', url: 'https://www.topcoder.com/thrive/articles/Competitive%20Programming%20Tutorials', type: 'article' },
          { title: 'Algorithms Course', url: 'https://www.coursera.org/specializations/algorithms', type: 'course' },
        ]
      },
    ],
  },

  // NEW Question 13: Git & Version Control
  {
    id: 'q13',
    title: 'How would you rate your Git and version control skills?',
    category: CATEGORIES.VERSION_CONTROL,
    type: 'multiple-choice',
    hint: 'Git is more than commits - it\'s about collaboration, history, and workflow',
    options: [
      { 
        value: 'basic-commands', 
        label: 'I use basic commands (add, commit, push, pull)', 
        recommendations: ['Learn branching strategies', 'Study Git workflows', 'Practice merge conflict resolution'], 
        scoreWeight: 0.25,
        mentorExplanation: 'Good start with the basics! Git is powerful beyond basic commands. Learn branching - it\'s like save points in a game. Master merging and rebasing - they\'ll save you headaches!',
        resources: [
          { title: 'Pro Git Book', url: 'https://git-scm.com/book/en/v2', type: 'book', description: 'Free comprehensive Git guide' },
          { title: 'Learn Git Branching', url: 'https://learngitbranching.js.org/', type: 'article', description: 'Interactive Git tutorial' },
          { title: 'Git Workflows', url: 'https://www.atlassian.com/git/tutorials/comparing-workflows', type: 'docs' },
        ]
      },
      { 
        value: 'branching', 
        label: 'I use branches and can resolve simple merge conflicts', 
        recommendations: ['Learn Git rebase', 'Study cherry-picking', 'Master conflict resolution'], 
        scoreWeight: 0.42,
        mentorExplanation: 'Great! Branches are essential for parallel development. Now learn advanced operations: rebase for clean history, cherry-pick for selective changes. Git reflog is your safety net!',
        resources: [
          { title: 'Git Rebase Explained', url: 'https://www.youtube.com/watch?v=f1wnYdLEpgI', type: 'video' },
          { title: 'Advanced Git', url: 'https://www.atlassian.com/git/tutorials/advanced-overview', type: 'docs' },
          { title: 'Oh Shit, Git!', url: 'https://ohshitgit.com/', type: 'article', description: 'How to fix common Git mistakes' },
        ]
      },
      { 
        value: 'workflows', 
        label: 'I understand Git workflows (GitFlow, trunk-based) and use them effectively', 
        recommendations: ['Learn advanced Git commands', 'Study commit message best practices', 'Master Git hooks'], 
        scoreWeight: 0.65,
        isCorrect: true,
        mentorExplanation: 'Excellent! Understanding workflows means you think beyond your local changes. Good commit messages are underrated - they\'re documentation! Learn Git hooks to automate checks.',
        resources: [
          { title: 'Conventional Commits', url: 'https://www.conventionalcommits.org/', type: 'docs' },
          { title: 'Git Hooks Tutorial', url: 'https://githooks.com/', type: 'docs' },
          { title: 'GitFlow vs Trunk-Based', url: 'https://www.youtube.com/watch?v=gW6dFpTMk8s', type: 'video' },
        ]
      },
      { 
        value: 'advanced', 
        label: 'I use advanced features (rebase, bisect, reflog) and teach others', 
        recommendations: ['Establish team Git standards', 'Create Git workshops', 'Automate with Git hooks'], 
        scoreWeight: 0.85,
        isCorrect: true,
        mentorExplanation: 'You\'re a Git power user! Bisect for finding bugs, reflog for recovering "lost" commits - these are lifesavers. Share your knowledge - many developers fear Git unnecessarily!',
        resources: [
          { title: 'Git Bisect Guide', url: 'https://www.metaltoad.com/blog/beginners-guide-git-bisect-process-elimination', type: 'article' },
          { title: 'Git Internals', url: 'https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain', type: 'docs' },
          { title: 'Building Better Teams with Git', url: 'https://www.youtube.com/watch?v=duqBHik7nRo', type: 'video' },
        ]
      },
      { 
        value: 'expert', 
        label: 'I understand Git internals and can solve complex repository issues', 
        recommendations: ['Share Git expertise through content', 'Create custom Git tools', 'Mentor teams on Git strategies'], 
        scoreWeight: 1.0,
        isCorrect: true,
        mentorExplanation: 'You understand Git at a deep level! Most developers never peek under the hood. Your ability to fix complex issues is invaluable. Consider creating tools or teaching resources!',
        resources: [
          { title: 'Git from the Bottom Up', url: 'https://jwiegley.github.io/git-from-the-bottom-up/', type: 'article' },
          { title: 'Git Magic', url: 'http://www-cs-students.stanford.edu/~blynn/gitmagic/', type: 'book' },
          { title: 'Advanced Git Techniques', url: 'https://www.youtube.com/watch?v=qsTthZi23VE', type: 'video' },
        ]
      },
    ],
  },

  // NEW Question 14: Code Quality & Refactoring
  {
    id: 'q14',
    title: 'How do you approach code quality and refactoring?',
    category: CATEGORIES.CODE_QUALITY,
    type: 'multiple-choice',
    hint: 'Clean code is about readability, maintainability, and future-you being happy',
    options: [
      { 
        value: 'make-it-work', 
        label: 'I focus on making it work, less on cleanliness', 
        recommendations: ['Learn clean code principles', 'Study code smells', 'Practice small refactorings'], 
        scoreWeight: 0.22,
        isCommonMistake: true,
        mentorExplanation: 'Making it work is step one, but it\'s not the finish line! Code is read 10x more than written. Spend 20% more time making it clean - your team (and future you) will thank you. Start small: better variable names, smaller functions.',
        resources: [
          { title: 'Clean Code', url: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882', type: 'book' },
          { title: 'Code Smells', url: 'https://refactoring.guru/refactoring/smells', type: 'article' },
          { title: 'Clean Code Summary', url: 'https://www.freecodecamp.org/news/clean-code-book-summary/', type: 'article' },
        ]
      },
      { 
        value: 'basic-cleanup', 
        label: 'I clean up obvious issues after getting code working', 
        recommendations: ['Learn systematic refactoring', 'Use linters and formatters', 'Study SOLID principles'], 
        scoreWeight: 0.38,
        mentorExplanation: 'Good instinct to clean up! Make it systematic: use tools like ESLint and Prettier to automate the basics. Then focus on structural improvements - extracting functions, removing duplication.',
        resources: [
          { title: 'Refactoring by Martin Fowler', url: 'https://refactoring.com/', type: 'book' },
          { title: 'ESLint Rules Explained', url: 'https://eslint.org/docs/latest/rules/', type: 'docs' },
          { title: 'Code Formatting with Prettier', url: 'https://prettier.io/', type: 'docs' },
        ]
      },
      { 
        value: 'regular-refactor', 
        label: 'I regularly refactor and follow coding standards', 
        recommendations: ['Learn advanced refactoring patterns', 'Lead code quality initiatives', 'Study design patterns'], 
        scoreWeight: 0.62,
        isCorrect: true,
        mentorExplanation: 'Excellent! Regular refactoring prevents technical debt from piling up. The "Boy Scout Rule" - leave code better than you found it. Keep learning refactoring patterns!',
        resources: [
          { title: 'Refactoring Catalog', url: 'https://refactoring.guru/refactoring/catalog', type: 'article' },
          { title: 'Working Effectively with Legacy Code', url: 'https://www.amazon.com/Working-Effectively-Legacy-Michael-Feathers/dp/0131177052', type: 'book' },
          { title: 'Refactoring Techniques', url: 'https://www.youtube.com/watch?v=DC-pQPq0acs', type: 'video' },
        ]
      },
      { 
        value: 'proactive', 
        label: 'I proactively identify and fix code smells and technical debt', 
        recommendations: ['Establish quality metrics', 'Mentor others in clean code', 'Create team standards'], 
        scoreWeight: 0.82,
        isCorrect: true,
        mentorExplanation: 'You have a great code quality mindset! Proactive refactoring prevents bigger problems. Help your team: create checklists, automated checks, share patterns you see.',
        resources: [
          { title: 'Code Quality Metrics', url: 'https://www.sonarsource.com/learn/code-quality/', type: 'article' },
          { title: 'Managing Technical Debt', url: 'https://martinfowler.com/bliki/TechnicalDebt.html', type: 'article' },
          { title: 'Clean Architecture', url: 'https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164', type: 'book' },
        ]
      },
      { 
        value: 'champion', 
        label: 'I champion code quality and establish organization-wide standards', 
        recommendations: ['Scale quality practices', 'Create tooling and automation', 'Share knowledge widely'], 
        scoreWeight: 1.0,
        isCorrect: true,
        mentorExplanation: 'You\'re a code quality champion! Your organizational impact is huge. Keep making quality easy and automatic - that\'s how it scales. Consider writing about your practices!',
        resources: [
          { title: 'Building Quality Culture', url: 'https://www.amazon.com/Accelerate-Software-Performing-Technology-Organizations/dp/1942788339', type: 'book' },
          { title: 'Code Review Tools', url: 'https://github.com/features/code-review/', type: 'docs' },
          { title: 'Quality Engineering', url: 'https://www.youtube.com/watch?v=7HhKAFy0Jqg', type: 'video' },
        ]
      },
    ],
  },

  // NEW Question 15: Asynchronous Programming
  {
    id: 'q15',
    title: 'How comfortable are you with asynchronous programming (Promises, async/await)?',
    category: CATEGORIES.CORE_CONCEPTS,
    type: 'multiple-choice',
    hint: 'Async is everywhere in modern development - API calls, file operations, database queries',
    options: [
      { 
        value: 'callbacks-only', 
        label: 'I mostly use callbacks and get confused by async code', 
        recommendations: ['Learn Promise fundamentals', 'Study async/await syntax', 'Practice error handling in async code'], 
        scoreWeight: 0.2,
        isCommonMistake: true,
        mentorExplanation: 'Callback hell is real! Promises and async/await make async code readable. Think of async/await as synchronous-looking code that doesn\'t block. Game changer! Start with Promises, then level up to async/await.',
        resources: [
          { title: 'JavaScript Promises Explained', url: 'https://javascript.info/promise-basics', type: 'article' },
          { title: 'Async/Await Tutorial', url: 'https://www.youtube.com/watch?v=V_Kr9OSfDeU', type: 'video' },
          { title: 'Async JavaScript', url: 'https://www.freecodecamp.org/news/asynchronous-javascript-explained/', type: 'article' },
        ]
      },
      { 
        value: 'promises', 
        label: 'I use Promises but sometimes struggle with complex async flows', 
        recommendations: ['Master async/await', 'Learn Promise.all and Promise.race', 'Study error handling patterns'], 
        scoreWeight: 0.42,
        mentorExplanation: 'Promises are good, async/await is better! It makes async code look synchronous and easier to reason about. Learn Promise combinators (all, race, allSettled) - they\'re powerful for parallel operations.',
        resources: [
          { title: 'Promise Combinators', url: 'https://javascript.info/promise-api', type: 'article' },
          { title: 'Async Error Handling', url: 'https://www.youtube.com/watch?v=ITogH7lJTyE', type: 'video' },
          { title: 'Advanced Async Patterns', url: 'https://www.patterns.dev/posts/async-patterns', type: 'article' },
        ]
      },
      { 
        value: 'async-await', 
        label: 'I comfortably use async/await and handle errors properly', 
        recommendations: ['Study advanced async patterns', 'Learn about event loop', 'Master concurrent operations'], 
        scoreWeight: 0.68,
        isCorrect: true,
        mentorExplanation: 'Great! Async/await with proper error handling is clean and maintainable. Next: understand the event loop - it\'ll help you debug tricky async bugs and optimize performance.',
        resources: [
          { title: 'Event Loop Explained', url: 'https://www.youtube.com/watch?v=8aGhZQkoFbQ', type: 'video', description: 'Classic talk by Philip Roberts' },
          { title: 'Async Patterns', url: 'https://www.patterns.dev/posts/async-patterns', type: 'article' },
          { title: 'Node.js Async Best Practices', url: 'https://github.com/goldbergyoni/nodebestpractices#2-error-handling-practices', type: 'github' },
        ]
      },
      { 
        value: 'advanced', 
        label: 'I understand the event loop and optimize async operations', 
        recommendations: ['Learn about concurrency models', 'Study async performance', 'Share async knowledge'], 
        scoreWeight: 0.85,
        isCorrect: true,
        mentorExplanation: 'Excellent async skills! Understanding the event loop puts you ahead of most developers. You can debug race conditions and optimize concurrent operations. Share this knowledge!',
        resources: [
          { title: 'Async Performance', url: 'https://nodejs.org/en/docs/guides/dont-block-the-event-loop/', type: 'docs' },
          { title: 'Concurrency Models', url: 'https://www.youtube.com/watch?v=8aGhZQkoFbQ', type: 'video' },
          { title: 'Async Patterns Deep Dive', url: 'https://www.nodejsdesignpatterns.com/', type: 'book' },
        ]
      },
      { 
        value: 'expert', 
        label: 'I architect complex async systems and solve advanced concurrency challenges', 
        recommendations: ['Write about async patterns', 'Build async libraries', 'Mentor others in async programming'], 
        scoreWeight: 1.0,
        isCorrect: true,
        mentorExplanation: 'You\'re an async expert! Complex concurrency is hard - your expertise is valuable. Consider creating libraries, writing detailed guides, or teaching workshops on async patterns.',
        resources: [
          { title: 'Distributed Systems', url: 'https://www.amazon.com/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/1449373321', type: 'book' },
          { title: 'Advanced Async Patterns', url: 'https://www.nodejsdesignpatterns.com/', type: 'book' },
          { title: 'Building Async Libraries', url: 'https://github.com/caolan/async', type: 'github' },
        ]
      },
    ],
  },

  // NEW Question 16: API Design & REST
  {
    id: 'q16',
    title: 'How would you rate your understanding of API design and RESTful principles?',
    category: CATEGORIES.CORE_CONCEPTS,
    type: 'multiple-choice',
    hint: 'Good API design is about intuitive, consistent, and well-documented interfaces',
    options: [
      { 
        value: 'consume-only', 
        label: 'I mainly consume APIs, haven\'t designed my own', 
        recommendations: ['Learn REST principles', 'Study API design best practices', 'Build a simple REST API'], 
        scoreWeight: 0.28,
        mentorExplanation: 'Using APIs teaches you what works! Now flip the perspective - design your own. Start with REST basics: resources, HTTP methods, status codes. Good API design is about empathy for your users.',
        resources: [
          { title: 'REST API Tutorial', url: 'https://restfulapi.net/', type: 'docs' },
          { title: 'API Design Patterns', url: 'https://www.manning.com/books/api-design-patterns', type: 'book' },
          { title: 'Build a REST API', url: 'https://www.youtube.com/watch?v=pKd0Rpw7O48', type: 'video' },
        ]
      },
      { 
        value: 'basic-rest', 
        label: 'I can create basic REST APIs but unsure about best practices', 
        recommendations: ['Study REST constraints', 'Learn API versioning', 'Practice good endpoint design'], 
        scoreWeight: 0.45,
        mentorExplanation: 'Good start! REST is more than CRUD endpoints. Learn the constraints (stateless, cacheable, etc.), study pagination, filtering, error responses. Consistency is key!',
        resources: [
          { title: 'REST API Best Practices', url: 'https://github.com/tfredrich/RestApiTutorial.com', type: 'github' },
          { title: 'API Pagination Guide', url: 'https://www.moesif.com/blog/technical/api-design/REST-API-Design-Filtering-Sorting-and-Pagination/', type: 'article' },
          { title: 'HTTP Status Codes', url: 'https://httpstatuses.com/', type: 'docs' },
        ]
      },
      { 
        value: 'good-apis', 
        label: 'I design consistent RESTful APIs with proper status codes and versioning', 
        recommendations: ['Learn API documentation', 'Study authentication patterns', 'Explore GraphQL'], 
        scoreWeight: 0.68,
        isCorrect: true,
        mentorExplanation: 'Excellent API design skills! Consistency and proper HTTP semantics make APIs pleasant to use. Next: master documentation (OpenAPI/Swagger), authentication (OAuth, JWT), and explore alternatives like GraphQL.',
        resources: [
          { title: 'OpenAPI Specification', url: 'https://swagger.io/specification/', type: 'docs' },
          { title: 'API Security Best Practices', url: 'https://github.com/shieldfy/API-Security-Checklist', type: 'github' },
          { title: 'GraphQL vs REST', url: 'https://www.youtube.com/watch?v=yWzKJPw_VzM', type: 'video' },
        ]
      },
      { 
        value: 'advanced', 
        label: 'I design scalable APIs with proper authentication, rate limiting, and documentation', 
        recommendations: ['Study API gateway patterns', 'Learn API performance optimization', 'Explore API management platforms'], 
        scoreWeight: 0.85,
        isCorrect: true,
        mentorExplanation: 'You design production-grade APIs! Rate limiting, authentication, documentation - these are what separate good from great. Consider studying API gateways and microservices patterns.',
        resources: [
          { title: 'API Gateway Pattern', url: 'https://microservices.io/patterns/apigateway.html', type: 'docs' },
          { title: 'API Performance', url: 'https://www.moesif.com/blog/technical/api-performance/API-Performance-Best-Practices/', type: 'article' },
          { title: 'Building Hypermedia APIs', url: 'https://www.amazon.com/Building-Hypermedia-APIs-HTML5-Node/dp/1449306578', type: 'book' },
        ]
      },
      { 
        value: 'architect', 
        label: 'I architect API ecosystems and establish API design standards', 
        recommendations: ['Write about API design', 'Create API style guides', 'Speak at conferences'], 
        scoreWeight: 1.0,
        isCorrect: true,
        mentorExplanation: 'You\'re an API architect! Your ecosystem-level thinking is rare. Share your standards and patterns - they could become industry references!',
        resources: [
          { title: 'API Design at Scale', url: 'https://www.amazon.com/Principles-Web-API-Design-Indispensable/dp/0137355637', type: 'book' },
          { title: 'API Governance', url: 'https://www.youtube.com/watch?v=zFzJXFzEiY4', type: 'video' },
          { title: 'API Strategy', url: 'https://tyk.io/api-strategy/', type: 'article' },
        ]
      },
    ],
  },

  // NEW Question 17: Security Awareness
  {
    id: 'q17',
    title: 'How aware are you of common security vulnerabilities and best practices?',
    category: CATEGORIES.CODE_QUALITY,
    type: 'multiple-choice',
    hint: 'Security isn\'t just the security team\'s job - every developer writes secure (or insecure) code',
    options: [
      { 
        value: 'minimal', 
        label: 'I have minimal security awareness', 
        recommendations: ['Learn OWASP Top 10', 'Study common vulnerabilities', 'Practice secure coding basics'], 
        scoreWeight: 0.15,
        mentorExplanation: 'Security might seem scary, but basics go a long way! Start with OWASP Top 10 - it covers the most common vulnerabilities. Simple things like input validation and parameterized queries prevent most attacks. Security is everyone\'s responsibility!',
        resources: [
          { title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/', type: 'docs', description: 'Most critical web security risks' },
          { title: 'Web Security Academy', url: 'https://portswigger.net/web-security', type: 'course', description: 'Free online security training' },
          { title: 'Security for Developers', url: 'https://www.youtube.com/watch?v=RobFFfySKcE', type: 'video' },
        ]
      },
      { 
        value: 'basic-awareness', 
        label: 'I know basics (SQL injection, XSS) but not how to prevent them', 
        recommendations: ['Learn prevention techniques', 'Study authentication best practices', 'Practice security testing'], 
        scoreWeight: 0.35,
        isCommonMistake: true,
        mentorExplanation: 'Knowing vulnerabilities exist is step one! Now learn prevention: parameterized queries stop SQL injection, proper encoding stops XSS. Most frameworks help, but you need to use them correctly. Think like an attacker!',
        resources: [
          { title: 'SQL Injection Prevention', url: 'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html', type: 'docs' },
          { title: 'XSS Prevention', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html', type: 'docs' },
          { title: 'Secure Coding Practices', url: 'https://www.securecoding.cert.org/', type: 'docs' },
        ]
      },
      { 
        value: 'conscious', 
        label: 'I actively consider security when coding and follow best practices', 
        recommendations: ['Study advanced security topics', 'Learn security testing', 'Get security certifications'], 
        scoreWeight: 0.62,
        isCorrect: true,
        mentorExplanation: 'Great security mindset! You think about security while coding, not as an afterthought. Next: learn security testing (penetration testing basics), study authentication flows (OAuth, JWT), understand HTTPS/TLS.',
        resources: [
          { title: 'Authentication Best Practices', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html', type: 'docs' },
          { title: 'JWT Security', url: 'https://www.youtube.com/watch?v=7Q17ubqLfaM', type: 'video' },
          { title: 'Practical Security Testing', url: 'https://www.hacksplaining.com/', type: 'article' },
        ]
      },
      { 
        value: 'proactive', 
        label: 'I proactively identify vulnerabilities and help secure codebases', 
        recommendations: ['Lead security initiatives', 'Perform security audits', 'Share security knowledge'], 
        scoreWeight: 0.82,
        isCorrect: true,
        mentorExplanation: 'Excellent security awareness! Proactive security work prevents breaches. Help your team: do code reviews with security in mind, run security scans, create security checklists.',
        resources: [
          { title: 'Security Code Review', url: 'https://owasp.org/www-project-code-review-guide/', type: 'docs' },
          { title: 'Threat Modeling', url: 'https://owasp.org/www-community/Threat_Modeling', type: 'docs' },
          { title: 'DevSecOps', url: 'https://www.youtube.com/watch?v=J73MELGF6u0', type: 'video' },
        ]
      },
      { 
        value: 'expert', 
        label: 'I have deep security expertise and establish security standards', 
        recommendations: ['Get advanced certifications', 'Speak about security', 'Build security tools'], 
        scoreWeight: 1.0,
        isCorrect: true,
        mentorExplanation: 'You\'re a security expert! Your knowledge protects entire organizations. Consider getting certifications (CEH, OSCP), speaking at conferences, or building security tools. Share this rare expertise!',
        resources: [
          { title: 'OWASP Cheat Sheets', url: 'https://cheatsheetseries.owasp.org/', type: 'docs' },
          { title: 'Web Security Testing Guide', url: 'https://owasp.org/www-project-web-security-testing-guide/', type: 'docs' },
          { title: 'Security Certifications Guide', url: 'https://www.offensive-security.com/', type: 'docs' },
        ]
      },
    ],
  },

  // NEW Question 18: Performance Optimization
  {
    id: 'q18',
    title: 'How do you approach performance optimization in your applications?',
    category: CATEGORIES.PROBLEM_SOLVING,
    type: 'multiple-choice',
    hint: 'Premature optimization is bad, but ignoring performance is worse. Balance is key.',
    options: [
      { 
        value: 'dont-think', 
        label: 'I don\'t usually think about performance until there\'s a problem', 
        recommendations: ['Learn performance fundamentals', 'Study common bottlenecks', 'Use browser DevTools'], 
        scoreWeight: 0.22,
        isCommonMistake: true,
        mentorExplanation: 'Performance matters to users! You don\'t need to optimize everything, but be aware. Learn to spot obvious issues: nested loops, unnecessary re-renders, large bundle sizes. Use browser DevTools - they show you where time goes.',
        resources: [
          { title: 'Web Performance Fundamentals', url: 'https://web.dev/learn-web-vitals/', type: 'docs' },
          { title: 'Chrome DevTools Performance', url: 'https://developer.chrome.com/docs/devtools/performance/', type: 'docs' },
          { title: 'Why Performance Matters', url: 'https://web.dev/why-speed-matters/', type: 'article' },
        ]
      },
      { 
        value: 'reactive', 
        label: 'I optimize when users complain or metrics show issues', 
        recommendations: ['Learn to measure performance', 'Study optimization patterns', 'Set performance budgets'], 
        scoreWeight: 0.38,
        mentorExplanation: 'Reactive optimization works, but proactive is better! Learn to measure: use Lighthouse, set performance budgets. Prevent performance issues in code review. "If you can\'t measure it, you can\'t improve it."',
        resources: [
          { title: 'Web Performance Metrics', url: 'https://web.dev/metrics/', type: 'docs' },
          { title: 'Performance Budgets', url: 'https://web.dev/performance-budgets-101/', type: 'article' },
          { title: 'Lighthouse Guide', url: 'https://developer.chrome.com/docs/lighthouse/overview/', type: 'docs' },
        ]
      },
      { 
        value: 'conscious', 
        label: 'I consider performance while coding and use profiling tools', 
        recommendations: ['Master advanced optimization techniques', 'Learn caching strategies', 'Study render optimization'], 
        scoreWeight: 0.62,
        isCorrect: true,
        mentorExplanation: 'Great performance awareness! You measure before optimizing - that\'s smart. Next: learn advanced techniques like code splitting, lazy loading, memoization, caching strategies. Small optimizations compound!',
        resources: [
          { title: 'Web Performance Optimization', url: 'https://www.youtube.com/watch?v=AQqFZ5t8uNc', type: 'video' },
          { title: 'React Performance', url: 'https://kentcdodds.com/blog/fix-the-slow-render-before-you-fix-the-re-render', type: 'article' },
          { title: 'Patterns for Performance', url: 'https://www.patterns.dev/posts/rendering-patterns/', type: 'article' },
        ]
      },
      { 
        value: 'proactive', 
        label: 'I proactively optimize and set performance budgets', 
        recommendations: ['Establish performance culture', 'Build performance monitoring', 'Share optimization knowledge'], 
        scoreWeight: 0.82,
        isCorrect: true,
        mentorExplanation: 'Excellent! Performance budgets prevent regressions. You\'re making performance a team priority. Keep sharing wins and techniques - make performance visible and valued.',
        resources: [
          { title: 'Building Performance Culture', url: 'https://www.youtube.com/watch?v=FEs2jgZBaQA', type: 'video' },
          { title: 'Performance Monitoring', url: 'https://web.dev/vitals/', type: 'docs' },
          { title: 'High Performance Browser Networking', url: 'https://hpbn.co/', type: 'book' },
        ]
      },
      { 
        value: 'expert', 
        label: 'I architect systems for performance and lead optimization initiatives', 
        recommendations: ['Speak about performance', 'Create performance tooling', 'Scale performance practices'], 
        scoreWeight: 1.0,
        isCorrect: true,
        mentorExplanation: 'You\'re a performance expert! Your architectural decisions impact user experience at scale. Share your knowledge - performance engineering is underrepresented in content. Write, speak, build tools!',
        resources: [
          { title: 'Designing for Performance', url: 'https://designingforperformance.com/', type: 'book' },
          { title: 'Systems Performance', url: 'https://www.amazon.com/Systems-Performance-Brendan-Gregg/dp/0136820158', type: 'book' },
          { title: 'Performance at Scale', url: 'https://www.youtube.com/watch?v=VaNTXw5udmA', type: 'video' },
        ]
      },
    ],
  },

  // NEW Question 19: CI/CD & DevOps
  {
    id: 'q19',
    title: 'What\'s your experience with CI/CD pipelines and DevOps practices?',
    category: CATEGORIES.TECHNICAL_SKILLS,
    type: 'multiple-choice',
    hint: 'DevOps bridges development and operations - automate testing, deployment, monitoring',
    options: [
      { 
        value: 'no-experience', 
        label: 'Little to no experience with CI/CD', 
        recommendations: ['Learn CI/CD basics', 'Study deployment strategies', 'Set up a simple pipeline'], 
        scoreWeight: 0.15,
        mentorExplanation: 'CI/CD might seem like "operations stuff," but it affects how you develop! Automated testing and deployment let you ship faster and safer. Start simple: automate tests on every commit. The confidence is worth it!',
        resources: [
          { title: 'CI/CD Explained', url: 'https://www.youtube.com/watch?v=scEDHsr3APg', type: 'video' },
          { title: 'GitHub Actions Tutorial', url: 'https://docs.github.com/en/actions/quickstart', type: 'docs' },
          { title: 'CI/CD Best Practices', url: 'https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment', type: 'article' },
        ]
      },
      { 
        value: 'use-existing', 
        label: 'I use existing CI/CD pipelines but don\'t configure them', 
        recommendations: ['Learn pipeline configuration', 'Study different CI/CD tools', 'Create your own pipeline'], 
        scoreWeight: 0.32,
        mentorExplanation: 'Using pipelines is good! Now learn to create them. Understanding how builds, tests, and deployments work helps you debug issues and improve the process. Try setting up a simple pipeline for a side project!',
        resources: [
          { title: 'GitLab CI/CD Tutorial', url: 'https://docs.gitlab.com/ee/ci/', type: 'docs' },
          { title: 'Jenkins Tutorial', url: 'https://www.jenkins.io/doc/tutorials/', type: 'docs' },
          { title: 'CI/CD Pipeline Design', url: 'https://www.youtube.com/watch?v=WnhcAR1YgS8', type: 'video' },
        ]
      },
      { 
        value: 'configure', 
        label: 'I can configure and maintain CI/CD pipelines', 
        recommendations: ['Learn infrastructure as code', 'Study deployment strategies', 'Master monitoring and logging'], 
        scoreWeight: 0.58,
        isCorrect: true,
        mentorExplanation: 'Great DevOps skills! You understand the development pipeline. Next: infrastructure as code (Terraform, CloudFormation), advanced deployment strategies (blue-green, canary), observability (logging, monitoring).',
        resources: [
          { title: 'Terraform Tutorial', url: 'https://developer.hashicorp.com/terraform/tutorials', type: 'docs' },
          { title: 'Deployment Strategies', url: 'https://www.youtube.com/watch?v=AWVTKBUnoIg', type: 'video' },
          { title: 'The DevOps Handbook', url: 'https://www.amazon.com/DevOps-Handbook-World-Class-Reliability-Organizations/dp/1942788002', type: 'book' },
        ]
      },
      { 
        value: 'advanced', 
        label: 'I design deployment strategies and implement infrastructure as code', 
        recommendations: ['Study Kubernetes', 'Learn observability', 'Advocate for DevOps practices'], 
        scoreWeight: 0.78,
        isCorrect: true,
        mentorExplanation: 'Excellent DevOps capabilities! You\'re bridging dev and ops effectively. Share your knowledge - many developers struggle with deployments. Good DevOps practices multiply team productivity!',
        resources: [
          { title: 'Kubernetes Tutorial', url: 'https://kubernetes.io/docs/tutorials/', type: 'docs' },
          { title: 'Observability Engineering', url: 'https://www.oreilly.com/library/view/observability-engineering/9781492076438/', type: 'book' },
          { title: 'Cloud Native DevOps', url: 'https://www.youtube.com/watch?v=gH5cMLWwOxw', type: 'video' },
        ]
      },
      { 
        value: 'expert', 
        label: 'I architect complete DevOps solutions and lead platform engineering', 
        recommendations: ['Share DevOps knowledge', 'Build developer platforms', 'Speak at conferences'], 
        scoreWeight: 1.0,
        isCorrect: true,
        mentorExplanation: 'You\'re a DevOps/Platform Engineering expert! Your work enables entire organizations to ship faster and safer. This expertise is highly valuable - share it through talks, writing, or building tools!',
        resources: [
          { title: 'Platform Engineering', url: 'https://platformengineering.org/', type: 'docs' },
          { title: 'Site Reliability Engineering', url: 'https://sre.google/books/', type: 'book', description: 'Free Google SRE books' },
          { title: 'DevOps at Scale', url: 'https://www.youtube.com/watch?v=WnhcAR1YgS8', type: 'video' },
        ]
      },
    ],
  },

  // NEW Question 20: Problem-Solving Approach
  {
    id: 'q20',
    title: 'How do you typically approach solving a new technical problem?',
    category: CATEGORIES.PROBLEM_SOLVING,
    type: 'multiple-choice',
    hint: 'Your problem-solving process matters as much as the solution',
    options: [
      { 
        value: 'trial-error', 
        label: 'Trial and error until something works', 
        recommendations: ['Learn systematic problem-solving', 'Study debugging strategies', 'Practice breaking down problems'], 
        scoreWeight: 0.2,
        isCommonMistake: true,
        mentorExplanation: 'Random trial and error is frustrating and slow! Learn systematic approaches: understand the problem first, break it into smaller pieces, form hypotheses, test them. Saves tons of time! Rubber duck debugging helps too.',
        resources: [
          { title: 'How to Think Like a Programmer', url: 'https://www.freecodecamp.org/news/how-to-think-like-a-programmer-lessons-in-problem-solving-d1d8bf1de7d2/', type: 'article' },
          { title: 'Problem Solving Techniques', url: 'https://www.youtube.com/watch?v=azcrPFhaY9k', type: 'video' },
          { title: 'The Pragmatic Programmer', url: 'https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/', type: 'book' },
        ]
      },
      { 
        value: 'google-copy', 
        label: 'Search for solutions and adapt code I find', 
        recommendations: ['Understand before copying', 'Build problem-solving skills', 'Learn underlying concepts'], 
        scoreWeight: 0.35,
        isCommonMistake: true,
        mentorExplanation: 'Searching is smart, blindly copying is not! Understand WHY a solution works before using it. What if you hit a similar problem later? Build understanding, not just working code. Stack Overflow is a learning tool, not a copy-paste source.',
        resources: [
          { title: 'How to Read Documentation', url: 'https://www.writethedocs.org/videos/portland/2019/lessons-learned-in-a-year-of-reading-mdm-documentation-kayce-basques/', type: 'video' },
          { title: 'Effective Stack Overflow Use', url: 'https://stackoverflow.blog/2021/03/31/the-key-copy-paste-programming-techniques/', type: 'article' },
          { title: 'Learning by Doing', url: 'https://www.freecodecamp.org/news/how-to-learn-programming/', type: 'article' },
        ]
      },
      { 
        value: 'understand-first', 
        label: 'I try to understand the problem fully before coding', 
        recommendations: ['Learn design thinking', 'Practice problem decomposition', 'Study algorithmic thinking'], 
        scoreWeight: 0.55,
        isCorrect: true,
        mentorExplanation: 'Great instinct! Understanding the problem is half the solution. "Weeks of coding can save hours of planning." Keep this habit! Add: write down the problem, identify constraints, consider edge cases before coding.',
        resources: [
          { title: 'How to Solve It', url: 'https://www.amazon.com/How-Solve-Mathematical-Princeton-Science/dp/069116407X', type: 'book', description: 'Classic problem-solving book' },
          { title: 'Algorithmic Thinking', url: 'https://www.youtube.com/watch?v=rL8X2mlNHPM', type: 'video' },
          { title: 'Problem Decomposition', url: 'https://www.freecodecamp.org/news/how-to-think-like-a-programmer-lessons-in-problem-solving-d1d8bf1de7d2/', type: 'article' },
        ]
      },
      { 
        value: 'systematic', 
        label: 'I use systematic approaches: break down, research, prototype, iterate', 
        recommendations: ['Learn advanced problem-solving patterns', 'Study design patterns', 'Mentor others in problem-solving'], 
        scoreWeight: 0.75,
        isCorrect: true,
        mentorExplanation: 'Excellent systematic approach! Breaking down problems, prototyping quickly, iterating - that\'s professional problem-solving. Your process is as valuable as your technical skills. Teach others your approach!',
        resources: [
          { title: 'Design Thinking Process', url: 'https://www.interaction-design.org/literature/article/5-stages-in-the-design-thinking-process', type: 'article' },
          { title: 'Rapid Prototyping', url: 'https://www.youtube.com/watch?v=JMjozqJS44M', type: 'video' },
          { title: 'A Philosophy of Software Design', url: 'https://www.amazon.com/Philosophy-Software-Design-John-Ousterhout/dp/1732102201', type: 'book' },
        ]
      },
      { 
        value: 'holistic', 
        label: 'I consider trade-offs, constraints, and impact before proposing solutions', 
        recommendations: ['Share problem-solving frameworks', 'Mentor in technical decision-making', 'Write about your process'], 
        scoreWeight: 0.9,
        isCorrect: true,
        mentorExplanation: 'You think like an engineer, not just a coder! Considering trade-offs and constraints shows maturity. You know there\'s no perfect solution, only appropriate ones. This thinking is leadership - share it!',
        resources: [
          { title: 'Technical Decision Making', url: 'https://www.youtube.com/watch?v=jsNnlu0B1-0', type: 'video' },
          { title: 'Systems Thinking', url: 'https://www.amazon.com/Thinking-Systems-Donella-H-Meadows/dp/1603580557', type: 'book' },
          { title: 'Architecture Decision Records', url: 'https://adr.github.io/', type: 'docs' },
        ]
      },
    ],
  },
];

export const SCORE_LEVELS = {
  JUNIOR: { min: 0, max: 3.9, label: 'Junior Developer', color: 'text-orange-600', description: 'Building foundations and learning core concepts' },
  INTERMEDIATE: { min: 4, max: 6.9, label: 'Intermediate Developer', color: 'text-yellow-600', description: 'Solid fundamentals with growing independence' },
  ADVANCED_BEGINNER: { min: 7, max: 7.9, label: 'Advanced Beginner', color: 'text-blue-600', description: 'Strong skills approaching senior level' },
  ADVANCED: { min: 8, max: 8.9, label: 'Advanced Developer', color: 'text-indigo-600', description: 'Deep expertise and technical leadership' },
  EXPERT: { min: 9, max: 10, label: 'Expert/Senior Developer', color: 'text-green-600', description: 'Mastery with organizational impact' },
};

export const getSkillLevel = (score: number): typeof SCORE_LEVELS[keyof typeof SCORE_LEVELS] => {
  if (score < 4) return SCORE_LEVELS.JUNIOR;
  if (score < 7) return SCORE_LEVELS.INTERMEDIATE;
  if (score < 8) return SCORE_LEVELS.ADVANCED_BEGINNER;
  if (score < 9) return SCORE_LEVELS.ADVANCED;
  return SCORE_LEVELS.EXPERT;
};
