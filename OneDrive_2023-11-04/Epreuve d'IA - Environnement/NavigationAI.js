// Fonction A* pour trouver le chemin optimal
function findNearestValve(map, start, valves) {
    const openList = [];
    const closedList = new Set();
  
    // Créez un nœud initial avec les coordonnées de départ
    const initialNode = {
      x: start[0],
      y: start[1],
      g: 0,
      h: heuristic(start, valves[0]),  // Utilisez la première valve comme objectif initial
      parent: null
    };
  
    openList.push(initialNode);
  
    while (openList.length > 0) {
      openList.sort((a, b) => a.g + a.h - (b.g + b.h));
      const currentNode = openList.shift();
  
      if (valves.some(valve => currentNode.x === valve[0] && currentNode.y === valve[1])) {
        return reconstructPath(currentNode);
      }
  
      closedList.add(`${currentNode.x}-${currentNode.y}`);
  
      const neighbors = getNeighbors(map, currentNode);
  
      for (const neighbor of neighbors) {
        const neighborId = `${neighbor.x}-${neighbor.y}`;
  
        if (closedList.has(neighborId)) {
          continue;
        }
  
        const g = currentNode.g + 1;
        const h = heuristic([neighbor.x, neighbor.y], valves[0]);  // Utilisez la première valve comme objectif initial
  
        const existingNode = openList.find(node => node.x === neighbor.x && node.y === neighbor.y);
  
        if (!existingNode || g < existingNode.g) {
          if (!existingNode) {
            openList.push({
              x: neighbor.x,
              y: neighbor.y,
              g: g,
              h: h,
              parent: currentNode
            });
          } else {
            existingNode.g = g;
            existingNode.parent = currentNode;
          }
        }
      }
    }
  
    return null;
  }
  // Fonction heuristique pour estimer le coût H
function heuristic(current, goal) {
    return Math.abs(current[0] - goal[0]) + Math.abs(current[1] - goal[1]);
  }
  
  function getNeighbors(map, node) {
    const neighbors = [];
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  
    for (const dir of directions) {
      const x = node.x + dir[0];
      const y = node.y + dir[1];
  
      if (x >= 0 && x < map.length && y >= 0 && y < map[0].length && map[x][y] === 0) {
        neighbors.push({ x, y });
      }
    }
  
    return neighbors;
  }

  function reconstructPath(node) {
    const path = [];
    while (node) {
      path.unshift([node.x, node.y]);
      node = node.parent;
    }
    return path;
  }
module.exports = {
    findNearestValve,
};