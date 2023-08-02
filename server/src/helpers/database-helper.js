const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const mockDatabaseFilePath = path.join(__dirname, '../database/notes.database.json');

const mockDataDefault = [
  { id: uuidv4(), name: 'Shopping list', archived: false, created: Date.now(), category: 'Task', content: 'Tomatoes, bread' },
  { id: uuidv4(), name: 'New Feature', archived: false, created: Date.now(), category: 'Task', content: 'I’m gonna have a dentist appointment on the 03/07/2023, I moved it from 05/07/2023' },
  { id: uuidv4(), name: 'William Gaddis', archived: false, created: Date.now(), category: 'Quote', content: 'Power doesnt content' },
];

const populateDatabaseFile = async () => {
  try {
    await writeDatabaseFile(mockDataDefault);
  } catch (error) {
    console.log(error);
  }
};

const readDatabaseFile = async () => {
  const rawData = await fs.promises.readFile(mockDatabaseFilePath);
  return JSON.parse(rawData);
};

const writeDatabaseFile = async (data) => {
  await fs.promises.writeFile(mockDatabaseFilePath, JSON.stringify(data, null, 2));
};

module.exports = { populateDatabaseFile, readDatabaseFile, writeDatabaseFile };