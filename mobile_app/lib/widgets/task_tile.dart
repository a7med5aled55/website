import 'package:flutter/material.dart';
import '../models/task.dart';
import '../utils/constants.dart';
import '../providers/task_provider.dart';
import '../widgets/add_task_sheet.dart';

class TaskTile extends StatelessWidget {
  final Task task;
  final TaskProvider provider;

  const TaskTile({super.key, required this.task, required this.provider});

  @override
  Widget build(BuildContext context) {
    final overdue = isOverdue(task);

    return Dismissible(
      key: Key(task.id),
      direction: DismissDirection.endToStart,
      background: Container(
        alignment: Alignment.centerRight,
        padding: const EdgeInsets.only(right: 20),
        decoration: BoxDecoration(
          color: AppColors.danger.withOpacity(0.15),
          borderRadius: BorderRadius.circular(16),
        ),
        child: const Icon(Icons.delete_rounded, color: AppColors.danger),
      ),
      onDismissed: (_) => provider.deleteTask(task.id),
      child: GestureDetector(
        onTap: () => showModalBottomSheet(
          context: context,
          isScrollControlled: true,
          backgroundColor: Colors.transparent,
          builder: (_) =>
              AddTaskSheet(provider: provider, existingTask: task),
        ),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 300),
          margin: const EdgeInsets.only(bottom: 10),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: task.isCompleted
                ? AppColors.surface.withOpacity(0.5)
                : AppColors.surface,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: overdue
                  ? AppColors.danger.withOpacity(0.4)
                  : AppColors.border,
              width: 1,
            ),
          ),
          child: Row(
            children: [
              // Checkbox
              GestureDetector(
                onTap: () => provider.toggleTask(task.id),
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 250),
                  width: 24,
                  height: 24,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: task.isCompleted
                        ? AppColors.primary
                        : Colors.transparent,
                    border: Border.all(
                      color: task.isCompleted
                          ? AppColors.primary
                          : AppColors.textSecondary,
                      width: 2,
                    ),
                  ),
                  child: task.isCompleted
                      ? const Icon(Icons.check_rounded,
                          size: 14, color: Colors.white)
                      : null,
                ),
              ),
              const SizedBox(width: 14),

              // Content
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      task.title,
                      style: TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.w600,
                        color: task.isCompleted
                            ? AppColors.textSecondary
                            : AppColors.textPrimary,
                        decoration: task.isCompleted
                            ? TextDecoration.lineThrough
                            : null,
                        decorationColor: AppColors.textSecondary,
                      ),
                    ),
                    if (task.description.isNotEmpty) ...[
                      const SizedBox(height: 3),
                      Text(
                        task.description,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          fontSize: 12,
                          color: AppColors.textSecondary,
                        ),
                      ),
                    ],
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        // Category chip
                        _chip(
                          icon: categoryIcon(task.category),
                          label: categoryLabel(task.category),
                          color: categoryColor(task.category),
                        ),
                        const SizedBox(width: 6),
                        // Priority dot
                        Container(
                          width: 6,
                          height: 6,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: priorityColor(task.priority),
                          ),
                        ),
                        const SizedBox(width: 4),
                        Text(
                          priorityLabel(task.priority),
                          style: TextStyle(
                            fontSize: 11,
                            color: priorityColor(task.priority),
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        if (task.dueDate != null) ...[
                          const SizedBox(width: 8),
                          Icon(
                            Icons.schedule_rounded,
                            size: 11,
                            color: overdue
                                ? AppColors.danger
                                : AppColors.textSecondary,
                          ),
                          const SizedBox(width: 3),
                          Text(
                            formatDueDate(task.dueDate),
                            style: TextStyle(
                              fontSize: 11,
                              color: overdue
                                  ? AppColors.danger
                                  : AppColors.textSecondary,
                              fontWeight: overdue
                                  ? FontWeight.w700
                                  : FontWeight.normal,
                            ),
                          ),
                        ],
                      ],
                    ),
                  ],
                ),
              ),

              // Priority bar
              Container(
                width: 3,
                height: 40,
                decoration: BoxDecoration(
                  color: task.isCompleted
                      ? AppColors.border
                      : priorityColor(task.priority),
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _chip({
    required IconData icon,
    required String label,
    required Color color,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: color.withOpacity(0.12),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 10, color: color),
          const SizedBox(width: 4),
          Text(
            label,
            style: TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.w600,
              color: color,
            ),
          ),
        ],
      ),
    );
  }
}
