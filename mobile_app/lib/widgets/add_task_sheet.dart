import 'package:flutter/material.dart';
import '../utils/constants.dart';
import '../models/task.dart';
import '../providers/task_provider.dart';

class AddTaskSheet extends StatefulWidget {
  final TaskProvider provider;
  final Task? existingTask;

  const AddTaskSheet({super.key, required this.provider, this.existingTask});

  @override
  State<AddTaskSheet> createState() => _AddTaskSheetState();
}

class _AddTaskSheetState extends State<AddTaskSheet> {
  late TextEditingController _titleCtrl;
  late TextEditingController _descCtrl;
  Priority _priority = Priority.medium;
  TaskCategory _category = TaskCategory.personal;
  DateTime? _dueDate;

  @override
  void initState() {
    super.initState();
    final t = widget.existingTask;
    _titleCtrl = TextEditingController(text: t?.title ?? '');
    _descCtrl = TextEditingController(text: t?.description ?? '');
    if (t != null) {
      _priority = t.priority;
      _category = t.category;
      _dueDate = t.dueDate;
    }
  }

  @override
  void dispose() {
    _titleCtrl.dispose();
    _descCtrl.dispose();
    super.dispose();
  }

  void _save() {
    if (_titleCtrl.text.trim().isEmpty) return;
    final isEdit = widget.existingTask != null;

    final task = Task(
      id: isEdit
          ? widget.existingTask!.id
          : DateTime.now().millisecondsSinceEpoch.toString(),
      title: _titleCtrl.text.trim(),
      description: _descCtrl.text.trim(),
      priority: _priority,
      category: _category,
      dueDate: _dueDate,
      createdAt: isEdit ? widget.existingTask!.createdAt : DateTime.now(),
    );

    if (isEdit) {
      widget.provider.updateTask(task);
    } else {
      widget.provider.addTask(task);
    }
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      padding: EdgeInsets.fromLTRB(
          24, 16, 24, MediaQuery.of(context).viewInsets.bottom + 24),
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            // Handle
            Center(
              child: Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: AppColors.border,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            const SizedBox(height: 20),

            // Title
            Text(
              widget.existingTask != null ? 'Edit Task' : 'New Task',
              style: const TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.w700,
                color: AppColors.textPrimary,
              ),
            ),
            const SizedBox(height: 20),

            // Task title field
            _buildTextField(
              controller: _titleCtrl,
              hint: 'Task title',
              icon: Icons.title_rounded,
            ),
            const SizedBox(height: 12),

            // Description field
            _buildTextField(
              controller: _descCtrl,
              hint: 'Description (optional)',
              icon: Icons.notes_rounded,
              maxLines: 3,
            ),
            const SizedBox(height: 20),

            // Priority
            _sectionLabel('Priority'),
            const SizedBox(height: 10),
            Row(
              children: Priority.values.map((p) {
                final selected = _priority == p;
                return Expanded(
                  child: GestureDetector(
                    onTap: () => setState(() => _priority = p),
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      margin: const EdgeInsets.only(right: 8),
                      padding: const EdgeInsets.symmetric(vertical: 10),
                      decoration: BoxDecoration(
                        color: selected
                            ? priorityColor(p).withOpacity(0.2)
                            : AppColors.surfaceElevated,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: selected
                              ? priorityColor(p)
                              : Colors.transparent,
                          width: 1.5,
                        ),
                      ),
                      child: Column(
                        children: [
                          Icon(
                            p == Priority.high
                                ? Icons.keyboard_double_arrow_up_rounded
                                : p == Priority.medium
                                    ? Icons.remove_rounded
                                    : Icons.keyboard_double_arrow_down_rounded,
                            color: priorityColor(p),
                            size: 18,
                          ),
                          const SizedBox(height: 4),
                          Text(
                            priorityLabel(p),
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w600,
                              color: selected
                                  ? priorityColor(p)
                                  : AppColors.textSecondary,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              }).toList(),
            ),
            const SizedBox(height: 20),

            // Category
            _sectionLabel('Category'),
            const SizedBox(height: 10),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: TaskCategory.values.map((c) {
                final selected = _category == c;
                return GestureDetector(
                  onTap: () => setState(() => _category = c),
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 200),
                    padding: const EdgeInsets.symmetric(
                        horizontal: 14, vertical: 8),
                    decoration: BoxDecoration(
                      color: selected
                          ? categoryColor(c).withOpacity(0.2)
                          : AppColors.surfaceElevated,
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(
                        color: selected
                            ? categoryColor(c)
                            : Colors.transparent,
                      ),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(categoryIcon(c),
                            size: 14,
                            color: selected
                                ? categoryColor(c)
                                : AppColors.textSecondary),
                        const SizedBox(width: 6),
                        Text(
                          categoryLabel(c),
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                            color: selected
                                ? categoryColor(c)
                                : AppColors.textSecondary,
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              }).toList(),
            ),
            const SizedBox(height: 20),

            // Due Date
            _sectionLabel('Due Date'),
            const SizedBox(height: 10),
            GestureDetector(
              onTap: () async {
                final picked = await showDatePicker(
                  context: context,
                  initialDate: _dueDate ?? DateTime.now(),
                  firstDate: DateTime.now().subtract(const Duration(days: 365)),
                  lastDate: DateTime.now().add(const Duration(days: 365)),
                  builder: (context, child) => Theme(
                    data: Theme.of(context).copyWith(
                      colorScheme: const ColorScheme.dark(
                        primary: AppColors.primary,
                        surface: AppColors.surface,
                      ),
                    ),
                    child: child!,
                  ),
                );
                if (picked != null) setState(() => _dueDate = picked);
              },
              child: Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                decoration: BoxDecoration(
                  color: AppColors.surfaceElevated,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(
                    color: _dueDate != null
                        ? AppColors.primary
                        : Colors.transparent,
                  ),
                ),
                child: Row(
                  children: [
                    Icon(Icons.calendar_month_rounded,
                        color: _dueDate != null
                            ? AppColors.primary
                            : AppColors.textSecondary,
                        size: 18),
                    const SizedBox(width: 12),
                    Text(
                      _dueDate != null
                          ? '${_dueDate!.day}/${_dueDate!.month}/${_dueDate!.year}'
                          : 'Pick a due date',
                      style: TextStyle(
                        color: _dueDate != null
                            ? AppColors.textPrimary
                            : AppColors.textSecondary,
                        fontSize: 14,
                      ),
                    ),
                    const Spacer(),
                    if (_dueDate != null)
                      GestureDetector(
                        onTap: () => setState(() => _dueDate = null),
                        child: const Icon(Icons.close_rounded,
                            size: 16, color: AppColors.textSecondary),
                      ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 28),

            // Save button
            SizedBox(
              width: double.infinity,
              height: 54,
              child: ElevatedButton(
                onPressed: _save,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                  elevation: 0,
                ),
                child: Text(
                  widget.existingTask != null ? 'Save Changes' : 'Create Task',
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String hint,
    required IconData icon,
    int maxLines = 1,
  }) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.surfaceElevated,
        borderRadius: BorderRadius.circular(14),
      ),
      child: TextField(
        controller: controller,
        maxLines: maxLines,
        style: const TextStyle(color: AppColors.textPrimary, fontSize: 15),
        decoration: InputDecoration(
          hintText: hint,
          hintStyle:
              const TextStyle(color: AppColors.textSecondary, fontSize: 15),
          prefixIcon: Icon(icon, color: AppColors.textSecondary, size: 20),
          border: InputBorder.none,
          contentPadding:
              const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        ),
      ),
    );
  }

  Widget _sectionLabel(String text) {
    return Text(
      text,
      style: const TextStyle(
        fontSize: 13,
        fontWeight: FontWeight.w600,
        color: AppColors.textSecondary,
        letterSpacing: 0.5,
      ),
    );
  }
}
