import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
	const tasks = [
	  { priority: 10, name: 'ToDo List' },
	  { priority: 7, name: 'Sleep' },
	  { priority: 6, name: 'Eat' },
	  { priority: 8, name: 'Do that thingy' },
	  { priority: 3, name: 'YouTube' },
	  { priority: 6, name: 'Get gas' },
	  { priority: 9, name: 'hug mom' }
	];
	return {tasks};
  }
}