import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      { id: 1, priority: 1, name: 'Sleep' },
      { id: 2, priority: 2, name: 'Run' },
      { id: 3, priority: 3, name: 'Store' },
      { id: 4, priority: 4, name: 'Call Mom' },
      { id: 5, priority: 5, name: 'Clean' },
      { id: 6, priority: 6, name: 'Get Gas' },
      { id: 7, priority: 7, name: 'Iron' },
      { id: 8, priority: 8, name: 'Eat' },
      { id: 9, priority: 9, name: 'Interview' }
    ];
    return {tasks};
  }
}
