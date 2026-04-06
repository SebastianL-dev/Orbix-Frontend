interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

const toasts = ref<Toast[]>([]);
let nextId = 0;

export function useToast() {
  function show(message: string, type: "success" | "error" = "success") {
    const id = nextId++;
    toasts.value.push({ id, message, type });
    setTimeout(() => remove(id), 4000);
  }

  function remove(id: number) {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }

  function success(message: string) {
    show(message, "success");
  }

  function error(message: string) {
    show(message, "error");
  }

  return { toasts, success, error, remove };
}
