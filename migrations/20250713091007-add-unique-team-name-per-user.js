'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add unique composite index on name and userId in Teams table
    await queryInterface.addConstraint('Teams', {
      fields: ['name', 'userId'],
      type: 'unique',
      name: 'unique_team_name_per_user'
    });

    // Add explicit foreign key for userId in Teams table
    await queryInterface.addConstraint('Teams', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_teams_userId',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Add explicit foreign key for teamId in TeamPlayers table
    await queryInterface.addConstraint('TeamPlayers', {
      fields: ['teamId'],
      type: 'foreign key',
      name: 'fk_teamplayers_teamId',
      references: {
        table: 'Teams',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Add explicit foreign key for playerId in TeamPlayers table
    await queryInterface.addConstraint('TeamPlayers', {
      fields: ['playerId'],
      type: 'foreign key',
      name: 'fk_teamplayers_playerId',
      references: {
        table: 'Players',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Add index on player role for faster lookups
    await queryInterface.addIndex('Players', ['role'], {
      name: 'idx_players_role'
    });

    // Add index on player name for faster lookups
    await queryInterface.addIndex('Players', ['name'], {
      name: 'idx_players_name'
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove indexes in reverse order
    await queryInterface.removeIndex('Players', 'idx_players_name');
    await queryInterface.removeIndex('Players', 'idx_players_role');
    // Remove constraints in reverse order
    await queryInterface.removeConstraint('TeamPlayers', 'fk_teamplayers_playerId');
    await queryInterface.removeConstraint('TeamPlayers', 'fk_teamplayers_teamId');
    await queryInterface.removeConstraint('Teams', 'fk_teams_userId');
    await queryInterface.removeConstraint('Teams', 'unique_team_name_per_user');
  }
};
