import 'package:flutter/material.dart';
import '../models/task.dart';

class TaskProvider extends ChangeNotifier {
  final List<Task> _tasks = [
    Task(
      id: '1',
      title: 'Design new app wireframes',
      description: 'Create high-fidelity mockups for the onboarding flow',
      priority: Priority.high,
      category: TaskCategory.work,
      dueDate: DateTime.now().add(const Duration(days: 2)),
    ),
    Task(
      id: '2',
      title: 'Morning workout',
      description: '30 min cardio + 20 min strength training',
      priority: Priority.medium,
      category: TaskCategory.health,
      dueDate: DateTime.now(),
    ),
    Task(
      id: '3',
      title: 'Read Flutter documentation',
      description: 'Study state management patterns',
      priority: Priority.low,
      category: TaskCategory.learning,
      isCompleted: true,
      dueDate: DateTime.now().subtract(const Duration(days: 1)),
    ),
    Task(
      id: '4',
      title: 'Pay electricity bill',
      description: 'Due by end of month',
      priority: Priority.high,
      category: TaskCategory.finance,
      dueDate: DateTime.now().add(const Duration(days: 5)),
    ),
    Task(
      id: '5',
      title: 'Call mom',
      description: 'Weekly catch-up call',
      priority: Priority.medium,
      category: TaskCategory.personal,
      isCompleted: true,
    ),
  ];

  List<Task> get allTasks => List.unmodifiable(_tasks);

  List<Task> get pendingTasks =>
      _tasks.where((t) => !t.isCompleted).toList();

  List<Task> get completedTasks =>
      _tasks.where((t) => t.isCompleted).toList();

  List<Task> get todayTasks {
    final now = DateTime.now();
    return _tasks.where((t) {
      if (t.dueDate == null) return false;
      return t.dueDate!.year == now.year &&
          t.dueDate!.month == now.month &&
          t.dueDate!.day == now.day;
    }).toList();
  }

  List<Task> getByCategory(TaskCategory category) =>
      _tasks.where((t) => t.category == category).toList();

  int get completedCount => completedTasks.length;
  int get totalCount => _tasks.length;

  double get completionRate =>
      totalCount == 0 ? 0 : completedCount / totalCount;

  void addTask(Task task) {
    _tasks.add(task);
    notifyListeners();
  }

  void toggleTask(String id) {
    final index = _tasks.indexWhere((t) => t.id == id);
    if (index != -1) {
      _tasks[index] = _tasks[index].copyWith(
        isCompleted: !_tasks[index].isCompleted,
      );
      notifyListeners();
    }
  }

  void deleteTask(String id) {
    _tasks.removeWhere((t) => t.id == id);
    notifyListeners();
  }

  void updateTask(Task updated) {
    final index = _tasks.indexWhere((t) => t.id == updated.id);
    if (index != -1) {
      _tasks[index] = updated;
      notifyListeners();
    }
  }
}
