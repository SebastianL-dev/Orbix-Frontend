<script setup lang="ts">
import { VueFlow, type Node, type Edge } from "@vue-flow/core";
import dagre from "dagre";
import type Task from "~/interfaces/task.interface";
import type Mission from "~/interfaces/mission.interface";

const props = defineProps<{
  mission: Mission;
  tasks: Task[];
}>();

const statusColor: Record<string, string> = {
  completed: "#16a34a",
  in_progress: "#fbbf24",
  pending: "#a1a1aa",
};

const statusBg: Record<string, string> = {
  completed: "rgba(22, 163, 74, 0.15)",
  in_progress: "rgba(251, 191, 36, 0.15)",
  pending: "rgba(161, 161, 170, 0.1)",
};

function flattenTasks(tasks: Task[], nodes: Node[], edges: Edge[]) {
  for (const task of tasks) {
    const status = task.status.toLowerCase();
    nodes.push({
      id: String(task.id),
      position: { x: 0, y: 0 },
      data: {
        label: task.name,
        status,
        duration: task.duration,
        cost: task.cost,
      },
      type: "custom",
    });

    if (task.parentId) {
      edges.push({
        id: `e${task.parentId}-${task.id}`,
        source: String(task.parentId),
        target: String(task.id),
        type: "smoothstep",
        animated: true,
      });
    }

    if (task.children.length > 0) {
      flattenTasks(task.children, nodes, edges);
    }
  }
}

function layoutGraph(nodes: Node[], edges: Edge[]) {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "TB", nodesep: 60, ranksep: 100 });

  for (const node of nodes) {
    const isMission = node.type === "mission";
    const labelLen = (node.data.label?.length ?? 10) * 8;
    const width = isMission ? Math.max(280, labelLen + 60) : Math.max(240, labelLen + 50);
    g.setNode(node.id, {
      width,
      height: isMission ? 80 : 70,
    });
  }
  for (const edge of edges) {
    g.setEdge(edge.source, edge.target);
  }

  dagre.layout(g);

  for (const node of nodes) {
    const dagNode = g.node(node.id);
    node.position = { x: dagNode.x - dagNode.width / 2, y: dagNode.y - dagNode.height / 2 };
  }
}

const rawNodes: Node[] = [
  {
    id: "mission",
    position: { x: 0, y: 0 },
    data: { label: props.mission.name, description: props.mission.description },
    type: "mission",
  },
];
const rawEdges: Edge[] = [];

const missionColor = "#8b5cf6";

for (const task of props.tasks) {
  rawEdges.push({
    id: `e-mission-${task.id}`,
    source: "mission",
    target: String(task.id),
    type: "smoothstep",
    animated: true,
    style: { stroke: missionColor },
  });
}

flattenTasks(props.tasks, rawNodes, rawEdges);
layoutGraph(rawNodes, rawEdges);

// Build a node status map to color edges by their source
const nodeStatusMap = new Map<string, string>();
for (const node of rawNodes) {
  if (node.data.status) {
    nodeStatusMap.set(node.id, node.data.status);
  }
}
for (const edge of rawEdges) {
  if (!edge.style) {
    const sourceStatus = nodeStatusMap.get(edge.source);
    edge.style = { stroke: statusColor[sourceStatus ?? ""] ?? "#a1a1aa" };
  }
}

const nodes = ref(rawNodes);
const edges = ref(rawEdges);
</script>

<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    :default-viewport="{ zoom: 1, x: 0, y: 0 }"
    :min-zoom="0.2"
    :max-zoom="2"
    :nodes-draggable="false"
    :nodes-connectable="false"
    :elements-selectable="false"
    :pan-on-drag="true"
    :zoom-on-scroll="true"
    class="tree-flow"
  >
    <template #node-mission="{ data }">
      <div
        class="px-5 py-4 rounded-2xl border-2 border-violet-500 bg-violet-500/15 backdrop-blur-sm min-w-60"
      >
        <p class="text-base font-bold text-violet-50">
          {{ data.label }}
        </p>
        <p class="text-xs text-violet-200/60 mt-1 truncate">
          {{ data.description }}
        </p>
      </div>
    </template>

    <template #node-custom="{ data }">
      <div
        class="px-4 py-3 rounded-xl border backdrop-blur-sm min-w-50"
        :style="{
          background: statusBg[data.status] ?? statusBg.pending,
          borderColor: statusColor[data.status] ?? statusColor.pending,
        }"
      >
        <p class="text-sm font-medium text-violet-50 truncate">
          {{ data.label }}
        </p>
        <div class="flex items-center gap-3 mt-1 text-xs text-violet-200/60">
          <span>{{ data.duration }}h</span>
          <span>${{ data.cost.toLocaleString() }}</span>
          <span
            class="ml-auto text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded-full"
            :style="{
              color: statusColor[data.status],
              background: statusBg[data.status],
            }"
          >
            {{ data.status.replace(/_/g, " ") }}
          </span>
        </div>
      </div>
    </template>
  </VueFlow>
</template>

<style>
@import "@vue-flow/core/dist/style.css";
@import "@vue-flow/core/dist/theme-default.css";

.tree-flow {
  width: 100%;
  height: 100%;
  min-height: 500px;
}

.tree-flow .vue-flow__edge-path {
  stroke-width: 2;
  stroke-dasharray: 6 4;
}

.tree-flow .vue-flow__background {
  background: transparent;
}
</style>
