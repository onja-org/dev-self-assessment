import { Answer, Assessment, ActionPlan, QuestionOption } from '@/types';
import { QUESTIONS, CATEGORIES, getSkillLevel } from './constants';

export const calculateScore = (responses: Record<string, Answer>): {
  categoryScores: Record<string, number>;
  overallScore: number;
} => {
  const categoryScores: Record<string, number> = {};
  const categoryTotals: Record<string, { sum: number; count: number }> = {};

  // Initialize category totals
  Object.values(CATEGORIES).forEach(category => {
    categoryTotals[category] = { sum: 0, count: 0 };
  });

  // Calculate scores per category
  Object.entries(responses).forEach(([questionId, answer]) => {
    const question = QUESTIONS.find(q => q.id === questionId);
    if (!question) return;

    const category = question.category;
    const weight = answer.scoreWeight;

    categoryTotals[category].sum += weight;
    categoryTotals[category].count += 1;
  });

  // Convert to 0-10 scale
  Object.entries(categoryTotals).forEach(([category, { sum, count }]) => {
    if (count > 0) {
      categoryScores[category] = Math.round((sum / count) * 10 * 10) / 10; // Round to 1 decimal
    } else {
      categoryScores[category] = 0;
    }
  });

  // Calculate overall score as average of category scores
  const scores = Object.values(categoryScores).filter(score => score > 0);
  const overallScore = scores.length > 0
    ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10
    : 0;

  return { categoryScores, overallScore };
};

interface TopRecommendation {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionPlan: string;
  resources: Array<{
    title: string;
    url: string;
    type: 'article' | 'video' | 'course' | 'docs' | 'github' | 'book' | 'roadmap';
    description?: string;
  }>;
  category: string;
}

export const getTopRecommendations = (
  categoryScores: Record<string, number>,
  responses: Record<string, Answer>,
  overallScore: number
): TopRecommendation[] => {
  const recommendations: Array<TopRecommendation & { internalPriority: number }> = [];
  
  // Find the 3 weakest categories
  const weakCategories = Object.entries(categoryScores)
    .sort(([_, a], [__, b]) => a - b)
    .slice(0, 3);

  const skillLevel = getSkillLevel(overallScore);

  // Generate personalized recommendations for each weak category
  weakCategories.forEach(([category, score], index) => {
    const categoryQuestions = QUESTIONS.filter(q => q.category === category);
    
    // Find the specific answers that need improvement
    const improvementAreas: Array<{ question: any; option: QuestionOption; weight: number }> = [];
    
    categoryQuestions.forEach(question => {
      const response = responses[question.id];
      if (!response || !question.options) return;

      let selectedOptions: QuestionOption[] = [];
      if (Array.isArray(response.value)) {
        selectedOptions = question.options.filter(opt => (response.value as string[]).includes(opt.value));
      } else {
        const opt = question.options.find(opt => opt.value === response.value);
        if (opt) selectedOptions = [opt];
      }

      selectedOptions.forEach(option => {
        if (option.scoreWeight < 0.6) {
          improvementAreas.push({ question, option, weight: option.scoreWeight });
        }
      });
    });

    // Sort by lowest weight to prioritize biggest gaps
    improvementAreas.sort((a, b) => a.weight - b.weight);

    if (improvementAreas.length > 0) {
      const topArea = improvementAreas[0];
      
      // Create mentor-style description based on skill level and category
      let mentorDescription = generateMentorDescription(
        category,
        score,
        skillLevel.label,
        topArea.option.mentorExplanation
      );

      // Create actionable monthly plan
      let actionPlan = generateActionPlan(category, score, skillLevel.label);

      // Select best 2-3 resources that have descriptions
      const topResources = (topArea.option.resources || [])
        .slice(0, 3);

      recommendations.push({
        title: `Strengthen ${category}`,
        description: mentorDescription,
        actionPlan,
        priority: index === 0 ? 'high' : index === 1 ? 'medium' : 'low',
        resources: topResources,
        category,
        internalPriority: (3 - index) * 10 + (6 - score), // Higher priority for weaker areas
      });
    }
  });

  // Return top 3, sorted by internal priority
  return recommendations
    .sort((a, b) => b.internalPriority - a.internalPriority)
    .slice(0, 3)
    .map(({ internalPriority, ...rest }) => rest);
};

function generateMentorDescription(
  category: string,
  score: number,
  skillLevel: string,
  optionExplanation: string
): string {
  const levelContext = skillLevel.includes('Junior') 
    ? "You're building your foundation, which is exactly where everyone starts!"
    : skillLevel.includes('Intermediate')
    ? "You've got solid fundamentals - now it's time to deepen your expertise."
    : "You're doing well overall, but there's always room to sharpen specific skills.";

  const scoreContext = score < 4
    ? `Your current score in ${category} (${score}/10) shows there's significant room for growth. That's okay - we all start somewhere! The key is consistent, focused practice.`
    : score < 6
    ? `Your ${category} skills (${score}/10) are developing, but with focused effort, you can reach the next level within a few months.`
    : `Your ${category} score (${score}/10) is decent, but closing this gap will round out your skill set and make you more confident in this area.`;

  return `${levelContext} ${scoreContext}\n\n${optionExplanation}\n\nHere's what I recommend: Start with the fundamentals if they're shaky, then progressively tackle more challenging concepts. Don't rush - depth beats breadth. Practice consistently, even if it's just 30 minutes a day. Build small projects that force you to apply these skills. Review and reflect on what you learn. This deliberate practice approach works!`;
}

