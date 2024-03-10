const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

async function readAndAssignUUID(filePath) {
  try {
    const json = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(json);

    // Assuming the JSON file contains an array
    if (Array.isArray(data)) {
      const updatedData = data.map((element) => ({
        ...element,
        uuid: element.uuid ?? uuidv4(), // Generate a new UUID for each element
      }));

      // Write the updated data back to the file
      await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2));
      console.log('UUIDs assigned successfully!');
    } else {
      console.error('The JSON file does not contain an array.');
    }
  } catch (error) {
    console.error('Error reading or writing the JSON file:', error.message);
  }
}

// Usage: Provide the path to your JSON file
const filePath = './words.json';
readAndAssignUUID(filePath);