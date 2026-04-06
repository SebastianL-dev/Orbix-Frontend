const translations: Record<string, Record<string, string>> = {
  en: {
    // Home
    "home.title": "Orbix Space Missions",
    "home.description":
      "Check all space missions in Orbix, create and update missions.",

    // Sidebar
    "sidebar.missions": "MISSIONS",
    "sidebar.collapse": "Collapse",

    // Navigation
    "nav.hierarchy": "Hierarchy",
    "nav.tree": "Tree",

    // Mission modal
    "mission.new": "New Mission",
    "mission.edit": "Edit Mission",
    "mission.new.description": "Create a new mission in Orbix space app.",
    "mission.edit.description": "Update your mission details.",
    "mission.name": "MISSION NAME",
    "mission.name.placeholder": "Artemis III...",
    "mission.description": "DESCRIPTION",
    "mission.description.placeholder": "Describe your mission...",

    // Task modal
    "task.new": "New Task",
    "task.edit": "Edit Task",
    "task.new.description": "Add a new task to the mission.",
    "task.edit.description": "Update this task's details.",
    "task.name": "NAME",
    "task.name.placeholder": "Pre-flight review...",
    "task.duration": "DURATION (hours)",
    "task.cost": "COST",
    "task.status": "STATUS",

    // Status
    "status.pending": "Pending",
    "status.in_progress": "In Progress",
    "status.completed": "Completed",

    // Tree
    "tree.title": "Task Tree",
    "tree.empty": "No tasks yet",
    "tree.addRoot": "Add root task",
    "tree.addSubtask": "Add subtask",
    "tree.editTask": "Edit task",
    "tree.deleteTask": "Delete task",

    // Mission link
    "mission.phases": "phases",

    // Tree node
    "tree.subphase": "subphase",
    "tree.subphases": "subphases",
    "tree.task": "task",
    "tree.tasks": "tasks",

    // Badges
    "badge.mostExpensive": "Most Expensive",

    // Buttons
    "btn.cancel": "Cancel",
    "btn.close": "Close",
    "btn.create.mission": "Create Mission",
    "btn.save": "Save Changes",
    "btn.create.task": "Create Task",

    // Error
    "error.title": "Error",
    "error.status": "Status",

    // Toasts
    "toast.mission.created": "Mission created",
    "toast.mission.updated": "Mission updated",
    "toast.mission.deleted": "Mission deleted",
    "toast.task.created": "Task created",
    "toast.task.updated": "Task updated",
    "toast.task.deleted": "Task deleted",
    "toast.error.missions": "Failed to load missions",
    "toast.error.mission.save": "Failed to save mission",
    "toast.error.mission.delete": "Failed to delete mission",
    "toast.error.tree": "Failed to load tree",
    "toast.error.task.save": "Failed to save task",
    "toast.error.task.delete": "Failed to delete task",
  },
  es: {
    // Home
    "home.title": "Orbix Misiones Espaciales",
    "home.description":
      "Revisa todas las misiones espaciales en Orbix, crea y actualiza misiones.",

    // Sidebar
    "sidebar.missions": "MISIONES",
    "sidebar.collapse": "Colapsar",

    // Navigation
    "nav.hierarchy": "Jerarquia",
    "nav.tree": "Árbol",

    // Mission modal
    "mission.new": "Nueva Mision",
    "mission.edit": "Editar Mision",
    "mission.new.description": "Crea una nueva mision en Orbix.",
    "mission.edit.description": "Actualiza los detalles de tu mision.",
    "mission.name": "NOMBRE DE LA MISION",
    "mission.name.placeholder": "Artemis III...",
    "mission.description": "DESCRIPCION",
    "mission.description.placeholder": "Describe tu mision...",

    // Task modal
    "task.new": "Nueva Tarea",
    "task.edit": "Editar Tarea",
    "task.new.description": "Agrega una nueva tarea a la mision.",
    "task.edit.description": "Actualiza los detalles de esta tarea.",
    "task.name": "NOMBRE",
    "task.name.placeholder": "Revision pre-vuelo...",
    "task.duration": "DURACION (horas)",
    "task.cost": "COSTO",
    "task.status": "ESTADO",

    // Status
    "status.pending": "Pendiente",
    "status.in_progress": "En Progreso",
    "status.completed": "Completado",

    // Tree
    "tree.title": "Árbol de Tareas",
    "tree.empty": "Sin tareas aun",
    "tree.addRoot": "Agregar tarea raiz",
    "tree.addSubtask": "Agregar subtarea",
    "tree.editTask": "Editar tarea",
    "tree.deleteTask": "Eliminar tarea",

    // Mission link
    "mission.phases": "fases",

    // Tree node
    "tree.subphase": "subfase",
    "tree.subphases": "subfases",
    "tree.task": "tarea",
    "tree.tasks": "tareas",

    // Badges
    "badge.mostExpensive": "Más Costoso",

    // Buttons
    "btn.cancel": "Cancelar",
    "btn.close": "Cerrar",
    "btn.create.mission": "Crear Mision",
    "btn.save": "Guardar Cambios",
    "btn.create.task": "Crear Tarea",

    // Error
    "error.title": "Error",
    "error.status": "Estado",

    // Toasts
    "toast.mission.created": "Mision creada",
    "toast.mission.updated": "Mision actualizada",
    "toast.mission.deleted": "Mision eliminada",
    "toast.task.created": "Tarea creada",
    "toast.task.updated": "Tarea actualizada",
    "toast.task.deleted": "Tarea eliminada",
    "toast.error.missions": "Error al cargar misiones",
    "toast.error.mission.save": "Error al guardar mision",
    "toast.error.mission.delete": "Error al eliminar mision",
    "toast.error.tree": "Error al cargar árbol",
    "toast.error.task.save": "Error al guardar tarea",
    "toast.error.task.delete": "Error al eliminar tarea",
  },
};

const locale = ref("en");

export function useI18n() {
  function t(key: string): string {
    return translations[locale.value]?.[key] ?? key;
  }

  function setLocale(lang: string) {
    locale.value = lang;
  }

  return { t, locale, setLocale };
}