function generateActionPlan(category: string, score: number, skillLevel: string): string {
  const timeframe = score < 4 ? "2-3 months" : score < 6 ? "4-6 weeks" : "3-4 weeks";
  
  const plans: Record<string, string> = {
    'Technical Skills': `**This Month:** Pick one technology from your stack and go deep. Build a small but complete project using it. Focus on understanding, not just making it work.\n\n**Next ${timeframe}:** Master the fundamentals through daily practice. Read official documentation, follow a structured course, and build 2-3 progressively complex projects. Share your work for feedback.`,
    
    'Problem Solving': `**This Month:** Solve 3-4 coding challenges per week on LeetCode or similar platforms. Focus on understanding patterns, not memorizing solutions. Write down your thought process.\n\n**Next ${timeframe}:** Practice explaining your solutions out loud. Tackle harder problems. Learn common algorithms and data structures. Apply these patterns to real projects.`,
    
    'Core Programming Concepts': `**This Month:** Pick one core concept you're weak in (OOP, functional programming, async, etc.). Study it deeply through articles and videos. Implement examples from scratch.\n\n**Next ${timeframe}:** Build a project that uses these concepts extensively. Refactor old code using your new understanding. Teach the concept to someone else - that solidifies learning.`,
    
    'Code Quality & Best Practices': `**This Month:** Read one chapter of "Clean Code" or similar book each week. Review your recent code and identify 3 improvements. Make those changes.\n\n**Next ${timeframe}:** Set up linting and formatting tools. Practice writing tests. Do code reviews focusing on quality. Build habits around writing maintainable code.`,
    
    'Collaboration': `**This Month:** Volunteer for pair programming sessions. Review at least 3 pull requests per week with thoughtful, constructive feedback. Ask questions in team discussions.\n\n**Next ${timeframe}:** Lead a small technical discussion or demo. Share knowledge through documentation or quick tutorials. Practice active listening and clear communication.`,
    
    'Communication': `**This Month:** Write clear commit messages and PR descriptions. Document one complex piece of code. Present your work in a team meeting.\n\n**Next ${timeframe}:** Start a technical blog or internal wiki posts. Practice explaining technical concepts to non-technical people. Give feedback kindly but clearly.`,
    
    'Learning & Growth': `**This Month:** Subscribe to 2-3 quality learning resources. Dedicate 30 minutes daily to learning. Take notes and apply what you learn immediately.\n\n**Next ${timeframe}:** Build a learning habit. Follow a structured course. Join a developer community. Share what you learn. Stay curious!`,
    
    'Version Control & Git': `**This Month:** Practice Git commands beyond add/commit/push. Learn branching strategies. Review Git best practices. Clean up your commit history.\n\n**Next ${timeframe}:** Master rebasing, cherry-picking, and conflict resolution. Contribute to open source. Establish Git workflows in your team.`,
    
    'Data Structures & Algorithms': `**This Month:** Study one data structure per week (arrays, linked lists, trees, graphs). Implement each from scratch. Solve problems using them.\n\n**Next ${timeframe}:** Learn algorithm analysis (Big O). Study sorting and searching algorithms. Practice on coding platforms. Apply to real projects where appropriate.`,
    
    'Debugging & Problem Analysis': `**This Month:** Use debugger tools instead of console.log. Practice systematic debugging: reproduce, isolate, understand, fix, verify. Document your process.\n\n**Next ${timeframe}:** Learn profiling and performance debugging. Study common bug patterns. Help others debug - it sharpens your skills. Build debugging intuition through practice.`,
  };

  return plans[category] || `**This Month:** Focus on fundamentals. Build small projects. Seek feedback.\n\n**Next ${timeframe}:** Deepen expertise through consistent practice and real-world application.`;
}

export const generateActionPlans = (
  categoryScores: Record<string, number>,
  responses: Record<string, Answer>
): ActionPlan[] => {
  const plans: ActionPlan[] = [];

  Object.entries(categoryScores).forEach(([category, score]) => {
    const categoryQuestions = QUESTIONS.filter(q => q.category === category);
    const shortTerm: string[] = [];
    const longTerm: string[] = [];

    // Collect recommendations from responses
    categoryQuestions.forEach(question => {
      const response = responses[question.id];
      if (response && response.recommendations) {
        shortTerm.push(...response.recommendations);
      }

      // Add year-one recommendations for long-term
      if (question.options) {
        const selectedOption = question.options.find(opt => {
          if (Array.isArray(response?.value)) {
            return response.value.includes(opt.value);
          }
          return opt.value === response?.value;
        });

        if (selectedOption?.yearOneRecommendations) {
          longTerm.push(...selectedOption.yearOneRecommendations);
        }
      }
    });

    // Add score-based recommendations
    if (score < 4) {
      shortTerm.push(`Focus on fundamentals in ${category}`);
      longTerm.push(`Build a strong foundation over the next 12 months`);
    } else if (score < 7) {
      shortTerm.push(`Deepen your expertise in ${category}`);
      longTerm.push(`Aim to reach advanced level within a year`);
    } else if (score < 9) {
      shortTerm.push(`Polish advanced skills in ${category}`);
      longTerm.push(`Position yourself as a team expert in this area`);
    } else {
      shortTerm.push(`Mentor others and share knowledge in ${category}`);
      longTerm.push(`Lead initiatives and drive innovation in this domain`);
    }

    plans.push({
      category,
      shortTerm: Array.from(new Set(shortTerm)), // Remove duplicates
      longTerm: Array.from(new Set(longTerm)),
    });
  });

  return plans;
};

export const getScoreLevel = (score: number): string => {
  const level = getSkillLevel(score);
  return level.label;
};

export const getScoreLevelColor = (score: number): string => {
  const level = getSkillLevel(score);
  return level.color;
};
