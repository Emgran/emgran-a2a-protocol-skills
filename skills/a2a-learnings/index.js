/**
 * A2A Learnings Skill
 * 
 * Records and retrieves lessons learned during development
 */

const fs = require('fs');
const path = require('path');

const LEARNINGS_FILE = path.join(__dirname, '../../LEARNINGS.md');

/**
 * Load learnings from file
 */
function loadLearnings() {
  try {
    const content = fs.readFileSync(LEARNINGS_FILE, 'utf-8');
    return content;
  } catch (error) {
    return '# A2A Learnings\n\nNo learnings recorded yet.\n';
  }
}

/**
 * Save learnings to file
 */
function saveLearnings(content) {
  fs.writeFileSync(LEARNINGS_FILE, content, 'utf-8');
}

/**
 * Add a new learning
 * 
 * @param {Object} params - Parameters
 * @param {string} params.category - Category (e.g., 'development', 'testing', 'deployment')
 * @param {string} params.lesson - The lesson learned
 * @param {string} params.severity - Severity level ('info', 'warning', 'critical')
 * @returns {Promise<Object>} Result
 */
async function addLearning(params = {}) {
  const { category, lesson, severity = 'info' } = params;
  
  if (!lesson) {
    return {
      success: false,
      error: 'lesson is required',
    };
  }
  
  const learnings = loadLearnings();
  const timestamp = new Date().toISOString();
  const emoji = {
    info: '💡',
    warning: '⚠️',
    critical: '❌',
  }[severity] || '💡';
  
  const newLearning = `\n### ${emoji} ${category || 'General'} - ${timestamp}\n\n${lesson}\n`;
  
  saveLearnings(learnings + newLearning);
  
  return {
    success: true,
    data: {
      message: 'Learning recorded',
      category,
      severity,
      timestamp,
    },
  };
}

/**
 * Get all learnings
 * 
 * @param {Object} params - Parameters
 * @param {string} params.category - Filter by category (optional)
 * @returns {Promise<Object>} Learnings content
 */
async function getLearnings(params = {}) {
  const { category } = params;
  
  let learnings = loadLearnings();
  
  if (category) {
    // Filter by category
    const lines = learnings.split('\n');
    const filtered = [];
    let inCategory = false;
    
    for (const line of lines) {
      if (line.includes(`### ${category}`)) {
        inCategory = true;
      } else if (line.startsWith('###') && inCategory) {
        break;
      }
      
      if (inCategory) {
        filtered.push(line);
      }
    }
    
    learnings = filtered.join('\n') || `No learnings found for category: ${category}`;
  }
  
  return {
    success: true,
    data: {
      content: learnings,
      length: learnings.length,
    },
  };
}

/**
 * Search learnings
 * 
 * @param {Object} params - Parameters
 * @param {string} params.query - Search query
 * @returns {Promise<Object>} Search results
 */
async function searchLearnings(params = {}) {
  const { query } = params;
  
  if (!query) {
    return {
      success: false,
      error: 'query is required',
    };
  }
  
  const learnings = loadLearnings();
  const lines = learnings.split('\n');
  const results = [];
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].toLowerCase().includes(query.toLowerCase())) {
      // Include context (2 lines before and after)
      const start = Math.max(0, i - 2);
      const end = Math.min(lines.length, i + 3);
      results.push({
        line: i + 1,
        content: lines.slice(start, end).join('\n'),
      });
    }
  }
  
  return {
    success: true,
    data: {
      query,
      results: results.length,
      matches: results,
    },
  };
}

/**
 * Clear all learnings
 * 
 * @returns {Promise<Object>} Result
 */
async function clearLearnings() {
  saveLearnings('# A2A Learnings\n\nNo learnings recorded yet.\n');
  
  return {
    success: true,
    data: {
      message: 'All learnings cleared',
    },
  };
}

module.exports = {
  name: 'a2a-learnings',
  version: '0.1.0',
  description: 'Record and retrieve lessons learned during development',
  functions: {
    addLearning,
    getLearnings,
    searchLearnings,
    clearLearnings,
  },
};
