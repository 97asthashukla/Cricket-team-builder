'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Players', [
      { name: 'MS Dhoni', role: 'Wicket-Keeper', cost: 10, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Virat Kohli', role: 'Batsman', cost: 10, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Rohit Sharma', role: 'Batsman', cost: 5, createdAt: new Date(), updatedAt: new Date() },
      { name: 'KL Rahul', role: 'Batsman', cost: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Hardik Pandya', role: 'All-Rounder', cost: 10, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Ravindra Jadeja', role: 'All-Rounder', cost: 7, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Jasprit Bumrah', role: 'Bowler', cost: 13, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mohammed Shami', role: 'Bowler', cost: 10, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Yuzvendra Chahal', role: 'Bowler', cost: 9, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Bhuvneshwar Kumar', role: 'Bowler', cost: 8, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Rishabh Pant', role: 'Wicket-Keeper', cost: 13, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Kuldeep Yadav', role: 'Bowler', cost: 7, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Washington Sundar', role: 'All-Rounder', cost: 9, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Shreyas Iyer', role: 'Batsman', cost: 10, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Players', null, {});
  }
};
