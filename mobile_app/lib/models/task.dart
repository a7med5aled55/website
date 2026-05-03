import 'package:flutter/material.dart';

enum Priority { low, medium, high }

enum TaskCategory { work, personal, health, learning, finance, other }

class Task {
  final String id;
  String title;
  String description;
  bool isCompleted;
  Priority priority;
  TaskCategory category;
  DateTime? dueDate;
  DateTime createdAt;

  Task({
    required this.id,
    required this.title,
    this.description = '',
    this.isCompleted = false,
    this.priority = Priority.medium,
    this.category = TaskCategory.personal,
    this.dueDate,
    DateTime? createdAt,
  }) : createdAt = createdAt ?? DateTime.now();

  Task copyWith({
    String? title,
    String? description,
    bool? isCompleted,
    Priority? priority,
    TaskCategory? category,
    DateTime? dueDate,
  }) {
    return Task(
      id: id,
      title: title ?? this.title,
      description: description ?? this.description,
      isCompleted: isCompleted ?? this.isCompleted,
      priority: priority ?? this.priority,
      category: category ?? this.category,
      dueDate: dueDate ?? this.dueDate,
      createdAt: createdAt,
    );
  }
}
