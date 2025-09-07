import React from 'react';
import { Tree } from 'react-d3-tree';
import { useGameState } from 'src/hooks';
import { RESEARCH_NODES } from 'src/config';
import type { ResearchNode } from 'src/types';

interface ResearchTreeProps {
  onNodeClick?: (nodeId: string) => void;
}

interface TreeNodeData {
  name: string;
  nodeId: string;
  node: ResearchNode;
  status: 'completed' | 'unlocked' | 'available' | 'locked';
  isClickable: boolean;
  cost: string;
  children?: TreeNodeData[];
}

const ResearchTree: React.FC<ResearchTreeProps> = ({ onNodeClick }) => {
  const { resources, researchTree } = useGameState();

  const canAffordResearch = (node: ResearchNode): boolean => {
    return Object.entries(node.cost).every(([resource, amount]) => {
      if (!amount) return true;
      return (resources[resource as keyof typeof resources] || 0) >= (amount as number);
    });
  };

  const canUnlockResearch = (node: ResearchNode): boolean => {
    // Check if prerequisites are met
    const prerequisitesMet = node.prerequisites.every(prereq =>
      researchTree.completed.includes(prereq)
    );

    // Check if already unlocked or completed
    const notAlreadyUnlocked = !researchTree.unlocked.includes(node.id);
    const notCompleted = !researchTree.completed.includes(node.id);

    return prerequisitesMet && notAlreadyUnlocked && notCompleted && canAffordResearch(node);
  };

  const formatCost = (cost: Record<string, number | undefined>) => {
    // Only show research data cost
    if (cost.researchData) {
      return `${cost.researchData} Research Points`;
    }
    return 'Free';
  };

  const getNodeStatus = (node: ResearchNode) => {
    if (researchTree.completed.includes(node.id)) return 'completed';
    if (researchTree.unlocked.includes(node.id)) return 'unlocked';
    if (canUnlockResearch(node)) return 'available';
    return 'locked';
  };

  // Build tree data for react-d3-tree
  const buildTreeData = (): TreeNodeData => {
    const nodeMap = new Map<string, ResearchNode>();
    RESEARCH_NODES.forEach(node => nodeMap.set(node.id, node));

    const buildNode = (nodeId: string): TreeNodeData => {
      const node = nodeMap.get(nodeId);
      if (!node) throw new Error(`Node ${nodeId} not found`);

      const status = getNodeStatus(node);
      const isClickable = status === 'available' || status === 'unlocked';

      const children = RESEARCH_NODES
        .filter(n => n.prerequisites.includes(nodeId))
        .map(child => buildNode(child.id));

      return {
        name: node.name,
        nodeId: node.id,
        node,
        status,
        isClickable,
        cost: formatCost(node.cost),
        children: children.length > 0 ? children : undefined,
      };
    };

    // Find root nodes (nodes with no prerequisites)
    const rootNodes = RESEARCH_NODES.filter(node => node.prerequisites.length === 0);
    if (rootNodes.length === 0) {
      throw new Error('No root nodes found');
    }

    // For now, use the first root node as the main root
    // In a more complex tree, you might want to create a virtual root
    return buildNode(rootNodes[0].id);
  };

  const treeData = buildTreeData();

  // Custom node renderer
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderCustomNode = ({ nodeDatum }: { nodeDatum: any }) => {
    const data = nodeDatum as TreeNodeData;

    const getNodeStyle = () => {
      switch (data.status) {
        case 'completed':
          return {
            backgroundColor: '#10b981',
            borderColor: '#059669',
            color: '#ffffff',
            boxShadow: '0 0 15px rgba(16, 185, 129, 0.6)'
          };
        case 'unlocked':
          return {
            backgroundColor: '#3b82f6',
            borderColor: '#2563eb',
            color: '#ffffff',
            boxShadow: '0 0 15px rgba(59, 130, 246, 0.6)'
          };
        case 'available':
          return {
            backgroundColor: '#f59e0b',
            borderColor: '#d97706',
            color: '#ffffff',
            boxShadow: '0 0 15px rgba(245, 158, 11, 0.6)'
          };
        default:
          return {
            backgroundColor: '#374151',
            borderColor: '#4b5563',
            color: '#9ca3af',
            boxShadow: 'none'
          };
      }
    };

    return (
      <g>
        <rect
          width="600"
          height="280"
          x="-300"
          y="-140"
          rx="30"
          ry="30"
          style={{
            ...getNodeStyle(),
            cursor: data.isClickable ? 'pointer' : 'default',
          }}
          onClick={() => {
            if (data.isClickable) {
              onNodeClick?.(data.nodeId);
            }
          }}
        />
        <text
          textAnchor="middle"
          x="0"
          y="-60"
          style={{
            fill: '#ffffff',
            fontSize: '40px',
            fontWeight: 'bold',
            stroke: 'none',
          }}
        >
          {data.node.emoji} {data.name}
        </text>
        <text
          textAnchor="middle"
          x="0"
          y="-10"
          style={{
            fill: '#ffffff',
            fontSize: '28px',
            stroke: 'none',
          }}
        >
          <tspan x="0" dy="0">{data.node.description.length > 25
            ? data.node.description.substring(0, 25) + '...'
            : data.node.description
          }</tspan>
          {data.node.description.length > 25 && (
            <tspan x="0" dy="35">{data.node.description.length > 50
              ? data.node.description.substring(25, 50) + '...'
              : data.node.description.substring(25)
            }</tspan>
          )}
        </text>
        <text
          textAnchor="middle"
          x="0"
          y={data.node.description.length > 25 ? "85" : "50"}
          style={{
            fill: '#ffffff',
            fontSize: '24px',
            stroke: 'none',
          }}
        >
          {data.cost}
        </text>
        {data.status === 'available' && (
          <circle
            cx="280"
            cy="-110"
            r="10"
            fill="#fbbf24"
            style={{ animation: 'pulse 2s infinite' }}
          />
        )}
        {data.status === 'completed' && (
          <text
            x="280"
            y="-105"
            style={{
              fill: '#10b981',
              fontSize: '30px',
              fontWeight: 'bold',
              stroke: 'none',
            }}
          >
            ✓
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="w-full h-[800px] overflow-hidden">
      {/* Research Points Display */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-800 border-2 border-blue-400 rounded-xl px-8 py-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🧪</span>
            <div>
              <div className="text-white text-xl font-bold">Research Points</div>
              <div className="text-blue-400 text-2xl font-bold">
                {resources.researchData || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tree
        data={treeData}
        orientation="vertical"
        pathFunc="straight"
        translate={{ x: 600, y: 150 }}
        scaleExtent={{ min: 0.4, max: 0.4 }}
        nodeSize={{ x: 700, y: 400 }}
        separation={{ siblings: 0.8, nonSiblings: 1.0 }}
        renderCustomNodeElement={renderCustomNode}
        pathClassFunc={() => "stroke-blue-400 stroke-[6px]"}
        zoom={0.4}
        enableLegacyTransitions={true}
      />
    </div>
  );
};

export default ResearchTree;
