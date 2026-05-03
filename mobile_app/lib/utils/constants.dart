import 'package:flutter/material.dart';
import '../models/task.dart';

class AppColors {
  static const background = Color(0xFF12121F);
  static const surface = Color(0xFF1E1E2E);
  static const surfaceElevated = Color(0xFF252538);
  static const primary = Color(0xFF6C63FF);
  static const accent = Color(0xFF03DAC6);
  static const danger = Color(0xFFFF6584);
  static const warning = Color(0xFFFFB347);
  static const success = Color(0xFF4CAF50);
  static const textPrimary = Color(0xFFFFFFFF);
  static const textSecondary = Color(0xFF9E9EB8);
  static const border = Color(0xFF2A2A3F);
}

Color priorityColor(Priority p) {
  switch (p) {
    case Priority.high:
      return AppColors.danger;
    case Priority.medium:
      return AppColors.warning;
    case Priority.low:
      return AppColors.success;
  }
}

String priorityLabel(Priority p) {
  switch (p) {
    case Priority.high:
      return 'High';
    case Priority.medium:
      return 'Medium';
    case Priority.low:
      return 'Low';
  }
}

IconData categoryIcon(TaskCategory c) {
  switch (c) {
    case TaskCategory.work:
      return Icons.work_rounded;
    case TaskCategory.personal:
      return Icons.person_rounded;
    case TaskCategory.health:
      return Icons.favorite_rounded;
    case TaskCategory.learning:
      return Icons.school_rounded;
    case TaskCategory.finance:
      return Icons.account_balance_wallet_rounded;
    case TaskCategory.other:
      return Icons.category_rounded;
  }
}

Color categoryColor(TaskCategory c) {
  switch (c) {
    case TaskCategory.work:
      return AppColors.primary;
    case TaskCategory.personal:
      return AppColors.accent;
    case TaskCategory.health:
      return AppColors.danger;
    case TaskCategory.learning:
      return AppColors.warning;
    case TaskCategory.finance:
      return const Color(0xFF4CAF50);
    case TaskCategory.other:
      return AppColors.textSecondary;
  }
}

String categoryLabel(TaskCategory c) {
  switch (c) {
    case TaskCategory.work:
      return 'Work';
    case TaskCategory.personal:
      return 'Personal';
    case TaskCategory.health:
      return 'Health';
    case TaskCategory.learning:
      return 'Learning';
    case TaskCategory.finance:
      return 'Finance';
    case TaskCategory.other:
      return 'Other';
  }
}

bool isOverdue(Task t) {
  if (t.dueDate == null || t.isCompleted) return false;
  return t.dueDate!.isBefore(DateTime.now());
}

String formatDueDate(DateTime? date) {
  if (date == null) return 'No due date';
  final now = DateTime.now();
  final today = DateTime(now.year, now.month, now.day);
  final taskDay = DateTime(date.year, date.month, date.day);
  final diff = taskDay.difference(today).inDays;

  if (diff == 0) return 'Today';
  if (diff == 1) return 'Tomorrow';
  if (diff == -1) return 'Yesterday';
  if (diff < 0) return '${-diff} days ago';
  return 'In $diff days';
}
