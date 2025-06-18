class QuantumTetris {
    constructor() {
        // Initialize quantum physics engine
        this.quantumEngine = new QuantumPhysics();
        
        // Canvas setup
        this.alphaCanvas = document.getElementById('alphaCanvas');
        this.alphaCtx = this.alphaCanvas.getContext('2d');
        this.betaCanvas = document.getElementById('betaCanvas');
        this.betaCtx = this.betaCanvas.getContext('2d');
        
        this.nextAlphaCanvas = document.getElementById('nextAlpha');
        this.nextAlphaCtx = this.nextAlphaCanvas.getContext('2d');
        this.nextBetaCanvas = document.getElementById('nextBeta');
        this.nextBetaCtx = this.nextBetaCanvas.getContext('2d');
        
        // Game constants
        this.COLS = 10;
        this.ROWS = 15;
        this.BLOCK_SIZE = 20;
        
        // Universe states
        this.universes = {
            alpha: this.createUniverseState('alpha'),
            beta: this.createUniverseState('beta')
        };
        
        this.activeUniverse = 'alpha';
        this.quantumColors = [
            null,
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
            '#FFEAA7', '#DDA0DD', '#FFA07A', '#00FFFF'
        ];
        
        // Quantum pieces with superposition
        this.quantumPieces = this.createQuantumPieces();
        
        // Game state
        this.isPaused = false;
        this.isGameOver = false;
        this.lastTime = 0;
        this.dropCounter = 0;
        this.dropInterval = 1000;
        
        // Quantum effects
        this.particles = [];
        this.spacetimeDistortions = [];
        this.quantumAnimations = [];
        
        // Initialize universes in quantum engine
        this.quantumEngine.universes.set('alpha', { 
            id: 'alpha', 
            probability: 0.8, 
            gameState: this.universes.alpha,
            quantumEvents: []
        });
        this.quantumEngine.universes.set('beta', { 
            id: 'beta', 
            probability: 0.2, 
            gameState: this.universes.beta,
            quantumEvents: []
        });
        
        this.initEventListeners();
        this.generateQuantumPiece();
        this.updateDisplay();
        this.createQuantumParticles();
        this.gameLoop();
    }
    
    createUniverseState(id) {
        return {
            id,
            board: Array(this.ROWS).fill().map(() => Array(this.COLS).fill(0)),
            currentPiece: null,
            nextPiece: null,
            score: 0,
            level: 1,
            lines: 0,
            probability: id === 'alpha' ? 0.8 : 0.2
        };
    }
    
    createQuantumPieces() {
        // Traditional tetris pieces with quantum properties
        return [
            { // I-piece
                matrix: [
                    [0,0,0,0],
                    [1,1,1,1],
                    [0,0,0,0],
                    [0,0,0,0]
                ],
                quantumProperties: { tunneling: 0.3, entanglement: 0.2 }
            },
            { // O-piece
                matrix: [
                    [2,2],
                    [2,2]
                ],
                quantumProperties: { stability: 0.8, coherence: 0.9 }
            },
            { // T-piece
                matrix: [
                    [0,3,0],
                    [3,3,3],
                    [0,0,0]
                ],
                quantumProperties: { superposition: 0.4, observation: 0.3 }
            },
            { // S-piece
                matrix: [
                    [0,4,4],
                    [4,4,0],
                    [0,0,0]
                ],
                quantumProperties: { entanglement: 0.5, tunneling: 0.2 }
            },
            { // Z-piece
                matrix: [
                    [5,5,0],
                    [0,5,5],
                    [0,0,0]
                ],
                quantumProperties: { entanglement: 0.5, tunneling: 0.2 }
            },
            { // J-piece
                matrix: [
                    [6,0,0],
                    [6,6,6],
                    [0,0,0]
                ],
                quantumProperties: { superposition: 0.3, gravity: 0.4 }
            },
            { // L-piece
                matrix: [
                    [0,0,7],
                    [7,7,7],
                    [0,0,0]
                ],
                quantumProperties: { superposition: 0.3, gravity: 0.4 }
            }
        ];
    }
    
    generateQuantumPiece() {
        const pieceTemplate = this.quantumPieces[Math.floor(Math.random() * this.quantumPieces.length)];
        const pieceId = `piece_${Date.now()}_${Math.random()}`;
        
        // Create quantum superposition for each universe
        const alphaPosition = { 
            x: Math.floor(this.COLS / 2) - Math.floor(pieceTemplate.matrix[0].length / 2), 
            y: 0 
        };
        const betaPosition = { 
            x: Math.floor(this.COLS / 2) - Math.floor(pieceTemplate.matrix[0].length / 2), 
            y: 0 
        };
        
        // Create superposition states
        const superpositionStates = [
            {
                universe: 'alpha',
                position: alphaPosition,
                rotation: 0,
                matrix: pieceTemplate.matrix,
                probability: 0.8
            },
            {
                universe: 'beta',
                position: betaPosition,
                rotation: Math.floor(Math.random() * 4) * 90, // Random rotation in beta
                matrix: this.rotatePiece(pieceTemplate.matrix, Math.floor(Math.random() * 4)),
                probability: 0.2
            }
        ];
        
        // Create quantum superposition
        this.quantumEngine.createSuperposition(pieceId, superpositionStates);
        
        // Update universe pieces
        this.universes.alpha.currentPiece = {
            id: pieceId,
            matrix: superpositionStates[0].matrix,
            pos: superpositionStates[0].position,
            quantumProperties: pieceTemplate.quantumProperties,
            inSuperposition: true
        };
        
        this.universes.beta.currentPiece = {
            id: pieceId,
            matrix: superpositionStates[1].matrix,
            pos: superpositionStates[1].position,
            quantumProperties: pieceTemplate.quantumProperties,
            inSuperposition: true
        };
        
        // Check for game over
        if (this.collides(this.universes[this.activeUniverse].currentPiece)) {
            this.gameOver();
        }
    }
    
    rotatePiece(matrix, times = 1) {
        let result = matrix;
        for (let i = 0; i < times; i++) {
            result = result[0].map((_, index) =>
                result.map(row => row[index]).reverse()
            );
        }
        return result;
    }
    
    collides(piece, offsetX = 0, offsetY = 0) {
        if (!piece) return false;
        
        const universe = this.universes[this.activeUniverse];
        
        for (let y = 0; y < piece.matrix.length; y++) {
            for (let x = 0; x < piece.matrix[y].length; x++) {
                if (piece.matrix[y][x] !== 0) {
                    const newX = piece.pos.x + x + offsetX;
                    const newY = piece.pos.y + y + offsetY;
                    
                    if (newX < 0 || newX >= this.COLS || newY >= this.ROWS) {
                        return true;
                    }
                    
                    if (newY >= 0 && universe.board[newY][newX] !== 0) {
                        // Check for quantum tunneling
                        if (piece.quantumProperties?.tunneling && Math.random() < piece.quantumProperties.tunneling) {
                            this.triggerQuantumTunnel(piece);
                            return false;
                        }
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    triggerQuantumTunnel(piece) {
        const tunnelResult = this.quantumEngine.quantumTunnel(
            piece, 
            this.getBoardObstacles(),
            piece.quantumProperties.tunneling
        );
        
        if (tunnelResult.success) {
            piece.pos = tunnelResult.newPosition;
            this.particles.push(...tunnelResult.particleEffect);
            this.updateQuantumDisplay();
        }
    }
    
    getBoardObstacles() {
        const obstacles = [];
        const universe = this.universes[this.activeUniverse];
        
        for (let y = 0; y < this.ROWS; y++) {
            for (let x = 0; x < this.COLS; x++) {
                if (universe.board[y][x] !== 0) {
                    obstacles.push({ x, y });
                }
            }
        }
        return obstacles;
    }
    
    move(direction) {
        const universe = this.universes[this.activeUniverse];
        if (!universe.currentPiece) return;
        
        const piece = universe.currentPiece;
        const oldPos = { ...piece.pos };
        
        piece.pos.x += direction;
        
        if (this.collides(piece)) {
            piece.pos.x -= direction;
        } else {
            // Apply quantum entanglement
            const entanglementEffect = this.quantumEngine.applyEntanglement(
                { dx: direction, dy: 0 }, piece.id
            );
            
            if (entanglementEffect) {
                this.applyEntanglementToOtherUniverse(entanglementEffect);
            }
        }
        
        // Save state for time reversal
        this.quantumEngine.saveTimeState(this.universes);
    }
    
    applyEntanglementToOtherUniverse(effect) {
        const targetUniverse = effect.targetPiece.universe;
        const targetPiece = this.universes[targetUniverse]?.currentPiece;
        
        if (targetPiece && targetPiece.id === effect.targetPiece.id) {
            targetPiece.pos.x += effect.effect.dx || 0;
            targetPiece.pos.y += effect.effect.dy || 0;
            
            // Validate position
            if (this.collidesInUniverse(targetPiece, targetUniverse)) {
                targetPiece.pos.x -= effect.effect.dx || 0;
                targetPiece.pos.y -= effect.effect.dy || 0;
            }
        }
    }
    
    collidesInUniverse(piece, universeId, offsetX = 0, offsetY = 0) {
        const universe = this.universes[universeId];
        
        for (let y = 0; y < piece.matrix.length; y++) {
            for (let x = 0; x < piece.matrix[y].length; x++) {
                if (piece.matrix[y][x] !== 0) {
                    const newX = piece.pos.x + x + offsetX;
                    const newY = piece.pos.y + y + offsetY;
                    
                    if (newX < 0 || newX >= this.COLS || newY >= this.ROWS) {
                        return true;
                    }
                    
                    if (newY >= 0 && universe.board[newY][newX] !== 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    drop() {
        const universe = this.universes[this.activeUniverse];
        if (!universe.currentPiece) return;
        
        const piece = universe.currentPiece;
        piece.pos.y++;
        
        if (this.collides(piece)) {
            piece.pos.y--;
            this.merge();
            this.generateQuantumPiece();
        }
    }
    
    merge() {
        const universe = this.universes[this.activeUniverse];
        const piece = universe.currentPiece;
        
        if (!piece) return;
        
        // Collapse wave function if piece is in superposition
        if (piece.inSuperposition) {
            const collapsedState = this.quantumEngine.collapseWaveFunction(piece.id);
            if (collapsedState) {
                this.createCollapseEffect(piece.pos, collapsedState);
            }
        }
        
        // Merge piece to board
        piece.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    const boardY = y + piece.pos.y;
                    const boardX = x + piece.pos.x;
                    if (boardY >= 0) {
                        universe.board[boardY][boardX] = value;
                    }
                }
            });
        });
        
        // Check for line clears with quantum effects
        setTimeout(() => {
            this.clearLines();
        }, 100);
        
        universe.currentPiece = null;
    }
    
    createCollapseEffect(position, collapsedState) {
        // Create visual effect for wave function collapse
        for (let i = 0; i < 20; i++) {
            this.particles.push({
                x: (position.x + 2) * this.BLOCK_SIZE,
                y: (position.y + 2) * this.BLOCK_SIZE,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                size: 3 + Math.random() * 3,
                color: '#FFFF00',
                life: 1.0,
                decay: 0.015,
                type: 'collapse'
            });
        }
    }
    
    clearLines() {
        for (const universeId of Object.keys(this.universes)) {
            const universe = this.universes[universeId];
            let linesCleared = 0;
            
            for (let y = this.ROWS - 1; y >= 0; y--) {
                if (universe.board[y].every(cell => cell !== 0)) {
                    // Create quantum line clear effect
                    this.createLineClearEffect(y, universeId);
                    
                    universe.board.splice(y, 1);
                    universe.board.unshift(Array(this.COLS).fill(0));
                    linesCleared++;
                    y++; // Check same row again
                }
            }
            
            if (linesCleared > 0) {
                universe.lines += linesCleared;
                universe.score += this.calculateQuantumScore(linesCleared, universe);
                universe.level = Math.floor(universe.lines / 10) + 1;
                this.dropInterval = Math.max(50, 1000 - (universe.level - 1) * 50);
            }
        }
    }
    
    calculateQuantumScore(linesCleared, universe) {
        const baseScore = linesCleared * 100 * universe.level;
        const quantumBonus = this.quantumEngine.getQuantumState().coherence / 100;
        const probabilityBonus = universe.probability;
        
        return Math.floor(baseScore * (1 + quantumBonus + probabilityBonus));
    }
    
    createLineClearEffect(lineY, universeId) {
        const isAlpha = universeId === 'alpha';
        
        for (let x = 0; x < this.COLS; x++) {
            for (let i = 0; i < 5; i++) {
                this.particles.push({
                    x: (x + 0.5) * this.BLOCK_SIZE,
                    y: (lineY + 0.5) * this.BLOCK_SIZE,
                    vx: (Math.random() - 0.5) * 6,
                    vy: (Math.random() - 0.5) * 6,
                    size: 2 + Math.random() * 2,
                    color: isAlpha ? '#00FFFF' : '#FF00FF',
                    life: 1.0,
                    decay: 0.02,
                    type: 'line_clear',
                    universe: universeId
                });
            }
        }
    }
    
    // Quantum Controls
    observeQuantumState() {
        if (this.quantumEngine.quantumEnergy < 50) return;
        
        const currentPiece = this.universes[this.activeUniverse].currentPiece;
        if (currentPiece && currentPiece.inSuperposition) {
            const collapsedState = this.quantumEngine.collapseWaveFunction(currentPiece.id);
            
            if (collapsedState) {
                currentPiece.inSuperposition = false;
                this.createCollapseEffect(currentPiece.pos, collapsedState);
                
                // Update probabilities
                this.quantumEngine.updateUniverseProbabilities();
                this.updateUniverseProbabilities();
            }
        }
        
        this.updateQuantumDisplay();
    }
    
    entanglePieces() {
        if (this.quantumEngine.quantumEnergy < 100) return;
        
        const alphaPiece = this.universes.alpha.currentPiece;
        const betaPiece = this.universes.beta.currentPiece;
        
        if (alphaPiece && betaPiece) {
            this.quantumEngine.entanglePieces(
                alphaPiece.id, betaPiece.id, 'alpha', 'beta'
            );
            
            this.createEntanglementEffect();
            this.updateQuantumDisplay();
        }
    }
    
    createEntanglementEffect() {
        const alphaPos = this.universes.alpha.currentPiece?.pos;
        const betaPos = this.universes.beta.currentPiece?.pos;
        
        if (alphaPos && betaPos) {
            // Create visual connection between universes
            this.quantumAnimations.push({
                type: 'entanglement',
                start: { 
                    x: (alphaPos.x + 1) * this.BLOCK_SIZE,
                    y: (alphaPos.y + 1) * this.BLOCK_SIZE,
                    canvas: 'alpha'
                },
                end: { 
                    x: (betaPos.x + 1) * this.BLOCK_SIZE,
                    y: (betaPos.y + 1) * this.BLOCK_SIZE,
                    canvas: 'beta'
                },
                duration: 2000,
                progress: 0
            });
        }
    }
    
    triggerWaveCollapse() {
        if (this.quantumEngine.quantumEnergy < 150) return;
        
        // Collapse all superpositions
        for (const [pieceId, superposition] of this.quantumEngine.superpositions) {
            if (!superposition.observed) {
                this.quantumEngine.collapseWaveFunction(pieceId);
            }
        }
        
        this.createGlobalCollapseEffect();
        this.updateQuantumDisplay();
    }
    
    createGlobalCollapseEffect() {
        // Screen-wide collapse effect
        for (let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * this.alphaCanvas.width,
                y: Math.random() * this.alphaCanvas.height,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                size: 2 + Math.random() * 4,
                color: '#FFFF00',
                life: 1.0,
                decay: 0.01,
                type: 'global_collapse'
            });
        }
    }
    
    activateTimeWarp() {
        if (this.quantumEngine.quantumEnergy < 200) return;
        
        const reversedStates = this.quantumEngine.reverseTime(3);
        
        if (reversedStates && reversedStates.length > 0) {
            const latestState = reversedStates[0];
            
            // Restore game state
            this.universes = JSON.parse(JSON.stringify(latestState.gameState));
            
            // Restore quantum state
            this.quantumEngine.superpositions = latestState.quantumState.superpositions;
            this.quantumEngine.entangledPairs = latestState.quantumState.entanglements;
            this.quantumEngine.coherenceLevel = latestState.quantumState.coherence;
            
            this.createTimeWarpEffect();
        }
        
        this.updateQuantumDisplay();
    }
    
    createTimeWarpEffect() {
        // Time distortion visual effect
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.alphaCanvas.width,
                y: Math.random() * this.alphaCanvas.height,
                vx: 0,
                vy: 0,
                size: 1 + Math.random() * 3,
                color: '#FF00FF',
                life: 1.0,
                decay: 0.005,
                type: 'time_warp'
            });
        }
    }
    
    shiftGravity() {
        if (this.quantumEngine.quantumEnergy < 100) return;
        
        const center = {
            x: Math.floor(this.COLS / 2),
            y: Math.floor(this.ROWS / 2)
        };
        
        const distortion = this.quantumEngine.createSpacetimeDistortion(
            center, 3, 'gravity'
        );
        
        this.spacetimeDistortions.push(distortion);
        this.updateQuantumDisplay();
    }
    
    jumpDimension() {
        // Switch active universe
        this.activeUniverse = this.activeUniverse === 'alpha' ? 'beta' : 'alpha';
        
        // Update visual indicators
        this.updateUniverseVisuals();
        
        // Create dimension jump effect
        this.createDimensionJumpEffect();
    }
    
    createDimensionJumpEffect() {
        const canvas = this.activeUniverse === 'alpha' ? this.alphaCanvas : this.betaCanvas;
        
        for (let i = 0; i < 30; i++) {
            this.particles.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                vx: (Math.random() - 0.5) * 15,
                vy: (Math.random() - 0.5) * 15,
                size: 3 + Math.random() * 5,
                color: '#00FF00',
                life: 1.0,
                decay: 0.02,
                type: 'dimension_jump'
            });
        }
    }
    
    updateUniverseVisuals() {
        const alphaDiv = document.querySelector('.primary-universe');
        const betaDiv = document.querySelector('.parallel-universe');
        
        if (this.activeUniverse === 'alpha') {
            alphaDiv.style.borderColor = 'rgba(0, 255, 255, 0.8)';
            alphaDiv.style.opacity = '1';
            betaDiv.style.borderColor = 'rgba(255, 0, 255, 0.3)';
            betaDiv.style.opacity = '0.7';
        } else {
            betaDiv.style.borderColor = 'rgba(255, 0, 255, 0.8)';
            betaDiv.style.opacity = '1';
            alphaDiv.style.borderColor = 'rgba(0, 255, 255, 0.3)';
            alphaDiv.style.opacity = '0.7';
        }
    }
    
    updateUniverseProbabilities() {
        const alphaUniverse = this.quantumEngine.universes.get('alpha');
        const betaUniverse = this.quantumEngine.universes.get('beta');
        
        if (alphaUniverse && betaUniverse) {
            this.universes.alpha.probability = alphaUniverse.probability;
            this.universes.beta.probability = betaUniverse.probability;
        }
    }
    
    // Rendering
    draw() {
        this.drawUniverse('alpha', this.alphaCtx);
        this.drawUniverse('beta', this.betaCtx);
        this.drawNextPieces();
        this.drawParticles();
        this.drawQuantumAnimations();
    }
    
    drawUniverse(universeId, ctx) {
        const universe = this.universes[universeId];
        
        // Clear canvas
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        // Draw quantum grid
        this.drawQuantumGrid(ctx, universe);
        
        // Draw board
        this.drawBoard(ctx, universe);
        
        // Draw current piece with quantum effects
        if (universe.currentPiece) {
            this.drawQuantumPiece(ctx, universe.currentPiece, universeId);
        }
        
        // Draw spacetime distortions
        this.drawSpacetimeDistortions(ctx, universeId);
    }
    
    drawQuantumGrid(ctx, universe) {
        ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 + universe.probability * 0.2})`;
        ctx.lineWidth = 1;
        
        for (let x = 0; x <= this.COLS; x++) {
            ctx.beginPath();
            ctx.moveTo(x * this.BLOCK_SIZE, 0);
            ctx.lineTo(x * this.BLOCK_SIZE, ctx.canvas.height);
            ctx.stroke();
        }
        
        for (let y = 0; y <= this.ROWS; y++) {
            ctx.beginPath();
            ctx.moveTo(0, y * this.BLOCK_SIZE);
            ctx.lineTo(ctx.canvas.width, y * this.BLOCK_SIZE);
            ctx.stroke();
        }
    }
    
    drawBoard(ctx, universe) {
        universe.board.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.drawQuantumBlock(ctx, x, y, value, universe.probability);
                }
            });
        });
    }
    
    drawQuantumBlock(ctx, x, y, value, probability) {
        const posX = x * this.BLOCK_SIZE;
        const posY = y * this.BLOCK_SIZE;
        
        // Create quantum glow effect
        const gradient = ctx.createRadialGradient(
            posX + this.BLOCK_SIZE/2, posY + this.BLOCK_SIZE/2, 0,
            posX + this.BLOCK_SIZE/2, posY + this.BLOCK_SIZE/2, this.BLOCK_SIZE
        );
        
        const color = this.quantumColors[value];
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, this.adjustColorAlpha(color, probability * 0.8));
        
        ctx.fillStyle = gradient;
        ctx.fillRect(posX, posY, this.BLOCK_SIZE, this.BLOCK_SIZE);
        
        // Quantum border
        ctx.strokeStyle = this.adjustColorAlpha(color, probability);
        ctx.lineWidth = 2;
        ctx.strokeRect(posX, posY, this.BLOCK_SIZE, this.BLOCK_SIZE);
    }
    
    drawQuantumPiece(ctx, piece, universeId) {
        const universe = this.universes[universeId];
        
        piece.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    const posX = (piece.pos.x + x) * this.BLOCK_SIZE;
                    const posY = (piece.pos.y + y) * this.BLOCK_SIZE;
                    
                    if (piece.inSuperposition) {
                        this.drawSuperpositionBlock(ctx, posX, posY, value, universe.probability);
                    } else {
                        this.drawQuantumBlock(ctx, piece.pos.x + x, piece.pos.y + y, value, universe.probability);
                    }
                }
            });
        });
    }
    
    drawSuperpositionBlock(ctx, x, y, value, probability) {
        // Flickering superposition effect
        const flickerIntensity = Math.sin(Date.now() * 0.01) * 0.3 + 0.7;
        const alpha = probability * flickerIntensity;
        
        ctx.save();
        ctx.globalAlpha = alpha;
        
        // Multiple overlapping blocks to show uncertainty
        for (let i = 0; i < 3; i++) {
            const offset = (i - 1) * 2;
            const color = this.quantumColors[value];
            
            ctx.fillStyle = this.adjustColorAlpha(color, 0.3);
            ctx.fillRect(x + offset, y + offset, this.BLOCK_SIZE, this.BLOCK_SIZE);
        }
        
        ctx.restore();
        
        // Quantum uncertainty border
        ctx.strokeStyle = `rgba(255, 255, 0, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(x, y, this.BLOCK_SIZE, this.BLOCK_SIZE);
        ctx.setLineDash([]);
    }
    
    adjustColorAlpha(color, alpha) {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    drawSpacetimeDistortions(ctx, universeId) {
        this.spacetimeDistortions.forEach(distortion => {
            const age = Date.now() - distortion.created;
            if (age < distortion.duration) {
                const progress = age / distortion.duration;
                const alpha = 1 - progress;
                
                ctx.save();
                ctx.globalAlpha = alpha;
                
                // Draw distortion field
                ctx.strokeStyle = '#FF00FF';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(
                    distortion.center.x * this.BLOCK_SIZE,
                    distortion.center.y * this.BLOCK_SIZE,
                    distortion.radius * this.BLOCK_SIZE * (1 + progress * 0.5),
                    0, Math.PI * 2
                );
                ctx.stroke();
                
                ctx.restore();
            }
        });
        
        // Remove expired distortions
        this.spacetimeDistortions = this.spacetimeDistortions.filter(
            d => Date.now() - d.created < d.duration
        );
    }
    
    drawNextPieces() {
        // Draw next pieces for both universes
        const alphaNext = this.universes.alpha.nextPiece;
        const betaNext = this.universes.beta.nextPiece;
        
        if (alphaNext) {
            this.drawNextPiece(this.nextAlphaCtx, alphaNext);
        }
        if (betaNext) {
            this.drawNextPiece(this.nextBetaCtx, betaNext);
        }
    }
    
    drawNextPiece(ctx, piece) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        if (!piece) return;
        
        const blockSize = 15;
        const offsetX = (ctx.canvas.width - piece.matrix[0].length * blockSize) / 2;
        const offsetY = (ctx.canvas.height - piece.matrix.length * blockSize) / 2;
        
        piece.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    const posX = offsetX + x * blockSize;
                    const posY = offsetY + y * blockSize;
                    
                    ctx.fillStyle = this.quantumColors[value];
                    ctx.fillRect(posX, posY, blockSize, blockSize);
                    
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(posX, posY, blockSize, blockSize);
                }
            });
        });
    }
    
    drawParticles() {
        [this.alphaCtx, this.betaCtx].forEach(ctx => {
            this.particles.forEach(particle => {
                if (particle.universe && particle.universe !== (ctx === this.alphaCtx ? 'alpha' : 'beta')) {
                    return; // Skip particles not belonging to this universe
                }
                
                ctx.save();
                ctx.globalAlpha = particle.life;
                
                if (particle.type === 'tunnel') {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = particle.color;
                }
                
                ctx.fillStyle = particle.color;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.restore();
            });
        });
    }
    
    drawQuantumAnimations() {
        this.quantumAnimations.forEach(animation => {
            if (animation.type === 'entanglement') {
                this.drawEntanglementBeam(animation);
            }
        });
    }
    
    drawEntanglementBeam(animation) {
        const progress = animation.progress / animation.duration;
        
        if (progress < 1) {
            // Draw on both canvases
            [this.alphaCtx, this.betaCtx].forEach(ctx => {
                ctx.save();
                ctx.globalAlpha = 1 - progress;
                ctx.strokeStyle = '#FF00FF';
                ctx.lineWidth = 3;
                ctx.setLineDash([10, 10]);
                
                ctx.beginPath();
                ctx.moveTo(animation.start.x, animation.start.y);
                ctx.lineTo(animation.end.x, animation.end.y);
                ctx.stroke();
                
                ctx.restore();
            });
            
            animation.progress += 16; // Assume 60fps
        }
    }
    
    updateParticles(deltaTime) {
        this.particles = this.particles.filter(particle => {
            particle.life -= particle.decay;
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.type === 'time_warp') {
                particle.x += Math.sin(Date.now() * 0.01) * 2;
                particle.y += Math.cos(Date.now() * 0.01) * 2;
            }
            
            return particle.life > 0;
        });
        
        // Remove completed animations
        this.quantumAnimations = this.quantumAnimations.filter(
            anim => anim.progress < anim.duration
        );
    }
    
    // Game loop and controls
    gameLoop(time = 0) {
        if (!this.isPaused && !this.isGameOver) {
            const deltaTime = time - this.lastTime;
            this.lastTime = time;
            
            this.dropCounter += deltaTime;
            if (this.dropCounter > this.dropInterval) {
                this.drop();
                this.dropCounter = 0;
            }
            
            this.updateParticles(deltaTime);
            this.quantumEngine.regenerateQuantumEnergy(deltaTime);
            this.quantumEngine.updateUniverseProbabilities();
            
            this.draw();
            this.updateDisplay();
        }
        
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    updateDisplay() {
        // Update scores and stats
        document.getElementById('alphaScore').textContent = this.universes.alpha.score;
        document.getElementById('alphaLevel').textContent = this.universes.alpha.level;
        document.getElementById('alphaProbability').textContent = 
            Math.round(this.universes.alpha.probability * 100) + '%';
        
        document.getElementById('betaScore').textContent = this.universes.beta.score;
        document.getElementById('betaLevel').textContent = this.universes.beta.level;
        document.getElementById('betaProbability').textContent = 
            Math.round(this.universes.beta.probability * 100) + '%';
        
        this.updateQuantumDisplay();
    }
    
    updateQuantumDisplay() {
        const quantumState = this.quantumEngine.getQuantumState();
        
        document.getElementById('superpositionCount').textContent = quantumState.superpositionCount;
        document.getElementById('entangledCount').textContent = quantumState.entangledCount;
        document.getElementById('coherence').textContent = quantumState.coherence + '%';
        document.getElementById('quantumEnergy').textContent = quantumState.quantumEnergy;
    }
    
    createQuantumParticles() {
        // Create ambient quantum particles
        setInterval(() => {
            if (Math.random() < 0.3) {
                this.particles.push({
                    x: Math.random() * this.alphaCanvas.width,
                    y: this.alphaCanvas.height,
                    vx: (Math.random() - 0.5) * 2,
                    vy: -Math.random() * 2,
                    size: 1 + Math.random() * 2,
                    color: '#00FFFF',
                    life: 1.0,
                    decay: 0.005,
                    type: 'ambient'
                });
            }
        }, 500);
    }
    
    gameOver() {
        this.isGameOver = true;
        const totalScore = this.universes.alpha.score + this.universes.beta.score;
        alert(`Quantum Game Over! Total Multiverse Score: ${totalScore}`);
    }
    
    pause() {
        this.isPaused = !this.isPaused;
        document.getElementById('pauseBtn').textContent = this.isPaused ? 'Resume' : 'Pause';
    }
    
    resetMultiverse() {
        this.universes = {
            alpha: this.createUniverseState('alpha'),
            beta: this.createUniverseState('beta')
        };
        
        this.quantumEngine = new QuantumPhysics();
        this.particles = [];
        this.spacetimeDistortions = [];
        this.quantumAnimations = [];
        
        this.isGameOver = false;
        this.isPaused = false;
        this.activeUniverse = 'alpha';
        
        this.generateQuantumPiece();
        this.updateDisplay();
        this.updateUniverseVisuals();
        
        document.getElementById('pauseBtn').textContent = 'Pause';
    }
    
    initEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (this.isPaused || this.isGameOver) return;
            
            switch (e.code) {
                case 'ArrowLeft':
                    this.move(-1);
                    break;
                case 'ArrowRight':
                    this.move(1);
                    break;
                case 'ArrowDown':
                    this.drop();
                    this.dropCounter = 0;
                    break;
                case 'ArrowUp':
                    this.rotate();
                    break;
                case 'Space':
                    e.preventDefault();
                    this.hardDrop();
                    break;
                case 'ShiftLeft':
                case 'ShiftRight':
                    this.jumpDimension();
                    break;
            }
        });
        
        // Quantum control buttons
        document.getElementById('observeBtn').addEventListener('click', () => {
            this.observeQuantumState();
        });
        
        document.getElementById('entangleBtn').addEventListener('click', () => {
            this.entanglePieces();
        });
        
        document.getElementById('collapseBtn').addEventListener('click', () => {
            this.triggerWaveCollapse();
        });
        
        document.getElementById('tunnelBtn').addEventListener('click', () => {
            const piece = this.universes[this.activeUniverse].currentPiece;
            if (piece) {
                this.triggerQuantumTunnel(piece);
            }
        });
        
        document.getElementById('warpBtn').addEventListener('click', () => {
            this.activateTimeWarp();
        });
        
        document.getElementById('gravityBtn').addEventListener('click', () => {
            this.shiftGravity();
        });
        
        document.getElementById('dimensionBtn').addEventListener('click', () => {
            this.jumpDimension();
        });
        
        document.getElementById('pauseBtn').addEventListener('click', () => {
            this.pause();
        });
        
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetMultiverse();
        });
    }
    
    rotate() {
        const universe = this.universes[this.activeUniverse];
        if (!universe.currentPiece) return;
        
        const piece = universe.currentPiece;
        const rotated = this.rotatePiece(piece.matrix);
        const originalMatrix = piece.matrix;
        
        piece.matrix = rotated;
        
        if (this.collides(piece)) {
            piece.matrix = originalMatrix;
        } else {
            // Apply entanglement for rotation
            const entanglementEffect = this.quantumEngine.applyEntanglement(
                { rotation: 90 }, piece.id
            );
            
            if (entanglementEffect) {
                this.applyRotationEntanglement(entanglementEffect);
            }
        }
    }
    
    applyRotationEntanglement(effect) {
        const targetUniverse = effect.targetPiece.universe;
        const targetPiece = this.universes[targetUniverse]?.currentPiece;
        
        if (targetPiece && targetPiece.id === effect.targetPiece.id) {
            const rotated = this.rotatePiece(targetPiece.matrix);
            const originalMatrix = targetPiece.matrix;
            
            targetPiece.matrix = rotated;
            
            if (this.collidesInUniverse(targetPiece, targetUniverse)) {
                targetPiece.matrix = originalMatrix;
            }
        }
    }
    
    hardDrop() {
        const universe = this.universes[this.activeUniverse];
        if (!universe.currentPiece) return;
        
        const piece = universe.currentPiece;
        
        while (!this.collides(piece, 0, 1)) {
            piece.pos.y++;
        }
        
        this.merge();
        this.generateQuantumPiece();
    }
}

// Initialize game when page loads
window.addEventListener('load', () => {
    new QuantumTetris();
});