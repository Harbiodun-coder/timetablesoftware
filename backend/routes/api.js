const express = require('express');
const Course = require('../models/Course');
const Lecturer = require('../models/Lecturer');
const Hall = require('../models/Hall');
const Timetable = require('../models/Timetable');

const router = express.Router();

// Utility function to shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Generate initial population
function generateInitialPopulation(courses, lecturers, halls, populationSize) {
  const population = [];

  for (let i = 0; i < populationSize; i++) {
    const schedule = [];

    courses.forEach(course => {
      const lecturer = lecturers[Math.floor(Math.random() * lecturers.length)];
      const hall = halls[Math.floor(Math.random() * halls.length)];
      const time = `Week ${Math.floor(Math.random() * 12) + 1}, Day ${Math.floor(Math.random() * 5) + 1}, Hour ${Math.floor(Math.random() * 8) + 8}:00`;
      
      schedule.push({ course, lecturer, hall, time });
    });

    population.push(schedule);
  }

  return population;
}

// Fitness function to evaluate a schedule
function evaluateFitness(schedule) {
  let fitness = 0;
  
  // Example fitness evaluation: no overlapping classes for lecturers or halls
  const lecturerSchedule = {};
  const hallSchedule = {};

  schedule.forEach(({ course, lecturer, hall, time }) => {
    if (!lecturerSchedule[lecturer._id]) {
      lecturerSchedule[lecturer._id] = [];
    }
    if (!hallSchedule[hall._id]) {
      hallSchedule[hall._id] = [];
    }

    if (lecturerSchedule[lecturer._id].includes(time) || hallSchedule[hall._id].includes(time)) {
      fitness -= 1; // Penalize for conflicts
    } else {
      lecturerSchedule[lecturer._id].push(time);
      hallSchedule[hall._id].push(time);
      fitness += 1; // Reward for no conflicts
    }
  });

  return fitness;
}

// Selection function to select parents
function selectParents(population) {
  return shuffle(population).slice(0, population.length / 2);
}

// Crossover function to create offspring
function crossover(parent1, parent2) {
  const crossoverPoint = Math.floor(Math.random() * parent1.length);
  const child1 = [...parent1.slice(0, crossoverPoint), ...parent2.slice(crossoverPoint)];
  const child2 = [...parent2.slice(0, crossoverPoint), ...parent1.slice(crossoverPoint)];

  return [child1, child2];
}

// Mutation function to introduce variability
function mutate(schedule) {
  const mutationPoint = Math.floor(Math.random() * schedule.length);
  const course = schedule[mutationPoint].course;
  const lecturer = schedule[mutationPoint].lecturer;
  const hall = schedule[mutationPoint].hall;
  const time = `Week ${Math.floor(Math.random() * 12) + 1}, Day ${Math.floor(Math.random() * 5) + 1}, Hour ${Math.floor(Math.random() * 8) + 8}:00`;

  schedule[mutationPoint] = { course, lecturer, hall, time };

  return schedule;
}

// Genetic algorithm to generate timetable
function geneticAlgorithm(courses, lecturers, halls, populationSize, generations) {
  let population = generateInitialPopulation(courses, lecturers, halls, populationSize);

  for (let i = 0; i < generations; i++) {
    const evaluatedPopulation = population.map(schedule => ({
      schedule,
      fitness: evaluateFitness(schedule),
    }));

    evaluatedPopulation.sort((a, b) => b.fitness - a.fitness);
    population = evaluatedPopulation.map(individual => individual.schedule);

    const parents = selectParents(population);

    const offspring = [];
    for (let j = 0; j < parents.length; j += 2) {
      const [child1, child2] = crossover(parents[j], parents[j + 1]);
      offspring.push(mutate(child1));
      offspring.push(mutate(child2));
    }

    population = [...parents, ...offspring];
  }

  const bestSchedule = population[0];
  return bestSchedule;
}

// Route to generate timetable
router.post('/generate-timetable', async (req, res) => {
  try {
    const courses = await Course.find();
    const lecturers = await Lecturer.find();
    const halls = await Hall.find();

    const populationSize = 50;
    const generations = 100;

    const generatedTimetable = geneticAlgorithm(courses, lecturers, halls, populationSize, generations);

    const timetable = new Timetable({ schedule: generatedTimetable });
    await timetable.save();

    res.status(200).send(timetable);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating timetable');
  }
});

module.exports = router;
