import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const coursesPath = join(rootDir, 'data', 'courses.json');
const pathsPath = join(rootDir, 'data', 'learning-paths.json');
const coursesPageDir = join(rootDir, 'pages', 'courses');

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

function fail(message) {
  console.error(`Validation failed: ${message}`);
  process.exit(1);
}

try {
  const coursesData = readJson(coursesPath);
  const pathsData = readJson(pathsPath);
  const courses = Array.isArray(coursesData.courses) ? coursesData.courses : [];
  const learningPaths = Array.isArray(pathsData) ? pathsData : [];

  if (!courses.length) {
    fail('No courses were found in data/courses.json');
  }

  const seenIds = new Set();
  const seenSlugs = new Set();

  for (const course of courses) {
    if (!course || typeof course !== 'object') {
      fail('A course entry is invalid.');
    }

    if (seenIds.has(course.id)) {
      fail(`Duplicate course id detected: ${course.id}`);
    }
    seenIds.add(course.id);

    if (!course.slug || typeof course.slug !== 'string') {
      fail(`Course with id ${course.id} is missing a valid slug.`);
    }

    if (seenSlugs.has(course.slug)) {
      fail(`Duplicate course slug detected: ${course.slug}`);
    }
    seenSlugs.add(course.slug);

    const detailPage = join(coursesPageDir, `${course.slug}.html`);
    if (!existsSync(detailPage)) {
      fail(`Course ${course.slug} does not have a matching detail page.`);
    }
  }

  const validCourseIds = new Set(courses.map(course => course.id));

  for (const [index, path] of learningPaths.entries()) {
    if (!Array.isArray(path.courses)) {
      fail(`Learning path at index ${index} does not define a valid courses array.`);
    }

    for (const courseId of path.courses) {
      if (!validCourseIds.has(courseId)) {
        fail(`Learning path at index ${index} references missing course id ${courseId}.`);
      }
    }
  }

  console.log(`Data validation passed for ${courses.length} courses and ${learningPaths.length} learning paths.`);
} catch (error) {
  fail(error instanceof Error ? error.message : 'Unknown validation error');
}
