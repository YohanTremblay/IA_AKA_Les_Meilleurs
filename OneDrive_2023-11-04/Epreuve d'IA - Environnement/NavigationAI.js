// Fonction A* pour trouver le chemin optimal
function findOptimalPath(map, start, goal) {
    const openList = [];  // Liste ouverte des nœuds à explorer
    const closedList = [];  // Liste fermée des nœuds déjà explorés
  
    // Créez un nœud initial avec les coordonnées de départ
    const initialNode = {
      x: start[0],
      y: start[1],
      g: 0,  // Coût G depuis le point de départ
      h: heuristic(start, goal),  // Estimation du coût H jusqu'à la valve la plus proche
      parent: null  // Noeud parent
    };
  
    openList.push(initialNode);
  
    while (openList.length > 0) {
      // Sélectionnez le nœud avec le coût F le plus bas dans la liste ouverte
      openList.sort((a, b) => a.g + a.h - (b.g + b.h));
  
      const currentNode = openList.shift();
  
      // Si le nœud actuel est le nœud de la valve la plus proche, le chemin optimal est trouvé
      if (currentNode.x === goal[0] && currentNode.y === goal[1]) {
        return reconstructPath(currentNode);
      }
  
      // Ajoutez le nœud actuel à la liste fermée
      closedList.push(currentNode);
  
      // Explorez les nœuds voisins
      const neighbors = getNeighbors(map, currentNode);
  
      for (const neighbor of neighbors) {
        // Ignorez les nœuds dans la liste fermée
        if (closedList.some(node => node.x === neighbor.x && node.y === neighbor.y)) {
          continue;
        }
  
        // Calculez les coûts G et H pour le voisin
        const g = currentNode.g + 1;  // Supposons que le coût de déplacement est de 1
        const h = heuristic([neighbor.x, neighbor.y], goal);
  
        // Vérifiez si le voisin est déjà dans la liste ouverte
        const existingNode = openList.find(node => node.x === neighbor.x && node.y === neighbor.y);
  
        if (!existingNode || g < existingNode.g) {
          if (!existingNode) {
            // Si le voisin n'est pas dans la liste ouverte, ajoutez-le
            openList.push({
              x: neighbor.x,
              y: neighbor.y,
              g: g,
              h: h,
              parent: currentNode
            });
          } else {
            // Si le voisin est déjà dans la liste ouverte et a un coût G plus élevé, mettez à jour les informations
            existingNode.g = g;
            existingNode.parent = currentNode;
          }
        }
      }
    }
  
    // Aucun chemin optimal trouvé
    return null;
  }
  
  // Fonction heuristique pour estimer le coût H
  function heuristic(current, goal) {
    return Math.abs(current[0] - goal[0]) + Math.abs(current[1] - goal[1]);
  }
  
  // Fonction pour reconstruire le chemin optimal
  function reconstructPath(node) {
    const path = [];
    while (node) {
      path.unshift([node.x, node.y]);
      node = node.parent;
    }
    return path;
  }
  
  // Fonction pour obtenir les voisins valides
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
  