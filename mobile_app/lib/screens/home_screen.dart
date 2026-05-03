import 'package:flutter/material.dart';
import '../models/task.dart';
import '../providers/task_provider.dart';
import '../utils/constants.dart';
import '../widgets/task_tile.dart';
import '../widgets/add_task_sheet.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen>
    with SingleTickerProviderStateMixin {
  final TaskProvider _provider = TaskProvider();
  late TabController _tabController;
  int _selectedNav = 0;

  final List<String> _tabs = ['All', 'Today', 'Pending', 'Done'];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: _tabs.length, vsync: this);
    _tabController.addListener(() => setState(() {}));
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  List<Task> _getTabTasks() {
    switch (_tabController.index) {
      case 0:
        return _provider.allTasks;
      case 1:
        return _provider.todayTasks;
      case 2:
        return _provider.pendingTasks;
      case 3:
        return _provider.completedTasks;
      default:
        return _provider.allTasks;
    }
  }

  void _openAddTask() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => AddTaskSheet(provider: _provider),
    ).then((_) => setState(() {}));
  }

  @override
  Widget build(BuildContext context) {
    final tasks = _getTabTasks();
    final now = DateTime.now();
    final greeting = now.hour < 12
        ? 'Good Morning'
        : now.hour < 17
            ? 'Good Afternoon'
            : 'Good Evening';

    return ListenableBuilder(
      listenable: _provider,
      builder: (context, _) {
        return Scaffold(
          backgroundColor: AppColors.background,
          body: SafeArea(
            child: CustomScrollView(
              slivers: [
                // Header
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(24, 20, 24, 0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  greeting + ' 👋',
                                  style: const TextStyle(
                                    fontSize: 13,
                                    color: AppColors.textSecondary,
                                    fontWeight: FontWeight.w500,
                                  ),
                                ),
                                const SizedBox(height: 2),
                                const Text(
                                  'TaskFlow',
                                  style: TextStyle(
                                    fontSize: 28,
                                    fontWeight: FontWeight.w800,
                                    color: AppColors.textPrimary,
                                    letterSpacing: -0.5,
                                  ),
                                ),
                              ],
                            ),
                            CircleAvatar(
                              radius: 22,
                              backgroundColor: AppColors.primary.withOpacity(0.2),
                              child: const Text(
                                'A',
                                style: TextStyle(
                                  color: AppColors.primary,
                                  fontWeight: FontWeight.w700,
                                  fontSize: 16,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 20),

                        // Progress Card
                        _buildProgressCard(),
                        const SizedBox(height: 24),

                        // Category quick stats
                        _buildCategoryRow(),
                        const SizedBox(height: 24),

                        // Tab bar
                        Container(
                          height: 40,
                          decoration: BoxDecoration(
                            color: AppColors.surface,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: TabBar(
                            controller: _tabController,
                            onTap: (_) => setState(() {}),
                            labelColor: AppColors.textPrimary,
                            unselectedLabelColor: AppColors.textSecondary,
                            indicator: BoxDecoration(
                              color: AppColors.primary,
                              borderRadius: BorderRadius.circular(10),
                            ),
                            indicatorSize: TabBarIndicatorSize.tab,
                            dividerColor: Colors.transparent,
                            labelStyle: const TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w700,
                            ),
                            unselectedLabelStyle: const TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w500,
                            ),
                            tabs: _tabs
                                .map((t) => Tab(text: t, height: 36))
                                .toList(),
                          ),
                        ),
                        const SizedBox(height: 16),
                      ],
                    ),
                  ),
                ),

                // Task list
                tasks.isEmpty
                    ? SliverToBoxAdapter(child: _emptyState())
                    : SliverPadding(
                        padding: const EdgeInsets.fromLTRB(24, 0, 24, 100),
                        sliver: SliverList(
                          delegate: SliverChildBuilderDelegate(
                            (context, i) => TaskTile(
                              task: tasks[i],
                              provider: _provider,
                            ),
                            childCount: tasks.length,
                          ),
                        ),
                      ),
              ],
            ),
          ),

          // FAB
          floatingActionButton: FloatingActionButton.extended(
            onPressed: _openAddTask,
            backgroundColor: AppColors.primary,
            foregroundColor: Colors.white,
            elevation: 4,
            icon: const Icon(Icons.add_rounded),
            label: const Text(
              'New Task',
              style: TextStyle(fontWeight: FontWeight.w700),
            ),
          ),

          // Bottom nav
          bottomNavigationBar: _buildBottomNav(),
        );
      },
    );
  }

  Widget _buildProgressCard() {
    final done = _provider.completedCount;
    final total = _provider.totalCount;
    final rate = _provider.completionRate;

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF6C63FF), Color(0xFF9C8FFF)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: AppColors.primary.withOpacity(0.3),
            blurRadius: 20,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Today\'s Progress',
                  style: TextStyle(
                    color: Colors.white70,
                    fontSize: 13,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  '$done / $total tasks done',
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 20,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const SizedBox(height: 12),
                ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: LinearProgressIndicator(
                    value: rate,
                    backgroundColor: Colors.white24,
                    valueColor:
                        const AlwaysStoppedAnimation<Color>(Colors.white),
                    minHeight: 6,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  '${(rate * 100).toInt()}% completed',
                  style: const TextStyle(
                    color: Colors.white70,
                    fontSize: 12,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 16),
          SizedBox(
            width: 70,
            height: 70,
            child: Stack(
              alignment: Alignment.center,
              children: [
                CircularProgressIndicator(
                  value: rate,
                  backgroundColor: Colors.white24,
                  valueColor:
                      const AlwaysStoppedAnimation<Color>(Colors.white),
                  strokeWidth: 6,
                ),
                Text(
                  '${(rate * 100).toInt()}%',
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 14,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryRow() {
    final categories = [
      TaskCategory.work,
      TaskCategory.personal,
      TaskCategory.health,
      TaskCategory.learning,
    ];

    return SizedBox(
      height: 76,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        itemCount: categories.length,
        separatorBuilder: (_, __) => const SizedBox(width: 10),
        itemBuilder: (context, i) {
          final cat = categories[i];
          final count = _provider.getByCategory(cat).length;
          final color = categoryColor(cat);
          return Container(
            width: 90,
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: color.withOpacity(0.1),
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: color.withOpacity(0.2)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Icon(categoryIcon(cat), size: 18, color: color),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      categoryLabel(cat),
                      style: TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.w600,
                        color: color,
                      ),
                    ),
                    Text(
                      '$count',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w800,
                        color: color,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _emptyState() {
    return Padding(
      padding: const EdgeInsets.all(60),
      child: Column(
        children: [
          const Icon(
            Icons.check_circle_outline_rounded,
            size: 64,
            color: AppColors.border,
          ),
          const SizedBox(height: 16),
          const Text(
            'No tasks here',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w700,
              color: AppColors.textSecondary,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            _tabController.index == 3
                ? 'Complete some tasks to see them here'
                : 'Tap the button below to add a task',
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 13,
              color: AppColors.textSecondary,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBottomNav() {
    final items = [
      {'icon': Icons.home_rounded, 'label': 'Home'},
      {'icon': Icons.bar_chart_rounded, 'label': 'Stats'},
      {'icon': Icons.calendar_month_rounded, 'label': 'Calendar'},
      {'icon': Icons.settings_rounded, 'label': 'Settings'},
    ];

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: AppColors.surface,
        border: const Border(top: BorderSide(color: AppColors.border)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.3),
            blurRadius: 20,
            offset: const Offset(0, -5),
          ),
        ],
      ),
      child: SafeArea(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: List.generate(items.length, (i) {
            final selected = _selectedNav == i;
            final item = items[i];
            return GestureDetector(
              onTap: () => setState(() => _selectedNav = i),
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                padding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                decoration: BoxDecoration(
                  color: selected
                      ? AppColors.primary.withOpacity(0.15)
                      : Colors.transparent,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(
                      item['icon'] as IconData,
                      color: selected
                          ? AppColors.primary
                          : AppColors.textSecondary,
                      size: 22,
                    ),
                    const SizedBox(height: 3),
                    Text(
                      item['label'] as String,
                      style: TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.w600,
                        color: selected
                            ? AppColors.primary
                            : AppColors.textSecondary,
                      ),
                    ),
                  ],
                ),
              ),
            );
          }),
        ),
      ),
    );
  }
}
