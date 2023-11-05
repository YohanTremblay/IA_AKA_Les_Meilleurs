
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

          // Ajoutez une instruction de journalisation pour afficher la direction
          if (currentNode.x < neighbor.x) {
              console.log("Aller à droite");
          } else if (currentNode.x > neighbor.x) {
              console.log("Aller à gauche");
          } else if (currentNode.y < neighbor.y) {
              console.log("Aller en bas");
          } else if (currentNode.y > neighbor.y) {
              console.log("Aller en haut");
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

  function testMoveRight({game_id, agent_id}){
    socket.emit("move", [game_id, agent_id, "RIGHT"], (response) => {
        game_status = response[0]
        reward = response[1]
        // elem_gamestatus.innerText = game_status
        displayStatus(game_status)
        elem_reward.innerText = reward
      })
  }

// Créez une fonction qui effectue le déplacement de l'agent en utilisant le chemin
function moveAgent(map, start, valves) {
  const path = findNearestValve(map, start, valves);
  if (path) {
    // À ce stade, vous avez le chemin optimal dans la variable "path"
    // Implémentez ici la logique de déplacement de l'agent en suivant le chemin

    let currentIndex = 0;

    function moveOneStep() {
      if (currentIndex < path.length) {
        const nextStep = path[currentIndex];
        const agentX = start[0];
        const agentY = start[1];

        if (nextStep[0] > agentX) {
          // Déplacez l'agent à droite
        } else if (nextStep[0] < agentX) {
          // Déplacez l'agent à gauche
        } else if (nextStep[1] > agentY) {
          // Déplacez l'agent en bas
        } else if (nextStep[1] < agentY) {
          // Déplacez l'agent en haut
        }

        // Mettez à jour les coordonnées de l'agent après le déplacement
        start[0] = nextStep[0];
        start[1] = nextStep[1];

        currentIndex++;

        // Appelez moveOneStep() récursivement pour effectuer le prochain déplacement
        setTimeout(moveOneStep, 500); // Attendez 1 seconde entre chaque déplacement
      }
    }

    // Lancez le déplacement initial
    moveOneStep();
  } else {
    console.log("Aucun chemin trouvé.");
  }
}
module.exports = {
  moveAgent,
};