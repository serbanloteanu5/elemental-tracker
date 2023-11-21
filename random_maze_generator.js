Please find below a JavaScript code example that generates a random maze using the Prim's algorithm. The filename for this code is "random_maze_generator.js":

```javascript
// random_maze_generator.js

class Maze {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.cells = [];
    this.stack = [];
    this.currentCell = null;
    
    // Initialize maze cells
    for (let i = 0; i < rows; i++) {
      this.cells[i] = [];
      for (let j = 0; j < cols; j++) {
        this.cells[i][j] = {
          x: i,
          y: j,
          top: true,
          right: true,
          bottom: true,
          left: true,
          visited: false
        };
      }
    }
    
    // Entry point of the maze
    this.currentCell = this.cells[0][0];
  }
  
  generate() {
    // Mark the starting cell as visited
    this.currentCell.visited = true;
    
    // Algorithm loop
    while (true) {
      // Find all unvisited neighbors of the current cell
      let unvisitedNeighbors = this.getUnvisitedNeighbors(this.currentCell);
      
      if (unvisitedNeighbors.length > 0) {
        // Choose a random unvisited neighbor
        let randomNeighbor = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
        
        // Push the current cell to the stack
        this.stack.push(this.currentCell);
        
        // Remove wall between the current cell and the chosen neighbor
        this.removeWall(this.currentCell, randomNeighbor);
        
        // Move to the chosen neighbor cell
        this.currentCell = randomNeighbor;
        this.currentCell.visited = true;
      } else if (this.stack.length > 0) {
        // Backtrack to the previous cell if there are no unvisited neighbors
        this.currentCell = this.stack.pop();
      } else {
        // Maze generation is complete
        break;
      }
    }
  }
  
  getUnvisitedNeighbors(cell) {
    let neighbors = [];
    let { x, y } = cell;
    
    if (x > 0 && !this.cells[x - 1][y].visited)
      neighbors.push(this.cells[x - 1][y]);
      
    if (y < this.cols - 1 && !this.cells[x][y + 1].visited)
      neighbors.push(this.cells[x][y + 1]);
      
    if (x < this.rows - 1 && !this.cells[x + 1][y].visited)
      neighbors.push(this.cells[x + 1][y]);
      
    if (y > 0 && !this.cells[x][y - 1].visited)
      neighbors.push(this.cells[x][y - 1]);
      
    return neighbors;
  }
  
  removeWall(cell1, cell2) {
    let dx = cell1.x - cell2.x;
    
    if (dx === 1) {
      cell1.left = false;
      cell2.right = false;
    } else if (dx === -1) {
      cell1.right = false;
      cell2.left = false;
    }
    
    let dy = cell1.y - cell2.y;
    
    if (dy === 1) {
      cell1.top = false;
      cell2.bottom = false;
    } else if (dy === -1) {
      cell1.bottom = false;
      cell2.top = false;
    }
  }
  
  draw() {
    for (let i = 0; i < this.rows; i++) {
      let row = "";
      
      for (let j = 0; j < this.cols; j++) {
        let cell = this.cells[i][j];
        
        if (cell.top) {
          row += "⬜ ";
        } else {
          row += "  ";
        }
        
        if (cell.right) {
          row += "⬜ ";
        } else {
          row += "  ";
        }
      }
      
      console.log(row);
      
      for (let j = 0; j < this.cols; j++) {
        let cell = this.cells[i][j];
        
        if (cell.bottom) {
          process.stdout.write("⬜ ");
        } else {
          process.stdout.write("  ");
        }
        
        process.stdout.write("  ");
      }
      
      console.log();
    }
  }
}

// Create and generate a 20x30 maze
let maze = new Maze(20, 30);
maze.generate();
maze.draw();
```

Please note that due to the text format limitation, the maze visualization may not look perfect in some environments. Running the code in a JavaScript environment such as Node.js will produce a more accurate visualization.