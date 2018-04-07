import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      { id: 1, name: 'Sleep' },
      { id: 2, name: 'Run' },
      { id: 3, name: 'Store' },
      { id: 4, name: 'Call Mom' },
      { id: 5, name: 'Clean' },
      { id: 6, name: 'Get Gas' },
      { id: 7, name: 'Iron' },
      { id: 8, name: 'Eat' },
      { id: 9, name: 'Interview' }
    ];
    return {tasks};
  }
}